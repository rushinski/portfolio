"use client";

import { useEffect, useRef } from "react";

import { W95_FONT } from "@/components/shared/constants";
const BOOT_MS = 2600;

export default function MobileBootSequence({ onComplete }) {
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    const t = setTimeout(() => onComplete?.(), BOOT_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes mbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mbFadeOut {
          0%   { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes mbProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes mbLogoIn {
          0%   { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes mbBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* Full-screen black boot overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: `mbFadeOut ${BOOT_MS}ms linear forwards`,
          fontFamily: W95_FONT,
        }}
      >
        {/* Logo block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            animation: "mbLogoIn 300ms ease-out 200ms both",
          }}
        >
          {/* Win95-style title bar as logo */}
          <div
            style={{
              background: "linear-gradient(90deg, #000080, #1084d0)",
              padding: "4px 18px",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: 1,
              border: "2px solid",
              borderColor: "#ffffff #404040 #404040 #ffffff",
              boxShadow: "2px 2px 0 #000",
            }}
          >
            JacobOS Mobile
          </div>

          {/* Version subtitle */}
          <div style={{ fontSize: 9, color: "#808080", letterSpacing: 0.5 }}>
            Version 1.0 — Mobile Edition
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            marginTop: 32,
            width: 160,
            animation: "mbFadeIn 200ms ease-out 400ms both",
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
                animation: `mbProgress ${BOOT_MS - 800}ms linear 500ms both`,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#404040",
              textAlign: "center",
              marginTop: 4,
              animation: "mbBlink 1s step-end infinite",
            }}
          >
            Loading...
          </div>
        </div>

        {/* Copyright footer */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            fontSize: 8,
            color: "#333",
            letterSpacing: 0.3,
            animation: "mbFadeIn 300ms ease-out 600ms both",
          }}
        >
          © 2025 Jacob Rushinski. All rights reserved.
        </div>
      </div>
    </>
  );
}
