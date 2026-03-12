"use client";

import { PERSONAL } from "../data";

export default function ContactApp() {
  const contacts = [
    { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, icon: "/socials/email.png" },
    { label: "GitHub", value: PERSONAL.github.replace("https://", ""), href: PERSONAL.github, icon: "/socials/github.png" },
    { label: "LinkedIn", value: PERSONAL.linkedin.replace("https://", ""), href: PERSONAL.linkedin, icon: "/socials/linkedin.png" },
    { label: "Phone", value: PERSONAL.phone || "(717) 216-9005", href: "tel:+17172169005", icon: "/socials/phone.png" },
    { label: "Location", value: PERSONAL.location, href: null, icon: null },
  ];

  return (
    <div style={{ padding: "12px 16px", background: "#fff", minHeight: "100%" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #808080", paddingBottom: 3, marginBottom: 10 }}>
        Contact Information
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {contacts.map((contact) => (
          <div key={contact.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "#d4d0c8", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
            <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {contact.icon
                ? <img src={contact.icon} alt={contact.label} width={16} height={16} style={{ imageRendering: "pixelated", objectFit: "contain" }} />
                : <span style={{ fontSize: 11 }}>📍</span>}
            </div>
            <div style={{ minWidth: 52, fontSize: 10, fontWeight: 700, color: "#444", flexShrink: 0 }}>{contact.label}</div>
            <div style={{ flex: 1, padding: "1px 5px", fontSize: 10, background: "#fff", border: "1px solid", borderColor: "#808080 #dfdfdf #dfdfdf #808080" }}>
              {contact.href ? (
                <a
                  href={contact.href}
                  target={contact.href.startsWith("mailto") || contact.href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ color: "#000080", textDecoration: "none" }}
                >
                  {contact.value}
                </a>
              ) : (
                <span style={{ color: "#333" }}>{contact.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 10, color: "#666", fontStyle: "italic" }}>
        Open to backend, full-stack, or related roles — Philadelphia area or nationwide remote.
      </div>
    </div>
  );
}
