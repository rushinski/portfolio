"use client";

import { useState } from "react";

import { SKILLS } from "../data";
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
  "Node.js": "Nodejs.png",
  "Next.js": "Nextjs.png",
  Flask: "Flask.png",
  React: "React.png",
  PostgreSQL: "PostgresSQL.png",
  MySQL: "MySQL.png",
  MongoDB: "MongoDB.png",
  Redis: "Redis.png",
  "Tailwind CSS": "TailwindCSS.png",
  Stripe: "stripe.webp",
  Supabase: "supabase.webp",
  "Discord.js": "Discordjs.png",
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

function SkillCard({ name }) {
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

  return (
    <div
      style={{
        ...APP_PANEL_STYLE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "8px 4px 6px",
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
      <span style={{ fontSize: 9, color: "#000", textAlign: "center", fontWeight: 600, lineHeight: 1.2, maxWidth: 76, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name}
      </span>
    </div>
  );
}

export default function SkillsApp() {
  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, padding: "12px 14px" }}>
        {Object.entries(SKILLS).map(([category, items]) => (
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
              {items.map((skill) => (
                <SkillCard key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
