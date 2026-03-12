"use client";

import { useFileSystem } from "../hooks/useFileSystem";

export default function TextDocumentApp() {
  const { activeTextDoc, updateTextContent } = useFileSystem();

  if (!activeTextDoc) {
    return <div style={{ padding: "16px 20px", color: "#666", fontSize: 12 }}>Open a text document from the desktop.</div>;
  }

  return (
    <div style={{ padding: 12, height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 11, color: "#666" }}>{activeTextDoc.title}</div>
      <textarea
        value={activeTextDoc.content || ""}
        onChange={(event) => updateTextContent(activeTextDoc.id, event.target.value)}
        style={{
          flex: 1,
          resize: "none",
          border: "2px inset #c0c0c0",
          fontFamily: "'Courier New', monospace",
          fontSize: 12,
          padding: 8,
          outline: "none",
        }}
      />
    </div>
  );
}
