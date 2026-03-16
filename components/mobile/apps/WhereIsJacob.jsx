"use client";

import { LOCATIONS } from "@/components/os/data";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

function DotPin({ color }) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" shapeRendering="crispEdges" aria-hidden>
      <ellipse cx="8" cy="8" rx="6" ry="6" fill={color} />
      <ellipse cx="8" cy="8" rx="3" ry="3" fill="#ffffff" opacity="0.4" />
      <rect x="7" y="13" width="2" height="6" fill={color} />
      <rect x="6" y="18" width="4" height="1" fill={color} opacity="0.5" />
    </svg>
  );
}

export default function WhereIsJacobMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      {/* Header blurb */}
      <div style={{
        background: "#f0f0ea",
        borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #808080", borderBottom: "2px solid #808080",
        padding: "10px 12px", marginBottom: 14,
      }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#000080", marginBottom: 6 }}>Where Is Jacob?</div>
        <div style={{ fontSize: 11, color: "#333", lineHeight: 1.7 }}>
          Based in the Central Pennsylvania / Philadelphia corridor. I split my time between Harrisburg (home & work), Lancaster (school), and Philadelphia (weekends).
        </div>
      </div>

      {/* Pennsylvania map — simplified SVG outline */}
      <div style={{
        background: "#f0f0ea",
        borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #808080", borderBottom: "2px solid #808080",
        padding: "10px", marginBottom: 14, textAlign: "center",
      }}>
        <svg width="100%" viewBox="0 0 320 160" shapeRendering="crispEdges" style={{ maxWidth: 320 }}>
          {/* PA silhouette approximation */}
          <rect x="10" y="20" width="300" height="120" rx="4" fill="#c8d8f0" stroke="#404040" strokeWidth="2" />
          <text x="160" y="90" textAnchor="middle" fontFamily={W95_FONT} fontSize="13" fill="#000080" fontWeight="700">Pennsylvania</text>

          {/* City dots — approximate positions */}
          {/* Harrisburg: ~center-left */}
          <circle cx="145" cy="75" r="6" fill="#008000" stroke="#ffffff" strokeWidth="1" />
          <text x="145" y="60" textAnchor="middle" fontFamily={W95_FONT} fontSize="9" fill="#111">Harrisburg</text>

          {/* Lancaster: ~center */}
          <circle cx="185" cy="85" r="6" fill="#000080" stroke="#ffffff" strokeWidth="1" />
          <text x="190" y="100" textAnchor="middle" fontFamily={W95_FONT} fontSize="9" fill="#111">Lancaster</text>

          {/* Philadelphia: ~far right */}
          <circle cx="268" cy="80" r="6" fill="#800000" stroke="#ffffff" strokeWidth="1" />
          <text x="268" y="65" textAnchor="middle" fontFamily={W95_FONT} fontSize="9" fill="#111">Philadelphia</text>

          {/* Dotted travel line */}
          <line x1="145" y1="75" x2="185" y2="85" stroke="#555" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="185" y1="85" x2="268" y2="80" stroke="#555" strokeWidth="1" strokeDasharray="3,3" />
        </svg>
      </div>

      {/* Location cards */}
      {LOCATIONS.map((loc) => (
        <div
          key={loc.label}
          style={{
            background: "#f0f0ea",
            borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #808080", borderBottom: "2px solid #808080",
            marginBottom: 10, display: "flex", gap: 12,
          }}
        >
          <div style={{ width: 5, background: loc.color, flexShrink: 0 }} />
          <div style={{ padding: "10px 10px 10px 4px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <DotPin color={loc.color} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#111" }}>{loc.label}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: loc.color, textTransform: "uppercase", letterSpacing: 0.5 }}>{loc.role}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>{loc.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
