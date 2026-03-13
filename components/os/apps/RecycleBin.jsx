"use client";

import { cloneElement, useEffect, useMemo, useState } from "react";

import { useDialogs } from "../hooks/useDialogs";
import { useFileSystem } from "../hooks/useFileSystem";
import { useWindowManager } from "../hooks/useWindowManager";
import { GLOBAL_CONTEXT_MENU_EVENT, announceContextMenuOpen } from "../ui/contextMenu";
import {
  ETCHED_SEPARATOR_STYLE,
  INSET_BORDER,
  STATUS_BAR_FIELD_STYLE,
  STATUS_BAR_STYLE,
  WIN95_COLORS,
  getWin95ButtonStyle,
} from "../ui/retro";

const RECYCLE_BIN_TIPS = [
  "Tip: Press Enter to restore the selected item.",
  "Tip: Delete permanently removes the selected item from this session.",
  "Tip: Restored items return to their original folder when it still exists.",
];

function formatDeletedAt(timestamp) {
  if (!timestamp) return "--";
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function BinItemGlyph({ item, size = 16 }) {
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

function BinContextMenu({ menu, onAction }) {
  if (!menu) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: menu.x,
        top: menu.y,
        minWidth: 164,
        background: WIN95_COLORS.surface,
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        zIndex: 30500,
        padding: "2px 0",
      }}
    >
      {[
        { id: "restore", label: "Restore" },
        { id: "delete", label: "Delete" },
      ].map((entry) => (
        <button
          key={entry.id}
          type="button"
          onClick={() => onAction(entry.id)}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            color: WIN95_COLORS.text,
            textAlign: "left",
            padding: "6px 14px",
            fontSize: 12,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = WIN95_COLORS.selection;
            event.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.color = WIN95_COLORS.text;
          }}
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}

export default function RecycleBinApp() {
  const {
    recycleBinItems,
    restoreRecycleBinItem,
    permanentlyDeleteRecycleBinItem,
    emptyRecycleBin,
  } = useFileSystem();
  const { showConfirmDialog } = useDialogs();
  const { activeWindowId } = useWindowManager();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);

  const sortedItems = useMemo(
    () => [...recycleBinItems].sort((a, b) => b.deletedAt - a.deletedAt || a.item.title.localeCompare(b.item.title)),
    [recycleBinItems],
  );
  const selectedEntry = useMemo(
    () => sortedItems.find((entry) => entry.item.id === selectedItemId) || null,
    [selectedItemId, sortedItems],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTipIndex((prev) => (prev + 1) % RECYCLE_BIN_TIPS.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedItemId && !sortedItems.some((entry) => entry.item.id === selectedItemId)) {
      setSelectedItemId(null);
    }
  }, [selectedItemId, sortedItems]);

  useEffect(() => {
    const handleForeignContextMenu = (event) => {
      if (event.detail?.source === "recycle-bin") {
        return;
      }

      setContextMenu(null);
    };

    window.addEventListener(GLOBAL_CONTEXT_MENU_EVENT, handleForeignContextMenu);
    return () => window.removeEventListener(GLOBAL_CONTEXT_MENU_EVENT, handleForeignContextMenu);
  }, []);

  const handleRestore = (id) => {
    const restored = restoreRecycleBinItem(id);
    if (restored) {
      setSelectedItemId((prev) => (prev === id ? null : prev));
      setContextMenu(null);
    }
  };

  const confirmPermanentDelete = (entry) => {
    if (!entry) {
      return;
    }

    showConfirmDialog(
      `Are you sure you want to permanently delete "${entry.item.title}"? This cannot be undone.`,
      {
        title: "Delete File",
        confirmLabel: "Yes",
        cancelLabel: "No",
        onConfirm: () => {
          permanentlyDeleteRecycleBinItem(entry.item.id);
          setSelectedItemId((prev) => (prev === entry.item.id ? null : prev));
          setContextMenu(null);
        },
      },
    );
  };

  const confirmEmptyRecycleBin = () => {
    if (sortedItems.length === 0) {
      return;
    }

    showConfirmDialog(
      `This will permanently delete all ${sortedItems.length} item${sortedItems.length === 1 ? "" : "s"}. Are you sure?`,
      {
        title: "Empty Recycle Bin",
        confirmLabel: "Yes",
        cancelLabel: "No",
        onConfirm: () => {
          emptyRecycleBin();
          setSelectedItemId(null);
          setContextMenu(null);
        },
      },
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeWindowId !== "trash") {
        return;
      }

      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (isTyping) {
        return;
      }

      if (event.key === "Escape") {
        setContextMenu(null);
        return;
      }

      if (!selectedEntry) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        handleRestore(selectedEntry.item.id);
        return;
      }

      if (event.key === "Delete") {
        event.preventDefault();
        confirmPermanentDelete(selectedEntry);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWindowId, selectedEntry]);

  return (
    <>
      <div
        style={{
          margin: "-4px -6px",
          minHeight: "calc(100% + 8px)",
          display: "flex",
          flexDirection: "column",
          background: WIN95_COLORS.surface,
          color: WIN95_COLORS.text,
          overflow: "hidden",
        }}
        onClick={() => setContextMenu(null)}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "8px 10px 6px", background: WIN95_COLORS.surface, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Recycle Bin</div>
            <div style={{ fontSize: 11, color: WIN95_COLORS.textMuted }}>
              {sortedItems.length} item{sortedItems.length === 1 ? "" : "s"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              type="button"
              disabled={!selectedEntry}
              onClick={() => selectedEntry && handleRestore(selectedEntry.item.id)}
              style={getWin95ButtonStyle({ minWidth: 72, disabled: !selectedEntry })}
            >
              Restore
            </button>
            <button
              type="button"
              disabled={!selectedEntry}
              onClick={() => confirmPermanentDelete(selectedEntry)}
              style={getWin95ButtonStyle({ minWidth: 72, disabled: !selectedEntry })}
            >
              Delete
            </button>
            <button
              type="button"
              disabled={sortedItems.length === 0}
              onClick={confirmEmptyRecycleBin}
              style={getWin95ButtonStyle({ minWidth: 120, disabled: sortedItems.length === 0 })}
            >
              Empty Recycle Bin
            </button>
          </div>
        </div>

        <div style={{ ...ETCHED_SEPARATOR_STYLE, margin: "0 10px 6px" }} />

        <div style={{ flex: 1, minHeight: 0, padding: "0 10px 10px", display: "flex", flexDirection: "column" }}>
          <div style={{ ...INSET_BORDER, background: "#ffffff", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(190px, 1.2fr) minmax(150px, 1fr) 130px 88px",
                alignItems: "center",
                minHeight: 22,
                background: WIN95_COLORS.surface,
                borderBottom: "1px solid #808080",
                fontSize: 11,
                fontWeight: 700,
                padding: "0 8px",
                flexShrink: 0,
              }}
            >
              <span>Name</span>
              <span>Original Location</span>
              <span>Date Deleted</span>
              <span>Size</span>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflow: "auto", background: "#ffffff" }}>
              {sortedItems.length === 0 ? (
                <div style={{ padding: "22px 16px", color: WIN95_COLORS.textMuted, fontSize: 12 }}>
                  The Recycle Bin is empty.
                </div>
              ) : (
                sortedItems.map((entry) => {
                  const selected = selectedEntry?.item.id === entry.item.id;

                  return (
                    <div
                      key={entry.item.id}
                      onClick={() => {
                        setSelectedItemId(entry.item.id);
                        setContextMenu(null);
                      }}
                      onDoubleClick={() => handleRestore(entry.item.id)}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        announceContextMenuOpen("recycle-bin");
                        setSelectedItemId(entry.item.id);
                        setContextMenu({
                          x: event.clientX,
                          y: event.clientY,
                          itemId: entry.item.id,
                        });
                      }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(190px, 1.2fr) minmax(150px, 1fr) 130px 88px",
                        alignItems: "center",
                        minHeight: 20,
                        padding: "0 8px",
                        background: selected ? WIN95_COLORS.selection : "transparent",
                        color: selected ? "#ffffff" : WIN95_COLORS.text,
                        fontSize: 11,
                        cursor: "default",
                        userSelect: "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                        <BinItemGlyph item={entry.item} size={16} />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.item.title}</span>
                      </div>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {entry.originalPath || "Desktop"}
                      </span>
                      <span>{formatDeletedAt(entry.deletedAt)}</span>
                      <span>{entry.sizeLabel || entry.item.sizeLabel || ""}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div style={{ ...STATUS_BAR_STYLE, borderTop: "1px solid #ffffff", flexShrink: 0 }}>
          <div style={{ ...STATUS_BAR_FIELD_STYLE, minWidth: 92 }}>
            {sortedItems.length} object{sortedItems.length === 1 ? "" : "s"}
          </div>
          <div style={{ ...STATUS_BAR_FIELD_STYLE, flex: 1, minWidth: 0 }}>
            {selectedEntry ? `${selectedEntry.item.title} - ${selectedEntry.item.typeLabel}` : "Recycle Bin ready"}
          </div>
          <div style={{ ...STATUS_BAR_FIELD_STYLE, flex: 1.2, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {RECYCLE_BIN_TIPS[tipIndex]}
          </div>
        </div>
      </div>

      <BinContextMenu
        menu={contextMenu}
        onAction={(action) => {
          const entry = sortedItems.find((candidate) => candidate.item.id === contextMenu?.itemId) || null;
          if (!entry) {
            setContextMenu(null);
            return;
          }

          if (action === "restore") {
            handleRestore(entry.item.id);
            return;
          }

          if (action === "delete") {
            confirmPermanentDelete(entry);
          }
        }}
      />
    </>
  );
}
