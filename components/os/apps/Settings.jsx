"use client";

import { useState } from "react";

import { DESKTOP_COLORS } from "../constants";
import { useSettings } from "../hooks/useSettings";

export default function SettingsApp() {
  const { iconSizeMode, setIconSizeMode, clockFormat, setClockFormat, desktopColor, setDesktopColor } = useSettings();
  const [activeTab, setActiveTab] = useState("display");

  const tabButton = (id, label) => {
    const isActive = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        style={{
          fontFamily: "inherit",
          fontSize: 11,
          cursor: "pointer",
          padding: "3px 10px 4px",
          background: isActive ? "#c0c0c0" : "#b0b0b0",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #404040",
          borderBottom: isActive ? "2px solid #c0c0c0" : "2px solid #404040",
          marginRight: 2,
          position: "relative",
          zIndex: isActive ? 2 : 1,
          fontWeight: isActive ? 700 : 400,
          color: "#111",
        }}
      >
        {label}
      </button>
    );
  };

  const win95Button = (id, label, active, onClick) => (
    <button
      key={id}
      onClick={onClick}
      style={{
        fontFamily: "inherit",
        fontSize: 11,
        cursor: "pointer",
        padding: "3px 12px",
        background: "#c0c0c0",
        borderTop: active ? "1px solid #404040" : "2px solid #fff",
        borderLeft: active ? "1px solid #404040" : "2px solid #fff",
        borderRight: active ? "1px solid #fff" : "2px solid #404040",
        borderBottom: active ? "1px solid #fff" : "2px solid #404040",
        fontWeight: active ? 700 : 400,
        color: "#111",
      }}
    >
      {label}
    </button>
  );

  const sectionLabel = {
    fontSize: 10,
    fontWeight: 700,
    color: "#000080",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: "1px solid #808080",
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 10,
  };

  return (
    <div style={{ padding: "12px 14px 0", background: "#fff", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "flex-end", borderBottom: "2px solid #404040", marginBottom: 0 }}>
        {tabButton("display", "Display")}
        {tabButton("clock", "Clock")}
        {tabButton("about", "About")}
      </div>

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, border: "2px solid", borderTop: "none", borderColor: "#404040 #fff #fff #404040", padding: "10px 12px 14px", background: "#fff" }}>
        {activeTab === "display" && (
          <>
            <div style={sectionLabel}>Desktop Icon Size</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              {["small", "medium", "large"].map((size) =>
                win95Button(
                  size,
                  size.charAt(0).toUpperCase() + size.slice(1),
                  iconSizeMode === size,
                  () => setIconSizeMode(size),
                ),
              )}
            </div>

            <div style={sectionLabel}>Desktop Background</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {DESKTOP_COLORS.map(({ label, value, preview }) => {
                const isSelected = desktopColor === value;
                return (
                  <div key={label} onClick={() => setDesktopColor(value)} title={label} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 28, height: 20, background: preview, border: isSelected ? "2px solid #000080" : "1px solid #808080", outline: isSelected ? "1px solid #fff" : "none", outlineOffset: -3 }} />
                    <span style={{ fontSize: 9, color: "#333", whiteSpace: "nowrap" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "clock" && (
          <>
            <div style={sectionLabel}>Time Format</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["12h", "12-hour (AM/PM)"], ["24h", "24-hour"]].map(([value, label]) => (
                <label key={value} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 11, color: "#111" }}>
                  <div
                    onClick={() => setClockFormat(value)}
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      border: "2px solid #808080",
                      borderTop: "2px solid #404040",
                      borderLeft: "2px solid #404040",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {clockFormat === value && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#000080" }} />}
                  </div>
                  <span onClick={() => setClockFormat(value)}>{label}</span>
                </label>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "6px 10px", border: "2px inset #c0c0c0", background: "#fff", fontSize: 11, color: "#111" }}>
              Preview: <strong>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: clockFormat === "12h" })}</strong>
            </div>
          </>
        )}

        {activeTab === "about" && (
          <>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 4 }}>
              <div style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>🖥</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 2 }}>JacobOS 98</div>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>Build 2026.03 · Portfolio Edition</div>
                <div style={{ fontSize: 11, color: "#222", lineHeight: 1.7 }}>
                  <div>Frontend: <strong>Next.js 15 · React 18</strong></div>
                  <div>Backend: <strong>Go 1.23 · PostgreSQL</strong></div>
                  <div>Infra: <strong>Digital Ocean · Upstash Redis</strong></div>
                  <div>Processor: <strong>Human Brain @ variable GHz</strong></div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: "6px 10px", border: "2px inset #c0c0c0", background: "#fff", fontSize: 10, color: "#555", lineHeight: 1.6 }}>
              This product is licensed to: <strong>Jacob Rushinski</strong><br />
              Full-stack engineer · Est. 2024<br />
              &copy; 2026 JacobOS Corp. All rights reserved.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
