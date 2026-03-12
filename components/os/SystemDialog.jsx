"use client";

import {
  ETCHED_SEPARATOR_STYLE,
  WIN95_COLORS,
  WIN95_FONT_FAMILY,
  getDialogIconStyles,
  getWin95ButtonStyle,
  getWin95TitleBarStyle,
  getWin95WindowStyle,
} from "./ui/retro";

function DialogIcon({ variant }) {
  const styles = getDialogIconStyles(variant);

  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 0,
        background: styles.background,
        border: `2px solid ${styles.border}`,
        display: "grid",
        placeItems: "center",
        color: styles.accent,
        fontFamily: WIN95_FONT_FAMILY,
        fontWeight: 700,
        fontSize: 18,
        flexShrink: 0,
      }}
    >
      {styles.label}
    </div>
  );
}

export default function SystemDialog({ dialog, onClose }) {
  if (!dialog) {
    return null;
  }

  const {
    title = "JacobOS",
    message = "",
    details = null,
    variant = "info",
    confirmLabel = "OK",
    cancelLabel = null,
    onConfirm,
  } = dialog;
  const isTerminal = variant === "terminal";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "rgba(0, 0, 0, 0.35)",
        zIndex: 99999,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          ...getWin95WindowStyle(true),
          width: "min(420px, calc(100vw - 32px))",
          maxWidth: "100%",
        }}
      >
        <div style={getWin95TitleBarStyle(true)}>{title}</div>
        <div style={{ padding: 14, display: "flex", alignItems: "flex-start", gap: 12 }}>
          <DialogIcon variant={variant} />
          <div style={{ flex: 1, minWidth: 0, color: WIN95_COLORS.text, fontSize: 12, lineHeight: 1.45 }}>
            <div>{message}</div>
            {details ? (
              <pre
                style={{
                  marginTop: 10,
                  padding: 8,
                  whiteSpace: "pre-wrap",
                  fontFamily: "\"Courier New\", monospace",
                  fontSize: 11,
                  background: isTerminal ? "#000000" : WIN95_COLORS.field,
                  color: isTerminal ? "#29ff29" : WIN95_COLORS.text,
                  borderTop: `2px solid ${isTerminal ? "#0d2d0d" : WIN95_COLORS.borderDark}`,
                  borderLeft: `2px solid ${isTerminal ? "#0d2d0d" : WIN95_COLORS.borderDark}`,
                  borderRight: `2px solid ${isTerminal ? "#5d8f5d" : WIN95_COLORS.borderLight}`,
                  borderBottom: `2px solid ${isTerminal ? "#5d8f5d" : WIN95_COLORS.borderLight}`,
                  maxHeight: 220,
                  overflow: "auto",
                }}
              >
                {details}
              </pre>
            ) : null}
          </div>
        </div>
        <div style={{ ...ETCHED_SEPARATOR_STYLE, margin: "0 10px" }} />
        <div style={{ padding: "10px 12px 12px", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          {cancelLabel ? (
            <button onClick={onClose} style={getWin95ButtonStyle({ minWidth: 78 })}>
              {cancelLabel}
            </button>
          ) : null}
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            style={getWin95ButtonStyle({ minWidth: 78 })}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
