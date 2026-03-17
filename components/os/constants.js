"use client";

// Backward-compatible barrel — all existing imports from "../constants" continue to work.
// To update content, edit the focused files in ./constants/:
//   config.js     — display settings, screensavers, wallpapers, type labels
//   layout.js     — window sizes/positions, icon grid positions
//   desktop.js    — system icon definitions, builder functions
//   filesystem.js — virtual file system (INITIAL_CUSTOM_ITEMS)

export * from "./constants/index";
