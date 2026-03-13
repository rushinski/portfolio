"use client";

import { useEffect, useState } from "react";

import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_FIELD_STYLE,
  APP_META_TEXT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
} from "../ui/retro";

export default function LocationApp() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  const dateText = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeText = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>System Clock</div>
          <div style={APP_META_TEXT_STYLE}>Live local date, time, and timezone reported by the current browser session.</div>
        </div>

        <div style={{ ...APP_PANEL_STYLE, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ ...APP_FIELD_STYLE, display: "grid", gridTemplateColumns: "90px 1fr", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#333" }}>Date</div>
            <div style={{ fontSize: 12, color: "#111" }}>{dateText}</div>
          </div>
          <div style={{ ...APP_FIELD_STYLE, display: "grid", gridTemplateColumns: "90px 1fr", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#333" }}>Time</div>
            <div style={{ fontSize: 12, color: "#111", fontWeight: 700 }}>{timeText}</div>
          </div>
          <div style={{ ...APP_FIELD_STYLE, display: "grid", gridTemplateColumns: "90px 1fr", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#333" }}>Timezone</div>
            <div style={{ fontSize: 12, color: "#111" }}>{timezone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
