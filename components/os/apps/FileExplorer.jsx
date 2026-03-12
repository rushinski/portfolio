"use client";

import { useState } from "react";

import { useFileSystem } from "../hooks/useFileSystem";

export default function FileExplorerApp() {
  const { desktopItems, openItem } = useFileSystem();
  const [navStack, setNavStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const folders = desktopItems.filter((item) => item.itemType === "folder");
  const currentItems = currentFolderId === null
    ? desktopItems.filter((item) => (item.parentId ?? null) === null)
    : desktopItems.filter((item) => item.parentId === currentFolderId);
  const currentFolderTitle = currentFolderId === null
    ? "Desktop"
    : (desktopItems.find((item) => item.id === currentFolderId)?.title || "Folder");

  const navigateTo = (folderId) => {
    setNavStack((prev) => [...prev, currentFolderId]);
    setForwardStack([]);
    setCurrentFolderId(folderId);
    setSelectedId(null);
  };

  const goBack = () => {
    if (navStack.length === 0) return;
    const previousFolder = navStack[navStack.length - 1];
    setForwardStack((prev) => [...prev, currentFolderId]);
    setNavStack((prev) => prev.slice(0, -1));
    setCurrentFolderId(previousFolder);
    setSelectedId(null);
  };

  const goForward = () => {
    if (forwardStack.length === 0) return;
    const nextFolder = forwardStack[forwardStack.length - 1];
    setNavStack((prev) => [...prev, currentFolderId]);
    setForwardStack((prev) => prev.slice(0, -1));
    setCurrentFolderId(nextFolder);
    setSelectedId(null);
  };

  const goUp = () => {
    if (currentFolderId === null) return;
    navigateTo(null);
  };

  const handleItemDoubleClick = (item) => {
    if (item.itemType === "folder") {
      navigateTo(item.id);
      return;
    }
    openItem(item);
  };

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
    if (item.itemType === "folder") return "📁";
    if (item.itemType === "text") return "📄";
    return "🖥";
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "inherit", overflow: "hidden" }}>
      <div style={{ padding: "4px 6px", borderBottom: "1px solid #808080", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
        {navButton("◄", navStack.length === 0, goBack)}
        {navButton("►", forwardStack.length === 0, goForward)}
        {navButton("▲", currentFolderId === null, goUp)}
        <div style={{ flex: 1, marginLeft: 4, padding: "1px 6px", border: "2px inset #c0c0c0", background: "#fff", fontSize: 11, color: "#111", lineHeight: "18px", height: 20, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <span style={{ color: "#808080" }}>Desktop</span>
          {currentFolderId !== null && (
            <span> › <span style={{ color: "#111" }}>{currentFolderTitle}</span></span>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        <div style={{ width: 130, flexShrink: 0, borderRight: "1px solid #808080", overflowY: "auto", background: "#d4d0c8", padding: "4px 0" }}>
          <div onClick={() => navigateTo(null)} style={{ padding: "2px 8px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, background: currentFolderId === null ? "#000080" : "transparent", color: currentFolderId === null ? "#fff" : "#111" }}>
            <span>🖥</span> Desktop
          </div>
          {folders.map((folder) => (
            <div key={folder.id} onClick={() => navigateTo(folder.id)} style={{ padding: "2px 8px 2px 20px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, background: currentFolderId === folder.id ? "#000080" : "transparent", color: currentFolderId === folder.id ? "#fff" : "#111" }}>
              <span>📁</span>
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
                onClick={() => setSelectedId(item.id)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "2px 8px",
                  background: selectedId === item.id ? "#000080" : "transparent",
                  color: selectedId === item.id ? "#fff" : "#111",
                  fontSize: 11,
                  cursor: "default",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }}>{itemIcon(item)}</span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                <span style={{ fontSize: 9, color: selectedId === item.id ? "rgba(255,255,255,0.7)" : "#808080", flexShrink: 0 }}>
                  {item.itemType === "folder" ? "Folder" : item.itemType === "text" ? "Text Document" : "Application"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ padding: "2px 8px", borderTop: "1px solid #808080", fontSize: 10, color: "#555", flexShrink: 0, background: "#fff" }}>
        {currentItems.length} object{currentItems.length !== 1 ? "s" : ""}
        {selectedId && (() => {
          const selected = desktopItems.find((item) => item.id === selectedId);
          return selected ? ` · ${selected.title} selected` : "";
        })()}
      </div>
    </div>
  );
}
