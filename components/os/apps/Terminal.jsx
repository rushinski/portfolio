"use client";

import { useEffect, useRef, useState } from "react";

import { EXPERIENCE, PERSONAL, PROJECTS, SKILLS } from "../data";

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { type: "output", text: "JacobOS Terminal v1.0" },
    { type: "output", text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => "Available commands: help, whoami, skills, contact, projects, experience, clear, neofetch, echo [text], date, uptime, cat resume",
    whoami: () => `${PERSONAL.name} - ${PERSONAL.title}\n${PERSONAL.location}`,
    skills: () => Object.entries(SKILLS).map(([category, items]) => `${category}: ${items.join(", ")}`).join("\n"),
    contact: () => `Email: ${PERSONAL.email}\nGitHub: ${PERSONAL.github}\nLinkedIn: ${PERSONAL.linkedin}`,
    projects: () => PROJECTS.map((project) => `${project.status === "IN_PROGRESS" ? "[WIP]" : "[OK]"} ${project.title} - ${project.date}`).join("\n"),
    clear: () => "__CLEAR__",
    date: () => new Date().toString(),
    uptime: () => `System uptime: ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    neofetch: () => `   .--------.\n   | JacobOS |    ${PERSONAL.name}\n   |  v1.0   |    --------------\n   '--------'    OS: JacobOS 1.0\n                 Shell: jsh 0.1\n                 Resolution: 640x480\n                 CPU: Intel 80486DX\n                 Memory: 4096 KB\n                 Uptime: way too long`,
    "cat resume": () => `${PERSONAL.name}\n${PERSONAL.title}\n${PERSONAL.school}\nGPA: ${PERSONAL.gpa} | Graduating: ${PERSONAL.gradDate}\n\nRun "skills", "projects", or "experience" for more details.`,
  };

  const formatProjectsDetails = () => PROJECTS.map((project, index) => [
    `${index + 1}. ${project.title} (${project.date}) ${project.status === "IN_PROGRESS" ? "[WIP]" : "[COMPLETE]"}`,
    `   ${project.desc}`,
    ...project.impact.map((line) => `   - ${line}`),
  ].join("\n")).join("\n\n");

  const formatExperienceDetails = () => EXPERIENCE.map((experience, index) => [
    `${index + 1}. ${experience.role} @ ${experience.company} (${experience.period})`,
    `   ${experience.type}`,
    `   ${experience.desc}`,
    ...experience.bullets.map((line) => `   - ${line}`),
  ].join("\n")).join("\n\n");

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    const nextHistory = [...history, { type: "input", text: `> ${input}` }];

    if (command === "") {
      setHistory(nextHistory);
    } else if (command.startsWith("echo ")) {
      setHistory([...nextHistory, { type: "output", text: input.slice(5) }]);
    } else if (command === "projects") {
      setHistory([...nextHistory, { type: "output", text: formatProjectsDetails() }]);
    } else if (command === "experience") {
      setHistory([...nextHistory, { type: "output", text: formatExperienceDetails() }]);
    } else if (commands[command]) {
      const result = commands[command]();
      if (result === "__CLEAR__") {
        setHistory([]);
      } else {
        setHistory([...nextHistory, { type: "output", text: result }]);
      }
    } else {
      setHistory([...nextHistory, { type: "output", text: `jsh: command not found: ${command}` }]);
    }

    setInput("");
  };

  return (
    <div style={{ background: "#0d1117", height: "100%", display: "flex", flexDirection: "column" }}>
      <div ref={scrollRef} style={{ flex: 1, overflow: "auto", padding: "12px", fontFamily: "'Courier New', monospace" }}>
        {history.map((entry, index) => (
          <div key={`${entry.type}-${index}`} style={{ color: entry.type === "input" ? "#58a6ff" : "#00ff41", fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap", marginBottom: 2 }}>
            {entry.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", borderTop: "1px solid #30363d" }}>
        <span style={{ color: "#00ff41", padding: "8px 4px 8px 12px", fontSize: 12, fontFamily: "'Courier New', monospace", background: "#0d1117" }}>{">"}</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          style={{ flex: 1, background: "#0d1117", border: "none", color: "#e6edf3", fontSize: 12, fontFamily: "'Courier New', monospace", padding: "8px 8px", outline: "none" }}
          autoFocus
        />
      </form>
    </div>
  );
}
