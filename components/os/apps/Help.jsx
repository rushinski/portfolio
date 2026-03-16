"use client";

import { useState } from "react";

import {
  ETCHED_SEPARATOR_STYLE,
  WIN95_COLORS,
  getWin95TabStyle,
} from "../ui/retro";

const TOPICS = [
  {
    id: "getting-started",
    title: "Overview",
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
        "Use the \"OS Explore\" button in the taskbar to open all apps",
        "Click the clock to open a calendar popup",
      ]},
    ],
  },
  {
    id: "keyboard-shortcuts",
    title: "Shortcuts",
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
    title: "Apps",
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
        ["Where's Jacob", "Current location — Harrisburg, Lancaster, Philly"],
        ["Minesweeper", "Classic mine-sweeping game"],
        ["Help", "This help viewer"],
      ]},
    ],
  },
  {
    id: "file-management",
    title: "Files",
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
        ["dir / ls", "List files in current directory"],
        ["cd [folder]", "Change directory"],
        ["mkdir [name]", "Create a new folder"],
        ["rm [name]", "Delete a file"],
        ["cat [name]", "Display file contents"],
        ["clear", "Clear the screen"],
        ["help", "Show command reference"],
      ]},
    ],
  },
  {
    id: "tips",
    title: "Tips",
    content: [
      { heading: "Power User Tips" },
      { list: [
        "Right-click any desktop icon for Cut, Copy, Rename, Delete, and Properties",
        "Drag an icon over the Recycle Bin to delete it quickly",
        "Hold Alt and tap Tab to cycle through open windows — release Alt to switch",
        "Ctrl+A selects all desktop icons at once, then Delete moves them all to the Bin",
        "The About app pulls live data from GitHub — check back after new pushes",
        "Settings persist across page refreshes — your preferences are saved",
        "Use \"Cascade Windows\" or \"Tile Windows\" from the View menu to arrange many windows at once",
        "The screensaver activates after the timeout you set in Settings",
        "In Minesweeper, right-click cells to place flags on suspected mines",
      ]},
    ],
  },
];

export default function HelpApp() {
  const [activeTab, setActiveTab] = useState(TOPICS[0].id);
  const topic = TOPICS.find((t) => t.id === activeTab) || TOPICS[0];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: WIN95_COLORS.surface,
        color: WIN95_COLORS.text,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "8px 10px 0", background: WIN95_COLORS.surface }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          {TOPICS.map((t) => (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} style={getWin95TabStyle(activeTab === t.id)}>
              {t.title}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          margin: "0 10px 10px",
          padding: 12,
          background: WIN95_COLORS.surface,
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #808080",
          borderBottom: "2px solid #808080",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {topic.content.map((block, i) => {
          if (block.heading) {
            return (
              <div key={i} style={{ marginBottom: 6, marginTop: i === 0 ? 0 : 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: WIN95_COLORS.text, marginBottom: 6 }}>{block.heading}</div>
                <div style={{ ...ETCHED_SEPARATOR_STYLE, marginBottom: 8 }} />
              </div>
            );
          }
          if (block.text) {
            return <div key={i} style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 6 }}>{block.text}</div>;
          }
          if (block.list) {
            return (
              <ul key={i} style={{ paddingLeft: 20, marginBottom: 8, fontSize: 12, lineHeight: 1.7 }}>
                {block.list.map((item, j) => <li key={j} style={{ marginBottom: 2 }}>{item}</li>)}
              </ul>
            );
          }
          if (block.table) {
            return (
              <table key={i} style={{ borderCollapse: "collapse", marginBottom: 10, width: "100%", fontSize: 12 }}>
                <tbody>
                  {block.table.map(([left, right], j) => (
                    <tr key={j}>
                      <td style={{ padding: "3px 14px 3px 0", fontWeight: 700, whiteSpace: "nowrap", verticalAlign: "top", color: WIN95_COLORS.text, minWidth: 130 }}>{left}</td>
                      <td style={{ padding: "3px 0", verticalAlign: "top", color: WIN95_COLORS.textMuted }}>{right}</td>
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
