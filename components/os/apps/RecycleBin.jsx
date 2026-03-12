"use client";

import { useFileSystem } from "../hooks/useFileSystem";

export default function RecycleBinApp() {
  const { recycleBinItems, restoreRecycleBinItem, permanentlyDeleteRecycleBinItem, emptyRecycleBin } = useFileSystem();

  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Recycle Bin</div>
          <div style={{ fontSize: 12, color: "#555" }}>{recycleBinItems.length} item{recycleBinItems.length === 1 ? "" : "s"}</div>
        </div>
        <button
          onClick={emptyRecycleBin}
          disabled={recycleBinItems.length === 0}
          style={{
            background: "#c0c0c0",
            border: "none",
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
            borderRight: "2px solid #404040",
            borderBottom: "2px solid #404040",
            padding: "4px 10px",
            fontSize: 11,
            cursor: recycleBinItems.length === 0 ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: recycleBinItems.length === 0 ? 0.55 : 1,
          }}
        >
          Empty Bin
        </button>
      </div>

      <div style={{ border: "2px inset #c0c0c0", background: "#fff", flex: 1, minHeight: 180, overflow: "auto", padding: 8 }}>
        {recycleBinItems.length === 0 ? (
          <div style={{ fontSize: 12, color: "#666" }}>Recycle Bin is empty.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {recycleBinItems.map((entry) => (
              <div
                key={entry.item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 12,
                  color: "#222",
                  border: "1px solid #d0d0d0",
                  background: "#f7f7f7",
                  padding: "6px 8px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 600 }}>
                    {entry.item.title}
                  </div>
                  <div style={{ color: "#666", fontSize: 10 }}>
                    Deleted {new Date(entry.deletedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button onClick={() => restoreRecycleBinItem(entry.item.id)} style={{ fontSize: 10, padding: "2px 6px" }}>Restore</button>
                  <button onClick={() => permanentlyDeleteRecycleBinItem(entry.item.id)} style={{ fontSize: 10, padding: "2px 6px" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
