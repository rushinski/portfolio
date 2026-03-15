"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import {
  DEFAULT_EXPLORER_STATE,
  DEFAULT_PINNED_TASKBAR_IDS,
  DEFAULT_SETTINGS,
  FILE_SIZE_LABELS,
  FILE_TYPE_LABELS,
  FULLSCREEN_WINDOW_IDS,
  ICON_VIEW_MODES,
  INITIAL_CUSTOM_ITEMS,
  INITIAL_ICON_POSITIONS,
  INITIAL_WINDOWS,
  SYSTEM_SPECS,
  WINDOW_MIN_HEIGHT,
  WINDOW_MIN_WIDTH,
  buildExplorerSystemItems,
  buildSystemDesktopIcons,
  canPinItemToTaskbar,
  clamp,
  snapIconToGrid,
} from "../constants";
import { VIDEO_LIBRARY, VIDEO_LIBRARY_BY_ID } from "../data";
import { Icons } from "../icons";

const OSContext = createContext(null);

const getItemTypeLabel = (itemType) => FILE_TYPE_LABELS[itemType] || "Item";
const getItemSizeLabel = (itemType) => FILE_SIZE_LABELS[itemType] || "0 bytes";
const createItemId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
const makeCopyTitle = (title) => (title.endsWith(" - Copy") ? title : `${title} - Copy`);

function enrichItem(item) {
  return {
    ...item,
    createdAt: item.createdAt || Date.now(),
    typeLabel: item.typeLabel || getItemTypeLabel(item.itemType),
    sizeLabel: item.sizeLabel || getItemSizeLabel(item.itemType),
  };
}

function normalizeRequest(firstArg, clientY) {
  if (typeof firstArg === "object" && firstArg !== null) {
    return firstArg;
  }

  return {
    clientX: firstArg,
    clientY,
  };
}

function formatUptime(uptimeMs) {
  const totalSeconds = Math.max(0, Math.floor(uptimeMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
}

function buildSystemReport(uptimeMs) {
  return [
    ...SYSTEM_SPECS,
    ["Uptime", formatUptime(uptimeMs)],
  ]
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function OSProvider({ children }) {
  const topZRef = useRef(100);
  const desktopElementRef = useRef(null);
  const lastDesktopCursorRef = useRef(null);
  const sessionStartedAtRef = useRef(Date.now());
  const audioContextRef = useRef(null);

  const [settingsState, setSettingsState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = JSON.parse(localStorage.getItem("jacobos-settings") || "null");
      if (saved && typeof saved === "object") return { ...DEFAULT_SETTINGS, ...saved };
    } catch {}
    return DEFAULT_SETTINGS;
  });
  const [uptimeMs, setUptimeMs] = useState(0);
  const [systemDialog, setSystemDialog] = useState(null);
  const [clipboardState, setClipboardState] = useState(null);
  const [renamedSystemIcons, setRenamedSystemIcons] = useState({});
  const [customItems, setCustomItems] = useState(() => INITIAL_CUSTOM_ITEMS.map((item) => enrichItem(item)));
  const [recycleBinItems, setRecycleBinItems] = useState([]);
  const [activeTextDocId, setActiveTextDocId] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(VIDEO_LIBRARY[0]?.id || null);
  const [pinnedTaskbarAppIds, setPinnedTaskbarAppIds] = useState(DEFAULT_PINNED_TASKBAR_IDS);
  const [iconPositions, setIconPositions] = useState(INITIAL_ICON_POSITIONS);
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [explorerState, setExplorerState] = useState(DEFAULT_EXPLORER_STATE);
  const iconPositionsRef = useRef(INITIAL_ICON_POSITIONS);

  iconPositionsRef.current = iconPositions;

  useEffect(() => {
    try {
      localStorage.setItem("jacobos-settings", JSON.stringify(settingsState));
    } catch {}
  }, [settingsState]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setUptimeMs(Date.now() - sessionStartedAtRef.current);
    }, 1000);

    setUptimeMs(Date.now() - sessionStartedAtRef.current);

    return () => window.clearInterval(intervalId);
  }, []);

  const allSettings = settingsState;

  const setClockFormat = useCallback((clockFormat) => {
    setSettingsState((prev) => ({ ...prev, clockFormat }));
  }, []);

  const setDesktopColor = useCallback((desktopColor) => {
    setSettingsState((prev) => ({ ...prev, desktopColor }));
  }, []);

  const setWallpaperPattern = useCallback((wallpaperPattern) => {
    setSettingsState((prev) => ({ ...prev, wallpaperPattern }));
  }, []);

  const setCrtEffectEnabled = useCallback((crtEffectEnabled) => {
    setSettingsState((prev) => ({ ...prev, crtEffectEnabled }));
  }, []);

  const setMasterSoundEnabled = useCallback((masterSoundEnabled) => {
    setSettingsState((prev) => ({ ...prev, masterSoundEnabled }));
  }, []);

  const setUiSoundsEnabled = useCallback((uiSoundsEnabled) => {
    setSettingsState((prev) => ({ ...prev, uiSoundsEnabled }));
  }, []);

  const setStartupSoundEnabled = useCallback((startupSoundEnabled) => {
    setSettingsState((prev) => ({ ...prev, startupSoundEnabled }));
  }, []);

  const setScreensaverType = useCallback((screensaverType) => {
    setSettingsState((prev) => ({ ...prev, screensaverType }));
  }, []);

  const setScreensaverTimeout = useCallback((screensaverTimeout) => {
    setSettingsState((prev) => ({ ...prev, screensaverTimeout }));
  }, []);

  const systemDesktopIcons = useMemo(
    () => buildSystemDesktopIcons(renamedSystemIcons),
    [renamedSystemIcons],
  );
  const explorerSystemItems = useMemo(
    () => buildExplorerSystemItems(),
    [],
  );

  const desktopItems = useMemo(
    () => [...systemDesktopIcons, ...customItems],
    [systemDesktopIcons, customItems],
  );
  const allFileSystemItems = useMemo(
    () => [...explorerSystemItems, ...desktopItems],
    [desktopItems, explorerSystemItems],
  );

  const itemsById = useMemo(
    () => new Map(allFileSystemItems.map((item) => [item.id, item])),
    [allFileSystemItems],
  );

  const activeTextDoc = useMemo(
    () => itemsById.get(activeTextDocId) || null,
    [itemsById, activeTextDocId],
  );

  const nextZ = useCallback(() => ++topZRef.current, []);

  const getDesktopBounds = useCallback(() => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    return {
      width: Math.max(WINDOW_MIN_WIDTH + 40, Math.floor(rect?.width ?? 1200)),
      height: Math.max(WINDOW_MIN_HEIGHT + 40, Math.floor(rect?.height ?? 700)),
    };
  }, []);

  const normalizeWindowRect = useCallback((id, rect) => {
    const bounds = getDesktopBounds();
    const baseWindow = INITIAL_WINDOWS[id] || INITIAL_WINDOWS.welcome;
    const width = clamp(
      Math.round(rect.w ?? baseWindow.w ?? WINDOW_MIN_WIDTH),
      WINDOW_MIN_WIDTH,
      Math.max(WINDOW_MIN_WIDTH, bounds.width),
    );
    const height = clamp(
      Math.round(rect.h ?? baseWindow.h ?? WINDOW_MIN_HEIGHT),
      WINDOW_MIN_HEIGHT,
      Math.max(WINDOW_MIN_HEIGHT, bounds.height),
    );
    const maxX = Math.max(0, bounds.width - width);
    const maxY = Math.max(0, bounds.height - height);

    return {
      ...rect,
      x: clamp(Math.round(rect.x ?? baseWindow.x ?? 0), 0, maxX),
      y: clamp(Math.round(rect.y ?? baseWindow.y ?? 0), 0, maxY),
      w: width,
      h: height,
    };
  }, [getDesktopBounds]);

  const centerWindowRect = useCallback((id, rect) => {
    const bounds = getDesktopBounds();
    const normalized = normalizeWindowRect(id, rect);

    return {
      ...normalized,
      x: clamp(Math.round((bounds.width - normalized.w) / 2), 0, Math.max(0, bounds.width - normalized.w)),
      y: clamp(Math.round((bounds.height - normalized.h) / 5), 0, Math.max(0, bounds.height - normalized.h)),
    };
  }, [getDesktopBounds, normalizeWindowRect]);

  const normalizeWindowsForDesktop = useCallback((currentWindows) => {
    let changed = false;
    const next = { ...currentWindows };

    Object.keys(next).forEach((id) => {
      const win = next[id];
      if (!win || win.isMaximized) {
        return;
      }

      const normalized = normalizeWindowRect(id, win);
      if (win.x !== normalized.x || win.y !== normalized.y || win.w !== normalized.w || win.h !== normalized.h) {
        next[id] = { ...win, ...normalized };
        changed = true;
      }
    });

    return changed ? next : currentWindows;
  }, [normalizeWindowRect]);

  const showAlertDialog = useCallback((message, options = {}) => {
    setSystemDialog({
      title: options.title || "JacobOS",
      message,
      details: options.details || null,
      variant: options.variant || "info",
      confirmLabel: options.confirmLabel || "OK",
      onConfirm: options.onConfirm,
    });
  }, []);

  const showConfirmDialog = useCallback((message, options = {}) => {
    setSystemDialog({
      title: options.title || "JacobOS",
      message,
      details: options.details || null,
      variant: options.variant || "warning",
      confirmLabel: options.confirmLabel || "Yes",
      cancelLabel: options.cancelLabel || "No",
      onConfirm: options.onConfirm,
    });
  }, []);

  const showSystemReport = useCallback(() => {
    setSystemDialog({
      title: "System Report",
      message: "JacobOS session diagnostics",
      details: buildSystemReport(Date.now() - sessionStartedAtRef.current),
      variant: "terminal",
      confirmLabel: "Close",
    });
  }, []);

  const closeDialog = useCallback(() => {
    setSystemDialog(null);
  }, []);

  const setSystemAlert = useCallback((message) => {
    if (!message) {
      closeDialog();
      return;
    }

    showAlertDialog(message, { title: "System Error", variant: "error" });
  }, [closeDialog, showAlertDialog]);

  const ensureAudioContext = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }

    return audioContextRef.current;
  }, []);

  const playToneSequence = useCallback((sequence) => {
    if (!allSettings.masterSoundEnabled) {
      return;
    }

    const ctx = ensureAudioContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;
    let cursor = now;

    sequence.forEach(({ frequency, duration, gain = 0.03, type = "square" }) => {
      const oscillator = ctx.createOscillator();
      const amp = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, cursor);
      amp.gain.setValueAtTime(0.0001, cursor);
      amp.gain.linearRampToValueAtTime(gain, cursor + 0.01);
      amp.gain.linearRampToValueAtTime(0.0001, cursor + duration);

      oscillator.connect(amp);
      amp.connect(ctx.destination);
      oscillator.start(cursor);
      oscillator.stop(cursor + duration + 0.02);

      cursor += duration + 0.02;
    });
  }, [allSettings.masterSoundEnabled, ensureAudioContext]);

  const playUiSound = useCallback((kind = "click") => {
    if (!allSettings.masterSoundEnabled || !allSettings.uiSoundsEnabled) {
      return;
    }

    const soundMap = {
      click: [
        { frequency: 780, duration: 0.03, gain: 0.025 },
        { frequency: 520, duration: 0.025, gain: 0.02 },
      ],
      open: [
        { frequency: 620, duration: 0.04, gain: 0.028 },
        { frequency: 860, duration: 0.05, gain: 0.024 },
      ],
      close: [
        { frequency: 760, duration: 0.035, gain: 0.026 },
        { frequency: 440, duration: 0.04, gain: 0.022 },
      ],
      minimize: [
        { frequency: 520, duration: 0.03, gain: 0.02 },
        { frequency: 360, duration: 0.05, gain: 0.018 },
      ],
    };

    playToneSequence(soundMap[kind] || soundMap.click);
  }, [allSettings.masterSoundEnabled, allSettings.uiSoundsEnabled, playToneSequence]);

  const playStartupSound = useCallback(() => {
    if (!allSettings.masterSoundEnabled || !allSettings.startupSoundEnabled) {
      return;
    }

    playToneSequence([
      { frequency: 392, duration: 0.05, gain: 0.026 },
      { frequency: 523, duration: 0.06, gain: 0.028 },
      { frequency: 659, duration: 0.09, gain: 0.024 },
    ]);
  }, [allSettings.masterSoundEnabled, allSettings.startupSoundEnabled, playToneSequence]);

  const registerDesktopElement = useCallback((node) => {
    desktopElementRef.current = node;
    if (!node) {
      return;
    }

    setWindows((prev) => normalizeWindowsForDesktop(prev));
  }, [normalizeWindowsForDesktop]);

  const showProtectedDeleteAlert = useCallback(() => {
    showAlertDialog(
      "You cannot delete this. These files are essential to JacobOS and cannot be removed.",
      {
        title: "Access Denied",
        variant: "error",
      },
    );
  }, [showAlertDialog]);

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

  const getItemsInFolder = useCallback((folderId = null) => (
    allFileSystemItems.filter((item) => (item.parentId ?? null) === (folderId ?? null))
  ), [allFileSystemItems]);

  const getRootDesktopItems = useCallback(
    () => desktopItems.filter((item) => (item.parentId ?? null) === null),
    [desktopItems],
  );

  const getIconView = useCallback((mode = allSettings.iconSizeMode) => (
    ICON_VIEW_MODES[mode] || ICON_VIEW_MODES.medium
  ), [allSettings.iconSizeMode]);

  const getIconGridBounds = useCallback((mode = allSettings.iconSizeMode) => {
    const rect = desktopElementRef.current?.getBoundingClientRect();
    const view = getIconView(mode);
    const maxWidth = rect?.width ?? 1200;
    const maxHeight = rect?.height ?? 700;

    return {
      view,
      maxWidth,
      maxHeight,
      maxCol: Math.max(0, Math.floor((maxWidth - 12 - view.tileW) / view.cellX)),
      maxRow: Math.max(0, Math.floor((maxHeight - 8 - view.tileH) / view.cellY)),
    };
  }, [allSettings.iconSizeMode, getIconView]);

  const normalizeIconPositionForMode = useCallback((x, y, mode = allSettings.iconSizeMode) => {
    const { view, maxCol, maxRow } = getIconGridBounds(mode);
    const snapped = snapIconToGrid(x, y, mode, 12, 8);
    const col = clamp(Math.round((snapped.x - 12) / view.cellX), 0, maxCol);
    const row = clamp(Math.round((snapped.y - 8) / view.cellY), 0, maxRow);

    return {
      x: 12 + col * view.cellX,
      y: 8 + row * view.cellY,
    };
  }, [allSettings.iconSizeMode, getIconGridBounds]);

  const normalizeIconPosition = useCallback((x, y) => (
    normalizeIconPositionForMode(x, y, allSettings.iconSizeMode)
  ), [allSettings.iconSizeMode, normalizeIconPositionForMode]);

  const getNextDesktopSlot = useCallback((mode = allSettings.iconSizeMode) => {
    const { view, maxHeight } = getIconGridBounds(mode);
    const rows = Math.max(1, Math.floor((maxHeight - 8 - view.tileH) / view.cellY) + 1);
    const index = getRootDesktopItems().length;
    const col = Math.floor(index / rows);
    const row = index % rows;

    return normalizeIconPositionForMode(12 + col * view.cellX, 8 + row * view.cellY, mode);
  }, [allSettings.iconSizeMode, getIconGridBounds, getRootDesktopItems, normalizeIconPositionForMode]);

  const findFreeGridPositionForMode = useCallback((targetX, targetY, mode = allSettings.iconSizeMode, excludeId = null, positions = iconPositionsRef.current) => {
    const { view, maxCol, maxRow } = getIconGridBounds(mode);
    const desired = normalizeIconPositionForMode(targetX, targetY, mode);
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
  }, [allSettings.iconSizeMode, getIconGridBounds, getRootDesktopItems, normalizeIconPositionForMode]);

  const findFreeGridPosition = useCallback((targetX, targetY, excludeId = null, positions = iconPositionsRef.current) => (
    findFreeGridPositionForMode(targetX, targetY, allSettings.iconSizeMode, excludeId, positions)
  ), [allSettings.iconSizeMode, findFreeGridPositionForMode]);

  const setIconSizeMode = useCallback((nextIconSizeMode) => {
    if (!ICON_VIEW_MODES[nextIconSizeMode] || nextIconSizeMode === allSettings.iconSizeMode) {
      return;
    }

    const previousView = getIconView(allSettings.iconSizeMode);
    const nextView = getIconView(nextIconSizeMode);

    setIconPositions((prev) => {
      const ordered = [...getRootDesktopItems()].sort((a, b) => {
        const positionA = prev[a.id] || INITIAL_ICON_POSITIONS[a.id] || { x: 99999, y: 99999 };
        const positionB = prev[b.id] || INITIAL_ICON_POSITIONS[b.id] || { x: 99999, y: 99999 };
        if (positionA.x === positionB.x) {
          return positionA.y - positionB.y;
        }
        return positionA.x - positionB.x;
      });
      const next = { ...prev };
      const assignedPositions = {};

      ordered.forEach((item) => {
        const current = prev[item.id] || INITIAL_ICON_POSITIONS[item.id] || { x: 12, y: 8 };
        const col = Math.max(0, Math.round((current.x - 12) / previousView.cellX));
        const row = Math.max(0, Math.round((current.y - 8) / previousView.cellY));
        const targetX = 12 + col * nextView.cellX;
        const targetY = 8 + row * nextView.cellY;
        const mappedPosition = findFreeGridPositionForMode(targetX, targetY, nextIconSizeMode, item.id, assignedPositions);
        assignedPositions[item.id] = mappedPosition;
        next[item.id] = mappedPosition;
      });

      return next;
    });

    setSettingsState((prev) => ({ ...prev, iconSizeMode: nextIconSizeMode }));
  }, [allSettings.iconSizeMode, findFreeGridPositionForMode, getIconView, getRootDesktopItems]);

  const getItemById = useCallback((id) => itemsById.get(id) || null, [itemsById]);

  const isContainerItem = useCallback((itemOrId) => {
    const item = typeof itemOrId === "string" ? itemsById.get(itemOrId) : itemOrId;
    return !!item && (item.isContainer || item.itemType === "folder");
  }, [itemsById]);

  const canCreateInFolder = useCallback((folderId = null) => {
    if (folderId === null) {
      return true;
    }

    const folder = itemsById.get(folderId);
    return !!folder && isContainerItem(folder) && !folder.readOnly;
  }, [isContainerItem, itemsById]);

  const canRenameItem = useCallback((itemOrId) => {
    const item = typeof itemOrId === "string" ? itemsById.get(itemOrId) : itemOrId;
    return !!item && !item.explorerOnly;
  }, [itemsById]);

  const canDeleteItem = useCallback((itemOrId) => {
    const item = typeof itemOrId === "string" ? itemsById.get(itemOrId) : itemOrId;
    return !!item && !item.system;
  }, [itemsById]);

  const getFolderPathSegments = useCallback((folderId = null) => {
    const segments = [{ id: null, title: "Desktop" }];

    if (folderId === null) {
      return segments;
    }

    const chain = [];
    let currentId = folderId;

    while (currentId !== null) {
      const item = itemsById.get(currentId);
      if (!item) {
        break;
      }

      chain.unshift({ id: item.id, title: item.title });
      currentId = item.parentId ?? null;
    }

    return [...segments, ...chain];
  }, [itemsById]);

  const getItemLocationLabel = useCallback((itemOrId) => {
    const item = typeof itemOrId === "string" ? itemsById.get(itemOrId) : itemOrId;
    if (!item) {
      return "Desktop";
    }

    return getFolderPathSegments(item.parentId ?? null)
      .map((segment) => segment.title)
      .join(" > ");
  }, [getFolderPathSegments, itemsById]);

  const getItemPathLabel = useCallback((itemOrId) => {
    const item = typeof itemOrId === "string" ? itemsById.get(itemOrId) : itemOrId;
    if (!item) {
      return "Desktop";
    }

    return [...getFolderPathSegments(item.parentId ?? null).map((segment) => segment.title), item.title].join(" > ");
  }, [getFolderPathSegments, itemsById]);

  const getItemProperties = useCallback((itemOrId) => {
    const item = typeof itemOrId === "string" ? itemsById.get(itemOrId) : itemOrId;
    if (!item) {
      return null;
    }

    return {
      id: item.id,
      name: item.title,
      type: item.typeLabel || getItemTypeLabel(item.itemType),
      createdAt: item.createdAt || null,
      size: item.sizeLabel || getItemSizeLabel(item.itemType),
      location: getItemLocationLabel(item),
    };
  }, [getItemLocationLabel, itemsById]);

  const getDescendantIds = useCallback((id) => {
    const descendants = [];
    const visit = (parentId) => {
      customItems
        .filter((item) => item.parentId === parentId)
        .forEach((item) => {
          descendants.push(item.id);
          visit(item.id);
        });
    };

    visit(id);
    return descendants;
  }, [customItems]);

  const getExplorerTitle = useCallback((folderId = null) => {
    if (folderId === null) {
      return "File Explorer - Desktop";
    }

    return `File Explorer - ${itemsById.get(folderId)?.title || "Folder"}`;
  }, [itemsById]);

  const updateExplorerState = useCallback((updater) => {
    setExplorerState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return { ...prev, ...next };
    });
  }, []);

  const syncExplorerWindowTitle = useCallback((folderId) => {
    setWindows((prev) => {
      if (!prev.explorer) {
        return prev;
      }

      const nextTitle = getExplorerTitle(folderId);
      if (prev.explorer.title === nextTitle) {
        return prev;
      }

      return {
        ...prev,
        explorer: {
          ...prev.explorer,
          title: nextTitle,
        },
      };
    });
  }, [getExplorerTitle]);

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
        const welcomeWindow = centerWindowRect(id, {
          ...INITIAL_WINDOWS.welcome,
          ...openedWindow,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
        });
        return {
          ...prev,
          [id]: welcomeWindow,
        };
      }

      if (id === "explorer") {
        const explorerWindow = openedWindow.isMaximized
          ? openedWindow
          : normalizeWindowRect("explorer", openedWindow);
        return {
          ...prev,
          explorer: {
            ...explorerWindow,
            title: getExplorerTitle(explorerState.currentFolderId),
          },
        };
      }

      const normalizedWindow = openedWindow.isMaximized
        ? openedWindow
        : normalizeWindowRect(id, openedWindow);

      return {
        ...prev,
        [id]: normalizedWindow,
      };
    });
    playUiSound("open");
  }, [centerWindowRect, explorerState.currentFolderId, getExplorerTitle, nextZ, normalizeWindowRect, playUiSound]);

  const openVideoApp = useCallback((videoId = null) => {
    if (videoId && VIDEO_LIBRARY_BY_ID[videoId]) {
      setSelectedVideoId(videoId);
    }
    openWindow("videos");
  }, [openWindow]);

  const openFolderInExplorer = useCallback((folderId = null, options = {}) => {
    setExplorerState((prev) => ({
      ...prev,
      currentFolderId: folderId,
      navStack: options.preserveHistory ? prev.navStack : [],
      forwardStack: options.preserveHistory ? prev.forwardStack : [],
      selectedItemId: null,
      searchQuery: options.preserveSearch ? prev.searchQuery : "",
    }));

    setWindows((prev) => {
      const explorerWindow = {
        ...prev.explorer,
        title: getExplorerTitle(folderId),
        isOpen: true,
        isMinimized: false,
        z: nextZ(),
      };

      return {
        ...prev,
        explorer: explorerWindow.isMaximized
          ? explorerWindow
          : normalizeWindowRect("explorer", explorerWindow),
      };
    });

    playUiSound("open");
  }, [getExplorerTitle, nextZ, normalizeWindowRect, playUiSound]);

  const explorerNavigateTo = useCallback((folderId) => {
    setExplorerState((prev) => ({
      ...prev,
      navStack: [...prev.navStack, prev.currentFolderId],
      forwardStack: [],
      currentFolderId: folderId,
      selectedItemId: null,
      searchQuery: "",
    }));
    syncExplorerWindowTitle(folderId);
  }, [syncExplorerWindowTitle]);

  const explorerGoBack = useCallback(() => {
    setExplorerState((prev) => {
      if (prev.navStack.length === 0) {
        return prev;
      }

      const previousFolder = prev.navStack[prev.navStack.length - 1];
      syncExplorerWindowTitle(previousFolder);

      return {
        ...prev,
        currentFolderId: previousFolder,
        navStack: prev.navStack.slice(0, -1),
        forwardStack: [...prev.forwardStack, prev.currentFolderId],
        selectedItemId: null,
      };
    });
  }, [syncExplorerWindowTitle]);

  const explorerGoForward = useCallback(() => {
    setExplorerState((prev) => {
      if (prev.forwardStack.length === 0) {
        return prev;
      }

      const nextFolder = prev.forwardStack[prev.forwardStack.length - 1];
      syncExplorerWindowTitle(nextFolder);

      return {
        ...prev,
        currentFolderId: nextFolder,
        navStack: [...prev.navStack, prev.currentFolderId],
        forwardStack: prev.forwardStack.slice(0, -1),
        selectedItemId: null,
      };
    });
  }, [syncExplorerWindowTitle]);

  const explorerGoUp = useCallback(() => {
    const currentFolder = itemsById.get(explorerState.currentFolderId);
    explorerNavigateTo(currentFolder?.parentId ?? null);
  }, [explorerNavigateTo, explorerState.currentFolderId, itemsById]);

  const setExplorerViewMode = useCallback((viewMode) => {
    updateExplorerState({ viewMode });
  }, [updateExplorerState]);

  const setExplorerSidebarWidth = useCallback((sidebarWidth) => {
    updateExplorerState({ sidebarWidth: clamp(sidebarWidth, 120, 320) });
  }, [updateExplorerState]);

  const setExplorerSearchQuery = useCallback((searchQuery) => {
    updateExplorerState({ searchQuery });
  }, [updateExplorerState]);

  const setExplorerSelectedItemId = useCallback((selectedItemId) => {
    updateExplorerState({ selectedItemId });
  }, [updateExplorerState]);

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
      playUiSound("open");
      return;
    }

    if (isContainerItem(item)) {
      openFolderInExplorer(item.id);
      return;
    }

    if (item.windowId) {
      openWindow(item.windowId);
    }
  }, [isContainerItem, nextZ, openFolderInExplorer, openWindow, playUiSound]);

  const createItem = useCallback((itemType, request = {}) => {
    const { clientX, clientY, parentId = null, title } = request;
    if (!canCreateInFolder(parentId)) {
      showAlertDialog("You cannot create items in this location.", {
        title: "File Explorer",
        variant: "warning",
      });
      return null;
    }

    const id = createItemId(itemType);
    const createdAt = Date.now();
    const basePosition = parentId === null
      ? (
          typeof clientX === "number" && typeof clientY === "number"
            ? normalizeIconPosition(toDesktopPoint(clientX, clientY).x, toDesktopPoint(clientX, clientY).y)
            : getNextDesktopSlot()
        )
      : null;

    const newItem = enrichItem(
      itemType === "folder"
        ? {
            id,
            title: title || "New Folder",
            glyph: Icons.folder,
            windowId: "explorer",
            itemType: "folder",
            system: false,
            content: "",
            parentId,
            createdAt,
          }
        : {
            id,
            title: title || "New Text Document.txt",
            glyph: Icons.file,
            windowId: "textdoc",
            itemType: "text",
            system: false,
            content: "",
            parentId,
            createdAt,
          },
    );

    setCustomItems((prev) => [...prev, newItem]);

    if (parentId === null && basePosition) {
      setIconPositions((prev) => {
        const position = findFreeGridPosition(basePosition.x, basePosition.y, id, prev);
        return { ...prev, [id]: position };
      });
    }

    playUiSound("click");
    return id;
  }, [canCreateInFolder, findFreeGridPosition, getNextDesktopSlot, normalizeIconPosition, playUiSound, showAlertDialog, toDesktopPoint]);

  const createFolder = useCallback((firstArg, clientY) => {
    const request = normalizeRequest(firstArg, clientY);
    return createItem("folder", request);
  }, [createItem]);

  const createTextDocument = useCallback((firstArg, clientY) => {
    const request = normalizeRequest(firstArg, clientY);
    return createItem("text", request);
  }, [createItem]);

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

  const moveItemToParent = useCallback((id, targetParentId = null, options = {}) => {
    const item = itemsById.get(id);
    if (!item || item.system) {
      return false;
    }

    if (!canCreateInFolder(targetParentId)) {
      return false;
    }

    if (targetParentId === id) {
      return false;
    }

    if (item.itemType === "folder" && targetParentId !== null) {
      let cursor = targetParentId;
      while (cursor !== null) {
        if (cursor === id) {
          return false;
        }
        cursor = itemsById.get(cursor)?.parentId ?? null;
      }
    }

    setCustomItems((prev) => prev.map((entry) => (
      entry.id === id ? enrichItem({ ...entry, parentId: targetParentId }) : entry
    )));

    setIconPositions((prev) => {
      const next = { ...prev };

      if (targetParentId !== null) {
        delete next[id];
        return next;
      }

      const anchor = options.position
        || (
          typeof options.clientX === "number" && typeof options.clientY === "number"
            ? resolvePasteBasePosition(options.clientX, options.clientY)
            : getNextDesktopSlot()
        );
      next[id] = findFreeGridPosition(anchor.x, anchor.y, id, prev);
      return next;
    });

    return true;
  }, [canCreateInFolder, findFreeGridPosition, getNextDesktopSlot, itemsById, resolvePasteBasePosition]);

  const pasteItem = useCallback((firstArg, clientY) => {
    if (!clipboardState) {
      return null;
    }

    const request = normalizeRequest(firstArg, clientY);
    const { targetParentId = null, clientX, clientY: pointerY } = request;
    const source = itemsById.get(clipboardState.id);
    if (!source) {
      return null;
    }

    if (source.system) {
      return null;
    }

    if (!canCreateInFolder(targetParentId)) {
      showAlertDialog("You cannot paste items into this location.", {
        title: "File Explorer",
        variant: "warning",
      });
      return null;
    }

    const basePosition = targetParentId === null ? resolvePasteBasePosition(clientX, pointerY) : null;

    if (clipboardState.mode === "cut") {
      const moved = moveItemToParent(source.id, targetParentId, {
        position: basePosition,
        clientX,
        clientY: pointerY,
      });
      if (moved) {
        setClipboardState(null);
        playUiSound("click");
        return source.id;
      }
      return null;
    }

    const cloneId = createItemId(source.itemType || "shortcut");
    const clone = enrichItem({
      ...source,
      id: cloneId,
      title: makeCopyTitle(source.title),
      system: false,
      parentId: targetParentId,
      createdAt: Date.now(),
    });

    setCustomItems((prev) => [...prev, clone]);

    if (targetParentId === null && basePosition) {
      setIconPositions((prev) => {
        const position = findFreeGridPosition(basePosition.x, basePosition.y, cloneId, prev);
        return { ...prev, [cloneId]: position };
      });
    }

    playUiSound("click");
    return cloneId;
  }, [canCreateInFolder, clipboardState, findFreeGridPosition, itemsById, moveItemToParent, playUiSound, resolvePasteBasePosition, showAlertDialog]);

  const pasteDesktopItem = useCallback((firstArg, clientY) => {
    const request = normalizeRequest(firstArg, clientY);
    return pasteItem({ ...request, targetParentId: null });
  }, [pasteItem]);

  const commitRenameItem = useCallback((id, nextTitle) => {
    const safeTitle = (nextTitle || "").trim();
    if (!safeTitle) {
      return;
    }

    const item = itemsById.get(id);
    if (!item) {
      return;
    }

    if (item.system) {
      if (item.explorerOnly) {
        return;
      }
      setRenamedSystemIcons((prev) => ({ ...prev, [id]: safeTitle }));
      return;
    }

    setCustomItems((prev) => prev.map((entry) => (
      entry.id === id ? enrichItem({ ...entry, title: safeTitle }) : entry
    )));

    if (activeTextDocId === id) {
      setWindows((prev) => ({
        ...prev,
        textdoc: { ...prev.textdoc, title: safeTitle },
      }));
    }

    if (explorerState.currentFolderId === id) {
      syncExplorerWindowTitle(id);
    }
  }, [activeTextDocId, explorerState.currentFolderId, itemsById, syncExplorerWindowTitle]);

  const moveItemToRecycleBin = useCallback((id, originalPosition = null) => {
    const item = itemsById.get(id);
    if (!item) {
      return false;
    }

    if (item.system) {
      showProtectedDeleteAlert();
      return false;
    }

    const descendantIds = getDescendantIds(id);
    const descendantSet = new Set(descendantIds);
    const descendants = customItems
      .filter((entry) => descendantSet.has(entry.id))
      .map((entry) => ({ ...entry }));
    const fallbackPosition = originalPosition || iconPositions[id] || getNextDesktopSlot();

    setRecycleBinItems((prev) => [
      ...prev.filter((entry) => entry.item.id !== id),
      {
        item: { ...item },
        descendants,
        originalParentId: item.parentId ?? null,
        originalPath: getItemLocationLabel(item),
        originalPosition: fallbackPosition,
        deletedAt: Date.now(),
        sizeLabel: item.sizeLabel || getItemSizeLabel(item.itemType),
      },
    ]);

    setCustomItems((prev) => prev.filter((entry) => entry.id !== id && !descendantSet.has(entry.id)));
    setIconPositions((prev) => {
      const next = { ...prev };
      delete next[id];
      descendantIds.forEach((descendantId) => delete next[descendantId]);
      return next;
    });

    if (activeTextDocId === id || descendantSet.has(activeTextDocId)) {
      setActiveTextDocId(null);
      setWindows((prev) => ({
        ...prev,
        textdoc: { ...prev.textdoc, isOpen: false },
      }));
    }

    if (clipboardState?.id === id || descendantSet.has(clipboardState?.id)) {
      setClipboardState(null);
    }

    if (explorerState.currentFolderId === id || descendantSet.has(explorerState.currentFolderId)) {
      updateExplorerState({
        currentFolderId: null,
        navStack: [],
        forwardStack: [],
        selectedItemId: null,
      });
      syncExplorerWindowTitle(null);
    }

    playUiSound("close");
    return true;
  }, [
    activeTextDocId,
    clipboardState,
    customItems,
    explorerState.currentFolderId,
    getDescendantIds,
    getItemLocationLabel,
    getNextDesktopSlot,
    iconPositions,
    itemsById,
    playUiSound,
    showProtectedDeleteAlert,
    syncExplorerWindowTitle,
    updateExplorerState,
  ]);

  const deleteDesktopItem = useCallback((id) => moveItemToRecycleBin(id), [moveItemToRecycleBin]);

  const restoreRecycleBinItem = useCallback((id) => {
    const entry = recycleBinItems.find((candidate) => candidate.item.id === id);
    if (!entry) {
      return false;
    }

    const requestedParentId = entry.originalParentId ?? null;
    const restoreParentId = requestedParentId !== null && !itemsById.has(requestedParentId)
      ? null
      : requestedParentId;

    if (requestedParentId !== null && restoreParentId === null) {
      showAlertDialog("Original location not found. Item restored to Desktop.", {
        title: "Restore Item",
        variant: "warning",
      });
    }

    const restoredRoot = enrichItem({
      ...entry.item,
      system: false,
      parentId: restoreParentId,
    });

    setRecycleBinItems((prev) => prev.filter((candidate) => candidate.item.id !== id));
    setCustomItems((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const restoredItems = [restoredRoot, ...(entry.descendants || []).map((item) => enrichItem({ ...item, system: false }))];
      return [
        ...prev,
        ...restoredItems.filter((item) => !existingIds.has(item.id)),
      ];
    });

    if (restoreParentId === null) {
      setIconPositions((prev) => {
        const anchor = entry.originalPosition || getNextDesktopSlot();
        const restoredPosition = findFreeGridPosition(anchor.x, anchor.y, id, prev);
        return { ...prev, [id]: restoredPosition };
      });
    }

    playUiSound("open");
    return true;
  }, [findFreeGridPosition, getNextDesktopSlot, itemsById, playUiSound, recycleBinItems, showAlertDialog]);

  const permanentlyDeleteRecycleBinItem = useCallback((id) => {
    if (!recycleBinItems.some((entry) => entry.item.id === id)) {
      return false;
    }

    setRecycleBinItems((prev) => prev.filter((entry) => entry.item.id !== id));
    playUiSound("click");
    return true;
  }, [playUiSound, recycleBinItems]);

  const emptyRecycleBin = useCallback(() => {
    if (recycleBinItems.length === 0) {
      return false;
    }

    setRecycleBinItems([]);
    playUiSound("close");
    return true;
  }, [playUiSound, recycleBinItems.length]);

  const updateTextContent = useCallback((id, content) => {
    setCustomItems((prev) => prev.map((item) => (
      item.id === id ? enrichItem({ ...item, content }) : item
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
    const item = itemsById.get(id);
    if (!canPinItemToTaskbar(item)) {
      return;
    }

    setPinnedTaskbarAppIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [itemsById]);

  const unpinTaskbarItem = useCallback((id) => {
    setPinnedTaskbarAppIds((prev) => prev.filter((entryId) => entryId !== id));
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
    }));
    playUiSound("close");
  }, [playUiSound]);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    playUiSound("minimize");
  }, [playUiSound]);

  const maximizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const current = prev[id];
      if (!current) {
        return prev;
      }

      if (current.isMaximized) {
        const restored = current.preMaximizeRect
          ? normalizeWindowRect(id, { ...current, ...current.preMaximizeRect })
          : normalizeWindowRect(id, current);
        return {
          ...prev,
          [id]: { ...current, isMaximized: false, ...restored, preMaximizeRect: undefined, z: nextZ() },
        };
      }

      return {
        ...prev,
        [id]: {
          ...current,
          isMaximized: true,
          preMaximizeRect: { x: current.x, y: current.y, w: current.w, h: current.h },
          z: nextZ(),
        },
      };
    });
    playUiSound("click");
  }, [nextZ, normalizeWindowRect, playUiSound]);

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
    setWindows((prev) => {
      const current = prev[id];
      if (!current) {
        return prev;
      }

      return {
        ...prev,
        [id]: normalizeWindowRect(id, { ...current, x, y, isMaximized: false }),
      };
    });
  }, [normalizeWindowRect]);

  const resizeWindow = useCallback((id, x, y, w, h) => {
    setWindows((prev) => {
      const current = prev[id];
      if (!current) {
        return prev;
      }

      return {
        ...prev,
        [id]: normalizeWindowRect(id, { ...current, x, y, w, h, isMaximized: false }),
      };
    });
  }, [normalizeWindowRect]);

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
    const bounds = getDesktopBounds();
    setWindows((prev) => {
      const next = { ...prev };
      let offset = 0;
      Object.keys(next).forEach((id) => {
        if (next[id].isOpen) {
          const cascadedWindow = normalizeWindowRect(id, {
            ...next[id],
            x: 32 + offset,
            y: 24 + offset,
            w: Math.min(next[id].w ?? INITIAL_WINDOWS[id]?.w ?? 760, bounds.width),
            h: Math.min(next[id].h ?? INITIAL_WINDOWS[id]?.h ?? 520, bounds.height),
            isMaximized: false,
            isMinimized: false,
            z: nextZ(),
          });
          next[id] = { ...next[id], ...cascadedWindow };
          offset = (offset + 28) % 168;
        }
      });
      return next;
    });
  }, [getDesktopBounds, nextZ, normalizeWindowRect]);

  const tileWindows = useCallback(() => {
    const bounds = getDesktopBounds();
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
        const x = Math.floor((col * bounds.width) / cols);
        const y = Math.floor((row * bounds.height) / rows);
        const nextX = Math.max(0, x);
        const nextY = Math.max(0, y);
        next[id] = {
          ...next[id],
          x: nextX,
          y: nextY,
          w: Math.max(1, Math.floor(((col + 1) * bounds.width) / cols) - nextX),
          h: Math.max(1, Math.floor(((row + 1) * bounds.height) / rows) - nextY),
          isMaximized: false,
          isMinimized: false,
          z: nextZ(),
        };
      });

      return next;
    });
  }, [getDesktopBounds, nextZ]);

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
      playUiSound("open");
      return;
    }

    if (id === activeWindowId) {
      minimizeWindow(id);
      return;
    }

    focusWindow(id);
  }, [activeWindowId, focusWindow, minimizeWindow, nextZ, openWindow, playUiSound, windows]);

  useEffect(() => {
    syncExplorerWindowTitle(explorerState.currentFolderId);
  }, [explorerState.currentFolderId, desktopItems, syncExplorerWindowTitle]);

  const value = useMemo(() => ({
    systemAlert: systemDialog?.message || "",
    setSystemAlert,
    dialogs: {
      dialog: systemDialog,
      showAlertDialog,
      showConfirmDialog,
      showSystemReport,
      closeDialog,
    },
    settings: {
      ...allSettings,
      setClockFormat,
      setDesktopColor,
      setIconSizeMode,
      setWallpaperPattern,
      setCrtEffectEnabled,
      setMasterSoundEnabled,
      setUiSoundsEnabled,
      setStartupSoundEnabled,
      setScreensaverType,
      setScreensaverTimeout,
    },
    system: {
      sessionStartedAt: sessionStartedAtRef.current,
      uptimeMs,
      formattedUptime: formatUptime(uptimeMs),
      specs: SYSTEM_SPECS,
      systemReport: buildSystemReport(uptimeMs),
    },
    audio: {
      playToneSequence,
      playUiSound,
      playStartupSound,
    },
    windowManager: {
      windows,
      openWindows,
      activeWindowId,
      selectedVideoId,
      pinnedTaskbarAppIds,
      explorerState,
      openWindow,
      openVideoApp,
      openFolderInExplorer,
      explorerNavigateTo,
      explorerGoBack,
      explorerGoForward,
      explorerGoUp,
      setExplorerViewMode,
      setExplorerSidebarWidth,
      setExplorerSearchQuery,
      setExplorerSelectedItemId,
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
      explorerSystemItems,
      allFileSystemItems,
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
      getItemById,
      getItemsInFolder,
      getFolderPathSegments,
      getItemLocationLabel,
      getItemPathLabel,
      getItemProperties,
      isContainerItem,
      canCreateInFolder,
      canRenameItem,
      canDeleteItem,
      createFolder,
      createTextDocument,
      pasteItem,
      pasteDesktopItem,
      commitRenameItem,
      moveItemToParent,
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
    systemDialog,
    setSystemAlert,
    showAlertDialog,
    showConfirmDialog,
    showSystemReport,
    closeDialog,
    allSettings,
    setClockFormat,
    setDesktopColor,
    setIconSizeMode,
    setWallpaperPattern,
    setCrtEffectEnabled,
    setMasterSoundEnabled,
    setUiSoundsEnabled,
    setStartupSoundEnabled,
    setScreensaverType,
    setScreensaverTimeout,
    uptimeMs,
    playToneSequence,
    playUiSound,
    playStartupSound,
    windows,
    openWindows,
    activeWindowId,
    selectedVideoId,
    pinnedTaskbarAppIds,
    explorerState,
    openWindow,
    openVideoApp,
    openFolderInExplorer,
    explorerNavigateTo,
    explorerGoBack,
    explorerGoForward,
    explorerGoUp,
    setExplorerViewMode,
    setExplorerSidebarWidth,
    setExplorerSearchQuery,
    setExplorerSelectedItemId,
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
    explorerSystemItems,
    allFileSystemItems,
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
    getItemById,
    getItemsInFolder,
    getFolderPathSegments,
    getItemLocationLabel,
    getItemPathLabel,
    getItemProperties,
    isContainerItem,
    canCreateInFolder,
    canRenameItem,
    canDeleteItem,
    createFolder,
    createTextDocument,
    pasteItem,
    pasteDesktopItem,
    commitRenameItem,
    moveItemToParent,
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
