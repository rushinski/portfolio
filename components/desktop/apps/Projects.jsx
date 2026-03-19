"use client";

import { useCallback, useState } from "react";

import { PROJECTS, VIDEO_LIBRARY_BY_ID } from "@/components/shared/data";
import { useWindowManager } from "../hooks/useWindowManager";
import { APP_BODY_STYLE, APP_CONTENT_STYLE, RAISED_BORDER, WIN95_COLORS, WIN95_FONT_FAMILY } from "../ui/retro";
import { getSkillIconSrc } from "@/components/shared/skillIcon";

function SkillTag({ tech, size = "normal" }) {
  const icon = getSkillIconSrc(tech);
  const isSmall = size === "small";
  const sz = isSmall ? 11 : 14;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: isSmall ? 3 : 5, padding: isSmall ? "0 5px 0 3px" : "2px 8px 2px 5px", fontSize: isSmall ? 9 : 11, lineHeight: 1, background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}>
      {icon && <img src={icon} alt="" width={sz} height={sz} style={{ objectFit: "contain", display: "block", flexShrink: 0, verticalAlign: "middle" }} />}
      <span style={{ verticalAlign: "middle" }}>{tech}</span>
    </span>
  );
}

function LinkButton({ label, icon, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#000080", background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {icon && <img src={icon} alt="" width={13} height={13} style={{ imageRendering: "pixelated", objectFit: "contain", display: "block", verticalAlign: "middle" }} />}
      <span style={{ verticalAlign: "middle", textDecoration: "underline" }}>{label}</span>
    </button>
  );
}

function ProjectDetailView({ project, onOpenVideo, onBackToList }) {
  const inProgress = project.challenges?.startsWith("In active development");

  const SL = {
    fontSize: 10, fontWeight: 700, color: "#000080",
    textTransform: "uppercase", letterSpacing: 1,
    borderBottom: "1px solid #808080", paddingBottom: 3,
    marginBottom: 7, marginTop: 12,
  };

  const prose = (text) => (
    <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6 }}>{text}</div>
  );

  const hasLinks = !!(project.githubUrl && project.githubUrl !== "#") || !!project.liveUrl;
  const hasVideos = (project.videos?.length || 0) > 0;

  return (
    <div style={{ ...APP_CONTENT_STYLE, padding: "10px 12px 14px" }}>
      {onBackToList && (
        <div style={{ marginBottom: 8 }}>
          <button onClick={onBackToList} style={{ padding: "2px 10px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer" }}>
            Back to Projects
          </button>
        </div>
      )}

      <div style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>
        {/* Header: title + date + overview + tags + links */}
        <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "8px 10px 10px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#111", lineHeight: 1.2 }}>{project.title}</div>
            <div style={{ fontSize: 10, color: "#555", flexShrink: 0, paddingTop: 3 }}>{project.date}</div>
          </div>
          {project.overview && (
            <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, fontStyle: "italic", marginBottom: 8 }}>{project.overview}</div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: hasLinks ? 8 : 0 }}>
            {project.tech.map((t) => <SkillTag key={t} tech={t} size="normal" />)}
          </div>
          {hasLinks && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {project.githubUrl && project.githubUrl !== "#" && (
                <LinkButton
                  label="Github"
                  onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
                />
              )}
              {project.liveUrl && (
                <LinkButton
                  label="Live Site"
                  onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                />
              )}
            </div>
          )}
        </div>

        <div style={{ padding: "4px 10px 12px" }}>
          {project.why && (
            <>
              <div style={{ ...SL, marginTop: 8 }}>Why I Built It</div>
              {prose(project.why)}
            </>
          )}
          {!inProgress && project.challenges && (
            <>
              <div style={SL}>Challenges</div>
              {prose(project.challenges)}
            </>
          )}
          {!inProgress && project.takeaway && (
            <>
              <div style={SL}>Key Takeaway</div>
              {prose(project.takeaway)}
            </>
          )}
          {!inProgress && project.differently && (
            <>
              <div style={SL}>What I'd Do Differently</div>
              {prose(project.differently)}
            </>
          )}
          {project.outcome && (
            <>
              <div style={SL}>Outcome</div>
              {prose(project.outcome)}
            </>
          )}
          {hasVideos && (
            <>
              <div style={SL}>Media</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {project.videos.map((video, index) => {
                  const v = VIDEO_LIBRARY_BY_ID[video.id] || { ...video, id: video.id || `preview-${index}`, projectTitle: project.title };
                  return (
                    <button key={v.id} onClick={() => onOpenVideo(v.id)} style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#c0c0c0", padding: 0, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "stretch" }}>
                      <div style={{ width: 96, flexShrink: 0, background: "#000", margin: 3, border: "1px solid #606060", overflow: "hidden" }}>
                        <video src={v.src} muted preload="metadata" playsInline style={{ width: "100%", height: 54, objectFit: "cover", display: "block", pointerEvents: "none" }} />
                      </div>
                      <div style={{ flex: 1, padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>{v.label}</div>
                        <div style={{ fontSize: 9, color: "#000080", fontWeight: 700 }}>Open in Videos</div>
                      </div>
                    </button>
                  );
                })}
              </div>
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
  const [tooltip, setTooltip] = useState({ idx: null, x: 0, y: 0 });

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
    setTooltip({ idx: null, x: 0, y: 0 });
    navigate({ type: "detail", projectIdx });
  }, [navigate, setTooltip]);

  return (
    <div style={APP_BODY_STYLE}>
      {tooltip.idx !== null && (
        <span style={{ ...RAISED_BORDER, position: "fixed", left: tooltip.x + 14, top: tooltip.y + 14, background: "#fff8c6", color: WIN95_COLORS.text, fontFamily: WIN95_FONT_FAMILY, fontSize: 11, lineHeight: 1.2, padding: "3px 6px", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 40000 }}>
          Click to view more
        </span>
      )}
      {currentView.type === "list" ? (
        <div style={{ ...APP_CONTENT_STYLE, padding: "10px 12px" }}>
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openProjectDetail(index)}
              onMouseEnter={(e) => setTooltip({ idx: index, x: e.clientX, y: e.clientY })}
              onMouseMove={(e) => setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))}
              onMouseLeave={() => setTooltip({ idx: null, x: 0, y: 0 })}
              style={{ marginBottom: 10, cursor: "pointer", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}
            >
              <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "5px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: project.overview ? 3 : 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#111", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.title}</div>
                  <span style={{ fontSize: 9, color: "#555", flexShrink: 0 }}>{project.date}</span>
                </div>
                {project.overview && (
                  <div style={{ fontSize: 10, color: "#555", fontStyle: "italic", lineHeight: 1.4 }}>{project.overview}</div>
                )}
              </div>
              <div style={{ padding: "6px 10px 8px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {project.tech.map((t) => <SkillTag key={t} tech={t} size="normal" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : currentProject ? (
        <ProjectDetailView project={currentProject} onOpenVideo={openVideoApp} onBackToList={() => navigate({ type: "list" })} />
      ) : (
        <div style={{ ...APP_CONTENT_STYLE, padding: "16px 20px", fontSize: 11, color: "#666" }}>
          Unable to load project details.
        </div>
      )}
    </div>
  );
}
