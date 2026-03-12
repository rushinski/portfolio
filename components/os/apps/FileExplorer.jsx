"use client";

import { cloneElement, useEffect, useMemo, useRef, useState } from "react";

import { useFileSystem } from "../hooks/useFileSystem";
import { useWindowManager } from "../hooks/useWindowManager";
import {
  ETCHED_SEPARATOR_STYLE,
  INSET_BORDER,
  STATUS_BAR_FIELD_STYLE,
  STATUS_BAR_STYLE,
  WIN95_COLORS,
  getWin95ButtonStyle,
  getWin95FieldStyle,
} from "../ui/retro";

const EXPLORER_TIPS = [
  "Tip: Double-click a folder to open it.",
  "Tip: Use the search field to filter this folder in real time.",
  "Tip: Drag the divider to resize the folder tree.",
  "Tip: Back and Forward keep your folder history.",
];

const TREE_ROW_HEIGHT = 18;
const TREE_INDENT = 16;

function formatExplorerDate(timestamp) {
  if (!timestamp) {
    return "--/--/--";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date(timestamp));
}

function ExplorerItemGlyph({ item, size = 16 }) {
  if (!item?.glyph) {
    return (
      <div
        style={{
          width: size,
          height: size,
          border: "1px solid #808080",
          background: "#ffffff",
          flexShrink: 0,
        }}
      />
    );
  }

  const scale = size / 32;

  return (
    <div
      style={{
        width: size,
        height: size,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {cloneElement(item.glyph)}
      </div>
    </div>
  );
}

function DesktopTreeGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="2" width="14" height="10" fill="#c0c0c0" stroke="#404040" strokeWidth="1" />
      <rect x="2" y="3" width="12" height="8" fill="#000080" stroke="#ffffff" strokeWidth="0.6" />
      <rect x="6" y="12" width="4" height="2" fill="#808080" stroke="#404040" strokeWidth="0.6" />
      <rect x="4" y="14" width="8" height="1" fill="#808080" />
    </svg>
  );
}

function ToolbarGlyph({ kind, viewMode }) {
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

function ToolbarButton({ title, disabled = false, active = false, onClick, children }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onPointerDown={() => {
        if (!disabled) {
          setPressed(true);
        }
      }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={onClick}
      style={{
        ...getWin95ButtonStyle({
          pressed: pressed || active,
          disabled,
          padding: 0,
        }),
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
  );
}

function ExplorerMenuButton({ label }) {
  return (
    <button
      type="button"
      style={{
        border: "none",
        background: "transparent",
        color: WIN95_COLORS.text,
        fontSize: 12,
        fontFamily: "inherit",
        padding: "2px 7px",
        cursor: "default",
      }}
    >
      {label}
    </button>
  );
}

function TreeRow({
  depth,
  label,
  selected,
  icon,
  hasChildren,
  isCollapsed,
  onToggle,
  onClick,
}) {
  const rowColor = selected ? "#ffffff" : WIN95_COLORS.text;
  const connectorLeft = 10 + depth * TREE_INDENT;

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        height: TREE_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        paddingLeft: 6 + depth * TREE_INDENT,
        background: selected ? WIN95_COLORS.selection : "transparent",
        color: rowColor,
        fontSize: 12,
        whiteSpace: "nowrap",
        cursor: "default",
      }}
    >
      {depth > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              left: connectorLeft + 5,
              top: 0,
              bottom: 0,
              borderLeft: "1px dotted #8a8a8a",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: connectorLeft + 5,
              top: 8,
              width: 8,
              borderTop: "1px dotted #8a8a8a",
            }}
          />
        </>
      )}

      {hasChildren ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggle?.();
          }}
          style={{
            width: 11,
            height: 11,
            marginRight: 4,
            padding: 0,
            border: "1px solid #808080",
            background: "#ffffff",
            color: "#202020",
            fontSize: 10,
            lineHeight: "9px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {isCollapsed ? "+" : "-"}
        </button>
      ) : (
        <div style={{ width: 11, marginRight: 4, flexShrink: 0 }} />
      )}

      <div style={{ marginRight: 4, display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</div>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </div>
  );
}

function FolderTreeNode({
  folder,
  depth,
  currentFolderId,
  childrenByParent,
  collapsedNodeIds,
  toggleNode,
  onSelect,
}) {
  const childFolders = childrenByParent.get(folder.id) || [];
  const isCollapsed = collapsedNodeIds.has(folder.id);

  return (
    <>
      <TreeRow
        depth={depth}
        label={folder.title}
        selected={currentFolderId === folder.id}
        icon={<ExplorerItemGlyph item={folder} size={16} />}
        hasChildren={childFolders.length > 0}
        isCollapsed={isCollapsed}
        onToggle={() => toggleNode(folder.id)}
        onClick={() => onSelect(folder.id)}
      />
      {!isCollapsed && childFolders.map((childFolder) => (
        <FolderTreeNode
          key={childFolder.id}
          folder={childFolder}
          depth={depth + 1}
          currentFolderId={currentFolderId}
          childrenByParent={childrenByParent}
          collapsedNodeIds={collapsedNodeIds}
          toggleNode={toggleNode}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

export default function FileExplorerApp() {
  const {
    desktopItems,
    createFolder,
    createTextDocument,
    getFolderPathSegments,
    getItemById,
    getItemsInFolder,
    moveItemToRecycleBin,
    openItem,
  } = useFileSystem();
  const {
    activeWindowId,
    explorerState,
    explorerNavigateTo,
    explorerGoBack,
    explorerGoForward,
    explorerGoUp,
    setExplorerViewMode,
    setExplorerSidebarWidth,
    setExplorerSearchQuery,
    setExplorerSelectedItemId,
  } = useWindowManager();

  const splitPaneRef = useRef(null);
  const [collapsedNodeIds, setCollapsedNodeIds] = useState(new Set());
  const [tipIndex, setTipIndex] = useState(0);

  const currentFolder = explorerState.currentFolderId ? getItemById(explorerState.currentFolderId) : null;
  const pathSegments = getFolderPathSegments(explorerState.currentFolderId);

  const folderChildrenByParent = useMemo(() => {
    const next = new Map();

    desktopItems
      .filter((item) => item.itemType === "folder")
      .forEach((folder) => {
        const parentId = folder.parentId ?? null;
        const siblings = next.get(parentId) || [];
        siblings.push(folder);
        next.set(parentId, siblings);
      });

    next.forEach((siblings) => siblings.sort((a, b) => a.title.localeCompare(b.title)));
    return next;
  }, [desktopItems]);

  const currentItems = useMemo(() => (
    [...getItemsInFolder(explorerState.currentFolderId)].sort((a, b) => {
      if (a.itemType === b.itemType) {
        return a.title.localeCompare(b.title);
      }
      if (a.itemType === "folder") {
        return -1;
      }
      if (b.itemType === "folder") {
        return 1;
      }
      return a.title.localeCompare(b.title);
    })
  ), [explorerState.currentFolderId, getItemsInFolder]);

  const normalizedSearch = explorerState.searchQuery.trim().toLowerCase();
  const visibleItems = useMemo(() => {
    if (!normalizedSearch) {
      return currentItems;
    }

    return currentItems.filter((item) => item.title.toLowerCase().includes(normalizedSearch));
  }, [currentItems, normalizedSearch]);

  const selectedItem = explorerState.selectedItemId ? getItemById(explorerState.selectedItemId) : null;
  const currentFolderLabel = currentFolder?.title || "Desktop";

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTipIndex((prev) => (prev + 1) % EXPLORER_TIPS.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!explorerState.selectedItemId) {
      return;
    }

    const stillVisible = visibleItems.some((item) => item.id === explorerState.selectedItemId);
    if (!stillVisible) {
      setExplorerSelectedItemId(null);
    }
  }, [explorerState.selectedItemId, setExplorerSelectedItemId, visibleItems]);

  useEffect(() => {
    if (activeWindowId !== "explorer") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;

      if (isTyping) {
        return;
      }

      if (visibleItems.length === 0) {
        return;
      }

      const currentIndex = Math.max(0, visibleItems.findIndex((item) => item.id === explorerState.selectedItemId));

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = Math.min(visibleItems.length - 1, explorerState.selectedItemId ? currentIndex + 1 : 0);
        setExplorerSelectedItemId(visibleItems[nextIndex].id);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex = explorerState.selectedItemId ? Math.max(0, currentIndex - 1) : 0;
        setExplorerSelectedItemId(visibleItems[nextIndex].id);
        return;
      }

      if (event.key === "Enter" && selectedItem) {
        event.preventDefault();
        openItem(selectedItem);
        return;
      }

      if (event.key === "Delete" && selectedItem) {
        event.preventDefault();
        moveItemToRecycleBin(selectedItem.id);
        setExplorerSelectedItemId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeWindowId,
    explorerState.selectedItemId,
    moveItemToRecycleBin,
    openItem,
    selectedItem,
    setExplorerSelectedItemId,
    visibleItems,
  ]);

  const toggleTreeNode = (id) => {
    setCollapsedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreateFolder = () => {
    const createdId = createFolder({ parentId: explorerState.currentFolderId });
    if (createdId) {
      setExplorerSelectedItemId(createdId);
    }
  };

  const handleCreateTextDocument = () => {
    const createdId = createTextDocument({ parentId: explorerState.currentFolderId });
    if (createdId) {
      setExplorerSelectedItemId(createdId);
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedItem) {
      return;
    }

    moveItemToRecycleBin(selectedItem.id);
    setExplorerSelectedItemId(null);
  };

  const handleSplitterPointerDown = (event) => {
    event.preventDefault();
    const bounds = splitPaneRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    const handlePointerMove = (pointerEvent) => {
      setExplorerSidebarWidth(pointerEvent.clientX - bounds.left);
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      style={{
        margin: "-4px -6px",
        minHeight: "calc(100% + 8px)",
        display: "flex",
        flexDirection: "column",
        background: WIN95_COLORS.surface,
        color: WIN95_COLORS.text,
        fontFamily: "inherit",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "1px 4px 0",
          minHeight: 22,
          background: WIN95_COLORS.surface,
          borderBottom: "1px solid #9a9a9a",
          flexShrink: 0,
        }}
      >
        {["File", "Edit", "View", "Tools", "Help"].map((label) => (
          <ExplorerMenuButton key={label} label={label} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px",
          background: WIN95_COLORS.surface,
          borderTop: "1px solid #ffffff",
          borderBottom: "1px solid #808080",
          flexShrink: 0,
        }}
      >
        <ToolbarButton title="Back" disabled={explorerState.navStack.length === 0} onClick={explorerGoBack}>
          <ToolbarGlyph kind="back" viewMode={explorerState.viewMode} />
        </ToolbarButton>
        <ToolbarButton title="Forward" disabled={explorerState.forwardStack.length === 0} onClick={explorerGoForward}>
          <ToolbarGlyph kind="forward" viewMode={explorerState.viewMode} />
        </ToolbarButton>
        <ToolbarButton title="Up" disabled={explorerState.currentFolderId === null} onClick={explorerGoUp}>
          <ToolbarGlyph kind="up" viewMode={explorerState.viewMode} />
        </ToolbarButton>
        <div style={{ width: 2, alignSelf: "stretch", ...ETCHED_SEPARATOR_STYLE }} />
        <ToolbarButton title="New Folder" onClick={handleCreateFolder}>
          <ToolbarGlyph kind="new-folder" viewMode={explorerState.viewMode} />
        </ToolbarButton>
        <ToolbarButton title="New Document" onClick={handleCreateTextDocument}>
          <ToolbarGlyph kind="new-doc" viewMode={explorerState.viewMode} />
        </ToolbarButton>
        <ToolbarButton title="Delete" disabled={!selectedItem} onClick={handleDeleteSelected}>
          <ToolbarGlyph kind="delete" viewMode={explorerState.viewMode} />
        </ToolbarButton>
        <div style={{ width: 2, alignSelf: "stretch", ...ETCHED_SEPARATOR_STYLE }} />
        <ToolbarButton
          title={explorerState.viewMode === "list" ? "Switch to Grid View" : "Switch to List View"}
          active={explorerState.viewMode === "grid"}
          onClick={() => setExplorerViewMode(explorerState.viewMode === "list" ? "grid" : "list")}
        >
          <ToolbarGlyph kind="views" viewMode={explorerState.viewMode} />
        </ToolbarButton>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px",
          background: WIN95_COLORS.surface,
          borderTop: "1px solid #ffffff",
          borderBottom: "1px solid #808080",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 11, minWidth: 42 }}>Address</span>
        <div
          style={{
            ...getWin95FieldStyle({ padding: "0 4px", minHeight: 22 }),
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {pathSegments.map((segment, index) => (
            <div key={`${segment.id ?? "desktop"}-${index}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {index > 0 && <span style={{ margin: "0 2px", color: "#404040" }}>{">"}</span>}
              <button
                type="button"
                onClick={() => explorerNavigateTo(segment.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: index === pathSegments.length - 1 ? WIN95_COLORS.text : "#000080",
                  fontFamily: "inherit",
                  fontSize: 11,
                  padding: "0 1px",
                  cursor: "default",
                }}
              >
                {segment.title}
              </button>
            </div>
          ))}
        </div>
        <span style={{ fontSize: 11, minWidth: 28 }}>Find</span>
        <input
          value={explorerState.searchQuery}
          onChange={(event) => setExplorerSearchQuery(event.target.value)}
          placeholder="Name filter"
          style={{
            ...getWin95FieldStyle({ padding: "1px 5px", minHeight: 22 }),
            width: 150,
            fontSize: 11,
            outline: "none",
          }}
        />
      </div>

      <div
        ref={splitPaneRef}
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          background: WIN95_COLORS.surface,
          padding: "4px",
          gap: 0,
        }}
      >
        <div
          style={{
            width: explorerState.sidebarWidth,
            minWidth: 120,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              ...getWin95ButtonStyle({ padding: "2px 6px" }),
              borderBottom: "none",
              fontWeight: 700,
              fontSize: 11,
              minHeight: 22,
              display: "flex",
              alignItems: "center",
            }}
          >
            All Folders
          </div>
          <div
            style={{
              ...INSET_BORDER,
              flex: 1,
              minHeight: 0,
              background: "#ffffff",
              overflow: "auto",
              padding: "3px 2px 6px",
            }}
          >
            <TreeRow
              depth={0}
              label="Desktop"
              selected={explorerState.currentFolderId === null}
              icon={<DesktopTreeGlyph />}
              hasChildren={(folderChildrenByParent.get(null) || []).length > 0}
              isCollapsed={false}
              onClick={() => explorerNavigateTo(null)}
            />
            {(folderChildrenByParent.get(null) || []).map((folder) => (
              <FolderTreeNode
                key={folder.id}
                folder={folder}
                depth={1}
                currentFolderId={explorerState.currentFolderId}
                childrenByParent={folderChildrenByParent}
                collapsedNodeIds={collapsedNodeIds}
                toggleNode={toggleTreeNode}
                onSelect={explorerNavigateTo}
              />
            ))}
          </div>
        </div>

        <div
          onPointerDown={handleSplitterPointerDown}
          style={{
            width: 7,
            flexShrink: 0,
            cursor: "ew-resize",
            background: WIN95_COLORS.surface,
            borderLeft: "1px solid #ffffff",
            borderRight: "1px solid #808080",
            margin: "0 3px",
          }}
        />

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              ...getWin95ButtonStyle({ padding: "2px 6px" }),
              borderBottom: "none",
              fontWeight: 700,
              fontSize: 11,
              minHeight: 22,
              display: "flex",
              alignItems: "center",
            }}
          >
            {`Contents of "${currentFolderLabel}"`}
          </div>
          <div
            style={{
              ...INSET_BORDER,
              background: "#ffffff",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {explorerState.viewMode === "list" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(220px, 1fr) 120px 86px 90px",
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
                <span>Type</span>
                <span>Size</span>
                <span>Created</span>
              </div>
            )}

            <div
              onClick={() => setExplorerSelectedItemId(null)}
              style={{
                flex: 1,
                minHeight: 0,
                overflow: "auto",
                background: "#ffffff",
                padding: explorerState.viewMode === "grid" ? "10px" : 0,
              }}
            >
              {visibleItems.length === 0 ? (
                <div
                  style={{
                    padding: "18px 16px",
                    color: WIN95_COLORS.textMuted,
                    fontSize: 12,
                  }}
                >
                  {normalizedSearch ? `No items match "${explorerState.searchQuery}".` : "This folder is empty."}
                </div>
              ) : explorerState.viewMode === "grid" ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
                    gap: 10,
                    alignContent: "start",
                  }}
                >
                  {visibleItems.map((item) => {
                    const selected = explorerState.selectedItemId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setExplorerSelectedItemId(item.id);
                        }}
                        onDoubleClick={(event) => {
                          event.stopPropagation();
                          openItem(item);
                        }}
                        style={{
                          border: "none",
                          background: selected ? WIN95_COLORS.selection : "transparent",
                          color: selected ? "#ffffff" : WIN95_COLORS.text,
                          padding: "6px 4px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                          minHeight: 86,
                          fontFamily: "inherit",
                          fontSize: 11,
                          textAlign: "center",
                          cursor: "default",
                        }}
                      >
                        <ExplorerItemGlyph item={item} size={32} />
                        <span style={{ lineHeight: 1.2, wordBreak: "break-word" }}>{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                visibleItems.map((item) => {
                  const selected = explorerState.selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        setExplorerSelectedItemId(item.id);
                      }}
                      onDoubleClick={(event) => {
                        event.stopPropagation();
                        openItem(item);
                      }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(220px, 1fr) 120px 86px 90px",
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          minWidth: 0,
                        }}
                      >
                        <ExplorerItemGlyph item={item} size={16} />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                      </div>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.typeLabel}</span>
                      <span>{item.sizeLabel}</span>
                      <span>{formatExplorerDate(item.createdAt)}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...STATUS_BAR_STYLE, borderTop: "1px solid #ffffff", flexShrink: 0 }}>
        <div style={{ ...STATUS_BAR_FIELD_STYLE, minWidth: 100 }}>
          {visibleItems.length} item{visibleItems.length === 1 ? "" : "s"}
        </div>
        <div style={{ ...STATUS_BAR_FIELD_STYLE, flex: 1, minWidth: 0 }}>
          {selectedItem ? `${selectedItem.title} - ${selectedItem.typeLabel}` : `Viewing ${currentFolderLabel}`}
        </div>
        <div style={{ ...STATUS_BAR_FIELD_STYLE, flex: 1.2, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {EXPLORER_TIPS[tipIndex]}
        </div>
      </div>
    </div>
  );
}
