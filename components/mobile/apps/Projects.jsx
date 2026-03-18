"use client";

import { useEffect, useState } from "react";
import { PROJECTS, VIDEO_LIBRARY_BY_ID } from "@/components/shared/data";
import { getSkillIconSrc } from "@/components/shared/skillIcon";

import { W95_FONT } from "@/components/shared/constants";

function SkillTag({ tech }) {
  const icon = getSkillIconSrc(tech);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "0 5px 0 3px", fontSize: 9, color: "#111", background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", fontFamily: W95_FONT }}>
      {icon && <img src={icon} alt="" width={11} height={11} style={{ objectFit: "contain", display: "block", flexShrink: 0 }} />}
      {tech}
    </span>
  );
}

const SL = {
  fontSize: 10, fontWeight: 700, color: "#000080",
  textTransform: "uppercase", letterSpacing: 1,
  borderBottom: "1px solid #808080", paddingBottom: 3,
  marginBottom: 7, marginTop: 12,
};

function Bullet({ text }) {
  return (
    <div style={{ fontSize: 11, color: "#222", padding: "1px 0 2px 13px", position: "relative", lineHeight: 1.6 }}>
      <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>{">"}</span>
      {text}
    </div>
  );
}

function ArchBullet({ text }) {
  const ci = text.indexOf(": ");
  const hp = ci > 0 && ci < 55;
  return (
    <div style={{ fontSize: 11, color: "#222", padding: "1px 0 3px 13px", position: "relative", lineHeight: 1.6 }}>
      <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>{">"}</span>
      {hp ? <><strong style={{ color: "#111" }}>{text.slice(0, ci)}:</strong>{" "}{text.slice(ci + 2)}</> : text}
    </div>
  );
}

function ProjectDetail({ project, repoData, onBack }) {
  const inProg = project.status === "IN_PROGRESS";
  const hasLinks = !!(project.links?.github || project.links?.live || project.links?.landing);
  const hasVideos = (project.links?.videos?.length || 0) > 0;
  const hasRef = !!(project.highlight || project.differently || project.outcome);
  const ghRepo = project.links?.github ? repoData[project.links.github] : null;

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={onBack} style={{ padding: "3px 12px", fontSize: 10, color: "#111", background: "#c0c0c0", fontFamily: W95_FONT, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", touchAction: "manipulation" }}>
          Back
        </button>
      </div>
      <div style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>
        <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "7px 10px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#111", lineHeight: 1.2, flex: 1, minWidth: 0 }}>{project.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 9, color: "#555" }}>{project.date}</span>
              <span style={{ padding: "1px 6px", fontSize: 9, fontWeight: 700, background: inProg ? "#ffff00" : "#00cc44", color: "#000", border: "1px solid #808080" }}>
                {inProg ? "In Progress" : "Complete"}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.4, fontStyle: "italic" }}>{project.desc}</div>
        </div>
        <div style={{ padding: "4px 10px 14px" }}>
          {project.impact?.length > 0 && (
            <>
              <div style={{ ...SL, marginTop: 8 }}>Impact</div>
              {project.impact.map((item, i) => <Bullet key={i} text={item} />)}
            </>
          )}
          <div style={SL}>Stack</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {project.stack.map((tech) => <SkillTag key={tech} tech={tech} />)}
          </div>
          {hasLinks && (
            <>
              <div style={SL}>Links</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.links?.github && (
                  <button onClick={() => window.open(project.links.github, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, color: "#111", background: "#c0c0c0", fontFamily: W95_FONT, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, touchAction: "manipulation" }}>
                    <img src="/skills/github.png" alt="" width={11} height={11} style={{ objectFit: "contain" }} />
                    {ghRepo?.name || project.links.github.split("/").pop()}
                  </button>
                )}
                {project.links?.live && (
                  <button onClick={() => window.open(project.links.live, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, color: "#111", background: "#c0c0c0", fontFamily: W95_FONT, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", touchAction: "manipulation" }}>
                    Live Site
                  </button>
                )}
                {project.links?.landing && (
                  <button onClick={() => window.open(project.links.landing, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, color: "#111", background: "#c0c0c0", fontFamily: W95_FONT, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", touchAction: "manipulation" }}>
                    Landing Page
                  </button>
                )}
              </div>
            </>
          )}
          {hasVideos && (
            <>
              <div style={SL}>Media</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {project.links.videos.map((video, i) => {
                  const v = VIDEO_LIBRARY_BY_ID[video.id] || { ...video, id: video.id || ("v-" + i), projectTitle: project.title };
                  return (
                    <a key={v.id} href={v.src} target="_blank" rel="noopener noreferrer" style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#c0c0c0", padding: 0, textDecoration: "none", display: "flex", alignItems: "stretch", touchAction: "manipulation" }}>
                      <div style={{ width: 90, flexShrink: 0, background: "#000", margin: 3, border: "1px solid #606060", overflow: "hidden" }}>
                        <video src={v.src} muted preload="metadata" playsInline style={{ width: "100%", height: 50, objectFit: "cover", display: "block", pointerEvents: "none" }} />
                      </div>
                      <div style={{ flex: 1, padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#111", fontFamily: W95_FONT }}>{v.label}</div>
                        <div style={{ fontSize: 9, color: "#000080", fontWeight: 700, fontFamily: W95_FONT }}>View Video</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </>
          )}
          {project.architecture?.length > 0 && (
            <>
              <div style={SL}>How I Built It</div>
              {project.architecture.map((item, i) => <ArchBullet key={i} text={item} />)}
            </>
          )}
          {hasRef && (
            <>
              <div style={SL}>Reflection</div>
              {project.highlight && <Bullet text={project.highlight} />}
              {project.differently && <Bullet text={"Would do differently: " + project.differently} />}
              {project.outcome && <Bullet text={project.outcome} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsMobile() {
  const [detailIdx, setDetailIdx] = useState(null);
  const [repoData, setRepoData] = useState({});

  useEffect(() => {
    PROJECTS.forEach((project) => {
      if (!project.links?.github) return;
      const m = project.links.github.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!m) return;
      fetch("https://api.github.com/repos/" + m[1] + "/" + m[2])
        .then((r) => r.ok ? r.json() : null)
        .then((d) => { if (d) setRepoData((prev) => ({ ...prev, [project.links.github]: d })); })
        .catch(() => {});
    });
  }, []);

  if (detailIdx !== null) {
    return <ProjectDetail project={PROJECTS[detailIdx]} repoData={repoData} onBack={() => setDetailIdx(null)} />;
  }

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      {PROJECTS.map((project, i) => {
        const inProg = project.status === "IN_PROGRESS";
        return (
          <div key={i} onClick={() => setDetailIdx(i)} style={{ marginBottom: 10, cursor: "pointer", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}>
            <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#111", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: "#555" }}>{project.date}</span>
                <span style={{ padding: "0 5px", fontSize: 9, fontWeight: 700, background: inProg ? "#ffff00" : "#00cc44", color: "#000", border: "1px solid #808080" }}>
                  {inProg ? "In Progress" : "Complete"}
                </span>
              </div>
            </div>
            <div style={{ padding: "6px 10px 8px" }}>
              <div style={{ fontSize: 11, color: "#444", marginBottom: 6, lineHeight: 1.5, fontStyle: "italic" }}>{project.desc}</div>
              {project.impact.slice(0, 2).map((item, j) => (
                <div key={j} style={{ fontSize: 11, color: "#222", padding: "1px 0 1px 13px", position: "relative", lineHeight: 1.5 }}>
                  <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>{">"}</span>
                  {item}
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, gap: 8, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {project.stack.slice(0, 5).map((tech) => <SkillTag key={tech} tech={tech} />)}
                </div>
                <span style={{ fontSize: 9, color: "#000080", fontWeight: 700, flexShrink: 0 }}>Open</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
