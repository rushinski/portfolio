"use client";

import { useState } from "react";
import { VIDEO_LIBRARY } from "@/components/shared/data";

import { W95_FONT } from "@/components/shared/constants";

export default function VideosMobile() {
  const [playing, setPlaying] = useState(null);

  if (VIDEO_LIBRARY.length === 0) {
    return (
      <div style={{ padding: 24, background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT, color: "#555", fontSize: 12 }}>
        No videos available.
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>
      {VIDEO_LIBRARY.map((video) => (
        <div
          key={video.id}
          style={{
            background: "#f0f0ea",
            borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #808080", borderBottom: "2px solid #808080",
            marginBottom: 14,
          }}
        >
          {/* Video header */}
          <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "7px 10px" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#000080" }}>{video.label}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{video.projectTitle}</div>
          </div>

          {/* Video player */}
          <div style={{ padding: "8px 10px" }}>
            {playing === video.id ? (
              <video
                src={video.src}
                controls
                autoPlay
                playsInline
                style={{ width: "100%", display: "block", background: "#000" }}
                onEnded={() => setPlaying(null)}
              />
            ) : (
              <button
                onClick={() => setPlaying(video.id)}
                style={{
                  width: "100%", aspectRatio: "16/9", background: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "none", cursor: "pointer", touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {/* Play triangle */}
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                  <polygon points="19,14 37,24 19,34" fill="#ffffff" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
