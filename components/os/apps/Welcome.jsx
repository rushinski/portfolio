"use client";

import { useWindowManager } from "../hooks/useWindowManager";

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
    <div style={{ padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#000080" }}>Welcome to JacobOS</div>
      </div>
      <div style={{ fontSize: 13, color: "#333", marginBottom: 14, lineHeight: 1.7 }}>
        This is the portfolio of <strong>Jacob Rushinski</strong> - a backend/full-stack developer.
        Navigate this retro desktop to explore my work, skills, projects, and more! You navigate this desktop just like any other desktop.
      </div>
      <div style={{ fontSize: 12, color: "#444", marginBottom: 10, fontWeight: 700 }}>Start here:</div>
      <div style={{ fontSize: 12, color: "#444", lineHeight: 1.8, paddingLeft: 8 }}>
        {startHereItems.map((item) => (
          <button
            key={item.id}
            onClick={() => openWindow(item.id)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              padding: "0",
              fontSize: 12,
              color: "#444",
              lineHeight: 1.8,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#000080", marginRight: 6 }}>{">"}</span>
            <strong style={{ color: "#000080", textDecoration: "underline", textDecorationColor: "#000080" }}>{item.title}</strong> {item.description}
          </button>
        ))}
        <div><span style={{ color: "#000080", marginRight: 6 }}>{">"}</span>Explore the other apps too see more cool features of JacobOS.</div>
      </div>
      <div style={{ marginTop: 16, padding: "10px 12px", background: "#ffffcc", border: "1px solid #e0d080", fontSize: 12, color: "#555" }}>
        <strong>Tip:</strong> Try the Terminal app for a command-line experience. Type &quot;help&quot; to see available commands!
      </div>
    </div>
  );
}
