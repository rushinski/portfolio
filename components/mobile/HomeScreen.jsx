"use client";

import { useCallback, useRef, useState } from "react";
import { MOBILE_APP_REGISTRY } from "@/components/shared/apps";

import { W95_FONT } from "@/components/shared/constants";
const LONG_PRESS_MS = 600;

function AppIconTile({ app, index, onOpen, onLongPress, shakeMode, onDeleteAttempt, isDragging }) {
  const timerRef = useRef(null);
  const didLongPress = useRef(false);
  const [pressed, setPressed] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = useCallback((e) => {
    if (shakeMode) return; // drag handled at grid level in shake mode
    didLongPress.current = false;
    setPressed(true);
    timerRef.current = setTimeout(() => {
      didLongPress.current = true;
      setPressed(false);
      if (navigator.vibrate) navigator.vibrate(50);
      onLongPress();
    }, LONG_PRESS_MS);
  }, [onLongPress, shakeMode]);

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
    if (shakeMode) return;
    onOpen(app.id);
  }, [app.id, onOpen, shakeMode]);

  return (
    <div
      data-icon-idx={index}
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
        cursor: shakeMode ? "grab" : "pointer",
        touchAction: shakeMode ? "none" : "manipulation",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        position: "relative",
        transform: pressed && !shakeMode ? "scale(0.92)" : isDragging ? "scale(1.15)" : "scale(1)",
        transition: shakeMode ? "none" : "transform 80ms ease",
        animation: shakeMode && !isDragging ? "iconShake 0.5s ease-in-out infinite" : "none",
        opacity: isDragging ? 0.45 : 1,
        zIndex: isDragging ? 50 : 1,
      }}
    >
      {/* Win95-style delete badge — only in shake mode */}
      {shakeMode && (
        <div
          onClick={(e) => { e.stopPropagation(); onDeleteAttempt(app.id); }}
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform: "translateX(-50%) translateX(-14px)",
            width: 16,
            height: 16,
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #404040 #404040 #ffffff",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 2px 0 #000000",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{ color: "#000", fontSize: 9, lineHeight: 1, fontWeight: 700, fontFamily: W95_FONT }}>✕</span>
        </div>
      )}

      <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {app.glyph}
      </div>

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
        {app.iconLabel}
      </span>
    </div>
  );
}

export default function HomeScreen({ onOpen, onLongPress, shakeMode, onDeleteAttempt, onExitShake, onBackgroundTap }) {
  // Ordered list of app IDs (drag-to-reorder mutates this)
  const [iconOrder, setIconOrder] = useState(() => MOBILE_APP_REGISTRY.map((a) => a.id));
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });

  // Map id → app object for quick lookup
  const appById = Object.fromEntries(MOBILE_APP_REGISTRY.map((a) => [a.id, a]));
  const orderedApps = iconOrder.map((id) => appById[id]).filter(Boolean);

  const dragRef = useRef({ active: false, idx: null });

  // ── Grid-level touch handlers for drag-to-reorder in shake mode ──────────

  const findIconIdx = (clientX, clientY) => {
    const elements = document.elementsFromPoint(clientX, clientY);
    for (const el of elements) {
      const raw = el.getAttribute?.("data-icon-idx");
      if (raw !== null && raw !== undefined) return parseInt(raw, 10);
    }
    return null;
  };

  const handleGridTouchStart = useCallback((e) => {
    if (!shakeMode) return;
    // Only start drag if touching an icon cell
    const touch = e.touches[0];
    const idx = findIconIdx(touch.clientX, touch.clientY);
    if (idx === null) return;
    dragRef.current = { active: true, idx };
    setDraggingIdx(idx);
    setGhostPos({ x: touch.clientX, y: touch.clientY });
  }, [shakeMode]);

  const handleGridTouchMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    e.preventDefault();
    const touch = e.touches[0];
    setGhostPos({ x: touch.clientX, y: touch.clientY });

    const overIdx = findIconIdx(touch.clientX, touch.clientY);
    if (overIdx !== null && overIdx !== dragRef.current.idx) {
      const srcIdx = dragRef.current.idx;
      setIconOrder((prev) => {
        const next = [...prev];
        [next[srcIdx], next[overIdx]] = [next[overIdx], next[srcIdx]];
        return next;
      });
      dragRef.current.idx = overIdx;
      setDraggingIdx(overIdx);
    }
  }, []);

  const handleGridTouchEnd = useCallback(() => {
    dragRef.current.active = false;
    setDraggingIdx(null);
  }, []);

  return (
    <div
      onClick={onBackgroundTap}
      style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        background: "linear-gradient(180deg, #0b4aa6 0%, #0a3f90 100%)",
        backgroundImage: [
          "linear-gradient(180deg, #0b4aa6 0%, #0a3f90 100%)",
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "100% 100%, 3px 3px",
        padding: "8px",
        position: "relative",
      }}
    >
      <div
        onTouchStart={handleGridTouchStart}
        onTouchMove={handleGridTouchMove}
        onTouchEnd={handleGridTouchEnd}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "4px 0",
          touchAction: shakeMode ? "none" : "auto",
        }}
      >
        {orderedApps.map((app, idx) => (
          <AppIconTile
            key={app.id}
            app={app}
            index={idx}
            onOpen={onOpen}
            onLongPress={onLongPress}
            shakeMode={shakeMode}
            onDeleteAttempt={onDeleteAttempt}
            isDragging={draggingIdx === idx}
          />
        ))}
      </div>

      {/* Tap hint when in shake mode */}
      {shakeMode && (
        <div
          onClick={onExitShake}
          style={{
            marginTop: 20,
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            fontFamily: W95_FONT,
            textShadow: "1px 1px 0 #000",
            pointerEvents: "auto",
          }}
        >
          Tap anywhere to stop jiggling
        </div>
      )}

      {/* Floating ghost icon while dragging */}
      {draggingIdx !== null && orderedApps[draggingIdx] && (
        <div
          style={{
            position: "fixed",
            left: ghostPos.x - 20,
            top: ghostPos.y - 30,
            width: 40,
            height: 40,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.9,
            transform: "scale(1.25)",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
          }}
        >
          {orderedApps[draggingIdx].glyph}
        </div>
      )}
    </div>
  );
}
