"use client";

import { EXPERIENCE } from "@/components/shared/data";
import { APP_BODY_STYLE, APP_CONTENT_STYLE } from "../ui/retro";
import { getSkillIconSrc } from "../ui/skillIcon";

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
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: "#555" }}>{experience.period}</span>
                <span style={{ padding: "0 5px", fontSize: 9, fontWeight: 700, background: "#c0c0c0", color: "#111", border: "1px solid #808080" }}>{experience.type}</span>
              </div>
            </div>
            <div style={{ padding: "6px 10px 8px" }}>
              <div style={{ fontSize: 11, color: "#444", marginBottom: 6, lineHeight: 1.5, fontStyle: "italic" }}>{experience.desc}</div>
              {experience.bullets.map((bullet, bulletIndex) => (
                <div key={`${experience.company}-${bulletIndex}`} style={{ fontSize: 11, color: "#222", padding: "1px 0 1px 13px", position: "relative", lineHeight: 1.5 }}>
                  <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>{">"}</span>
                  {bullet}
                </div>
              ))}
              {experience.stack.length > 0 && (
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 7 }}>
                  {experience.stack.map((tech) => {
                    const icon = getSkillIconSrc(tech);
                    return (
                      <span key={tech} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "0 5px 0 3px", fontSize: 9, background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
                        {icon && <img src={icon} alt="" width={11} height={11} style={{ objectFit: "contain", display: "block", flexShrink: 0 }} />}
                        {tech}
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
