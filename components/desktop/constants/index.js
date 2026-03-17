"use client";

// Barrel re-export — import from here or directly from sub-files:
//   constants/config.js     — GRID, snap, clamp, DEFAULT_SETTINGS, ICON_VIEW_MODES, etc.
//   constants/layout.js     — INITIAL_WINDOWS, INITIAL_ICON_POSITIONS
//   constants/desktop.js    — buildSystemDesktopIcons, buildExplorerSystemItems, canPinItemToTaskbar, snapIconToGrid
//   constants/filesystem.js — INITIAL_CUSTOM_ITEMS (the virtual file system)

export {
  GRID,
  snap,
  clamp,
  WINDOW_MIN_WIDTH,
  WINDOW_MIN_HEIGHT,
  ICON_VIEW_MODES,
  MENU_TEXT_COLOR,
  DRAG_ITEM_MIME,
  FULLSCREEN_WINDOW_IDS,
  DEFAULT_PINNED_TASKBAR_IDS,
  DEFAULT_SETTINGS,
  DEFAULT_EXPLORER_STATE,
  WALLPAPER_PATTERNS,
  WALLPAPER_PATTERN_BACKGROUNDS,
  SCREENSAVER_OPTIONS,
  SCREENSAVER_TIMEOUT_OPTIONS,
  SYSTEM_SPECS,
  FILE_TYPE_LABELS,
  FILE_SIZE_LABELS,
  DESKTOP_COLORS,
} from "./config";

export { INITIAL_ICON_POSITIONS, INITIAL_WINDOWS } from "./layout";

export {
  canPinItemToTaskbar,
  snapIconToGrid,
  buildSystemDesktopIcons,
  buildExplorerSystemItems,
} from "./desktop";

export { INITIAL_CUSTOM_ITEMS } from "./filesystem";
