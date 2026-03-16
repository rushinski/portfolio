"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HomeScreen from "./HomeScreen";
import StatusBar from "./StatusBar";

// Full-screen app components
import AboutMobile from "./apps/About";
import SkillsMobile from "./apps/Skills";
import ExperienceMobile from "./apps/Experience";
import ProjectsMobile from "./apps/Projects";
import ContactMobile from "./apps/Contact";
import ResumeMobile from "./apps/Resume";
import WhereIsJacobMobile from "./apps/WhereIsJacob";
import VideosMobile from "./apps/Videos";
import HelpMobile from "./apps/Help";
import SettingsMobile from "./apps/Settings";
import MinesweeperMobile from "./apps/Minesweeper";

import { APP_TITLES, MOBILE_APP_MAP } from "./mobileConstants";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const APP_COMPONENTS = {
  about:       AboutMobile,
  skills:      SkillsMobile,
  experience:  ExperienceMobile,
  projects:    ProjectsMobile,
  contact:     ContactMobile,
  resume:      ResumeMobile,
  location:    WhereIsJacobMobile,
  videos:      VideosMobile,
  help:        HelpMobile,
  settings:    SettingsMobile,
  minesweeper: MinesweeperMobile,
};

// Win95 grip pattern for the home indicator
function RetroHomeBar({ onSwipeUp, onClick }) {
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;
    if (dy < -55) onSwipeUp?.(); // swipe UP
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={{
        height: 30,
        flexShrink: 0,
        background: "#c0c0c0",
        borderTop: "2px solid #ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* Win95 resize-grip dot pattern */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              background: "#808080",
              boxShadow: "1px 1px 0 #ffffff",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Cannot-delete alert dialog
function DeleteAlert({ appLabel, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#c0c0c0",
          border: "2px solid",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          boxShadow: "4px 4px 0 #000000",
          minWidth: 260,
          fontFamily: W95_FONT,
        }}
      >
        {/* Title bar */}
        <div style={{ background: "linear-gradient(90deg, #000080, #1084d0)", padding: "3px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>Cannot Delete Application</span>
          <button
            onClick={onClose}
            style={{ width: 18, height: 18, background: "#c0c0c0", border: "2px solid", borderColor: "#ffffff #404040 #404040 #ffffff", fontSize: 9, fontWeight: 700, cursor: "pointer", fontFamily: W95_FONT, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
          >✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>⚠</div>
          <div>
            <div style={{ fontSize: 12, color: "#111", marginBottom: 6, lineHeight: 1.5 }}>
              <strong>{appLabel}</strong> cannot be deleted.
            </div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.5 }}>
              This app is a built-in part of JacobOS and cannot be removed.
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #808080", padding: "8px 12px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ padding: "4px 20px", fontFamily: W95_FONT, fontSize: 12, fontWeight: 700, background: "#c0c0c0", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", touchAction: "manipulation" }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

// Full-screen app view — no title bar, no X, swipe up from bottom to close
function AppView({ appId, onClose, onOpenApp }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (!appId) return;
    setClosing(false);
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [appId]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  }, [onClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  if (!appId) return null;

  const AppComponent = APP_COMPONENTS[appId];
  const isOpen = visible && !closing;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
        transition: "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)",
        background: "#f4f4f0",
      }}
    >
      {/* Scrollable app content — no header, no X */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" }}>
        {AppComponent ? <AppComponent /> : (
          <div style={{ padding: 20, fontFamily: W95_FONT, fontSize: 12, color: "#555" }}>
            App not found: {appId}
          </div>
        )}
      </div>

      {/* Retro home bar — swipe up to close */}
      <RetroHomeBar onSwipeUp={handleClose} onClick={handleClose} />
    </div>
  );
}

// Side button (volume / power)
function SideButton({ side, top, height }) {
  return (
    <div
      style={{
        position: "absolute",
        [side]: -3,
        top,
        width: 3,
        height,
        background: "#2c2c2c",
        borderRadius: side === "left" ? "3px 0 0 3px" : "0 3px 3px 0",
        boxShadow: side === "left"
          ? "inset 1px 0 0 #444, inset 0 1px 0 #444, inset 0 -1px 0 #1a1a1a"
          : "inset -1px 0 0 #444, inset 0 1px 0 #444, inset 0 -1px 0 #1a1a1a",
        pointerEvents: "none",
      }}
    />
  );
}

export default function MobileOS() {
  const [openApp, setOpenApp] = useState(null);
  const [shakeMode, setShakeMode] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(null);

  const handleOpen = useCallback((appId) => {
    if (shakeMode) { setShakeMode(false); return; }
    setOpenApp(appId);
  }, [shakeMode]);

  const handleClose = useCallback(() => {
    setOpenApp(null);
  }, []);

  const handleLongPress = useCallback(() => {
    setShakeMode(true);
  }, []);

  const handleDeleteAttempt = useCallback((appId) => {
    setDeleteAlert(appId);
  }, []);

  const handleDeleteAlertClose = useCallback(() => {
    setDeleteAlert(null);
  }, []);

  const handleExitShake = useCallback(() => {
    setShakeMode(false);
  }, []);

  const handleBackgroundTap = useCallback((e) => {
    if (!shakeMode) return;
    if (e.target === e.currentTarget) setShakeMode(false);
  }, [shakeMode]);

  return (
    // Page background — visible around phone body on larger screens
    <div
      style={{
        height: "100dvh",
        width: "100%",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Phone body */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 430,
          height: "100%",
          maxHeight: 932,
          background: "#141414",
          borderRadius: 44,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: [
            "inset 0 0 0 1px #2e2e2e",
            "inset 1px 0 0 #3a3a3a",
            "inset -1px 0 0 #3a3a3a",
            "0 0 0 1px #000",
            "0 8px 40px rgba(0,0,0,0.85)",
          ].join(", "),
        }}
      >
        {/* Volume up */}
        <SideButton side="left" top={110} height={26} />
        {/* Volume down */}
        <SideButton side="left" top={148} height={26} />
        {/* Power / sleep */}
        <SideButton side="right" top={130} height={58} />

        {/* Camera island */}
        <div
          style={{
            height: 52,
            flexShrink: 0,
            background: "#0d0d0d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #222",
          }}
        >
          {/* Dynamic island pill */}
          <div
            style={{
              width: 108,
              height: 30,
              background: "#080808",
              borderRadius: 16,
              border: "1px solid #1e1e1e",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 10,
              gap: 5,
              boxShadow: "0 2px 6px rgba(0,0,0,0.8)",
            }}
          >
            {/* Front camera dot */}
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#0d1a28", border: "1px solid #1a2e3e", boxShadow: "0 0 3px rgba(0,80,160,0.3)" }} />
            {/* Microphone dot */}
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0a0f14" }} />
          </div>
        </div>

        {/* Screen content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #0b4aa6 0%, #0a3f90 100%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <StatusBar />

          {/* Home screen (always rendered beneath open apps) */}
          <HomeScreen
            onOpen={handleOpen}
            onLongPress={handleLongPress}
            shakeMode={shakeMode}
            onDeleteAttempt={handleDeleteAttempt}
            onExitShake={handleExitShake}
            onBackgroundTap={handleBackgroundTap}
          />

          {/* Home indicator on home screen */}
          {!openApp && (
            <RetroHomeBar />
          )}

          {/* Full-screen app slides in over home screen */}
          {openApp && <AppView appId={openApp} onClose={handleClose} />}

          {/* Cannot-delete alert */}
          {deleteAlert && (
            <DeleteAlert
              appLabel={MOBILE_APP_MAP[deleteAlert]?.label ?? deleteAlert}
              onClose={handleDeleteAlertClose}
            />
          )}
        </div>

        {/* Phone chin (small dark strip at bottom) */}
        <div style={{ height: 10, flexShrink: 0, background: "#0d0d0d", borderTop: "1px solid #222" }} />
      </div>
    </div>
  );
}
