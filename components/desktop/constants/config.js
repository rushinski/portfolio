"use client";

export const GRID = 1;
export const snap = (n) => Math.round(n / GRID) * GRID;
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
export const WINDOW_MIN_WIDTH = 280;
export const WINDOW_MIN_HEIGHT = 180;

export const ICON_VIEW_MODES = {
  small: {
    tileW: 68,
    tileH: 80,
    glyphScale: 0.85,
    labelSize: 10,
    cellX: 78,
    cellY: 94,
    maxLabel: 72,
  },
  medium: {
    tileW: 76,
    tileH: 90,
    glyphScale: 1,
    labelSize: 11,
    cellX: 90,
    cellY: 102,
    maxLabel: 84,
  },
  large: {
    tileW: 94,
    tileH: 112,
    glyphScale: 1.2,
    labelSize: 12,
    cellX: 108,
    cellY: 126,
    maxLabel: 100,
  },
};

export const MENU_TEXT_COLOR = "#162133";
export const DRAG_ITEM_MIME = "application/x-jacobos-item-id";
export const FULLSCREEN_WINDOW_IDS = new Set([
  "experience",
  "projects",
  "videos",
  "contact",
  "resume",
]);
export const DEFAULT_PINNED_TASKBAR_IDS = [
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
];
export const DEFAULT_SETTINGS = {
  clockFormat: "12h",
  desktopColor: null,
  iconSizeMode: "large",
  wallpaperPattern: "solid",
  crtEffectEnabled: true,
  masterSoundEnabled: true,
  uiSoundsEnabled: true,
  startupSoundEnabled: true,
  screensaverType: "none",
  screensaverTimeout: 120,
};
export const DEFAULT_EXPLORER_STATE = {
  currentFolderId: null,
  navStack: [],
  forwardStack: [],
  viewMode: "list",
  sidebarWidth: 180,
  searchQuery: "",
  selectedItemId: null,
};
export const WALLPAPER_PATTERNS = [
  { id: "solid", label: "Solid Color" },
  { id: "scanline", label: "Scanline Overlay" },
  { id: "dot-grid", label: "Dot Grid" },
  { id: "retro-stripe", label: "Retro Stripe" },
];
export const WALLPAPER_PATTERN_BACKGROUNDS = {
  solid: "none",
  scanline:
    "repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px)",
  "dot-grid": "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
  "retro-stripe":
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.15) 0 6px, transparent 6px 14px)",
};
export const SCREENSAVER_OPTIONS = [
  { id: "none", label: "None" },
  { id: "mystify", label: "Mystify" },
  { id: "bouncing-logo", label: "Bouncing Logo" },
  { id: "pipes", label: "Pipes" },
];
export const SCREENSAVER_TIMEOUT_OPTIONS = [
  { value: 60, label: "1 min" },
  { value: 120, label: "2 min" },
  { value: 300, label: "5 min" },
  { value: null, label: "Never" },
];
export const SYSTEM_SPECS = [
  ["Processor", "Jacob's Brain(TM) @ 3.52 GHz"],
  ["RAM", "16GB Determination"],
  ["Storage", "500GB of Side Projects"],
  ["OS", "JacobOS v1.0 (Build 2026)"],
  ["User", "jacob_rushinski"],
];
export const FILE_TYPE_LABELS = {
  app: "Application",
  computer: "Computer",
  drive: "Disk Drive",
  folder: "Folder",
  text: "Text Document",
  pdf: "PDF Document",
};
export const FILE_SIZE_LABELS = {
  app: "1.2 MB",
  computer: "",
  drive: "1.99 GB",
  folder: "0 bytes",
  text: "4 KB",
  pdf: "2.4 MB",
};

export const DESKTOP_COLORS = [
  {
    label: "Default",
    value: null,
    preview: "linear-gradient(180deg, #0b4aa6, #0a3f90)",
  },
  { label: "Teal", value: "#008080", preview: "#008080" },
  { label: "Navy", value: "#000080", preview: "#000080" },
  { label: "Forest", value: "#1a5c1a", preview: "#1a5c1a" },
  { label: "Maroon", value: "#800000", preview: "#800000" },
  { label: "Purple", value: "#4b0082", preview: "#4b0082" },
  { label: "Dark Gray", value: "#404040", preview: "#404040" },
  { label: "Black", value: "#000000", preview: "#000000" },
];

