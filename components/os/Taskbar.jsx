"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { canPinItemToTaskbar, MENU_TEXT_COLOR } from "./constants";
import { PERSONAL } from "./data";
import { useFileSystem } from "./hooks/useFileSystem";
import { useSettings } from "./hooks/useSettings";
import { useWindowManager } from "./hooks/useWindowManager";
import Tooltip from "./ui/Tooltip";

export default function Taskbar() {
  const { clockFormat } = useSettings();
  const { activeTextDoc, desktopItems, openItem } = useFileSystem();
  const {
    windows,
    openWindows,
    activeWindowId,
    pinnedTaskbarAppIds,
    activateTaskbarEntry,
    closeWindow,
  } = useWindowManager();

  const [clock, setClock] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const taskbarRef = useRef(null);
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const date = now.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "2-digit" });
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: clockFormat === "12h" });
      setClock(`${date} ${time}`);
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [clockFormat]);

  useEffect(() => {
    const closeMenus = (event) => {
      const target = event.target;
      if (target instanceof Node && taskbarRef.current?.contains(target)) {
        return;
      }

      setStartOpen(false);
      setCalendarOpen(false);
    };
    window.addEventListener("pointerdown", closeMenus);
    return () => window.removeEventListener("pointerdown", closeMenus);
  }, []);

  const desktopAppsById = useMemo(
    () => new Map(desktopItems.filter((item) => canPinItemToTaskbar(item)).map((item) => [item.id, item])),
    [desktopItems],
  );
  const desktopAppsByWindowId = useMemo(() => {
    const map = new Map();

    desktopItems
      .filter((item) => canPinItemToTaskbar(item) && (item.parentId ?? null) === null)
      .forEach((item) => {
        if (!map.has(item.windowId)) {
          map.set(item.windowId, item);
        }
      });

    return map;
  }, [desktopItems]);

  const renderTaskbarGlyph = (glyph) => {
    if (!glyph) {
      return null;
    }

    return (
      <span style={{ width: 18, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
        <span style={{ display: "inline-flex", transform: "scale(0.52)", transformOrigin: "center center" }}>{glyph}</span>
      </span>
    );
  };

  const normalizedPinnedIds = pinnedTaskbarAppIds.filter((id) => desktopAppsById.has(id));
  const pinnedTaskbarEntries = normalizedPinnedIds
    .filter((id) => !!windows[id])
    .map((id) => {
      const appItem = desktopAppsById.get(id);
      const win = windows[id];
      return {
        id,
        title: appItem?.title || win?.title || id,
        glyph: appItem?.glyph || null,
      };
    });

  const openTaskbarEntries = openWindows.map((win) => {
    const appItem = desktopAppsByWindowId.get(win.id);
    return {
      id: win.id,
      win,
      title: appItem?.title || win.title || win.id,
      glyph: win.id === "textdoc" ? (activeTextDoc?.glyph || null) : (appItem?.glyph || null),
    };
  });

  const monthStart = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 1);
  const monthEnd = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 0);
  const monthLabel = monthStart.toLocaleDateString([], { month: "long", year: "numeric" });
  const leadingDays = monthStart.getDay();
  const dayCells = [];
  for (let index = 0; index < leadingDays; index += 1) dayCells.push(null);
  for (let day = 1; day <= monthEnd.getDate(); day += 1) dayCells.push(day);
  while (dayCells.length % 7 !== 0) dayCells.push(null);

  const today = new Date();
  const isToday = (day) => (
    day
    && today.getFullYear() === monthStart.getFullYear()
    && today.getMonth() === monthStart.getMonth()
    && today.getDate() === day
  );

  return (
    <div ref={taskbarRef} style={{ display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
      <div style={{ background: "#b9b9b9", borderTop: "1px solid #fff", borderBottom: "1px solid #707070", borderLeft: "1px solid #d6d6d6", borderRight: "1px solid #707070", padding: "2px 6px", display: "flex", alignItems: "center", gap: 6, minHeight: 26 }}>
        <span style={{ fontSize: 10, color: "#4a4a4a", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", flexShrink: 0 }}>Pinned</span>
        <div style={{ width: 1, height: 14, background: "#808080", flexShrink: 0 }} />
        <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden" }}>
          {pinnedTaskbarEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={(event) => {
                event.stopPropagation();
                setStartOpen(false);
                setCalendarOpen(false);
                activateTaskbarEntry(entry.id);
              }}
              onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              style={{ border: "none", borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040", background: "#c0c0c0", padding: "2px 8px", fontSize: 11, color: "#222", fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160, lineHeight: 1.25, display: "flex", alignItems: "center", gap: 5 }}
            >
              {renderTaskbarGlyph(entry.glyph)}
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "#c0c0c0", borderTop: "2px solid #fff", padding: "3px 6px", display: "flex", alignItems: "center", gap: 4, position: "relative", zIndex: 8000, flexShrink: 0 }}>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setCalendarOpen(false);
            setStartOpen((prev) => !prev);
          }}
          style={{
            background: startOpen ? "#a0a0a0" : "#c0c0c0",
            border: "none",
            borderTop: startOpen ? "1px solid #404040" : "2px solid #fff",
            borderLeft: startOpen ? "1px solid #404040" : "2px solid #fff",
            borderRight: startOpen ? "1px solid #fff" : "2px solid #404040",
            borderBottom: startOpen ? "1px solid #fff" : "2px solid #404040",
            padding: "3px 12px",
            fontWeight: 800,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#0b2f6b",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 800 }}>OS</span> Explore
        </button>

        <div style={{ width: 1, height: 20, background: "#808080", marginLeft: 2, marginRight: 2 }} />

        <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden" }}>
          {openTaskbarEntries.map((entry) => {
            const isActive = entry.id === activeWindowId && !entry.win.isMinimized;
            return (
              <div
                key={entry.id}
                onContextMenu={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: isActive ? "#d0d0d0" : "#c0c0c0",
                  borderTop: isActive ? "1px solid #404040" : "1px solid #fff",
                  borderLeft: isActive ? "1px solid #404040" : "1px solid #fff",
                  borderRight: isActive ? "1px solid #fff" : "1px solid #404040",
                  borderBottom: isActive ? "1px solid #fff" : "1px solid #404040",
                  maxWidth: 160,
                }}
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setStartOpen(false);
                    setCalendarOpen(false);
                    activateTaskbarEntry(entry.id);
                  }}
                  style={{ background: "transparent", border: "none", padding: "3px 6px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left", flex: 1, color: "#111", display: "flex", alignItems: "center", gap: 6 }}
                >
                  {renderTaskbarGlyph(entry.glyph)}
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.2, paddingBottom: 1, minWidth: 0, flex: 1 }}>
                    {entry.title}
                  </span>
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    closeWindow(entry.id);
                  }}
                  style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 11, fontFamily: "inherit", padding: "2px 5px", color: "#555", lineHeight: 1, flexShrink: 0 }}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: 4 }}>
          <Tooltip label="Volume">
            <div style={{ background: "#c0c0c0", borderTop: "1px solid #404040", borderLeft: "1px solid #404040", borderRight: "1px solid #fff", borderBottom: "1px solid #fff", padding: "3px 6px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>
              <svg width="16" height="14" viewBox="0 0 16 14" shapeRendering="crispEdges">
                <rect x="1" y="4" width="4" height="6" fill="#0b3b8f" />
                <rect x="5" y="3" width="1" height="1" fill="#0b3b8f" />
                <rect x="5" y="10" width="1" height="1" fill="#0b3b8f" />
                <rect x="6" y="2" width="1" height="1" fill="#0b3b8f" />
                <rect x="6" y="11" width="1" height="1" fill="#0b3b8f" />
                <rect x="7" y="1" width="1" height="12" fill="#0b3b8f" />
                <rect x="9" y="3" width="1" height="8" fill="#0b3b8f" />
                <rect x="11" y="2" width="1" height="10" fill="#0b3b8f" />
                <rect x="13" y="1" width="1" height="12" fill="#0b3b8f" />
              </svg>
            </div>
          </Tooltip>

          <button
            onClick={(event) => {
              event.stopPropagation();
              setStartOpen(false);
              setCalendarOpen((prev) => !prev);
            }}
            style={{ background: "#c0c0c0", border: "none", borderTop: "1px solid #404040", borderLeft: "1px solid #404040", borderRight: "1px solid #fff", borderBottom: "1px solid #fff", padding: "3px 8px", fontSize: 11, fontWeight: 500, color: "#111", whiteSpace: "nowrap", fontFamily: "inherit", cursor: "pointer" }}
          >
            {clock}
          </button>
        </div>

        {calendarOpen && (
          <div onClick={(event) => event.stopPropagation()} style={{ position: "absolute", right: 6, bottom: "100%", marginBottom: 3, width: 255, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 10px rgba(0,0,0,0.35)", zIndex: 9100, padding: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <button onClick={() => setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} style={{ width: 20, height: 18, border: "none", borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040", background: "#c0c0c0", fontSize: 12, color: MENU_TEXT_COLOR, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", lineHeight: 1 }}>
                {"<"}
              </button>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{monthLabel}</div>
              <button onClick={() => setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} style={{ width: 20, height: 18, border: "none", borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040", background: "#c0c0c0", fontSize: 12, color: MENU_TEXT_COLOR, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", lineHeight: 1 }}>
                {">"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dow) => (
                <div key={dow} style={{ textAlign: "center", fontSize: 11, color: "#2f2f2f", fontWeight: 700, padding: "1px 0" }}>
                  {dow}
                </div>
              ))}
              {dayCells.map((day, index) => (
                <div key={`${index}-${day ?? "empty"}`} style={{ textAlign: "center", fontSize: 11, color: day ? "#111" : "#777", padding: "3px 0", border: day && isToday(day) ? "1px solid #000080" : "1px solid transparent", background: day && isToday(day) ? "#dbe7ff" : "transparent", minHeight: 20 }}>
                  {day ?? ""}
                </div>
              ))}
            </div>
          </div>
        )}

        {startOpen && (
          <div onClick={(event) => event.stopPropagation()} style={{ position: "absolute", left: 6, bottom: "100%", marginBottom: 2, width: 220, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", boxShadow: "3px 3px 10px rgba(0,0,0,0.4)", zIndex: 9000 }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: 28, background: "#000080", display: "flex", alignItems: "flex-end", padding: "8px 2px" }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 10, writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: 1 }}>
                  JacobOS
                </span>
              </div>
              <div style={{ flex: 1 }}>
                {desktopItems.filter((item) => item.itemType === "app" && item.id !== "trash").map((icon) => (
                  <button
                    key={icon.id}
                    onClick={() => {
                      openItem(icon);
                      setStartOpen(false);
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", border: "none", background: "transparent", cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "left", color: "#111" }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background = "#000080";
                      event.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background = "transparent";
                      event.currentTarget.style.color = "#111";
                    }}
                  >
                    <span style={{ width: 26, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ transform: "scale(0.6)", display: "block" }}>{icon.glyph}</span>
                    </span>
                    {icon.title}
                  </button>
                ))}
                <div style={{ height: 1, background: "#808080", margin: "2px 8px" }} />
                <button
                  onClick={() => {
                    window.open(PERSONAL.resumeUrl, "_blank");
                    setStartOpen(false);
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", border: "none", background: "transparent", cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "left", color: "#111" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#000080";
                    event.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "transparent";
                    event.currentTarget.style.color = "#111";
                  }}
                >
                  <span style={{ width: 26, textAlign: "center" }}>DOC</span>
                  Resume.pdf
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
