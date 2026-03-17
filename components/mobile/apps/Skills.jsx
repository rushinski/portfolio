"use client";

import { useState } from "react";
import { SKILLS, SKILL_PROFICIENCY } from "@/components/shared/data";
import { getSkillIconSrc } from "@/components/os/ui/skillIcon";

import { W95_FONT } from "@/components/shared/constants";

const PROFICIENCY_LABELS = { 1: "Foundational", 2: "Working Knowledge", 3: "Proficient", 4: "Advanced", 5: "Expert" };
const PROFICIENCY_COLORS = { 1: "#c8e0ff", 2: "#8fb8ee", 3: "#5f92da", 4: "#2f67bf", 5: "#0b2f87" };

function SkillPill({ name }) {
  const level = SKILL_PROFICIENCY[name] ?? 1;
  const color = PROFICIENCY_COLORS[level];
  const [imgFailed, setImgFailed] = useState(false);
  const src = getSkillIconSrc(name);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 8px",
        background: "#f0f0ea",
        borderTop: "1px solid #ffffff",
        borderLeft: "1px solid #ffffff",
        borderRight: "1px solid #808080",
        borderBottom: "1px solid #808080",
        fontFamily: W95_FONT,
      }}
    >
      {src && !imgFailed ? (
        <img src={src} alt={name} width={20} height={20} onError={() => setImgFailed(true)} style={{ width: 20, height: 20, objectFit: "contain", flexShrink: 0 }} />
      ) : (
        <div style={{ width: 20, height: 20, background: "#c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: "#333", flexShrink: 0 }}>
          {name.slice(0, 3).toUpperCase()}
        </div>
      )}
      <span style={{ fontSize: 11, color: "#111", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
      {/* Mini proficiency bar */}
      <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
        {[1,2,3,4,5].map((i) => (
          <div key={i} style={{ width: 6, height: 10, background: i <= level ? color : "#e0e0e0", border: "1px solid #999" }} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      {/* Proficiency key */}
      <div style={{ background: "#f0f0ea", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", padding: "8px 10px", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#444", marginBottom: 6 }}>Proficiency Key</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[1,2,3,4,5].map((level) => (
            <div key={level} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, background: PROFICIENCY_COLORS[level], border: "1px solid #666" }} />
              <span style={{ fontSize: 9, color: "#444" }}>{PROFICIENCY_LABELS[level]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill categories */}
      {Object.entries(SKILLS).map(([category, skills]) => {
        const sorted = [...skills].sort((a, b) => (SKILL_PROFICIENCY[b] ?? 1) - (SKILL_PROFICIENCY[a] ?? 1));
        return (
          <div key={category} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, background: "#000080", color: "#fff", padding: "2px 8px", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>{category}</span>
              <span style={{ fontSize: 9, background: "#c0c0c0", color: "#111", padding: "0 4px" }}>{skills.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {sorted.map((skill) => <SkillPill key={skill} name={skill} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
