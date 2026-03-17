"use client";

import { MOBILE_APP_MAP } from "./mobileConstants";

import { W95_FONT } from "@/components/shared/constants";

const BTN_STYLE = {
  background: "#c0c0c0",
  border: "none",
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #404040",
  borderBottom: "2px solid #404040",
  fontFamily: W95_FONT,
  fontSize: 10,
  fontWeight: 700,
  cursor: "pointer",
  padding: "4px 10px",
  display: "flex",
  alignItems: "center",
  gap: 5,
  height: 30,
  flexShrink: 0,
  touchAction: "manipulation",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none",
  color: "#111",
};

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges" aria-hidden>
      {/* roof */}
      <polygon points="7,1 0,8 14,8" fill="#111" />
      {/* chimney */}
      <rect x="9" y="3" width="2" height="4" fill="#111" />
      {/* walls */}
      <rect x="2" y="8" width="10" height="5" fill="#111" />
      {/* door cutout */}
      <rect x="5" y="10" width="4" height="3" fill="#c0c0c0" />
    </svg>
  );
}

function AppsGridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" shapeRendering="crispEdges" aria-hidden>
      <rect x="0" y="0" width="5" height="5" fill="#111" />
      <rect x="7" y="0" width="5" height="5" fill="#111" />
      <rect x="0" y="7" width="5" height="5" fill="#111" />
      <rect x="7" y="7" width="5" height="5" fill="#111" />
    </svg>
  );
}

export default function BottomNav({ openAppId, onHome }) {
  const currentApp = openAppId ? MOBILE_APP_MAP[openAppId] : null;

  return (
    <div
      style={{
        height: 48,
        flexShrink: 0,
        background: "#c0c0c0",
        borderTop: "1px solid #ffffff",
        boxShadow: "inset 0 1px 0 #ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        gap: 6,
        fontFamily: W95_FONT,
      }}
    >
      {/* Home button */}
      <button onClick={onHome} style={BTN_STYLE} title="Home">
        <HomeIcon />
        <span>Home</span>
      </button>

      {/* Current app label — Win95 sunken field */}
      <div
        style={{
          flex: 1,
          background: "#ffffff",
          borderTop: "1px solid #808080",
          borderLeft: "1px solid #808080",
          borderRight: "1px solid #dfdfdf",
          borderBottom: "1px solid #dfdfdf",
          padding: "0 8px",
          height: 30,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          fontFamily: W95_FONT,
          fontSize: 11,
          color: "#111",
          gap: 6,
        }}
      >
        {openAppId && (
          <span
            style={{
              width: 8,
              height: 8,
              background: "#000080",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
        )}
        <span
          style={{
            fontWeight: openAppId ? 700 : 400,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentApp ? currentApp.label : "Desktop"}
        </span>
      </div>

      {/* Apps button */}
      <button style={BTN_STYLE} title="All Apps">
        <AppsGridIcon />
        <span>APPS</span>
      </button>
    </div>
  );
}
