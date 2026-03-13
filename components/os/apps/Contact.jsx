"use client";

import { PERSONAL } from "../data";
import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_FIELD_STYLE,
  APP_META_TEXT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
} from "../ui/retro";

export default function ContactApp() {
  const contacts = [
    { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, icon: "/socials/email.png" },
    { label: "GitHub", value: PERSONAL.github.replace("https://", ""), href: PERSONAL.github, icon: "/socials/github.png" },
    { label: "LinkedIn", value: PERSONAL.linkedin.replace("https://", ""), href: PERSONAL.linkedin, icon: "/socials/linkedin.png" },
    { label: "Phone", value: PERSONAL.phone || "(717) 216-9005", href: "tel:+17172169005", icon: "/socials/phone.png" },
    { label: "Location", value: PERSONAL.location, href: null, icon: null },
  ];

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>Contact Information</div>
          <div style={APP_META_TEXT_STYLE}>Preferred ways to reach Jacob for backend, full-stack, or systems-oriented work.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {contacts.map((contact) => (
            <div key={contact.label} style={{ ...APP_PANEL_STYLE, display: "flex", alignItems: "center", gap: 8, padding: "6px 8px" }}>
              <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {contact.icon
                  ? <img src={contact.icon} alt={contact.label} width={16} height={16} style={{ imageRendering: "pixelated", objectFit: "contain" }} />
                  : <span style={{ fontSize: 11, color: "#000080", fontWeight: 700 }}>LOC</span>}
              </div>
              <div style={{ minWidth: 56, fontSize: 10, fontWeight: 700, color: "#444", flexShrink: 0 }}>{contact.label}</div>
              <div style={{ ...APP_FIELD_STYLE, flex: 1, padding: "3px 6px", minHeight: 22 }}>
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

        <div style={{ ...APP_PANEL_STYLE, padding: "6px 8px" }}>
          <div style={{ fontSize: 10, color: "#444" }}>
            Open to backend, full-stack, or related roles in the Philadelphia area or nationwide remote.
          </div>
        </div>
      </div>
    </div>
  );
}
