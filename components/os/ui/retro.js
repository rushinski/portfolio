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

export const WIN95_SCROLLBAR_CSS = `
  *::-webkit-scrollbar { width: 17px; height: 17px; }

  *::-webkit-scrollbar-track {
    background-color: #808080;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Crect width='1' height='1' fill='%23c0c0c0'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23c0c0c0'/%3E%3C/svg%3E");
    background-size: 2px 2px;
  }

  *::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-right: 2px solid #404040;
    border-bottom: 2px solid #404040;
    border-radius: 0;
    min-height: 20px; min-width: 20px;
  }
  *::-webkit-scrollbar-thumb:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }

  *::-webkit-scrollbar-button {
    display: block;
    width: 17px; height: 17px;
    background-color: #c0c0c0;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-right: 2px solid #404040;
    border-bottom: 2px solid #404040;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 8px 8px;
  }
  *::-webkit-scrollbar-button:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    background-position: calc(50% + 1px) calc(50% + 1px);
  }
  *::-webkit-scrollbar-button:double-button { display: none; }

  *::-webkit-scrollbar-button:single-button:vertical:decrement {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Cpolygon points='4,1 7,6 1,6' fill='%23000'/%3E%3C/svg%3E");
  }
  *::-webkit-scrollbar-button:single-button:vertical:increment {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Cpolygon points='1,2 7,2 4,7' fill='%23000'/%3E%3C/svg%3E");
  }
  *::-webkit-scrollbar-button:single-button:horizontal:decrement {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Cpolygon points='1,4 6,1 6,7' fill='%23000'/%3E%3C/svg%3E");
  }
  *::-webkit-scrollbar-button:single-button:horizontal:increment {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Cpolygon points='7,4 2,1 2,7' fill='%23000'/%3E%3C/svg%3E");
  }

  *::-webkit-scrollbar-corner { background: #c0c0c0; }
`;
