"use client";

import { useEffect, useRef, useState } from "react";
import { MOBILE_APP_MAP } from "./mobileConstants";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

export default function ContextMenu({ appId, x, y, onOpen, onClose }) {
  const menuRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);
  const app = MOBILE_APP_MAP[appId];

  // Dismiss on tap outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("touchstart", handler, { passive: true });
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  // Position — clamp to viewport
  const menuW = 160;
  const menuH = showInfo ? 130 : 96;
  const vw = typeof window !== "undefined" ? window.innerWidth : 400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  const left = Math.min(x, vw - menuW - 8);
  const top  = y + menuH > vh - 60 ? y - menuH : y;

  const itemStyle = (hover) => ({
    padding: "5px 18px 5px 28px",
    fontSize: 12,
    fontFamily: W95_FONT,
    cursor: "pointer",
    background: hover ? "#000080" : "transparent",
    color: hover ? "#ffffff" : "#111",
    userSelect: "none",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    whiteSpace: "nowrap",
  });

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        left,
        top,
        zIndex: 99999,
        background: "#ffffff",
        border: "1px solid #808080",
        boxShadow: "2px 2px 0 #000000",
        minWidth: menuW,
        fontFamily: W95_FONT,
        userSelect: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Separator after header */}
      <div
        style={{
          padding: "4px 8px 4px 8px",
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {app?.icon}
        </div>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {app?.label ?? appId}
        </span>
      </div>

      {/* Menu items */}
      <MenuItem
        label="Open"
        onClick={() => { onOpen(appId); onClose(); }}
      />
      <MenuItem
        label="Info"
        onClick={() => setShowInfo((v) => !v)}
        hasSubmenu={false}
      />
      {showInfo && (
        <div
          style={{
            padding: "4px 10px 6px",
            fontSize: 10,
            color: "#444",
            fontFamily: W95_FONT,
            borderTop: "1px solid #e0e0e0",
            lineHeight: 1.4,
            maxWidth: menuW,
            wordBreak: "break-word",
          }}
        >
          {app?.desc ?? "No description available."}
        </div>
      )}

      {/* Separator */}
      <div style={{ borderTop: "1px solid #808080", margin: "2px 0" }} />

      <MenuItem label="Cancel" onClick={onClose} />
    </div>
  );
}

function MenuItem({ label, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => { setHovered(false); onClick?.(); }}
      style={{
        padding: "5px 18px 5px 28px",
        fontSize: 12,
        fontFamily: '"MS Sans Serif", Tahoma, Geneva, sans-serif',
        cursor: "pointer",
        background: hovered ? "#000080" : "transparent",
        color: hovered ? "#ffffff" : "#111",
        userSelect: "none",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}
