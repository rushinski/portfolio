"use client";

import { useState } from "react";

import { SKILLS, SKILL_PROFICIENCY } from "../data";
import Tooltip from "../ui/Tooltip";
import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
  RAISED_BORDER,
  WIN95_COLORS,
} from "../ui/retro";

const SKILL_ICON_FILES = {
  TypeScript: "typescript.png",
  JavaScript: "javascript.png",
  Python: "Python.png",
  Go: "Go.png",
  Java: "Java.png",
  "C++": "CPlusPlus.png",
  PHP: "PHP.png",
  HTML: "HTML5.png",
  CSS: "CSS3.png",
  "Node.js": "Node.js.png",
  "Next.js": "Next.js.png",
  Flask: "Flask.png",
  React: "React.png",
  PostgreSQL: "PostgresSQL.png",
  MySQL: "MySQL.png",
  MongoDB: "MongoDB.png",
  Redis: "Redis.png",
  "Tailwind CSS": "TailwindCSS.png",
  Stripe: "stripe.webp",
  Supabase: "supabase.png",
  "Discord.js": "Discord.js.png",
  ADBKit: "Android.png",
  "AWS SES": "AWS.png",
  Docker: "Docker.png",
  Git: "Git.png",
  GitHub: "GitHub.png",
  "GitHub Actions": "GitHubActions.png",
  Vercel: "Vercel.png",
  "Upstash Redis": "Redis.png",
  "GitHub Gist API": "GitHub.png",
};

const PROFICIENCY_LABELS = {
  1: "Foundational",
  2: "Working Knowledge",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

const PROFICIENCY_COLORS = {
  1: "#b9d7ff",
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
  const fillColor = getLevelColor(level);

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
        const filled = index < level;
        return (
          <span
            key={`${level}-${index}`}
            style={{
              width: segmentWidth,
              height: segmentHeight,
              background: filled ? fillColor : "#e7e7e7",
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

function SkillLevelChart({ counts }) {
  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <div style={{ ...APP_PANEL_STYLE, padding: "8px 10px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#444", marginBottom: 8 }}>Skill Level Breakdown</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {[1, 2, 3, 4, 5].map((level) => {
          const count = counts[level] || 0;
          const width = `${(count / maxCount) * 100}%`;

          return (
            <div key={level} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 10, color: "#333" }}>
                <span>{PROFICIENCY_LABELS[level]}</span>
                <span>{count}</span>
              </div>
              <div style={{ ...RAISED_BORDER, background: "#ececec", padding: 2 }}>
                <div
                  style={{
                    height: 10,
                    width,
                    minWidth: count > 0 ? 10 : 0,
                    background: getLevelColor(level),
                  }}
                />
              </div>
            </div>
          );
        })}
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
            <SkillLevelChart counts={levelBreakdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
