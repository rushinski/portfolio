"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import BootSequence from "./BootSequence";
import ScreensaverCanvas from "./ScreensaverCanvas";
import SystemDialog from "./SystemDialog";
import Taskbar from "./Taskbar";
import WindowFrame from "./WindowFrame";
import { DRAG_ITEM_MIME, ICON_VIEW_MODES, MENU_TEXT_COLOR, WALLPAPER_PATTERN_BACKGROUNDS, canPinItemToTaskbar, clamp } from "./constants";
import { PERSONAL } from "./data";
import { useDialogs } from "./hooks/useDialogs";
import { useFileSystem } from "./hooks/useFileSystem";
import { useSettings } from "./hooks/useSettings";
import { useWindowManager } from "./hooks/useWindowManager";
import { WIN95_FONT_FAMILY, WIN95_SCROLLBAR_CSS } from "./ui/retro";
import { GLOBAL_CONTEXT_MENU_EVENT, announceContextMenuOpen } from "./ui/contextMenu";
import AboutApp from "./apps/About";
import ContactApp from "./apps/Contact";
import ExperienceApp from "./apps/Experience";
import FileExplorerApp from "./apps/FileExplorer";
import HelpApp from "./apps/Help";
import LocationApp from "./apps/Location";
import MinesweeperApp from "./apps/Minesweeper";
import ProjectsApp from "./apps/Projects";
import RecycleBinApp from "./apps/RecycleBin";
import ResumeApp from "./apps/Resume";
import SettingsApp from "./apps/Settings";
import SkillsApp from "./apps/Skills";
import TerminalApp from "./apps/Terminal";
import TextDocumentApp from "./apps/TextDocument";
import VideosApp from "./apps/Videos";
import WelcomeApp from "./apps/Welcome";

function DesktopIcon({
  icon,
  position,
  onDoubleClick,
  onDragStart,
  onDragMove,
  onDrop,
  selected,
  hovered,
  onSingleClick,
  onContextMenu,
  onHoverChange,
  iconSizeMode = "large",
  isCutPending = false,
  isRenaming = false,
  renameValue = "",
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
}) {
  const ref = useRef(null);
  const renameInputRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const lastPosRef = useRef(position);
  const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
  const labelMaxWidth = Math.max(28, Math.min(view.maxLabel, view.tileW - 6));

  useEffect(() => {
    lastPosRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!isRenaming) return;
    renameInputRef.current?.focus();
    renameInputRef.current?.select();
  }, [isRenaming]);

  const handlePointerDown = (event) => {
    if (isRenaming) return;
    if (event.button !== 0) {
      event.stopPropagation();
      return;
    }

    event.stopPropagation();
    movedRef.current = false;
    onDragStart?.(icon.id, position);

    const rect = ref.current?.parentElement?.getBoundingClientRect();
    if (!rect) return;

    offsetRef.current = {
      x: event.clientX - position.x - rect.left,
      y: event.clientY - position.y - rect.top,
    };

    const handleMove = (pointerEvent) => {
      const parent = ref.current?.parentElement?.getBoundingClientRect();
      if (!parent) return;
      let nextX = pointerEvent.clientX - parent.left - offsetRef.current.x;
      let nextY = pointerEvent.clientY - parent.top - offsetRef.current.y;
      nextX = clamp(nextX, 0, parent.width - view.tileW);
      nextY = clamp(nextY, 0, parent.height - view.tileH);
      movedRef.current = true;
      lastPosRef.current = { x: nextX, y: nextY };
      onDragMove?.(icon.id, nextX, nextY);
    };

    const handleUp = (pointerEvent) => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);

      if (movedRef.current) {
        onDrop?.(icon.id, lastPosRef.current.x, lastPosRef.current.y, pointerEvent.clientX, pointerEvent.clientY);
      } else {
        onSingleClick?.(icon.id, pointerEvent.clientX, pointerEvent.clientY, { ctrlKey: pointerEvent.ctrlKey || pointerEvent.metaKey, shiftKey: pointerEvent.shiftKey });
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return (
    <div
      ref={ref}
      style={{ position: "absolute", left: position.x, top: position.y, width: view.tileW, minHeight: view.tileH, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", userSelect: "none", touchAction: "none", padding: "2px 2px 1px", outline: (hovered || selected) ? "1px dotted rgba(255,255,255,0.8)" : "1px solid transparent", outlineOffset: -1, opacity: isCutPending ? 0.5 : 1, filter: isCutPending ? "grayscale(0.45) blur(0.6px) brightness(0.85)" : "none", transition: "opacity 120ms linear, filter 120ms linear" }}
      onPointerDown={handlePointerDown}
      onDoubleClick={(event) => {
        if (isRenaming) return;
        event.stopPropagation();
        onDoubleClick?.();
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onContextMenu?.(icon.id, event.clientX, event.clientY);
      }}
      onMouseEnter={() => onHoverChange?.(icon.id)}
      onMouseLeave={() => onHoverChange?.(null)}
    >
      {(selected || hovered) && (
        <div style={{ position: "absolute", left: 4, top: 4, width: 12, height: 12, border: "none", borderTop: "1px solid #ffffff", borderLeft: "1px solid #ffffff", borderRight: "1px solid #3a3a3a", borderBottom: "1px solid #3a3a3a", background: selected ? "#c0c0c0" : "#e7e7e7", color: "#000080", fontSize: 9, lineHeight: "11px", textAlign: "center", fontWeight: 700 }}>
          {selected ? "\u2713" : ""}
        </div>
      )}
      <div style={{ padding: 4, border: "1px solid transparent", background: "transparent", position: "relative" }}>
        <div style={{ transform: `scale(${view.glyphScale})`, transformOrigin: "center" }}>{icon.glyph}</div>
        {icon.itemType === "app" && (
          <div style={{ position: "absolute", left: 2, bottom: 2, pointerEvents: "none", zIndex: 1 }}>
            <svg width="11" height="11" viewBox="0 0 11 11" shapeRendering="crispEdges">
              <rect x="1" y="0" width="10" height="10" fill="#000" opacity="0.55" />
              <rect x="0" y="0" width="3" height="9" fill="#fff" />
              <rect x="0" y="7" width="9" height="3" fill="#fff" />
              <rect x="1" y="1" width="1" height="6" fill="#aaa" />
              <rect x="2" y="7" width="6" height="1" fill="#aaa" />
            </svg>
          </div>
        )}
      </div>
      {isRenaming ? (
        <input
          ref={renameInputRef}
          value={renameValue}
          onChange={(event) => onRenameChange?.(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
          onBlur={() => onRenameCommit?.()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onRenameCommit?.();
            } else if (event.key === "Escape") {
              event.preventDefault();
              onRenameCancel?.();
            }
          }}
          style={{ display: "inline-block", width: "auto", maxWidth: labelMaxWidth, boxSizing: "border-box", background: "rgba(0,0,0,0.45)", color: "#fff", border: "none", outline: "none", fontSize: view.labelSize, fontFamily: "inherit", padding: "1px 5px", textAlign: "center", lineHeight: 1.3 }}
        />
      ) : (
        <div style={{ background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: view.labelSize, padding: "1px 5px", display: "inline-block", width: "auto", maxWidth: labelMaxWidth, boxSizing: "border-box", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.3 }}>
          {icon.title}
        </div>
      )}
    </div>
  );
}

function TopMenuBar() {
  const { openWindow, closeAllWindows, tileWindows, cascadeWindows } = useWindowManager();
  const { iconSizeMode, setIconSizeMode } = useSettings();
  const { createFolder, createTextDocument } = useFileSystem();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handler = () => setOpenMenu(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const menus = {
    Desk: [
      { label: "About JacobOS...", action: () => openWindow("welcome") },
      { label: "---------------", action: null },
      { label: "View Resume", action: () => openWindow("resume") },
    ],
    File: [
      { label: "Open About", action: () => openWindow("about") },
      { label: "Open Skills", action: () => openWindow("skills") },
      { label: "Open Experience", action: () => openWindow("experience") },
      { label: "Open Projects", action: () => openWindow("projects") },
      { label: "Open Videos", action: () => openWindow("videos") },
      { label: "Open Contact", action: () => openWindow("contact") },
      { label: "Open Jacobs Time", action: () => openWindow("location") },
      { label: "Open Terminal", action: () => openWindow("terminal") },
      { label: "Open File Explorer", action: () => openWindow("explorer") },
      { label: "Open Settings", action: () => openWindow("settings") },
      { label: "Open Minesweeper", action: () => openWindow("minesweeper") },
      { label: "Open Help", action: () => openWindow("help") },
      { label: "---------------", action: null },
      { label: "New Folder", action: createFolder },
      { label: "New Text Document", action: createTextDocument },
    ],
    View: [
      { label: (iconSizeMode === "large" ? "* " : "") + "Large icons", action: () => setIconSizeMode("large") },
      { label: (iconSizeMode === "medium" ? "* " : "") + "Medium icons", action: () => setIconSizeMode("medium") },
      { label: (iconSizeMode === "small" ? "* " : "") + "Small icons", action: () => setIconSizeMode("small") },
      { label: "---------------", action: null },
      { label: "Cascade Windows", action: cascadeWindows },
      { label: "Tile Windows", action: tileWindows },
      { label: "---------------", action: null },
      { label: "Close All", action: closeAllWindows },
    ],
    Options: [
      { label: "GitHub Profile", action: () => window.open(PERSONAL.github, "_blank") },
      { label: "LinkedIn Profile", action: () => window.open(PERSONAL.linkedin, "_blank") },
      { label: "Send Email", action: () => window.open(`mailto:${PERSONAL.email}`) },
      { label: "Open Settings", action: () => openWindow("settings") },
    ],
  };

  return (
    <div style={{ background: "#c0c0c0", fontSize: 12, padding: "3px 10px", display: "flex", gap: 0, borderBottom: "1px solid #808080", color: "#111", position: "relative", zIndex: 8000, flexShrink: 0 }}>
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} style={{ position: "relative" }}>
          <button onClick={(event) => { event.stopPropagation(); setOpenMenu(openMenu === name ? null : name); }} style={{ background: openMenu === name ? "#000080" : "transparent", color: openMenu === name ? "#fff" : "#111", border: "none", padding: "2px 10px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: name === "Desk" ? 700 : 400 }}>
            {name}
          </button>
          {openMenu === name && (
            <div onClick={(event) => event.stopPropagation()} style={{ position: "absolute", left: 0, top: "100%", minWidth: 210, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 8px rgba(0,0,0,0.4)", zIndex: 9000, padding: "2px 0" }}>
              {items.map((item, index) => item.action === null ? (
                <div key={`${name}-divider-${index}`} style={{ height: 1, background: "#808080", margin: "3px 8px" }} />
              ) : (
                <button
                  key={`${name}-${item.label}`}
                  onClick={() => { item.action(); setOpenMenu(null); }}
                  style={{ display: "block", width: "100%", padding: "4px 20px", border: "none", background: "transparent", cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "left", color: "#111" }}
                  onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = "#111"; }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <span style={{ marginLeft: "auto", opacity: 0.7, fontStyle: "italic", padding: "2px 0" }}>JacobOS</span>
    </div>
  );
}

export default function Desktop() {
  const { dialog, closeDialog, showAlertDialog } = useDialogs();
  const {
    iconSizeMode,
    setIconSizeMode,
    desktopColor,
    wallpaperPattern,
    crtEffectEnabled,
    screensaverType,
    screensaverTimeout,
  } = useSettings();
  const windowManager = useWindowManager();
  const fileSystem = useFileSystem();

  const {
    openWindows,
    activeWindowId,
    activateTaskbarEntry,
    openWindow,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
    pinTaskbarItem,
    unpinTaskbarItem,
  } = windowManager;
  const {
    desktopItems,
    iconPositions,
    clipboardState,
    setClipboardState,
    registerDesktopElement,
    rememberDesktopCursor,
    toDesktopPoint,
    normalizeIconPosition,
    findFreeGridPosition,
    createFolder,
    createTextDocument,
    pasteDesktopItem,
    commitRenameItem,
    deleteDesktopItem,
    moveItemToParent,
    moveItemToRecycleBin,
    openItem,
    setIconPositions,
    alignIconsToGrid,
    getItemProperties,
  } = fileSystem;

  const desktopRef = useRef(null);
  const dragStartRef = useRef({});
  const screensaverTimeoutRef = useRef(null);
  const selectionBoxRef = useRef(null);
  const altTabRef = useRef(null);
  const [booted, setBooted] = useState(false);
  const [altTabOverlay, setAltTabOverlay] = useState(null);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [selectedIconIds, setSelectedIconIds] = useState([]);
  const [desktopSelectionBox, setDesktopSelectionBox] = useState(null);
  const [marqueePreviewIds, setMarqueePreviewIds] = useState([]);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [desktopViewMenuOpen, setDesktopViewMenuOpen] = useState(false);
  const [viewMenuFlip, setViewMenuFlip] = useState(false);
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [newMenuFlip, setNewMenuFlip] = useState(false);
  const [iconMenu, setIconMenu] = useState(null);
  const [renamingItem, setRenamingItem] = useState(null);
  const [desktopDropActive, setDesktopDropActive] = useState(false);

  const rootDesktopItems = useMemo(
    () => desktopItems.filter((item) => (item.parentId ?? null) === null),
    [desktopItems],
  );

  const desktopItemByWindowId = useMemo(
    () => new Map(desktopItems.filter((item) => item.windowId).map((item) => [item.windowId, item])),
    [desktopItems],
  );
  const desktopBaseBackground = desktopColor || "linear-gradient(180deg, #0b4aa6, #0a3f90)";
  const wallpaperPatternBackground = WALLPAPER_PATTERN_BACKGROUNDS[wallpaperPattern] || "none";
  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const setDesktopNode = useCallback((node) => {
    desktopRef.current = node;
    registerDesktopElement(node);
  }, [registerDesktopElement]);

  const resetScreensaverTimer = useCallback(() => {
    if (screensaverTimeoutRef.current) {
      window.clearTimeout(screensaverTimeoutRef.current);
    }

    setScreensaverActive(false);

    if (!booted || screensaverType === "none" || screensaverTimeout == null) {
      return;
    }

    screensaverTimeoutRef.current = window.setTimeout(() => {
      setScreensaverActive(true);
    }, screensaverTimeout * 1000);
  }, [booted, screensaverTimeout, screensaverType]);

  useEffect(() => {
    resetScreensaverTimer();

    const wakeEvents = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"];
    const handleWake = () => resetScreensaverTimer();

    wakeEvents.forEach((eventName) => window.addEventListener(eventName, handleWake));
    return () => {
      wakeEvents.forEach((eventName) => window.removeEventListener(eventName, handleWake));
      if (screensaverTimeoutRef.current) {
        window.clearTimeout(screensaverTimeoutRef.current);
      }
    };
  }, [resetScreensaverTimer]);

  const getIconsInSelectionBox = useCallback((box) => {
    if (!box || box.w <= 0 || box.h <= 0) return [];
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;

    return rootDesktopItems
      .filter((item) => {
        const pos = iconPositions[item.id];
        if (!pos) return false;
        return pos.x < box.x + box.w && pos.x + view.tileW > box.x && pos.y < box.y + box.h && pos.y + view.tileH > box.y;
      })
      .sort((a, b) => {
        const posA = iconPositions[a.id] || { x: 0, y: 0 };
        const posB = iconPositions[b.id] || { x: 0, y: 0 };
        if (posA.x === posB.x) return posA.y - posB.y;
        return posA.x - posB.x;
      })
      .map((item) => item.id);
  }, [iconPositions, iconSizeMode, rootDesktopItems]);

  const handleDesktopPointerDown = useCallback((event) => {
    if (event.button !== 0 || event.target !== event.currentTarget) return;
    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;

    rememberDesktopCursor(event.clientX, event.clientY);
    const startX = clamp(event.clientX - rect.left, 0, rect.width);
    const startY = clamp(event.clientY - rect.top, 0, rect.height);
    const initialBox = { x: startX, y: startY, w: 0, h: 0 };

    setSelectedIconIds([]);
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setMarqueePreviewIds([]);
    setDesktopSelectionBox(initialBox);
    selectionBoxRef.current = initialBox;

    const handleMove = (pointerEvent) => {
      rememberDesktopCursor(pointerEvent.clientX, pointerEvent.clientY);
      const currentX = clamp(pointerEvent.clientX - rect.left, 0, rect.width);
      const currentY = clamp(pointerEvent.clientY - rect.top, 0, rect.height);
      const box = {
        x: Math.min(startX, currentX),
        y: Math.min(startY, currentY),
        w: Math.abs(currentX - startX),
        h: Math.abs(currentY - startY),
      };
      selectionBoxRef.current = box;
      setDesktopSelectionBox(box);
      if (box.w > 3 || box.h > 3) {
        setMarqueePreviewIds(getIconsInSelectionBox(box));
      } else {
        setMarqueePreviewIds([]);
      }
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      const box = selectionBoxRef.current;
      if (box && (box.w > 4 || box.h > 4)) {
        const hits = getIconsInSelectionBox(box);
        if (hits.length > 0) setSelectedIconIds(hits);
      }
      selectionBoxRef.current = null;
      setDesktopSelectionBox(null);
      setMarqueePreviewIds([]);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [getIconsInSelectionBox, rememberDesktopCursor]);

  const selectDesktopIcon = useCallback((id, opts = {}) => {
    if (opts.ctrlKey) {
      setSelectedIconIds((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
    } else {
      setSelectedIconIds([id]);
    }
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
  }, []);

  const openIconMenuAt = useCallback((id, clientX, clientY) => {
    announceContextMenuOpen("desktop");
    rememberDesktopCursor(clientX, clientY);
    const rect = desktopRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const iconPos = iconPositions[id];
    const menuW = 188;
    const menuH = 196;

    setSelectedIconIds([id]);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);

    if (rect && iconPos) {
      let menuX = iconPos.x + view.tileW + 6;
      if (menuX + menuW > rect.width - 4) menuX = Math.max(4, iconPos.x - menuW - 6);
      let menuY = clamp(iconPos.y + 4, 4, Math.max(4, rect.height - menuH - 4));
      if (menuX <= iconPos.x + view.tileW && menuX + menuW >= iconPos.x) {
        menuX = clamp(iconPos.x + view.tileW + 6, 4, Math.max(4, rect.width - menuW - 4));
        if (menuX <= iconPos.x + view.tileW && menuX + menuW >= iconPos.x) {
          menuX = clamp(iconPos.x - menuW - 6, 4, Math.max(4, rect.width - menuW - 4));
        }
      }
      setIconMenu({ id, x: menuX, y: menuY });
      return;
    }

    const point = toDesktopPoint(clientX, clientY);
    setIconMenu({ id, x: point.x, y: point.y });
  }, [rememberDesktopCursor, iconPositions, iconSizeMode, toDesktopPoint]);

  const openDesktopMenuAt = useCallback((clientX, clientY) => {
    announceContextMenuOpen("desktop");
    rememberDesktopCursor(clientX, clientY);
    const point = toDesktopPoint(clientX, clientY);
    setDesktopMenu({ x: point.x, y: point.y });
    setDesktopViewMenuOpen(false);
    setIconMenu(null);
  }, [rememberDesktopCursor, toDesktopPoint]);

  const commitRenameDesktopItem = useCallback(() => {
    if (!renamingItem) return;
    commitRenameItem(renamingItem.id, renamingItem.value);
    setRenamingItem(null);
  }, [commitRenameItem, renamingItem]);

  const cancelRenameDesktopItem = useCallback(() => {
    setRenamingItem(null);
  }, []);

  const handleIconAction = useCallback((action, id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;

    setSelectedIconIds([id]);

    if (action === "open") openItem(item);
    if (action === "cut") setClipboardState({ mode: "cut", id });
    if (action === "copy") setClipboardState({ mode: "copy", id });
    if (action === "paste") {
      const pastedId = pasteDesktopItem();
      if (pastedId) setSelectedIconIds([pastedId]);
    }
    if (action === "rename") setRenamingItem({ id, value: item.title });
    if (action === "delete") {
      const deleted = deleteDesktopItem(id);
      if (deleted) setSelectedIconIds((prev) => prev.filter((entry) => entry !== id));
    }
    if (action === "pinTaskbar") pinTaskbarItem(id);
    if (action === "unpinTaskbar") unpinTaskbarItem(id);
    if (action === "properties") {
      const props = getItemProperties(id);
      if (props) {
        const createdStr = props.createdAt
          ? new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(props.createdAt))
          : "System item";
        const details = [
          `Name:     ${props.name}`,
          `Type:     ${props.type}`,
          `Location: ${props.location}`,
          `Size:     ${props.size}`,
          `Created:  ${createdStr}`,
        ].join("\n");
        showAlertDialog(props.name, { title: "Properties", details, variant: "info" });
      }
    }

    setIconMenu(null);
  }, [deleteDesktopItem, desktopItems, getItemProperties, openItem, pasteDesktopItem, pinTaskbarItem, setClipboardState, showAlertDialog, unpinTaskbarItem]);

  const handleIconDragStart = useCallback((id, position) => {
    dragStartRef.current[id] = position;
    setSelectedIconIds([id]);
    setIconMenu(null);
    setDesktopMenu(null);
  }, []);

  const handleIconDragMove = useCallback((id, x, y) => {
    setIconPositions((prev) => ({ ...prev, [id]: { x, y } }));
  }, [setIconPositions]);

  const handleIconDrop = useCallback((id, x, y) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;

    const snapped = normalizeIconPosition(x, y);
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const trashPos = iconPositions.trash;
    const overTrash = id !== "trash" && trashPos
      && snapped.x + view.tileW / 2 >= trashPos.x
      && snapped.x + view.tileW / 2 <= trashPos.x + view.tileW
      && snapped.y + view.tileH / 2 >= trashPos.y
      && snapped.y + view.tileH / 2 <= trashPos.y + view.tileH;

    if (overTrash) {
      const deleted = moveItemToRecycleBin(id, dragStartRef.current[id] || snapped);
      if (!deleted) {
        setIconPositions((prev) => ({ ...prev, [id]: dragStartRef.current[id] || snapped }));
      } else {
        setSelectedIconIds((prev) => prev.filter((entry) => entry !== id));
      }
      return;
    }

    setIconPositions((prev) => {
      const freePos = findFreeGridPosition(snapped.x, snapped.y, id, prev);
      return { ...prev, [id]: freePos };
    });
  }, [desktopItems, findFreeGridPosition, iconPositions.trash, iconSizeMode, moveItemToRecycleBin, normalizeIconPosition, setIconPositions]);

  const handleDesktopExternalDrop = useCallback((event) => {
    const draggedId = event.dataTransfer?.getData(DRAG_ITEM_MIME) || event.dataTransfer?.getData("text/plain");
    setDesktopDropActive(false);
    if (!draggedId) {
      return;
    }

    rememberDesktopCursor(event.clientX, event.clientY);
    const moved = moveItemToParent(draggedId, null, {
      clientX: event.clientX,
      clientY: event.clientY,
    });
    if (moved) {
      setSelectedIconIds([draggedId]);
      setIconMenu(null);
      setDesktopMenu(null);
    }
  }, [moveItemToParent, rememberDesktopCursor]);

  const nudgeSelectedIcon = useCallback((dxCells, dyCells) => {
    const id = selectedIconIds[0];
    if (!id) return;
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    setIconPositions((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const targetX = current.x + dxCells * view.cellX;
      const targetY = current.y + dyCells * view.cellY;
      const freePos = findFreeGridPosition(targetX, targetY, id, prev);
      return { ...prev, [id]: freePos };
    });
  }, [findFreeGridPosition, iconSizeMode, selectedIconIds, setIconPositions]);

  const iconMenuItem = iconMenu ? desktopItems.find((item) => item.id === iconMenu.id) : null;
  const iconMenuIsPinnable = canPinItemToTaskbar(iconMenuItem);
  const actualIconMenuPinned = !!iconMenuItem && windowManager.pinnedTaskbarAppIds.includes(iconMenuItem.id);

  const windowContent = {
    welcome: <WelcomeApp />,
    about: <AboutApp />,
    skills: <SkillsApp />,
    experience: <ExperienceApp />,
    projects: <ProjectsApp />,
    videos: <VideosApp />,
    contact: <ContactApp />,
    location: <LocationApp />,
    terminal: <TerminalApp />,
    trash: <RecycleBinApp />,
    explorer: <FileExplorerApp />,
    settings: <SettingsApp />,
    textdoc: <TextDocumentApp />,
    resume: <ResumeApp />,
    minesweeper: <MinesweeperApp />,
    help: <HelpApp />,
  };

  useEffect(() => {
    const handleForeignContextMenu = (event) => {
      if (event.detail?.source === "desktop") {
        return;
      }

      setIconMenu(null);
      setDesktopMenu(null);
      setDesktopViewMenuOpen(false);
    };

    window.addEventListener(GLOBAL_CONTEXT_MENU_EVENT, handleForeignContextMenu);
    return () => window.removeEventListener(GLOBAL_CONTEXT_MENU_EVENT, handleForeignContextMenu);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      // Alt+Tab — window switcher (intercept before typing check)
      if (event.altKey && event.key === "Tab") {
        event.preventDefault();
        const wins = openWindows.filter((w) => !w.isMinimized);
        if (wins.length === 0) return;
        if (!altTabRef.current) {
          const index = wins.length > 1 ? 1 : 0;
          altTabRef.current = { windows: wins, index };
        } else {
          const len = altTabRef.current.windows.length;
          altTabRef.current = {
            ...altTabRef.current,
            index: event.shiftKey
              ? (altTabRef.current.index - 1 + len) % len
              : (altTabRef.current.index + 1) % len,
          };
        }
        setAltTabOverlay({ ...altTabRef.current });
        return;
      }

      // Alt+F4 — close active window
      if (event.altKey && event.key === "F4") {
        event.preventDefault();
        if (activeWindowId) closeWindow(activeWindowId);
        return;
      }

      // F1 — open Help
      if (event.key === "F1") {
        event.preventDefault();
        openWindow("help");
        return;
      }

      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (isTyping) return;

      const ctrl = event.ctrlKey || event.metaKey;

      if (event.key === "Escape") {
        setIconMenu(null);
        setDesktopMenu(null);
        setDesktopViewMenuOpen(false);
        cancelRenameDesktopItem();
        return;
      }

      if (ctrl && (event.key === "a" || event.key === "A")) {
        event.preventDefault();
        setSelectedIconIds(rootDesktopItems.map((item) => item.id));
        return;
      }

      if (ctrl && event.shiftKey && (event.key === "N" || event.key === "n")) {
        event.preventDefault();
        const createdId = createFolder();
        if (createdId) setSelectedIconIds([createdId]);
        return;
      }

      if (ctrl && (event.key === "v" || event.key === "V")) {
        event.preventDefault();
        if (!clipboardState) return;
        const pastedId = pasteDesktopItem();
        if (pastedId) setSelectedIconIds([pastedId]);
        return;
      }

      const activeId = selectedIconIds[0];
      if (!activeId) return;

      if (ctrl && (event.key === "c" || event.key === "C")) {
        event.preventDefault();
        setClipboardState({ mode: "copy", id: activeId });
        return;
      }

      if (ctrl && (event.key === "x" || event.key === "X")) {
        event.preventDefault();
        setClipboardState({ mode: "cut", id: activeId });
        return;
      }

      if (event.key === "Delete") {
        event.preventDefault();
        const deleted = deleteDesktopItem(activeId);
        if (deleted) setSelectedIconIds((prev) => prev.filter((entry) => entry !== activeId));
        return;
      }

      if (event.key === "F2") {
        event.preventDefault();
        const item = desktopItems.find((entry) => entry.id === activeId);
        if (item) setRenamingItem({ id: activeId, value: item.title });
        return;
      }

      if (event.shiftKey && event.key === "ArrowLeft") { event.preventDefault(); nudgeSelectedIcon(-1, 0); }
      if (event.shiftKey && event.key === "ArrowRight") { event.preventDefault(); nudgeSelectedIcon(1, 0); }
      if (event.shiftKey && event.key === "ArrowUp") { event.preventDefault(); nudgeSelectedIcon(0, -1); }
      if (event.shiftKey && event.key === "ArrowDown") { event.preventDefault(); nudgeSelectedIcon(0, 1); }
    };

    const onKeyUp = (event) => {
      if (event.key === "Alt" && altTabRef.current) {
        const { windows, index } = altTabRef.current;
        const selected = windows[index];
        if (selected) activateTaskbarEntry(selected.id);
        altTabRef.current = null;
        setAltTabOverlay(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [activateTaskbarEntry, activeWindowId, cancelRenameDesktopItem, clipboardState, closeWindow, createFolder, deleteDesktopItem, desktopItems, nudgeSelectedIcon, openWindow, openWindows, pasteDesktopItem, rootDesktopItems, selectedIconIds, setClipboardState]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }
        body { background: #1a1a1a; font-family: ${WIN95_FONT_FAMILY}; font-size: 13px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        ${WIN95_SCROLLBAR_CSS}
        ::selection { background: #000080; color: #fff; }
      `}</style>

      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#2a2a2a", padding: "12px" }}>
        <div style={{ width: "100%", flex: 1, minHeight: 0, maxWidth: 1400, maxHeight: 900, background: "linear-gradient(180deg, #d6c9a7 0%, #c9bb98 100%)", borderRadius: "24px", padding: "18px", boxShadow: "0 20px 80px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -3px 0 rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", animation: "fadeIn 0.6s ease-out" }}>
          <div style={{ flex: 1, background: "#222", borderRadius: "16px", padding: "10px", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6), inset 0 4px 12px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ flex: 1, borderRadius: "10px", overflow: "hidden", position: "relative", background: desktopBaseBackground, boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: wallpaperPatternBackground,
                  backgroundSize: wallpaperPattern === "dot-grid" ? "8px 8px" : undefined,
                  backgroundRepeat: "repeat",
                  opacity: wallpaperPattern === "solid" ? 0 : 1,
                  pointerEvents: "none",
                  zIndex: 45,
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)", pointerEvents: "none", zIndex: 50, opacity: crtEffectEnabled ? 1 : 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.3) 100%)", pointerEvents: "none", zIndex: 51, opacity: crtEffectEnabled ? 1 : 0 }} />

              <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, opacity: booted ? 1 : 0.96, pointerEvents: booted ? "auto" : "none", transition: "opacity 240ms linear" }}>
                <TopMenuBar />
                <div
                  ref={setDesktopNode}
                  style={{ flex: 1, position: "relative", overflow: "hidden", outline: desktopDropActive ? "1px dotted rgba(255,255,255,0.85)" : "none", outlineOffset: -2 }}
                  onPointerDown={handleDesktopPointerDown}
                  onPointerMove={(event) => rememberDesktopCursor(event.clientX, event.clientY)}
                  onDragOver={(event) => {
                    const dragTypes = Array.from(event.dataTransfer?.types || []);
                    const draggedId = dragTypes.includes(DRAG_ITEM_MIME) || dragTypes.includes("text/plain");
                    if (!draggedId) {
                      return;
                    }
                    event.preventDefault();
                    setDesktopDropActive(true);
                  }}
                  onDragLeave={() => setDesktopDropActive(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDesktopExternalDrop(event);
                  }}
                  onContextMenu={(event) => { if (event.target !== event.currentTarget) return; event.preventDefault(); event.stopPropagation(); openDesktopMenuAt(event.clientX, event.clientY); }}
                >
                  {rootDesktopItems.map((icon) => (
                    <DesktopIcon key={icon.id} icon={icon} position={iconPositions[icon.id]} selected={selectedIconIds.includes(icon.id)} hovered={hoveredIcon === icon.id || marqueePreviewIds.includes(icon.id)} iconSizeMode={iconSizeMode} onDoubleClick={() => openItem(icon)} onDragStart={handleIconDragStart} onDragMove={handleIconDragMove} onDrop={handleIconDrop} onSingleClick={(id, _x, _y, opts) => selectDesktopIcon(id, opts)} onContextMenu={openIconMenuAt} onHoverChange={setHoveredIcon} isCutPending={clipboardState?.mode === "cut" && clipboardState.id === icon.id} isRenaming={renamingItem?.id === icon.id} renameValue={renamingItem?.id === icon.id ? renamingItem.value : icon.title} onRenameChange={(value) => setRenamingItem((prev) => (prev?.id === icon.id ? { ...prev, value } : prev))} onRenameCommit={commitRenameDesktopItem} onRenameCancel={cancelRenameDesktopItem} />
                  ))}

                  {desktopSelectionBox && (desktopSelectionBox.w > 0 || desktopSelectionBox.h > 0) && (
                    <div style={{ position: "absolute", left: desktopSelectionBox.x, top: desktopSelectionBox.y, width: desktopSelectionBox.w, height: desktopSelectionBox.h, background: "rgba(154,198,255,0.35)", border: "1px solid #5b8fd8", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)", pointerEvents: "none", zIndex: 150 }} />
                  )}

                  {desktopMenu && (
                    <div onClick={(event) => event.stopPropagation()} style={{ position: "absolute", left: desktopMenu.x, top: desktopMenu.y, minWidth: 190, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 10px rgba(0,0,0,0.4)", zIndex: 9100, padding: "2px 0" }}>
                      <div onMouseEnter={(e) => { const r = e.currentTarget.getBoundingClientRect(); setViewMenuFlip(r.right + 185 > window.innerWidth); setDesktopViewMenuOpen(true); }} onMouseLeave={() => setDesktopViewMenuOpen(false)} style={{ position: "relative" }}>
                        <button
                          style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                          onClick={() => setDesktopViewMenuOpen((prev) => !prev)}
                          onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}
                        >
                          View  &gt;
                        </button>
                        {desktopViewMenuOpen && (
                          <div onMouseEnter={() => setDesktopViewMenuOpen(true)} onMouseLeave={() => setDesktopViewMenuOpen(false)} style={{ position: "absolute", ...(viewMenuFlip ? { right: "100%" } : { left: "100%" }), top: 0, minWidth: 180, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 10px rgba(0,0,0,0.4)" }}>
                            {[
                              { key: "large", label: "Large icons" },
                              { key: "medium", label: "Medium icons" },
                              { key: "small", label: "Small icons" },
                            ].map((opt) => (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  setIconSizeMode(opt.key);
                                  setDesktopMenu(null);
                                  setDesktopViewMenuOpen(false);
                                }}
                                style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                                onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }}
                                onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}
                              >
                                {(iconSizeMode === opt.key ? "* " : "") + opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button onClick={() => { alignIconsToGrid(); setDesktopMenu(null); }} style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                        Line Up Icons
                      </button>
                      <button onClick={() => { setDesktopMenu(null); }} style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                        Refresh
                      </button>
                      <div style={{ height: 1, background: "#808080", margin: "3px 8px" }} />
                      <div onMouseEnter={(e) => { const r = e.currentTarget.getBoundingClientRect(); setNewMenuFlip(r.right + 185 > window.innerWidth); setNewMenuOpen(true); }} onMouseLeave={() => setNewMenuOpen(false)} style={{ position: "relative" }}>
                        <button style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                          New  &gt;
                        </button>
                        {newMenuOpen && (
                          <div onMouseEnter={() => setNewMenuOpen(true)} onMouseLeave={() => setNewMenuOpen(false)} style={{ position: "absolute", ...(newMenuFlip ? { right: "100%" } : { left: "100%" }), top: 0, minWidth: 180, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 10px rgba(0,0,0,0.4)" }}>
                            <button onClick={() => { const createdId = createFolder(); if (createdId) setSelectedIconIds([createdId]); setDesktopMenu(null); setNewMenuOpen(false); }} style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                              Folder
                            </button>
                            <button onClick={() => { const createdId = createTextDocument(); if (createdId) setSelectedIconIds([createdId]); setDesktopMenu(null); setNewMenuOpen(false); }} style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                              Text Document
                            </button>
                          </div>
                        )}
                      </div>
                      {clipboardState && (
                        <button onClick={() => { const pastedId = pasteDesktopItem(); if (pastedId) setSelectedIconIds([pastedId]); setDesktopMenu(null); }} style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                          Paste
                        </button>
                      )}
                    </div>
                  )}

                  {iconMenu && (
                    <div onClick={(event) => event.stopPropagation()} style={{ position: "absolute", left: iconMenu.x, top: iconMenu.y, minWidth: 188, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 10px rgba(0,0,0,0.4)", zIndex: 9200, padding: "2px 0" }}>
                      {[
                        { key: "open", label: "Open" },
                        { key: "__sep1__" },
                        { key: "cut", label: "Cut" },
                        { key: "copy", label: "Copy" },
                        ...(clipboardState ? [{ key: "paste", label: "Paste" }] : []),
                        ...(iconMenuIsPinnable ? [{ key: "__sep2__" }, { key: actualIconMenuPinned ? "unpinTaskbar" : "pinTaskbar", label: actualIconMenuPinned ? "Unpin from Taskbar" : "Pin to Taskbar" }] : []),
                        { key: "__sep3__" },
                        { key: "rename", label: "Rename" },
                        { key: "delete", label: "Delete" },
                        { key: "__sep4__" },
                        { key: "properties", label: "Properties" },
                      ].map((opt) => opt.key.startsWith("__sep") ? (
                        <div key={opt.key} style={{ height: 1, background: "#808080", margin: "3px 8px" }} />
                      ) : (
                        <button key={opt.key} onClick={() => handleIconAction(opt.key, iconMenu.id)} style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} onMouseEnter={(event) => { event.currentTarget.style.background = "#000080"; event.currentTarget.style.color = "#fff"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = MENU_TEXT_COLOR; }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {openWindows.filter((win) => !win.isMinimized).sort((a, b) => a.z - b.z).map((win) => (
                    <WindowFrame key={win.id} win={win} isActive={win.id === activeWindowId} onFocus={() => focusWindow(win.id)} onClose={() => closeWindow(win.id)} onMinimize={() => minimizeWindow(win.id)} onMaximize={() => maximizeWindow(win.id)} onMove={(x, y) => moveWindow(win.id, x, y)} onResize={(x, y, width, height) => resizeWindow(win.id, x, y, width, height)}>
                      {windowContent[win.id]}
                    </WindowFrame>
                  ))}

                  {altTabOverlay && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9500, pointerEvents: "none" }}>
                      <div style={{ background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "4px 4px 12px rgba(0,0,0,0.5)", padding: "12px 16px", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", maxWidth: "80%", justifyContent: "center" }}>
                        {altTabOverlay.windows.map((win, index) => {
                          const appItem = desktopItemByWindowId.get(win.id);
                          const isSelected = altTabOverlay.index === index;
                          return (
                            <div key={win.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 8px", background: isSelected ? "#000080" : "transparent", border: isSelected ? "1px dotted #fff" : "1px solid transparent", minWidth: 64, maxWidth: 80 }}>
                              <div style={{ width: 32, height: 32, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {appItem?.glyph || null}
                              </div>
                              <div style={{ fontSize: 10, color: isSelected ? "#fff" : "#111", textAlign: "center", maxWidth: 76, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>
                                {win.title}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Taskbar />
              </div>

              {booted && screensaverActive && (
                <div
                  style={{ position: "absolute", inset: 0, zIndex: 18000 }}
                  onMouseMove={resetScreensaverTimer}
                  onMouseDown={resetScreensaverTimer}
                  onKeyDown={resetScreensaverTimer}
                >
                  <ScreensaverCanvas type={screensaverType} />
                </div>
              )}

              {!booted && (
                <BootSequence embedded onComplete={handleBootComplete} />
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 8, height: 6, borderRadius: 10, background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.15))", marginLeft: "30%", marginRight: "30%" }} />
      </div>

      <SystemDialog dialog={dialog} onClose={closeDialog} />
    </>
  );
}
