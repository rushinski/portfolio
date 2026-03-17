"use client";

import { Icons } from "../icons";
import { FILE_SIZE_LABELS, FILE_TYPE_LABELS, ICON_VIEW_MODES } from "./config";

export const canPinItemToTaskbar = (item) =>
  item?.itemType === "app" && !!item.windowId;

export const snapIconToGrid = (
  x,
  y,
  mode = "medium",
  marginX = 12,
  marginY = 8,
) => {
  const grid = ICON_VIEW_MODES[mode] || ICON_VIEW_MODES.medium;
  const gx = Math.round((x - marginX) / grid.cellX);
  const gy = Math.round((y - marginY) / grid.cellY);
  return {
    x: marginX + gx * grid.cellX,
    y: marginY + gy * grid.cellY,
  };
};

const SYSTEM_DESKTOP_ICON_DEFS = [
  {
    id: "welcome",
    title: "Welcome",
    glyph: Icons.welcome,
    windowId: "welcome",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "about",
    title: "About",
    glyph: Icons.about,
    windowId: "about",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "skills",
    title: "Skills",
    glyph: Icons.skills,
    windowId: "skills",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "experience",
    title: "Experience",
    glyph: Icons.experience,
    windowId: "experience",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "projects",
    title: "Projects",
    glyph: Icons.projects,
    windowId: "projects",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "videos",
    title: "Videos",
    glyph: Icons.videos,
    windowId: "videos",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "contact",
    title: "Contact",
    glyph: Icons.contact,
    windowId: "contact",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "location",
    title: "Where's Jacob",
    glyph: Icons.location,
    windowId: "location",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "terminal",
    title: "Terminal",
    glyph: Icons.terminal,
    windowId: "terminal",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "explorer",
    title: "File Explorer",
    glyph: Icons.fileExplorer,
    windowId: "explorer",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "settings",
    title: "Settings",
    glyph: Icons.settings,
    windowId: "settings",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "trash",
    title: "Recycle Bin",
    glyph: Icons.trash,
    windowId: "trash",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "resume",
    title: "Resume",
    glyph: Icons.resume,
    windowId: "resume",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    glyph: Icons.minesweeper,
    windowId: "minesweeper",
    itemType: "app",
    system: true,
    parentId: null,
  },
  {
    id: "help",
    title: "Help",
    glyph: Icons.help,
    windowId: "help",
    itemType: "app",
    system: true,
    parentId: null,
  },
];

export const buildSystemDesktopIcons = (renamedSystemIcons = {}) =>
  SYSTEM_DESKTOP_ICON_DEFS.map((item) => ({
    ...item,
    glyph: item.glyph,
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

export const buildExplorerSystemItems = () =>
  EXPLORER_SYSTEM_ITEM_DEFS.map((item) => ({ ...item }));

