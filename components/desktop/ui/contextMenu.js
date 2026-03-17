"use client";

export const GLOBAL_CONTEXT_MENU_EVENT = "jacobos:context-menu-open";

export function announceContextMenuOpen(source) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(GLOBAL_CONTEXT_MENU_EVENT, {
      detail: { source },
    }),
  );
}
