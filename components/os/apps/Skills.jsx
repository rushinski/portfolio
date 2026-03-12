"use client";

import { SKILLS } from "../data";

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 4px 6px", background: "#d4d0c8", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "default" }}>
      {file ? (
        <img src={`/skills/${file}`} alt={name} width={40} height={40} style={{ imageRendering: "pixelated", objectFit: "contain", width: 40, height: 40 }} />
      ) : (
        <div style={{ width: 40, height: 40, background: "#c0c0c0", border: "1px solid", borderColor: "#808080 #ffffff #ffffff #808080", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700, color: "#333" }}>
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
    <div style={{ padding: "12px 16px", background: "#fff", minHeight: "100%" }}>
      {Object.entries(SKILLS).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #808080", paddingBottom: 3, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1 }}>{category}</div>
            <div style={{ fontSize: 9, background: "#c0c0c0", border: "1px solid", borderColor: "#808080 #ffffff #ffffff #808080", padding: "0 4px", color: "#444" }}>
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
  );
}
