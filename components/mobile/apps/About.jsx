"use client";

import { useEffect, useState } from "react";
import { PERSONAL } from "@/components/os/data";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const SECTION = {
  fontFamily: W95_FONT,
  fontSize: 10,
  fontWeight: 700,
  background: "#000080",
  color: "#ffffff",
  padding: "2px 8px",
  marginBottom: 6,
  letterSpacing: 0.5,
  textTransform: "uppercase",
};

const PANEL = {
  background: "#f0f0ea",
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #808080",
  borderBottom: "2px solid #808080",
  padding: "10px 12px",
  marginBottom: 10,
};

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  "Node.js": "#68a063",
};

const TOP_SKILL_ICONS = {
  JavaScript: "/skills/javascript.png",
  Python: "/skills/Python.png",
  PostgreSQL: "/skills/PostgresSQL.png",
  "Next.js": "/skills/Nextjs.png",
};

const TOP_SKILLS = ["JavaScript", "Python", "PostgreSQL", "Next.js"];

const CHART_COLORS = ["#c0c0c0", "#cce8cc", "#7dbf7d", "#3a8a3a", "#1a5c1a"];

function getLevel(count) {
  return count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
}

function DonutChart({ langs, size = 72 }) {
  if (!langs?.length) return null;
  const total = langs.reduce((s, l) => s + l.count, 0);
  if (!total) return null;
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 2, ir = r * 0.52;
  let angle = -Math.PI / 2;
  const fmt = (v) => v.toFixed(2);
  const paths = langs.map((l) => {
    const sweep = Math.min((l.count / total) * 2 * Math.PI, 2 * Math.PI * 0.9999);
    const s = angle, e = angle + sweep;
    angle += (l.count / total) * 2 * Math.PI;
    const large = sweep > Math.PI ? 1 : 0;
    return {
      d: `M ${fmt(cx + r * Math.cos(s))} ${fmt(cy + r * Math.sin(s))} A ${r} ${r} 0 ${large} 1 ${fmt(cx + r * Math.cos(e))} ${fmt(cy + r * Math.sin(e))} L ${fmt(cx + ir * Math.cos(e))} ${fmt(cy + ir * Math.sin(e))} A ${ir} ${ir} 0 ${large} 0 ${fmt(cx + ir * Math.cos(s))} ${fmt(cy + ir * Math.sin(s))} Z`,
      color: LANG_COLORS[l.lang] || "#999",
    };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", flexShrink: 0 }}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} stroke="#f0f0ea" strokeWidth={1} />
      ))}
    </svg>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ContributionCalendar({ calendar }) {
  const allWeeks = calendar?.weeks || [];
  const total = calendar?.totalContributions || 0;
  const cell = 9, gap = 2, step = 11;

  const monthMarkers = [];
  allWeeks.forEach((week, wi) => {
    if (!week.contributionDays?.length) return;
    const day = new Date(`${week.contributionDays[0].date}T12:00:00`);
    const month = day.getMonth();
    const prevMonth = wi > 0 && allWeeks[wi - 1].contributionDays?.length
      ? new Date(`${allWeeks[wi - 1].contributionDays[0].date}T12:00:00`).getMonth()
      : -1;
    if (month !== prevMonth) monthMarkers.push({ wi, label: MONTHS[month] });
  });

  return (
    <div style={{ ...PANEL, padding: "10px 10px 8px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>
        {total.toLocaleString()} contributions in the last year
      </div>
      <div style={{ width: "max-content" }}>
        {/* Month labels */}
        <div style={{ position: "relative", marginLeft: 18, height: 13, marginBottom: 2 }}>
          {monthMarkers.map(({ wi, label }) => (
            <span key={`${label}-${wi}`} style={{ position: "absolute", left: wi * step, fontSize: 9, color: "#000080", opacity: 0.8 }}>
              {label}
            </span>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", gap, width: 18, marginRight: 2, flexShrink: 0 }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} style={{ height: cell, fontSize: 8, color: i % 2 === 1 ? "#000080" : "transparent", lineHeight: `${cell}px`, textAlign: "right", opacity: 0.7 }}>
                {d}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap }}>
            {allWeeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap, flexShrink: 0 }}>
                {week.contributionDays.map((day, di) => (
                  <div
                    key={`${day.date}-${di}`}
                    style={{
                      width: cell, height: cell,
                      background: CHART_COLORS[getLevel(day.contributionCount)],
                      border: "1px solid rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 9, color: "#777" }}>Less</span>
          {CHART_COLORS.map((color, i) => (
            <div key={i} style={{ width: 8, height: 8, background: color, border: "1px solid rgba(0,0,0,0.12)" }} />
          ))}
          <span style={{ fontSize: 9, color: "#777" }}>More</span>
        </div>
      </div>
    </div>
  );
}

const socials = [
  { label: "Email",    value: PERSONAL.email,                     href: `mailto:${PERSONAL.email}` },
  { label: "Phone",    value: "(717) 216-9005",                   href: "tel:+17172169005" },
  { label: "LinkedIn", value: "linkedin.com/in/jacobrushinski",   href: PERSONAL.linkedin },
  { label: "GitHub",   value: "github.com/rushinski",             href: PERSONAL.github },
];

export default function AboutMobile() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const [ghData, setGhData] = useState(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d && !d.error) setGhData(d); })
      .catch(() => {});
  }, []);

  const langs = ghData?.topLanguages || [];
  const totalLangCount = langs.reduce((s, l) => s + l.count, 0);

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      {/* Header card */}
      <div style={PANEL}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 64, height: 64, background: "#c0c0c0", flexShrink: 0, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", overflow: "hidden" }}>
            {photoFailed ? (
              <div style={{ width: "100%", height: "100%", background: "#000080", display: "grid", placeItems: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>
                JR
              </div>
            ) : (
              <img src="/professional_photo.jpeg" alt="Jacob Rushinski" width={64} height={64} onError={() => setPhotoFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#000080" }}>{PERSONAL.name}</div>
            <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{PERSONAL.title}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>{PERSONAL.school}</div>
            <div style={{ fontSize: 10, color: "#666" }}>GPA {PERSONAL.gpa} · {PERSONAL.gradDate}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6 }}>
          {PERSONAL.tagline}
        </div>
      </div>

      {/* About Me bio */}
      <div style={SECTION}>About Me</div>
      <div style={PANEL}>
        <div style={{ fontSize: 11, color: "#222", lineHeight: 1.75 }}>
          Hi, I&apos;m Jacob Rushinski!
          {PERSONAL.bio.split("\n\n").map((para, i) => (
            <span key={i}><br /><br />{para}</span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={SECTION}>Links</div>
      <div style={PANEL}>
        {socials.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 0", borderBottom: "1px solid #e0e0e0",
              textDecoration: "none", fontFamily: W95_FONT,
              touchAction: "manipulation",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 11, color: "#111", minWidth: 56 }}>{label}:</span>
            <span style={{ fontSize: 11, color: "#000080", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
          </a>
        ))}
      </div>

      {/* GitHub coding stats */}
      {ghData && (
        <>
          <div style={SECTION}>GitHub</div>

          {/* Summary numbers */}
          <div style={{ ...PANEL, display: "flex", gap: 0, justifyContent: "space-around" }}>
            {[
              { label: "Repos",     value: ghData.publicRepos ?? "—" },
              { label: "Followers", value: ghData.followers   ?? "—" },
              { label: "Stars",     value: ghData.totalStars  ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#000080" }}>{value}</div>
                <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Contribution calendar */}
          {ghData.contributionCalendar && (
            <>
              <div style={SECTION}>Contributions</div>
              <ContributionCalendar calendar={ghData.contributionCalendar} />
            </>
          )}

          {/* Repo languages */}
          {langs.length > 0 && (
            <>
              <div style={SECTION}>Repo Languages</div>
              <div style={{ ...PANEL, display: "flex", gap: 12, alignItems: "center" }}>
                <DonutChart langs={langs} size={80} />
                <div>
                  {langs.slice(0, 6).map((l) => (
                    <div key={l.lang} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                      <div style={{ width: 8, height: 8, background: LANG_COLORS[l.lang] || "#999", flexShrink: 0, border: "1px solid rgba(0,0,0,0.15)" }} />
                      <div style={{ fontSize: 10, color: "#333", whiteSpace: "nowrap" }}>{l.lang}</div>
                      <div style={{ fontSize: 10, color: "#777", marginLeft: 4 }}>
                        {Math.round((l.count / totalLangCount) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Top Skills */}
      <div style={SECTION}>Top Skills</div>
      <div style={PANEL}>
        <div style={{ fontSize: 9, color: "#888", marginBottom: 8 }}>my strongest technologies</div>
        {TOP_SKILLS.map((skill) => (
          <div key={skill} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <img
              src={TOP_SKILL_ICONS[skill]}
              alt={skill}
              width={18}
              height={18}
              style={{ width: 18, height: 18, objectFit: "contain", display: "block", flexShrink: 0 }}
            />
            <span style={{ fontSize: 12, color: "#333", fontWeight: 600 }}>{skill}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
