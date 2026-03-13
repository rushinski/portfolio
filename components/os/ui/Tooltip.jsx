"use client";

import { useState } from "react";

import { RAISED_BORDER, WIN95_COLORS, WIN95_FONT_FAMILY } from "./retro";

export default function Tooltip({ label, disabled = false, children }) {
  const [visible, setVisible] = useState(false);

  if (!label) {
    return children;
  }

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => !disabled && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => !disabled && setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && !disabled && (
        <span
          style={{
            ...RAISED_BORDER,
            position: "absolute",
            left: "50%",
            top: "calc(100% + 6px)",
            transform: "translateX(-50%)",
            background: "#fff8c6",
            color: WIN95_COLORS.text,
            fontFamily: WIN95_FONT_FAMILY,
            fontSize: 11,
            lineHeight: 1.2,
            padding: "3px 6px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 40000,
          }}
          role="tooltip"
        >
          {label}
        </span>
      )}
    </span>
  );
}
