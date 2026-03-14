"use client";

import { useCallback, useRef, useState } from "react";
import { MOBILE_APPS } from "./mobileConstants";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';
const LONG_PRESS_MS = 500;

function AppIconTile({ app, onOpen, onLongPress }) {
  const timerRef = useRef(null);
  const didLongPress = useRef(false);
  const touchRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = useCallback((e) => {
    didLongPress.current = false;
    touchRef.current = e.touches[0];
    setPressed(true);
    timerRef.current = setTimeout(() => {
      didLongPress.current = true;
      setPressed(false);
      if (navigator.vibrate) navigator.vibrate(50);
      const t = touchRef.current;
      onLongPress(
        app.id,
        t ? t.clientX : window.innerWidth / 2,
        t ? t.clientY : window.innerHeight / 2,
      );
    }, LONG_PRESS_MS);
  }, [app.id, onLongPress]);

  const handleTouchEnd = useCallback(() => {
    clearTimer();
    setPressed(false);
  }, []);

  const handleTouchMove = useCallback(() => {
    clearTimer();
    setPressed(false);
  }, []);

  const handleClick = useCallback(() => {
    if (didLongPress.current) return;
    onOpen(app.id);
  }, [app.id, onOpen]);

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "10px 4px",
        cursor: "pointer",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        transform: pressed ? "scale(0.92)" : "scale(1)",
        transition: "transform 80ms ease",
      }}
    >
      {/* Win95 raised icon tile */}
      <div
        style={{
          width: 56,
          height: 56,
          background: "#c0c0c0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #808080",
          borderBottom: "2px solid #808080",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
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
          fontSize: 10,
          color: "#ffffff",
          textAlign: "center",
          textShadow: "1px 1px 0 #000000, -1px 1px 0 #000000, 1px -1px 0 #000000, -1px -1px 0 #000000",
          lineHeight: 1.3,
          maxWidth: 76,
          wordBreak: "break-word",
          display: "block",
        }}
      >
        {app.label}
      </span>
    </div>
  );
}

export default function HomeScreen({ onOpen, onLongPress }) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        // Win95-style dithered blue desktop — dot-grid overlay simulates dithering
        background: "linear-gradient(180deg, #0b4aa6 0%, #0a3f90 100%)",
        backgroundImage: [
          "linear-gradient(180deg, #0b4aa6 0%, #0a3f90 100%)",
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "100% 100%, 3px 3px",
        padding: "8px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "4px 0",
        }}
      >
        {MOBILE_APPS.map((app) => (
          <AppIconTile
            key={app.id}
            app={app}
            onOpen={onOpen}
            onLongPress={onLongPress}
          />
        ))}
      </div>
    </div>
  );
}
