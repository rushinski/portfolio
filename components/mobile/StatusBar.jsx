"use client";

import { useEffect, useState } from "react";

import { W95_FONT } from "@/components/shared/constants";

function SignalBars() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" shapeRendering="crispEdges" aria-hidden>
      <rect x="0" y="9" width="3" height="3" fill="#000080" />
      <rect x="4" y="6" width="3" height="6" fill="#000080" />
      <rect x="8" y="3" width="3" height="9" fill="#000080" />
      <rect x="12" y="0" width="3" height="12" fill="#000080" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="20" height="11" viewBox="0 0 20 11" shapeRendering="crispEdges" aria-hidden>
      {/* body */}
      <rect x="0" y="1" width="16" height="9" fill="none" stroke="#111" strokeWidth="1" />
      {/* terminal nub */}
      <rect x="16" y="3" width="3" height="5" fill="#111" />
      {/* fill segments (4 bars = full) */}
      <rect x="2" y="3" width="2" height="5" fill="#008000" />
      <rect x="5" y="3" width="2" height="5" fill="#008000" />
      <rect x="8" y="3" width="2" height="5" fill="#008000" />
      <rect x="11" y="3" width="2" height="5" fill="#008000" />
    </svg>
  );
}

function Clock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

export default function StatusBar() {
  return (
    <div
      style={{
        height: 24,
        flexShrink: 0,
        background: "#c0c0c0",
        borderBottom: "1px solid #404040",
        boxShadow: "inset 0 -1px 0 #808080",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        fontFamily: W95_FONT,
        fontSize: 10,
        color: "#111",
        userSelect: "none",
      }}
    >
      {/* Left: signal bars + carrier label */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <SignalBars />
        <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: 0.3 }}>JacobOS</span>
      </div>

      {/* Right: battery + clock */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <BatteryIcon />
        <Clock />
      </div>
    </div>
  );
}
