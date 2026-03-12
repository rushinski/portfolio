"use client";

import { cloneElement, useEffect, useMemo, useRef, useState } from "react";

import { useDialogs } from "../hooks/useDialogs";
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
  getWin95TitleBarStyle,
  getWin95WindowStyle,
} from "../ui/retro";

const EXPLORER_TIPS = [
  "Tip: Right-click anywhere for Explorer actions.",
  "Tip: My Computer contains writable drives and system shortcuts.",
  "Tip: F2 renames the selected item when the location allows it.",
  "Tip: Ctrl+C, Ctrl+X, and Ctrl+V work inside Explorer.",
];

const TREE_ROW_HEIGHT = 18;
const TREE_INDENT = 16;

function getExplorerSortWeight(item) {
  if (typeof item?.sortOrder === "number") return item.sortOrder;
  if (item?.itemType === "computer") return 0;
  if (item?.itemType === "drive") return 10;
  if (item?.itemType === "folder") return 20;
  if (item?.itemType === "pdf") return 40;
  if (item?.itemType === "text") return 50;
  if (item?.itemType === "app") return 60;
  return 99;
}

function compareExplorerItems(a, b) {
  const weightDelta = getExplorerSortWeight(a) - getExplorerSortWeight(b);
  if (weightDelta !== 0) return weightDelta;
  return a.title.localeCompare(b.title);
}

function formatExplorerDate(timestamp) {
  if (!timestamp) return "--/--/--";
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date(timestamp));
}

function formatExplorerDateTime(timestamp) {
  if (!timestamp) return "System item";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function ExplorerItemGlyph({ item, size = 16 }) {
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

function ToolbarButton({ title, disabled = false, active = false, onClick, children }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      title={title}
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
  );
}

function ExplorerMenuButton({ label }) {
  return (
    <button
      type="button"
      style={{ border: "none", background: "transparent", color: WIN95_COLORS.text, fontSize: 12, fontFamily: "inherit", padding: "2px 7px", cursor: "default" }}
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
  onContextMenu,
}) {
  const rowColor = selected ? "#ffffff" : WIN95_COLORS.text;
  const connectorLeft = 10 + depth * TREE_INDENT;

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
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
          <div style={{ position: "absolute", left: connectorLeft + 5, top: 0, bottom: 0, borderLeft: "1px dotted #8a8a8a" }} />
          <div style={{ position: "absolute", left: connectorLeft + 5, top: 8, width: 8, borderTop: "1px dotted #8a8a8a" }} />
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
  onContextMenu,
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
        onContextMenu={(event) => onContextMenu(event, folder)}
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
          onContextMenu={onContextMenu}
        />
      ))}
    </>
  );
}

function ExplorerPropertiesDialog({ item, properties, onClose }) {
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

function ExplorerContextMenu({ menu, onAction, canPasteHere, currentViewMode }) {
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

export default function FileExplorerApp() {
  const {
    allFileSystemItems,
    clipboardState,
    createFolder,
    createTextDocument,
    getFolderPathSegments,
    getItemById,
    getItemProperties,
    getItemsInFolder,
    isContainerItem,
    canCreateInFolder,
    canDeleteItem,
    canRenameItem,
    moveItemToRecycleBin,
    openItem,
    pasteItem,
    commitRenameItem,
    setClipboardState,
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
  const { showAlertDialog } = useDialogs();

  const splitPaneRef = useRef(null);
  const renameInputRef = useRef(null);
  const [collapsedNodeIds, setCollapsedNodeIds] = useState(new Set());
  const [tipIndex, setTipIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState(null);
  const [renamingItemId, setRenamingItemId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [propertiesItemId, setPropertiesItemId] = useState(null);

  const currentFolder = explorerState.currentFolderId ? getItemById(explorerState.currentFolderId) : null;
  const pathSegments = getFolderPathSegments(explorerState.currentFolderId);

  const treeChildrenByParent = useMemo(() => {
    const next = new Map();

    allFileSystemItems
      .filter((item) => isContainerItem(item))
      .sort(compareExplorerItems)
      .forEach((item) => {
        const parentId = item.parentId ?? null;
        const siblings = next.get(parentId) || [];
        siblings.push(item);
        next.set(parentId, siblings);
      });

    return next;
  }, [allFileSystemItems, isContainerItem]);

  const currentItems = useMemo(
    () => [...getItemsInFolder(explorerState.currentFolderId)].sort(compareExplorerItems),
    [explorerState.currentFolderId, getItemsInFolder],
  );

  const normalizedSearch = explorerState.searchQuery.trim().toLowerCase();
  const visibleItems = useMemo(() => {
    if (!normalizedSearch) {
      return currentItems;
    }

    return currentItems.filter((item) => item.title.toLowerCase().includes(normalizedSearch));
  }, [currentItems, normalizedSearch]);

  const selectedItem = explorerState.selectedItemId ? getItemById(explorerState.selectedItemId) : null;
  const selectedItemProperties = propertiesItemId ? getItemProperties(propertiesItemId) : null;
  const propertiesItem = propertiesItemId ? getItemById(propertiesItemId) : null;
  const currentFolderLabel = currentFolder?.title || "Desktop";
  const currentFolderCanCreate = canCreateInFolder(explorerState.currentFolderId);
  const canModifySelected = !!selectedItem && canDeleteItem(selectedItem);
  const canRenameSelected = !!selectedItem && canRenameItem(selectedItem);
  const canPasteHere = !!clipboardState && currentFolderCanCreate;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTipIndex((prev) => (prev + 1) % EXPLORER_TIPS.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (renamingItemId) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [renamingItemId]);

  useEffect(() => {
    setContextMenu(null);
  }, [explorerState.currentFolderId, explorerState.searchQuery, explorerState.viewMode]);

  useEffect(() => {
    if (!explorerState.selectedItemId) return;

    const stillVisible = visibleItems.some((item) => item.id === explorerState.selectedItemId);
    if (!stillVisible) {
      setExplorerSelectedItemId(null);
      setRenamingItemId(null);
    }
  }, [explorerState.selectedItemId, setExplorerSelectedItemId, visibleItems]);

  useEffect(() => {
    if (!propertiesItemId) return;
    if (!getItemById(propertiesItemId)) {
      setPropertiesItemId(null);
    }
  }, [getItemById, propertiesItemId]);

  useEffect(() => {
    const handleWindowClick = () => setContextMenu(null);
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  const startRename = (item) => {
    if (!item || !canRenameItem(item)) return;
    setExplorerSelectedItemId(item.id);
    setRenamingItemId(item.id);
    setRenameValue(item.title);
    setContextMenu(null);
  };

  const commitRename = () => {
    if (!renamingItemId) return;
    commitRenameItem(renamingItemId, renameValue);
    setRenamingItemId(null);
  };

  const cancelRename = () => {
    setRenamingItemId(null);
    setRenameValue("");
  };

  const handleCreateFolder = () => {
    const createdId = createFolder({ parentId: explorerState.currentFolderId });
    const item = createdId ? getItemById(createdId) : null;
    if (createdId) {
      setExplorerSelectedItemId(createdId);
      if (item) startRename(item);
    }
  };

  const handleCreateTextDocument = () => {
    const createdId = createTextDocument({ parentId: explorerState.currentFolderId });
    const item = createdId ? getItemById(createdId) : null;
    if (createdId) {
      setExplorerSelectedItemId(createdId);
      if (item) startRename(item);
    }
  };

  const handlePasteIntoCurrentFolder = () => {
    const pastedId = pasteItem({ targetParentId: explorerState.currentFolderId });
    if (pastedId) {
      setExplorerSelectedItemId(pastedId);
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedItem || !canDeleteItem(selectedItem)) return;
    moveItemToRecycleBin(selectedItem.id);
    setExplorerSelectedItemId(null);
    setPropertiesItemId((prev) => (prev === selectedItem.id ? null : prev));
  };

  const openContextMenu = (event, scope, item = null) => {
    event.preventDefault();
    event.stopPropagation();

    if (item) {
      setExplorerSelectedItemId(item.id);
    }

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      scope,
      itemId: item?.id || null,
      canCreate: currentFolderCanCreate,
      canModify: !!item && canDeleteItem(item),
      canRename: !!item && canRenameItem(item),
      canDelete: !!item && canDeleteItem(item),
    });
  };

  const handleContextAction = (action) => {
    const targetItem = contextMenu?.itemId ? getItemById(contextMenu.itemId) : selectedItem;

    if (action === "open" && targetItem) openItem(targetItem);
    if (action === "rename" && targetItem) startRename(targetItem);
    if (action === "cut" && targetItem && canDeleteItem(targetItem)) setClipboardState({ mode: "cut", id: targetItem.id });
    if (action === "copy" && targetItem && canDeleteItem(targetItem)) setClipboardState({ mode: "copy", id: targetItem.id });
    if (action === "paste") handlePasteIntoCurrentFolder();
    if (action === "delete" && targetItem && canDeleteItem(targetItem)) {
      moveItemToRecycleBin(targetItem.id);
      setExplorerSelectedItemId(null);
      setPropertiesItemId((prev) => (prev === targetItem.id ? null : prev));
    }
    if (action === "properties" && targetItem) setPropertiesItemId(targetItem.id);
    if (action === "new-folder") handleCreateFolder();
    if (action === "new-document") handleCreateTextDocument();
    if (action === "view-list") setExplorerViewMode("list");
    if (action === "view-grid") setExplorerViewMode("grid");
    if (action === "refresh") {
      showAlertDialog("Folder contents refreshed.", { title: "File Explorer", variant: "info" });
    }

    setContextMenu(null);
  };

  useEffect(() => {
    if (activeWindowId !== "explorer") return undefined;

    const handleKeyDown = (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (isTyping) return;

      const selectedIndex = visibleItems.findIndex((item) => item.id === explorerState.selectedItemId);

      if ((event.ctrlKey || event.metaKey) && (event.key === "c" || event.key === "C") && canModifySelected) {
        event.preventDefault();
        setClipboardState({ mode: "copy", id: selectedItem.id });
        return;
      }

      if ((event.ctrlKey || event.metaKey) && (event.key === "x" || event.key === "X") && canModifySelected) {
        event.preventDefault();
        setClipboardState({ mode: "cut", id: selectedItem.id });
        return;
      }

      if ((event.ctrlKey || event.metaKey) && (event.key === "v" || event.key === "V") && canPasteHere) {
        event.preventDefault();
        handlePasteIntoCurrentFolder();
        return;
      }

      if (event.key === "F2" && selectedItem && canRenameSelected) {
        event.preventDefault();
        startRename(selectedItem);
        return;
      }

      if (event.key === "Escape") {
        setContextMenu(null);
        setPropertiesItemId(null);
        cancelRename();
        return;
      }

      if (visibleItems.length === 0) return;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = Math.min(visibleItems.length - 1, selectedIndex >= 0 ? selectedIndex + 1 : 0);
        setExplorerSelectedItemId(visibleItems[nextIndex].id);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex = selectedIndex >= 0 ? Math.max(0, selectedIndex - 1) : 0;
        setExplorerSelectedItemId(visibleItems[nextIndex].id);
        return;
      }

      if (event.key === "Enter" && selectedItem) {
        event.preventDefault();
        openItem(selectedItem);
        return;
      }

      if (event.key === "Delete" && selectedItem && canDeleteItem(selectedItem)) {
        event.preventDefault();
        handleDeleteSelected();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeWindowId,
    canDeleteItem,
    canModifySelected,
    canPasteHere,
    canRenameSelected,
    explorerState.selectedItemId,
    openItem,
    selectedItem,
    setClipboardState,
    setExplorerSelectedItemId,
    showAlertDialog,
    visibleItems,
  ]);

  const toggleTreeNode = (id) => {
    setCollapsedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSplitterPointerDown = (event) => {
    event.preventDefault();
    const bounds = splitPaneRef.current?.getBoundingClientRect();
    if (!bounds) return;

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
    <>
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
        onClick={() => setContextMenu(null)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "1px 4px 0", minHeight: 22, background: WIN95_COLORS.surface, borderBottom: "1px solid #9a9a9a", flexShrink: 0 }}>
          {["File", "Edit", "View", "Tools", "Help"].map((label) => (
            <ExplorerMenuButton key={label} label={label} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px", background: WIN95_COLORS.surface, borderTop: "1px solid #ffffff", borderBottom: "1px solid #808080", flexShrink: 0 }}>
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
          <ToolbarButton title="New Folder" disabled={!currentFolderCanCreate} onClick={handleCreateFolder}>
            <ToolbarGlyph kind="new-folder" viewMode={explorerState.viewMode} />
          </ToolbarButton>
          <ToolbarButton title="New Document" disabled={!currentFolderCanCreate} onClick={handleCreateTextDocument}>
            <ToolbarGlyph kind="new-doc" viewMode={explorerState.viewMode} />
          </ToolbarButton>
          <ToolbarButton title="Paste" disabled={!canPasteHere} onClick={handlePasteIntoCurrentFolder}>
            <ToolbarGlyph kind="paste" viewMode={explorerState.viewMode} />
          </ToolbarButton>
          <ToolbarButton title="Delete" disabled={!canModifySelected} onClick={handleDeleteSelected}>
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

        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px", background: WIN95_COLORS.surface, borderTop: "1px solid #ffffff", borderBottom: "1px solid #808080", flexShrink: 0 }}>
          <span style={{ fontSize: 11, minWidth: 42 }}>Address</span>
          <div style={{ ...getWin95FieldStyle({ padding: "0 4px", minHeight: 22 }), flex: 1, display: "flex", alignItems: "center", gap: 2, overflow: "hidden", whiteSpace: "nowrap" }}>
            {pathSegments.map((segment, index) => (
              <div key={`${segment.id ?? "desktop"}-${index}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {index > 0 && <span style={{ margin: "0 2px", color: "#404040" }}>{">"}</span>}
                <button
                  type="button"
                  onClick={() => explorerNavigateTo(segment.id)}
                  style={{ border: "none", background: "transparent", color: index === pathSegments.length - 1 ? WIN95_COLORS.text : "#000080", fontFamily: "inherit", fontSize: 11, padding: "0 1px", cursor: "default" }}
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
            style={{ ...getWin95FieldStyle({ padding: "1px 5px", minHeight: 22 }), width: 150, fontSize: 11, outline: "none" }}
          />
        </div>

        <div ref={splitPaneRef} style={{ display: "flex", flex: 1, minHeight: 0, background: WIN95_COLORS.surface, padding: "4px", gap: 0 }}>
          <div style={{ width: explorerState.sidebarWidth, minWidth: 120, display: "flex", flexDirection: "column", minHeight: 0, flexShrink: 0 }}>
            <div style={{ ...getWin95ButtonStyle({ padding: "2px 6px" }), borderBottom: "none", fontWeight: 700, fontSize: 11, minHeight: 22, display: "flex", alignItems: "center" }}>
              All Folders
            </div>
            <div style={{ ...INSET_BORDER, flex: 1, minHeight: 0, background: "#ffffff", overflow: "auto", padding: "3px 2px 6px" }}>
              <TreeRow
                depth={0}
                label="Desktop"
                selected={explorerState.currentFolderId === null}
                icon={<DesktopTreeGlyph />}
                hasChildren={(treeChildrenByParent.get(null) || []).length > 0}
                isCollapsed={false}
                onClick={() => explorerNavigateTo(null)}
                onContextMenu={(event) => openContextMenu(event, "background")}
              />
              {(treeChildrenByParent.get(null) || []).map((folder) => (
                <FolderTreeNode
                  key={folder.id}
                  folder={folder}
                  depth={1}
                  currentFolderId={explorerState.currentFolderId}
                  childrenByParent={treeChildrenByParent}
                  collapsedNodeIds={collapsedNodeIds}
                  toggleNode={toggleTreeNode}
                  onSelect={explorerNavigateTo}
                  onContextMenu={(event, item) => openContextMenu(event, "item", item)}
                />
              ))}
            </div>
          </div>

          <div onPointerDown={handleSplitterPointerDown} style={{ width: 7, flexShrink: 0, cursor: "ew-resize", background: WIN95_COLORS.surface, borderLeft: "1px solid #ffffff", borderRight: "1px solid #808080", margin: "0 3px" }} />

          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ ...getWin95ButtonStyle({ padding: "2px 6px" }), borderBottom: "none", fontWeight: 700, fontSize: 11, minHeight: 22, display: "flex", alignItems: "center" }}>
              {`Contents of "${currentFolderLabel}"`}
            </div>
            <div style={{ ...INSET_BORDER, background: "#ffffff", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              {explorerState.viewMode === "list" && (
                <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 120px 86px 90px", alignItems: "center", minHeight: 22, background: WIN95_COLORS.surface, borderBottom: "1px solid #808080", fontSize: 11, fontWeight: 700, padding: "0 8px", flexShrink: 0 }}>
                  <span>Name</span>
                  <span>Type</span>
                  <span>Size</span>
                  <span>Created</span>
                </div>
              )}

              <div
                onClick={() => {
                  setExplorerSelectedItemId(null);
                  setContextMenu(null);
                }}
                onContextMenu={(event) => openContextMenu(event, "background")}
                style={{ flex: 1, minHeight: 0, overflow: "auto", background: "#ffffff", padding: explorerState.viewMode === "grid" ? "10px" : 0 }}
              >
                {visibleItems.length === 0 ? (
                  <div style={{ padding: "18px 16px", color: WIN95_COLORS.textMuted, fontSize: 12 }}>
                    {normalizedSearch ? `No items match "${explorerState.searchQuery}".` : "This folder is empty."}
                  </div>
                ) : explorerState.viewMode === "grid" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))", gap: 10, alignContent: "start" }}>
                    {visibleItems.map((item) => {
                      const selected = explorerState.selectedItemId === item.id;
                      const renaming = renamingItemId === item.id;

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
                            if (!renaming) openItem(item);
                          }}
                          onContextMenu={(event) => openContextMenu(event, "item", item)}
                          style={{ border: "none", background: selected ? WIN95_COLORS.selection : "transparent", color: selected ? "#ffffff" : WIN95_COLORS.text, padding: "6px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minHeight: 86, fontFamily: "inherit", fontSize: 11, textAlign: "center", cursor: "default" }}
                        >
                          <ExplorerItemGlyph item={item} size={32} />
                          {renaming ? (
                            <input
                              ref={renameInputRef}
                              value={renameValue}
                              onChange={(event) => setRenameValue(event.target.value)}
                              onBlur={commitRename}
                              onClick={(event) => event.stopPropagation()}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  commitRename();
                                }
                                if (event.key === "Escape") {
                                  event.preventDefault();
                                  cancelRename();
                                }
                              }}
                              style={{ ...getWin95FieldStyle({ padding: "1px 4px", minHeight: 20 }), width: "100%", fontSize: 11, textAlign: "center", outline: "none" }}
                            />
                          ) : (
                            <span style={{ lineHeight: 1.2, wordBreak: "break-word" }}>{item.title}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  visibleItems.map((item) => {
                    const selected = explorerState.selectedItemId === item.id;
                    const renaming = renamingItemId === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          setExplorerSelectedItemId(item.id);
                        }}
                        onDoubleClick={(event) => {
                          event.stopPropagation();
                          if (!renaming) openItem(item);
                        }}
                        onContextMenu={(event) => openContextMenu(event, "item", item)}
                        style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 120px 86px 90px", alignItems: "center", minHeight: 20, padding: "0 8px", background: selected ? WIN95_COLORS.selection : "transparent", color: selected ? "#ffffff" : WIN95_COLORS.text, fontSize: 11, cursor: "default", userSelect: "none" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                          <ExplorerItemGlyph item={item} size={16} />
                          {renaming ? (
                            <input
                              ref={renameInputRef}
                              value={renameValue}
                              onChange={(event) => setRenameValue(event.target.value)}
                              onBlur={commitRename}
                              onClick={(event) => event.stopPropagation()}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  commitRename();
                                }
                                if (event.key === "Escape") {
                                  event.preventDefault();
                                  cancelRename();
                                }
                              }}
                              style={{ ...getWin95FieldStyle({ padding: "1px 4px", minHeight: 18 }), width: "100%", fontSize: 11, outline: "none" }}
                            />
                          ) : (
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                          )}
                        </div>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.typeLabel}</span>
                        <span>{item.sizeLabel || ""}</span>
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
          <div style={{ ...STATUS_BAR_FIELD_STYLE, flex: 1.25, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {EXPLORER_TIPS[tipIndex]}
          </div>
        </div>
      </div>

      <ExplorerContextMenu menu={contextMenu} onAction={handleContextAction} canPasteHere={canPasteHere} currentViewMode={explorerState.viewMode} />
      <ExplorerPropertiesDialog item={propertiesItem} properties={selectedItemProperties} onClose={() => setPropertiesItemId(null)} />
    </>
  );
}
