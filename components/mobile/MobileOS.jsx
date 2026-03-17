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
import LocationMobile from "./apps/Location";
import VideosMobile from "./apps/Videos";
import HelpMobile from "./apps/Help";
import SettingsMobile from "./apps/Settings";
import MinesweeperMobile from "./apps/Minesweeper";

import { APP_MAP } from "@/components/shared/apps";
import MobileBootSequence from "./MobileBootSequence";

import { W95_FONT } from "@/components/shared/constants";

const APP_COMPONENTS = {
  about:       AboutMobile,
  skills:      SkillsMobile,
  experience:  ExperienceMobile,
  projects:    ProjectsMobile,
  contact:     ContactMobile,
  resume:      ResumeMobile,
  location:    LocationMobile,
  videos:      VideosMobile,
  help:        HelpMobile,
  settings:    SettingsMobile,
  minesweeper: MinesweeperMobile,
};

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

// Full-screen app view — no title bar, no X; closed via D-pad hardware button
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
        {AppComponent ? <AppComponent onOpenApp={onOpenApp} /> : (
          <div style={{ padding: 20, fontFamily: W95_FONT, fontSize: 12, color: "#555" }}>
            App not found: {appId}
          </div>
        )}
      </div>
    </div>
  );
}

// Retro side bump button (volume / power)
function SideButton({ side, top, height }) {
  return (
    <div
      style={{
        position: "absolute",
        [side]: -5,
        top,
        width: 5,
        height,
        background: "#888",
        borderRadius: side === "left" ? "4px 0 0 4px" : "0 4px 4px 0",
        border: "1px solid #555",
        borderRight: side === "left" ? "none" : undefined,
        borderLeft: side === "right" ? "none" : undefined,
        boxShadow: side === "left"
          ? "inset 1px 1px 0 #aaa, inset 0 -1px 0 #666"
          : "inset -1px 1px 0 #aaa, inset 0 -1px 0 #666",
        pointerEvents: "none",
      }}
    />
  );
}

export default function MobileOS() {
  const [booting, setBooting] = useState(true);
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
    // Page bg — visible around phone on larger screens
    <div
      style={{
        height: "100dvh",
        width: "100%",
        background: "#6a6a6a",
        backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.08) 0px,rgba(0,0,0,0.08) 1px,transparent 1px,transparent 3px), repeating-linear-gradient(90deg,rgba(0,0,0,0.08) 0px,rgba(0,0,0,0.08) 1px,transparent 1px,transparent 3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Retro phone body — chunky plastic, Win95 bevel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 400,
          height: "100%",
          maxHeight: 900,
          background: "#909090",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          /* Win95 raised bevel */
          border: "3px solid",
          borderColor: "#c8c8c8 #484848 #484848 #c8c8c8",
          boxShadow: "0 0 0 1px #000, 4px 4px 0 #000, inset 1px 1px 0 #e0e0e0",
          overflow: "visible",
        }}
      >
        {/* Side volume buttons */}
        <SideButton side="left" top={100} height={28} />
        <SideButton side="left" top={140} height={28} />
        {/* Power button */}
        <SideButton side="right" top={120} height={52} />

        {/* TOP BEZEL — speaker slits + lens */}
        <div
          style={{
            height: 58,
            flexShrink: 0,
            background: "#828282",
            borderBottom: "2px solid #484848",
            borderRadius: "12px 12px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            overflow: "hidden",
          }}
        >
          {/* Speaker slits */}
          <div style={{ display: "flex", gap: 3 }}>
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{ width: 3, height: 9, background: "#555", borderRadius: 1, boxShadow: "inset 0 1px 0 #444, 0 1px 0 #aaa" }} />
            ))}
          </div>
          {/* Camera lens */}
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a2e", border: "2px solid #555", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8), 0 0 0 1px #3a3a3a" }} />
        </div>

        {/* SCREEN — inset Win95 sunken border */}
        <div
          style={{
            flex: 1,
            margin: "0 8px",
            border: "3px solid",
            borderColor: "#484848 #c8c8c8 #c8c8c8 #484848",
            background: "#000",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {booting && <MobileBootSequence onComplete={() => setBooting(false)} />}

          <StatusBar />

          <HomeScreen
            onOpen={handleOpen}
            onLongPress={handleLongPress}
            shakeMode={shakeMode}
            onDeleteAttempt={handleDeleteAttempt}
            onExitShake={handleExitShake}
            onBackgroundTap={handleBackgroundTap}
          />

          {openApp && <AppView appId={openApp} onClose={handleClose} onOpenApp={handleOpen} />}

          {deleteAlert && (
            <DeleteAlert
              appLabel={APP_MAP[deleteAlert]?.title ?? deleteAlert}
              onClose={handleDeleteAlertClose}
            />
          )}
        </div>

        {/* BOTTOM BEZEL — center D-pad only */}
        <div
          style={{
            height: 66,
            flexShrink: 0,
            background: "#828282",
            borderTop: "2px solid #c8c8c8",
            borderRadius: "0 0 12px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Center D-pad / home button — tap to close app or exit shake mode */}
          <div
            onClick={() => { handleClose(); setShakeMode(false); }}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#606060",
              border: "3px solid",
              borderColor: "#b0b0b0 #404040 #404040 #b0b0b0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
              cursor: "pointer",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#888", border: "2px solid #505050" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
