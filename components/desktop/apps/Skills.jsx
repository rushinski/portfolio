"use client";

import { useState } from "react";

import { SKILLS, SKILL_PROFICIENCY } from "@/components/shared/data";
import Tooltip from "../ui/Tooltip";
import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
  RAISED_BORDER,
  WIN95_COLORS,
} from "../ui/retro";

import { SKILL_ICON_FILES } from "../ui/skillIcon";

const PROFICIENCY_LABELS = {
  1: "Foundational",
  2: "Working Knowledge",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

const PROFICIENCY_COLORS = {
  1: "#c8e0ff",
  2: "#8fb8ee",
  3: "#5f92da",
  4: "#2f67bf",
  5: "#0b2f87",
};

function getSkillLevel(skill) {
  return SKILL_PROFICIENCY[skill] ?? 1;
}

function getLevelColor(level) {
  return PROFICIENCY_COLORS[level] || PROFICIENCY_COLORS[1];
}

function ProficiencyMeter({ level, compact = false }) {
  const segmentWidth = compact ? 12 : 13;
  const segmentHeight = compact ? 7 : 8;

  return (
    <div
      aria-label={`${level} out of 5`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(5, ${segmentWidth}px)`,
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const segmentLevel = index + 1;
        const filled = index < level;

        return (
          <span
            key={`${level}-${index}`}
            style={{
              width: segmentWidth,
              height: segmentHeight,
              background: filled ? getLevelColor(segmentLevel) : "#e7e7e7",
              border: `1px solid ${filled ? "#404040" : "#9b9b9b"}`,
              boxSizing: "border-box",
            }}
          />
        );
      })}
    </div>
  );
}

function ProficiencyKey() {
  return (
    <div style={{ ...APP_PANEL_STYLE, padding: "8px 10px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#444", marginBottom: 6 }}>Proficiency Key</div>
      <div style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>1 is lowest. 5 is highest.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {[1, 2, 3, 4, 5].map((level) => (
          <div key={level} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 10, color: "#333", fontWeight: 600 }}>{PROFICIENCY_LABELS[level]}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ProficiencyMeter level={level} compact />
              <span style={{ fontSize: 10, color: "#555", whiteSpace: "nowrap" }}>{level}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillLevelDonutChart({ counts }) {
  const items = [1, 2, 3, 4, 5].map((level) => ({
    level,
    label: PROFICIENCY_LABELS[level],
    count: counts[level] || 0,
    color: getLevelColor(level),
  }));
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const donutItems = items.filter((item) => item.count > 0);

  if (totalCount === 0) {
    return null;
  }

  const size = 78;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 2;
  const innerRadius = radius * 0.52;
  let angle = -Math.PI / 2;

  const paths = donutItems.map((item) => {
    const sweep = Math.min((item.count / totalCount) * 2 * Math.PI, 2 * Math.PI * 0.9999);
    const start = angle;
    const end = angle + sweep;
    angle += (item.count / totalCount) * 2 * Math.PI;

    const large = sweep > Math.PI ? 1 : 0;
    const format = (value) => value.toFixed(2);

    return {
      key: item.level,
      color: item.color,
      d: `M ${format(cx + radius * Math.cos(start))} ${format(cy + radius * Math.sin(start))} A ${radius} ${radius} 0 ${large} 1 ${format(cx + radius * Math.cos(end))} ${format(cy + radius * Math.sin(end))} L ${format(cx + innerRadius * Math.cos(end))} ${format(cy + innerRadius * Math.sin(end))} A ${innerRadius} ${innerRadius} 0 ${large} 0 ${format(cx + innerRadius * Math.cos(start))} ${format(cy + innerRadius * Math.sin(start))} Z`,
    };
  });

  return (
    <div style={{ ...APP_PANEL_STYLE, padding: "8px 10px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#444", marginBottom: 2 }}>Skill Levels</div>
      <div style={{ fontSize: 9, color: "#777", marginBottom: 8 }}>by share of skills</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", flexShrink: 0 }}>
          {paths.map((path) => (
            <path key={path.key} d={path.d} fill={path.color} stroke={WIN95_COLORS.surface} strokeWidth={1} />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          {items.map((item) => {
            const percentage = Math.round((item.count / totalCount) * 100);

            return (
              <div key={item.level} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#333", minWidth: 0 }}>
                <span style={{ width: 8, height: 8, background: item.color, border: "1px solid rgba(0,0,0,0.15)", boxSizing: "border-box", flexShrink: 0 }} />
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{item.label}</span>
                <span style={{ color: "#666", marginLeft: "auto", flexShrink: 0 }}>{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SkillCard({ name, level }) {
  const file = SKILL_ICON_FILES[name];
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackLabel = name.length <= 4
    ? name
    : name
        .split(/[\s.+-]+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();
  const tooltipLabel = `${PROFICIENCY_LABELS[level]} (${level}/5)`;

  return (
    <div
      style={{
        ...APP_PANEL_STYLE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        padding: "8px 4px 7px",
        cursor: "default",
      }}
    >
      {file && !imageFailed ? (
        <img
          src={`/skills/${file}`}
          alt={name}
          width={40}
          height={40}
          onError={() => setImageFailed(true)}
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            objectPosition: "center",
            imageRendering: "auto",
          }}
        />
      ) : (
        <div
          style={{
            ...RAISED_BORDER,
            width: 40,
            height: 40,
            background: WIN95_COLORS.surface,
            display: "grid",
            placeItems: "center",
            fontSize: 9,
            fontWeight: 700,
            color: "#333",
            textTransform: "uppercase",
            textAlign: "center",
            letterSpacing: 0.4,
            padding: 2,
          }}
        >
          {fallbackLabel}
        </div>
      )}

      <Tooltip label={tooltipLabel}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%" }}>
          <span style={{ fontSize: 9, color: "#000", textAlign: "center", fontWeight: 600, lineHeight: 1.2, maxWidth: 76, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </span>
          <ProficiencyMeter level={level} />
        </div>
      </Tooltip>
    </div>
  );
}

export default function SkillsApp() {
  const levelBreakdown = [1, 2, 3, 4, 5].reduce((acc, level) => {
    acc[level] = Object.values(SKILL_PROFICIENCY).filter((value) => value === level).length;
    return acc;
  }, {});

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, padding: "12px 14px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: "1 1 520px", minWidth: 0 }}>
            {Object.entries(SKILLS).map(([category, items]) => {
              const sortedItems = [...items].sort((a, b) => {
                const levelDiff = getSkillLevel(b) - getSkillLevel(a);
                return levelDiff !== 0 ? levelDiff : a.localeCompare(b);
              });

              return (
                <div key={category} style={{ marginBottom: 14 }}>
                  <div style={{ ...APP_SECTION_HEADER_STYLE, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ flex: 1 }}>{category}</div>
                    <div
                      style={{
                        ...RAISED_BORDER,
                        fontSize: 9,
                        background: WIN95_COLORS.surface,
                        padding: "0 4px",
                        color: "#444",
                        minWidth: 20,
                        textAlign: "center",
                      }}
                    >
                      {items.length}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 4 }}>
                    {sortedItems.map((skill) => (
                      <SkillCard key={skill} name={skill} level={getSkillLevel(skill)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ flex: "0 0 230px", width: 230, display: "flex", flexDirection: "column", gap: 10 }}>
            <ProficiencyKey />
            <SkillLevelDonutChart counts={levelBreakdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
