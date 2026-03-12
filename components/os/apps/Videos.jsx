"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { clamp } from "../constants";
import { VIDEO_LIBRARY, VIDEO_LIBRARY_BY_ID } from "../data";
import { useWindowManager } from "../hooks/useWindowManager";

const formatVideoTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

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

  const controlButtonStyle = {
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
  };

  if (!VIDEO_LIBRARY.length) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 20, background: "#fff" }}>
        <div style={{ maxWidth: 420, fontSize: 11, lineHeight: 1.6, color: "#333" }}>
          No local videos configured yet.
          <br />
          Add files to <strong>/public/videos</strong> and map them in <strong>PROJECTS[].links.videos</strong>.
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, padding: "7px 10px 5px", borderBottom: "1px solid #808080" }}>
        Videos
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "220px 1fr", gap: 6, padding: 6 }}>
        <div style={{ border: "2px inset #c0c0c0", background: "#fff", overflowY: "auto", minHeight: 0 }}>
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

        <div style={{ border: "2px inset #c0c0c0", background: "#d4d0c8", minHeight: 0, display: "flex", flexDirection: "column" }}>
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
              <button onClick={() => stepToVideo(-1)} style={controlButtonStyle} title="Previous clip">⏮</button>
              <button onClick={rewindTenSeconds} style={controlButtonStyle} title="Rewind 10 seconds">⏪</button>
              <button onClick={togglePlayPause} style={controlButtonStyle} title={isPlaying ? "Pause" : "Play"}>{isPlaying ? "⏸" : "▶"}</button>
              <button onClick={stopPlayback} style={controlButtonStyle} title="Stop">⏹</button>
              <button onClick={() => stepToVideo(1)} style={controlButtonStyle} title="Next clip">⏭</button>
              <span style={{ marginLeft: 6, fontSize: 10, color: "#222", minWidth: 80 }}>
                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
              </span>
              <button onClick={() => setIsMuted((prev) => !prev)} style={{ ...controlButtonStyle, marginLeft: "auto", width: 24 }} title={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? "🔇" : "🔊"}
              </button>
              <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ width: 90 }} />
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
