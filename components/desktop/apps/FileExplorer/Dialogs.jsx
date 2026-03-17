"use client";

import {
  ETCHED_SEPARATOR_STYLE,
  WIN95_COLORS,
  getWin95ButtonStyle,
  getWin95FieldStyle,
  getWin95TitleBarStyle,
  getWin95WindowStyle,
} from "../../ui/retro";
import { ExplorerItemGlyph } from "./Glyphs";
import { formatExplorerDateTime } from "./utils";

export function ExplorerPropertiesDialog({ item, properties, onClose }) {
  if (!item || !properties) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.28)",
        zIndex: 31000,
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{ ...getWin95WindowStyle(true), width: 360, maxWidth: "calc(100vw - 32px)" }}
      >
        <div style={getWin95TitleBarStyle(true)}>
          <span>Properties</span>
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ExplorerItemGlyph item={item} size={32} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: WIN95_COLORS.text }}>{properties.name}</div>
              <div style={{ fontSize: 11, color: WIN95_COLORS.textMuted }}>{properties.type}</div>
            </div>
          </div>

          <div style={{ ...ETCHED_SEPARATOR_STYLE, margin: "12px 0 10px" }} />

          {[
            ["Type", properties.type],
            ["Location", properties.location],
            ["Size", properties.size || "N/A"],
            ["Created", formatExplorerDateTime(properties.createdAt)],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 8, alignItems: "start", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: WIN95_COLORS.textMuted }}>{label}</span>
              <div style={{ ...getWin95FieldStyle({ padding: "3px 6px" }), minHeight: 22 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ ...ETCHED_SEPARATOR_STYLE, margin: "0 10px" }} />
        <div style={{ padding: "10px 12px 12px", display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={getWin95ButtonStyle({ minWidth: 78 })}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExplorerContextMenu({ menu, onAction, canPasteHere, currentViewMode }) {
  if (!menu) return null;

  const itemEntries = [
    { id: "open", label: "Open", disabled: false },
    { id: "rename", label: "Rename", disabled: !menu.canRename },
    { id: "cut", label: "Cut", disabled: !menu.canModify },
    { id: "copy", label: "Copy", disabled: !menu.canModify },
    { id: "paste", label: "Paste", disabled: !canPasteHere },
    { id: "delete", label: "Delete", disabled: !menu.canDelete },
    { id: "properties", label: "Properties", disabled: false },
  ];

  const backgroundEntries = [
    { id: "new-folder", label: "New Folder", disabled: !menu.canCreate },
    { id: "new-document", label: "New Document", disabled: !menu.canCreate },
    { id: "paste", label: "Paste", disabled: !canPasteHere },
    { id: "view-list", label: currentViewMode === "list" ? "List View *" : "List View", disabled: false },
    { id: "view-grid", label: currentViewMode === "grid" ? "Grid View *" : "Grid View", disabled: false },
    { id: "refresh", label: "Refresh", disabled: false },
  ];

  const entries = menu.scope === "item" ? itemEntries : backgroundEntries;

  return (
    <div
      style={{
        position: "fixed",
        left: menu.x,
        top: menu.y,
        minWidth: 176,
        background: WIN95_COLORS.surface,
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        zIndex: 30500,
        padding: "2px 0",
      }}
    >
      {entries.map((entry) => (
        <button
          key={entry.id}
          type="button"
          disabled={entry.disabled}
          onClick={() => onAction(entry.id)}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            color: entry.disabled ? "#808080" : WIN95_COLORS.text,
            textAlign: "left",
            padding: "6px 14px",
            fontSize: 12,
            fontFamily: "inherit",
            cursor: entry.disabled ? "default" : "pointer",
          }}
          onMouseEnter={(event) => {
            if (!entry.disabled) {
              event.currentTarget.style.background = WIN95_COLORS.selection;
              event.currentTarget.style.color = "#ffffff";
            }
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.color = entry.disabled ? "#808080" : WIN95_COLORS.text;
          }}
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}
