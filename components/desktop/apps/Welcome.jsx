"use client";

import { useWindowManager } from "../hooks/useWindowManager";
import {
  APP_BODY_STYLE,
  APP_CONTENT_STYLE,
  APP_META_TEXT_STYLE,
  APP_PANEL_STYLE,
  APP_SECTION_HEADER_STYLE,
} from "../ui/retro";

export default function WelcomeApp() {
  const { openWindow } = useWindowManager();

  const startHereItems = [
    { id: "about", title: "About", description: "for a quick overview" },
    { id: "skills", title: "Skills", description: "for technologies and tools" },
    { id: "experience", title: "Experience", description: "for work history" },
    { id: "projects", title: "Projects", description: "for shipped and in-progress work" },
    { id: "contact", title: "Contact", description: "to reach out" },
  ];

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#000080", marginBottom: 6 }}>Welcome to JacobOS</div>
          <div style={APP_META_TEXT_STYLE}>
            This desktop is Jacob Rushinski&apos;s portfolio. Explore it like a late-90s machine and open each app to see projects, experience, skills, and contact details.
          </div>
        </div>

        <div>
          <div style={{ ...APP_SECTION_HEADER_STYLE, marginBottom: 6 }}>Start Here</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {startHereItems.map((item) => (
              <button
                key={item.id}
                onClick={() => openWindow(item.id)}
                style={{
                  ...APP_PANEL_STYLE,
                  width: "100%",
                  textAlign: "left",
                  padding: "7px 9px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ color: "#000080", marginRight: 6, fontWeight: 700 }}>{">"}</span>
                <strong style={{ color: "#111" }}>{item.title}</strong> {item.description}
              </button>
            ))}
          </div>
        </div>

        <div style={{ ...APP_PANEL_STYLE, padding: "8px 10px", background: "#efe7b0" }}>
          <div style={{ fontSize: 11, color: "#444", lineHeight: 1.5 }}>
            <strong>Tip:</strong> Open Terminal for a command-line view of the same filesystem. Type &quot;help&quot; to see the supported commands.
          </div>
        </div>
      </div>
    </div>
  );
}
