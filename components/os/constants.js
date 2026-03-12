"use client";

import { Icons } from "./icons";

export const GRID = 1;
export const snap = (n) => Math.round(n / GRID) * GRID;
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export const ICON_VIEW_MODES = {
  small: { tileW: 68, tileH: 80, glyphScale: 0.85, labelSize: 10, cellX: 78, cellY: 94, maxLabel: 72 },
  medium: { tileW: 76, tileH: 90, glyphScale: 1, labelSize: 11, cellX: 90, cellY: 102, maxLabel: 84 },
  large: { tileW: 94, tileH: 112, glyphScale: 1.2, labelSize: 12, cellX: 108, cellY: 126, maxLabel: 100 },
};

export const MENU_TEXT_COLOR = "#162133";
export const FULLSCREEN_WINDOW_IDS = new Set(["experience", "projects", "videos", "contact", "resume"]);
export const DEFAULT_PINNED_TASKBAR_IDS = ["about", "skills", "experience", "projects", "videos", "contact"];

export const DESKTOP_COLORS = [
  { label: "Default", value: null, preview: "linear-gradient(180deg, #0b4aa6, #0a3f90)" },
  { label: "Teal", value: "#008080", preview: "#008080" },
  { label: "Navy", value: "#000080", preview: "#000080" },
  { label: "Forest", value: "#1a5c1a", preview: "#1a5c1a" },
  { label: "Maroon", value: "#800000", preview: "#800000" },
  { label: "Purple", value: "#4b0082", preview: "#4b0082" },
  { label: "Dark Gray", value: "#404040", preview: "#404040" },
  { label: "Black", value: "#000000", preview: "#000000" },
];

export const INITIAL_ICON_POSITIONS = {
  welcome: { x: 12, y: 8 },
  about: { x: 12, y: 104 },
  skills: { x: 12, y: 200 },
  experience: { x: 12, y: 296 },
  projects: { x: 12, y: 392 },
  videos: { x: 112, y: 296 },
  github: { x: 12, y: 488 },
  contact: { x: 12, y: 584 },
  terminal: { x: 12, y: 680 },
  trash: { x: 112, y: 680 },
  explorer: { x: 112, y: 8 },
  settings: { x: 112, y: 104 },
  location: { x: 112, y: 200 },
  resume: { x: 112, y: 392 },
};

export const INITIAL_WINDOWS = {
  welcome: { id: "welcome", title: "Welcome", x: 250, y: 95, w: 800, h: 500, isOpen: true, isMinimized: false, isMaximized: false, z: 11 },
  about: { id: "about", title: "About", x: 30, y: 20, w: 1200, h: 600, isOpen: false, isMinimized: false, isMaximized: false, z: 10 },
  skills: { id: "skills", title: "Skills", x: 180, y: 50, w: 950, h: 550, isOpen: false, isMinimized: false, isMaximized: false, z: 9 },
  experience: { id: "experience", title: "Experience", x: 180, y: 50, w: 560, h: 480, isOpen: false, isMinimized: false, isMaximized: false, z: 8 },
  projects: { id: "projects", title: "Projects", x: 100, y: 20, w: 600, h: 560, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
  videos: { id: "videos", title: "Videos", x: 140, y: 40, w: 840, h: 560, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
  contact: { id: "contact", title: "Contact", x: 260, y: 80, w: 400, h: 380, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
  location: { id: "location", title: "Jacobs Time", x: 280, y: 110, w: 560, h: 300, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
  terminal: { id: "terminal", title: "Terminal", x: 120, y: 50, w: 500, h: 350, isOpen: false, isMinimized: false, isMaximized: false, z: 4 },
  trash: { id: "trash", title: "Recycle Bin", x: 300, y: 100, w: 320, h: 260, isOpen: false, isMinimized: false, isMaximized: false, z: 3 },
  explorer: { id: "explorer", title: "File Explorer", x: 260, y: 90, w: 460, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 2 },
  settings: { id: "settings", title: "Settings", x: 300, y: 120, w: 380, h: 280, isOpen: false, isMinimized: false, isMaximized: false, z: 1 },
  textdoc: { id: "textdoc", title: "Text Document", x: 240, y: 80, w: 520, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 12 },
  resume: { id: "resume", title: "Resume.pdf", x: 80, y: 30, w: 760, h: 600, isOpen: false, isMinimized: false, isMaximized: false, z: 0 },
};

export const canPinItemToTaskbar = (item) => item?.itemType === "app" && !!item.windowId;

export const snapIconToGrid = (x, y, mode = "medium", marginX = 12, marginY = 8) => {
  const grid = ICON_VIEW_MODES[mode] || ICON_VIEW_MODES.medium;
  const gx = Math.round((x - marginX) / grid.cellX);
  const gy = Math.round((y - marginY) / grid.cellY);
  return {
    x: marginX + gx * grid.cellX,
    y: marginY + gy * grid.cellY,
  };
};

const SYSTEM_DESKTOP_ICON_DEFS = [
  { id: "welcome", title: "Welcome", glyph: Icons.welcome, windowId: "welcome", itemType: "app", system: true, parentId: null },
  { id: "about", title: "About", glyph: Icons.about, windowId: "about", itemType: "app", system: true, parentId: null },
  { id: "skills", title: "Skills", glyph: Icons.skills, windowId: "skills", itemType: "app", system: true, parentId: null },
  { id: "experience", title: "Experience", glyph: Icons.experience, windowId: "experience", itemType: "app", system: true, parentId: null },
  { id: "projects", title: "Projects", glyph: Icons.projects, windowId: "projects", itemType: "app", system: true, parentId: null },
  { id: "videos", title: "Videos", glyph: Icons.videos, windowId: "videos", itemType: "app", system: true, parentId: null },
  { id: "contact", title: "Contact", glyph: Icons.contact, windowId: "contact", itemType: "app", system: true, parentId: null },
  { id: "location", title: "Jacobs Time", glyph: Icons.location, windowId: "location", itemType: "app", system: true, parentId: null },
  { id: "terminal", title: "Terminal", glyph: Icons.terminal, windowId: "terminal", itemType: "app", system: true, parentId: null },
  { id: "explorer", title: "File Explorer", glyph: Icons.folder, windowId: "explorer", itemType: "app", system: true, parentId: null },
  { id: "settings", title: "Settings", glyph: Icons.settings, windowId: "settings", itemType: "app", system: true, parentId: null },
  { id: "trash", title: "Recycle Bin", glyph: Icons.trash, windowId: "trash", itemType: "app", system: true, parentId: null },
  { id: "resume", title: "Resume.pdf", glyph: Icons.resume, windowId: "resume", itemType: "app", system: true, parentId: null },
];

export const buildSystemDesktopIcons = (renamedSystemIcons = {}) =>
  SYSTEM_DESKTOP_ICON_DEFS.map((item) => ({
    ...item,
    title: renamedSystemIcons[item.id] || item.title,
  }));
