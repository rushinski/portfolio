"use client";

import { useState } from "react";
import { PERSONAL } from "@/components/os/data";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const SECTION = {
  fontSize: 10, fontWeight: 700, background: "#000080", color: "#ffffff",
  padding: "2px 8px", marginBottom: 6, textTransform: "uppercase",
};

const FIELD_STYLE = {
  width: "100%", fontFamily: W95_FONT, fontSize: 12, padding: "4px 6px",
  background: "#ffffff",
  borderTop: "1px solid #808080", borderLeft: "1px solid #808080",
  borderRight: "1px solid #dfdfdf", borderBottom: "1px solid #dfdfdf",
  outline: "none", boxSizing: "border-box",
};

const CONTACTS = [
  { label: "Email",    value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
  { label: "Phone",    value: "(717) 216-9005", href: "tel:+17172169005" },
  { label: "GitHub",   value: "github.com/rushinski", href: PERSONAL.github },
  { label: "LinkedIn", value: "linkedin.com/in/jacobrushinski", href: PERSONAL.linkedin },
];

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function ContactMobile() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const canSend = form.name.trim() && form.email.trim() && form.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm(EMPTY);
    } catch {
      setStatus("error");
    }
    setSending(false);
  };

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      {/* Quick links */}
      <div style={SECTION}>Quick Links</div>
      <div style={{ background: "#f0f0ea", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", marginBottom: 14 }}>
        {CONTACTS.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 12px", borderBottom: "1px solid #d4d0c8",
              textDecoration: "none", fontFamily: W95_FONT,
              touchAction: "manipulation", WebkitTapHighlightColor: "transparent",
              minHeight: 44,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 11, color: "#111", minWidth: 56 }}>{label}:</span>
            <span style={{ fontSize: 11, color: "#000080", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
          </a>
        ))}
      </div>

      {/* Message form */}
      <div style={SECTION}>Send a Message</div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "#f0f0ea", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", padding: "10px 12px", marginBottom: 10 }}>
          {[
            { key: "name", label: "Name", type: "text", placeholder: "Your name" },
            { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            { key: "subject", label: "Subject", type: "text", placeholder: "Optional" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#333", marginBottom: 3 }}>{label}</label>
              <input type={type} value={form[key]} onChange={set(key)} placeholder={placeholder} style={FIELD_STYLE} />
            </div>
          ))}
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#333", marginBottom: 3 }}>Message</label>
            <textarea value={form.message} onChange={set("message")} placeholder="Your message..." rows={5} style={{ ...FIELD_STYLE, resize: "vertical", minHeight: 80 }} />
          </div>
        </div>

        {status === "success" && (
          <div style={{ background: "#dbeed4", border: "1px solid #4d7a39", color: "#244216", padding: "6px 10px", fontSize: 11, marginBottom: 8 }}>
            Message sent!
          </div>
        )}
        {status === "error" && (
          <div style={{ background: "#ffe0e0", border: "1px solid #8b2b2b", color: "#651818", padding: "6px 10px", fontSize: 11, marginBottom: 8 }}>
            Something went wrong. Try emailing directly.
          </div>
        )}

        <button
          type="submit"
          disabled={!canSend || sending}
          style={{
            width: "100%", padding: "10px", fontFamily: W95_FONT, fontSize: 12, fontWeight: 700,
            background: "#c0c0c0", cursor: canSend && !sending ? "pointer" : "default",
            borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #404040", borderBottom: "2px solid #404040",
            color: canSend && !sending ? "#111" : "#808080",
            touchAction: "manipulation",
          }}
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
