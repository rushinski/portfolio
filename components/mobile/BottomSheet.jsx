"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APP_TITLES, MOBILE_APP_MAP } from "./mobileConstants";

// Mobile app components — static imports
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

export default function BottomSheet({ appId, onClose }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  // Swipe-to-close tracking
  const dragStartY = useRef(null);
  const sheetRef = useRef(null);

  // Entrance animation
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
    }, 260);
  }, [onClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Swipe down to close
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (dragStartY.current === null) return;
    const dy = e.changedTouches[0].clientY - dragStartY.current;
    dragStartY.current = null;
    if (dy > 80) handleClose();
  };

  if (!appId) return null;

  const AppComponent = APP_COMPONENTS[appId];
  const title = APP_TITLES[appId] ?? appId;
  const app = MOBILE_APP_MAP[appId];

  const isOpen = visible && !closing;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          background: "rgba(0,0,0,0.45)",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 250ms ease",
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "95dvh",
          zIndex: 9001,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 260ms ease-out",
          background: "#c0c0c0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040",
        }}
      >
        {/* Drag handle hint */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 0 4px",
            flexShrink: 0,
            background: "#c0c0c0",
            cursor: "grab",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              background: "#808080",
              borderTop: "1px solid #404040",
              borderLeft: "1px solid #404040",
            }}
          />
        </div>

        {/* Win95-style title bar */}
        <div
          style={{
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
            display: "flex",
            alignItems: "center",
            padding: "2px 4px 2px 6px",
            gap: 6,
            flexShrink: 0,
            height: 26,
          }}
        >
          {/* Small icon */}
          <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: 0.9 }}>
            {app?.icon}
          </div>

          {/* Title */}
          <span
            style={{
              color: "#ffffff",
              fontFamily: W95_FONT,
              fontSize: 11,
              fontWeight: 700,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>

          {/* Close button — Win95 style [X] */}
          <button
            onClick={handleClose}
            style={{
              width: 20,
              height: 20,
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              color: "#000",
              flexShrink: 0,
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            background: "#ffffff",
            position: "relative",
          }}
        >
          {AppComponent ? (
            <AppComponent />
          ) : (
            <div style={{ padding: 20, fontFamily: W95_FONT, fontSize: 12, color: "#555" }}>
              App not found: {appId}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
