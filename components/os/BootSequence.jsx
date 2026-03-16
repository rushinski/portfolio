"use client";

import { useEffect, useRef } from "react";

import { useOSContext } from "./context/OSContext";

const BOOT_MS = 2600;
const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

export default function BootSequence({ onComplete, embedded = false }) {
  const startedRef = useRef(false);
  const timeoutRef = useRef(null);
  const {
    audio: { playStartupSound },
  } = useOSContext();

  useEffect(() => {
    if (startedRef.current) return undefined;
    startedRef.current = true;
    playStartupSound?.();
    timeoutRef.current = window.setTimeout(() => onComplete?.(), BOOT_MS);
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); };
  }, [onComplete, playStartupSound]);

  return (
    <>
      <style>{`
        @keyframes bsLogoIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes bsProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes bsFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bsFadeOut {
          0%   { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes bsBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: embedded ? "absolute" : "fixed",
          inset: 0,
          zIndex: embedded ? 20000 : 99999,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: W95_FONT,
          animation: `bsFadeOut ${BOOT_MS}ms linear forwards`,
        }}
      >
        {/* Logo block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            animation: "bsLogoIn 300ms ease-out 200ms both",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #000080, #1084d0)",
              padding: "5px 22px",
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: 1,
              border: "2px solid",
              borderColor: "#ffffff #404040 #404040 #ffffff",
              boxShadow: "2px 2px 0 #000",
            }}
          >
            JacobOS
          </div>
          <div style={{ fontSize: 9, color: "#808080", letterSpacing: 0.5 }}>
            Version 1.0 — Desktop Edition
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            marginTop: 36,
            width: 180,
            animation: "bsFadeIn 200ms ease-out 400ms both",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 14,
              background: "#111",
              border: "2px solid",
              borderColor: "#404040 #ffffff #ffffff #404040",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "#000080",
                animation: `bsProgress ${BOOT_MS - 800}ms linear 500ms both`,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#404040",
              textAlign: "center",
              marginTop: 4,
              animation: "bsBlink 1s step-end infinite",
            }}
          >
            Loading...
          </div>
        </div>

        {/* Copyright footer */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            fontSize: 8,
            color: "#333",
            letterSpacing: 0.3,
            animation: "bsFadeIn 300ms ease-out 600ms both",
          }}
        >
          © 2025 Jacob Rushinski. All rights reserved.
        </div>
      </div>
    </>
  );
}
