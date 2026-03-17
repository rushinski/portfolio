"use client";

import { useState } from "react";

import Tooltip from "../../ui/Tooltip";
import { getWin95ButtonStyle } from "../../ui/retro";

export function ToolbarGlyph({ kind, viewMode }) {
  if (kind === "back") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M9 2 L4 7 L9 12" fill="none" stroke="#202020" strokeWidth="2" strokeLinecap="square" />
      </svg>
    );
  }

  if (kind === "forward") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M5 2 L10 7 L5 12" fill="none" stroke="#202020" strokeWidth="2" strokeLinecap="square" />
      </svg>
    );
  }

  if (kind === "up") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M7 2 L2 7 L5 7 L5 12 L9 12 L9 7 L12 7 Z" fill="#ffe070" stroke="#404040" strokeWidth="1" />
      </svg>
    );
  }

  if (kind === "new-folder") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M1 4 L1 2 L5 2 L6 4 Z" fill="#d1a700" stroke="#7a5a00" strokeWidth="0.8" />
        <rect x="1" y="4" width="12" height="8" fill="#f3d14f" stroke="#7a5a00" strokeWidth="0.8" />
        <path d="M10 5 L10 7 L12 7 L12 9 L10 9 L10 11 L8 11 L8 9 L6 9 L6 7 L8 7 L8 5 Z" fill="#008000" />
      </svg>
    );
  }

  if (kind === "new-doc") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M3 1 L9 1 L12 4 L12 13 L3 13 Z" fill="#ffffff" stroke="#404040" strokeWidth="0.8" />
        <path d="M9 1 L9 4 L12 4" fill="#d7d7d7" stroke="#404040" strokeWidth="0.8" />
        <line x1="5" y1="6" x2="10" y2="6" stroke="#000080" strokeWidth="0.8" />
        <line x1="5" y1="8" x2="10" y2="8" stroke="#808080" strokeWidth="0.8" />
        <line x1="5" y1="10" x2="9" y2="10" stroke="#808080" strokeWidth="0.8" />
      </svg>
    );
  }

  if (kind === "paste") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <rect x="3" y="2" width="8" height="10" fill="#ffffff" stroke="#404040" strokeWidth="0.8" />
        <rect x="4.5" y="1" width="5" height="2" fill="#d0d0d0" stroke="#404040" strokeWidth="0.8" />
        <path d="M8 4 L11.5 7.5 L8 11" fill="none" stroke="#008000" strokeWidth="1.2" />
        <line x1="2" y1="7.5" x2="11" y2="7.5" stroke="#008000" strokeWidth="1.2" />
      </svg>
    );
  }

  if (kind === "delete") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <rect x="4" y="3" width="6" height="9" fill="#d0d0d0" stroke="#404040" strokeWidth="0.8" />
        <rect x="3" y="2" width="8" height="2" fill="#b0b0b0" stroke="#404040" strokeWidth="0.8" />
        <line x1="5" y1="5" x2="9" y2="9" stroke="#a00000" strokeWidth="1.4" />
        <line x1="9" y1="5" x2="5" y2="9" stroke="#a00000" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      {viewMode === "list" ? (
        <>
          <rect x="1.5" y="2" width="3" height="3" fill="#000080" />
          <rect x="1.5" y="6" width="3" height="3" fill="#000080" />
          <rect x="1.5" y="10" width="3" height="3" fill="#000080" />
          <line x1="6" y1="3.5" x2="12.5" y2="3.5" stroke="#202020" strokeWidth="1" />
          <line x1="6" y1="7.5" x2="12.5" y2="7.5" stroke="#202020" strokeWidth="1" />
          <line x1="6" y1="11.5" x2="12.5" y2="11.5" stroke="#202020" strokeWidth="1" />
        </>
      ) : (
        <>
          <rect x="1.5" y="2" width="4" height="4" fill="#000080" />
          <rect x="8.5" y="2" width="4" height="4" fill="#000080" />
          <rect x="1.5" y="8" width="4" height="4" fill="#000080" />
          <rect x="8.5" y="8" width="4" height="4" fill="#000080" />
        </>
      )}
    </svg>
  );
}

export function ToolbarButton({ title, disabled = false, active = false, onClick, children }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Tooltip label={title} disabled={disabled}>
      <button
        type="button"
        disabled={disabled}
        onPointerDown={() => { if (!disabled) setPressed(true); }}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onClick={onClick}
        style={{
          ...getWin95ButtonStyle({ pressed: pressed || active, disabled, padding: 0 }),
          width: 26,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: disabled ? "#c0c0c0" : active ? "#b7b7b7" : "#c0c0c0",
        }}
      >
        {children}
      </button>
    </Tooltip>
  );
}
