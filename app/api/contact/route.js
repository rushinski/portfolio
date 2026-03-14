import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_API = "https://api.resend.com/emails";
const RESEND_USER_AGENT = "jacob-rushinski-portfolio-contact/1.0";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_RATE_LIMIT_WINDOW_MS = parsePositiveInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000);
const CONTACT_RATE_LIMIT_MAX_PER_IP = parsePositiveInt(process.env.CONTACT_RATE_LIMIT_MAX_PER_IP, 5);
const CONTACT_RATE_LIMIT_MAX_PER_EMAIL = parsePositiveInt(process.env.CONTACT_RATE_LIMIT_MAX_PER_EMAIL, 2);
const CONTACT_RATE_LIMIT_STORE = globalThis.__contactRateLimitStore ?? new Map();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = CONTACT_RATE_LIMIT_STORE;
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(",");
    if (firstIp?.trim()) {
      return firstIp.trim().toLowerCase();
    }
  }

  const fallbackIp = request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip");
  return fallbackIp?.trim().toLowerCase() || "unknown";
}

function normalizePayload(payload = {}) {
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    subject: String(payload.subject || "").trim(),
    message: String(payload.message || "").trim(),
  };
}

function checkRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const timestamps = (CONTACT_RATE_LIMIT_STORE.get(key) || []).filter((timestamp) => now - timestamp < windowMs);

  if (timestamps.length >= limit) {
    CONTACT_RATE_LIMIT_STORE.set(key, timestamps);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((timestamps[0] + windowMs - now) / 1000)),
    };
  }

  timestamps.push(now);
  CONTACT_RATE_LIMIT_STORE.set(key, timestamps);

  return {
    allowed: true,
  };
}

function buildRateLimitResponse(retryAfterSeconds) {
  return NextResponse.json(
    { error: `Too many contact attempts. Please wait ${retryAfterSeconds} seconds and try again.` },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

export async function POST(request) {
  let payload;

  try {
    payload = normalizePayload(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const ipLimit = checkRateLimit(
    `contact:ip:${getClientIp(request)}`,
    CONTACT_RATE_LIMIT_MAX_PER_IP,
    CONTACT_RATE_LIMIT_WINDOW_MS,
  );

  if (!ipLimit.allowed) {
    return buildRateLimitResponse(ipLimit.retryAfterSeconds);
  }

  const emailLimit = checkRateLimit(
    `contact:email:${payload.email.toLowerCase()}`,
    CONTACT_RATE_LIMIT_MAX_PER_EMAIL,
    CONTACT_RATE_LIMIT_WINDOW_MS,
  );

  if (!emailLimit.allowed) {
    return buildRateLimitResponse(emailLimit.retryAfterSeconds);
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { error: "Contact email service is not configured." },
      { status: 503 },
    );
  }

  try {
    const subject = payload.subject || `Portfolio inquiry from ${payload.name}`;
    const text = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      "",
      payload.message,
    ].join("\n");

    const response = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": RESEND_USER_AGENT,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: payload.email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Contact API send failed:", errorText);
      return NextResponse.json({ error: "Unable to send message right now." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
