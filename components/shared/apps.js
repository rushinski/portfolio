"use client";

import { Icons } from "@/components/shared/icons";

/**
 * Single source of truth for all app definitions.
 * Both desktop (desktop/) and mobile (mobile/) derive their app lists from here.
 *
 * Fields:
 *   id         — unique identifier used by both platforms
 *   iconLabel  — short label shown under desktop icons and mobile home screen tiles
 *   title      — full title used in window headers and mobile app headers
 *   desc       — description shown in mobile (tooltip / detail views)
 *   glyph      — icon SVG element (shared/icons.jsx)
 *   windowId   — desktop window ID (undefined for mobile-only apps)
 *   itemType   — desktop item type: "app" | "folder" | etc.
 *   system     — true = built-in, cannot be deleted
 *   parentId   — desktop file system parent (null = desktop root)
 *   platforms  — which platforms include this app
 */
export const APP_REGISTRY = [
  {
    id:        "welcome",
    iconLabel: "Welcome",
    title:     "Welcome",
    desc:      "Welcome to JacobOS — start here.",
    glyph:     Icons.welcome,
    windowId:  "welcome",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop"],
  },
  {
    id:        "about",
    iconLabel: "About",
    title:     "About Jacob",
    desc:      "Personal background, education, and bio.",
    glyph:     Icons.about,
    windowId:  "about",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "skills",
    iconLabel: "Skills",
    title:     "Skills",
    desc:      "Technologies, languages, and tools Jacob works with.",
    glyph:     Icons.skills,
    windowId:  "skills",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "experience",
    iconLabel: "Experience",
    title:     "Experience",
    desc:      "Work history and professional roles.",
    glyph:     Icons.experience,
    windowId:  "experience",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "projects",
    iconLabel: "Projects",
    title:     "Projects",
    desc:      "Shipped and in-progress software projects.",
    glyph:     Icons.projects,
    windowId:  "projects",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "videos",
    iconLabel: "Videos",
    title:     "Videos",
    desc:      "Project demo videos and walkthroughs.",
    glyph:     Icons.videos,
    windowId:  "videos",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "contact",
    iconLabel: "Contact",
    title:     "Contact",
    desc:      "Email, GitHub, LinkedIn, and phone number.",
    glyph:     Icons.contact,
    windowId:  "contact",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "location",
    iconLabel: "Where's Jacob",
    title:     "Where's Jacob",
    desc:      "Current location — Harrisburg, Lancaster, Philly.",
    glyph:     Icons.location,
    windowId:  "location",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "resume",
    iconLabel: "Resume",
    title:     "Resume",
    desc:      "Download or view Jacob's full resume PDF.",
    glyph:     Icons.resume,
    windowId:  "resume",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "help",
    iconLabel: "Help",
    title:     "JacobOS Help",
    desc:      "How to use JacobOS and navigate the portfolio.",
    glyph:     Icons.help,
    windowId:  "help",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "settings",
    iconLabel: "Settings",
    title:     "Settings",
    desc:      "OS preferences and display settings.",
    glyph:     Icons.settings,
    windowId:  "settings",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  {
    id:        "minesweeper",
    iconLabel: "Minesweeper",
    title:     "Minesweeper",
    desc:      "Classic Win95 Minesweeper. Tap to reveal, hold to flag.",
    glyph:     Icons.minesweeper,
    windowId:  "minesweeper",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop", "mobile"],
  },
  // Desktop-only apps
  {
    id:        "terminal",
    iconLabel: "Terminal",
    title:     "Terminal",
    desc:      "Command prompt simulator.",
    glyph:     Icons.terminal,
    windowId:  "terminal",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop"],
  },
  {
    id:        "explorer",
    iconLabel: "File Explorer",
    title:     "File Explorer",
    desc:      "Browse the virtual file system.",
    glyph:     Icons.fileExplorer,
    windowId:  "explorer",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop"],
  },
  {
    id:        "trash",
    iconLabel: "Recycle Bin",
    title:     "Recycle Bin",
    desc:      "Deleted items.",
    glyph:     Icons.trash,
    windowId:  "trash",
    itemType:  "app",
    system:    true,
    parentId:  null,
    platforms: ["desktop"],
  },
];

/** All apps available on desktop (includes desktop-only apps). */
export const DESKTOP_APP_REGISTRY = APP_REGISTRY.filter((a) =>
  a.platforms.includes("desktop"),
);

/** All apps available on mobile. */
export const MOBILE_APP_REGISTRY = APP_REGISTRY.filter((a) =>
  a.platforms.includes("mobile"),
);

/** Quick lookup by app id. */
export const APP_MAP = Object.fromEntries(APP_REGISTRY.map((a) => [a.id, a]));
