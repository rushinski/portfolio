"use client";

import { useEffect, useState } from "react";
import { PERSONAL } from "@/components/os/data";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const SECTION = {
  fontFamily: W95_FONT,
  fontSize: 10,
  fontWeight: 700,
  background: "#000080",
  color: "#ffffff",
  padding: "2px 8px",
  marginBottom: 6,
  letterSpacing: 0.5,
  textTransform: "uppercase",
};

const PANEL = {
  background: "#f0f0ea",
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #808080",
  borderBottom: "2px solid #808080",
  padding: "10px 12px",
  marginBottom: 10,
};

export default function AboutMobile() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const [ghData, setGhData] = useState(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d && !d.error) setGhData(d); })
      .catch(() => {});
  }, []);

  const socials = [
    { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
    { label: "Phone", value: "(717) 216-9005", href: "tel:+17172169005" },
    { label: "LinkedIn", value: "linkedin.com/in/jacobrushinski", href: PERSONAL.linkedin },
    { label: "GitHub", value: "github.com/rushinski", href: PERSONAL.github },
  ];

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      {/* Header */}
      <div style={PANEL}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 64, height: 64, background: "#c0c0c0", flexShrink: 0, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", overflow: "hidden" }}>
            {photoFailed ? (
              <div style={{ width: "100%", height: "100%", background: "#000080", display: "grid", placeItems: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>
                JR
              </div>
            ) : (
              <img src="/professional_photo.jpeg" alt="Jacob Rushinski" width={64} height={64} onError={() => setPhotoFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#000080" }}>{PERSONAL.name}</div>
            <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{PERSONAL.title}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>{PERSONAL.school}</div>
            <div style={{ fontSize: 10, color: "#666" }}>GPA {PERSONAL.gpa} · {PERSONAL.gradDate}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6 }}>
          {PERSONAL.tagline}
        </div>
      </div>

      {/* Bio */}
      <div style={SECTION}>About</div>
      <div style={{ ...PANEL }}>
        <div style={{ fontSize: 11, color: "#222", lineHeight: 1.7 }}>
          Backend and full-stack developer currently attending {PERSONAL.school} in Lancaster, PA. I build production-grade systems — APIs, data modeling, authentication, payments, and automation.
          <br /><br />
          Working at Giant Food Stores while finishing my degree. I spend weekends in Philadelphia and plan to move there after graduation.
        </div>
      </div>

      {/* GitHub activity */}
      {ghData && (
        <>
          <div style={SECTION}>GitHub</div>
          <div style={{ ...PANEL, display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Repos", value: ghData.publicRepos ?? "—" },
              { label: "Followers", value: ghData.followers ?? "—" },
              { label: "Stars", value: ghData.totalStars ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center", flex: "1 0 60px" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#000080" }}>{value}</div>
                <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Contact links */}
      <div style={SECTION}>Links</div>
      <div style={PANEL}>
        {socials.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
              borderBottom: "1px solid #e0e0e0",
              textDecoration: "none",
              color: "#000080",
              fontSize: 11,
              fontFamily: W95_FONT,
              touchAction: "manipulation",
            }}
          >
            <span style={{ fontWeight: 700, minWidth: 56, color: "#111" }}>{label}:</span>
            <span style={{ color: "#000080", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
