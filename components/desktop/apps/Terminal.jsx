"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { EXPERIENCE, PERSONAL, PROJECTS, SKILLS } from "@/components/shared/data";
import { useFileSystem } from "../hooks/useFileSystem";
import { useSystem } from "../hooks/useSystem";

const DEFAULT_TERMINAL_FOLDER_ID = "drive-c";
const DRIVE_LABELS = {
  "drive-a": "A:\\",
  "drive-c": "C:\\",
  "drive-d": "D:\\",
};

function parseCommandLine(input) {
  return Array.from(input.matchAll(/"([^"]*)"|[^\s]+/g)).map((match) => match[1] ?? match[0]);
}

function formatItemsForListing(items, isContainerItem) {
  if (!items.length) {
    return "Directory is empty.";
  }

  return items
    .sort((a, b) => {
      const aWeight = isContainerItem(a) ? 0 : 1;
      const bWeight = isContainerItem(b) ? 0 : 1;
      if (aWeight !== bWeight) {
        return aWeight - bWeight;
      }
      return a.title.localeCompare(b.title);
    })
    .map((item) => `${isContainerItem(item) ? "<DIR>" : (item.sizeLabel || "").padEnd(8, " ")}  ${item.title}`)
    .join("\n");
}

export default function TerminalApp() {
  const {
    canCreateInFolder,
    canDeleteItem,
    commitRenameItem,
    createFolder,
    createTextDocument,
    getFolderPathSegments,
    getItemById,
    getItemsInFolder,
    isContainerItem,
    moveItemToRecycleBin,
    openItem,
  } = useFileSystem();
  const { formattedUptime } = useSystem();
  const [history, setHistory] = useState([
    { type: "output", text: "JacobOS Terminal v1.0" },
    { type: "output", text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState(DEFAULT_TERMINAL_FOLDER_ID);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (currentFolderId && !getItemById(currentFolderId)) {
      setCurrentFolderId(DEFAULT_TERMINAL_FOLDER_ID);
    }
  }, [currentFolderId, getItemById]);

  const currentPathLabel = useMemo(() => {
    if (currentFolderId === null) {
      return "Desktop";
    }

    const segments = getFolderPathSegments(currentFolderId);
    const driveIndex = segments.findIndex((segment) => DRIVE_LABELS[segment.id]);
    if (driveIndex >= 0) {
      const driveLabel = DRIVE_LABELS[segments[driveIndex].id];
      const rest = segments.slice(driveIndex + 1).map((segment) => segment.title).join("\\");
      return rest ? `${driveLabel}${rest}` : driveLabel;
    }

    return segments.map((segment) => segment.title).join("\\");
  }, [currentFolderId, getFolderPathSegments]);

  const projectDetails = useMemo(
    () => PROJECTS.map((project, index) => [
      `${index + 1}. ${project.title} (${project.date}) ${project.status === "IN_PROGRESS" ? "[WIP]" : "[COMPLETE]"}`,
      `   ${project.desc}`,
      ...project.impact.map((line) => `   - ${line}`),
    ].join("\n")).join("\n\n"),
    [],
  );

  const experienceDetails = useMemo(
    () => EXPERIENCE.map((experience, index) => [
      `${index + 1}. ${experience.role} @ ${experience.company} (${experience.period})`,
      `   ${experience.type}`,
      `   ${experience.desc}`,
      ...experience.bullets.map((line) => `   - ${line}`),
    ].join("\n")).join("\n\n"),
    [],
  );

  const resolvePath = (target, baseFolderId = currentFolderId) => {
    if (!target || target === ".") {
      return baseFolderId;
    }

    const normalized = target.replace(/\\/g, "/").trim();
    const absolute = normalized.startsWith("/");
    let cursor = absolute ? DEFAULT_TERMINAL_FOLDER_ID : baseFolderId;
    const parts = normalized.split("/").filter(Boolean);

    if (normalized.toLowerCase() === "desktop") {
      return null;
    }

    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      const lowerPart = part.toLowerCase();

      if (part === ".") {
        continue;
      }

      if (part === "..") {
        cursor = getItemById(cursor)?.parentId ?? null;
        continue;
      }

      if (lowerPart === "desktop") {
        cursor = null;
        continue;
      }

      const siblings = getItemsInFolder(cursor);
      const nextItem = siblings.find((item) => {
        const titleMatch = item.title.toLowerCase() === lowerPart;
        const driveMatch = item.id === "drive-c" && (lowerPart === "c:" || lowerPart === "c");
        const driveAMatch = item.id === "drive-a" && (lowerPart === "a:" || lowerPart === "a");
        const driveDMatch = item.id === "drive-d" && (lowerPart === "d:" || lowerPart === "d");
        return titleMatch || driveMatch || driveAMatch || driveDMatch;
      });

      if (!nextItem) {
        return null;
      }

      cursor = nextItem.id;
    }

    return cursor;
  };

  const readFileContents = (targetPath) => {
    const itemId = resolvePath(targetPath);
    const item = itemId ? getItemById(itemId) : null;

    if (!item) {
      return `cat: cannot find "${targetPath}"`;
    }

    if (isContainerItem(item)) {
      return `cat: "${item.title}" is a directory`;
    }

    if (item.itemType === "text") {
      return item.content || "";
    }

    if (item.itemType === "pdf") {
      return `${item.title}\nPDF Document\nUse "open ${item.title}" to view it in JacobOS.`;
    }

    return `${item.title}\n${item.typeLabel || "Item"}\nThis file cannot be read as plain text.`;
  };

  const createTextFile = (name) => {
    if (!name) {
      return 'touch: missing file name';
    }

    if (!canCreateInFolder(currentFolderId)) {
      return "touch: access denied";
    }

    const existing = getItemsInFolder(currentFolderId).find((item) => item.title.toLowerCase() === name.toLowerCase());
    if (existing) {
      return `touch: "${name}" already exists`;
    }

    const normalizedName = name.includes(".") ? name : `${name}.txt`;
    const id = createTextDocument({ parentId: currentFolderId, title: normalizedName });
    if (!id) {
      return `touch: failed to create "${normalizedName}"`;
    }

    return `Created ${normalizedName}`;
  };

  const createFolderCommand = (name) => {
    if (!name) {
      return 'mkdir: missing folder name';
    }

    if (!canCreateInFolder(currentFolderId)) {
      return "mkdir: access denied";
    }

    const existing = getItemsInFolder(currentFolderId).find((item) => item.title.toLowerCase() === name.toLowerCase());
    if (existing) {
      return `mkdir: "${name}" already exists`;
    }

    const id = createFolder({ parentId: currentFolderId, title: name });
    if (!id) {
      return `mkdir: failed to create "${name}"`;
    }

    return `Created folder ${name}`;
  };

  const deleteItemCommand = (targetPath) => {
    if (!targetPath) {
      return 'rm: missing target';
    }

    const itemId = resolvePath(targetPath);
    const item = itemId ? getItemById(itemId) : null;
    if (!item) {
      return `rm: cannot find "${targetPath}"`;
    }

    if (!canDeleteItem(item)) {
      return `rm: "${item.title}" is protected`;
    }

    const deleted = moveItemToRecycleBin(item.id);
    return deleted ? `Moved ${item.title} to Recycle Bin` : `rm: failed to delete "${item.title}"`;
  };

  const changeDirectory = (targetPath) => {
    if (!targetPath) {
      return currentPathLabel;
    }

    const nextId = resolvePath(targetPath);
    const nextItem = nextId !== null ? getItemById(nextId) : null;

    if (targetPath.toLowerCase() !== "desktop" && !nextItem) {
      return `cd: cannot find "${targetPath}"`;
    }

    if (nextId !== null && nextItem && !isContainerItem(nextItem)) {
      return `cd: "${nextItem.title}" is not a directory`;
    }

    setCurrentFolderId(nextId);
    return null;
  };

  const openTarget = (targetPath) => {
    if (!targetPath) {
      return 'open: missing target';
    }

    const itemId = resolvePath(targetPath);
    const item = itemId !== null ? getItemById(itemId) : null;
    if (!item) {
      return `open: cannot find "${targetPath}"`;
    }

    openItem(item);
    return `Opened ${item.title}`;
  };

  const renameTarget = (sourceName, nextName) => {
    if (!sourceName || !nextName) {
      return 'rename: usage rename "old name" "new name"';
    }

    const itemId = resolvePath(sourceName);
    const item = itemId ? getItemById(itemId) : null;
    if (!item) {
      return `rename: cannot find "${sourceName}"`;
    }

    commitRenameItem(item.id, nextName);
    return `Renamed ${item.title} to ${nextName}`;
  };

  const runCommand = (rawInput) => {
    const tokens = parseCommandLine(rawInput);
    const [command = "", ...args] = tokens;
    const lowerCommand = command.toLowerCase();

    if (!lowerCommand) {
      return "";
    }

    if (lowerCommand === "clear") {
      return "__CLEAR__";
    }

    if (lowerCommand === "help") {
      return [
        "Available commands:",
        "help, clear, date, uptime, pwd, ls, dir, cd, mkdir, touch, cat, rm, rename, open, whoami, skills, contact, projects, experience, neofetch",
        'Tips: use quotes for names with spaces, for example: mkdir "New Folder"',
      ].join("\n");
    }

    if (lowerCommand === "whoami") {
      return `${PERSONAL.name} - ${PERSONAL.title}\n${PERSONAL.location}`;
    }

    if (lowerCommand === "skills") {
      return Object.entries(SKILLS).map(([category, items]) => `${category}: ${items.join(", ")}`).join("\n");
    }

    if (lowerCommand === "contact") {
      return `Email: ${PERSONAL.email}\nGitHub: ${PERSONAL.github}\nLinkedIn: ${PERSONAL.linkedin}`;
    }

    if (lowerCommand === "projects") {
      return projectDetails;
    }

    if (lowerCommand === "experience") {
      return experienceDetails;
    }

    if (lowerCommand === "date") {
      return new Date().toString();
    }

    if (lowerCommand === "uptime") {
      return `System uptime: ${formattedUptime}`;
    }

    if (lowerCommand === "pwd") {
      return currentPathLabel;
    }

    if (lowerCommand === "ls" || lowerCommand === "dir") {
      const targetFolderId = args[0] ? resolvePath(args[0]) : currentFolderId;
      const targetItem = targetFolderId !== null ? getItemById(targetFolderId) : null;
      if (args[0] && args[0].toLowerCase() !== "desktop" && !targetItem) {
        return `ls: cannot find "${args[0]}"`;
      }
      if (targetFolderId !== null && targetItem && !isContainerItem(targetItem)) {
        return `ls: "${targetItem.title}" is not a directory`;
      }
      return formatItemsForListing(getItemsInFolder(targetFolderId), isContainerItem);
    }

    if (lowerCommand === "cd") {
      return changeDirectory(args[0] || "");
    }

    if (lowerCommand === "mkdir") {
      return createFolderCommand(args.join(" "));
    }

    if (lowerCommand === "touch") {
      return createTextFile(args.join(" "));
    }

    if (lowerCommand === "cat") {
      if (args.length === 0) {
        return 'cat: missing file name';
      }
      return readFileContents(args.join(" "));
    }

    if (lowerCommand === "rm" || lowerCommand === "del") {
      return deleteItemCommand(args.join(" "));
    }

    if (lowerCommand === "rename") {
      return renameTarget(args[0], args.slice(1).join(" "));
    }

    if (lowerCommand === "open") {
      return openTarget(args.join(" "));
    }

    if (lowerCommand === "echo") {
      return args.join(" ");
    }

    if (lowerCommand === "neofetch") {
      return [
        "   .--------.",
        "   | JacobOS |    " + PERSONAL.name,
        "   |  v1.0   |    " + "-".repeat(PERSONAL.name.length + 2),
        "   '--------'    OS: JacobOS 1.0",
        "                 Shell: jsh 0.2",
        `                 Path: ${currentPathLabel}`,
        `                 Uptime: ${formattedUptime}`,
        "                 Filesystem: shared with Explorer",
      ].join("\n");
    }

    return `jsh: command not found: ${lowerCommand}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rawInput = input.trim();
    const prompt = `${currentPathLabel}>`;
    const nextHistory = rawInput
      ? [...history, { type: "input", text: `${prompt} ${input}` }]
      : [...history, { type: "input", text: prompt }];

    const result = runCommand(rawInput);

    if (result === "__CLEAR__") {
      setHistory([]);
      setInput("");
      return;
    }

    if (result) {
      setHistory([...nextHistory, { type: "output", text: result }]);
    } else {
      setHistory(nextHistory);
    }

    setInput("");
  };

  return (
    <div style={{ background: "#0d1117", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflow: "auto",
          padding: "12px",
          fontFamily: "\"Courier New\", monospace",
          userSelect: "text",
          cursor: "text",
        }}
      >
        {history.map((entry, index) => (
          <div
            key={`${entry.type}-${index}`}
            style={{
              color: entry.type === "input" ? "#58a6ff" : "#00ff41",
              fontSize: 12,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              marginBottom: 2,
              userSelect: "text",
            }}
          >
            {entry.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", borderTop: "1px solid #30363d" }}>
        <span
          style={{
            color: "#00ff41",
            padding: "8px 6px 8px 12px",
            fontSize: 12,
            fontFamily: "\"Courier New\", monospace",
            background: "#0d1117",
            whiteSpace: "nowrap",
          }}
        >
          {`${currentPathLabel}>`}
        </span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          style={{
            flex: 1,
            background: "#0d1117",
            border: "none",
            color: "#e6edf3",
            fontSize: 12,
            fontFamily: "\"Courier New\", monospace",
            padding: "8px 8px",
            outline: "none",
          }}
          autoFocus
        />
      </form>
    </div>
  );
}
