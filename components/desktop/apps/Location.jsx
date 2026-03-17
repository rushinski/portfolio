"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import { LOCATIONS } from "@/components/shared/data";
import { APP_BODY_STYLE, APP_CONTENT_STYLE, APP_PANEL_STYLE } from "../ui/retro";

// US states atlas (for PA highlight + state borders)
const US_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
// World atlas for Canada/Mexico background
const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const PA_FIPS = "42";
const USA_ID = "840"; // ISO numeric for USA — exclude from world layer so US states show through


function Callout({ loc }) {
  const { bx, by, bw, bh, color, label, role, noteLines } = loc;

  // Connector: right edge of box when box is left of pin, left edge when box is right
  const lineX1 = bx < 0 ? bx + bw : bx;
  const lineY1 = by + bh / 2;

  return (
    <g>
      {/* dashed connector line from callout edge to pin */}
      <line
        x1={lineX1}
        y1={lineY1}
        x2={0}
        y2={0}
        stroke={color}
        strokeWidth={1.3}
        opacity={0.6}
        strokeDasharray="5 3"
      />
      {/* drop shadow */}
      <rect x={bx + 2} y={by + 2} width={bw} height={bh} fill="#808080" />
      {/* panel face */}
      <rect x={bx} y={by} width={bw} height={bh} fill="#d4d0c8" stroke="#404040" strokeWidth={1} />
      {/* Win95 highlight edges */}
      <line x1={bx} y1={by} x2={bx + bw} y2={by} stroke="#ffffff" strokeWidth={1.5} />
      <line x1={bx} y1={by} x2={bx} y2={by + bh} stroke="#ffffff" strokeWidth={1.5} />
      {/* title bar */}
      <rect x={bx + 1} y={by + 1} width={bw - 2} height={16} fill={color} />
      <text
        x={bx + 5}
        y={by + 13}
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
      {/* Full-bleed map container — APP_CONTENT_STYLE provides the margin:6 grey outline */}
      <div style={{ ...APP_CONTENT_STYLE, padding: 0, position: "relative", overflow: "hidden", background: "#c8dff0" }}>
        {!mapError ? (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-77.2, 40.4], scale: 3000 }}
            width={800}
            height={500}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* World background: Canada, Mexico, etc. — US filtered out so state layer shows through */}
            <Geographies geography={WORLD_URL} onError={() => setMapError(true)}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => String(geo.id) !== USA_ID)
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#dcdcdc"
                      stroke="#b8b8b8"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
              }
            </Geographies>

            {/* US states layer */}
            <Geographies geography={US_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isPA = geo.id === PA_FIPS;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isPA ? "#d4e8c2" : "#ebebeb"}
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

            {/* City markers with callout boxes */}
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
