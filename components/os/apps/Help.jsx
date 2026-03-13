"use client";

import { useState } from "react";

const TOPICS = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      { heading: "Welcome to JacobOS" },
      { text: "JacobOS is an interactive portfolio styled as a Windows 95-inspired operating system. Navigate around to learn about Jacob Rushinski — his skills, experience, and projects." },
      { heading: "How to Navigate" },
      { list: [
        "Double-click desktop icons to open apps",
        "Drag windows by their title bar to move them",
        "Resize windows by dragging any edge or corner",
        "Click taskbar buttons to switch between open windows",
        "Right-click the desktop or icons for options",
        'Use the "OS Explore" button in the taskbar to open all apps',
        "Click the clock to open a calendar popup",
      ]},
    ],
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    content: [
      { heading: "Window Management" },
      { table: [
        ["Alt+F4", "Close the active window"],
        ["Alt+Tab", "Switch between open windows"],
      ]},
      { heading: "Desktop Icons" },
      { table: [
        ["F2", "Rename selected icon"],
        ["Delete", "Move selected icon to Recycle Bin"],
        ["Ctrl+A", "Select all desktop icons"],
        ["Ctrl+C", "Copy selected icon"],
        ["Ctrl+X", "Cut selected icon"],
        ["Ctrl+V", "Paste icon"],
        ["Ctrl+Shift+N", "New folder"],
        ["Shift+Arrow", "Nudge selected icon one grid cell"],
      ]},
      { heading: "Text Document" },
      { table: [
        ["Ctrl+Z", "Undo"],
        ["Ctrl+Y", "Redo"],
      ]},
      { heading: "General" },
      { table: [
        ["Escape", "Close menus or cancel rename"],
        ["F1", "Open Help"],
      ]},
    ],
  },
  {
    id: "apps",
    title: "Available Apps",
    content: [
      { heading: "Portfolio Apps" },
      { table: [
        ["Welcome", "Start here — overview of JacobOS"],
        ["About", "GitHub profile, stats, and repos"],
        ["Skills", "Technology skills by category"],
        ["Experience", "Work history and roles"],
        ["Projects", "Portfolio projects with details"],
        ["Videos", "Project demo videos"],
        ["Contact", "Send Jacob a message"],
        ["Resume", "View and download resume PDF"],
      ]},
      { heading: "System Apps" },
      { table: [
        ["File Explorer", "Browse the virtual file system"],
        ["Terminal", "Command-line file navigation"],
        ["Settings", "Display, sound, and screensaver options"],
        ["Recycle Bin", "Restore or permanently delete items"],
        ["Jacobs Time", "Live clock and date display"],
        ["Calculator", "Standard arithmetic calculator"],
        ["Minesweeper", "Classic mine-sweeping game"],
        ["Help", "This help viewer"],
      ]},
    ],
  },
  {
    id: "file-management",
    title: "File Management",
    content: [
      { heading: "The Virtual File System" },
      { text: "JacobOS includes a fully navigable virtual file system with drives, folders, and text documents." },
      { heading: "Drives" },
      { table: [
        ["A:", "3.5\" Floppy Disk (1.44 MB)"],
        ["C:", "JacobOS main drive (2.1 GB)"],
        ["D:", "Archive drive (824 MB)"],
      ]},
      { heading: "File Operations" },
      { list: [
        "Create folders and text documents from the desktop right-click menu or the top File menu",
        "Rename items with F2 or right-click → Rename",
        "Delete items to move them to the Recycle Bin",
        "Restore deleted items from the Recycle Bin app",
        "Cut, copy, and paste items between locations",
        "Drag icons onto the Recycle Bin to delete them",
        "Right-click any icon and choose Properties to view details",
      ]},
      { heading: "Terminal Commands" },
      { table: [
        ["dir", "List files in current directory"],
        ["cd [folder]", "Change directory"],
        ["mkdir [name]", "Create a new folder"],
        ["del [name]", "Delete a file"],
        ["type [name]", "Display file contents"],
        ["cls", "Clear the screen"],
        ["help", "Show command reference"],
      ]},
    ],
  },
  {
    id: "tips",
    title: "Tips & Tricks",
    content: [
      { heading: "Power User Tips" },
      { list: [
        "Right-click any desktop icon for Cut, Copy, Rename, Delete, and Properties",
        "Drag an icon over the Recycle Bin to delete it quickly",
        "Hold Alt and tap Tab to cycle through open windows — release Alt to switch",
        "Ctrl+A selects all desktop icons at once, then Delete moves them all to the Bin",
        "The About app pulls live data from GitHub — check back after new pushes",
        "Settings persist across page refreshes — your preferences are saved",
        'Use "Cascade Windows" or "Tile Windows" from the View menu to arrange many windows at once',
        "The screensaver activates after the timeout you set in Settings",
        "Calculator memory: MS stores, MR recalls, MC clears, M+ adds to memory",
        "In Minesweeper, right-click cells to place flags on suspected mines",
      ]},
    ],
  },
];

const BODY_STYLE = { fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.7, color: "#111" };
const HEADING_STYLE = { fontWeight: 700, fontSize: 13, marginTop: 14, marginBottom: 4, fontFamily: "inherit", borderBottom: "1px solid #c0c0c0", paddingBottom: 3, color: "#000080" };
const TEXT_STYLE = { marginBottom: 8 };
const LIST_STYLE = { paddingLeft: 20, marginBottom: 8 };

export default function HelpApp() {
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const topic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 170, flexShrink: 0, borderRight: "2px solid #808080", background: "#c0c0c0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "#000080", color: "#fff", fontWeight: 700, padding: "5px 10px", fontSize: 11, flexShrink: 0 }}>
          Contents
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTopicId(t.id)}
              style={{ display: "block", width: "100%", padding: "6px 12px", border: "none", background: topicId === t.id ? "#000080" : "transparent", color: topicId === t.id ? "#fff" : "#111", textAlign: "left", fontSize: 12, fontFamily: "inherit", cursor: "pointer", borderBottom: "1px solid #b0b0b0" }}
              onMouseEnter={(e) => { if (topicId !== t.id) { e.currentTarget.style.background = "#d0d0e8"; } }}
              onMouseLeave={(e) => { if (topicId !== t.id) { e.currentTarget.style.background = "transparent"; } }}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content pane */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 18px", background: "#fff", ...BODY_STYLE }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, fontFamily: "'Courier New', monospace", borderBottom: "2px solid #000080", paddingBottom: 6, color: "#000080" }}>
          {topic.title}
        </div>
        {topic.content.map((block, i) => {
          if (block.heading) {
            return <div key={i} style={HEADING_STYLE}>{block.heading}</div>;
          }
          if (block.text) {
            return <div key={i} style={TEXT_STYLE}>{block.text}</div>;
          }
          if (block.list) {
            return (
              <ul key={i} style={LIST_STYLE}>
                {block.list.map((item, j) => <li key={j} style={{ marginBottom: 3 }}>{item}</li>)}
              </ul>
            );
          }
          if (block.table) {
            return (
              <table key={i} style={{ borderCollapse: "collapse", marginBottom: 10, width: "100%" }}>
                <tbody>
                  {block.table.map(([left, right], j) => (
                    <tr key={j}>
                      <td style={{ padding: "2px 12px 2px 0", fontWeight: 700, whiteSpace: "nowrap", verticalAlign: "top", color: "#333", minWidth: 130 }}>{left}</td>
                      <td style={{ padding: "2px 0", verticalAlign: "top", color: "#444" }}>{right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
