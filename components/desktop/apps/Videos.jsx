"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { clamp } from "../constants";
import { VIDEO_LIBRARY, VIDEO_LIBRARY_BY_ID } from "@/components/shared/data";
import { useWindowManager } from "../hooks/useWindowManager";
import Tooltip from "../ui/Tooltip";
import { APP_BODY_STYLE, APP_CONTENT_STYLE, INSET_BORDER } from "../ui/retro";

const formatVideoTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

function TransportGlyph({ kind, active = false }) {
  if (kind === "prev") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <rect x="1" y="2" width="1.5" height="8" fill="#111" />
        <path d="M9.5 2.2 L4.2 6 L9.5 9.8 Z" fill="#111" />
      </svg>
    );
  }

  if (kind === "rewind") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M6.1 2.2 L1.8 6 L6.1 9.8 Z" fill="#111" />
        <path d="M10.2 2.2 L5.9 6 L10.2 9.8 Z" fill="#111" />
      </svg>
    );
  }

  if (kind === "play") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M3 2 L10 6 L3 10 Z" fill="#111" />
      </svg>
    );
  }

  if (kind === "pause") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <rect x="2.5" y="2" width="2.5" height="8" fill="#111" />
        <rect x="7" y="2" width="2.5" height="8" fill="#111" />
      </svg>
    );
  }

  if (kind === "stop") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <rect x="2" y="2" width="8" height="8" fill="#111" />
      </svg>
    );
  }

  if (kind === "next") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2.5 2.2 L7.8 6 L2.5 9.8 Z" fill="#111" />
        <rect x="9.5" y="2" width="1.5" height="8" fill="#111" />
      </svg>
    );
  }

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 7.5 H4 V4.5 H2 Z" fill="#111" />
      <path d="M4 4.5 L6.6 2.6 V9.4 L4 7.5 Z" fill="#111" />
      {active ? (
        <>
          <path d="M8.2 4.2 C9.2 4.8 9.2 7.2 8.2 7.8" fill="none" stroke="#111" strokeWidth="1" />
          <path d="M9.7 3.2 C11 4.2 11 7.8 9.7 8.8" fill="none" stroke="#111" strokeWidth="1" />
        </>
      ) : (
        <path d="M8 4 L10.5 8" fill="none" stroke="#111" strokeWidth="1.1" />
      )}
    </svg>
  );
}

function ControlButton({ label, onClick, style, children }) {
  const buttonStyle = {
    width: 22,
    height: 18,
    padding: 0,
    fontSize: 9,
    background: "#c0c0c0",
    fontFamily: "inherit",
    border: "1px solid",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  return (
    <Tooltip label={label}>
      <button onClick={onClick} style={buttonStyle}>
        {children}
      </button>
    </Tooltip>
  );
}

export default function VideosApp() {
  const { selectedVideoId, setSelectedVideoId } = useWindowManager();
  const fallbackVideoId = VIDEO_LIBRARY[0]?.id || null;
  const normalizeVideoId = useCallback((id) => {
    if (id && VIDEO_LIBRARY_BY_ID[id]) return id;
    return fallbackVideoId;
  }, [fallbackVideoId]);

  const [currentVideoId, setCurrentVideoId] = useState(() => normalizeVideoId(selectedVideoId));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const nextId = normalizeVideoId(selectedVideoId);
    if (nextId) {
      setCurrentVideoId(nextId);
    }
  }, [normalizeVideoId, selectedVideoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted, currentVideoId]);

  useEffect(() => {
    setVideoError("");
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [currentVideoId]);

  const currentIndex = VIDEO_LIBRARY.findIndex((video) => video.id === currentVideoId);
  const currentVideo = currentIndex >= 0 ? VIDEO_LIBRARY[currentIndex] : null;

  const stepToVideo = (delta) => {
    if (!VIDEO_LIBRARY.length) return;
    const baseIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = clamp(baseIndex + delta, 0, VIDEO_LIBRARY.length - 1);
    const nextId = VIDEO_LIBRARY[nextIndex].id;
    setCurrentVideoId(nextId);
    setSelectedVideoId(nextId);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      return;
    }
    video.pause();
  };

  const stopPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const rewindTenSeconds = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  if (!VIDEO_LIBRARY.length) {
    return (
      <div style={APP_BODY_STYLE}>
        <div style={{ ...APP_CONTENT_STYLE, display: "grid", placeItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 420, fontSize: 11, lineHeight: 1.6, color: "#333" }}>
            No local videos configured yet.
            <br />
            Add files to <strong>/public/videos</strong> and map them in <strong>PROJECTS[].links.videos</strong>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "grid", gridTemplateColumns: "220px 1fr", gap: 6, padding: 6 }}>
        <div style={{ ...INSET_BORDER, background: "#fff", overflowY: "auto", minHeight: 0 }}>
          {VIDEO_LIBRARY.map((video) => {
            const selected = video.id === currentVideoId;
            return (
              <button
                key={video.id}
                onClick={() => {
                  setCurrentVideoId(video.id);
                  setSelectedVideoId(video.id);
                }}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #e4e4e4",
                  background: selected ? "#000080" : "transparent",
                  color: selected ? "#fff" : "#111",
                  textAlign: "left",
                  padding: "7px 8px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{video.label}</div>
                <div style={{ fontSize: 9, opacity: selected ? 0.9 : 0.75, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{video.projectTitle}</div>
              </button>
            );
          })}
        </div>

        <div style={{ ...INSET_BORDER, background: "#d4d0c8", minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", color: "#111", fontSize: 10, fontWeight: 700, padding: "3px 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentVideo?.label || "No Video Selected"}
          </div>

          <div style={{ flex: 1, background: "#000", margin: 3, position: "relative", minHeight: 0 }}>
            {currentVideo ? (
              <video
                key={currentVideo.id}
                ref={videoRef}
                src={currentVideo.src}
                poster={currentVideo.poster || undefined}
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setVideoError(`Unable to load file: ${currentVideo.src}`)}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#b0b0b0", fontSize: 11 }}>
                Select a video
              </div>
            )}
          </div>

          <div style={{ padding: "4px 6px 6px" }}>
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 1}
              step={0.1}
              value={Math.min(currentTime, duration || 1)}
              onChange={(event) => {
                const next = Number(event.target.value);
                const video = videoRef.current;
                if (!video) return;
                video.currentTime = next;
                setCurrentTime(next);
              }}
              style={{ width: "100%", marginBottom: 4 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ControlButton label="Previous clip" onClick={() => stepToVideo(-1)}>
                <TransportGlyph kind="prev" />
              </ControlButton>
              <ControlButton label="Rewind 10 seconds" onClick={rewindTenSeconds}>
                <TransportGlyph kind="rewind" />
              </ControlButton>
              <ControlButton label={isPlaying ? "Pause" : "Play"} onClick={togglePlayPause}>
                <TransportGlyph kind={isPlaying ? "pause" : "play"} />
              </ControlButton>
              <ControlButton label="Stop" onClick={stopPlayback}>
                <TransportGlyph kind="stop" />
              </ControlButton>
              <ControlButton label="Next clip" onClick={() => stepToVideo(1)}>
                <TransportGlyph kind="next" />
              </ControlButton>
              <span style={{ marginLeft: 6, fontSize: 10, color: "#222", flex: 1 }}>
                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
              </span>
              <ControlButton label={isMuted ? "Unmute" : "Mute"} onClick={() => setIsMuted((prev) => !prev)} style={{ width: 24 }}>
                <TransportGlyph kind="volume" active={!isMuted} />
              </ControlButton>
              <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ width: 80 }} />
            </div>
            <div style={{ fontSize: 9, color: videoError ? "#8b0000" : "#1f4a1f", marginTop: 3, minHeight: 12 }}>
              {videoError || (currentVideo ? `Ready: ${currentVideo.projectTitle}` : "Ready")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
