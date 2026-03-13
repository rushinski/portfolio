"use client";

import { useState } from "react";

import { PERSONAL } from "../data";
import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_FIELD_STYLE,
  APP_META_TEXT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
  getWin95ButtonStyle,
} from "../ui/retro";

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const STATUS_STYLES = {
  success: { background: "#dbeed4", borderColor: "#4d7a39", color: "#244216" },
  info: { background: "#e0ebff", borderColor: "#2d4b84", color: "#19345f" },
  error: { background: "#ffe0e0", borderColor: "#8b2b2b", color: "#651818" },
};

function buildMailtoHref(form) {
  const subject = form.subject.trim() || `Portfolio inquiry from ${form.name.trim() || "website visitor"}`;
  const body = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    "",
    form.message.trim(),
  ].join("\n");

  return `mailto:${PERSONAL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactApp() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const contacts = [
    { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, icon: "/socials/email.png" },
    { label: "GitHub", value: PERSONAL.github.replace("https://", ""), href: PERSONAL.github, icon: "/socials/github.png" },
    { label: "LinkedIn", value: PERSONAL.linkedin.replace("https://", ""), href: PERSONAL.linkedin, icon: "/socials/linkedin.png" },
    { label: "Phone", value: PERSONAL.phone || "(717) 216-9005", href: "tel:+17172169005", icon: "/socials/phone.png" },
    { label: "Location", value: PERSONAL.location, href: null, icon: null },
  ];

  const canSubmit = form.name.trim() && form.email.trim() && form.message.trim();

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openMailClient = () => {
    if (typeof window === "undefined") {
      return;
    }
    window.location.href = buildMailtoHref(form);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || submitting) {
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        setForm(EMPTY_FORM);
        setStatus({ type: "success", text: "Message sent successfully." });
        return;
      }

      if (response.status === 503) {
        openMailClient();
        setStatus({
          type: "info",
          text: payload.error || "Email service is not configured yet. Your default mail client was opened instead.",
        });
        return;
      }

      setStatus({
        type: "error",
        text: payload.error || "Unable to send message right now.",
      });
    } catch {
      openMailClient();
      setStatus({
        type: "info",
        text: "The contact service could not be reached. Your default mail client was opened instead.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "grid", gridTemplateColumns: "minmax(260px, 320px) minmax(0, 1fr)", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>Contact Information</div>
            <div style={APP_META_TEXT_STYLE}>Direct ways to reach Jacob for backend, full-stack, and systems-oriented work.</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {contacts.map((contact) => (
              <div key={contact.label} style={{ ...APP_PANEL_STYLE, display: "grid", gridTemplateColumns: "20px 56px minmax(0, 1fr)", alignItems: "start", columnGap: 8, padding: "6px 8px" }}>
                <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {contact.icon
                    ? <img src={contact.icon} alt={contact.label} width={16} height={16} style={{ imageRendering: "pixelated", objectFit: "contain" }} />
                    : <span style={{ fontSize: 11, color: "#000080", fontWeight: 700 }}>LOC</span>}
                </div>
                <div style={{ minWidth: 0, fontSize: 10, fontWeight: 700, color: "#444", paddingTop: 4 }}>{contact.label}</div>
                <div style={{ ...APP_FIELD_STYLE, minWidth: 0, padding: "3px 6px", minHeight: 22, lineHeight: 1.35 }}>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("mailto") || contact.href.startsWith("tel") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{ color: "#000080", textDecoration: "none", display: "block", overflowWrap: "anywhere", wordBreak: "break-word" }}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span style={{ color: "#333", display: "block", overflowWrap: "anywhere", wordBreak: "break-word" }}>{contact.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ ...APP_PANEL_STYLE, padding: "6px 8px" }}>
            <div style={{ fontSize: 10, color: "#444", lineHeight: 1.45 }}>
              Open to backend, full-stack, or related roles in the Philadelphia area or nationwide remote.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ ...APP_PANEL_STYLE, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
          <div>
            <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>Send Email</div>
            <div style={APP_META_TEXT_STYLE}>Fill this out to send a message directly. If no mail service is configured, JacobOS will open your default mail client with the message prefilled.</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#333" }}>Name</span>
              <input
                value={form.name}
                onChange={handleChange("name")}
                style={{ ...APP_FIELD_STYLE, width: "100%", fontFamily: "inherit", fontSize: 12, outline: "none" }}
                maxLength={80}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#333" }}>Email</span>
              <input
                value={form.email}
                onChange={handleChange("email")}
                type="email"
                style={{ ...APP_FIELD_STYLE, width: "100%", fontFamily: "inherit", fontSize: 12, outline: "none" }}
                maxLength={120}
              />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#333" }}>Subject</span>
            <input
              value={form.subject}
              onChange={handleChange("subject")}
              style={{ ...APP_FIELD_STYLE, width: "100%", fontFamily: "inherit", fontSize: 12, outline: "none" }}
              maxLength={120}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minHeight: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#333" }}>Message</span>
            <textarea
              value={form.message}
              onChange={handleChange("message")}
              style={{ ...APP_FIELD_STYLE, width: "100%", flex: 1, minHeight: 150, fontFamily: "inherit", fontSize: 12, outline: "none", resize: "none" }}
              maxLength={4000}
            />
          </label>

          <div style={{ ...APP_PANEL_STYLE, padding: "6px 8px" }}>
            <div style={{ fontSize: 10, color: "#444" }}>
              Messages are routed to {PERSONAL.email}. Reply details are preserved from the email field above.
            </div>
          </div>

          {status && (
            <div
              style={{
                ...APP_PANEL_STYLE,
                padding: "6px 8px",
                background: STATUS_STYLES[status.type]?.background || "#d4d0c8",
                color: STATUS_STYLES[status.type]?.color || "#222",
                fontSize: 10,
                lineHeight: 1.45,
                outline: `1px solid ${STATUS_STYLES[status.type]?.borderColor || "#808080"}`,
              }}
            >
              {status.text}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <button type="button" onClick={openMailClient} style={getWin95ButtonStyle({ padding: "5px 12px" })}>
              Use Mail Client
            </button>
            <button type="submit" disabled={!canSubmit || submitting} style={getWin95ButtonStyle({ padding: "5px 16px", disabled: !canSubmit || submitting })}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
