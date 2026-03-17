"use client";

import { useEffect, useState } from "react";

import { PERSONAL } from "../data";
import { useWindowManager } from "../hooks/useWindowManager";
import { APP_BODY_STYLE, APP_CONTENT_STYLE, APP_PANEL_STYLE, APP_SECTION_HEADER_STYLE, getWin95ButtonStyle } from "../ui/retro";
import { DonutChart, LANG_COLORS, TOP_SKILL_ICONS, TOP_SKILLS } from "@/components/shared/GitHubStats";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

export default function AboutApp({ initialGitHubData = null }) {
  const { openWindow } = useWindowManager();
  const [ghData, setGhData] = useState(initialGitHubData);
  const [ghHovered, setGhHovered] = useState(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    if (ghData) return;

    let cancelled = false;

    fetch("/api/github")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data && !data.error) {
          setGhData(data);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [ghData]);

  const socials = [
    { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, icon: "email.png" },
    { label: "Phone", value: PERSONAL.phone, href: PERSONAL.phoneHref, icon: "phone.png" },
    { label: "LinkedIn", value: PERSONAL.linkedin.replace("https://", ""), href: PERSONAL.linkedin, icon: "linkedin.png" },
    { label: "GitHub", value: PERSONAL.github.replace("https://", ""), href: PERSONAL.github, icon: "github.png" },
  ];

  return (
    <div style={APP_BODY_STYLE}>
      <div style={APP_CONTENT_STYLE}>
      <div style={{ display: "flex", gap: 24, marginBottom: 16, alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 270px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 60, height: 60, background: "#c0c0c0", padding: 2, flexShrink: 0, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
              {photoFailed ? (
                <div style={{ width: "100%", height: "100%", background: "#000080", display: "grid", placeItems: "center", color: "#fff", fontSize: 22, fontWeight: 800 }}>
                  JR
                </div>
              ) : (
                <img
                  src="/professional_photo.jpeg"
                  alt={`${PERSONAL.name} portrait`}
                  width={56}
                  height={56}
                  onError={() => setPhotoFailed(true)}
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", background: "#efefef" }}
                />
              )}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{PERSONAL.name}</div>
              <div style={{ fontSize: 12, color: "#000080", fontWeight: 600 }}>{PERSONAL.title}</div>
              <div style={{ fontSize: 11, color: "#777" }}>{PERSONAL.location}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #c0c0c0" }}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") || social.href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#000080", fontSize: 11 }}
              >
                <img
                  src={`/socials/${social.icon}`}
                  alt={social.label}
                  width={16}
                  height={16}
                  style={{ width: 16, height: 16, objectFit: "contain", display: "block", flexShrink: 0 }}
                />
                {social.value}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => openWindow("resume")}
              style={{
                ...getWin95ButtonStyle({ padding: "5px 14px" }),
                fontWeight: 700,
              }}
            >
              View Resume
            </button>
            <button
              onClick={() => openWindow("contact")}
              style={{
                ...getWin95ButtonStyle({ padding: "5px 14px" }),
                fontWeight: 600,
              }}
            >
              Contact Me
            </button>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>About Me</div>
          <div style={{ fontSize: 12, color: "#333", lineHeight: 1.75 }}>
            Hi, I'm Jacob Rushinski!<br /><br />I'm currently attending Thaddeus Stevens College of Technology, graduating with an Associate's in Computer Software Engineering Technology in May 2026. I'm looking for Backend, Full-Stack, or related roles near Philadelphia, PA (within 50mi) or nationwide remote.<br /><br />Right now I'm rebuilding a{" "}
            <button onClick={() => openWindow("projects")} style={{ background: "none", border: "none", padding: 0, color: "#000080", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 12, textDecoration: "underline" }}>
              multi-tenant sneaker marketplace
            </button>
            {" "}from the ground up. I enjoy working on production-grade systems and the level of detail required to build software that is reliable and maintainable. I take pride in writing clean code and designing systems that perform well under real-world usage. If you'd like to connect or learn more about my work, feel free to reach out.
          </div>
        </div>
      </div>

      <ErrorBoundary fallback={null}>
      {ghData && (() => {
        const cell = 10;
        const gap = 2;
        const step = 12;
        const chartColors = ["#c0c0c0", "#cce8cc", "#7dbf7d", "#3a8a3a", "#1a5c1a"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const calendar = ghData.contributionCalendar || {};
        const allWeeks = calendar.weeks || [];
        const total = calendar.totalContributions || 0;
        const langs = ghData.topLanguages || [];
        const totalLangCount = langs.reduce((sum, language) => sum + language.count, 0);
        const getLevel = (count) => (count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4);

        const monthMarkers = [];
        allWeeks.forEach((week, weekIndex) => {
          if (!week.contributionDays?.length) return;
          const day = new Date(`${week.contributionDays[0].date}T12:00:00`);
          const month = day.getMonth();
          const previousMonth = weekIndex > 0 && allWeeks[weekIndex - 1].contributionDays?.length
            ? new Date(`${allWeeks[weekIndex - 1].contributionDays[0].date}T12:00:00`).getMonth()
            : -1;
          if (month !== previousMonth) monthMarkers.push({ weekIndex, label: months[month] });
        });

        return (
          <div>
            <div style={APP_SECTION_HEADER_STYLE}>
              Coding Stats
            </div>
            <div style={{ overflowX: "auto" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "stretch", width: "max-content" }}>
                <div style={{ ...APP_PANEL_STYLE, flexShrink: 0, padding: "10px 12px", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{total.toLocaleString()} contributions in the last year</div>
                  <div style={{ position: "relative", marginLeft: 24, height: 14, marginBottom: 3 }}>
                    {monthMarkers.map(({ weekIndex, label }) => (
                      <span key={`${label}-${weekIndex}`} style={{ position: "absolute", left: weekIndex * step, fontSize: 9, color: "#000080", opacity: 0.8 }}>{label}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap, width: 20, marginRight: 4, flexShrink: 0 }}>
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <div key={`${day}-${index}`} style={{ height: cell, fontSize: 9, color: index % 2 === 1 ? "#000080" : "transparent", lineHeight: `${cell}px`, textAlign: "right", opacity: 0.7 }}>{day}</div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap }}>
                      {allWeeks.map((week, weekIndex) => (
                        <div key={`week-${weekIndex}`} style={{ display: "flex", flexDirection: "column", gap, flexShrink: 0 }}>
                          {week.contributionDays.map((day, dayIndex) => (
                            <div
                              key={`${day.date}-${dayIndex}`}
                              onMouseEnter={() => setGhHovered(day)}
                              onMouseLeave={() => setGhHovered(null)}
                              style={{ width: cell, height: cell, background: chartColors[getLevel(day.contributionCount)], border: "1px solid rgba(0,0,0,0.08)", cursor: "default", flexShrink: 0 }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ fontSize: 10, color: "#555", minHeight: 13 }}>
                      {ghHovered ? `${ghHovered.date} - ${ghHovered.contributionCount} contribution${ghHovered.contributionCount !== 1 ? "s" : ""}` : "\u00A0"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#777", flexShrink: 0 }}>
                      <span>Less</span>
                      {chartColors.map((color, index) => (
                        <div key={`${color}-${index}`} style={{ width: 9, height: 9, background: color, border: "1px solid rgba(0,0,0,0.12)" }} />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </div>

                {langs.length > 0 && (
                  <div style={{ ...APP_PANEL_STYLE, flexShrink: 0, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>Repo Languages</div>
                    <div style={{ fontSize: 9, color: "#888", marginBottom: 8 }}>by number of repos</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DonutChart langs={langs} size={80} />
                      <div>
                        {langs.slice(0, 6).map((language) => (
                          <div key={language.lang} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                            <div style={{ width: 8, height: 8, background: LANG_COLORS[language.lang] || "#999", flexShrink: 0, border: "1px solid rgba(0,0,0,0.15)" }} />
                            <div style={{ fontSize: 10, color: "#333", whiteSpace: "nowrap" }}>{language.lang}</div>
                            <div style={{ fontSize: 10, color: "#777", flexShrink: 0, marginLeft: 4 }}>{Math.round((language.count / totalLangCount) * 100)}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ ...APP_PANEL_STYLE, flexShrink: 0, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>Top Skills</div>
                  <div style={{ fontSize: 9, color: "#888", marginBottom: 8 }}>my strongest technologies</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {TOP_SKILLS.map((skill) => (
                      <div key={skill} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <img
                          src={TOP_SKILL_ICONS[skill]}
                          alt={skill}
                          width={16}
                          height={16}
                          style={{ width: 16, height: 16, objectFit: "contain", display: "block", flexShrink: 0 }}
                        />
                        <span style={{ fontSize: 11, color: "#333", fontWeight: 600 }}>{skill}</span>
                      </div>
                    ))}
                    <button onClick={() => openWindow("skills")} style={{ background: "transparent", border: "none", padding: 0, fontSize: 10, color: "#000080", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", textAlign: "left", marginTop: 2 }}>
                      All skills
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      </ErrorBoundary>
      </div>
    </div>
  );
}
