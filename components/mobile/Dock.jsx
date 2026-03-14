"use client";

import { MOBILE_APP_MAP } from "./mobileConstants";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const PINNED = ["about", "skills", "projects", "contact"];

export default function Dock({ onOpen }) {
  return (
    <div
      style={{
        flexShrink: 0,
        // Frosted Win95 dock — semi-transparent beige over the blue desktop
        background: "rgba(192,192,192,0.88)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderTop: "1px solid rgba(255,255,255,0.7)",
        padding: "8px 12px 10px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {PINNED.map((appId) => {
        const app = MOBILE_APP_MAP[appId];
        if (!app) return null;
        return <DockIcon key={appId} app={app} onOpen={onOpen} />;
      })}
    </div>
  );
}

function DockIcon({ app, onOpen }) {
  return (
    <button
      onClick={() => onOpen(app.id)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 8px",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
      }}
    >
      {/* Win95 raised icon tile */}
      <div
        style={{
          width: 52,
          height: 52,
          background: "#c0c0c0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #808080",
          borderBottom: "2px solid #808080",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {app.icon}
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: W95_FONT,
          fontSize: 9,
          color: "#ffffff",
          textShadow: "1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
          whiteSpace: "nowrap",
        }}
      >
        {app.label}
      </span>
    </button>
  );
}
