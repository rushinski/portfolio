"use client";

import { EXPERIENCE } from "@/components/shared/data";
import { getSkillIconSrc } from "@/components/shared/skillIcon";

import { W95_FONT } from "@/components/shared/constants";

export default function ExperienceMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      {EXPERIENCE.map((exp, i) => (
        <div
          key={i}
          style={{
            background: "#f0f0ea",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #808080",
            borderBottom: "2px solid #808080",
            marginBottom: 12,
          }}
        >
          {/* Header */}
          <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "8px 10px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#000080" }}>{exp.company}</div>
            <div style={{ fontSize: 11, color: "#444", marginTop: 2, fontStyle: "italic" }}>{exp.role}</div>
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 9, color: "#555" }}>{exp.period}</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6, marginBottom: exp.stack.length > 0 ? 8 : 0, fontFamily: W95_FONT }}>{exp.paragraph}</div>
            {exp.stack.length > 0 && (
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {exp.stack.map((tech) => {
                  const icon = getSkillIconSrc(tech);
                  return (
                    <span key={tech} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px 2px 5px", fontSize: 11, lineHeight: 1, color: "#111", background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", fontFamily: W95_FONT }}>
                      {icon && <img src={icon} alt="" width={14} height={14} style={{ objectFit: "contain", display: "block", flexShrink: 0, verticalAlign: "middle" }} />}
                      <span style={{ verticalAlign: "middle" }}>{tech}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
