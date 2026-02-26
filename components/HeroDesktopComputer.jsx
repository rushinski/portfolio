"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   JacobOS — Retro Desktop Portfolio
   A complete retro operating system experience as a portfolio
   ═══════════════════════════════════════════════════════════ */

// ── Data ─────────────────────────────────────────────────
const PERSONAL = {
  name: "Jacob Rushinski",
  title: "Backend / Full-Stack Developer",
  tagline: "I build production-grade systems: APIs, data modeling, auth, payments, automation.",
  email: "jacobrushinski@gmail.com",
  location: "Lancaster, PA",
  github: "https://github.com/rushinski",
  linkedin: "https://linkedin.com/in/jacobrushinski",
  resumeUrl: "/Jacob_Rushinski_Resume.pdf",
  school: "Thaddeus Stevens College of Technology",
  gradDate: "May 2026",
  gpa: "3.52 / 4.00",
};

const ABOUT_LINES = [
  `Software Engineering Student @ ${PERSONAL.school}`,
  `Graduating ${PERSONAL.gradDate} — GPA ${PERSONAL.gpa}`,
  "I build things that ship and hold up under pressure.",
  "Currently expanding a production e-commerce platform into multi-tenant SaaS.",
  "Interested in backend architecture, distributed systems, and automation.",
  "Looking for backend or full-stack roles where I can do meaningful work.",
];

const STATS = [
  { value: "3.52", label: "GPA" },
  { value: "60+", label: "API Routes" },
  { value: "100%", label: "Order Success" },
  { value: "58%", label: "Cost Reduction" },
];

const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C++", "SQL", "HTML", "CSS"],
  Technologies: ["Node.js", "Next.js", "React", "Supabase", "PostgreSQL", "MongoDB", "Stripe", "Shippo", "Upstash Redis", "AWS SES", "Docker", "Git", "GitHub Actions", "Vercel", "Discord.js", "ADBKit", "Tesseract.js", "Sharp"],
  Concepts: ["REST API Design", "Auth & RBAC", "Row-Level Security", "Rate Limiting", "CSRF Protection", "Webhook Processing", "Idempotency", "Transactional Integrity", "Queue-Based Processing", "Concurrency Control", "Event-Driven Architecture", "CI/CD"],
};

const EXPERIENCE = [
  {
    company: "Realdealkickzsc",
    role: "Contract Full-Stack Software Engineer",
    period: "Nov 2025 — Present",
    type: "Contract / Remote",
    desc: "Built a production e-commerce platform from scratch to replace Shopify.",
    bullets: [
      "Reduced infrastructure costs by 58% replacing Shopify with custom Next.js + Supabase + Upstash platform.",
      "Designed 60+ API routes with transactional order processing — 100% order success rate, zero duplicate charges.",
      "Maintained 100% uptime during deployments with GitHub Actions CI/CD and post-deploy health checks.",
      "Built centralized proxy pipeline with CSRF protection, rate limiting, and MFA-based admin guardrails.",
      "Designed automated product title parser reducing publishing workflow steps by 33%.",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "Upstash Redis", "GitHub Actions", "AWS SES"],
  },
  {
    company: "Giant Food Stores",
    role: "Giant Direct Facilitator & Seafood Associate",
    period: "May 2022 — Present",
    type: "Part-time",
    desc: "Led high-volume fulfillment operations and trained new associates during peak demand.",
    bullets: [
      "Processed 400+ unit orders during peak periods while onboarding new associates.",
      "Maintained accuracy and efficiency standards across high-volume fulfillment cycles.",
    ],
    stack: [],
  },
];

const PROJECTS = [
  {
    title: "RDK SaaS Platform",
    subtitle: "Multi-tenant sneaker marketplace — in progress",
    date: "2025 — Present",
    status: "IN_PROGRESS",
    desc: "Multi-tenant SaaS expansion of the Realdealkickzsc platform, enabling other sneaker retailers to spin up their own storefronts on shared infrastructure.",
    impact: [
      "Multi-tenant Supabase architecture with full per-store data isolation",
      "Shared infra dramatically reduces per-tenant cost vs Shopify",
      "Reusing proven payment, webhook, and rate-limiting patterns",
      "22-week implementation roadmap in active progress",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Stripe", "Upstash Redis", "Vercel"],
  },
  {
    title: "Discord Title Automation Bot",
    subtitle: "ADB automation pipeline with computer vision",
    date: "Jan–Mar 2025",
    status: "COMPLETE",
    desc: "Orchestrated a Discord-to-device automation pipeline that mapped Discord user IDs to MongoDB player records.",
    impact: [
      "Reduced manual title assignment from 1 minute → 5 seconds",
      "95% success rate via image-based UI state detection",
      "100% conflict-free processing with role-based bucket queue",
    ],
    stack: ["JavaScript", "MongoDB", "ADBKit", "Tesseract.js", "Discord.js"],
  },
  {
    title: "Discord Moderation Bot",
    subtitle: "Modular event-driven bot for community management",
    date: "Oct 2024–Jan 2025",
    status: "COMPLETE",
    desc: "Engineered a modular, event-driven Discord bot serving 8 servers and 900+ members.",
    impact: [
      "60% reduction in moderator workload",
      "1,000+ transcripts archived with GitHub Gist + MongoDB fallback",
      "500+ new members screened in 2 months",
    ],
    stack: ["JavaScript", "Discord.js", "MongoDB", "GitHub Gist API"],
  },
];

// ── Retro Pixel Icon SVGs ────────────────────────────────
// These are designed to look like classic Win3.1/95 16-color style icons
const Icons = {
  folder: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="7" width="30" height="22" fill="#c0c000" stroke="#808000" strokeWidth="1"/>
      <rect x="1" y="5" width="14" height="4" fill="#c0c000" stroke="#808000" strokeWidth="1"/>
      <rect x="2" y="9" width="28" height="19" fill="#ffff00" stroke="#808000" strokeWidth="1"/>
      <line x1="2" y1="9" x2="30" y2="9" stroke="#ffff80" strokeWidth="1"/>
    </svg>
  ),
  file: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="4" y="2" width="18" height="28" fill="#ffffff" stroke="#000080" strokeWidth="1"/>
      <polygon points="22,2 28,8 22,8" fill="#c0c0c0" stroke="#000080" strokeWidth="1"/>
      <rect x="4" y="2" width="24" height="28" fill="none" stroke="#000080" strokeWidth="1"/>
      <line x1="7" y1="12" x2="25" y2="12" stroke="#000080" strokeWidth="1"/>
      <line x1="7" y1="16" x2="22" y2="16" stroke="#000080" strokeWidth="1"/>
      <line x1="7" y1="20" x2="24" y2="20" stroke="#000080" strokeWidth="1"/>
      <line x1="7" y1="24" x2="18" y2="24" stroke="#000080" strokeWidth="1"/>
    </svg>
  ),
  terminal: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="3" width="30" height="26" fill="#000000" stroke="#808080" strokeWidth="1"/>
      <rect x="1" y="3" width="30" height="4" fill="#000080"/>
      <text x="3" y="6.5" fill="#ffffff" fontSize="3.5" fontFamily="monospace">C:\</text>
      <text x="3" y="15" fill="#00ff00" fontSize="4" fontFamily="monospace">C:\&gt;_</text>
      <rect x="17" y="12" width="4" height="5" fill="#00ff00" opacity="0.6"/>
    </svg>
  ),
  trash: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="8" y="6" width="16" height="22" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
      <rect x="6" y="4" width="20" height="3" fill="#808080" stroke="#404040" strokeWidth="1"/>
      <rect x="12" y="2" width="8" height="3" fill="#808080" stroke="#404040" strokeWidth="1"/>
      <line x1="12" y1="10" x2="12" y2="25" stroke="#404040" strokeWidth="1.5"/>
      <line x1="16" y1="10" x2="16" y2="25" stroke="#404040" strokeWidth="1.5"/>
      <line x1="20" y1="10" x2="20" y2="25" stroke="#404040" strokeWidth="1.5"/>
    </svg>
  ),
  contact: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="2" y="6" width="28" height="20" fill="#ffff80" stroke="#808000" strokeWidth="1"/>
      <polygon points="2,6 16,18 30,6" fill="none" stroke="#808000" strokeWidth="1.5"/>
      <line x1="2" y1="26" x2="12" y2="17" stroke="#808000" strokeWidth="1" opacity="0.5"/>
      <line x1="30" y1="26" x2="20" y2="17" stroke="#808000" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  github: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#000000" stroke="#404040" strokeWidth="1"/>
      <circle cx="16" cy="14" r="8" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
      <circle cx="16" cy="14" r="3" fill="#ffffff"/>
      <path d="M12 22 L12 28 L15 26 L18 28 L18 22" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
    </svg>
  ),
  skills: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#000080" stroke="#0000c0" strokeWidth="1"/>
      <rect x="4" y="20" width="5" height="8" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
      <rect x="11" y="14" width="5" height="14" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
      <rect x="18" y="8" width="5" height="20" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
      <rect x="25" y="4" width="5" height="24" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
    </svg>
  ),
  experience: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="4" y="10" width="24" height="18" rx="2" fill="#804000" stroke="#402000" strokeWidth="1"/>
      <rect x="10" y="6" width="12" height="6" rx="1" fill="#804000" stroke="#402000" strokeWidth="1"/>
      <rect x="12" y="4" width="8" height="4" fill="none" stroke="#402000" strokeWidth="1"/>
      <rect x="6" y="16" width="20" height="2" fill="#c08040"/>
      <rect x="13" y="14" width="6" height="4" rx="1" fill="#ffc080" stroke="#c08040" strokeWidth="0.5"/>
    </svg>
  ),
  about: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#000080" stroke="#0000c0" strokeWidth="1"/>
      <circle cx="16" cy="12" r="5" fill="#ffffff"/>
      <ellipse cx="16" cy="26" rx="8" ry="5" fill="#ffffff"/>
      <rect x="14" y="8" width="4" height="2" fill="#000080"/>
    </svg>
  ),
  projects: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#800080" stroke="#400040" strokeWidth="1"/>
      <rect x="4" y="4" width="11" height="11" fill="#ff80ff" stroke="#c000c0" strokeWidth="0.5"/>
      <rect x="17" y="4" width="11" height="11" fill="#ff80ff" stroke="#c000c0" strokeWidth="0.5" opacity="0.8"/>
      <rect x="4" y="17" width="11" height="11" fill="#ff80ff" stroke="#c000c0" strokeWidth="0.5" opacity="0.8"/>
      <rect x="17" y="17" width="11" height="11" fill="#ff80ff" stroke="#c000c0" strokeWidth="0.5" opacity="0.6"/>
    </svg>
  ),
  welcome: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#008080" stroke="#004040" strokeWidth="1"/>
      <text x="16" y="13" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="serif">?</text>
      <rect x="6" y="18" width="20" height="2" fill="#80ffff"/>
      <rect x="8" y="22" width="16" height="2" fill="#80ffff" opacity="0.7"/>
      <rect x="10" y="26" width="12" height="2" fill="#80ffff" opacity="0.5"/>
    </svg>
  ),
  settings: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#c0c0c0" stroke="#404040" strokeWidth="1"/>
      <circle cx="16" cy="16" r="7" fill="#909090" stroke="#404040" strokeWidth="1"/>
      <circle cx="16" cy="16" r="3" fill="#d8d8d8" stroke="#404040" strokeWidth="1"/>
      <rect x="15" y="4" width="2" height="4" fill="#606060"/>
      <rect x="15" y="24" width="2" height="4" fill="#606060"/>
      <rect x="4" y="15" width="4" height="2" fill="#606060"/>
      <rect x="24" y="15" width="4" height="2" fill="#606060"/>
      <rect x="7" y="7" width="3" height="2" transform="rotate(-45 8.5 8)" fill="#606060"/>
      <rect x="22" y="22" width="3" height="2" transform="rotate(-45 23.5 23)" fill="#606060"/>
      <rect x="22" y="7" width="3" height="2" transform="rotate(45 23.5 8)" fill="#606060"/>
      <rect x="7" y="22" width="3" height="2" transform="rotate(45 8.5 23)" fill="#606060"/>
    </svg>
  ),
};

// Helpers
const GRID = 1;
const snap = (n) => Math.round(n / GRID) * GRID;
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const ICON_VIEW_MODES = {
  small: { tileW: 68, tileH: 80, glyphScale: 0.85, labelSize: 10, cellX: 78, cellY: 94, maxLabel: 72 },
  medium: { tileW: 76, tileH: 90, glyphScale: 1, labelSize: 11, cellX: 90, cellY: 102, maxLabel: 84 },
  large: { tileW: 94, tileH: 112, glyphScale: 1.2, labelSize: 12, cellX: 108, cellY: 126, maxLabel: 100 },
};
const MENU_TEXT_COLOR = "#162133";
const snapIconToGrid = (x, y, mode = "medium", marginX = 12, marginY = 8) => {
  const grid = ICON_VIEW_MODES[mode] || ICON_VIEW_MODES.medium;
  const gx = Math.round((x - marginX) / grid.cellX);
  const gy = Math.round((y - marginY) / grid.cellY);
  return {
    x: marginX + gx * grid.cellX,
    y: marginY + gy * grid.cellY,
  };
};

// ── Boot Sequence Component ─────────────────────────────
function BootSequence({ onComplete, embedded = false }) {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState("bios");

  const bootLines = [
    { text: "JacobOS BIOS v1.0", delay: 80 },
    { text: "Checking memory... 640K OK", delay: 150 },
    { text: "Detecting hardware...", delay: 100 },
    { text: "  CPU: Intel 80486DX @ 33MHz", delay: 60 },
    { text: "  RAM: 4096 KB", delay: 50 },
    { text: "  VGA: 640x480 256 colors", delay: 50 },
    { text: "  HDD: 120 MB — OK", delay: 80 },
    { text: "", delay: 40 },
    { text: "Loading JacobOS...", delay: 200 },
    { text: "Mounting filesystem...", delay: 120 },
    { text: "Starting desktop environment...", delay: 150 },
    { text: "", delay: 60 },
    { text: "Welcome to JacobOS", delay: 250 },
  ];

  useEffect(() => {
    const timeouts = [];
    let currentDelay = 0;
    bootLines.forEach((line, i) => {
      currentDelay += line.delay;
      const lineTimeout = setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        if (i === bootLines.length - 1) {
          timeouts.push(setTimeout(() => setPhase("fade"), 200));
          timeouts.push(setTimeout(onComplete, 700));
        }
      }, currentDelay);
      timeouts.push(lineTimeout);
    });
    return () => {
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: embedded ? "absolute" : "fixed",
        inset: 0,
        background: "#000",
        zIndex: embedded ? 100 : 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600, padding: "2rem" }}>
        <pre
          style={{
            color: "#00ff41",
            fontSize: "13px",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            textShadow: "0 0 8px rgba(0,255,65,0.4)",
          }}
        >
          {lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          <span style={{ animation: "blink 1s step-end infinite" }}>▋</span>
        </pre>
      </div>
    </div>
  );
}

// ── Window Title Bar (no File/Edit/View/Help) ───────────
function TitleBar({ title, isActive, onClose, onMinimize, onMaximize, onPointerDown, onTitleDoubleClick }) {
  const bg = isActive
    ? "linear-gradient(180deg, #1a56c9 0%, #0b3b8f 100%)"
    : "linear-gradient(180deg, #808080 0%, #606060 100%)";

  return (
    <div
      onPointerDown={onPointerDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onTitleDoubleClick?.();
      }}
      style={{
        background: bg,
        color: "#fff",
        fontWeight: 700,
        fontSize: "12px",
        letterSpacing: "0.3px",
        padding: "4px 4px 4px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        {title}
      </span>
      <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
        {[
          { label: "_", action: onMinimize },
          { label: "□", action: onMaximize },
          { label: "×", action: onClose },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={(e) => { e.stopPropagation(); btn.action(); }}
            style={{
              width: 16,
              height: 14,
              background: "#c0c0c0",
              border: "none",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #404040",
              borderBottom: "1px solid #404040",
              display: "grid",
              placeItems: "center",
              color: "#111",
              fontSize: "11px",
              lineHeight: 1,
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Resizable + Draggable Window ────────────────────────
function Window({ win, isActive, onFocus, onClose, onMinimize, onMaximize, onMove, onResize, children }) {
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Drag logic
  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    onFocus();
    const rect = dragRef.current?.getBoundingClientRect();
    if (!rect) return;
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setIsDragging(true);

    const handlePointerMove = (ev) => {
      const parent = dragRef.current?.parentElement?.getBoundingClientRect();
      if (!parent) return;
      let nx = ev.clientX - parent.left - offsetRef.current.x;
      let ny = ev.clientY - parent.top - offsetRef.current.y;
      nx = clamp(nx, -win.w + 60, parent.width - 60);
      ny = clamp(ny, 0, parent.height - 30);
      onMove(snap(nx), snap(ny));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Resize logic (bottom-right corner + edges)
  const handleResizePointerDown = (e, direction) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.w;
    const startH = win.h || 400;
    const startLeft = win.x;
    const startTop = win.y;

    const handleMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      
      let newW = startW, newH = startH, newX = startLeft, newY = startTop;
      
      if (direction.includes("e")) newW = Math.max(250, startW + dx);
      if (direction.includes("s")) newH = Math.max(150, startH + dy);
      if (direction.includes("w")) {
        newW = Math.max(250, startW - dx);
        newX = startLeft + (startW - newW);
      }
      if (direction.includes("n")) {
        newH = Math.max(150, startH - dy);
        newY = startTop + (startH - newH);
      }
      
      onResize(newX, newY, newW, newH);
    };

    const handleUp = () => {
      setIsResizing(false);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  const style = win.isMaximized
    ? { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: win.z }
    : { position: "absolute", left: win.x, top: win.y, width: win.w, height: win.h || "auto", zIndex: win.z };

  return (
    <div
      ref={dragRef}
      style={{
        ...style,
        opacity: isDragging ? 0.75 : 1,
        transition: isDragging ? "none" : "opacity 0.15s",
      }}
      onPointerDown={(e) => { e.stopPropagation(); onFocus(); }}
    >
      <div
        style={{
          background: "#c0c0c0",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
          boxShadow: isActive ? "2px 4px 16px rgba(0,0,0,0.5)" : "1px 2px 8px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <TitleBar
          title={win.title}
          isActive={isActive}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onPointerDown={handlePointerDown}
          onTitleDoubleClick={onMaximize}
        />
        {/* Body - no File/Edit/View/Help menu bar */}
        <div
          style={{
            background: "#fff",
            border: "2px inset #c0c0c0",
            margin: "3px",
            flex: 1,
            overflow: "auto",
            color: "#111",
            fontSize: "13px",
            lineHeight: 1.55,
            minHeight: 0,
          }}
        >
          {children}
        </div>
        {/* Status bar */}
        <div
          style={{
            background: "#c0c0c0",
            fontSize: "11px",
            padding: "2px 8px",
            borderTop: "1px solid #808080",
            color: "#555",
            display: "flex",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span>Ready</span>
          <span>JacobOS</span>
        </div>
        
        {/* Resize handles (only when not maximized) */}
        {!win.isMaximized && (
          <>
            {/* Right edge */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "e")} style={{ position: "absolute", top: 4, right: -3, width: 6, bottom: 4, cursor: "ew-resize" }} />
            {/* Bottom edge */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "s")} style={{ position: "absolute", left: 4, bottom: -3, height: 6, right: 4, cursor: "ns-resize" }} />
            {/* Left edge */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "w")} style={{ position: "absolute", top: 4, left: -3, width: 6, bottom: 4, cursor: "ew-resize" }} />
            {/* Top edge */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "n")} style={{ position: "absolute", left: 4, top: -3, height: 6, right: 4, cursor: "ns-resize" }} />
            {/* Bottom-right corner */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "se")} style={{ position: "absolute", right: -3, bottom: -3, width: 10, height: 10, cursor: "nwse-resize" }} />
            {/* Bottom-left corner */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "sw")} style={{ position: "absolute", left: -3, bottom: -3, width: 10, height: 10, cursor: "nesw-resize" }} />
            {/* Top-right corner */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "ne")} style={{ position: "absolute", right: -3, top: -3, width: 10, height: 10, cursor: "nesw-resize" }} />
            {/* Top-left corner */}
            <div onPointerDown={(e) => handleResizePointerDown(e, "nw")} style={{ position: "absolute", left: -3, top: -3, width: 10, height: 10, cursor: "nwse-resize" }} />
          </>
        )}
      </div>
    </div>
  );
}

// ── App Contents ────────────────────────────────────────

function WelcomeApp() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 28 }}>🖥</span>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#000080" }}>Welcome to JacobOS</div>
      </div>
      <div style={{ fontSize: 13, color: "#333", marginBottom: 14, lineHeight: 1.7 }}>
        This is the portfolio of <strong>Jacob Rushinski</strong> — a backend/full-stack developer.
        Navigate this retro desktop to explore my work, skills, and projects.
      </div>
      <div style={{ fontSize: 12, color: "#444", marginBottom: 10, fontWeight: 700 }}>How to navigate:</div>
      <div style={{ fontSize: 12, color: "#444", lineHeight: 1.8, paddingLeft: 8 }}>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span><strong>Double-click</strong> desktop icons to open apps</div>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span><strong>Drag</strong> window title bars to move them</div>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span><strong>Drag edges/corners</strong> of windows to resize</div>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span>Click <strong>□</strong> to maximize, <strong>_</strong> to minimize, <strong>×</strong> to close</div>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span>Use the <strong>Explore</strong> menu in the taskbar to find all apps</div>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span>Use <strong>Desk, File, View, Options</strong> at the top for extras</div>
        <div><span style={{ color: "#000080", marginRight: 6 }}>▸</span>Click the <strong>×</strong> on taskbar tabs to close windows quickly</div>
      </div>
      <div style={{ marginTop: 16, padding: "10px 12px", background: "#ffffcc", border: "1px solid #e0d080", fontSize: 12, color: "#555" }}>
        <strong>Tip:</strong> Try the Terminal app for a command-line experience. Type &quot;help&quot; to see available commands!
      </div>
    </div>
  );
}

function AboutApp() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #000080, #0000c0)", display: "grid", placeItems: "center", color: "#fff", fontSize: 24, fontWeight: 800, flexShrink: 0, border: "2px solid #808080" }}>JR</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111" }}>{PERSONAL.name}</div>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>{PERSONAL.title}</div>
          <div style={{ fontSize: 12, color: "#777" }}>{PERSONAL.location}</div>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        {ABOUT_LINES.map((line, i) => (
          <div key={i} style={{ padding: "3px 0", fontSize: 13, color: "#333" }}>
            <span style={{ color: "#000080", marginRight: 6 }}>▸</span>
            {line}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background: "#f0f4f8", border: "2px inset #c0c0c0", padding: "10px 16px", textAlign: "center", minWidth: 100 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#000080" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsApp() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>Skills & Technologies</div>
      {Object.entries(SKILLS).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#000080", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{cat}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {items.map((s) => (
              <span
                key={s}
                style={{
                  background: "#e8eef6",
                  border: "1px solid #c0c0c0",
                  padding: "3px 8px",
                  fontSize: 11,
                  color: "#333",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceApp() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>Work Experience</div>
      {EXPERIENCE.map((exp, i) => (
        <div key={i} style={{ marginBottom: 18, paddingBottom: 16, borderBottom: i < EXPERIENCE.length - 1 ? "1px solid #c0c0c0" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{exp.company}</div>
            <div style={{ fontSize: 11, color: "#777" }}>{exp.period}</div>
          </div>
          <div style={{ fontSize: 12, color: "#000080", fontWeight: 600, marginBottom: 4 }}>{exp.role}</div>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>{exp.desc}</div>
          {exp.bullets.map((b, j) => (
            <div key={j} style={{ fontSize: 12, color: "#444", padding: "2px 0", paddingLeft: 12, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "#000080" }}>•</span>
              {b}
            </div>
          ))}
          {exp.stack.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
              {exp.stack.map((t) => (
                <span key={t} style={{ background: "#e0ece0", border: "1px solid #b0d0b0", padding: "2px 6px", fontSize: 10, color: "#2d6a4f" }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectsApp() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>Projects</div>
      {PROJECTS.map((p, i) => (
        <div key={i} style={{ marginBottom: 18, paddingBottom: 16, borderBottom: i < PROJECTS.length - 1 ? "1px solid #c0c0c0" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{p.title}</div>
            <span style={{
              fontSize: 10,
              padding: "2px 8px",
              background: p.status === "IN_PROGRESS" ? "#ffffcc" : "#ccffcc",
              color: p.status === "IN_PROGRESS" ? "#806000" : "#006000",
              border: `1px solid ${p.status === "IN_PROGRESS" ? "#c0a000" : "#00a000"}`,
              fontWeight: 600,
            }}>
              {p.status === "IN_PROGRESS" ? "In Progress" : "Complete"}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>{p.subtitle} — {p.date}</div>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>{p.desc}</div>
          {p.impact.map((item, j) => (
            <div key={j} style={{ fontSize: 12, color: "#444", padding: "2px 0", paddingLeft: 12, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "#800080" }}>▹</span>
              {item}
            </div>
          ))}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
            {p.stack.map((t) => (
              <span key={t} style={{ background: "#f0e0ff", border: "1px solid #c0a0e0", padding: "2px 6px", fontSize: 10, color: "#600080" }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GitHubApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => { if (!r.ok) throw new Error("Failed to fetch"); return r.json(); })
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div style={{ padding: 20, color: "#555" }}>Fetching GitHub data...</div>;
  if (error || !data || data.error) {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>GitHub Stats</div>
        <div style={{ color: "#999", fontSize: 13 }}>Could not load GitHub data. Visit my profile directly:</div>
        <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ color: "#000080", fontSize: 13 }}>{PERSONAL.github}</a>
      </div>
    );
  }

  const langColors = { JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", Java: "#b07219", PHP: "#4F5D95", "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c" };

  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        {data.avatarUrl && <img src={data.avatarUrl} alt="" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px inset #c0c0c0" }} />}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{data.name || data.username}</div>
          <div style={{ fontSize: 11, color: "#666" }}>{data.bio}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Repos", value: data.publicRepos },
          { label: "Stars", value: data.totalStars },
          { label: "Followers", value: data.followers },
        ].map((s) => (
          <div key={s.label} style={{ background: "#f0f4f8", border: "2px inset #c0c0c0", padding: "8px 14px", textAlign: "center", minWidth: 80 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#24292e" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#666" }}>{s.label}</div>
          </div>
        ))}
      </div>
      {data.topLanguages?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#333" }}>Top Languages</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {data.topLanguages.map((l) => (
              <span key={l.lang} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, background: "#f6f8fa", padding: "3px 8px", border: "1px solid #c0c0c0" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: langColors[l.lang] || "#999" }} />
                {l.lang} ({l.count})
              </span>
            ))}
          </div>
        </div>
      )}
      {data.featuredRepos?.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#333" }}>Recent Repos</div>
          {data.featuredRepos.slice(0, 4).map((r) => (
            <div key={r.name} style={{ padding: "6px 0", borderBottom: "1px solid #e0e0e0" }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: "#000080", fontWeight: 600, fontSize: 12, textDecoration: "none" }}>{r.name}</a>
              {r.description && <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{r.description}</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 3, fontSize: 10, color: "#888" }}>
                {r.language && <span>{r.language}</span>}
                {r.stars > 0 && <span>★ {r.stars}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactApp() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>Contact</div>
      <div style={{ marginBottom: 16, fontSize: 13, color: "#333" }}>Interested in working together? Reach out through any of the channels below.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, icon: "✉" },
          { label: "GitHub", value: PERSONAL.github.replace("https://", ""), href: PERSONAL.github, icon: "⌘" },
          { label: "LinkedIn", value: PERSONAL.linkedin.replace("https://", ""), href: PERSONAL.linkedin, icon: "▦" },
          { label: "Location", value: PERSONAL.location, href: null, icon: "◉" },
        ].map((c) => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#f8f9fb", border: "2px inset #c0c0c0" }}>
            <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{c.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{c.label}</div>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ color: "#000080", fontSize: 12, textDecoration: "none" }}>{c.value}</a>
              ) : (
                <div style={{ fontSize: 12, color: "#333" }}>{c.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalApp() {
  const [history, setHistory] = useState([
    { type: "output", text: "JacobOS Terminal v1.0" },
    { type: "output", text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const commands = {
    help: () => "Available commands: help, whoami, skills, contact, projects, clear, neofetch, echo [text], date, uptime, cat resume",
    whoami: () => `${PERSONAL.name} — ${PERSONAL.title}\n${PERSONAL.location}`,
    skills: () => Object.entries(SKILLS).map(([cat, items]) => `${cat}: ${items.join(", ")}`).join("\n"),
    contact: () => `Email: ${PERSONAL.email}\nGitHub: ${PERSONAL.github}\nLinkedIn: ${PERSONAL.linkedin}`,
    projects: () => PROJECTS.map((p) => `${p.status === "IN_PROGRESS" ? "[WIP]" : "[OK]"} ${p.title} — ${p.subtitle}`).join("\n"),
    clear: () => "__CLEAR__",
    date: () => new Date().toString(),
    uptime: () => `System uptime: ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    neofetch: () => `   ╭─────────╮
   │ JacobOS │    ${PERSONAL.name}
   │  v1.0   │    ──────────────
   ╰─────────╯    OS: JacobOS 1.0
                   Shell: jsh 0.1
                   Resolution: 640x480
                   CPU: Intel 80486DX
                   Memory: 4096 KB
                   Uptime: way too long`,
    "cat resume": () => `${PERSONAL.name}\n${PERSONAL.title}\n${PERSONAL.school}\nGPA: ${PERSONAL.gpa} | Graduating: ${PERSONAL.gradDate}\n\nRun "skills" or "projects" for more details.`,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "input", text: `> ${input}` }];

    if (cmd === "") {
      setHistory(newHistory);
    } else if (cmd.startsWith("echo ")) {
      setHistory([...newHistory, { type: "output", text: input.slice(5) }]);
    } else if (commands[cmd]) {
      const result = commands[cmd]();
      if (result === "__CLEAR__") {
        setHistory([]);
      } else {
        setHistory([...newHistory, { type: "output", text: result }]);
      }
    } else {
      setHistory([...newHistory, { type: "output", text: `jsh: command not found: ${cmd}` }]);
    }
    setInput("");
  };

  return (
    <div style={{ background: "#0d1117", height: "100%", display: "flex", flexDirection: "column" }}>
      <div ref={scrollRef} style={{ flex: 1, overflow: "auto", padding: "12px", fontFamily: "'Courier New', monospace" }}>
        {history.map((h, i) => (
          <div key={i} style={{ color: h.type === "input" ? "#58a6ff" : "#00ff41", fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap", marginBottom: 2 }}>
            {h.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", borderTop: "1px solid #30363d" }}>
        <span style={{ color: "#00ff41", padding: "8px 4px 8px 12px", fontSize: 12, fontFamily: "'Courier New', monospace", background: "#0d1117" }}>{">"}</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, background: "#0d1117", border: "none", color: "#e6edf3", fontSize: 12, fontFamily: "'Courier New', monospace", padding: "8px 8px", outline: "none" }}
          autoFocus
        />
      </form>
    </div>
  );
}

function SystemAlertModal({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.4)", zIndex: 99999 }}>
      <div style={{
        background: "#c0c0c0",
        borderTop: "2px solid #fff",
        borderLeft: "2px solid #fff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        padding: 0,
        width: 340,
        boxShadow: "3px 6px 20px rgba(0,0,0,0.5)",
      }}>
        <div style={{ background: "linear-gradient(180deg, #1a56c9, #0b3b8f)", color: "#fff", fontWeight: 700, fontSize: 12, padding: "5px 8px" }}>
          System Error
        </div>
        <div style={{ padding: "20px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ fontSize: 24, color: "#8b1f1f" }}>!</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#111" }}>Access Denied</div>
            <div style={{ fontSize: 12, color: "#444" }}>{message}</div>
          </div>
        </div>
        <div style={{ padding: "8px 16px 12px", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              background: "#c0c0c0",
              border: "none",
              borderTop: "2px solid #fff",
              borderLeft: "2px solid #fff",
              borderRight: "2px solid #404040",
              borderBottom: "2px solid #404040",
              padding: "4px 24px",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
function TrashApp({ onProtectedDelete }) {
  return (
    <div style={{ padding: "16px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>TRASH</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Recycle Bin</div>
      <div style={{ fontSize: 12, color: "#777", marginBottom: 16 }}>0 items</div>
      <button
        onClick={onProtectedDelete}
        style={{
          background: "#c0c0c0",
          border: "none",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
          padding: "6px 16px",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Empty Recycle Bin
      </button>
    </div>
  );
}
function SettingsApp({ iconSizeMode, setIconSizeMode }) {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>Settings</div>
      <div style={{ fontSize: 12, color: "#444", marginBottom: 10 }}>Desktop icon size</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["small", "medium", "large"].map((size) => (
          <button
            key={size}
            onClick={() => setIconSizeMode(size)}
            style={{
              border: "none",
              borderTop: iconSizeMode === size ? "1px solid #404040" : "2px solid #fff",
              borderLeft: iconSizeMode === size ? "1px solid #404040" : "2px solid #fff",
              borderRight: iconSizeMode === size ? "1px solid #fff" : "2px solid #404040",
              borderBottom: iconSizeMode === size ? "1px solid #fff" : "2px solid #404040",
              background: "#c0c0c0",
              padding: "5px 10px",
              fontSize: 11,
              textTransform: "capitalize",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {size}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#666" }}>
        Current mode: <strong style={{ color: "#111", textTransform: "capitalize" }}>{iconSizeMode}</strong>
      </div>
    </div>
  );
}
function ExplorerApp({ items, selectedId, onOpenItem, onAction, onMoveItem }) {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "#111" }}>File Explorer</div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 12 }}>Desktop root (all apps and files)</div>
      <div style={{ border: "2px inset #c0c0c0", background: "#fff", minHeight: 220, padding: 8 }}>
        {items.length === 0 ? (
          <div style={{ fontSize: 12, color: "#666" }}>No items.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "18px 1fr auto",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: "#333",
                  padding: "3px 4px",
                  background: selectedId === item.id ? "#e9eef9" : "transparent",
                  border: selectedId === item.id ? "1px solid #9fb5db" : "1px solid transparent",
                }}
              >
                <span>{item.itemType === "folder" ? "[]" : item.itemType === "text" ? "TXT" : "APP"}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button onClick={() => onOpenItem?.(item)} style={{ fontSize: 10, padding: "1px 5px" }}>Open</button>
                  <button onClick={() => onAction?.("rename", item.id)} style={{ fontSize: 10, padding: "1px 5px" }}>Rename</button>
                  <button onClick={() => onAction?.("cut", item.id)} style={{ fontSize: 10, padding: "1px 5px" }}>Cut</button>
                  <button onClick={() => onAction?.("copy", item.id)} style={{ fontSize: 10, padding: "1px 5px" }}>Copy</button>
                  <button onClick={() => onAction?.("delete", item.id)} style={{ fontSize: 10, padding: "1px 5px" }}>Delete</button>
                  <button onClick={() => onMoveItem?.(item.id, -1, 0)} style={{ fontSize: 10, padding: "1px 5px" }}>←</button>
                  <button onClick={() => onMoveItem?.(item.id, 1, 0)} style={{ fontSize: 10, padding: "1px 5px" }}>→</button>
                  <button onClick={() => onMoveItem?.(item.id, 0, -1)} style={{ fontSize: 10, padding: "1px 5px" }}>↑</button>
                  <button onClick={() => onMoveItem?.(item.id, 0, 1)} style={{ fontSize: 10, padding: "1px 5px" }}>↓</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function TextDocumentApp({ item, onChangeContent }) {
  if (!item) {
    return <div style={{ padding: "16px 20px", color: "#666", fontSize: 12 }}>Open a text document from the desktop.</div>;
  }
  return (
    <div style={{ padding: 12, height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 11, color: "#666" }}>{item.title}</div>
      <textarea
        value={item.content || ""}
        onChange={(e) => onChangeContent(item.id, e.target.value)}
        style={{
          flex: 1,
          resize: "none",
          border: "2px inset #c0c0c0",
          fontFamily: "'Courier New', monospace",
          fontSize: 12,
          padding: 8,
          outline: "none",
        }}
      />
    </div>
  );
}
// Desktop Icon ────────────────────────────────────────
function DesktopIcon({
  icon,
  position,
  onDoubleClick,
  onDragStart,
  onDragMove,
  onDrop,
  selected,
  hovered,
  onSingleClick,
  onContextMenu,
  onHoverChange,
  iconSizeMode = "medium",
  isRenaming = false,
  renameValue = "",
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
}) {
  const ref = useRef(null);
  const renameInputRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const lastPosRef = useRef(position);
  const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
  const labelText = isRenaming ? renameValue : icon.title;
  const labelWidth = Math.min(view.maxLabel, Math.max(40, Math.ceil(((labelText?.length || 1) * view.labelSize * 0.62) + 10)));

  useEffect(() => {
    lastPosRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!isRenaming) return;
    renameInputRef.current?.focus();
    renameInputRef.current?.select();
  }, [isRenaming]);

  const handlePointerDown = (e) => {
    if (isRenaming) return;
    if (e.button !== 0) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    movedRef.current = false;
    onDragStart?.(icon.id, position);

    const rect = ref.current?.parentElement?.getBoundingClientRect();
    if (!rect) return;

    offsetRef.current = {
      x: e.clientX - position.x - rect.left,
      y: e.clientY - position.y - rect.top,
    };

    const handleMove = (ev) => {
      const parent = ref.current?.parentElement?.getBoundingClientRect();
      if (!parent) return;
      let nx = ev.clientX - parent.left - offsetRef.current.x;
      let ny = ev.clientY - parent.top - offsetRef.current.y;
      nx = clamp(nx, 0, parent.width - view.tileW);
      ny = clamp(ny, 0, parent.height - view.tileH);
      movedRef.current = true;
      lastPosRef.current = { x: nx, y: ny };
      onDragMove?.(icon.id, nx, ny);
    };

    const handleUp = (ev) => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);

      if (movedRef.current) {
        onDrop?.(icon.id, lastPosRef.current.x, lastPosRef.current.y, ev.clientX, ev.clientY);
      } else {
        onSingleClick?.(icon.id, ev.clientX, ev.clientY, { ctrlKey: ev.ctrlKey || ev.metaKey, shiftKey: ev.shiftKey });
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: view.tileW,
        minHeight: view.tileH,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
        padding: "2px 2px 1px",
        outline: (hovered || selected) ? "1px dotted rgba(255,255,255,0.8)" : "1px solid transparent",
        outlineOffset: -1,
      }}
      onPointerDown={handlePointerDown}
      onDoubleClick={(e) => {
        if (isRenaming) return;
        e.stopPropagation();
        onDoubleClick?.();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu?.(icon.id, e.clientX, e.clientY);
      }}
      onMouseEnter={() => onHoverChange?.(icon.id)}
      onMouseLeave={() => onHoverChange?.(null)}
    >
      {(selected || hovered) && (
        <div
          style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 11,
            height: 11,
            border: "1px solid #fff",
            background: selected ? "#0060bf" : "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: 8,
            lineHeight: "10px",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {selected ? "✓" : ""}
        </div>
      )}
      <div
        style={{
          padding: 4,
          border: "1px solid transparent",
          background: "transparent",
        }}
      >
        <div style={{ transform: `scale(${view.glyphScale})`, transformOrigin: "center" }}>
          {icon.glyph}
        </div>
      </div>
      {isRenaming ? (
        <input
          ref={renameInputRef}
          value={renameValue}
          onChange={(e) => onRenameChange?.(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onBlur={() => onRenameCommit?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onRenameCommit?.();
            } else if (e.key === "Escape") {
              e.preventDefault();
              onRenameCancel?.();
            }
          }}
          style={{
            width: labelWidth,
            maxWidth: view.maxLabel,
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            border: "none",
            outline: "none",
            fontSize: view.labelSize,
            fontFamily: "inherit",
            padding: "1px 5px",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        />
      ) : (
        <div
          style={{
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            fontSize: view.labelSize,
            padding: "1px 5px",
            width: labelWidth,
            maxWidth: view.maxLabel,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
          }}
        >
          {icon.title}
        </div>
      )}
    </div>
  );
}

// Top Menu Bar Dropdowns
function TopMenuBar({
  openWindow,
  closeAllWindows,
  tileWindows,
  cascadeWindows,
  iconSizeMode,
  setIconSizeMode,
  createFolder,
  createTextDocument,
  pasteDesktopItem,
  hasClipboard,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const handler = () => setOpenMenu(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);
  const menus = {
    Desk: [
      { label: "About JacobOS...", action: () => openWindow("welcome") },
      { label: "---------------", action: null },
      { label: "View Resume", action: () => window.open("/Jacob_Rushinski_Resume.pdf", "_blank") },
    ],
    File: [
      { label: "Open About Me", action: () => openWindow("about") },
      { label: "Open Skills", action: () => openWindow("skills") },
      { label: "Open Experience", action: () => openWindow("experience") },
      { label: "Open Projects", action: () => openWindow("projects") },
      { label: "Open GitHub", action: () => openWindow("github") },
      { label: "Open Contact", action: () => openWindow("contact") },
      { label: "Open Terminal", action: () => openWindow("terminal") },
      { label: "Open File Explorer", action: () => openWindow("explorer") },
      { label: "Open Settings", action: () => openWindow("settings") },
      { label: "---------------", action: null },
      { label: "New Folder", action: createFolder },
      { label: "New Text Document", action: createTextDocument },
      ...(hasClipboard ? [{ label: "Paste", action: pasteDesktopItem }] : []),
    ],
    View: [
      { label: (iconSizeMode === "large" ? "* " : "") + "Large icons", action: () => setIconSizeMode("large") },
      { label: (iconSizeMode === "medium" ? "* " : "") + "Medium icons", action: () => setIconSizeMode("medium") },
      { label: (iconSizeMode === "small" ? "* " : "") + "Small icons", action: () => setIconSizeMode("small") },
      { label: "---------------", action: null },
      { label: "Cascade Windows", action: cascadeWindows },
      { label: "Tile Windows", action: tileWindows },
      { label: "---------------", action: null },
      { label: "Close All", action: closeAllWindows },
    ],
    Options: [
      { label: "GitHub Profile", action: () => window.open(PERSONAL.github, "_blank") },
      { label: "LinkedIn Profile", action: () => window.open(PERSONAL.linkedin, "_blank") },
      { label: "Send Email", action: () => window.open(`mailto:${PERSONAL.email}`) },
      { label: "Open Settings", action: () => openWindow("settings") },
    ],
  };
  return (
    <div
      ref={menuRef}
      style={{
        background: "#c0c0c0",
        fontSize: 12,
        padding: "3px 10px",
        display: "flex",
        gap: 0,
        borderBottom: "1px solid #808080",
        color: "#111",
        position: "relative",
        zIndex: 8000,
        flexShrink: 0,
      }}
    >
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} style={{ position: "relative" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(openMenu === name ? null : name);
            }}
            style={{
              background: openMenu === name ? "#000080" : "transparent",
              color: openMenu === name ? "#fff" : "#111",
              border: "none",
              padding: "2px 10px",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: name === "Desk" ? 700 : 400,
            }}
          >
            {name}
          </button>
          {openMenu === name && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: 0,
                top: "100%",
                minWidth: 210,
                background: "#c0c0c0",
                borderTop: "2px solid #fff",
                borderLeft: "2px solid #fff",
                borderRight: "2px solid #404040",
                borderBottom: "2px solid #404040",
                boxShadow: "3px 3px 8px rgba(0,0,0,0.4)",
                zIndex: 9000,
                padding: "2px 0",
              }}
            >
              {items.map((item, i) => (
                item.action === null ? (
                  <div key={i} style={{ height: 1, background: "#808080", margin: "3px 8px" }} />
                ) : (
                  <button
                    key={i}
                    disabled={!!item.disabled}
                    onClick={() => {
                      if (item.disabled) return;
                      item.action();
                      setOpenMenu(null);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "4px 20px",
                      border: "none",
                      background: "transparent",
                      cursor: item.disabled ? "not-allowed" : "pointer",
                      fontSize: 12,
                      fontFamily: "inherit",
                      textAlign: "left",
                      color: item.disabled ? "#777" : "#111",
                      opacity: item.disabled ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (item.disabled) return;
                      e.currentTarget.style.background = "#000080";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (item.disabled) return;
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#111";
                    }}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      ))}
      <span style={{ marginLeft: "auto", opacity: 0.7, fontStyle: "italic", padding: "2px 0" }}>JacobOS</span>
    </div>
  );
}

// MAIN COMPONENT
export default function HeroDesktopComputerComponent() {
  const [booted, setBooted] = useState(false);
  const [clock, setClock] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const topZRef = useRef(100);

  // Clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  // ─── Icons state ───
  const desktopRef = useRef(null);
  const dragStartRef = useRef({});
  const [iconSizeMode, setIconSizeMode] = useState("medium");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [systemAlert, setSystemAlert] = useState("");
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [desktopViewMenuOpen, setDesktopViewMenuOpen] = useState(false);
  const [iconMenu, setIconMenu] = useState(null);
  const [clipboardState, setClipboardState] = useState(null);
  const [renamedSystemIcons, setRenamedSystemIcons] = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [activeTextDocId, setActiveTextDocId] = useState(null);
  const [renamingItem, setRenamingItem] = useState(null);

  const [iconPositions, setIconPositions] = useState({
    welcome: { x: 12, y: 8 },
    about: { x: 12, y: 104 },
    skills: { x: 12, y: 200 },
    experience: { x: 12, y: 296 },
    projects: { x: 12, y: 392 },
    github: { x: 12, y: 488 },
    contact: { x: 12, y: 584 },
    terminal: { x: 12, y: 680 },
    trash: { x: 112, y: 680 },
    explorer: { x: 112, y: 8 },
    settings: { x: 112, y: 104 },
  });

  const systemDesktopIcons = [
    { id: "welcome", title: "Welcome", glyph: Icons.welcome, windowId: "welcome", itemType: "app", system: true },
    { id: "about", title: "About Me", glyph: Icons.about, windowId: "about", itemType: "app", system: true },
    { id: "skills", title: "Skills", glyph: Icons.skills, windowId: "skills", itemType: "app", system: true },
    { id: "experience", title: "Experience", glyph: Icons.experience, windowId: "experience", itemType: "app", system: true },
    { id: "projects", title: "Projects", glyph: Icons.projects, windowId: "projects", itemType: "app", system: true },
    { id: "github", title: "GitHub", glyph: Icons.github, windowId: "github", itemType: "app", system: true },
    { id: "contact", title: "Contact", glyph: Icons.contact, windowId: "contact", itemType: "app", system: true },
    { id: "terminal", title: "Terminal", glyph: Icons.terminal, windowId: "terminal", itemType: "app", system: true },
    { id: "explorer", title: "File Explorer", glyph: Icons.folder, windowId: "explorer", itemType: "app", system: true },
    { id: "settings", title: "Settings", glyph: Icons.settings, windowId: "settings", itemType: "app", system: true },
    { id: "trash", title: "Recycle Bin", glyph: Icons.trash, windowId: "trash", itemType: "app", system: true },
  ].map((item) => ({
    ...item,
    title: renamedSystemIcons[item.id] || item.title,
  }));

  const desktopItems = [...systemDesktopIcons, ...customItems];
  const activeTextDoc = customItems.find((item) => item.id === activeTextDocId) || null;

  // ─── Windows state (Welcome + About open by default) ───
  const [windows, setWindows] = useState({
    welcome:    { id: "welcome",    title: "Welcome to JacobOS",       x: 120, y: 20,  w: 460, h: 400, isOpen: true,  isMinimized: false, isMaximized: false, z: 11 },
    about:      { id: "about",      title: "About — Jacob Rushinski",  x: 200, y: 60,  w: 520, h: 420, isOpen: true,  isMinimized: false, isMaximized: false, z: 10 },
    skills:     { id: "skills",     title: "Skills.exe",               x: 200, y: 60,  w: 480, h: 400, isOpen: false, isMinimized: false, isMaximized: false, z: 9 },
    experience: { id: "experience", title: "Experience.exe",           x: 180, y: 50,  w: 560, h: 480, isOpen: false, isMinimized: false, isMaximized: false, z: 8 },
    projects:   { id: "projects",   title: "Projects.exe",             x: 140, y: 30,  w: 540, h: 500, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
    github:     { id: "github",     title: "GitHub Stats",             x: 220, y: 70,  w: 460, h: 420, isOpen: false, isMinimized: false, isMaximized: false, z: 6 },
    contact:    { id: "contact",    title: "Contact.exe",              x: 260, y: 80,  w: 400, h: 380, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
    terminal:   { id: "terminal",   title: "JacobOS Terminal",         x: 120, y: 50,  w: 500, h: 350, isOpen: false, isMinimized: false, isMaximized: false, z: 4 },
    trash:      { id: "trash",      title: "Recycle Bin",              x: 300, y: 100, w: 320, h: 260, isOpen: false, isMinimized: false, isMaximized: false, z: 3 },
    explorer:   { id: "explorer",   title: "File Explorer",            x: 260, y: 90,  w: 460, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 2 },
    settings:   { id: "settings",   title: "Settings",                 x: 300, y: 120, w: 380, h: 280, isOpen: false, isMinimized: false, isMaximized: false, z: 1 },
    textdoc:    { id: "textdoc",    title: "Text Document",            x: 240, y: 80,  w: 520, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 12 },
  });

  const nextZ = () => ++topZRef.current;

  const openWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, z: nextZ() },
      };
    });
  }, []);

  const showProtectedDeleteAlert = useCallback(() => {
    setSystemAlert("You cannot delete this. These files are essential to JacobOS and cannot be removed.");
  }, []);

  const toDesktopPoint = useCallback((clientX, clientY) => {
    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return { x: 12, y: 8 };
    return {
      x: clamp(clientX - rect.left, 8, rect.width - 240),
      y: clamp(clientY - rect.top, 8, rect.height - 180),
    };
  }, []);

  const normalizeIconPosition = useCallback((x, y) => {
    const rect = desktopRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const maxW = rect?.width ?? 1200;
    const maxH = rect?.height ?? 700;
    const snapped = snapIconToGrid(x, y, iconSizeMode, 12, 8);
    const maxCol = Math.max(0, Math.floor((maxW - 12 - view.tileW) / view.cellX));
    const maxRow = Math.max(0, Math.floor((maxH - 8 - view.tileH) / view.cellY));
    const col = clamp(Math.round((snapped.x - 12) / view.cellX), 0, maxCol);
    const row = clamp(Math.round((snapped.y - 8) / view.cellY), 0, maxRow);
    return {
      x: 12 + col * view.cellX,
      y: 8 + row * view.cellY,
    };
  }, [iconSizeMode]);

  const getNextDesktopSlot = useCallback(() => {
    const rect = desktopRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const rows = Math.max(1, Math.floor(((rect?.height ?? 700) - 8 - view.tileH) / view.cellY) + 1);
    const index = desktopItems.length;
    const col = Math.floor(index / rows);
    const row = index % rows;
    return normalizeIconPosition(12 + col * view.cellX, 8 + row * view.cellY);
  }, [desktopItems.length, iconSizeMode, normalizeIconPosition]);

  const findFreeGridPosition = useCallback((targetX, targetY, excludeId = null, positions = iconPositions) => {
    const rect = desktopRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const maxCol = Math.max(0, Math.floor(((rect?.width ?? 1200) - 12 - view.tileW) / view.cellX));
    const maxRow = Math.max(0, Math.floor(((rect?.height ?? 700) - 8 - view.tileH) / view.cellY));

    const desired = normalizeIconPosition(targetX, targetY);
    const startCol = clamp(Math.round((desired.x - 12) / view.cellX), 0, maxCol);
    const startRow = clamp(Math.round((desired.y - 8) / view.cellY), 0, maxRow);
    const occupied = new Set();

    desktopItems.forEach((item) => {
      if (item.id === excludeId) return;
      const pos = positions[item.id];
      if (!pos) return;
      const col = clamp(Math.round((pos.x - 12) / view.cellX), 0, maxCol);
      const row = clamp(Math.round((pos.y - 8) / view.cellY), 0, maxRow);
      occupied.add(`${col}:${row}`);
    });

    const cellToPosition = (col, row) => ({
      x: 12 + col * view.cellX,
      y: 8 + row * view.cellY,
    });
    if (!occupied.has(`${startCol}:${startRow}`)) {
      return cellToPosition(startCol, startRow);
    }

    const maxRadius = Math.max(maxCol + 1, maxRow + 1);
    for (let radius = 1; radius <= maxRadius; radius++) {
      for (let row = Math.max(0, startRow - radius); row <= Math.min(maxRow, startRow + radius); row++) {
        for (let col = Math.max(0, startCol - radius); col <= Math.min(maxCol, startCol + radius); col++) {
          if (occupied.has(`${col}:${row}`)) continue;
          return cellToPosition(col, row);
        }
      }
    }

    return desired;
  }, [desktopItems, iconPositions, iconSizeMode, normalizeIconPosition]);

  const createDesktopItem = useCallback((itemType, clientX, clientY) => {
    const id = `${itemType}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const basePosition = (typeof clientX === "number" && typeof clientY === "number")
      ? normalizeIconPosition(toDesktopPoint(clientX, clientY).x, toDesktopPoint(clientX, clientY).y)
      : getNextDesktopSlot();

    const newItem = itemType === "folder"
      ? { id, title: "New Folder", glyph: Icons.folder, windowId: "explorer", itemType: "folder", system: false, content: "" }
      : { id, title: "New Text Document.txt", glyph: Icons.file, windowId: "textdoc", itemType: "text", system: false, content: "" };

    setCustomItems((prev) => [...prev, newItem]);
    setIconPositions((prev) => {
      const position = findFreeGridPosition(basePosition.x, basePosition.y, id, prev);
      return { ...prev, [id]: position };
    });
    setSelectedIcon(id);
    setIconMenu(null);
    setDesktopMenu(null);
  }, [findFreeGridPosition, getNextDesktopSlot, normalizeIconPosition, toDesktopPoint]);

  const createFolder = useCallback((clientX, clientY) => {
    createDesktopItem("folder", clientX, clientY);
  }, [createDesktopItem]);

  const createTextDocument = useCallback((clientX, clientY) => {
    createDesktopItem("text", clientX, clientY);
  }, [createDesktopItem]);

  const pasteDesktopItem = useCallback((clientX, clientY) => {
    if (!clipboardState) return;
    const source = desktopItems.find((item) => item.id === clipboardState.id);
    if (!source) return;

    const basePosition = (typeof clientX === "number" && typeof clientY === "number")
      ? normalizeIconPosition(toDesktopPoint(clientX, clientY).x, toDesktopPoint(clientX, clientY).y)
      : getNextDesktopSlot();

    if (clipboardState.mode === "cut") {
      setIconPositions((prev) => {
        const position = findFreeGridPosition(basePosition.x, basePosition.y, source.id, prev);
        return { ...prev, [source.id]: position };
      });
      setClipboardState(null);
      return;
    }

    const cloneId = `${source.itemType || "shortcut"}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const clone = {
      ...source,
      id: cloneId,
      title: source.title.endsWith(" - Copy") ? source.title : `${source.title} - Copy`,
      system: false,
    };

    setCustomItems((prev) => [...prev, clone]);
    setIconPositions((prev) => {
      const position = findFreeGridPosition(basePosition.x, basePosition.y, cloneId, prev);
      return { ...prev, [cloneId]: position };
    });
    setSelectedIcon(cloneId);
  }, [clipboardState, desktopItems, findFreeGridPosition, getNextDesktopSlot, normalizeIconPosition, toDesktopPoint]);

  const renameDesktopItem = useCallback((id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;
    setRenamingItem({ id, value: item.title });
  }, [desktopItems]);

  const commitRenameDesktopItem = useCallback(() => {
    if (!renamingItem) return;
    const id = renamingItem.id;
    const safeTitle = (renamingItem.value || "").trim();
    setRenamingItem(null);
    if (!safeTitle) return;

    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;

    if (item.system) {
      setRenamedSystemIcons((prev) => ({ ...prev, [id]: safeTitle }));
    } else {
      setCustomItems((prev) => prev.map((entry) => (
        entry.id === id ? { ...entry, title: safeTitle } : entry
      )));
      if (activeTextDocId === id) {
        setWindows((prev) => ({
          ...prev,
          textdoc: { ...prev.textdoc, title: safeTitle },
        }));
      }
    }
  }, [renamingItem, desktopItems, activeTextDocId]);

  const cancelRenameDesktopItem = useCallback(() => {
    setRenamingItem(null);
  }, []);

  const deleteDesktopItem = useCallback((id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;

    if (item.system) {
      showProtectedDeleteAlert();
      return;
    }

    setCustomItems((prev) => prev.filter((entry) => entry.id !== id));
    setIconPositions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeTextDocId === id) {
      setActiveTextDocId(null);
      setWindows((prev) => ({ ...prev, textdoc: { ...prev.textdoc, isOpen: false } }));
    }
    if (selectedIcon === id) {
      setSelectedIcon(null);
    }
  }, [desktopItems, activeTextDocId, selectedIcon, showProtectedDeleteAlert]);

  const openDesktopItem = useCallback((item) => {
    if (!item) return;
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);

    if (item.itemType === "text") {
      setActiveTextDocId(item.id);
      setWindows((prev) => ({
        ...prev,
        textdoc: {
          ...prev.textdoc,
          title: item.title,
          isOpen: true,
          isMinimized: false,
          z: nextZ(),
        },
      }));
      return;
    }

    if (item.itemType === "folder") {
      setWindows((prev) => ({
        ...prev,
        explorer: {
          ...prev.explorer,
          title: `File Explorer - ${item.title}`,
          isOpen: true,
          isMinimized: false,
          z: nextZ(),
        },
      }));
      return;
    }

    if (item.windowId) {
      openWindow(item.windowId);
    }
  }, [openWindow]);

  const updateTextContent = useCallback((id, content) => {
    setCustomItems((prev) => prev.map((item) => (
      item.id === id ? { ...item, content } : item
    )));
  }, []);

  const alignIconsToGrid = useCallback(() => {
    setIconPositions((prev) => {
      const next = { ...prev };
      const ordered = [...desktopItems].sort((a, b) => {
        const pa = prev[a.id] || { x: 99999, y: 99999 };
        const pb = prev[b.id] || { x: 99999, y: 99999 };
        if (pa.x === pb.x) return pa.y - pb.y;
        return pa.x - pb.x;
      });

      ordered.forEach((item) => {
        const current = next[item.id] || getNextDesktopSlot();
        next[item.id] = findFreeGridPosition(current.x, current.y, item.id, next);
      });

      return next;
    });
  }, [desktopItems, findFreeGridPosition, getNextDesktopSlot]);

  useEffect(() => {
    alignIconsToGrid();
  }, [iconSizeMode]);

  const openIconMenuAt = useCallback((id, clientX, clientY, modifiers = {}) => {
    const point = toDesktopPoint(clientX, clientY);
    setSelectedIcon(id);
    if (modifiers.ctrlKey || modifiers.shiftKey) {
      setIconMenu(null);
    } else {
      setIconMenu({ id, x: point.x, y: point.y });
    }
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
  }, [toDesktopPoint]);

  const openDesktopMenuAt = useCallback((clientX, clientY) => {
    const point = toDesktopPoint(clientX, clientY);
    setDesktopMenu({ x: point.x, y: point.y });
    setDesktopViewMenuOpen(false);
    setIconMenu(null);
  }, [toDesktopPoint]);

  const handleIconAction = useCallback((action, id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;
    setSelectedIcon(id);

    if (action === "open") openDesktopItem(item);
    if (action === "cut") setClipboardState({ mode: "cut", id });
    if (action === "copy") setClipboardState({ mode: "copy", id });
    if (action === "paste") {
      const iconPos = iconPositions[id] || getNextDesktopSlot();
      const rect = desktopRef.current?.getBoundingClientRect();
      pasteDesktopItem((rect?.left ?? 0) + iconPos.x + 20, (rect?.top ?? 0) + iconPos.y + 20);
    }
    if (action === "rename") renameDesktopItem(id);
    if (action === "delete") deleteDesktopItem(id);

    setIconMenu(null);
  }, [desktopItems, iconPositions, getNextDesktopSlot, pasteDesktopItem, openDesktopItem, renameDesktopItem, deleteDesktopItem]);

  const handleIconDragStart = useCallback((id, position) => {
    dragStartRef.current[id] = position;
    setSelectedIcon(id);
    setIconMenu(null);
    setDesktopMenu(null);
  }, []);

  const handleIconDragMove = useCallback((id, x, y) => {
    setIconPositions((prev) => ({ ...prev, [id]: { x, y } }));
  }, []);

  const handleIconDrop = useCallback((id, x, y) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;

    const snapped = normalizeIconPosition(x, y);
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const trashPos = iconPositions.trash;
    const overTrash = id !== "trash" && trashPos
      && snapped.x + view.tileW / 2 >= trashPos.x
      && snapped.x + view.tileW / 2 <= trashPos.x + view.tileW
      && snapped.y + view.tileH / 2 >= trashPos.y
      && snapped.y + view.tileH / 2 <= trashPos.y + view.tileH;

    if (overTrash) {
      if (item.system) {
        setIconPositions((prev) => ({ ...prev, [id]: dragStartRef.current[id] || snapped }));
        showProtectedDeleteAlert();
        return;
      }
      setCustomItems((prev) => prev.filter((entry) => entry.id !== id));
      setIconPositions((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (activeTextDocId === id) {
        setActiveTextDocId(null);
        setWindows((prev) => ({ ...prev, textdoc: { ...prev.textdoc, isOpen: false } }));
      }
      if (selectedIcon === id) {
        setSelectedIcon(null);
      }
      return;
    }

    setIconPositions((prev) => {
      const freePos = findFreeGridPosition(snapped.x, snapped.y, id, prev);
      return { ...prev, [id]: freePos };
    });
  }, [desktopItems, iconSizeMode, iconPositions.trash, normalizeIconPosition, activeTextDocId, selectedIcon, showProtectedDeleteAlert, findFreeGridPosition]);

  const nudgeSelectedIcon = useCallback((dxCells, dyCells) => {
    if (!selectedIcon) return;
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    setIconPositions((prev) => {
      const current = prev[selectedIcon];
      if (!current) return prev;
      const targetX = current.x + dxCells * view.cellX;
      const targetY = current.y + dyCells * view.cellY;
      const freePos = findFreeGridPosition(targetX, targetY, selectedIcon, prev);
      return { ...prev, [selectedIcon]: freePos };
    });
  }, [selectedIcon, iconSizeMode, findFreeGridPosition]);

  const moveDesktopItemByGrid = useCallback((id, dxCells, dyCells) => {
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    setIconPositions((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const targetX = current.x + dxCells * view.cellX;
      const targetY = current.y + dyCells * view.cellY;
      const freePos = findFreeGridPosition(targetX, targetY, id, prev);
      return { ...prev, [id]: freePos };
    });
    setSelectedIcon(id);
  }, [iconSizeMode, findFreeGridPosition]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const target = e.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (isTyping) return;

      const ctrl = e.ctrlKey || e.metaKey;

      if (e.key === "Escape") {
        setIconMenu(null);
        setDesktopMenu(null);
        setDesktopViewMenuOpen(false);
        cancelRenameDesktopItem();
        return;
      }

      if (ctrl && e.shiftKey && (e.key === "N" || e.key === "n")) {
        e.preventDefault();
        createFolder();
        return;
      }

      if (!selectedIcon) return;

      if (ctrl && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        setClipboardState({ mode: "copy", id: selectedIcon });
        return;
      }

      if (ctrl && (e.key === "x" || e.key === "X")) {
        e.preventDefault();
        setClipboardState({ mode: "cut", id: selectedIcon });
        return;
      }

      if (ctrl && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
        const pos = iconPositions[selectedIcon] || getNextDesktopSlot();
        const rect = desktopRef.current?.getBoundingClientRect();
        pasteDesktopItem((rect?.left ?? 0) + pos.x + 20, (rect?.top ?? 0) + pos.y + 20);
        return;
      }

      if (e.key === "Delete") {
        e.preventDefault();
        deleteDesktopItem(selectedIcon);
        return;
      }

      if (e.key === "F2") {
        e.preventDefault();
        renameDesktopItem(selectedIcon);
        return;
      }

      if (e.shiftKey && e.key === "ArrowLeft") { e.preventDefault(); nudgeSelectedIcon(-1, 0); }
      if (e.shiftKey && e.key === "ArrowRight") { e.preventDefault(); nudgeSelectedIcon(1, 0); }
      if (e.shiftKey && e.key === "ArrowUp") { e.preventDefault(); nudgeSelectedIcon(0, -1); }
      if (e.shiftKey && e.key === "ArrowDown") { e.preventDefault(); nudgeSelectedIcon(0, 1); }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cancelRenameDesktopItem, createFolder, deleteDesktopItem, getNextDesktopSlot, iconPositions, nudgeSelectedIcon, pasteDesktopItem, renameDesktopItem, selectedIcon]);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized, z: nextZ() },
    }));
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], z: nextZ() },
    }));
  }, []);

  const moveWindow = useCallback((id, x, y) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y, isMaximized: false },
    }));
  }, []);

  const resizeWindow = useCallback((id, x, y, w, h) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y, w, h, isMaximized: false },
    }));
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((id) => {
        next[id] = { ...next[id], isOpen: false, isMinimized: false, isMaximized: false };
      });
      return next;
    });
  }, []);

  const cascadeWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      let offset = 0;
      Object.keys(next).forEach((id) => {
        if (next[id].isOpen) {
          next[id] = { ...next[id], x: 100 + offset, y: 20 + offset, isMaximized: false, isMinimized: false, z: nextZ() };
          offset += 30;
        }
      });
      return next;
    });
  }, []);

  const tileWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      const openIds = Object.keys(next).filter((id) => next[id].isOpen);
      const count = openIds.length;
      if (count === 0) return next;
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      openIds.forEach((id, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        next[id] = {
          ...next[id],
          x: col * (800 / cols),
          y: row * (550 / rows),
          w: 800 / cols,
          h: 550 / rows,
          isMaximized: false,
          isMinimized: false,
          z: nextZ(),
        };
      });
      return next;
    });
  }, []);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);
  const activeWindowId = openWindows.filter((w) => !w.isMinimized).sort((a, b) => b.z - a.z)[0]?.id;

  // ─── Start menu ───
  const [startOpen, setStartOpen] = useState(false);

  const windowContent = {
    welcome: <WelcomeApp />,
    about: <AboutApp />,
    skills: <SkillsApp />,
    experience: <ExperienceApp />,
    projects: <ProjectsApp />,
    github: <GitHubApp />,
    contact: <ContactApp />,
    terminal: <TerminalApp />,
    trash: <TrashApp onProtectedDelete={showProtectedDeleteAlert} />,
    explorer: (
      <ExplorerApp
        items={desktopItems}
        selectedId={selectedIcon}
        onOpenItem={openDesktopItem}
        onAction={handleIconAction}
        onMoveItem={moveDesktopItemByGrid}
      />
    ),
    settings: <SettingsApp iconSizeMode={iconSizeMode} setIconSizeMode={setIconSizeMode} />,
    textdoc: <TextDocumentApp item={activeTextDoc} onChangeContent={updateTextContent} />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }
        body { background: #1a1a1a; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 13px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        ::-webkit-scrollbar { width: 14px; height: 14px; background: #d7d7d7; }
        ::-webkit-scrollbar-track { background: #d7d7d7; border-left: 2px solid #f3f3f3; border-right: 2px solid #b8b8b8; }
        ::-webkit-scrollbar-thumb { 
          background: #5f5f5f; 
          border-top: 1px solid #9a9a9a; 
          border-left: 1px solid #9a9a9a; 
          border-right: 1px solid #2a2a2a; 
          border-bottom: 1px solid #2a2a2a; 
          min-height: 24px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #1a56c9;
          border-top: 1px solid #7ea6ff;
          border-left: 1px solid #7ea6ff;
          border-right: 1px solid #0b3b8f;
          border-bottom: 1px solid #0b3b8f;
        }
        ::selection { background: #000080; color: #fff; }
      `}</style>

      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#2a2a2a",
        padding: "12px",
      }}>
        {/* Computer Shell / Bezel */}
        <div style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          maxWidth: 1400,
          maxHeight: 900,
          background: "linear-gradient(180deg, #d6c9a7 0%, #c9bb98 100%)",
          borderRadius: "24px",
          padding: "18px",
          boxShadow: "0 20px 80px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -3px 0 rgba(0,0,0,0.15)",
          border: "1px solid rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          animation: "fadeIn 0.6s ease-out",
        }}>
          {/* Inner Inset */}
          <div style={{
            flex: 1,
            background: "#222",
            borderRadius: "16px",
            padding: "10px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6), inset 0 4px 12px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* CRT Screen */}
            <div style={{
              flex: 1,
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.15), transparent 55%), linear-gradient(180deg, #0b4aa6, #0a3f90)",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* CRT Scanlines */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)",
                pointerEvents: "none",
                zIndex: 50,
              }} />
              {/* Vignette */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
                pointerEvents: "none",
                zIndex: 51,
              }} />

              {/* ─── OS Menu Bar with functional dropdowns ─── */}
              {booted ? (
                <>
                  <TopMenuBar
                    openWindow={openWindow}
                    closeAllWindows={closeAllWindows}
                    tileWindows={tileWindows}
                    cascadeWindows={cascadeWindows}
                    iconSizeMode={iconSizeMode}
                    setIconSizeMode={setIconSizeMode}
                    createFolder={createFolder}
                    createTextDocument={createTextDocument}
                    pasteDesktopItem={pasteDesktopItem}
                    hasClipboard={!!clipboardState}
                  />

              {/* ─── Desktop Area ─── */}
              <div
                ref={desktopRef}
                style={{ flex: 1, position: "relative", overflow: "hidden" }}
                onPointerDown={(e) => {
                  if (e.button !== 0) return;
                  if (e.target !== e.currentTarget) return;
                  setSelectedIcon(null);
                  setStartOpen(false);
                  setIconMenu(null);
                  setDesktopMenu(null);
                  setDesktopViewMenuOpen(false);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openDesktopMenuAt(e.clientX, e.clientY);
                }}
              >
                {/* Desktop Icons */}
                {desktopItems.map((icon) => (
                  <DesktopIcon
                    key={icon.id}
                    icon={icon}
                    position={iconPositions[icon.id]}
                    selected={selectedIcon === icon.id}
                    hovered={hoveredIcon === icon.id}
                    iconSizeMode={iconSizeMode}
                    onDoubleClick={() => openDesktopItem(icon)}
                    onDragStart={handleIconDragStart}
                    onDragMove={handleIconDragMove}
                    onDrop={handleIconDrop}
                    onSingleClick={(id, clientX, clientY, modifiers) => openIconMenuAt(id, clientX, clientY, modifiers)}
                    onContextMenu={openIconMenuAt}
                    onHoverChange={setHoveredIcon}
                    isRenaming={renamingItem?.id === icon.id}
                    renameValue={renamingItem?.id === icon.id ? renamingItem.value : icon.title}
                    onRenameChange={(value) => setRenamingItem((prev) => (prev?.id === icon.id ? { ...prev, value } : prev))}
                    onRenameCommit={commitRenameDesktopItem}
                    onRenameCancel={cancelRenameDesktopItem}
                  />
                ))}

                {desktopMenu && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      left: desktopMenu.x,
                      top: desktopMenu.y,
                      minWidth: 190,
                      background: "#c0c0c0",
                      borderTop: "2px solid #fff",
                      borderLeft: "2px solid #fff",
                      borderRight: "2px solid #404040",
                      borderBottom: "2px solid #404040",
                      boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
                      zIndex: 9100,
                      padding: "2px 0",
                    }}
                  >
                    <div
                      onMouseEnter={() => setDesktopViewMenuOpen(true)}
                      onMouseLeave={() => setDesktopViewMenuOpen(false)}
                      style={{ position: "relative" }}
                    >
                      <button
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          color: MENU_TEXT_COLOR,
                          textAlign: "left",
                          padding: "6px 14px",
                          fontSize: 12,
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                        onClick={() => setDesktopViewMenuOpen((prev) => !prev)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                      >
                        View  &gt;
                      </button>
                      {desktopViewMenuOpen && (
                        <div
                          onMouseEnter={() => setDesktopViewMenuOpen(true)}
                          onMouseLeave={() => setDesktopViewMenuOpen(false)}
                          style={{
                            position: "absolute",
                            left: "100%",
                            top: 0,
                            minWidth: 180,
                            background: "#c0c0c0",
                            borderTop: "2px solid #fff",
                            borderLeft: "2px solid #fff",
                            borderRight: "2px solid #404040",
                            borderBottom: "2px solid #404040",
                            boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
                          }}
                        >
                          {[
                            { key: "large", label: "Large icons" },
                            { key: "medium", label: "Medium icons" },
                            { key: "small", label: "Small icons" },
                          ].map((opt) => (
                            <button
                              key={opt.key}
                              onClick={() => {
                                setIconSizeMode(opt.key);
                                setDesktopMenu(null);
                                setDesktopViewMenuOpen(false);
                              }}
                              style={{
                                width: "100%",
                                border: "none",
                                background: "transparent",
                                color: MENU_TEXT_COLOR,
                                textAlign: "left",
                                padding: "6px 14px",
                                fontSize: 12,
                                fontFamily: "inherit",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                            >
                              {(iconSizeMode === opt.key ? "* " : "") + opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        alignIconsToGrid();
                        setDesktopMenu(null);
                      }}
                      style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                    >
                      Sort by Grid
                    </button>
                    <button
                      onClick={() => {
                        alignIconsToGrid();
                        setDesktopMenu(null);
                      }}
                      style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                    >
                      Refresh
                    </button>
                    <div style={{ height: 1, background: "#808080", margin: "3px 8px" }} />
                    <button
                      onClick={() => createFolder()}
                      style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                    >
                      New Folder
                    </button>
                    <button
                      onClick={() => createTextDocument()}
                      style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 14px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                    >
                      New Text Document
                    </button>
                    {clipboardState && (
                      <button
                        onClick={() => {
                          pasteDesktopItem();
                          setDesktopMenu(null);
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          color: MENU_TEXT_COLOR,
                          textAlign: "left",
                          padding: "6px 14px",
                          fontSize: 12,
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                      >
                        Paste
                      </button>
                    )}
                  </div>
                )}

                {iconMenu && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      left: iconMenu.x,
                      top: iconMenu.y,
                      minWidth: 180,
                      background: "#c0c0c0",
                      borderTop: "2px solid #fff",
                      borderLeft: "2px solid #fff",
                      borderRight: "2px solid #404040",
                      borderBottom: "2px solid #404040",
                      boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
                      zIndex: 9200,
                      padding: "2px 0",
                    }}
                  >
                    {[
                      { key: "open", label: "Open" },
                      { key: "cut", label: "Cut" },
                      { key: "copy", label: "Copy" },
                      ...(clipboardState ? [{ key: "paste", label: "Paste" }] : []),
                      { key: "rename", label: "Rename" },
                      { key: "delete", label: "Delete" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => handleIconAction(opt.key, iconMenu.id)}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          color: MENU_TEXT_COLOR,
                          textAlign: "left",
                          padding: "6px 14px",
                          fontSize: 12,
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Windows */}
                {openWindows
                  .filter((w) => !w.isMinimized)
                  .sort((a, b) => a.z - b.z)
                  .map((w) => (
                    <Window
                      key={w.id}
                      win={w}
                      isActive={w.id === activeWindowId}
                      onFocus={() => focusWindow(w.id)}
                      onClose={() => closeWindow(w.id)}
                      onMinimize={() => minimizeWindow(w.id)}
                      onMaximize={() => maximizeWindow(w.id)}
                      onMove={(x, y) => moveWindow(w.id, x, y)}
                      onResize={(x, y, nw, nh) => resizeWindow(w.id, x, y, nw, nh)}
                    >
                      {windowContent[w.id]}
                    </Window>
                  ))}
              </div>

              {/* ─── Taskbar ─── */}
              <div style={{
                background: "#c0c0c0",
                borderTop: "2px solid #fff",
                padding: "3px 6px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                position: "relative",
                zIndex: 8000,
                flexShrink: 0,
              }}>
                {/* Explore Button (was Start) */}
                <button
                  onClick={(e) => { e.stopPropagation(); setStartOpen((p) => !p); }}
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
                  <span style={{ fontSize: 14 }}>🖥</span> Explore
                </button>

                {/* Divider */}
                <div style={{ width: 1, height: 20, background: "#808080", marginLeft: 2, marginRight: 2 }} />

                {/* Open App Buttons in Taskbar with close X */}
                <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden" }}>
                  {openWindows.map((w) => (
                    <div
                      key={w.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: w.id === activeWindowId && !w.isMinimized ? "#d0d0d0" : "#c0c0c0",
                        borderTop: w.id === activeWindowId && !w.isMinimized ? "1px solid #404040" : "1px solid #fff",
                        borderLeft: w.id === activeWindowId && !w.isMinimized ? "1px solid #404040" : "1px solid #fff",
                        borderRight: w.id === activeWindowId && !w.isMinimized ? "1px solid #fff" : "1px solid #404040",
                        borderBottom: w.id === activeWindowId && !w.isMinimized ? "1px solid #fff" : "1px solid #404040",
                        maxWidth: 160,
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (w.isMinimized) {
                            setWindows((prev) => ({ ...prev, [w.id]: { ...prev[w.id], isMinimized: false, z: nextZ() } }));
                          } else if (w.id === activeWindowId) {
                            minimizeWindow(w.id);
                          } else {
                            focusWindow(w.id);
                          }
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "3px 6px",
                          fontSize: 11,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textAlign: "left",
                          flex: 1,
                          color: "#111",
                        }}
                      >
                        {w.title}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(w.id); }}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 11,
                          fontFamily: "inherit",
                          padding: "2px 5px",
                          color: "#555",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                        title="Close"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Clock */}
                <div style={{
                  background: "#c0c0c0",
                  borderTop: "1px solid #404040",
                  borderLeft: "1px solid #404040",
                  borderRight: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#111",
                  whiteSpace: "nowrap",
                }}>
                  {clock}
                </div>

                {/* Start Menu Popup */}
                {startOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      left: 6,
                      bottom: "100%",
                      marginBottom: 2,
                      width: 220,
                      background: "#c0c0c0",
                      borderTop: "2px solid #fff",
                      borderLeft: "2px solid #fff",
                      borderRight: "2px solid #404040",
                      borderBottom: "2px solid #404040",
                      boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
                      zIndex: 9000,
                    }}
                  >
                    {/* Blue sidebar */}
                    <div style={{ display: "flex" }}>
                      <div style={{
                        width: 28,
                        background: "linear-gradient(180deg, #0b3b8f, #1a56c9)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "8px 2px",
                      }}>
                        <span style={{
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: 10,
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          letterSpacing: 1,
                        }}>
                          JacobOS
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        {desktopItems.filter((i) => i.itemType === "app" && i.id !== "trash").map((icon) => (
                          <button
                            key={icon.id}
                            onClick={() => { openDesktopItem(icon); setStartOpen(false); }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              width: "100%",
                              padding: "6px 10px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: 12,
                              fontFamily: "inherit",
                              textAlign: "left",
                              color: "#111",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
                          >
                            <span style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ transform: "scale(0.6)", display: "block" }}>{icon.glyph}</span>
                            </span>
                            {icon.title}
                          </button>
                        ))}
                        <div style={{ height: 1, background: "#808080", margin: "2px 8px" }} />
                        <button
                          onClick={() => { window.open(PERSONAL.resumeUrl, "_blank"); setStartOpen(false); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            width: "100%",
                            padding: "6px 10px",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: 12,
                            fontFamily: "inherit",
                            textAlign: "left",
                            color: "#111",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
                        >
                          <span style={{ width: 20, textAlign: "center" }}>📄</span>
                          Resume.pdf
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                </>
              ) : (
                <BootSequence embedded onComplete={() => setBooted(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Computer base/stand indicator */}
        <div style={{
          marginTop: 8,
          height: 6,
          borderRadius: 10,
          background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.15))",
          marginLeft: "30%",
          marginRight: "30%",
        }} />
      </div>
      <SystemAlertModal message={systemAlert} onClose={() => setSystemAlert("")} />
    </>
  );
}






