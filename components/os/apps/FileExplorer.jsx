"use client";

import { useFileSystem } from "../hooks/useFileSystem";
import { useWindowManager } from "../hooks/useWindowManager";

export default function FileExplorerApp() {
  const { desktopItems, getFolderPathSegments, getItemById, getItemsInFolder, openItem } = useFileSystem();
  const {
    explorerState,
    explorerNavigateTo,
    explorerGoBack,
    explorerGoForward,
    explorerGoUp,
    setExplorerSelectedItemId,
  } = useWindowManager();

  const folders = desktopItems.filter((item) => item.itemType === "folder");
  const currentItems = getItemsInFolder(explorerState.currentFolderId);
  const pathSegments = getFolderPathSegments(explorerState.currentFolderId);

  const navButton = (label, disabled, onClick) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "inherit",
        fontSize: 11,
        cursor: disabled ? "default" : "pointer",
        padding: "1px 7px",
        background: "#c0c0c0",
        borderTop: "2px solid #fff",
        borderLeft: "2px solid #fff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        color: disabled ? "#808080" : "#111",
        minWidth: 24,
      }}
    >
      {label}
    </button>
  );

  const itemIcon = (item) => {
    if (item.itemType === "folder") return "F";
    if (item.itemType === "text") return "TXT";
    return "APP";
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "inherit", overflow: "hidden" }}>
      <div style={{ padding: "4px 6px", borderBottom: "1px solid #808080", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
        {navButton("<", explorerState.navStack.length === 0, explorerGoBack)}
        {navButton(">", explorerState.forwardStack.length === 0, explorerGoForward)}
        {navButton("^", explorerState.currentFolderId === null, explorerGoUp)}
        <div style={{ flex: 1, marginLeft: 4, padding: "1px 6px", border: "2px inset #c0c0c0", background: "#fff", fontSize: 11, color: "#111", lineHeight: "18px", height: 20, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {pathSegments.map((segment, index) => (
            <span key={`${segment.id ?? "desktop"}-${index}`}>
              {index > 0 ? " > " : ""}
              <span style={{ color: index === pathSegments.length - 1 ? "#111" : "#808080" }}>{segment.title}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        <div style={{ width: 130, flexShrink: 0, borderRight: "1px solid #808080", overflowY: "auto", background: "#d4d0c8", padding: "4px 0" }}>
          <div onClick={() => explorerNavigateTo(null)} style={{ padding: "2px 8px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, background: explorerState.currentFolderId === null ? "#000080" : "transparent", color: explorerState.currentFolderId === null ? "#fff" : "#111" }}>
            <span>PC</span> Desktop
          </div>
          {folders.map((folder) => (
            <div key={folder.id} onClick={() => explorerNavigateTo(folder.id)} style={{ padding: "2px 8px 2px 20px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, background: explorerState.currentFolderId === folder.id ? "#000080" : "transparent", color: explorerState.currentFolderId === folder.id ? "#fff" : "#111" }}>
              <span>F</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{folder.title}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", background: "#fff", minWidth: 0 }}>
          {currentItems.length === 0 ? (
            <div style={{ padding: "16px", fontSize: 11, color: "#808080" }}>This folder is empty.</div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setExplorerSelectedItemId(item.id)}
                onDoubleClick={() => {
                  if (item.itemType === "folder") {
                    explorerNavigateTo(item.id);
                    return;
                  }
                  openItem(item);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "2px 8px",
                  background: explorerState.selectedItemId === item.id ? "#000080" : "transparent",
                  color: explorerState.selectedItemId === item.id ? "#fff" : "#111",
                  fontSize: 11,
                  cursor: "default",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 10, flexShrink: 0, minWidth: 20 }}>{itemIcon(item)}</span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                <span style={{ fontSize: 9, color: explorerState.selectedItemId === item.id ? "rgba(255,255,255,0.7)" : "#808080", flexShrink: 0 }}>
                  {item.typeLabel || (item.itemType === "folder" ? "Folder" : item.itemType === "text" ? "Text Document" : "Application")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ padding: "2px 8px", borderTop: "1px solid #808080", fontSize: 10, color: "#555", flexShrink: 0, background: "#fff" }}>
        {currentItems.length} object{currentItems.length !== 1 ? "s" : ""}
        {explorerState.selectedItemId && (() => {
          const selected = getItemById(explorerState.selectedItemId);
          return selected ? ` | ${selected.title} selected` : "";
        })()}
      </div>
    </div>
  );
}
