"use client";

import { W95_FONT } from "@/components/shared/constants";

const SECTION = { fontSize: 10, fontWeight: 700, background: "#000080", color: "#fff", padding: "2px 8px", marginBottom: 4 };
const PANEL = { background: "#f0f0ea", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", padding: "10px 12px", marginBottom: 12 };

export default function SettingsMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      {/* System info */}
      <div style={SECTION}>System</div>
      <div style={PANEL}>
        {[
          ["OS", "JacobOS Mobile v1.0"],
          ["Build", "2026"],
          ["Display", "Touchscreen Mode"],
          ["User", "jacob_rushinski"],
          ["Processor", "Jacob's Brain™ @ 3.52 GHz"],
          ["RAM", "16GB Determination"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, paddingBottom: 6, borderBottom: "1px solid #d4d0c8" }}>
            <span style={{ fontSize: 11, color: "#555", fontWeight: 700 }}>{k}:</span>
            <span style={{ fontSize: 11, color: "#111" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Display note */}
      <div style={SECTION}>Display</div>
      <div style={PANEL}>
        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.7, marginBottom: 10 }}>
          You're on the mobile version of JacobOS. For the full interactive Windows 95 desktop experience with draggable windows, a taskbar, file explorer, and more — visit on a screen wider than 768px.
        </div>
        <div style={{
          background: "#c0c0c0",
          borderTop: "1px solid #808080", borderLeft: "1px solid #808080",
          borderRight: "1px solid #ffffff", borderBottom: "1px solid #ffffff",
          padding: "6px 10px", fontSize: 10, color: "#333",
        }}>
          ℹ️ Desktop mode: visit on tablet or desktop browser
        </div>
      </div>

      {/* Credits */}
      <div style={SECTION}>Credits</div>
      <div style={PANEL}>
        <div style={{ fontSize: 11, color: "#333", lineHeight: 1.7 }}>
          Built with Next.js 16 · React 18 · Tailwind CSS
          <br />
          All UI hand-crafted — no component libraries.
          <br />
          Icons: custom Win95 pixel-art SVGs.
          <br /><br />
          <span style={{ color: "#000080", fontWeight: 700 }}>github.com/rushinski</span>
        </div>
      </div>
    </div>
  );
}
