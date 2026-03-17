"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useDialogs } from "../../hooks/useDialogs";
import { useFileSystem } from "../../hooks/useFileSystem";
import { useWindowManager } from "../../hooks/useWindowManager";
import { DRAG_ITEM_MIME } from "../../constants";
import { GLOBAL_CONTEXT_MENU_EVENT, announceContextMenuOpen } from "../../ui/contextMenu";
import {
  ETCHED_SEPARATOR_STYLE,
  INSET_BORDER,
  STATUS_BAR_FIELD_STYLE,
  STATUS_BAR_STYLE,
  WIN95_COLORS,
  getWin95ButtonStyle,
  getWin95FieldStyle,
} from "../../ui/retro";
import { EXPLORER_TIPS, compareExplorerItems, formatExplorerDate } from "./utils";
import { ExplorerItemGlyph, DesktopTreeGlyph } from "./Glyphs";
import { ToolbarGlyph, ToolbarButton } from "./Toolbar";
import { TreeRow, FolderTreeNode } from "./TreeView";
import { ExplorerContextMenu, ExplorerPropertiesDialog } from "./Dialogs";

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
    moveItemToParent,
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
  const [dropTargetId, setDropTargetId] = useState(null);
  const [contentDropActive, setContentDropActive] = useState(false);

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

  useEffect(() => {
    const handleForeignContextMenu = (event) => {
      if (event.detail?.source === "explorer") {
        return;
      }

      setContextMenu(null);
    };

    window.addEventListener(GLOBAL_CONTEXT_MENU_EVENT, handleForeignContextMenu);
    return () => window.removeEventListener(GLOBAL_CONTEXT_MENU_EVENT, handleForeignContextMenu);
  }, []);

  const startRename = (item) => {
    if (!item || !canRenameItem(item)) return;
    setExplorerSelectedItemId(item.id);
    setRenamingItemId(item.id);
    setRenameValue(item.title);
    setContextMenu(null);
  };

  const startRenameById = (id, title) => {
    if (!id) return;
    setExplorerSelectedItemId(id);
    setRenamingItemId(id);
    setRenameValue(title);
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
    if (createdId) {
      startRenameById(createdId, "New Folder");
    }
  };

  const handleCreateTextDocument = () => {
    const createdId = createTextDocument({ parentId: explorerState.currentFolderId });
    if (createdId) {
      startRenameById(createdId, "New Text Document.txt");
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
    announceContextMenuOpen("explorer");

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

  const getDraggedItemId = (event) => (
    event.dataTransfer?.getData(DRAG_ITEM_MIME) || event.dataTransfer?.getData("text/plain") || ""
  );

  const handleExplorerDragStart = (event, item) => {
    if (!canDeleteItem(item)) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(DRAG_ITEM_MIME, item.id);
    event.dataTransfer.setData("text/plain", item.id);
    setExplorerSelectedItemId(item.id);
  };

  const clearDropState = () => {
    setDropTargetId(null);
    setContentDropActive(false);
  };

  const handleDropToFolder = (event, targetParentId) => {
    event.preventDefault();
    event.stopPropagation();

    const draggedId = getDraggedItemId(event);
    clearDropState();

    if (!draggedId || draggedId === targetParentId) {
      return;
    }

    if (!canCreateInFolder(targetParentId)) {
      return;
    }

    const moved = moveItemToParent(draggedId, targetParentId, {
      clientX: event.clientX,
      clientY: event.clientY,
    });

    if (moved) {
      setExplorerSelectedItemId(draggedId);
    }
  };

  const handleDragOverFolder = (event, targetParentId) => {
    const draggedId = getDraggedItemId(event);
    if (!draggedId || draggedId === targetParentId || !canCreateInFolder(targetParentId)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setDropTargetId(targetParentId ?? "__desktop__");
    setContentDropActive(false);
  };

  const handleContentDragOver = (event) => {
    const draggedId = getDraggedItemId(event);
    if (!draggedId || !canCreateInFolder(explorerState.currentFolderId)) {
      return;
    }

    event.preventDefault();
    setContentDropActive(true);
    setDropTargetId(null);
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: WIN95_COLORS.surface,
          color: WIN95_COLORS.text,
          fontFamily: "inherit",
          overflow: "hidden",
        }}
        onClick={() => setContextMenu(null)}
      >
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

        <div ref={splitPaneRef} style={{ display: "flex", flex: 1, minHeight: 0, background: WIN95_COLORS.surface, padding: "6px", gap: 0 }}>
          <div style={{ width: explorerState.sidebarWidth, minWidth: 120, display: "flex", flexDirection: "column", minHeight: 0, flexShrink: 0 }}>
            <div style={{ ...getWin95ButtonStyle({ padding: "2px 6px" }), borderBottom: "none", fontWeight: 700, fontSize: 11, minHeight: 22, display: "flex", alignItems: "center" }}>
              All Folders
            </div>
            <div style={{ ...INSET_BORDER, flex: 1, minHeight: 0, background: "#ffffff", overflow: "auto", padding: "3px 2px 6px" }}>
              <TreeRow
                depth={0}
                label="Desktop"
                selected={explorerState.currentFolderId === null}
                dropActive={dropTargetId === "__desktop__"}
                icon={<DesktopTreeGlyph />}
                hasChildren={(treeChildrenByParent.get(null) || []).length > 0}
                isCollapsed={false}
                onClick={() => explorerNavigateTo(null)}
                onContextMenu={(event) => openContextMenu(event, "background")}
                onDragOver={(event) => handleDragOverFolder(event, null)}
                onDragLeave={clearDropState}
                onDrop={(event) => handleDropToFolder(event, null)}
              />
              {(treeChildrenByParent.get(null) || []).map((folder) => (
                <FolderTreeNode
                  key={folder.id}
                  folder={folder}
                  depth={1}
                  currentFolderId={explorerState.currentFolderId}
                  dropTargetId={dropTargetId}
                  childrenByParent={treeChildrenByParent}
                  collapsedNodeIds={collapsedNodeIds}
                  toggleNode={toggleTreeNode}
                  onSelect={explorerNavigateTo}
                  onContextMenu={(event, item) => openContextMenu(event, "item", item)}
                  onDragOverFolder={handleDragOverFolder}
                  onDropToFolder={handleDropToFolder}
                  onClearDropState={clearDropState}
                />
              ))}
            </div>
          </div>

          <div onPointerDown={handleSplitterPointerDown} style={{ width: 7, flexShrink: 0, cursor: "ew-resize", background: WIN95_COLORS.surface, borderLeft: "1px solid #ffffff", borderRight: "1px solid #808080", margin: "0 3px" }} />

          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ ...getWin95ButtonStyle({ padding: "2px 6px" }), borderBottom: "none", fontWeight: 700, fontSize: 11, minHeight: 22, display: "flex", alignItems: "center" }}>
              File Explorer
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
                onDragOver={handleContentDragOver}
                onDragLeave={clearDropState}
                onDrop={(event) => handleDropToFolder(event, explorerState.currentFolderId)}
                style={{ flex: 1, minHeight: 0, overflow: "auto", background: contentDropActive ? "#eef4ff" : "#ffffff", padding: explorerState.viewMode === "grid" ? "10px" : 0 }}
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
                      const canDragItem = canDeleteItem(item);
                      const isFolderDropTarget = isContainerItem(item) && canCreateInFolder(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          draggable={canDragItem}
                          onClick={(event) => {
                            event.stopPropagation();
                            setExplorerSelectedItemId(item.id);
                          }}
                          onDragStart={(event) => handleExplorerDragStart(event, item)}
                          onDragEnd={clearDropState}
                          onDragOver={isFolderDropTarget ? (event) => handleDragOverFolder(event, item.id) : undefined}
                          onDragLeave={isFolderDropTarget ? clearDropState : undefined}
                          onDrop={isFolderDropTarget ? (event) => handleDropToFolder(event, item.id) : undefined}
                          onDoubleClick={(event) => {
                            event.stopPropagation();
                            if (!renaming) openItem(item);
                          }}
                          onContextMenu={(event) => openContextMenu(event, "item", item)}
                          style={{ border: "none", outline: dropTargetId === item.id ? "1px dotted #000080" : "none", background: dropTargetId === item.id ? "#dce9ff" : selected ? WIN95_COLORS.selection : "transparent", color: selected ? "#ffffff" : WIN95_COLORS.text, padding: "6px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minHeight: 86, fontFamily: "inherit", fontSize: 11, textAlign: "center", cursor: canDragItem ? "grab" : "default" }}
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
                    const canDragItem = canDeleteItem(item);
                    const isFolderDropTarget = isContainerItem(item) && canCreateInFolder(item.id);

                    return (
                      <div
                        key={item.id}
                        draggable={canDragItem}
                        onClick={(event) => {
                          event.stopPropagation();
                          setExplorerSelectedItemId(item.id);
                        }}
                        onDragStart={(event) => handleExplorerDragStart(event, item)}
                        onDragEnd={clearDropState}
                        onDragOver={isFolderDropTarget ? (event) => handleDragOverFolder(event, item.id) : undefined}
                        onDragLeave={isFolderDropTarget ? clearDropState : undefined}
                        onDrop={isFolderDropTarget ? (event) => handleDropToFolder(event, item.id) : undefined}
                        onDoubleClick={(event) => {
                          event.stopPropagation();
                          if (!renaming) openItem(item);
                        }}
                        onContextMenu={(event) => openContextMenu(event, "item", item)}
                        style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 120px 86px 90px", alignItems: "center", minHeight: 20, padding: "0 8px", outline: dropTargetId === item.id ? "1px dotted #000080" : "none", background: dropTargetId === item.id ? "#dce9ff" : selected ? WIN95_COLORS.selection : "transparent", color: selected ? "#ffffff" : WIN95_COLORS.text, fontSize: 11, cursor: canDragItem ? "grab" : "default", userSelect: "none" }}
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
