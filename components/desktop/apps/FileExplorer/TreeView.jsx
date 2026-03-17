"use client";

import { WIN95_COLORS } from "../../ui/retro";
import { ExplorerItemGlyph } from "./Glyphs";
import { TREE_ROW_HEIGHT, TREE_INDENT } from "./utils";

export function ExplorerMenuButton({ label }) {
  return (
    <button
      type="button"
      style={{ border: "none", background: "transparent", color: WIN95_COLORS.text, fontSize: 12, fontFamily: "inherit", padding: "2px 7px", cursor: "default" }}
    >
      {label}
    </button>
  );
}

export function TreeRow({
  depth,
  label,
  selected,
  dropActive = false,
  icon,
  hasChildren,
  isCollapsed,
  onToggle,
  onClick,
  onContextMenu,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  const rowColor = selected ? "#ffffff" : WIN95_COLORS.text;
  const connectorLeft = 10 + depth * TREE_INDENT;

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        position: "relative",
        height: TREE_ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        paddingLeft: 6 + depth * TREE_INDENT,
        background: dropActive ? "#5b8fd8" : selected ? WIN95_COLORS.selection : "transparent",
        color: dropActive ? "#ffffff" : rowColor,
        fontSize: 12,
        whiteSpace: "nowrap",
        cursor: "default",
      }}
    >
      {depth > 0 && (
        <>
          <div style={{ position: "absolute", left: connectorLeft + 5, top: 0, bottom: 0, borderLeft: "1px dotted #8a8a8a" }} />
          <div style={{ position: "absolute", left: connectorLeft + 5, top: 8, width: 8, borderTop: "1px dotted #8a8a8a" }} />
        </>
      )}

      {hasChildren ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggle?.();
          }}
          style={{
            width: 11,
            height: 11,
            marginRight: 4,
            padding: 0,
            border: "1px solid #808080",
            background: "#ffffff",
            color: "#202020",
            fontSize: 10,
            lineHeight: "9px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {isCollapsed ? "+" : "-"}
        </button>
      ) : (
        <div style={{ width: 11, marginRight: 4, flexShrink: 0 }} />
      )}

      <div style={{ marginRight: 4, display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</div>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </div>
  );
}

export function FolderTreeNode({
  folder,
  depth,
  currentFolderId,
  dropTargetId,
  childrenByParent,
  collapsedNodeIds,
  toggleNode,
  onSelect,
  onContextMenu,
  onDragOverFolder,
  onDropToFolder,
  onClearDropState,
}) {
  const childFolders = childrenByParent.get(folder.id) || [];
  const isCollapsed = collapsedNodeIds.has(folder.id);

  return (
    <>
      <TreeRow
        depth={depth}
        label={folder.title}
        selected={currentFolderId === folder.id}
        dropActive={dropTargetId === folder.id}
        icon={<ExplorerItemGlyph item={folder} size={16} />}
        hasChildren={childFolders.length > 0}
        isCollapsed={isCollapsed}
        onToggle={() => toggleNode(folder.id)}
        onClick={() => onSelect(folder.id)}
        onContextMenu={(event) => onContextMenu(event, folder)}
        onDragOver={(event) => onDragOverFolder(event, folder.id)}
        onDragLeave={onClearDropState}
        onDrop={(event) => onDropToFolder(event, folder.id)}
      />
      {!isCollapsed && childFolders.map((childFolder) => (
        <FolderTreeNode
          key={childFolder.id}
          folder={childFolder}
          depth={depth + 1}
          currentFolderId={currentFolderId}
          dropTargetId={dropTargetId}
          childrenByParent={childrenByParent}
          collapsedNodeIds={collapsedNodeIds}
          toggleNode={toggleNode}
          onSelect={onSelect}
          onContextMenu={onContextMenu}
          onDragOverFolder={onDragOverFolder}
          onDropToFolder={onDropToFolder}
          onClearDropState={onClearDropState}
        />
      ))}
    </>
  );
}
