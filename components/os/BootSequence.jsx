"use client";

import { useEffect, useRef } from "react";

import { useOSContext } from "./context/OSContext";

const BOOT_DURATION_MS = 2450;

export default function BootSequence({ onComplete, embedded = false }) {
  const startedRef = useRef(false);
  const timeoutRef = useRef(null);
  const {
    audio: { playStartupSound },
  } = useOSContext();

  useEffect(() => {
    if (startedRef.current) {
      return undefined;
    }

    startedRef.current = true;
    playStartupSound?.();

    timeoutRef.current = window.setTimeout(() => {
      onComplete?.();
    }, BOOT_DURATION_MS);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [onComplete, playStartupSound]);

  return (
    <>
      <style>{`
        @keyframes crtBootOverlay {
          0%, 90% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes crtBootLine {
          0%, 14% {
            opacity: 0;
            transform: translateY(-50%) scaleX(0.008) scaleY(1);
            filter: blur(0px);
          }
          22% {
            opacity: 1;
            transform: translateY(-50%) scaleX(0.08) scaleY(1.05);
            filter: blur(0px);
          }
          38% {
            opacity: 1;
            transform: translateY(-50%) scaleX(1) scaleY(1.65);
            filter: blur(0.35px);
          }
          56% {
            opacity: 0.95;
            transform: translateY(-50%) scaleX(1.02) scaleY(1.1);
            filter: blur(0.8px);
          }
          100% {
            opacity: 0;
            transform: translateY(-50%) scaleX(1.04) scaleY(0.8);
            filter: blur(2px);
          }
        }

        @keyframes crtBootTopShutter {
          0%, 24% {
            transform: translateY(0%);
          }
          72% {
            transform: translateY(-101%);
          }
          100% {
            transform: translateY(-101%);
          }
        }

        @keyframes crtBootBottomShutter {
          0%, 24% {
            transform: translateY(0%);
          }
          72% {
            transform: translateY(101%);
          }
          100% {
            transform: translateY(101%);
          }
        }

        @keyframes crtBootFlash {
          0%, 20%, 42%, 100% {
            opacity: 0;
          }
          26% {
            opacity: 0.16;
          }
          34% {
            opacity: 0.09;
          }
        }

        @keyframes crtBootFlicker {
          0%, 58%, 68%, 78%, 100% {
            opacity: 0;
          }
          62% {
            opacity: 0.08;
          }
          74% {
            opacity: 0.06;
          }
        }

        @keyframes crtBootScanlines {
          0%, 26% {
            opacity: 0;
          }
          36%, 72% {
            opacity: 0.14;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: embedded ? "absolute" : "fixed",
          inset: 0,
          zIndex: embedded ? 20000 : 99999,
          overflow: "hidden",
          pointerEvents: "none",
          background: "transparent",
          animation: `crtBootOverlay ${BOOT_DURATION_MS}ms linear forwards`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 6,
            background: "rgba(255,255,255,0.12)",
            opacity: 0,
            animation: "crtBootFlash 700ms linear 120ms forwards",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "50.5%",
            zIndex: 20,
            background: "#000",
            transformOrigin: "center bottom",
            borderBottom: "1px solid rgba(255,255,255,0.55)",
            animation: "crtBootTopShutter 1080ms cubic-bezier(0.16, 0.94, 0.14, 1) 170ms forwards",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "50.5%",
            zIndex: 20,
            background: "#000",
            transformOrigin: "center top",
            borderTop: "1px solid rgba(255,255,255,0.55)",
            animation: "crtBootBottomShutter 1080ms cubic-bezier(0.16, 0.94, 0.14, 1) 170ms forwards",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            zIndex: 24,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.92) 12%, #ffffff 50%, rgba(255,255,255,0.92) 88%, transparent 100%)",
            boxShadow: "0 0 6px rgba(255,255,255,0.9)",
            transformOrigin: "center center",
            animation: "crtBootLine 520ms cubic-bezier(0.18, 0.94, 0.2, 1) 120ms forwards",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: "rgba(255,255,255,0.12)",
            opacity: 0,
            animation: "crtBootFlicker 1500ms linear 980ms forwards",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 8,
            background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 4px)",
            mixBlendMode: "screen",
            opacity: 0,
            animation: `crtBootScanlines ${BOOT_DURATION_MS}ms linear forwards`,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 9,
            background: "radial-gradient(circle at center, transparent 58%, rgba(0,0,0,0.22) 100%)",
          }}
        />
      </div>
    </>
  );
}
