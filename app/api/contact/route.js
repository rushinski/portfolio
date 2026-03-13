import { NextResponse } from "next/server";

const RESEND_API = "https://api.resend.com/emails";
const RESEND_USER_AGENT = "jacob-rushinski-portfolio-contact/1.0";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePayload(payload = {}) {
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    subject: String(payload.subject || "").trim(),
    message: String(payload.message || "").trim(),
  };
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
