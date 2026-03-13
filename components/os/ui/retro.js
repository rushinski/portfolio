"use client";

export const WIN95_FONT_FAMILY = "\"MS Sans Serif\", Tahoma, Geneva, sans-serif";

export const WIN95_COLORS = {
  surface: "#c0c0c0",
  surfaceRaised: "#d4d0c8",
  field: "#ffffff",
  text: "#111111",
  textMuted: "#4f4f4f",
  titleStart: "#000080",
  titleEnd: "#1084d0",
  titleInactiveStart: "#7f7f7f",
  titleInactiveEnd: "#b5b5b5",
  borderLight: "#ffffff",
  borderMid: "#dfdfdf",
  borderDark: "#808080",
  borderShadow: "#404040",
  selection: "#000080",
};

export const RAISED_BORDER = {
  borderTop: `2px solid ${WIN95_COLORS.borderLight}`,
  borderLeft: `2px solid ${WIN95_COLORS.borderLight}`,
  borderRight: `2px solid ${WIN95_COLORS.borderDark}`,
  borderBottom: `2px solid ${WIN95_COLORS.borderDark}`,
};

export const PRESSED_BORDER = {
  borderTop: `2px solid ${WIN95_COLORS.borderDark}`,
  borderLeft: `2px solid ${WIN95_COLORS.borderDark}`,
  borderRight: `2px solid ${WIN95_COLORS.borderLight}`,
  borderBottom: `2px solid ${WIN95_COLORS.borderLight}`,
};

export const INSET_BORDER = {
  borderTop: `2px solid ${WIN95_COLORS.borderDark}`,
  borderLeft: `2px solid ${WIN95_COLORS.borderDark}`,
  borderRight: `2px solid ${WIN95_COLORS.borderLight}`,
  borderBottom: `2px solid ${WIN95_COLORS.borderLight}`,
};

export function getWin95ButtonStyle(options = {}) {
  const {
    pressed = false,
    disabled = false,
    padding = "3px 12px",
    minWidth,
  } = options;

  return {
    ...(pressed ? PRESSED_BORDER : RAISED_BORDER),
    background: WIN95_COLORS.surface,
    color: disabled ? WIN95_COLORS.borderDark : WIN95_COLORS.text,
    fontFamily: WIN95_FONT_FAMILY,
    fontSize: 12,
    lineHeight: 1.2,
    padding,
    minWidth,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.7 : 1,
    boxSizing: "border-box",
  };
}

export function getWin95FieldStyle(options = {}) {
  const { padding = "4px 6px", minHeight } = options;

  return {
    ...INSET_BORDER,
    background: WIN95_COLORS.field,
    color: WIN95_COLORS.text,
    fontFamily: WIN95_FONT_FAMILY,
    fontSize: 12,
    padding,
    minHeight,
    boxSizing: "border-box",
  };
}

export function getWin95TabStyle(active = false) {
  return {
    ...(active ? RAISED_BORDER : RAISED_BORDER),
    borderBottom: active ? `2px solid ${WIN95_COLORS.surface}` : `2px solid ${WIN95_COLORS.borderDark}`,
    background: active ? WIN95_COLORS.surface : "#b3b3b3",
    color: WIN95_COLORS.text,
    fontFamily: WIN95_FONT_FAMILY,
    fontSize: 12,
    padding: "4px 12px 5px",
    cursor: "pointer",
    position: "relative",
    top: active ? 1 : 3,
    fontWeight: active ? 700 : 400,
  };
}

export function getWin95TitleBarStyle(active = true) {
  return {
    background: active ? WIN95_COLORS.titleStart : WIN95_COLORS.titleInactiveStart,
    color: WIN95_COLORS.borderLight,
    fontFamily: WIN95_FONT_FAMILY,
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 0.2,
    padding: "4px 4px 4px 7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
}

export function getWin95WindowStyle(active = true) {
  return {
    ...RAISED_BORDER,
    background: WIN95_COLORS.surface,
    color: WIN95_COLORS.text,
    fontFamily: WIN95_FONT_FAMILY,
    boxSizing: "border-box",
    outline: active ? "1px solid #000000" : "none",
  };
}

export const ETCHED_SEPARATOR_STYLE = {
  height: 2,
  borderTop: `1px solid ${WIN95_COLORS.borderDark}`,
  borderBottom: `1px solid ${WIN95_COLORS.borderLight}`,
};

export const STATUS_BAR_STYLE = {
  ...RAISED_BORDER,
  background: WIN95_COLORS.surface,
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontFamily: WIN95_FONT_FAMILY,
  fontSize: 11,
  color: WIN95_COLORS.textMuted,
};

export const STATUS_BAR_FIELD_STYLE = {
  ...INSET_BORDER,
  background: WIN95_COLORS.surface,
  padding: "2px 6px",
  minHeight: 20,
  display: "flex",
  alignItems: "center",
  color: WIN95_COLORS.text,
  fontFamily: WIN95_FONT_FAMILY,
  fontSize: 11,
};

export const APP_BODY_STYLE = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: WIN95_COLORS.surface,
  color: WIN95_COLORS.text,
  fontFamily: WIN95_FONT_FAMILY,
  overflow: "hidden",
};

export const APP_CONTENT_STYLE = {
  ...INSET_BORDER,
  flex: 1,
  minHeight: 0,
  margin: 6,
  padding: "10px 12px",
  background: WIN95_COLORS.field,
  boxSizing: "border-box",
  overflow: "auto",
};

export const APP_PANEL_STYLE = {
  ...RAISED_BORDER,
  background: WIN95_COLORS.surfaceRaised,
  padding: "8px 10px",
  boxSizing: "border-box",
};

export const APP_FIELD_STYLE = {
  ...INSET_BORDER,
  background: WIN95_COLORS.field,
  padding: "8px 10px",
  boxSizing: "border-box",
};

export const APP_SECTION_HEADER_STYLE = {
  fontSize: 10,
  fontWeight: 700,
  color: WIN95_COLORS.titleStart,
  textTransform: "uppercase",
  letterSpacing: 1,
  paddingBottom: 4,
  marginBottom: 8,
  borderBottom: `1px solid ${WIN95_COLORS.borderDark}`,
};

export const APP_META_TEXT_STYLE = {
  fontSize: 11,
  color: WIN95_COLORS.textMuted,
  lineHeight: 1.5,
};

export function getDialogIconStyles(variant = "info") {
  const variantMap = {
    info: { background: "#e9f1ff", border: "#000080", accent: "#1084d0", label: "i" },
    warning: { background: "#fff7d6", border: "#8b6a00", accent: "#d18b00", label: "!" },
    error: { background: "#ffe4e4", border: "#8b1f1f", accent: "#d00000", label: "!" },
    terminal: { background: "#001400", border: "#0f5f0f", accent: "#2cff2c", label: ">" },
  };

  return variantMap[variant] || variantMap.info;
}

const WIN95_SCROLLBAR_ARROW_UP = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3E%3Cpath fill=%27%23111%27 d=%27M4 1L1 4h6Z%27/%3E%3C/svg%3E";
const WIN95_SCROLLBAR_ARROW_DOWN = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3E%3Cpath fill=%27%23111%27 d=%27M1 3h6L4 6Z%27/%3E%3C/svg%3E";
const WIN95_SCROLLBAR_ARROW_LEFT = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3E%3Cpath fill=%27%23111%27 d=%27M1 4l3-3v6Z%27/%3E%3C/svg%3E";
const WIN95_SCROLLBAR_ARROW_RIGHT = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3E%3Cpath fill=%27%23111%27 d=%27M3 1l3 3-3 3Z%27/%3E%3C/svg%3E";

export const WIN95_SCROLLBAR_CSS = `
  * {
    scrollbar-width: auto;
    scrollbar-color: #c0c0c0 #d4d0c8;
  }
  *::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background: #d4d0c8;
  }
  *::-webkit-scrollbar-button {
    display: block;
    width: 16px;
    height: 16px;
    background: #c0c0c0;
    border-left: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #808080;
    border-bottom: 2px solid #808080;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 7px 7px;
    box-sizing: border-box;
  }
  *::-webkit-scrollbar-button:single-button:vertical:decrement { background-image: url("${WIN95_SCROLLBAR_ARROW_UP}"); }
  *::-webkit-scrollbar-button:single-button:vertical:increment { background-image: url("${WIN95_SCROLLBAR_ARROW_DOWN}"); }
  *::-webkit-scrollbar-button:single-button:horizontal:decrement { background-image: url("${WIN95_SCROLLBAR_ARROW_LEFT}"); }
  *::-webkit-scrollbar-button:single-button:horizontal:increment { background-image: url("${WIN95_SCROLLBAR_ARROW_RIGHT}"); }
  *::-webkit-scrollbar-button:hover { background-color: #d4d0c8; }
  *::-webkit-scrollbar-button:active {
    background-color: #b8b4ac;
    border-left: 2px solid #808080;
    border-top: 2px solid #808080;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
  *::-webkit-scrollbar-track {
    background: #d4d0c8;
    border-left: 1px solid #ffffff;
    border-top: 1px solid #ffffff;
    border-right: 1px solid #808080;
    border-bottom: 1px solid #808080;
  }
  *::-webkit-scrollbar-track-piece {
    background-color: #c8c4bc;
    background-image:
      linear-gradient(45deg, rgba(255,255,255,0.55) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.55) 75%),
      linear-gradient(45deg, rgba(255,255,255,0.55) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.55) 75%);
    background-size: 4px 4px;
    background-position: 0 0, 2px 2px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    background-image:
      linear-gradient(to right,
        transparent 2px, #808080 2px, #808080 3px, #ffffff 3px, #ffffff 4px,
        transparent 4px, transparent 6px, #808080 6px, #808080 7px, #ffffff 7px, #ffffff 8px,
        transparent 8px, transparent 10px, #808080 10px, #808080 11px, #ffffff 11px, #ffffff 12px,
        transparent 12px
      );
    border-left: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #808080;
    border-bottom: 2px solid #808080;
    border-radius: 0;
  }
  *::-webkit-scrollbar-thumb:hover { background-color: #d4d0c8; }
  *::-webkit-scrollbar-thumb:active {
    background-color: #b8b4ac;
    border-left: 2px solid #808080;
    border-top: 2px solid #808080;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
  *::-webkit-scrollbar-corner {
    background: #c0c0c0;
    border-left: 1px solid #ffffff;
    border-top: 1px solid #ffffff;
    border-right: 1px solid #808080;
    border-bottom: 1px solid #808080;
  }
`;
