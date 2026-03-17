"use client";

export const EXPLORER_TIPS = [
  "Tip: Right-click anywhere for Explorer actions.",
  "Tip: My Computer contains writable drives and system shortcuts.",
  "Tip: F2 renames the selected item when the location allows it.",
  "Tip: Ctrl+C, Ctrl+X, and Ctrl+V work inside Explorer.",
];

export const TREE_ROW_HEIGHT = 18;
export const TREE_INDENT = 16;

export function getExplorerSortWeight(item) {
  if (typeof item?.sortOrder === "number") return item.sortOrder;
  if (item?.itemType === "computer") return 0;
  if (item?.itemType === "drive") return 10;
  if (item?.itemType === "folder") return 20;
  if (item?.itemType === "pdf") return 40;
  if (item?.itemType === "text") return 50;
  if (item?.itemType === "app") return 60;
  return 99;
}

export function compareExplorerItems(a, b) {
  const weightDelta = getExplorerSortWeight(a) - getExplorerSortWeight(b);
  if (weightDelta !== 0) return weightDelta;
  return a.title.localeCompare(b.title);
}

export function formatExplorerDate(timestamp) {
  if (!timestamp) return "--/--/--";
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date(timestamp));
}

export function formatExplorerDateTime(timestamp) {
  if (!timestamp) return "System item";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
