"use client";

import { cloneElement } from "react";

export function ExplorerItemGlyph({ item, size = 16 }) {
  if (!item?.glyph) {
    return <div style={{ width: size, height: size, border: "1px solid #808080", background: "#ffffff", flexShrink: 0 }} />;
  }

  const scale = size / 32;

  return (
    <div style={{ width: size, height: size, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ width: 32, height: 32, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {cloneElement(item.glyph)}
      </div>
    </div>
  );
}

export function DesktopTreeGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="2" width="14" height="10" fill="#c0c0c0" stroke="#404040" strokeWidth="1" />
      <rect x="2" y="3" width="12" height="8" fill="#000080" stroke="#ffffff" strokeWidth="0.6" />
      <rect x="6" y="12" width="4" height="2" fill="#808080" stroke="#404040" strokeWidth="0.6" />
      <rect x="4" y="14" width="8" height="1" fill="#808080" />
    </svg>
  );
}
