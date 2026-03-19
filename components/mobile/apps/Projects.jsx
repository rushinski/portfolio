"use client";

import { useState } from "react";
import { PROJECTS, VIDEO_LIBRARY_BY_ID } from "@/components/shared/data";
import { getSkillIconSrc } from "@/components/shared/skillIcon";

import { W95_FONT } from "@/components/shared/constants";

function SkillTag({ tech }) {
  const icon = getSkillIconSrc(tech);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "0 5px 0 3px", fontSize: 9, lineHeight: 1, color: "#111", background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", fontFamily: W95_FONT }}>
      {icon && <img src={icon} alt="" width={11} height={11} style={{ objectFit: "contain", display: "block", flexShrink: 0, verticalAlign: "middle" }} />}
      <span style={{ verticalAlign: "middle" }}>{tech}</span>
    </span>
  );
}

function LinkButton({ label, icon, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#000080", background: "#c0c0c0", fontFamily: W95_FONT, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, touchAction: "manipulation" }}>
      {icon && <img src={icon} alt="" width={13} height={13} style={{ objectFit: "contain", display: "block", verticalAlign: "middle" }} />}
      <span style={{ verticalAlign: "middle", textDecoration: "underline" }}>{label}</span>
    </button>
  );
}

const SL = {
  fontSize: 10, fontWeight: 700, color: "#000080",
  textTransform: "uppercase", letterSpacing: 1,
  borderBottom: "1px solid #808080", paddingBottom: 3,
  marginBottom: 7, marginTop: 12,
};

function ProjectDetail({ project, onBack }) {
  const inProgress = project.challenges?.startsWith("In active development");
  const hasLinks = !!(project.githubUrl && project.githubUrl !== "#") || !!project.liveUrl;
  const hasVideos = (project.videos?.length || 0) > 0;

  const prose = (text) => (
    <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6, fontFamily: W95_FONT }}>{text}</div>
  );

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={onBack} style={{ padding: "3px 12px", fontSize: 10, color: "#111", background: "#c0c0c0", fontFamily: W95_FONT, border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", touchAction: "manipulation" }}>
          Back
        </button>
      </div>
      <div style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>
        {/* Header: title + date + overview + tags + links */}
        <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "8px 10px 10px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#111", lineHeight: 1.2, flex: 1, minWidth: 0 }}>{project.title}</div>
            <div style={{ fontSize: 9, color: "#555", flexShrink: 0, paddingTop: 2 }}>{project.date}</div>
          </div>
          {project.overview && (
            <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, fontStyle: "italic", marginBottom: 8, fontFamily: W95_FONT }}>{project.overview}</div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: hasLinks ? 7 : 0 }}>
            {project.tech.map((tech) => <SkillTag key={tech} tech={tech} />)}
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

        <div style={{ padding: "4px 10px 14px" }}>
          {/* Why */}
          {project.why && (
            <>
              <div style={{ ...SL, marginTop: 8 }}>Why I Built It</div>
              {prose(project.why)}
            </>
          )}

          {/* Videos */}
          {hasVideos && (
            <>
              <div style={SL}>Media</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {project.videos.map((video, i) => {
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

          {/* Challenges */}
          {!inProgress && project.challenges && (
            <>
              <div style={SL}>Challenges</div>
              {prose(project.challenges)}
            </>
          )}

          {/* Takeaway */}
          {!inProgress && project.takeaway && (
            <>
              <div style={SL}>Key Takeaway</div>
              {prose(project.takeaway)}
            </>
          )}

          {/* What I'd do differently */}
          {!inProgress && project.differently && (
            <>
              <div style={SL}>What I'd Do Differently</div>
              {prose(project.differently)}
            </>
          )}

          {/* Outcome */}
          {project.outcome && (
            <>
              <div style={SL}>Outcome</div>
              {prose(project.outcome)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsMobile() {
  const [detailIdx, setDetailIdx] = useState(null);

  if (detailIdx !== null) {
    return <ProjectDetail project={PROJECTS[detailIdx]} onBack={() => setDetailIdx(null)} />;
  }

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      {PROJECTS.map((project, i) => (
        <div key={project.id} onClick={() => setDetailIdx(i)} style={{ marginBottom: 10, cursor: "pointer", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}>
          <div style={{ background: "#c0c0c0", borderBottom: "1px solid #808080", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#111", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 9, color: "#555" }}>{project.date}</span>
              <span style={{ fontSize: 12, color: "#000080", fontWeight: 700, lineHeight: 1 }}>›</span>
            </div>
          </div>
          <div style={{ padding: "7px 10px 9px" }}>
            {project.overview && (
              <div style={{ fontSize: 11, color: "#555", fontStyle: "italic", lineHeight: 1.5, marginBottom: 7, fontFamily: W95_FONT }}>{project.overview}</div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {project.tech.map((tech) => <SkillTag key={tech} tech={tech} />)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
