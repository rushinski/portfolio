"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { LOCATIONS } from "@/components/os/data";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';
const US_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const PA_FIPS = "42";
const USA_ID = "840";

const PANEL = {
  background: "#d4d0c8",
  border: "2px solid",
  borderColor: "#ffffff #808080 #808080 #ffffff",
  padding: "5px 9px",
};

function Callout({ loc }) {
  const { bx, by, bw, bh, color, label, role, noteLines } = loc;
  const lineX1 = bx < 0 ? bx + bw : bx;
  const lineY1 = by + bh / 2;
  return (
    <g>
      <line x1={lineX1} y1={lineY1} x2={0} y2={0} stroke={color} strokeWidth={1.3} opacity={0.6} strokeDasharray="5 3" />
      <rect x={bx + 2} y={by + 2} width={bw} height={bh} fill="#808080" />
      <rect x={bx} y={by} width={bw} height={bh} fill="#d4d0c8" stroke="#404040" strokeWidth={1} />
      <line x1={bx} y1={by} x2={bx + bw} y2={by} stroke="#ffffff" strokeWidth={1.5} />
      <line x1={bx} y1={by} x2={bx} y2={by + bh} stroke="#ffffff" strokeWidth={1.5} />
      <rect x={bx + 1} y={by + 1} width={bw - 2} height={16} fill={color} />
      <text x={bx + 5} y={by + 13} style={{ fontSize: 11, fontWeight: 700, fill: "#fff", fontFamily: "Arial, sans-serif", userSelect: "none" }}>
        {label}
      </text>
      <text x={bx + 5} y={by + 30} style={{ fontSize: 10, fill: "#444", fontFamily: "Arial, sans-serif", fontStyle: "italic", userSelect: "none" }}>
        {role}
      </text>
      {noteLines.map((line, i) => (
        <text key={i} x={bx + 5} y={by + 45 + i * 13} style={{ fontSize: 9.5, fill: "#222", fontFamily: "Arial, sans-serif", userSelect: "none" }}>
          {line}
        </text>
      ))}
    </g>
  );
}

export default function WhereIsJacobMobile() {
  const [now, setNow] = useState(() => new Date());
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const estTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/New_York",
  });
  const estDate = now.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York",
  });

  return (
    <div style={{ background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT, display: "flex", flexDirection: "column" }}>
      {/* Title + clock overlay row */}
      <div style={{ display: "flex", gap: 8, padding: "10px 12px 6px", flexShrink: 0 }}>
        <div style={{ ...PANEL, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#000080", letterSpacing: 1, marginBottom: 1 }}>
            WHERE&apos;S JACOB
          </div>
          <div style={{ fontSize: 10, color: "#444" }}>
            Harrisburg · Lancaster · Philadelphia
          </div>
        </div>
        <div style={{ ...PANEL, textAlign: "right" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#000080", marginBottom: 1 }}>EST</div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, fontWeight: 700, color: "#111" }}>{estTime}</div>
          <div style={{ fontSize: 9, color: "#555" }}>{estDate}</div>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, margin: "0 12px 12px", border: "2px solid", borderColor: "#808080 #ffffff #ffffff #808080", background: "#c8dff0", overflow: "hidden", position: "relative", minHeight: 280 }}>
        {!mapError ? (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-77.2, 40.4], scale: 3000 }}
            width={800}
            height={500}
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          >
            <Geographies geography={WORLD_URL} onError={() => setMapError(true)}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => String(geo.id) !== USA_ID)
                  .map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#dcdcdc" stroke="#b8b8b8" strokeWidth={0.4}
                      style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                    />
                  ))
              }
            </Geographies>
            <Geographies geography={US_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isPA = geo.id === PA_FIPS;
                  return (
                    <Geography key={geo.rsmKey} geography={geo}
                      fill={isPA ? "#d4e8c2" : "#ebebeb"}
                      stroke={isPA ? "#5a8a3a" : "#c0c0c0"}
                      strokeWidth={isPA ? 1.5 : 0.4}
                      style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
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
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#555", fontFamily: W95_FONT }}>
            Map unavailable.
          </div>
        )}
      </div>

      {/* Location cards */}
      <div style={{ padding: "0 12px 12px" }}>
        {LOCATIONS.map((loc) => (
          <div key={loc.id} style={{ background: "#f0f0ea", borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", marginBottom: 8, display: "flex" }}>
            <div style={{ width: 5, background: loc.color, flexShrink: 0 }} />
            <div style={{ padding: "8px 10px 8px 8px", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#111" }}>{loc.label}</div>
                <span style={{ fontSize: 9, fontWeight: 700, color: loc.color, textTransform: "uppercase", letterSpacing: 0.5 }}>{loc.role}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{loc.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
