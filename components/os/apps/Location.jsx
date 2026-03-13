"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_META_TEXT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
} from "../ui/retro";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Pennsylvania FIPS code
const PA_FIPS = "42";

const LOCATIONS = [
  {
    id: "harrisburg",
    label: "Harrisburg, PA",
    role: "Home + Work",
    note: "Home base. Work at Giant Food Stores in the area.",
    coordinates: [-76.8867, 40.2732],
    color: "#008000",
  },
  {
    id: "lancaster",
    label: "Lancaster, PA",
    role: "School",
    note: "Attending Thaddeus Stevens College of Technology. Most weekdays here during the semester.",
    coordinates: [-76.3055, 40.0379],
    color: "#000080",
  },
  {
    id: "philadelphia",
    label: "Philadelphia, PA",
    role: "Weekends + Future",
    note: "In Philly most weekends. Looking to move up here eventually.",
    coordinates: [-75.1652, 39.9526],
    color: "#800000",
  },
];

function PinIcon({ color }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" shapeRendering="crispEdges">
      <ellipse cx="7" cy="7" rx="5" ry="5" fill={color} />
      <ellipse cx="7" cy="7" rx="3" ry="3" fill="#fff" opacity="0.45" />
      <rect x="6" y="11" width="2" height="6" fill={color} />
      <rect x="5" y="16" width="4" height="1" fill={color} opacity="0.5" />
    </svg>
  );
}

export default function LocationApp() {
  const [now, setNow] = useState(() => new Date());
  const [activePin, setActivePin] = useState(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const estTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/New_York" });
  const estDate = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
  const gmtTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC", hour12: false });
  const gmtDate = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  const localTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Header */}
        <div>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 4 }}>Jacob&apos;s Pennsylvania Circuit</div>
          <div style={APP_META_TEXT_STYLE}>
            Jacob travels between three PA cities regularly — school in Lancaster, home &amp; work in Harrisburg, and weekends in Philadelphia (with plans to move there).
          </div>
        </div>

        {/* Maps — US overview (left) + PA detail (right) */}
        <div style={{ display: "flex", gap: 8 }}>
          {/* US map — PA highlighted */}
          <div style={{ ...APP_PANEL_STYLE, flex: 1, padding: 0, overflow: "hidden", background: "#c8dff0" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#404040", padding: "3px 6px", background: "#d4d0c8", borderBottom: "1px solid #808080" }}>United States</div>
            {!mapError ? (
              <ComposableMap
                projection="geoAlbersUsa"
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                <Geographies geography={GEO_URL} onError={() => setMapError(true)}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isPA = geo.id === PA_FIPS;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isPA ? "#d4e8c2" : "#e8e8e8"}
                          stroke={isPA ? "#5a8a3a" : "#b0b0b0"}
                          strokeWidth={isPA ? 1.5 : 0.5}
                          style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            ) : (
              <div style={{ padding: "12px 14px", fontSize: 11, color: "#555" }}>Map unavailable.</div>
            )}
          </div>

          {/* PA detail map — city markers */}
          <div style={{ ...APP_PANEL_STYLE, flex: 1, padding: 0, overflow: "hidden", background: "#c8dff0" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#404040", padding: "3px 6px", background: "#d4d0c8", borderBottom: "1px solid #808080" }}>Pennsylvania</div>
            {!mapError ? (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [-77.5, 41.0], scale: 5000 }}
                height={500}
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isPA = geo.id === PA_FIPS;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isPA ? "#d4e8c2" : "#eeeeee"}
                          stroke={isPA ? "#5a8a3a" : "#cccccc"}
                          strokeWidth={isPA ? 1.5 : 0.5}
                          style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                        />
                      );
                    })
                  }
                </Geographies>

                {LOCATIONS.map((loc) => (
                  <Marker
                    key={loc.id}
                    coordinates={loc.coordinates}
                    onClick={() => setActivePin(activePin === loc.id ? null : loc.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {activePin === loc.id && (
                      <circle r={9} fill="none" stroke={loc.color} strokeWidth={2} opacity={0.5} />
                    )}
                    <circle r={5} fill={loc.color} stroke="#fff" strokeWidth={1.5} />
                    <circle r={2} fill="#fff" opacity={0.5} />
                    <text
                      textAnchor={loc.id === "philadelphia" ? "end" : "start"}
                      x={loc.id === "philadelphia" ? -8 : 8}
                      y={4}
                      style={{ fontFamily: "sans-serif", fontSize: 8, fontWeight: 700, fill: loc.color, cursor: "pointer", userSelect: "none" }}
                    >
                      {loc.label.split(",")[0]}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
            ) : (
              <div style={{ padding: "12px 14px", fontSize: 11, color: "#555" }}>Map unavailable.</div>
            )}
          </div>
        </div>

        {/* Active pin detail */}
        {activePin && (() => {
          const loc = LOCATIONS.find((l) => l.id === activePin);
          return (
            <div style={{ ...APP_PANEL_STYLE, borderLeft: `3px solid ${loc.color}`, padding: "7px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <PinIcon color={loc.color} />
                <strong style={{ fontSize: 12, color: loc.color }}>{loc.label}</strong>
                <span style={{ fontSize: 11, color: "#555", marginLeft: 4 }}>— {loc.role}</span>
              </div>
              <div style={{ fontSize: 11, color: "#333", lineHeight: 1.5 }}>{loc.note}</div>
            </div>
          );
        })()}

        {/* Location cards */}
        <div>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>Locations</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActivePin(activePin === loc.id ? null : loc.id)}
                style={{ ...APP_PANEL_STYLE, width: "100%", textAlign: "left", padding: "6px 10px", cursor: "pointer", fontFamily: "inherit", borderLeft: `3px solid ${loc.color}`, background: activePin === loc.id ? "#e8e8f8" : undefined }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <strong style={{ fontSize: 12, color: loc.color }}>{loc.label}</strong>
                  <span style={{ fontSize: 10, color: "#666" }}>{loc.role}</span>
                </div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{loc.note}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time display */}
        <div>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>Time</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ ...APP_PANEL_STYLE, flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#000080", marginBottom: 3 }}>Eastern (EST/EDT)</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 15, fontWeight: 700, color: "#111" }}>{estTime}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{estDate}</div>
            </div>
            <div style={{ ...APP_PANEL_STYLE, flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", marginBottom: 3 }}>UTC / GMT+0</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 15, color: "#333" }}>{gmtTime}</div>
              <div style={{ fontSize: 10, color: "#777", marginTop: 2 }}>{gmtDate}</div>
            </div>
          </div>
          {localTimezone !== "America/New_York" && (
            <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>Your browser: {localTimezone} — {localTime}</div>
          )}
        </div>

      </div>
    </div>
  );
}
