"use client";

import { useEffect, useState } from "react";

export default function BootSequence({ onComplete, embedded = false }) {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState("bios");

  const bootLines = [
    { text: "JacobOS BIOS v1.0", delay: 80 },
    { text: "Checking memory... 640K OK", delay: 150 },
    { text: "Detecting hardware...", delay: 100 },
    { text: "  CPU: Intel 80486DX @ 33MHz", delay: 60 },
    { text: "  RAM: 4096 KB", delay: 50 },
    { text: "  VGA: 640x480 256 colors", delay: 50 },
    { text: "  HDD: 120 MB - OK", delay: 80 },
    { text: "", delay: 40 },
    { text: "Loading JacobOS...", delay: 200 },
    { text: "Mounting filesystem...", delay: 120 },
    { text: "Starting desktop environment...", delay: 150 },
    { text: "", delay: 60 },
    { text: "Welcome to JacobOS", delay: 250 },
  ];

  useEffect(() => {
    const timeouts = [];
    let currentDelay = 0;

    bootLines.forEach((line, index) => {
      currentDelay += line.delay;
      const lineTimeout = setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        if (index === bootLines.length - 1) {
          timeouts.push(setTimeout(() => setPhase("fade"), 200));
          timeouts.push(setTimeout(onComplete, 700));
        }
      }, currentDelay);
      timeouts.push(lineTimeout);
    });

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: embedded ? "absolute" : "fixed",
        inset: 0,
        background: "#000",
        zIndex: embedded ? 100 : 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600, padding: "2rem" }}>
        <pre
          style={{
            color: "#00ff41",
            fontSize: "13px",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            textShadow: "0 0 8px rgba(0,255,65,0.4)",
          }}
        >
          {lines.map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
          <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
        </pre>
      </div>
    </div>
  );
}
