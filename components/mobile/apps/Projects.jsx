"use client";

import { useState } from "react";
import { PROJECTS } from "@/components/os/data";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const TABS = ["Overview", "Architecture", "Links"];

const STATUS_COLORS = { IN_PROGRESS: "#d4a000", COMPLETE: "#008000" };
const STATUS_LABELS  = { IN_PROGRESS: "In Progress", COMPLETE: "Complete" };

function ProjectCard({ project }) {
  const [tab, setTab] = useState("Overview");

  return (
    <div
      style={{
        background: "#f0f0ea",
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #808080",
        borderBottom: "2px solid #808080",
        marginBottom: 14,
        fontFamily: W95_FONT,
      }}
    >
      {/* Card header */}
      <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "8px 10px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#000080", flex: 1 }}>{project.title}</div>
          <span style={{ fontSize: 9, fontWeight: 700, color: STATUS_COLORS[project.status] ?? "#555", border: `1px solid ${STATUS_COLORS[project.status] ?? "#808080"}`, padding: "1px 5px", flexShrink: 0, background: "#c0c0c0" }}>
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
        </div>
        <div style={{ fontSize: 9, color: "#666", marginTop: 3 }}>{project.date}</div>
      </div>

      {/* Tab row */}
      <div style={{ display: "flex", borderBottom: "1px solid #808080", background: "#c0c0c0" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: W95_FONT,
              fontSize: 10,
              fontWeight: tab === t ? 700 : 400,
              padding: "4px 10px",
              background: tab === t ? "#f0f0ea" : "#c0c0c0",
              border: "none",
              borderRight: "1px solid #808080",
              borderBottom: tab === t ? "1px solid #f0f0ea" : "none",
              cursor: "pointer",
              color: "#111",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              marginBottom: tab === t ? -1 : 0,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "10px 10px 12px" }}>
        {tab === "Overview" && (
          <>
            <div style={{ fontSize: 11, color: "#333", lineHeight: 1.7, marginBottom: 10 }}>{project.desc}</div>
            {project.impact && (
              <>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#444", marginBottom: 4 }}>Impact</div>
                {project.impact.map((point, i) => (
                  <div key={i} style={{ fontSize: 11, color: "#222", lineHeight: 1.6, paddingLeft: 14, position: "relative", marginBottom: 3 }}>
                    <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>·</span>
                    {point}
                  </div>
                ))}
              </>
            )}
            {project.narrative && (
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6, marginTop: 10, fontStyle: "italic", borderLeft: "3px solid #000080", paddingLeft: 8 }}>
                {project.narrative}
              </div>
            )}
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 10 }}>
              {project.stack.map((tech) => (
                <span key={tech} style={{ fontSize: 9, background: "#c0c0c0", border: "1px solid #808080", padding: "1px 6px", fontFamily: W95_FONT }}>
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {tab === "Architecture" && (
          <>
            {(project.architecture ?? []).map((point, i) => (
              <div key={i} style={{ fontSize: 11, color: "#222", lineHeight: 1.6, paddingLeft: 14, position: "relative", marginBottom: 8 }}>
                <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>{">"}</span>
                {point}
              </div>
            ))}
            {!project.architecture && (
              <div style={{ fontSize: 11, color: "#666" }}>No architecture notes for this project.</div>
            )}
          </>
        )}

        {tab === "Links" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <span style={{ fontWeight: 700 }}>GitHub</span> — {project.links.github.replace("https://github.com/", "github.com/")}
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <span style={{ fontWeight: 700 }}>Live</span> — {project.links.live}
              </a>
            )}
            {project.links?.landing && (
              <a href={project.links.landing} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <span style={{ fontWeight: 700 }}>Landing Page</span> — {project.links.landing}
              </a>
            )}
            {!project.links?.github && !project.links?.live && !project.links?.landing && (
              <div style={{ fontSize: 11, color: "#666" }}>No public links available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const linkStyle = {
  display: "block",
  fontSize: 11,
  color: "#000080",
  fontFamily: W95_FONT,
  textDecoration: "none",
  padding: "6px 8px",
  background: "#f0f0ea",
  borderTop: "1px solid #ffffff",
  borderLeft: "1px solid #ffffff",
  borderRight: "1px solid #808080",
  borderBottom: "1px solid #808080",
  touchAction: "manipulation",
};

export default function ProjectsMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      {PROJECTS.map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
  );
}
