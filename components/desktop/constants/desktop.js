"use client";

import { Icons } from "@/components/shared/icons";
import { DESKTOP_APP_REGISTRY } from "@/components/shared/apps";
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

export const buildSystemDesktopIcons = (renamedSystemIcons = {}) =>
  DESKTOP_APP_REGISTRY.map((item) => ({
    ...item,
    title: renamedSystemIcons[item.id] || item.iconLabel,
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
