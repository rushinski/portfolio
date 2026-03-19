"use client";

import { EXPERIENCE } from "@/components/shared/data";
import { APP_BODY_STYLE, APP_CONTENT_STYLE } from "../ui/retro";
import { getSkillIconSrc } from "@/components/shared/skillIcon";

export default function ExperienceApp() {
  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, padding: "10px 12px" }}>
        {EXPERIENCE.map((experience, index) => (
          <div key={`${experience.company}-${index}`} style={{ marginBottom: 10, border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>
            <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "5px 10px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{experience.company}</div>
                <div style={{ fontSize: 10, color: "#555", fontStyle: "italic", marginTop: 1 }}>{experience.role}</div>
              </div>
              <span style={{ fontSize: 9, color: "#555", flexShrink: 0 }}>{experience.period}</span>
            </div>
            <div style={{ padding: "6px 10px 8px" }}>
              <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6, marginBottom: experience.stack.length > 0 ? 8 : 0 }}>{experience.paragraph}</div>
              {experience.stack.length > 0 && (
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {experience.stack.map((tech) => {
                    const icon = getSkillIconSrc(tech);
                    return (
                      <span key={tech} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px 2px 5px", fontSize: 11, lineHeight: 1, background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
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
    </div>
  );
}
