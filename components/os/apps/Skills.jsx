"use client";

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
  TypeScript: "typescript.webp",
  JavaScript: "javascript.webp",
  Python: "python.png",
  Go: "go.png",
  SQL: "sql.png",
  Java: "java.png",
  "C++": "c__.png",
  PHP: "php.png",
  HTML: "html.png",
  CSS: "css.png",
  "Node.js": "nodejs.png",
  "Next.js": "nextjs.png",
  Flask: "flask.png",
  React: "react.png",
  PostgreSQL: "postgresql.png",
  MySQL: "mysql.png",
  MongoDB: "mongodb.png",
  Redis: "redis.png",
  "Tailwind CSS": "tailwindcss.png",
  Stripe: "stripe.webp",
  Supabase: "supabase.png",
  "Discord.js": "discord.webp",
  ADBKit: "andriod.png",
  "AWS SES": "awsses.png",
  Docker: "docker.png",
  Git: "git.png",
  GitHub: "github.png",
  "GitHub Actions": "githubactions.png",
  Vercel: "vercel.png",
  "Upstash Redis": "redis.png",
  "GitHub Gist API": "github.png",
};

function SkillCard({ name }) {
  const file = SKILL_ICON_FILES[name];

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
      {file ? (
        <img src={`/skills/${file}`} alt={name} width={40} height={40} style={{ imageRendering: "pixelated", objectFit: "contain", width: 40, height: 40 }} />
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
          }}
        >
          {name.slice(0, 3)}
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
