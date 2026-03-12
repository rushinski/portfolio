"use client";

import { useRef, useState } from "react";

import { clamp, snap } from "./constants";
import {
  WIN95_COLORS,
  getWin95ButtonStyle,
  getWin95FieldStyle,
  getWin95TitleBarStyle,
  getWin95WindowStyle,
} from "./ui/retro";

function TitleBar({
  title,
  isActive,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onPointerDown,
  onTitleDoubleClick,
}) {
  const controls = [
    { id: "min", glyph: "-", action: onMinimize },
    { id: "max", glyph: isMaximized ? "\u2750" : "\u25A1", action: onMaximize },
    { id: "close", glyph: "\u00D7", action: onClose },
  ];

  return (
    <div
      onPointerDown={onPointerDown}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onTitleDoubleClick?.();
      }}
      style={{
        ...getWin95TitleBarStyle(isActive),
        cursor: "default",
        userSelect: "none",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        {title}
      </span>
      <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
        {controls.map((button) => (
          <button
            key={button.id}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              button.action();
            }}
            style={{
              ...getWin95ButtonStyle({ padding: 0 }),
              width: 28,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: WIN95_COLORS.text,
              fontSize: button.id === "min" ? "16px" : "14px",
              lineHeight: 1,
            }}
          >
            <span style={{ transform: button.id === "min" ? "translateY(-2px)" : "none" }}>{button.glyph}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WindowFrame({
  win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
  children,
}) {
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    onFocus();
    const rect = dragRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    offsetRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    setIsDragging(true);

    const handlePointerMove = (pointerEvent) => {
      const parent = dragRef.current?.parentElement?.getBoundingClientRect();
      if (!parent) {
        return;
      }

      let nextX = pointerEvent.clientX - parent.left - offsetRef.current.x;
      let nextY = pointerEvent.clientY - parent.top - offsetRef.current.y;

      nextX = clamp(nextX, -win.w + 60, parent.width - 60);
      nextY = clamp(nextY, 0, parent.height - 30);

      onMove(snap(nextX), snap(nextY));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleResizePointerDown = (event, direction) => {
    event.stopPropagation();
    event.preventDefault();
    onFocus();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = win.w;
    const startHeight = win.h || 400;
    const startLeft = win.x;
    const startTop = win.y;

    const handleMove = (pointerEvent) => {
      const deltaX = pointerEvent.clientX - startX;
      const deltaY = pointerEvent.clientY - startY;

      let nextWidth = startWidth;
      let nextHeight = startHeight;
      let nextX = startLeft;
      let nextY = startTop;

      if (direction.includes("e")) nextWidth = Math.max(250, startWidth + deltaX);
      if (direction.includes("s")) nextHeight = Math.max(150, startHeight + deltaY);
      if (direction.includes("w")) {
        nextWidth = Math.max(250, startWidth - deltaX);
        nextX = startLeft + (startWidth - nextWidth);
      }
      if (direction.includes("n")) {
        nextHeight = Math.max(150, startHeight - deltaY);
        nextY = startTop + (startHeight - nextHeight);
      }

      onResize(nextX, nextY, nextWidth, nextHeight);
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  const windowStyle = win.isMaximized
    ? { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: win.z }
    : { position: "absolute", left: win.x, top: win.y, width: win.w, height: win.h || "auto", zIndex: win.z };

  return (
    <div
      ref={dragRef}
      style={{
        ...windowStyle,
        opacity: isDragging ? 0.75 : 1,
        transition: isDragging ? "none" : "opacity 0.15s",
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        if (!isActive) {
          onFocus();
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div
        style={{
          ...getWin95WindowStyle(isActive),
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <TitleBar
          title={win.title}
          isActive={isActive}
          isMaximized={win.isMaximized}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onPointerDown={handlePointerDown}
          onTitleDoubleClick={onMaximize}
        />
        <div
          style={{
            ...getWin95FieldStyle(),
            margin: "3px",
            flex: 1,
            overflow: "auto",
            fontSize: "13px",
            lineHeight: 1.55,
            minHeight: 0,
          }}
        >
          {children}
        </div>
        {!win.isMaximized && (
          <>
            <div onPointerDown={(event) => handleResizePointerDown(event, "e")} style={{ position: "absolute", top: 4, right: -3, width: 6, bottom: 4, cursor: "ew-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "s")} style={{ position: "absolute", left: 4, bottom: -3, height: 6, right: 4, cursor: "ns-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "w")} style={{ position: "absolute", top: 4, left: -3, width: 6, bottom: 4, cursor: "ew-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "n")} style={{ position: "absolute", left: 4, top: -3, height: 6, right: 4, cursor: "ns-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "se")} style={{ position: "absolute", right: -3, bottom: -3, width: 10, height: 10, cursor: "nwse-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "sw")} style={{ position: "absolute", left: -3, bottom: -3, width: 10, height: 10, cursor: "nesw-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "ne")} style={{ position: "absolute", right: -3, top: -3, width: 10, height: 10, cursor: "nesw-resize" }} />
            <div onPointerDown={(event) => handleResizePointerDown(event, "nw")} style={{ position: "absolute", left: -3, top: -3, width: 10, height: 10, cursor: "nwse-resize" }} />
          </>
        )}
      </div>
    </div>
  );
}
