"use client";

import { PERSONAL } from "@/components/shared/data";

import { W95_FONT } from "@/components/shared/constants";

export default function ResumeMobile() {
  return (
    <div
      style={{
        padding: "24px 16px",
        background: "#f4f4f0",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontFamily: W95_FONT,
      }}
    >
      {/* Icon */}
      <div style={{ width: 64, height: 64, background: "#ffffff", borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="40" height="40" viewBox="0 0 32 32" shapeRendering="crispEdges">
          <rect x="6" y="2" width="14" height="28" fill="#ffffff" />
          <rect x="6" y="2" width="1" height="28" fill="#404040" />
          <rect x="6" y="29" width="20" height="1" fill="#404040" />
          <rect x="25" y="9" width="1" height="20" fill="#404040" />
          <rect x="16" y="8" width="10" height="1" fill="#404040" />
          <rect x="16" y="2" width="9" height="7" fill="#d4d0c8" />
          <rect x="9" y="12" width="8" height="1" fill="#808080" />
          <rect x="9" y="15" width="12" height="1" fill="#808080" />
          <rect x="9" y="18" width="10" height="1" fill="#808080" />
          <rect x="9" y="21" width="6" height="1" fill="#c00000" />
        </svg>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#000080", marginBottom: 4 }}>Jacob_Rushinski_Resume.pdf</div>
        <div style={{ fontSize: 11, color: "#555" }}>PDF Document · Updated Spring 2026</div>
      </div>

      {/* View button */}
      <a
        href={PERSONAL.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "12px 32px", fontFamily: W95_FONT, fontSize: 13, fontWeight: 700,
          background: "#c0c0c0", color: "#000080",
          borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040", borderBottom: "2px solid #404040",
          textDecoration: "none", width: "100%", maxWidth: 280, boxSizing: "border-box",
          touchAction: "manipulation",
        }}
      >
        📄 View Resume
      </a>

      {/* Download button */}
      <a
        href={PERSONAL.resumeUrl}
        download="Jacob_Rushinski_Resume.pdf"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "12px 32px", fontFamily: W95_FONT, fontSize: 13, fontWeight: 700,
          background: "#c0c0c0", color: "#111",
          borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040", borderBottom: "2px solid #404040",
          textDecoration: "none", width: "100%", maxWidth: 280, boxSizing: "border-box",
          touchAction: "manipulation",
        }}
      >
        💾 Download
      </a>

      <div style={{ fontSize: 10, color: "#666", textAlign: "center", maxWidth: 240 }}>
        Opens in a new tab. Right-tap and "Save" to download on iOS.
      </div>
    </div>
  );
}
