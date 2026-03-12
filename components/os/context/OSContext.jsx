"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import {
  DEFAULT_PINNED_TASKBAR_IDS,
  FULLSCREEN_WINDOW_IDS,
  ICON_VIEW_MODES,
  INITIAL_ICON_POSITIONS,
  INITIAL_WINDOWS,
  buildSystemDesktopIcons,
  canPinItemToTaskbar,
  clamp,
  snapIconToGrid,
} from "../constants";
import { VIDEO_LIBRARY, VIDEO_LIBRARY_BY_ID } from "../data";
import { Icons } from "../icons";

const OSContext = createContext(null);

export function OSProvider({ children }) {
  const topZRef = useRef(100);
  const desktopElementRef = useRef(null);
  const lastDesktopCursorRef = useRef(null);

  const [clockFormat, setClockFormat] = useState("12h");
  const [desktopColor, setDesktopColor] = useState(null);
  const [iconSizeMode, setIconSizeMode] = useState("medium");

  const [systemAlert, setSystemAlert] = useState("");
  const [clipboardState, setClipboardState] = useState(null);
  const [renamedSystemIcons, setRenamedSystemIcons] = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [recycleBinItems, setRecycleBinItems] = useState([]);
  const [activeTextDocId, setActiveTextDocId] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(VIDEO_LIBRARY[0]?.id || null);
  const [pinnedTaskbarAppIds, setPinnedTaskbarAppIds] = useState(DEFAULT_PINNED_TASKBAR_IDS);
  const [iconPositions, setIconPositions] = useState(INITIAL_ICON_POSITIONS);
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const iconPositionsRef = useRef(INITIAL_ICON_POSITIONS);

  iconPositionsRef.current = iconPositions;

  const systemDesktopIcons = useMemo(
    () => buildSystemDesktopIcons(renamedSystemIcons),
    [renamedSystemIcons],
  );

  const desktopItems = useMemo(
    () => [...systemDesktopIcons, ...customItems],
    [systemDesktopIcons, customItems],
  );

  const activeTextDoc = useMemo(
    () => customItems.find((item) => item.id === activeTextDocId) || null,
    [customItems, activeTextDocId],
  );

  const nextZ = useCallback(() => ++topZRef.current, []);

  const registerDesktopElement = useCallback((node) => {
    desktopElementRef.current = node;
  }, []);

  const showProtectedDeleteAlert = useCallback(() => {
    setSystemAlert("You cannot delete this. These files are essential to JacobOS and cannot be removed.");
  }, []);

  const toDesktopPoint = useCallback((clientX, clientY) => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 12, y: 8 };
    }

    return {
      x: clamp(clientX - rect.left, 8, rect.width - 240),
      y: clamp(clientY - rect.top, 8, rect.height - 180),
    };
  }, []);

  const rememberDesktopCursor = useCallback((clientX, clientY) => {
    if (typeof clientX !== "number" || typeof clientY !== "number") {
      return;
    }

    lastDesktopCursorRef.current = { clientX, clientY };
  }, []);

  const toDesktopCursorPoint = useCallback((clientX, clientY) => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    if (!rect) {
      return null;
    }

    return {
      x: clamp(clientX - rect.left, 0, Math.max(0, rect.width - 1)),
      y: clamp(clientY - rect.top, 0, Math.max(0, rect.height - 1)),
    };
  }, []);

  const normalizeIconPosition = useCallback((x, y) => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const maxWidth = rect?.width ?? 1200;
    const maxHeight = rect?.height ?? 700;
    const snapped = snapIconToGrid(x, y, iconSizeMode, 12, 8);
    const maxCol = Math.max(0, Math.floor((maxWidth - 12 - view.tileW) / view.cellX));
    const maxRow = Math.max(0, Math.floor((maxHeight - 8 - view.tileH) / view.cellY));
    const col = clamp(Math.round((snapped.x - 12) / view.cellX), 0, maxCol);
    const row = clamp(Math.round((snapped.y - 8) / view.cellY), 0, maxRow);

    return {
      x: 12 + col * view.cellX,
      y: 8 + row * view.cellY,
    };
  }, [iconSizeMode]);

  const getRootDesktopItems = useCallback(
    () => desktopItems.filter((item) => (item.parentId ?? null) === null),
    [desktopItems],
  );

  const getNextDesktopSlot = useCallback(() => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const rows = Math.max(1, Math.floor(((rect?.height ?? 700) - 8 - view.tileH) / view.cellY) + 1);
    const index = getRootDesktopItems().length;
    const col = Math.floor(index / rows);
    const row = index % rows;

    return normalizeIconPosition(12 + col * view.cellX, 8 + row * view.cellY);
  }, [getRootDesktopItems, iconSizeMode, normalizeIconPosition]);

  const findFreeGridPosition = useCallback((targetX, targetY, excludeId = null, positions = iconPositionsRef.current) => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const maxCol = Math.max(0, Math.floor(((rect?.width ?? 1200) - 12 - view.tileW) / view.cellX));
    const maxRow = Math.max(0, Math.floor(((rect?.height ?? 700) - 8 - view.tileH) / view.cellY));

    const desired = normalizeIconPosition(targetX, targetY);
    const startCol = clamp(Math.round((desired.x - 12) / view.cellX), 0, maxCol);
    const startRow = clamp(Math.round((desired.y - 8) / view.cellY), 0, maxRow);
    const occupied = new Set();

    getRootDesktopItems().forEach((item) => {
      if (item.id === excludeId) {
        return;
      }

      const position = positions[item.id];
      if (!position) {
        return;
      }

      const col = clamp(Math.round((position.x - 12) / view.cellX), 0, maxCol);
      const row = clamp(Math.round((position.y - 8) / view.cellY), 0, maxRow);
      occupied.add(`${col}:${row}`);
    });

    const cellToPosition = (col, row) => ({
      x: 12 + col * view.cellX,
      y: 8 + row * view.cellY,
    });

    if (!occupied.has(`${startCol}:${startRow}`)) {
      return cellToPosition(startCol, startRow);
    }

    const maxRadius = Math.max(maxCol + 1, maxRow + 1);
    for (let radius = 1; radius <= maxRadius; radius += 1) {
      for (let row = Math.max(0, startRow - radius); row <= Math.min(maxRow, startRow + radius); row += 1) {
        for (let col = Math.max(0, startCol - radius); col <= Math.min(maxCol, startCol + radius); col += 1) {
          if (!occupied.has(`${col}:${row}`)) {
            return cellToPosition(col, row);
          }
        }
      }
    }

    return desired;
  }, [getRootDesktopItems, iconSizeMode, normalizeIconPosition]);

  const openWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) {
        return prev;
      }

      const shouldMaximize = FULLSCREEN_WINDOW_IDS.has(id);
      const baseWindow = prev[id];
      const openedWindow = {
        ...baseWindow,
        isOpen: true,
        isMinimized: false,
        isMaximized: shouldMaximize,
        z: nextZ(),
      };

      if (id === "welcome") {
        return {
          ...prev,
          [id]: {
            ...openedWindow,
            isMaximized: false,
            x: 250,
            y: 95,
            w: 800,
            h: 540,
          },
        };
      }

      return {
        ...prev,
        [id]: openedWindow,
      };
    });
  }, [nextZ]);

  const openVideoApp = useCallback((videoId = null) => {
    if (videoId && VIDEO_LIBRARY_BY_ID[videoId]) {
      setSelectedVideoId(videoId);
    }
    openWindow("videos");
  }, [openWindow]);

  const openItem = useCallback((item) => {
    if (!item) {
      return;
    }

    if (item.itemType === "text") {
      setActiveTextDocId(item.id);
      setWindows((prev) => ({
        ...prev,
        textdoc: {
          ...prev.textdoc,
          title: item.title,
          isOpen: true,
          isMinimized: false,
          z: nextZ(),
        },
      }));
      return;
    }

    if (item.itemType === "folder") {
      setWindows((prev) => ({
        ...prev,
        explorer: {
          ...prev.explorer,
          title: `File Explorer - ${item.title}`,
          isOpen: true,
          isMinimized: false,
          z: nextZ(),
        },
      }));
      return;
    }

    if (item.windowId) {
      openWindow(item.windowId);
    }
  }, [nextZ, openWindow]);

  const createDesktopItem = useCallback((itemType, clientX, clientY) => {
    const id = `${itemType}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const basePosition = typeof clientX === "number" && typeof clientY === "number"
      ? normalizeIconPosition(toDesktopPoint(clientX, clientY).x, toDesktopPoint(clientX, clientY).y)
      : getNextDesktopSlot();
    const createdAt = Date.now();

    const newItem = itemType === "folder"
      ? { id, title: "New Folder", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, content: "", parentId: null, createdAt }
      : { id, title: "New Text Document.txt", glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, content: "", parentId: null, createdAt };

    setCustomItems((prev) => [...prev, newItem]);
    setIconPositions((prev) => {
      const position = findFreeGridPosition(basePosition.x, basePosition.y, id, prev);
      return { ...prev, [id]: position };
    });

    return id;
  }, [findFreeGridPosition, getNextDesktopSlot, normalizeIconPosition, toDesktopPoint]);

  const createFolder = useCallback((clientX, clientY) => createDesktopItem("folder", clientX, clientY), [createDesktopItem]);
  const createTextDocument = useCallback((clientX, clientY) => createDesktopItem("text", clientX, clientY), [createDesktopItem]);

  const resolvePasteBasePosition = useCallback((clientX, clientY) => {
    if (typeof clientX === "number" && typeof clientY === "number") {
      const explicitPoint = toDesktopCursorPoint(clientX, clientY);
      if (explicitPoint) {
        return normalizeIconPosition(explicitPoint.x, explicitPoint.y);
      }
    }

    if (lastDesktopCursorRef.current) {
      const trackedPoint = toDesktopCursorPoint(
        lastDesktopCursorRef.current.clientX,
        lastDesktopCursorRef.current.clientY,
      );
      if (trackedPoint) {
        return normalizeIconPosition(trackedPoint.x, trackedPoint.y);
      }
    }

    return getNextDesktopSlot();
  }, [getNextDesktopSlot, normalizeIconPosition, toDesktopCursorPoint]);

  const pasteDesktopItem = useCallback((clientX, clientY) => {
    if (!clipboardState) {
      return null;
    }

    const source = desktopItems.find((item) => item.id === clipboardState.id);
    if (!source) {
      return null;
    }

    const basePosition = resolvePasteBasePosition(clientX, clientY);

    if (clipboardState.mode === "cut") {
      setIconPositions((prev) => {
        const position = findFreeGridPosition(basePosition.x, basePosition.y, source.id, prev);
        return { ...prev, [source.id]: position };
      });
      setClipboardState(null);
      return source.id;
    }

    const cloneId = `${source.itemType || "shortcut"}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const clone = {
      ...source,
      id: cloneId,
      title: source.title.endsWith(" - Copy") ? source.title : `${source.title} - Copy`,
      system: false,
      parentId: null,
      createdAt: Date.now(),
    };

    setCustomItems((prev) => [...prev, clone]);
    setIconPositions((prev) => {
      const position = findFreeGridPosition(basePosition.x, basePosition.y, cloneId, prev);
      return { ...prev, [cloneId]: position };
    });

    return cloneId;
  }, [clipboardState, desktopItems, findFreeGridPosition, resolvePasteBasePosition]);

  const commitRenameItem = useCallback((id, nextTitle) => {
    const safeTitle = (nextTitle || "").trim();
    if (!safeTitle) {
      return;
    }

    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) {
      return;
    }

    if (item.system) {
      setRenamedSystemIcons((prev) => ({ ...prev, [id]: safeTitle }));
      return;
    }

    setCustomItems((prev) => prev.map((entry) => (
      entry.id === id ? { ...entry, title: safeTitle } : entry
    )));

    if (activeTextDocId === id) {
      setWindows((prev) => ({
        ...prev,
        textdoc: { ...prev.textdoc, title: safeTitle },
      }));
    }
  }, [desktopItems, activeTextDocId]);

  const moveItemToRecycleBin = useCallback((id, originalPosition = null) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) {
      return false;
    }

    if (item.system) {
      showProtectedDeleteAlert();
      return false;
    }

    const fallbackPosition = originalPosition || iconPositions[id] || getNextDesktopSlot();

    setRecycleBinItems((prev) => [
      ...prev.filter((entry) => entry.item.id !== id),
      {
        item: { ...item },
        originalPosition: fallbackPosition,
        deletedAt: Date.now(),
      },
    ]);

    setCustomItems((prev) => prev.filter((entry) => entry.id !== id));
    setIconPositions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    if (activeTextDocId === id) {
      setActiveTextDocId(null);
      setWindows((prev) => ({
        ...prev,
        textdoc: { ...prev.textdoc, isOpen: false },
      }));
    }

    if (clipboardState?.id === id) {
      setClipboardState(null);
    }

    return true;
  }, [activeTextDocId, clipboardState, desktopItems, getNextDesktopSlot, iconPositions, showProtectedDeleteAlert]);

  const deleteDesktopItem = useCallback((id) => moveItemToRecycleBin(id), [moveItemToRecycleBin]);

  const restoreRecycleBinItem = useCallback((id) => {
    const entry = recycleBinItems.find((candidate) => candidate.item.id === id);
    if (!entry) {
      return false;
    }

    setRecycleBinItems((prev) => prev.filter((candidate) => candidate.item.id !== id));
    setCustomItems((prev) => (
      prev.some((item) => item.id === id)
        ? prev
        : [...prev, { ...entry.item, system: false }]
    ));
    setIconPositions((prev) => {
      const anchor = entry.originalPosition || getNextDesktopSlot();
      const restoredPosition = findFreeGridPosition(anchor.x, anchor.y, id, prev);
      return { ...prev, [id]: restoredPosition };
    });

    return true;
  }, [findFreeGridPosition, getNextDesktopSlot, recycleBinItems]);

  const permanentlyDeleteRecycleBinItem = useCallback((id) => {
    setRecycleBinItems((prev) => prev.filter((entry) => entry.item.id !== id));
  }, []);

  const emptyRecycleBin = useCallback(() => {
    setRecycleBinItems([]);
  }, []);

  const updateTextContent = useCallback((id, content) => {
    setCustomItems((prev) => prev.map((item) => (
      item.id === id ? { ...item, content } : item
    )));
  }, []);

  const alignIconsToGrid = useCallback(() => {
    setIconPositions((prev) => {
      const ordered = [...getRootDesktopItems()].sort((a, b) => {
        const positionA = prev[a.id] || { x: 99999, y: 99999 };
        const positionB = prev[b.id] || { x: 99999, y: 99999 };
        if (positionA.x === positionB.x) {
          return positionA.y - positionB.y;
        }
        return positionA.x - positionB.x;
      });
      const next = { ...prev };
      let changed = false;

      ordered.forEach((item) => {
        const current = next[item.id] || getNextDesktopSlot();
        const aligned = findFreeGridPosition(current.x, current.y, item.id, next);
        const previous = prev[item.id];

        if (!previous || previous.x !== aligned.x || previous.y !== aligned.y) {
          next[item.id] = aligned;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [findFreeGridPosition, getNextDesktopSlot, getRootDesktopItems]);

  const pinTaskbarItem = useCallback((id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!canPinItemToTaskbar(item)) {
      return;
    }

    setPinnedTaskbarAppIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [desktopItems]);

  const unpinTaskbarItem = useCallback((id) => {
    setPinnedTaskbarAppIds((prev) => prev.filter((entryId) => entryId !== id));
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized, z: nextZ() },
    }));
  }, [nextZ]);

  const focusWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) {
        return prev;
      }

      const topZ = Object.values(prev).reduce((max, win) => Math.max(max, win.z), -Infinity);
      if (prev[id].z === topZ) {
        return prev;
      }

      return {
        ...prev,
        [id]: { ...prev[id], z: nextZ() },
      };
    });
  }, [nextZ]);

  const moveWindow = useCallback((id, x, y) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y, isMaximized: false },
    }));
  }, []);

  const resizeWindow = useCallback((id, x, y, w, h) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y, w, h, isMaximized: false },
    }));
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((id) => {
        next[id] = { ...next[id], isOpen: false, isMinimized: false, isMaximized: false };
      });
      return next;
    });
  }, []);

  const cascadeWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      let offset = 0;
      Object.keys(next).forEach((id) => {
        if (next[id].isOpen) {
          next[id] = { ...next[id], x: 100 + offset, y: 20 + offset, isMaximized: false, isMinimized: false, z: nextZ() };
          offset += 30;
        }
      });
      return next;
    });
  }, [nextZ]);

  const tileWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      const openIds = Object.keys(next).filter((id) => next[id].isOpen);
      const count = openIds.length;
      if (count === 0) {
        return next;
      }

      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      openIds.forEach((id, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        next[id] = {
          ...next[id],
          x: col * (800 / cols),
          y: row * (550 / rows),
          w: 800 / cols,
          h: 550 / rows,
          isMaximized: false,
          isMinimized: false,
          z: nextZ(),
        };
      });

      return next;
    });
  }, [nextZ]);

  const openWindows = useMemo(
    () => Object.values(windows).filter((win) => win.isOpen),
    [windows],
  );

  const activeWindowId = useMemo(
    () => openWindows.filter((win) => !win.isMinimized).sort((a, b) => b.z - a.z)[0]?.id,
    [openWindows],
  );

  const activateTaskbarEntry = useCallback((id) => {
    const win = windows[id];
    if (!win) {
      return;
    }

    if (!win.isOpen) {
      openWindow(id);
      return;
    }

    if (win.isMinimized) {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: false, z: nextZ() },
      }));
      return;
    }

    if (id === activeWindowId) {
      minimizeWindow(id);
      return;
    }

    focusWindow(id);
  }, [activeWindowId, focusWindow, minimizeWindow, nextZ, openWindow, windows]);

  const value = useMemo(() => ({
    systemAlert,
    setSystemAlert,
    settings: {
      clockFormat,
      setClockFormat,
      desktopColor,
      setDesktopColor,
      iconSizeMode,
      setIconSizeMode,
    },
    windowManager: {
      windows,
      openWindows,
      activeWindowId,
      selectedVideoId,
      pinnedTaskbarAppIds,
      openWindow,
      openVideoApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      moveWindow,
      resizeWindow,
      closeAllWindows,
      cascadeWindows,
      tileWindows,
      activateTaskbarEntry,
      pinTaskbarItem,
      unpinTaskbarItem,
      setSelectedVideoId,
    },
    fileSystem: {
      desktopItems,
      systemDesktopIcons,
      customItems,
      recycleBinItems,
      activeTextDoc,
      activeTextDocId,
      clipboardState,
      iconPositions,
      registerDesktopElement,
      rememberDesktopCursor,
      toDesktopPoint,
      toDesktopCursorPoint,
      normalizeIconPosition,
      getNextDesktopSlot,
      findFreeGridPosition,
      createFolder,
      createTextDocument,
      pasteDesktopItem,
      commitRenameItem,
      moveItemToRecycleBin,
      deleteDesktopItem,
      restoreRecycleBinItem,
      permanentlyDeleteRecycleBinItem,
      emptyRecycleBin,
      updateTextContent,
      alignIconsToGrid,
      openItem,
      setClipboardState,
      setActiveTextDocId,
      setIconPositions,
    },
  }), [
    systemAlert,
    clockFormat,
    desktopColor,
    iconSizeMode,
    windows,
    openWindows,
    activeWindowId,
    selectedVideoId,
    pinnedTaskbarAppIds,
    openWindow,
    openVideoApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    closeAllWindows,
    cascadeWindows,
    tileWindows,
    activateTaskbarEntry,
    pinTaskbarItem,
    unpinTaskbarItem,
    desktopItems,
    systemDesktopIcons,
    customItems,
    recycleBinItems,
    activeTextDoc,
    activeTextDocId,
    clipboardState,
    iconPositions,
    registerDesktopElement,
    rememberDesktopCursor,
    toDesktopPoint,
    toDesktopCursorPoint,
    normalizeIconPosition,
    getNextDesktopSlot,
    findFreeGridPosition,
    createFolder,
    createTextDocument,
    pasteDesktopItem,
    commitRenameItem,
    moveItemToRecycleBin,
    deleteDesktopItem,
    restoreRecycleBinItem,
    permanentlyDeleteRecycleBinItem,
    emptyRecycleBin,
    updateTextContent,
    alignIconsToGrid,
    openItem,
  ]);

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOSContext() {
  const value = useContext(OSContext);
  if (!value) {
    throw new Error("useOSContext must be used within OSProvider");
  }
  return value;
}
