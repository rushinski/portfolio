"use client";

import { Icons } from "./icons";

export const GRID = 1;
export const snap = (n) => Math.round(n / GRID) * GRID;
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
export const WINDOW_MIN_WIDTH = 280;
export const WINDOW_MIN_HEIGHT = 180;

export const ICON_VIEW_MODES = {
  small: { tileW: 68, tileH: 80, glyphScale: 0.85, labelSize: 10, cellX: 78, cellY: 94, maxLabel: 72 },
  medium: { tileW: 76, tileH: 90, glyphScale: 1, labelSize: 11, cellX: 90, cellY: 102, maxLabel: 84 },
  large: { tileW: 94, tileH: 112, glyphScale: 1.2, labelSize: 12, cellX: 108, cellY: 126, maxLabel: 100 },
};

export const MENU_TEXT_COLOR = "#162133";
export const DRAG_ITEM_MIME = "application/x-jacobos-item-id";
export const FULLSCREEN_WINDOW_IDS = new Set(["experience", "projects", "videos", "contact", "resume"]);
export const DEFAULT_PINNED_TASKBAR_IDS = ["about", "skills", "experience", "projects", "contact"];
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
  scanline: "repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px)",
  "dot-grid": "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
  "retro-stripe": "repeating-linear-gradient(135deg, rgba(255,255,255,0.15) 0 6px, transparent 6px 14px)",
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
  // Column 1
  about:       { x: 12, y: 8 },
  skills:      { x: 12, y: 134 },
  experience:  { x: 12, y: 260 },
  projects:    { x: 12, y: 386 },
  contact:     { x: 12, y: 512 },
  // Column 2
  welcome:     { x: 120, y: 8 },
  resume:      { x: 120, y: 134 },
  location:    { x: 120, y: 260 },
  videos:      { x: 120, y: 386 },
  help:        { x: 120, y: 512 },
  // Column 3
  settings:    { x: 228, y: 8 },
  explorer:    { x: 228, y: 134 },
  terminal:    { x: 228, y: 260 },
  trash:       { x: 228, y: 386 },
  minesweeper: { x: 228, y: 512 },
};

export const INITIAL_WINDOWS = {
  welcome: { id: "welcome", title: "Welcome", x: 220, y: 56, w: 750, h: 480, isOpen: true, isMinimized: false, isMaximized: false, z: 11 },
  about: { id: "about", title: "About", x: 72, y: 44, w: 1150, h: 560, isOpen: false, isMinimized: false, isMaximized: false, z: 10 },
  skills: { id: "skills", title: "Skills", x: 132, y: 68, w: 1150, h: 650, isOpen: false, isMinimized: false, isMaximized: false, z: 9 },
  experience: { id: "experience", title: "Experience", x: 188, y: 82, w: 720, h: 500, isOpen: false, isMinimized: false, isMaximized: false, z: 8 },
  projects: { id: "projects", title: "Projects", x: 156, y: 60, w: 820, h: 560, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
  videos: { id: "videos", title: "Videos", x: 140, y: 52, w: 920, h: 580, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
  contact: { id: "contact", title: "Contact", x: 292, y: 92, w: 460, h: 420, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
  location: { id: "location", title: "Where's Jacob", x: 140, y: 40, w: 800, h: 660, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
  terminal: { id: "terminal", title: "Terminal", x: 124, y: 92, w: 640, h: 400, isOpen: false, isMinimized: false, isMaximized: false, z: 4 },
  trash: { id: "trash", title: "Recycle Bin", x: 320, y: 100, w: 500, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 3 },
  explorer: { id: "explorer", title: "File Explorer", x: 148, y: 66, w: 860, h: 540, isOpen: false, isMinimized: false, isMaximized: false, z: 2 },
  settings: { id: "settings", title: "Settings", x: 214, y: 88, w: 700, h: 520, isOpen: false, isMinimized: false, isMaximized: false, z: 1 },
  textdoc: { id: "textdoc", title: "Text Document", x: 248, y: 100, w: 560, h: 380, isOpen: false, isMinimized: false, isMaximized: false, z: 12 },
  resume: { id: "resume", title: "Resume.pdf", x: 112, y: 44, w: 900, h: 620, isOpen: false, isMinimized: false, isMaximized: false, z: 0 },
  minesweeper: { id: "minesweeper", title: "Minesweeper", x: 200, y: 80, w: 248, h: 330, isOpen: false, isMinimized: false, isMaximized: false, z: 0 },
  help: { id: "help", title: "JacobOS Help", x: 160, y: 60, w: 600, h: 470, isOpen: false, isMinimized: false, isMaximized: false, z: 0 },
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
  { id: "location", title: "Where's Jacob", glyph: Icons.location, windowId: "location", itemType: "app", system: true, parentId: null },
  { id: "terminal", title: "Terminal", glyph: Icons.terminal, windowId: "terminal", itemType: "app", system: true, parentId: null },
  { id: "explorer", title: "File Explorer", glyph: Icons.folder, windowId: "explorer", itemType: "app", system: true, parentId: null },
  { id: "settings", title: "Settings", glyph: Icons.settings, windowId: "settings", itemType: "app", system: true, parentId: null },
  { id: "trash", title: "Recycle Bin", glyph: Icons.trashEmpty, windowId: "trash", itemType: "app", system: true, parentId: null },
  { id: "resume", title: "Resume.pdf", glyph: Icons.resume, windowId: "resume", itemType: "app", system: true, parentId: null },
  { id: "minesweeper", title: "Minesweeper", glyph: Icons.minesweeper, windowId: "minesweeper", itemType: "app", system: true, parentId: null },
  { id: "help", title: "Help", glyph: Icons.help, windowId: "help", itemType: "app", system: true, parentId: null },
];

export const buildSystemDesktopIcons = (renamedSystemIcons = {}, options = {}) =>
  SYSTEM_DESKTOP_ICON_DEFS.map((item) => ({
    ...item,
    glyph: item.id === "trash" ? (options.recycleBinHasItems ? Icons.trashFull : Icons.trashEmpty) : item.glyph,
    title: renamedSystemIcons[item.id] || item.title,
    sizeLabel: FILE_SIZE_LABELS[item.itemType] || "0 bytes",
    typeLabel: FILE_TYPE_LABELS[item.itemType] || "Item",
  }));

const EXPLORER_SYSTEM_ITEM_DEFS = [
  {
    id: "my-computer",
    title: "My Computer",
    glyph: Icons.computer,
    windowId: "explorer",
    itemType: "computer",
    system: true,
    explorerOnly: true,
    isContainer: true,
    readOnly: true,
    parentId: null,
    sortOrder: 0,
    typeLabel: "Computer",
    sizeLabel: "",
  },
  {
    id: "drive-a",
    title: "3 1/2 Floppy (A:)",
    glyph: Icons.drive,
    windowId: "explorer",
    itemType: "drive",
    system: true,
    explorerOnly: true,
    isContainer: true,
    parentId: "my-computer",
    sortOrder: 0,
    typeLabel: "Floppy Disk",
    sizeLabel: "1.44 MB",
  },
  {
    id: "drive-c",
    title: "JacobOS (C:)",
    glyph: Icons.drive,
    windowId: "explorer",
    itemType: "drive",
    system: true,
    explorerOnly: true,
    isContainer: true,
    parentId: "my-computer",
    sortOrder: 1,
    typeLabel: "Local Disk",
    sizeLabel: "2.1 GB",
  },
  {
    id: "drive-d",
    title: "Archive (D:)",
    glyph: Icons.drive,
    windowId: "explorer",
    itemType: "drive",
    system: true,
    explorerOnly: true,
    isContainer: true,
    parentId: "my-computer",
    sortOrder: 2,
    typeLabel: "Local Disk",
    sizeLabel: "824 MB",
  },
  {
    id: "control-panel",
    title: "Control Panel",
    glyph: Icons.settings,
    windowId: "settings",
    itemType: "app",
    system: true,
    explorerOnly: true,
    parentId: "my-computer",
    sortOrder: 3,
    typeLabel: "System Folder",
    sizeLabel: "",
  },
];

export const buildExplorerSystemItems = () => EXPLORER_SYSTEM_ITEM_DEFS.map((item) => ({ ...item }));

export const INITIAL_CUSTOM_ITEMS = [
  // ── Folders on C: ───────────────────────────────────────────────────────────
  { id: "folder-program-files", title: "Program Files", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-c", createdAt: Date.parse("2026-01-10T08:22:00"), sortOrder: 8 },
  { id: "folder-windows", title: "Windows", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-c", createdAt: Date.parse("2026-01-10T08:24:00"), sortOrder: 9 },
  { id: "folder-documents", title: "My Documents", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-c", createdAt: Date.parse("2026-01-10T08:30:00"), sortOrder: 10 },
  { id: "folder-projects", title: "Projects", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-c", createdAt: Date.parse("2026-01-10T08:35:00"), sortOrder: 11 },
  { id: "folder-downloads", title: "Downloads", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-c", createdAt: Date.parse("2026-01-10T08:40:00"), sortOrder: 12 },
  { id: "folder-temp", title: "Temp", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-c", createdAt: Date.parse("2026-01-10T08:42:00"), sortOrder: 13 },

  // ── Folders on D: ───────────────────────────────────────────────────────────
  { id: "folder-archive", title: "Backups", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-d", createdAt: Date.parse("2026-01-10T08:45:00"), sortOrder: 10 },
  { id: "folder-old-projects", title: "Old Projects", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "drive-d", createdAt: Date.parse("2025-06-01T10:00:00"), sortOrder: 11 },

  // ── Subfolders ──────────────────────────────────────────────────────────────
  { id: "folder-jacobos", title: "jacobos-portfolio", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "folder-projects", createdAt: Date.parse("2026-01-10T08:50:00"), sortOrder: 10 },
  { id: "folder-school", title: "Thaddeus Stevens", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "folder-documents", createdAt: Date.parse("2025-09-01T09:00:00"), sortOrder: 11 },
  { id: "folder-work", title: "Giant Food Stores", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "folder-documents", createdAt: Date.parse("2024-06-10T08:00:00"), sortOrder: 12 },
  { id: "folder-philly-notes", title: "Philly Plans", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, parentId: "folder-documents", createdAt: Date.parse("2025-11-01T20:00:00"), sortOrder: 13 },

  // ── C: root files ───────────────────────────────────────────────────────────
  {
    id: "text-readme",
    title: "readme.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "drive-c",
    createdAt: Date.parse("2026-01-10T08:55:00"), sortOrder: 20,
    content: "JacobOS v1.0 — Portfolio Build 2026\n\n[ About This Drive ]\nThis is Jacob Rushinski's interactive portfolio presented as a retro OS desktop.\n\nDouble-click any app on the desktop to learn more about:\n  - About        Resume-style bio\n  - Skills       Technologies & tools\n  - Experience   Work history at Giant Food Stores & more\n  - Projects     Shipped and in-progress code\n  - Contact      How to reach Jacob\n\nType \"help\" in Terminal for available commands.",
  },
  {
    id: "text-autoexec",
    title: "autoexec.bat",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "drive-c",
    createdAt: Date.parse("2026-01-10T09:00:00"), sortOrder: 21,
    content: "@echo off\nprompt $p$g\npath C:\\WINDOWS;C:\\WINDOWS\\COMMAND;C:\\Program Files\\JacobOS\nset NAME=Jacob Rushinski\nset ROLE=Software Developer\necho Welcome to JacobOS, %NAME%.",
  },
  {
    id: "text-config",
    title: "config.sys",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "drive-c",
    createdAt: Date.parse("2026-01-10T09:03:00"), sortOrder: 22,
    content: "FILES=40\nBUFFERS=30\nDOS=HIGH,UMB\n\n; JacobOS Configuration\nDEVICE=CREATIVITY.SYS\nDEVICE=COFFEE_DEPENDENCY.SYS /MAX",
  },

  // ── My Documents ─────────────────────────────────────────────────────────────
  {
    id: "text-bio-draft",
    title: "bio-draft.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-documents",
    createdAt: Date.parse("2026-02-01T11:00:00"), sortOrder: 15,
    content: "Draft Bio — Jacob Rushinski\n\nI'm a Computer Science student at Thaddeus Stevens College of Technology (Lancaster, PA) with hands-on experience in retail operations at Giant Food Stores (Harrisburg area).\n\nI love building things for the web — this portfolio is one of those projects. I spend weekends in Philadelphia and plan to move there after graduation.\n\nInterests: web development, UI/UX, retro aesthetics, music.",
  },
  {
    id: "text-cover-letter",
    title: "cover-letter-draft.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-documents",
    createdAt: Date.parse("2026-03-01T09:30:00"), sortOrder: 16,
    content: "Dear Hiring Manager,\n\nI am a Computer Science student at Thaddeus Stevens College of Technology graduating in [year], actively seeking a software development role in the Philadelphia area.\n\nWith experience in [technologies], a portfolio of personal projects, and strong problem-solving skills developed both in academics and my time managing customer interactions at Giant Food Stores, I believe I would be a strong addition to your team.\n\nPlease find my resume and projects at jacobrushinski.dev.\n\nSincerely,\nJacob Rushinski",
  },
  {
    id: "text-desktop-ini",
    title: "desktop.ini",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-documents",
    createdAt: Date.parse("2026-01-12T10:20:00"), sortOrder: 22,
    content: "[.ShellClassInfo]\nIconResource=JacobOS.dll,3\nLocalizedResourceName=My Documents",
  },

  // ── Millersville (school) ─────────────────────────────────────────────────────
  {
    id: "text-schedule",
    title: "spring-2026-schedule.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-school",
    createdAt: Date.parse("2026-01-13T08:00:00"), sortOrder: 10,
    content: "Spring 2026 Schedule — Thaddeus Stevens College of Technology\n\nMON  9:00  CSCI 472 - Software Engineering\nMON  11:00 CSCI 450 - Database Systems\nTUE  10:00 CSCI 461 - Operating Systems\nWED  9:00  CSCI 472 (lab)\nWED  13:00 CSCI 480 - Web Development\nTHU  10:00 CSCI 461 (lab)\nFRI  11:00 CSCI 499 - Senior Project Capstone\n\nCommute: Lancaster → Harrisburg (30 min via Rt. 30)",
  },
  {
    id: "text-senior-project",
    title: "senior-project-notes.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-school",
    createdAt: Date.parse("2026-02-10T14:00:00"), sortOrder: 11,
    content: "Senior Capstone — Spring 2026\n\nProject: [TBD — likely a full-stack web application]\nAdvisor: Prof. [Name]\nDeadline: May 2026\n\nIdeas:\n  1. Real-time inventory management tool (inspired by work at Giant)\n  2. Campus event discovery app for Millersville students\n  3. Portfolio v2 (JacobOS) — this very project!\n\nTech stack being considered: Next.js, PostgreSQL, Vercel.",
  },
  {
    id: "text-csci-notes",
    title: "os-class-notes.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-school",
    createdAt: Date.parse("2026-02-18T10:30:00"), sortOrder: 12,
    content: "CSCI 461 — Operating Systems\nLecture Notes: Process Scheduling\n\nCPU Scheduling Algorithms:\n  - First Come First Served (FCFS)\n  - Shortest Job Next (SJN)\n  - Round Robin (RR)\n  - Priority Scheduling\n\nFun fact: writing my own fake OS for a portfolio project at the same time as this class. Meta.",
  },

  // ── Giant Food Stores (work) ──────────────────────────────────────────────────
  {
    id: "text-work-schedule",
    title: "work-shifts-march.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-work",
    createdAt: Date.parse("2026-03-01T07:00:00"), sortOrder: 10,
    content: "Giant Food Stores — March 2026 Shifts\n\n03/03 Mon  3:00pm - 9:00pm\n03/05 Wed  4:00pm - 10:00pm\n03/08 Sat  10:00am - 6:00pm\n03/10 Mon  3:00pm - 9:00pm\n03/12 Wed  4:00pm - 10:00pm\n03/15 Sat  10:00am - 6:00pm\n03/17 Mon  3:00pm - 9:00pm\n\nLocation: Harrisburg, PA\nRole: [Customer Service / Produce / Cashier]\n\nNote: Balancing school Mon-Fri in Lancaster + work evenings.",
  },
  {
    id: "text-work-notes",
    title: "work-observations.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-work",
    createdAt: Date.parse("2025-12-01T18:00:00"), sortOrder: 11,
    content: "Things I've learned working at Giant:\n\n- High-volume customer service under pressure\n- Inventory tracking and restocking workflows\n- Team coordination across departments\n- Problem solving on the floor in real time\n\nThese are actually useful dev skills:\n  - Prioritization under load (like request queuing)\n  - Process optimization\n  - Clear communication with non-technical people",
  },

  // ── Philly Plans ─────────────────────────────────────────────────────────────
  {
    id: "text-philly-apt",
    title: "apartment-hunt.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-philly-notes",
    createdAt: Date.parse("2026-01-20T21:00:00"), sortOrder: 10,
    content: "Philadelphia Apartment Hunt — Notes\n\nTarget neighborhoods:\n  - Fishtown (artsy, affordable-ish, tech crowd)\n  - Northern Liberties (walkable, close to Center City)\n  - South Philly (cheaper, still accessible)\n\nBudget: ~$1,200-1,500/mo\nMove-in timeline: After graduation (May/Aug 2026)\n\nPhilly pros:\n  - Strong tech scene\n  - SEPTA access\n  - Actually good food\n  - Reasonable cost vs NYC\n\nBeen going up most weekends — love the energy there.",
  },
  {
    id: "text-philly-jobs",
    title: "philly-job-targets.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-philly-notes",
    createdAt: Date.parse("2026-02-15T20:30:00"), sortOrder: 11,
    content: "Job Search — Philadelphia Tech Scene\n\nTarget roles: Junior Developer, Frontend Dev, Full-Stack Dev\n\nCompanies I'm interested in:\n  - Comcast Technology Solutions\n  - Vanguard (Wayne, just outside Philly)\n  - Aramark (Center City)\n  - Independence Blue Cross (tech team)\n  - Various startups in Fishtown/NoLibs tech corridor\n\nAction items:\n  [ ] Polish portfolio (JacobOS ongoing)\n  [ ] Update LinkedIn\n  [ ] Apply to 5 roles per week starting April\n  [ ] Network at Philly startup events",
  },

  // ── jacobos-portfolio project ─────────────────────────────────────────────────
  {
    id: "text-todo",
    title: "todo.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-jacobos",
    createdAt: Date.parse("2026-01-14T16:05:00"), sortOrder: 10,
    content: "JacobOS Portfolio — TODO\n\n[x] Boot sequence animation\n[x] Window manager (drag, resize, z-index)\n[x] File Explorer with tree navigation\n[x] Recycle Bin (delete, restore, empty)\n[x] Settings (persist to localStorage)\n[x] Calculator, Minesweeper, Help apps\n[x] Keyboard shortcuts (Alt+Tab, F1, Ctrl+A)\n[x] Retro Win95 scrollbar theme\n[ ] Mobile-friendly mode\n[ ] More polish on About/Skills pages\n[ ] Deploy to jacobrushinski.dev",
  },
  {
    id: "text-release-notes",
    title: "changelog.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-jacobos",
    createdAt: Date.parse("2026-03-13T12:00:00"), sortOrder: 11,
    content: "JacobOS Portfolio — Changelog\n\nv1.0.0 (March 2026)\n  + Initial portfolio launch\n  + Window manager with drag/resize\n  + File Explorer with virtual filesystem\n  + 10+ apps: About, Skills, Experience, Projects, Videos, Contact, Terminal, Settings, Recycle Bin\n  + Calculator, Minesweeper, Help\n  + Retro Win95 scrollbars\n  + Alt+Tab switcher, Ctrl+A, F1=Help\n  + localStorage settings persistence\n  + CRT scanline effect\n  + Screensaver modes\n  + Boot animation",
  },
  {
    id: "text-stack",
    title: "tech-stack.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-jacobos",
    createdAt: Date.parse("2026-01-11T10:00:00"), sortOrder: 12,
    content: "JacobOS Tech Stack\n\nFramework:  Next.js 15 (App Router)\nLibrary:    React 18\nStyling:    Tailwind CSS + inline styles (retro component system)\nLanguage:   JavaScript (JSX)\nDeploy:     Vercel\n\nNo external UI libraries — everything hand-crafted for the Win95 aesthetic.\nScrollbars, window chrome, context menus, calendar — all custom.",
  },

  // ── Downloads ────────────────────────────────────────────────────────────────
  {
    id: "text-downloads-list",
    title: "downloaded-resources.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-downloads",
    createdAt: Date.parse("2026-03-05T16:00:00"), sortOrder: 10,
    content: "Recently Downloaded\n\n- next-15-docs.pdf (official Next.js docs, saved for offline)\n- react-patterns-2025.pdf (design patterns reference)\n- tailwind-cheatsheet.txt (quick reference)\n- millersville-spring2026-syllabus.pdf\n- giant-onboarding-packet.pdf (from 2024 start date)\n- philly-transit-map.pdf (SEPTA subway map)\n- figma-ui-kit-win95-retro.zip (inspiration for JacobOS)",
  },

  // ── Program Files ─────────────────────────────────────────────────────────────
  {
    id: "text-install-notes",
    title: "installed-apps.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-program-files",
    createdAt: Date.parse("2026-01-14T09:10:00"), sortOrder: 10,
    content: "Installed Applications\n\nC:\\Program Files\\JacobOS\\       — Portfolio shell (this app)\nC:\\Program Files\\VSCode\\        — Visual Studio Code\nC:\\Program Files\\NodeJS\\        — Node.js runtime\nC:\\Program Files\\Git\\           — Git version control\nC:\\Program Files\\Figma\\         — UI design\nC:\\Program Files\\Terminal\\      — Bash / PowerShell\nC:\\Program Files\\Slack\\         — Team communication\nC:\\Program Files\\Minesweeper\\   — Essential productivity tool",
  },

  // ── Windows system files ──────────────────────────────────────────────────────
  {
    id: "text-system-log",
    title: "system.log",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-windows",
    createdAt: Date.parse("2026-01-14T08:45:00"), sortOrder: 10,
    content: "[2026-01-10 08:00] Boot sequence initialized.\n[2026-01-10 08:01] Explorer shell loaded.\n[2026-01-10 08:02] All subsystems nominal.\n[2026-01-12 11:30] Settings module updated.\n[2026-01-14 09:00] File system expanded.\n[2026-03-13 12:00] v1.0 stable build — no fatal errors detected.",
  },
  {
    id: "text-win-ini",
    title: "win.ini",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-windows",
    createdAt: Date.parse("2026-01-10T08:30:00"), sortOrder: 11,
    content: "[windows]\nload=\nrun=\nBeep=yes\nNullPort=None\nIconTitleFaceName=MS Sans Serif\nIconTitleSize=8\n\n[desktop]\nWallpaper=(None)\nTileWallpaper=0\nPattern=(None)\n\n[JacobOS]\nVersion=1.0\nBuild=2026\nUser=jacob_rushinski\nLocation=Harrisburg, PA",
  },

  // ── D: backups ───────────────────────────────────────────────────────────────
  {
    id: "text-archive-log",
    title: "backup-log.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-archive",
    createdAt: Date.parse("2026-01-15T09:25:00"), sortOrder: 10,
    content: "Backup Log — D:\\Backups\n\n[2026-01-10] Initial snapshot — C: drive baseline\n[2026-01-14] Projects folder added\n[2026-02-01] My Documents synced\n[2026-03-01] Pre-launch backup\n[2026-03-13] v1.0 release snapshot\n\nAll backups verified. No data loss detected.",
  },

  // ── Old Projects (D:) ────────────────────────────────────────────────────────
  {
    id: "text-old-projects",
    title: "old-projects-index.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "folder-old-projects",
    createdAt: Date.parse("2025-06-01T10:30:00"), sortOrder: 10,
    content: "Old Projects — D:\\Old Projects\n\nProjects archived before JacobOS:\n\n1. personal-site-v1/\n   Plain HTML/CSS portfolio. Very basic. First web project.\n\n2. todo-app-react/\n   Simple React todo list. Classic beginner project. Still works.\n\n3. weather-widget/\n   Fetched weather from OpenWeather API. Used as a JS practice project.\n\n4. discord-bot/\n   Node.js Discord bot for a gaming server. Had a fun music player.\n\n5. calculator-v1/\n   Vanilla JS calculator. Now has a much cooler Win95 version.",
  },

  // ── Floppy disk ──────────────────────────────────────────────────────────────
  {
    id: "text-floppy-note",
    title: "disk-note.txt",
    glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, parentId: "drive-a",
    createdAt: Date.parse("2026-01-15T09:40:00"), sortOrder: 12,
    content: "3 1/2 inch diskette — labeled: JACOB_BACKUP_001\n\nContents: Early portfolio sketches, wireframes for JacobOS.\n\nNote: Don't forget to back up to D: regularly.\n      This diskette is getting old.",
  },
];
