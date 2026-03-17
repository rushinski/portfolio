"use client";

import { useEffect, useRef, useState } from "react";

import { useFileSystem } from "../hooks/useFileSystem";

export default function TextDocumentApp() {
  const { activeTextDoc, updateTextContent } = useFileSystem();
  const [localContent, setLocalContent] = useState(activeTextDoc?.content || "");
  const historyRef = useRef([activeTextDoc?.content || ""]);
  const historyIndexRef = useRef(0);
  const prevDocIdRef = useRef(activeTextDoc?.id);

  // Sync when active doc changes
  useEffect(() => {
    if (activeTextDoc?.id !== prevDocIdRef.current) {
      const content = activeTextDoc?.content || "";
      setLocalContent(content);
      historyRef.current = [content];
      historyIndexRef.current = 0;
      prevDocIdRef.current = activeTextDoc?.id;
    }
  }, [activeTextDoc]);

  if (!activeTextDoc) {
    return <div style={{ padding: "16px 20px", color: "#666", fontSize: 12 }}>Open a text document from the desktop.</div>;
  }

  const pushHistory = (content) => {
    const history = historyRef.current.slice(0, historyIndexRef.current + 1);
    historyRef.current = [...history, content];
    historyIndexRef.current = history.length;
  };

  const handleChange = (event) => {
    const content = event.target.value;
    setLocalContent(content);
    pushHistory(content);
    updateTextContent(activeTextDoc.id, content);
  };

  const handleKeyDown = (event) => {
    const ctrl = event.ctrlKey || event.metaKey;

    if (ctrl && event.key === "z" && !event.shiftKey) {
      event.preventDefault();
      if (historyIndexRef.current > 0) {
        historyIndexRef.current--;
        const prev = historyRef.current[historyIndexRef.current];
        setLocalContent(prev);
        updateTextContent(activeTextDoc.id, prev);
      }
      return;
    }

    if (ctrl && (event.key === "y" || (event.shiftKey && event.key === "z") || (event.shiftKey && event.key === "Z"))) {
      event.preventDefault();
      if (historyIndexRef.current < historyRef.current.length - 1) {
        historyIndexRef.current++;
        const next = historyRef.current[historyIndexRef.current];
        setLocalContent(next);
        updateTextContent(activeTextDoc.id, next);
      }
      return;
    }
  };

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <div style={{ padding: "3px 8px", borderBottom: "1px solid #808080", display: "flex", alignItems: "center", gap: 6, background: "#c0c0c0", flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: "#555", marginRight: 4 }}>{activeTextDoc.title}</span>
        <div style={{ width: 1, height: 14, background: "#808080" }} />
        <button
          onClick={() => {
            if (historyIndexRef.current > 0) {
              historyIndexRef.current--;
              const prev = historyRef.current[historyIndexRef.current];
              setLocalContent(prev);
              updateTextContent(activeTextDoc.id, prev);
            }
          }}
          disabled={!canUndo}
          style={{ border: "none", borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040", background: "#c0c0c0", fontSize: 10, padding: "1px 6px", fontFamily: "inherit", cursor: canUndo ? "pointer" : "default", color: canUndo ? "#111" : "#888" }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            if (historyIndexRef.current < historyRef.current.length - 1) {
              historyIndexRef.current++;
              const next = historyRef.current[historyIndexRef.current];
              setLocalContent(next);
              updateTextContent(activeTextDoc.id, next);
            }
          }}
          disabled={!canRedo}
          style={{ border: "none", borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040", background: "#c0c0c0", fontSize: 10, padding: "1px 6px", fontFamily: "inherit", cursor: canRedo ? "pointer" : "default", color: canRedo ? "#111" : "#888" }}
        >
          Redo
        </button>
      </div>
      {/* Editor */}
      <textarea
        value={localContent}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ flex: 1, resize: "none", border: "none", borderTop: "2px inset #c0c0c0", fontFamily: "'Courier New', monospace", fontSize: 12, padding: 8, outline: "none" }}
      />
    </div>
  );
}
