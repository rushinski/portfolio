"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import { APP_BODY_STYLE, APP_PANEL_STYLE } from "../ui/retro";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const PA_FIPS = "42";

const LOCATIONS = [
  {
    id: "harrisburg",
    label: "Harrisburg, PA",
    role: "Home + Work",
    noteLines: ["Home base. Work at", "Giant Food Stores."],
    coordinates: [-76.8867, 40.2732],
    color: "#008000",
    // callout box offset from pin
    bx: -215,
    by: -110,
    bw: 150,
    bh: 72,
  },
  {
    id: "lancaster",
    label: "Lancaster, PA",
    role: "School",
    noteLines: ["Thaddeus Stevens College", "of Technology. Weekdays."],
    coordinates: [-76.3055, 40.0379],
    color: "#000080",
    bx: -215,
    by: 20,
    bw: 150,
    bh: 72,
  },
  {
    id: "philadelphia",
    label: "Philadelphia, PA",
    role: "Weekends + Future",
    noteLines: ["In Philly most weekends.", "Plans to move here."],
    coordinates: [-75.1652, 39.9526],
    color: "#800000",
    bx: 18,
    by: -50,
    bw: 158,
    bh: 72,
  },
];

// Win95-style callout box rendered inside SVG
function Callout({ loc }) {
  const { bx, by, bw, bh, color, label, role, noteLines } = loc;
  return (
    <g>
      {/* connector line from callout to pin */}
      <line
        x1={bx < 0 ? bx + bw : bx}
        y1={by + bh / 2}
        x2={0}
        y2={0}
        stroke={color}
        strokeWidth={1.2}
        opacity={0.5}
        strokeDasharray="4 3"
      />
      {/* box shadow */}
      <rect x={bx + 2} y={by + 2} width={bw} height={bh} fill="#808080" />
      {/* box face */}
      <rect x={bx} y={by} width={bw} height={bh} fill="#d4d0c8" stroke="#404040" strokeWidth={1} />
      {/* top-left highlight */}
      <line x1={bx} y1={by} x2={bx + bw} y2={by} stroke="#fff" strokeWidth={1.2} />
      <line x1={bx} y1={by} x2={bx} y2={by + bh} stroke="#fff" strokeWidth={1.2} />
      {/* title bar */}
      <rect x={bx + 1} y={by + 1} width={bw - 2} height={16} fill={color} />
      <text
        x={bx + 5}
        y={by + 12}
        style={{ fontSize: 11, fontWeight: 700, fill: "#fff", fontFamily: "Arial, sans-serif", userSelect: "none" }}
      >
        {label}
      </text>
      {/* role */}
      <text
        x={bx + 5}
        y={by + 30}
        style={{ fontSize: 10, fill: "#444", fontFamily: "Arial, sans-serif", fontStyle: "italic", userSelect: "none" }}
      >
        {role}
      </text>
      {/* note lines */}
      {noteLines.map((line, i) => (
        <text
          key={i}
          x={bx + 5}
          y={by + 45 + i * 13}
          style={{ fontSize: 9.5, fill: "#222", fontFamily: "Arial, sans-serif", userSelect: "none" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function LocationApp() {
  const [now, setNow] = useState(() => new Date());
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const estTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/New_York",
  });
  const estDate = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });

  return (
    <div style={APP_BODY_STYLE}>
      {/* Full-bleed map container */}
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", background: "#c8dff0" }}>
        {!mapError ? (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-77.2, 40.4], scale: 2200 }}
            width={800}
            height={500}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <Geographies geography={GEO_URL} onError={() => setMapError(true)}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isPA = geo.id === PA_FIPS;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isPA ? "#d4e8c2" : "#e4e4e4"}
                      stroke={isPA ? "#5a8a3a" : "#c0c0c0"}
                      strokeWidth={isPA ? 1.5 : 0.4}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {LOCATIONS.map((loc) => (
              <Marker key={loc.id} coordinates={loc.coordinates}>
                <Callout loc={loc} />
                <circle r={7} fill={loc.color} stroke="#fff" strokeWidth={2} />
                <circle r={2.5} fill="#fff" opacity={0.65} />
              </Marker>
            ))}
          </ComposableMap>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#555" }}>
            Map unavailable.
          </div>
        )}

        {/* Overlay: title + time */}
        <div style={{ position: "absolute", top: 8, left: 8, right: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, pointerEvents: "none" }}>
          <div style={{ ...APP_PANEL_STYLE, padding: "5px 9px", background: "rgba(212,208,200,0.92)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#000080", letterSpacing: 1, marginBottom: 1 }}>
              WHERE&apos;S JACOB
            </div>
            <div style={{ fontSize: 10, color: "#444" }}>
              Harrisburg · Lancaster · Philadelphia, PA
            </div>
          </div>
          <div style={{ ...APP_PANEL_STYLE, padding: "5px 9px", textAlign: "right", background: "rgba(212,208,200,0.92)" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#000080", marginBottom: 1 }}>Jacob&apos;s Time (EST)</div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: "#111" }}>{estTime}</div>
            <div style={{ fontSize: 9, color: "#555", marginTop: 1 }}>{estDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
