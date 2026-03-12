"use client";

import { useCallback, useEffect, useState } from "react";

import { PROJECTS, VIDEO_LIBRARY_BY_ID } from "../data";
import { useWindowManager } from "../hooks/useWindowManager";

function ProjectDetailView({ project, repoData, onOpenVideo, onBackToList }) {
  const ghRepo = project.links?.github ? repoData[project.links.github] : null;
  const isInProgress = project.status === "IN_PROGRESS";
  const hasProjectLinks = !!(project.links?.github || project.links?.live || project.links?.landing);
  const hasVideoPreviews = (project.links?.videos?.length || 0) > 0;
  const hasReflection = !!(project.highlight || project.differently || project.outcome);

  const sectionLabel = {
    fontSize: 10,
    fontWeight: 700,
    color: "#000080",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: "1px solid #808080",
    paddingBottom: 3,
    marginBottom: 7,
    marginTop: 12,
  };

  const bullet = (text, key) => (
    <div key={key} style={{ fontSize: 11, color: "#222", padding: "1px 0 2px 13px", position: "relative", lineHeight: 1.6 }}>
      <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
      {text}
    </div>
  );

  const architectureBullet = (text, key) => {
    const colonIndex = text.indexOf(": ");
    const hasPrefix = colonIndex > 0 && colonIndex < 55;
    return (
      <div key={key} style={{ fontSize: 11, color: "#222", padding: "1px 0 3px 13px", position: "relative", lineHeight: 1.6 }}>
        <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
        {hasPrefix
          ? <><strong style={{ color: "#111" }}>{text.slice(0, colonIndex)}:</strong>{" "}{text.slice(colonIndex + 2)}</>
          : text}
      </div>
    );
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "10px 12px 14px", background: "#fff" }}>
      {onBackToList && (
        <div style={{ marginBottom: 8 }}>
          <button onClick={onBackToList} style={{ padding: "2px 10px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer" }}>
            ◄ Back to Projects
          </button>
        </div>
      )}

      <div style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>
        <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "7px 10px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#111", lineHeight: 1.2, flex: 1, minWidth: 0 }}>{project.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 9, color: "#555" }}>{project.date}</span>
              <span style={{ padding: "1px 6px", fontSize: 9, fontWeight: 700, background: isInProgress ? "#ffff00" : "#00cc44", color: "#000", border: "1px solid #808080" }}>
                {isInProgress ? "In Progress" : "Complete"}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.4, fontStyle: "italic" }}>{project.desc}</div>
        </div>

        <div style={{ padding: "4px 10px 12px" }}>
          {project.impact?.length > 0 && (
            <>
              <div style={{ ...sectionLabel, marginTop: 8 }}>Impact</div>
              {project.impact.map((item, index) => bullet(item, `impact-${index}`))}
            </>
          )}

          <div style={sectionLabel}>Stack</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {project.stack.map((tech) => (
              <span key={tech} style={{ padding: "1px 6px", fontSize: 10, background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
                {tech}
              </span>
            ))}
          </div>

          {hasProjectLinks && (
            <>
              <div style={sectionLabel}>Links</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {project.links?.github && (
                  <button onClick={() => window.open(project.links.github, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <img src="/skills/github.png" alt="github" width={11} height={11} style={{ imageRendering: "pixelated", objectFit: "contain" }} />
                    {ghRepo?.name || project.links.github.split("/").pop()}
                  </button>
                )}
                {project.links?.live && (
                  <button onClick={() => window.open(project.links.live, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    🌐 Live Site
                  </button>
                )}
                {project.links?.landing && (
                  <button onClick={() => window.open(project.links.landing, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    📄 Landing Page
                  </button>
                )}
              </div>
            </>
          )}

          {hasVideoPreviews && (
            <>
              <div style={sectionLabel}>Media</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {project.links.videos.map((video, index) => {
                  const mappedVideo = VIDEO_LIBRARY_BY_ID[video.id] || { ...video, id: video.id || `preview-${index}`, projectTitle: project.title };
                  return (
                    <button key={mappedVideo.id} onClick={() => onOpenVideo(mappedVideo.id)} style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#c0c0c0", padding: 0, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "stretch" }}>
                      <div style={{ width: 96, flexShrink: 0, background: "#000", margin: 3, border: "1px solid #606060", overflow: "hidden" }}>
                        <video src={mappedVideo.src} muted preload="metadata" playsInline style={{ width: "100%", height: 54, objectFit: "cover", display: "block", pointerEvents: "none" }} />
                      </div>
                      <div style={{ flex: 1, padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>{mappedVideo.label}</div>
                        <div style={{ fontSize: 9, color: "#000080", fontWeight: 700 }}>▶ Open in Videos</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {project.architecture?.length > 0 && (
            <>
              <div style={sectionLabel}>How I Built It</div>
              {project.architecture.map((item, index) => architectureBullet(item, `architecture-${index}`))}
            </>
          )}

          {hasReflection && (
            <>
              <div style={sectionLabel}>Reflection</div>
              {project.highlight && bullet(project.highlight, "highlight")}
              {project.differently && bullet(`Would do differently: ${project.differently}`, "differently")}
              {project.outcome && bullet(project.outcome, "outcome")}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsApp() {
  const { openVideoApp } = useWindowManager();
  const [navigation, setNavigation] = useState({
    current: { type: "list" },
    backStack: [],
    forwardStack: [],
  });
  const [repoData, setRepoData] = useState({});

  const currentView = navigation.current || { type: "list" };
  const currentProject = currentView.type === "detail" ? PROJECTS[currentView.projectIdx] : null;

  const navigate = useCallback((view) => {
    setNavigation((prev) => {
      const isSameView = prev.current?.type === view.type && prev.current?.projectIdx === view.projectIdx;
      if (isSameView) return prev;
      return {
        current: view,
        backStack: [...prev.backStack, prev.current],
        forwardStack: [],
      };
    });
  }, []);

  const openProjectDetail = useCallback((projectIdx) => {
    if (projectIdx == null || projectIdx < 0 || projectIdx >= PROJECTS.length) return;
    navigate({ type: "detail", projectIdx });
  }, [navigate]);

  useEffect(() => {
    PROJECTS.forEach((project) => {
      if (!project.links?.github) return;
      const match = project.links.github.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) return;
      fetch(`https://api.github.com/repos/${match[1]}/${match[2]}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (data) {
            setRepoData((prev) => ({ ...prev, [project.links.github]: data }));
          }
        })
        .catch(() => {});
    });
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "inherit", overflow: "hidden" }}>
      {currentView.type === "list" ? (
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "10px 12px", background: "#fff" }}>
          {PROJECTS.map((project, index) => {
            const isInProgress = project.status === "IN_PROGRESS";
            return (
              <div key={`${project.title}-${index}`} onClick={() => openProjectDetail(index)} style={{ marginBottom: 10, cursor: "pointer", userSelect: "none", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>
                <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#111", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: "#555" }}>{project.date}</span>
                    <span style={{ padding: "0 5px", fontSize: 9, fontWeight: 700, background: isInProgress ? "#ffff00" : "#00cc44", color: "#000", border: "1px solid #808080" }}>
                      {isInProgress ? "In Progress" : "Complete"}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "6px 10px 8px" }}>
                  <div style={{ fontSize: 11, color: "#444", marginBottom: 6, lineHeight: 1.5, fontStyle: "italic" }}>{project.desc}</div>
                  {project.impact.slice(0, 2).map((item, impactIndex) => (
                    <div key={`${project.title}-impact-${impactIndex}`} style={{ fontSize: 11, color: "#222", padding: "1px 0 1px 13px", position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
                      {item}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, gap: 8, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {project.stack.slice(0, 5).map((tech) => (
                        <span key={tech} style={{ padding: "0 5px", fontSize: 9, background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: 9, color: "#000080", fontWeight: 700, flexShrink: 0 }}>click to open →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : currentProject ? (
        <ProjectDetailView project={currentProject} repoData={repoData} onOpenVideo={openVideoApp} onBackToList={() => navigate({ type: "list" })} />
      ) : (
        <div style={{ padding: "16px 20px", fontSize: 11, color: "#666" }}>
          Unable to load project details.
        </div>
      )}
    </div>
  );
}
