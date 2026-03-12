"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* 
   JacobOS  Retro Desktop Portfolio
   A complete retro operating system experience as a portfolio
    */

//  Data 
const PERSONAL = {
  name: "Jacob Rushinski",
  title: "Backend / Full-Stack Developer",
  tagline: "I build production-grade systems: APIs, data modeling, auth, payments, automation.",
  email: "jacobrushinski@gmail.com",
  location: "United States",
  github: "https://github.com/rushinski",
  linkedin: "https://linkedin.com/in/jacobrushinski",
  resumeUrl: "/Jacob_Rushinski_Resume.pdf",
  school: "Thaddeus Stevens College of Technology",
  gradDate: "May 2026",
  gpa: "3.52 / 4.00",
};

const SKILLS = {
  Languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "Java", "C++", "PHP", "HTML", "CSS"],
  Technologies: ["Node.js", "Next.js", "Flask", "React", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Tailwind CSS"],
  Integrations: ["Stripe", "Supabase", "Discord.js", "ADBKit", "AWS SES"],
  "Developer Tools": ["Docker", "Git", "GitHub", "GitHub Actions", "Vercel"],
};

const EXPERIENCE = [
  {
    company: "Realdealkickzsc",
    role: "Contract Full-Stack Software Engineer",
    period: "Nov 2025 - Feb 2026",
    type: "Contract / Remote",
    desc: "Sole engineer — built a production e-commerce platform from scratch, replacing Shopify with a custom full-stack system and owning the entire infrastructure.",
    bullets: [
      "Replaced Shopify with a custom Next.js/Supabase system, reducing monthly costs from $132 to $50.",
      "Engineered transactional order workflows and Stripe/Shippo webhook pipelines supporting 31 monthly orders ($8k GMV) with 100% success and zero duplicate charges.",
      "Optimized storefront via SSR improvements, query tuning, and layout refactoring — increasing projected annual sessions from 204k to 236k.",
      "Maintained 100% deployment uptime with GitHub Actions CI/CD: migration validation, type-check enforcement, build verification, and post-deploy health monitoring.",
      "Engineered an automated sneaker title parsing system with structured attribute extraction, reducing product listing workflow from 24 clicks (Shopify) to 11.",
      "Built a centralized proxy enforcing CSRF protection, Upstash rate limiting, and MFA guardrails — handling 7.5M monthly requests with zero unauthorized access incidents.",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "Upstash Redis", "GitHub Actions", "AWS SES"],
  },
  {
    company: "Giant Food Stores",
    role: "Giant Direct Facilitator & Seafood Associate",
    period: "May 2022 - Present",
    type: "Part-time",
    desc: "High-volume grocery fulfillment and seafood department operations in a fast-paced retail environment.",
    bullets: [
      "Led Giant Direct fulfillment processing 400+ unit orders during peak demand while training and onboarding new associates.",
      "Delivered consistent customer service with zero formal complaints and hundreds of positive commendations across in-store and online order interactions.",
    ],
    stack: [],
  },
];

const PROJECTS = [
  {
    title: "Multi-Tenant Sneaker Marketplace",
    date: "Feb 2026 - Present",
    status: "IN_PROGRESS",
    desc: "Scaling a successful custom e-commerce build into a SaaS platform that allows sneaker resellers to launch independent storefronts on shared, high-performance infrastructure.",
    impact: [
      "Live: 1 seller active; 5 in the onboarding pipeline across 6+ projected storefronts.",
      "Achieved ~90% successful object centering via an ML-assisted background removal pipeline with multi-resolution WebP output.",
      "Designed to undercut Shopify overhead while preserving reseller-specific workflows.",
    ],
    stack: ["Go", "Next.js", "PostgreSQL", "Digital Ocean", "Upstash Redis"],
    narrative: "While finishing a contract for a sneaker reseller, five other shop owners reached out wanting similar sites. I'm a sneakerhead myself, so this was already a space I cared about — and I knew running five separate backends and infrastructures made no sense. Building a shared platform was the obvious architectural answer.",
    architecture: [
      "Multi-tenancy and isolation: single Go backend with Chi router and PostgreSQL Row Level Security (RLS), ensuring tenant-level data isolation.",
      "Infrastructure migration: moved from Vercel/Supabase to Digital Ocean for tighter CPU/RAM control and stronger Go API performance.",
      "Payment pivot: replaced Stripe after account closure with a custom PayRilla (Accept.Blue) integration to keep the business operational.",
    ],
    links: {
      github: "https://github.com/rushinski/rdk-webstore",
      live: "https://www.realdealkickzsc.com/",
    },
  },
  {
    title: "Rise of Kingdoms Title Automation",
    date: "Jan 2025 - Mar 2025",
    status: "COMPLETE",
    desc: "An automation pipeline using computer vision and device bridging to automate in-game actions from Discord — built in a niche where the implementation is deliberately kept secret.",
    impact: [
      "Eliminated 100% of manual in-game title assignments through a fully automated Discord-driven pipeline.",
      "Reduced title assignment time from ~45 seconds to 10–15 seconds with queue-based orchestration.",
      "Cut server operating costs from $50+/month to $8/month.",
    ],
    stack: ["Node.js", "MongoDB", "ADBKit", "Tesseract.js", "Discord.js"],
    narrative: "How title bots work is deliberately kept private — it's against the game's TOS and the few who can build them guard that knowledge because it's a money-maker. I had to reverse-engineer the entire problem from scratch with no documentation. This was my first time working with ADBKit, Android VMs, and computer vision outside of a tutorial context.",
    highlight: "The hardest unsolved problem: watching the in-game chat with OCR required context-switching the bot off of title assignment, causing missed requests. A 2-bot split still couldn't handle simultaneous requests. I believe the real solution is packet interception — other bots surface private player data that's only accessible at the network layer, not the UI.",
    differently: "Press harder for an in-game chat approach from the start instead of defaulting to Discord commands. The Discord-based flow worked, but it was already the outdated approach by the time I built it.",
    outcome: "The Discord-based bot worked and cut assignment time by 3x, but the client ultimately moved to an in-game bot — the right call. The project taught me OCR, ADBKit, automation pipelines, and where the real limits of UI-layer automation are.",
    architecture: [
      "ADB device bridge: first exposure to ADBKit and Android VMs — had to learn both from scratch with no public documentation for this specific use case.",
      "Dynamic coordinate detection: the governor profile popup appears in 4 different screen positions, requiring Pixelmatch + Sharp + Tesseract.js to determine exact click coordinates on every single assignment.",
      "Queue with TTL locks: a 60-second TTL lock per title role prevented race conditions when multiple commanders held the same rank and requests overlapped.",
      "Unsolved race condition: OCR watching kingdom chat and assigning titles required context-switching — which caused missed requests under concurrent load. A 2-bot split still failed under simultaneous demand.",
      "Network-layer hypothesis: competing bots surface private player stats not accessible via UI, which strongly suggests packet interception between the game client and server — an approach I never attempted.",
    ],
    links: {
      github: "https://github.com/rushinski/Discord-Title-Bot",
      videos: [
        {
          id: "title-bot-set-location",
          label: "Set Location Demo",
          src: "/videos/discord-title-bot-set-location.mp4",
        },
        {
          id: "title-bot-assign-title",
          label: "Assign Title Demo",
          src: "/videos/discord-title-bot-assign-title.mp4",
        },
      ],
    },
  },
  {
    title: "\"Unity\" Discord Moderation Bot",
    date: "Oct 2024 - Jan 2025",
    status: "COMPLETE",
    desc: "My first backend project — a high-traffic moderation and utility bot built from scratch while learning server-side development, persistence, and event-driven architecture.",
    impact: [
      "Consolidated 5+ single-purpose bots into one unified system serving 900+ members — reliability earned 3 paid contract offers.",
      "Automated archival of 1,000+ support ticket transcripts via the GitHub Gist API.",
      "Database-backed persistence enabled features impossible without it: giveaways that survive restarts, infraction history, reaction roles, and message-count leaderboards.",
    ],
    stack: ["Node.js", "Discord.js", "MongoDB", "GitHub Gist API"],
    narrative: "This was my first purely backend project — everything before it had been frontend web development. Moving into bot infrastructure meant learning an entirely new domain from scratch: event-driven architecture, stateful systems, and operational reliability. The turning point was realizing that without a database, a bot restart silently killed every active giveaway.",
    highlight: "The biggest shift was realizing I was building a system, not a script. State, durability, and event-driven design were all new concepts — and discovering fast-levenshtein after manually maintaining hundreds of banned-word variants showed me what good research looks like.",
    differently: "Multiple environments from day one. I didn't fully understand dev/prod separation until my first contract, but it would have let me develop safely against the live bot without risk of breaking production.",
    outcome: "The bot worked reliably in a 900+ member server and generated 3 paid offers for similar builds — all from a domain I had never touched before this project.",
    architecture: [
      "Persistence first: realizing a bot restart would silently kill active giveaways pushed me into MongoDB — which then became the backbone for infractions, reaction roles, and message leaderboards.",
      "Algorithmic moderation: manually maintaining hundreds of banned-word variants and their creative workarounds was unwinnable. One research session led to fast-levenshtein for fuzzy scoring, which solved the problem permanently.",
      "Data archiving: generated and stored 1,000+ support ticket transcripts through a GitHub Gist API integration.",
    ],
    links: {
      github: "https://github.com/rushinski/Discord-Bot-Unity",
      landing: "https://rushinski.github.io/Unity-Landing-Page/",
    },
  },
];

const VIDEO_LIBRARY = PROJECTS.flatMap((project, projectIdx) =>
  (project.links?.videos || []).map((video, videoIdx) => ({
    ...video,
    id: video.id || `video-${projectIdx}-${videoIdx}`,
    label: video.label || `Video ${videoIdx + 1}`,
    src: video.src || "",
    projectTitle: project.title,
    projectIdx,
    videoIdx,
  }))
);
const VIDEO_LIBRARY_BY_ID = VIDEO_LIBRARY.reduce((acc, video) => {
  acc[video.id] = video;
  return acc;
}, {});

// Retro Pixel Icon SVGs — Win95/98 16-color style with 3D bevel lighting (top-left = light)
const Icons = {
  folder: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* back panel */}
      <rect x="1" y="9" width="30" height="20" fill="#c8a000" stroke="#806000" strokeWidth="1"/>
      {/* tab */}
      <path d="M1,9 L1,5 L13,5 L16,9 Z" fill="#b89000" stroke="#806000" strokeWidth="1"/>
      {/* front face */}
      <rect x="2" y="10" width="28" height="18" fill="#ffd800" stroke="#c8a000" strokeWidth="0.5"/>
      {/* top-left highlight */}
      <line x1="3" y1="11" x2="29" y2="11" stroke="#ffe880" strokeWidth="1.5"/>
      <line x1="3" y1="11" x2="3" y2="27" stroke="#ffe880" strokeWidth="1"/>
      {/* bottom-right shadow */}
      <line x1="2" y1="27" x2="30" y2="27" stroke="#806000" strokeWidth="1"/>
      <line x1="30" y1="10" x2="30" y2="27" stroke="#806000" strokeWidth="1"/>
    </svg>
  ),
  file: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* drop shadow */}
      <rect x="8" y="4" width="19" height="25" fill="#a0a0a0" opacity="0.5"/>
      {/* page body */}
      <rect x="5" y="2" width="19" height="25" fill="#ffffff" stroke="#808080" strokeWidth="0.5"/>
      {/* folded corner */}
      <polygon points="24,2 30,8 24,8" fill="#d8d8d8" stroke="#808080" strokeWidth="0.5"/>
      {/* outer border */}
      <path d="M5,2 L24,2 L30,8 L30,27 L5,27 Z" fill="none" stroke="#000080" strokeWidth="1"/>
      {/* fold crease */}
      <line x1="24" y1="2" x2="24" y2="8" stroke="#808080" strokeWidth="0.8"/>
      {/* text lines */}
      <line x1="8" y1="12" x2="21" y2="12" stroke="#000080" strokeWidth="1.2"/>
      <line x1="8" y1="16" x2="19" y2="16" stroke="#c0c0c0" strokeWidth="1"/>
      <line x1="8" y1="20" x2="20" y2="20" stroke="#c0c0c0" strokeWidth="1"/>
      <line x1="8" y1="24" x2="15" y2="24" stroke="#c0c0c0" strokeWidth="1"/>
    </svg>
  ),
  terminal: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* monitor outer shell */}
      <rect x="2" y="2" width="28" height="22" rx="1" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
      {/* bevel highlight */}
      <line x1="3" y1="3" x2="29" y2="3" stroke="#ffffff" strokeWidth="1"/>
      <line x1="3" y1="3" x2="3" y2="23" stroke="#ffffff" strokeWidth="1"/>
      {/* screen bezel */}
      <rect x="4" y="4" width="24" height="18" fill="#404040" stroke="#202020" strokeWidth="0.5"/>
      {/* screen */}
      <rect x="5" y="5" width="22" height="16" fill="#000000"/>
      {/* titlebar stripe */}
      <rect x="5" y="5" width="22" height="3" fill="#000080"/>
      {/* green text rows */}
      <rect x="7" y="11" width="8" height="1.5" fill="#00cc00"/>
      <rect x="16" y="11" width="4" height="1.5" fill="#00ff00"/>
      <rect x="7" y="14" width="13" height="1.5" fill="#00cc00" opacity="0.75"/>
      <rect x="7" y="17" width="9" height="1.5" fill="#00cc00" opacity="0.45"/>
      {/* monitor neck */}
      <rect x="11" y="24" width="10" height="3" fill="#b0b0b0" stroke="#808080" strokeWidth="0.5"/>
      {/* monitor base */}
      <rect x="8" y="27" width="16" height="2" rx="1" fill="#b0b0b0" stroke="#808080" strokeWidth="0.5"/>
    </svg>
  ),
  trash: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* can body */}
      <path d="M8,9 L7,28 L25,28 L24,9 Z" fill="#d0d0d0" stroke="#808080" strokeWidth="1"/>
      {/* highlight on left face */}
      <path d="M8,9 L9,28 L10,28 L11,9 Z" fill="#e8e8e8"/>
      {/* lid */}
      <rect x="6" y="6" width="20" height="4" rx="1" fill="#b0b0b0" stroke="#606060" strokeWidth="1"/>
      <line x1="7" y1="7" x2="25" y2="7" stroke="#d8d8d8" strokeWidth="1"/>
      {/* handle */}
      <rect x="13" y="3" width="6" height="4" rx="1" fill="#a0a0a0" stroke="#606060" strokeWidth="1"/>
      <line x1="14" y1="4" x2="18" y2="4" stroke="#c8c8c8" strokeWidth="1"/>
      {/* vertical ribs */}
      <line x1="12" y1="10" x2="11" y2="27" stroke="#b8b8b8" strokeWidth="1.2"/>
      <line x1="16" y1="10" x2="16" y2="27" stroke="#b8b8b8" strokeWidth="1.2"/>
      <line x1="20" y1="10" x2="21" y2="27" stroke="#b8b8b8" strokeWidth="1.2"/>
      {/* bottom shadow */}
      <line x1="7" y1="27" x2="25" y2="27" stroke="#808080" strokeWidth="1"/>
    </svg>
  ),
  contact: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* envelope body */}
      <rect x="2" y="8" width="28" height="18" fill="#fffbe0" stroke="#c0a000" strokeWidth="1"/>
      {/* inner face highlight */}
      <rect x="3" y="9" width="26" height="16" fill="#fff8d0"/>
      <line x1="3" y1="9" x2="3" y2="25" stroke="#fffce8" strokeWidth="1"/>
      <line x1="3" y1="9" x2="29" y2="9" stroke="#fffce8" strokeWidth="1"/>
      {/* flap V-shape */}
      <polygon points="2,8 16,20 30,8" fill="none" stroke="#c0a000" strokeWidth="1.5"/>
      {/* bottom fold lines */}
      <line x1="2" y1="26" x2="13" y2="17" stroke="#c0a000" strokeWidth="1"/>
      <line x1="30" y1="26" x2="19" y2="17" stroke="#c0a000" strokeWidth="1"/>
      {/* white letter peeking */}
      <rect x="9" y="15" width="14" height="8" fill="#ffffff" stroke="#d0c070" strokeWidth="0.5" opacity="0.7"/>
    </svg>
  ),
  github: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* dark background with bevel */}
      <rect x="1" y="1" width="30" height="30" fill="#1e1e1e" stroke="#404040" strokeWidth="1"/>
      <line x1="2" y1="2" x2="30" y2="2" stroke="#303030" strokeWidth="1"/>
      <line x1="2" y1="2" x2="2" y2="30" stroke="#303030" strokeWidth="1"/>
      {/* left bracket */}
      <path d="M8,11 L5,16 L8,21" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* right bracket */}
      <path d="M24,11 L27,16 L24,21" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* forward slash */}
      <line x1="20" y1="9" x2="12" y2="23" stroke="#00ff88" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  skills: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* navy background with bevel */}
      <rect x="1" y="1" width="30" height="30" fill="#000080" stroke="#0000a0" strokeWidth="1"/>
      <line x1="2" y1="2" x2="30" y2="2" stroke="#2020c0" strokeWidth="1"/>
      <line x1="2" y1="2" x2="2" y2="30" stroke="#2020c0" strokeWidth="1"/>
      {/* chart axes */}
      <line x1="4" y1="27" x2="29" y2="27" stroke="#80c0ff" strokeWidth="1"/>
      <line x1="4" y1="4" x2="4" y2="27" stroke="#80c0ff" strokeWidth="1"/>
      {/* bars with 3D top face */}
      <rect x="6" y="22" width="5" height="5" fill="#00cc00" stroke="#008000" strokeWidth="0.5"/>
      <polygon points="6,22 11,22 12,21 7,21" fill="#00ee00"/>
      <rect x="13" y="16" width="5" height="11" fill="#00cc00" stroke="#008000" strokeWidth="0.5"/>
      <polygon points="13,16 18,16 19,15 14,15" fill="#00ee00"/>
      <rect x="20" y="10" width="5" height="17" fill="#00cc00" stroke="#008000" strokeWidth="0.5"/>
      <polygon points="20,10 25,10 26,9 21,9" fill="#00ee00"/>
    </svg>
  ),
  experience: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* briefcase body */}
      <rect x="3" y="12" width="26" height="17" rx="1" fill="#c09050" stroke="#806030" strokeWidth="1"/>
      {/* bevel highlights */}
      <line x1="4" y1="13" x2="28" y2="13" stroke="#e0b870" strokeWidth="1"/>
      <line x1="4" y1="13" x2="4" y2="28" stroke="#e0b870" strokeWidth="1"/>
      {/* shadow edges */}
      <line x1="4" y1="28" x2="28" y2="28" stroke="#806030" strokeWidth="1"/>
      <line x1="28" y1="13" x2="28" y2="28" stroke="#806030" strokeWidth="1"/>
      {/* handle */}
      <path d="M11,12 L11,8 Q11,6 13,6 L19,6 Q21,6 21,8 L21,12" fill="none" stroke="#806030" strokeWidth="2" strokeLinecap="round"/>
      {/* horizontal band */}
      <rect x="3" y="18" width="26" height="3" fill="#b08040"/>
      <line x1="4" y1="19" x2="28" y2="19" stroke="#d0a060" strokeWidth="0.8"/>
      {/* clasp */}
      <rect x="13" y="16" width="6" height="6" rx="1" fill="#e0b870" stroke="#806030" strokeWidth="0.5"/>
      <rect x="14" y="18" width="4" height="2" rx="0.5" fill="#a07030" stroke="#604010" strokeWidth="0.5"/>
    </svg>
  ),
  about: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* navy background with bevel */}
      <rect x="1" y="1" width="30" height="30" fill="#000080" stroke="#0000a0" strokeWidth="1"/>
      <line x1="2" y1="2" x2="30" y2="2" stroke="#2020c0" strokeWidth="1"/>
      <line x1="2" y1="2" x2="2" y2="30" stroke="#2020c0" strokeWidth="1"/>
      {/* head */}
      <circle cx="16" cy="12" r="5.5" fill="#ffcc99" stroke="#c09060" strokeWidth="0.8"/>
      {/* hair */}
      <path d="M10.5,11 Q10,6 16,6 Q22,6 21.5,11" fill="#5a3010" stroke="none"/>
      {/* body / shirt */}
      <path d="M7,31 Q7,22 11,19 Q13,17.5 16,17.5 Q19,17.5 21,19 Q25,22 25,31 Z" fill="#4080ff" stroke="#2060cc" strokeWidth="0.8"/>
      {/* collar V */}
      <path d="M13,19 L16,23 L19,19" fill="none" stroke="#6090ff" strokeWidth="1"/>
    </svg>
  ),
  projects: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* folder back */}
      <rect x="1" y="10" width="30" height="20" fill="#800080" stroke="#500050" strokeWidth="1"/>
      {/* folder tab */}
      <path d="M1,10 L1,6 L13,6 L16,10 Z" fill="#700070" stroke="#500050" strokeWidth="1"/>
      {/* folder front face */}
      <rect x="2" y="11" width="28" height="18" fill="#c030c0" stroke="#a000a0" strokeWidth="0.5"/>
      {/* bevel highlights */}
      <line x1="3" y1="12" x2="29" y2="12" stroke="#e080e0" strokeWidth="1.5"/>
      <line x1="3" y1="12" x2="3" y2="28" stroke="#e080e0" strokeWidth="1"/>
      {/* shadow edges */}
      <line x1="2" y1="28" x2="30" y2="28" stroke="#600060" strokeWidth="1"/>
      <line x1="30" y1="11" x2="30" y2="28" stroke="#600060" strokeWidth="1"/>
      {/* code brackets  inside folder */}
      <path d="M10,16 L8,20 L10,24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22,16 L24,20 L22,24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="19" y1="15" x2="13" y2="25" stroke="#ffff80" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  videos: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="1" y="1" width="30" height="30" fill="#005a9c" stroke="#003f6d" strokeWidth="1"/>
      <line x1="2" y1="2" x2="30" y2="2" stroke="#3b8fc9" strokeWidth="1"/>
      <line x1="2" y1="2" x2="2" y2="30" stroke="#3b8fc9" strokeWidth="1"/>
      <rect x="5" y="8" width="22" height="16" fill="#000" stroke="#001a2d" strokeWidth="1"/>
      <polygon points="13,11 13,21 21,16" fill="#ffffff"/>
      <rect x="7" y="26" width="18" height="2" fill="#7fb3d6" stroke="#003f6d" strokeWidth="0.5"/>
    </svg>
  ),
  welcome: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* monitor outer shell */}
      <rect x="3" y="2" width="26" height="21" rx="1" fill="#d0d0d0" stroke="#808080" strokeWidth="1"/>
      {/* bevel */}
      <line x1="4" y1="3" x2="28" y2="3" stroke="#ffffff" strokeWidth="1"/>
      <line x1="4" y1="3" x2="4" y2="22" stroke="#ffffff" strokeWidth="1"/>
      {/* screen */}
      <rect x="5" y="4" width="22" height="16" fill="#000080"/>
      {/* screen scanline shimmer */}
      <line x1="5" y1="4" x2="27" y2="4" stroke="#4040ff" strokeWidth="0.8"/>
      {/* star / welcome symbol */}
      <polygon points="16,7 17.5,11.5 22,11.5 18.5,14 20,18.5 16,16 12,18.5 13.5,14 10,11.5 14.5,11.5" fill="#ffff00" stroke="#c0c000" strokeWidth="0.5"/>
      {/* monitor neck */}
      <rect x="12" y="23" width="8" height="3" fill="#b8b8b8" stroke="#808080" strokeWidth="0.5"/>
      {/* base */}
      <rect x="8" y="26" width="16" height="2" rx="1" fill="#b8b8b8" stroke="#808080" strokeWidth="0.5"/>
    </svg>
  ),
  settings: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* gray background with bevel */}
      <rect x="1" y="1" width="30" height="30" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
      <line x1="2" y1="2" x2="30" y2="2" stroke="#ffffff" strokeWidth="1"/>
      <line x1="2" y1="2" x2="2" y2="30" stroke="#ffffff" strokeWidth="1"/>
      {/* outer gear ring */}
      <circle cx="16" cy="16" r="10" fill="#909090" stroke="#606060" strokeWidth="1"/>
      {/* gear highlight arc */}
      <path d="M9,10 Q12,7 16,7" fill="none" stroke="#b8b8b8" strokeWidth="1.2"/>
      {/* inner hole */}
      <circle cx="16" cy="16" r="4" fill="#d0d0d0" stroke="#808080" strokeWidth="1"/>
      {/* 8 gear teeth */}
      <rect x="14.5" y="4" width="3" height="4" rx="0.5" fill="#808080"/>
      <rect x="14.5" y="24" width="3" height="4" rx="0.5" fill="#808080"/>
      <rect x="4" y="14.5" width="4" height="3" rx="0.5" fill="#808080"/>
      <rect x="24" y="14.5" width="4" height="3" rx="0.5" fill="#808080"/>
      <rect x="7.5" y="7.5" width="3" height="3" rx="0.5" transform="rotate(45 9 9)" fill="#808080"/>
      <rect x="21.5" y="7.5" width="3" height="3" rx="0.5" transform="rotate(45 23 9)" fill="#808080"/>
      <rect x="7.5" y="21.5" width="3" height="3" rx="0.5" transform="rotate(45 9 23)" fill="#808080"/>
      <rect x="21.5" y="21.5" width="3" height="3" rx="0.5" transform="rotate(45 23 23)" fill="#808080"/>
    </svg>
  ),
  location: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* teal background with bevel */}
      <rect x="1" y="1" width="30" height="30" fill="#008080" stroke="#004040" strokeWidth="1"/>
      <line x1="2" y1="2" x2="30" y2="2" stroke="#00a0a0" strokeWidth="1"/>
      <line x1="2" y1="2" x2="2" y2="30" stroke="#00a0a0" strokeWidth="1"/>
      {/* clock face */}
      <circle cx="16" cy="16" r="11" fill="#ffffff" stroke="#004040" strokeWidth="1.5"/>
      {/* highlight arc */}
      <path d="M9,10 Q12,7 16,7" fill="none" stroke="#e8e8e8" strokeWidth="1"/>
      {/* tick marks */}
      <line x1="16" y1="6" x2="16" y2="8.5" stroke="#404040" strokeWidth="1.5"/>
      <line x1="16" y1="23.5" x2="16" y2="26" stroke="#404040" strokeWidth="1.5"/>
      <line x1="6" y1="16" x2="8.5" y2="16" stroke="#404040" strokeWidth="1.5"/>
      <line x1="23.5" y1="16" x2="26" y2="16" stroke="#404040" strokeWidth="1.5"/>
      {/* hour hand (pointing ~12) */}
      <line x1="16" y1="16" x2="16" y2="9" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
      {/* minute hand (pointing ~3) */}
      <line x1="16" y1="16" x2="23" y2="16" stroke="#c00000" strokeWidth="1.5" strokeLinecap="round"/>
      {/* center dot */}
      <circle cx="16" cy="16" r="1.5" fill="#000000"/>
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
const FULLSCREEN_WINDOW_IDS = new Set(["skills", "experience", "projects", "videos", "contact"]);
const DEFAULT_PINNED_TASKBAR_IDS = ["about", "skills", "experience", "projects", "videos", "contact"];
const canPinItemToTaskbar = (item) => item?.itemType === "app" && !!item.windowId;
const snapIconToGrid = (x, y, mode = "medium", marginX = 12, marginY = 8) => {
  const grid = ICON_VIEW_MODES[mode] || ICON_VIEW_MODES.medium;
  const gx = Math.round((x - marginX) / grid.cellX);
  const gy = Math.round((y - marginY) / grid.cellY);
  return {
    x: marginX + gx * grid.cellX,
    y: marginY + gy * grid.cellY,
  };
};

//  Boot Sequence Component 
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
    { text: "  HDD: 120 MB - OK", delay: 80 },
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
          <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
        </pre>
      </div>
    </div>
  );
}

//  Window Title Bar (no File/Edit/View/Help) 
function TitleBar({ title, isActive, isMaximized, onClose, onMinimize, onMaximize, onPointerDown, onTitleDoubleClick }) {
  const bg = isActive
    ? "linear-gradient(180deg, #1a56c9 0%, #0b3b8f 100%)"
    : "linear-gradient(180deg, #808080 0%, #606060 100%)";
  const controls = [
    { id: "min", glyph: "-", action: onMinimize },
    { id: "max", glyph: isMaximized ? "\u2750" : "\u25A1", action: onMaximize },
    { id: "close", glyph: "\u00D7", action: onClose },
  ];

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
        padding: "5px 5px 5px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        {title}
      </span>
      <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
        {controls.map((btn) => (
          <button
            key={btn.id}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); btn.action(); }}
            style={{
              width: 28,
              height: 22,
              background: "#c0c0c0",
              border: "none",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #404040",
              borderBottom: "1px solid #404040",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111",
              fontSize: btn.id === "min" ? "16px" : "14px",
              lineHeight: 1,
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            <span style={{ transform: btn.id === "min" ? "translateY(-2px)" : "none" }}>
              {btn.glyph}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
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
      onPointerDown={(e) => {
        e.stopPropagation();
        if (!isActive) onFocus();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
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
          isMaximized={win.isMaximized}
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

//  App Contents 

function WelcomeApp({ openWindow }) {
  const startHereItems = [
    { id: "about", title: "About", description: "for a quick overview" },
    { id: "skills", title: "Skills", description: "for technologies and tools" },
    { id: "experience", title: "Experience", description: "for work history" },
    { id: "projects", title: "Projects", description: "for shipped and in-progress work" },
    { id: "videos", title: "Videos", description: "for local demos and walkthroughs" },
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
            onClick={() => openWindow?.(item.id)}
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

function AboutApp({ openWindow }) {
  const TOP_SKILLS = ["JavaScript", "Python", "PostgreSQL", "Next.js"];
  const [ghData, setGhData] = useState(null);
  const [ghHovered, setGhHovered] = useState(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d && !d.error) setGhData(d); })
      .catch(() => {});
  }, []);

  const SOCIALS = [
    { label: "Email", value: "jacobrushinski@gmail.com", href: "mailto:jacobrushinski@gmail.com", icon: "email.png" },
    { label: "Phone", value: "(717) 216-9005", href: "tel:+17172169005", icon: "phone.png" },
    { label: "LinkedIn", value: "linkedin.com/in/jacobrushinski", href: "https://linkedin.com/in/jacobrushinski", icon: "linkedin.png" },
    { label: "GitHub", value: "github.com/rushinski", href: "https://github.com/rushinski", icon: "github.png" },
  ];

  return (
    <div style={{ padding: "16px 24px" }}>

      {/* ── Top: two-column (identity left | bio right) ── */}
      <div style={{ display: "flex", gap: 24, marginBottom: 16, alignItems: "flex-start" }}>

        {/* Left column: avatar, name, socials, skills, buttons */}
        <div style={{ flex: "0 0 270px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 56, height: 56, background: "linear-gradient(135deg, #000080, #0000c0)",
              display: "grid", placeItems: "center", color: "#fff", fontSize: 22, fontWeight: 800,
              flexShrink: 0, border: "2px solid #808080",
            }}>JR</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{PERSONAL.name}</div>
              <div style={{ fontSize: 12, color: "#000080", fontWeight: 600 }}>{PERSONAL.title}</div>
              <div style={{ fontSize: 11, color: "#777" }}>{PERSONAL.location}</div>
            </div>
          </div>

          {/* Socials stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #c0c0c0" }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#000080", fontSize: 11 }}
              >
                <img src={`/socials/${s.icon}`} alt={s.label} width={12} height={12} style={{ imageRendering: "pixelated", objectFit: "contain", flexShrink: 0 }} />
                {s.value}
              </a>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => window.open(PERSONAL.resumeUrl, "_blank")} style={{
              background: "#000080", color: "#fff", border: "none",
              borderTop: "2px solid #3366cc", borderLeft: "2px solid #3366cc",
              borderRight: "2px solid #000040", borderBottom: "2px solid #000040",
              padding: "5px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>View Resume</button>
            <button onClick={() => openWindow?.("contact")} style={{
              background: "#c0c0c0", color: "#111", border: "none",
              borderTop: "2px solid #fff", borderLeft: "2px solid #fff",
              borderRight: "2px solid #404040", borderBottom: "2px solid #404040",
              padding: "5px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>Contact Me</button>
          </div>
        </div>

        {/* Right column: bio */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>About Me</div>
          <div style={{ fontSize: 12, color: "#333", lineHeight: 1.75 }}>
            Hi, I'm Jacob Rushinski!<br /><br />I'm currently attending Thaddeus Stevens College of Technology, graduating with an Associate's in Computer Software Engineering Technology in May 2026. I'm looking for Backend, Full-Stack, or related roles near Philadelphia, PA (≤50mi) or nationwide remote.<br /><br />Right now I'm rebuilding a{" "}
            <button onClick={() => openWindow?.("projects")} style={{
              background: "none", border: "none", padding: 0, color: "#000080",
              fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 12,
              textDecoration: "underline",
            }}>multi-tenant sneaker marketplace</button>
            {" "}from the ground up. I enjoy working on production-grade systems and the level of detail required to build software that is reliable and maintainable. I take pride in writing clean code and designing systems that perform well under real-world usage. If you'd like to connect or learn more about my work, feel free to reach out.
          </div>
        </div>
      </div>

      {/* ── Bottom: GitHub Activity ── */}
      {ghData && (() => {
        const CELL = 10, GAP = 2, STEP = 12;
        const CHART_COLORS = ["#c0c0c0", "#cce8cc", "#7dbf7d", "#3a8a3a", "#1a5c1a"];
        const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const cal = ghData.contributionCalendar || {};
        const allWeeks = cal.weeks || [];
        const total = cal.totalContributions || 0;
        const langs = ghData.topLanguages || [];
        const totalLangCount = langs.reduce((s, l) => s + l.count, 0);
        const getLevel = (n) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4;

        // Month markers for full year
        const monthMarkers = [];
        allWeeks.forEach((week, wi) => {
          if (!week.contributionDays?.length) return;
          const d = new Date(week.contributionDays[0].date + "T12:00:00");
          const m = d.getMonth();
          const prevM = wi > 0 && allWeeks[wi - 1].contributionDays?.length
            ? new Date(allWeeks[wi - 1].contributionDays[0].date + "T12:00:00").getMonth() : -1;
          if (m !== prevM) monthMarkers.push({ wi, label: MONTHS[m] });
        });

        return (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, borderBottom: "2px solid #000080", paddingBottom: 4, marginBottom: 10 }}>
              Coding Stats
            </div>
            <div style={{ overflowX: "auto" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "stretch", width: "max-content" }}>

              {/* Contribution chart — naturally sized to grid width */}
              <div style={{ flexShrink: 0, background: "#f0f4f8", border: "2px inset #c0c0c0", padding: "10px 12px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>
                  {total.toLocaleString()} contributions in the last year
                </div>
                {/* Month labels */}
                <div style={{ position: "relative", marginLeft: 24, height: 14, marginBottom: 3 }}>
                  {monthMarkers.map(({ wi, label }) => (
                    <span key={wi} style={{ position: "absolute", left: wi * STEP, fontSize: 9, color: "#000080", opacity: 0.8 }}>{label}</span>
                  ))}
                </div>
                {/* Grid */}
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: 20, marginRight: 4, flexShrink: 0 }}>
                    {["S","M","T","W","T","F","S"].map((d, i) => (
                      <div key={i} style={{ height: CELL, fontSize: 9, color: i % 2 === 1 ? "#000080" : "transparent", lineHeight: `${CELL}px`, textAlign: "right", opacity: 0.7 }}>{d}</div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: GAP }}>
                    {allWeeks.map((week, wi) => (
                      <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP, flexShrink: 0 }}>
                        {week.contributionDays.map((day, di) => (
                          <div
                            key={di}
                            onMouseEnter={() => setGhHovered(day)}
                            onMouseLeave={() => setGhHovered(null)}
                            style={{ width: CELL, height: CELL, background: CHART_COLORS[getLevel(day.contributionCount)], border: "1px solid rgba(0,0,0,0.08)", cursor: "default", flexShrink: 0 }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tooltip + legend */}
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontSize: 10, color: "#555", minHeight: 13 }}>
                    {ghHovered ? `${ghHovered.date} — ${ghHovered.contributionCount} contribution${ghHovered.contributionCount !== 1 ? "s" : ""}` : "\u00A0"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#777", flexShrink: 0 }}>
                    <span>Less</span>
                    {CHART_COLORS.map((c, i) => (
                      <div key={i} style={{ width: 9, height: 9, background: c, border: "1px solid rgba(0,0,0,0.12)" }} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Repo languages */}
              {langs.length > 0 && (
                <div style={{ flexShrink: 0, background: "#f0f4f8", border: "2px inset #c0c0c0", padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>Repo Languages</div>
                  <div style={{ fontSize: 9, color: "#888", marginBottom: 8 }}>by number of repos</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <DonutChart langs={langs} size={80} />
                    <div>
                      {langs.slice(0, 6).map((l) => (
                        <div key={l.lang} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                          <div style={{ width: 8, height: 8, background: LANG_COLORS[l.lang] || "#999", flexShrink: 0, border: "1px solid rgba(0,0,0,0.15)" }} />
                          <div style={{ fontSize: 10, color: "#333", whiteSpace: "nowrap" }}>{l.lang}</div>
                          <div style={{ fontSize: 10, color: "#777", flexShrink: 0, marginLeft: 4 }}>{Math.round((l.count / totalLangCount) * 100)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Top Skills */}
              <div style={{ flexShrink: 0, background: "#f0f4f8", border: "2px inset #c0c0c0", padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>Top Skills</div>
                <div style={{ fontSize: 9, color: "#888", marginBottom: 8 }}>my strongest technologies</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {TOP_SKILLS.map((s) => {
                    const file = SKILL_ICON_FILES[s];
                    return (
                      <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {file ? (
                          <img src={`/skills/${file}`} alt={s} width={14} height={14} style={{ imageRendering: "pixelated", objectFit: "contain", flexShrink: 0 }} />
                        ) : (
                          <div style={{ width: 14, height: 14, background: "#c0c0c0", display: "grid", placeItems: "center", fontSize: 7, fontWeight: 700, flexShrink: 0 }}>{s.slice(0, 2)}</div>
                        )}
                        <span style={{ fontSize: 11, color: "#333", fontWeight: 600 }}>{s}</span>
                      </div>
                    );
                  })}
                  <button onClick={() => openWindow?.("skills")} style={{
                    background: "transparent", border: "none", padding: 0, fontSize: 10,
                    color: "#000080", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    textDecoration: "underline", textAlign: "left", marginTop: 2,
                  }}>All skills</button>
                </div>
              </div>

            </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

const SKILL_ICON_FILES = {
  TypeScript: "typescript.webp",
  JavaScript: "javascript.webp",
  Python: "python.png",
  Go: "go.png",
  SQL: "sql.png",
  Java: "java.png",
  "C++": "c__.png",
  PHP: "php.png",
  HTML: "html.png",
  CSS: "css.png",
  // Technologies
  "Node.js": "nodejs.png",
  "Next.js": "nextjs.png",
  Flask: "flask.png",
  React: "react.png",
  PostgreSQL: "postgresql.png",
  MySQL: "mysql.png",
  MongoDB: "mongodb.png",
  Redis: "redis.png",
  "Tailwind CSS": "tailwindcss.png",
  // Integrations
  Stripe: "stripe.webp",
  Supabase: "supabase.png",
  "Discord.js": "discord.webp",
  ADBKit: "andriod.png",
  "AWS SES": "awsses.png",
  // Dev Tools
  Docker: "docker.png",
  Git: "git.png",
  GitHub: "github.png",
  "GitHub Actions": "githubactions.png",
  Vercel: "vercel.png",
  "Upstash Redis": "redis.png",
  "GitHub Gist API": "github.png",
};

function SkillCard({ name }) {
  const file = SKILL_ICON_FILES[name];
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: "8px 4px 6px", background: "#d4d0c8",
      border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff",
      cursor: "default",
    }}>
      {file ? (
        <img src={`/skills/${file}`} alt={name} width={28} height={28}
          style={{ imageRendering: "pixelated", objectFit: "contain", width: 28, height: 28 }}
        />
      ) : (
        <div style={{
          width: 28, height: 28, background: "#c0c0c0",
          border: "1px solid", borderColor: "#808080 #ffffff #ffffff #808080",
          display: "grid", placeItems: "center",
          fontSize: 8, fontWeight: 700, color: "#333",
        }}>
          {name.slice(0, 3)}
        </div>
      )}
      <span style={{
        fontSize: 9, color: "#000", textAlign: "center", fontWeight: 600,
        lineHeight: 1.2, maxWidth: 76, overflow: "hidden",
        textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {name}
      </span>
    </div>
  );
}

// --- Step 3: Replace the old SkillsApp function with this ---

function SkillsApp() {
  return (
    <div style={{ padding: "12px 16px", background: "#fff", minHeight: "100%" }}>
      {Object.entries(SKILLS).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 14 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: "#000080",
            textTransform: "uppercase", letterSpacing: 1,
            borderBottom: "1px solid #808080", paddingBottom: 3, marginBottom: 8,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{ flex: 1 }}>{cat}</div>
            <div style={{
              fontSize: 9, background: "#c0c0c0",
              border: "1px solid", borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "0 4px", color: "#444",
            }}>{items.length}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 4 }}>
            {items.map((s) => (
              <SkillCard key={s} name={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceApp() {
  return (
    <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "10px 12px", background: "#fff" }}>
      {EXPERIENCE.map((exp, i) => (
        <div key={i} style={{
          marginBottom: 10, userSelect: "none",
          border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff",
          background: "#d4d0c8",
        }}>
          {/* Header */}
          <div style={{
            background: "#d4d0c8", borderBottom: "1px solid #808080",
            padding: "5px 10px", display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", gap: 8,
          }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exp.company}</div>
              <div style={{ fontSize: 10, color: "#555", fontStyle: "italic", marginTop: 1 }}>{exp.role}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 9, color: "#555" }}>{exp.period}</span>
              <span style={{ padding: "0 5px", fontSize: 9, fontWeight: 700, background: "#c0c0c0", color: "#111", border: "1px solid #808080" }}>{exp.type}</span>
            </div>
          </div>
          {/* Body */}
          <div style={{ padding: "6px 10px 8px" }}>
            <div style={{ fontSize: 11, color: "#444", marginBottom: 6, lineHeight: 1.5, fontStyle: "italic" }}>{exp.desc}</div>
            {exp.bullets.map((b, j) => (
              <div key={j} style={{ fontSize: 11, color: "#222", padding: "1px 0 1px 13px", position: "relative", lineHeight: 1.5 }}>
                <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
                {b}
              </div>
            ))}
            {exp.stack.length > 0 && (
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 7 }}>
                {exp.stack.map((t) => {
                  const iconFile = SKILL_ICON_FILES[t];
                  return (
                    <span key={t} style={{
                      padding: "0 5px", fontSize: 9, background: "#c0c0c0",
                      border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff",
                      display: "inline-flex", alignItems: "center", gap: 2,
                    }}>
                      {iconFile && <img src={`/skills/${iconFile}`} alt={t} width={9} height={9} style={{ imageRendering: "pixelated", objectFit: "contain" }} />}
                      {t}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Video previews + player app ───────────────────────────────────────────
const formatVideoTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

function VideoPreviewCard({ video, onOpen }) {
  return (
    <button
      onClick={() => onOpen?.(video.id)}
      style={{
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        background: "#c0c0c0",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#000",
          paddingTop: "56.25%",
          overflow: "hidden",
          margin: 3,
          border: "2px inset #c0c0c0",
        }}
      >
        <video
          src={video.src}
          poster={video.poster || undefined}
          muted
          preload="metadata"
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      </div>
      <div style={{ margin: "0 4px 2px", fontSize: 10, fontWeight: 700, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {video.label}
      </div>
      <div style={{ margin: "0 4px 4px", fontSize: 9, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {video.src}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "#000080",
          fontWeight: 700,
          padding: "2px 4px",
          borderTop: "1px solid #808080",
          background: "#d4d0c8",
        }}
      >
        Click to open in Videos
      </div>
    </button>
  );
}

function VideosApp({ initialVideoId }) {
  const fallbackVideoId = VIDEO_LIBRARY[0]?.id || null;
  const normalizeVideoId = useCallback(
    (id) => {
      if (id && VIDEO_LIBRARY_BY_ID[id]) return id;
      return fallbackVideoId;
    },
    [fallbackVideoId]
  );
  const [currentVideoId, setCurrentVideoId] = useState(() => normalizeVideoId(initialVideoId));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const nextId = normalizeVideoId(initialVideoId);
    if (nextId && nextId !== currentVideoId) {
      setCurrentVideoId(nextId);
    }
  }, [initialVideoId, normalizeVideoId, currentVideoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted, currentVideoId]);

  useEffect(() => {
    setVideoError("");
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [currentVideoId]);

  const currentIndex = VIDEO_LIBRARY.findIndex((video) => video.id === currentVideoId);
  const currentVideo = currentIndex >= 0 ? VIDEO_LIBRARY[currentIndex] : null;

  const stepToVideo = (delta) => {
    if (!VIDEO_LIBRARY.length) return;
    const baseIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = clamp(baseIndex + delta, 0, VIDEO_LIBRARY.length - 1);
    setCurrentVideoId(VIDEO_LIBRARY[nextIndex].id);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      return;
    }
    video.pause();
  };

  const stopPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const rewindTenSeconds = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const controlBtnStyle = {
    width: 22,
    height: 18,
    padding: 0,
    fontSize: 9,
    background: "#c0c0c0",
    fontFamily: "inherit",
    border: "1px solid",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (!VIDEO_LIBRARY.length) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 20, background: "#fff" }}>
        <div style={{ maxWidth: 420, fontSize: 11, lineHeight: 1.6, color: "#333" }}>
          No local videos configured yet.
          <br />
          Add files to <strong>/public/videos</strong> and map them in <strong>PROJECTS[].links.videos</strong>.
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, padding: "7px 10px 5px", borderBottom: "1px solid #808080" }}>
        Videos
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "220px 1fr", gap: 6, padding: 6 }}>
        <div style={{ border: "2px inset #c0c0c0", background: "#fff", overflowY: "auto", minHeight: 0 }}>
          {VIDEO_LIBRARY.map((video, idx) => {
            const selected = video.id === currentVideoId;
            return (
              <button
                key={video.id}
                onClick={() => setCurrentVideoId(video.id)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: idx < VIDEO_LIBRARY.length - 1 ? "1px solid #e4e4e4" : "none",
                  background: selected ? "#000080" : "transparent",
                  color: selected ? "#fff" : "#111",
                  textAlign: "left",
                  padding: "7px 8px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{video.label}</div>
                <div style={{ fontSize: 9, opacity: selected ? 0.9 : 0.75, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{video.projectTitle}</div>
              </button>
            );
          })}
        </div>

        <div style={{ border: "2px inset #c0c0c0", background: "#d4d0c8", minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(to right, #000080, #1084d0)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Windows Media Player - {currentVideo?.label || "No Video Selected"}
          </div>

          <div style={{ flex: 1, background: "#000", margin: 3, position: "relative", minHeight: 0 }}>
            {currentVideo ? (
              <video
                key={currentVideo.id}
                ref={videoRef}
                src={currentVideo.src}
                poster={currentVideo.poster || undefined}
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onLoadedMetadata={(e) => {
                  const mediaDuration = Number.isFinite(e.currentTarget.duration) ? e.currentTarget.duration : 0;
                  setDuration(mediaDuration);
                }}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setVideoError(`Unable to load file: ${currentVideo.src}`)}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#b0b0b0", fontSize: 11 }}>
                Select a video
              </div>
            )}
          </div>

          <div style={{ padding: "4px 6px 6px" }}>
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 1}
              step={0.1}
              value={Math.min(currentTime, duration || 1)}
              onChange={(e) => {
                const next = Number(e.target.value);
                const video = videoRef.current;
                if (!video) return;
                video.currentTime = next;
                setCurrentTime(next);
              }}
              style={{ width: "100%", marginBottom: 4 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button onClick={() => stepToVideo(-1)} style={controlBtnStyle} title="Previous clip">⏮</button>
              <button onClick={rewindTenSeconds} style={controlBtnStyle} title="Rewind 10 seconds">⏪</button>
              <button onClick={togglePlayPause} style={controlBtnStyle} title={isPlaying ? "Pause" : "Play"}>{isPlaying ? "⏸" : "▶"}</button>
              <button onClick={stopPlayback} style={controlBtnStyle} title="Stop">⏹</button>
              <button onClick={() => stepToVideo(1)} style={controlBtnStyle} title="Next clip">⏭</button>
              <span style={{ marginLeft: 6, fontSize: 10, color: "#222", minWidth: 80 }}>
                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
              </span>
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                style={{ ...controlBtnStyle, marginLeft: "auto", width: 24 }}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                style={{ width: 90 }}
              />
            </div>
            <div style={{ fontSize: 9, color: videoError ? "#8b0000" : "#1f4a1f", marginTop: 3, minHeight: 12 }}>
              {videoError || (currentVideo ? `Ready: ${currentVideo.projectTitle}` : "Ready")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Project detail "page" (shown when navigating into a project) ──────────
function ProjectDetailView({ project: p, repoData, onOpenVideo, onBackToList }) {
  const ghRepo = p.links?.github ? repoData[p.links.github] : null;
  const isIP = p.status === "IN_PROGRESS";
  const hasProjectLinks = !!(p.links?.github || p.links?.live || p.links?.landing);
  const hasVideoPreviews = (p.links?.videos?.length || 0) > 0;
  const hasReflection = !!(p.highlight || p.differently || p.outcome);

  const secLabel = {
    fontSize: 10, fontWeight: 700, color: "#000080",
    textTransform: "uppercase", letterSpacing: 1,
    borderBottom: "1px solid #808080", paddingBottom: 3,
    marginBottom: 7, marginTop: 12,
  };

  const bullet = (text, key) => (
    <div key={key} style={{ fontSize: 11, color: "#222", padding: "1px 0 2px 13px", position: "relative", lineHeight: 1.6 }}>
      <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
      {text}
    </div>
  );

  const archBullet = (text, key) => {
    const ci = text.indexOf(": ");
    const hasPrefix = ci > 0 && ci < 55;
    return (
      <div key={key} style={{ fontSize: 11, color: "#222", padding: "1px 0 3px 13px", position: "relative", lineHeight: 1.6 }}>
        <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
        {hasPrefix
          ? <><strong style={{ color: "#111" }}>{text.slice(0, ci)}:</strong>{" "}{text.slice(ci + 2)}</>
          : text}
      </div>
    );
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "10px 12px 14px", background: "#fff" }}>
      {onBackToList && (
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={onBackToList}
            style={{
              padding: "2px 10px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit",
              border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer",
            }}
          >
            ◄ Back to Projects
          </button>
        </div>
      )}

      <div style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#d4d0c8" }}>

        {/* Header */}
        <div style={{ background: "#d4d0c8", borderBottom: "1px solid #808080", padding: "7px 10px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#111", lineHeight: 1.2, flex: 1, minWidth: 0 }}>{p.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 9, color: "#555" }}>{p.date}</span>
              <span style={{ padding: "1px 6px", fontSize: 9, fontWeight: 700, background: isIP ? "#ffff00" : "#00cc44", color: "#000", border: "1px solid #808080" }}>
                {isIP ? "In Progress" : "Complete"}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.4, fontStyle: "italic" }}>{p.desc}</div>
        </div>

        {/* Body */}
        <div style={{ padding: "4px 10px 12px" }}>

          {/* IMPACT — first thing a recruiter sees */}
          {p.impact?.length > 0 && (
            <>
              <div style={{ ...secLabel, marginTop: 8 }}>Impact</div>
              {p.impact.map((item, j) => bullet(item, `impact-${j}`))}
            </>
          )}

          {/* Stack */}
          <div style={secLabel}>Stack</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {p.stack.map((t) => {
              const iconFile = SKILL_ICON_FILES[t];
              return (
                <span key={t} style={{
                  padding: "1px 6px", fontSize: 10, background: "#c0c0c0",
                  border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff",
                  display: "inline-flex", alignItems: "center", gap: 3,
                }}>
                  {iconFile && <img src={`/skills/${iconFile}`} alt={t} width={11} height={11} style={{ imageRendering: "pixelated", objectFit: "contain" }} />}
                  {t}
                </span>
              );
            })}
          </div>

          {/* Links */}
          {hasProjectLinks && (
            <>
              <div style={secLabel}>Links</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {p.links?.github && (
                  <button onClick={() => window.open(p.links.github, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <img src="/skills/github.png" alt="github" width={11} height={11} style={{ imageRendering: "pixelated", objectFit: "contain" }} />
                    {ghRepo?.name || p.links.github.split("/").pop()}
                  </button>
                )}
                {p.links?.live && (
                  <button onClick={() => window.open(p.links.live, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    🌐 Live Site
                  </button>
                )}
                {p.links?.landing && (
                  <button onClick={() => window.open(p.links.landing, "_blank", "noopener,noreferrer")} style={{ padding: "3px 8px", fontSize: 10, background: "#c0c0c0", fontFamily: "inherit", border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    📄 Landing Page
                  </button>
                )}
              </div>
            </>
          )}

          {/* Media */}
          {hasVideoPreviews && (
            <>
              <div style={secLabel}>Media</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {p.links.videos.map((video, idx) => {
                  const vd = VIDEO_LIBRARY_BY_ID[video.id] || { ...video, id: video.id || `preview-${idx}`, projectTitle: p.title };
                  return (
                    <button key={vd.id} onClick={() => onOpenVideo?.(vd.id)} style={{ border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", background: "#c0c0c0", padding: 0, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "stretch" }}>
                      <div style={{ width: 96, flexShrink: 0, background: "#000", margin: 3, border: "1px solid #606060", overflow: "hidden" }}>
                        <video src={vd.src} muted preload="metadata" playsInline style={{ width: "100%", height: 54, objectFit: "cover", display: "block", pointerEvents: "none" }} />
                      </div>
                      <div style={{ flex: 1, padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>{vd.label}</div>
                        <div style={{ fontSize: 9, color: "#000080", fontWeight: 700 }}>▶ Open in Videos</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* How I Built It */}
          {p.architecture?.length > 0 && (
            <>
              <div style={secLabel}>How I Built It</div>
              {p.architecture.map((item, j) => archBullet(item, `arch-${j}`))}
            </>
          )}

          {/* Reflection — condensed to bullets, no sub-headers */}
          {hasReflection && (
            <>
              <div style={secLabel}>Reflection</div>
              {p.highlight && bullet(p.highlight, "hl")}
              {p.differently && bullet(`Would do differently: ${p.differently}`, "diff")}
              {p.outcome && bullet(p.outcome, "out")}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

function ProjectsApp({ onOpenVideo }) {
  const [navigation, setNavigation] = useState({
    current: { type: "list" },
    backStack: [],
    forwardStack: [],
  });
  const [selected, setSelected] = useState(null);
  const [repoData, setRepoData] = useState({});

  const currentView = navigation.current || { type: "list" };
  const currentProject = currentView.type === "detail" ? PROJECTS[currentView.projectIdx] : null;

  const navigate = useCallback((view) => {
    setNavigation((prev) => {
      const isSameView = prev.current?.type === view.type
        && prev.current?.projectIdx === view.projectIdx;
      if (isSameView) return prev;
      return {
        current: view,
        backStack: [...prev.backStack, prev.current],
        forwardStack: [],
      };
    });
  }, []);

  const openProjectDetail = useCallback((projectIdx) => {
    if (projectIdx == null || projectIdx < 0 || projectIdx >= PROJECTS.length) return;
    navigate({ type: "detail", projectIdx });
  }, [navigate]);

  useEffect(() => {
    PROJECTS.forEach((p) => {
      if (!p.links?.github) return;
      const m = p.links.github.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!m) return;
      fetch(`https://api.github.com/repos/${m[1]}/${m[2]}`)
        .then((r) => r.ok ? r.json() : null)
        .then((d) => { if (d) setRepoData((prev) => ({ ...prev, [p.links.github]: d })); })
        .catch(() => {});
    });
  }, []);

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      background: "#fff", fontFamily: "inherit", overflow: "hidden",
    }}>
      {/* ── Content area ── */}
      {currentView.type === "list" ? (
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "10px 12px", background: "#fff" }}>
          {PROJECTS.map((proj, i) => {
            const isIP = proj.status === "IN_PROGRESS";
            return (
              <div
                key={i}
                onClick={() => openProjectDetail(i)}
                style={{
                  marginBottom: 10, cursor: "pointer", userSelect: "none",
                  border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff",
                  background: "#d4d0c8",
                }}
              >
                {/* Card header */}
                <div style={{
                  background: "#d4d0c8",
                  borderBottom: "1px solid #808080",
                  padding: "5px 10px", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 8,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#111", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {proj.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: "#555" }}>{proj.date}</span>
                    <span style={{ padding: "0 5px", fontSize: 9, fontWeight: 700, background: isIP ? "#ffff00" : "#00cc44", color: "#000", border: "1px solid #808080" }}>
                      {isIP ? "In Progress" : "Complete"}
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div style={{ padding: "6px 10px 8px" }}>
                  <div style={{ fontSize: 11, color: "#444", marginBottom: 6, lineHeight: 1.5, fontStyle: "italic" }}>{proj.desc}</div>
                  {proj.impact.slice(0, 2).map((item, j) => (
                    <div key={j} style={{ fontSize: 11, color: "#222", padding: "1px 0 1px 13px", position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#000080", fontWeight: 700 }}>›</span>
                      {item}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, gap: 8, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {proj.stack.slice(0, 5).map((t) => {
                        const iconFile = SKILL_ICON_FILES[t];
                        return (
                          <span key={t} style={{ padding: "0 5px", fontSize: 9, background: "#c0c0c0", border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff", display: "inline-flex", alignItems: "center", gap: 2 }}>
                            {iconFile && <img src={`/skills/${iconFile}`} alt={t} width={9} height={9} style={{ imageRendering: "pixelated", objectFit: "contain" }} />}
                            {t}
                          </span>
                        );
                      })}
                    </div>
                    <span style={{ fontSize: 9, color: "#000080", fontWeight: 700, flexShrink: 0 }}>click to open →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Detail page ── */
        currentProject ? (
          <ProjectDetailView
            project={currentProject}
            repoData={repoData}
            onOpenVideo={onOpenVideo}
            onBackToList={() => navigate({ type: "list" })}
          />
        ) : (
          <div style={{ padding: "16px 20px", fontSize: 11, color: "#666" }}>
            Unable to load project details.
          </div>
        )
      )}
    </div>
  );
}

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Go: "#00ADD8", Java: "#b07219", PHP: "#4F5D95",
  "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c",
  Shell: "#89e051", Dockerfile: "#384d54", "Node.js": "#68a063",
};

function DonutChart({ langs, size = 84 }) {
  if (!langs?.length) return null;
  const totalCount = langs.reduce((s, l) => s + l.count, 0);
  if (totalCount === 0) return null;

  const cx = size / 2, cy = size / 2;
  const R = size / 2 - 2;
  const ri = R * 0.52;
  let a = -Math.PI / 2;

  const paths = langs.map((l) => {
    const sweep = Math.min((l.count / totalCount) * 2 * Math.PI, 2 * Math.PI * 0.9999);
    const start = a;
    const end = a + sweep;
    a += (l.count / totalCount) * 2 * Math.PI;
    const cos = Math.cos, sin = Math.sin;
    const large = sweep > Math.PI ? 1 : 0;
    const fmt = (n) => n.toFixed(2);
    return {
      d: `M ${fmt(cx + R * cos(start))} ${fmt(cy + R * sin(start))} A ${R} ${R} 0 ${large} 1 ${fmt(cx + R * cos(end))} ${fmt(cy + R * sin(end))} L ${fmt(cx + ri * cos(end))} ${fmt(cy + ri * sin(end))} A ${ri} ${ri} 0 ${large} 0 ${fmt(cx + ri * cos(start))} ${fmt(cy + ri * sin(start))} Z`,
      color: LANG_COLORS[l.lang] || "#999",
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", flexShrink: 0 }}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} stroke="#f0f4f8" strokeWidth={1} />
      ))}
    </svg>
  );
}


function ContactApp() {
  const contacts = [
    { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, icon: "/socials/email.png" },
    { label: "GitHub", value: PERSONAL.github.replace("https://", ""), href: PERSONAL.github, icon: "/socials/github.png" },
    { label: "LinkedIn", value: PERSONAL.linkedin.replace("https://", ""), href: PERSONAL.linkedin, icon: "/socials/linkedin.png" },
    { label: "Phone", value: PERSONAL.phone || "(717) 216-9005", href: `tel:+17172169005`, icon: "/socials/phone.png" },
    { label: "Location", value: PERSONAL.location, href: null, icon: null },
  ];
  return (
    <div style={{ padding: "12px 16px", background: "#fff", minHeight: "100%" }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: "#000080",
        textTransform: "uppercase", letterSpacing: 1,
        borderBottom: "1px solid #808080", paddingBottom: 3, marginBottom: 10,
      }}>
        Contact Information
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {contacts.map((c) => (
          <div key={c.label} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "5px 8px",
            background: "#d4d0c8",
            border: "1px solid", borderColor: "#ffffff #808080 #808080 #ffffff",
          }}>
            <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {c.icon
                ? <img src={c.icon} alt={c.label} width={16} height={16} style={{ imageRendering: "pixelated", objectFit: "contain" }} />
                : <span style={{ fontSize: 11 }}>📍</span>
              }
            </div>
            <div style={{ minWidth: 52, fontSize: 10, fontWeight: 700, color: "#444", flexShrink: 0 }}>{c.label}</div>
            <div style={{
              flex: 1, padding: "1px 5px", fontSize: 10, background: "#fff",
              border: "1px solid", borderColor: "#808080 #dfdfdf #dfdfdf #808080",
            }}>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("mailto") || c.href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ color: "#000080", textDecoration: "none" }}
                >{c.value}</a>
              ) : (
                <span style={{ color: "#333" }}>{c.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 10, color: "#666", fontStyle: "italic" }}>
        Open to backend, full-stack, or related roles — Philadelphia area or nationwide remote.
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
    help: () => "Available commands: help, whoami, skills, contact, projects, experience, clear, neofetch, echo [text], date, uptime, cat resume",
    whoami: () => `${PERSONAL.name} - ${PERSONAL.title}\n${PERSONAL.location}`,
    skills: () => Object.entries(SKILLS).map(([cat, items]) => `${cat}: ${items.join(", ")}`).join("\n"),
    contact: () => `Email: ${PERSONAL.email}\nGitHub: ${PERSONAL.github}\nLinkedIn: ${PERSONAL.linkedin}`,
    projects: () => PROJECTS.map((p) => `${p.status === "IN_PROGRESS" ? "[WIP]" : "[OK]"} ${p.title} - ${p.date}`).join("\n"),
    clear: () => "__CLEAR__",
    date: () => new Date().toString(),
    uptime: () => `System uptime: ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    neofetch: () => `   .--------.
   | JacobOS |    ${PERSONAL.name}
   |  v1.0   |    --------------
   '--------'    OS: JacobOS 1.0
                 Shell: jsh 0.1
                 Resolution: 640x480
                 CPU: Intel 80486DX
                 Memory: 4096 KB
                 Uptime: way too long`,
    "cat resume": () => `${PERSONAL.name}\n${PERSONAL.title}\n${PERSONAL.school}\nGPA: ${PERSONAL.gpa} | Graduating: ${PERSONAL.gradDate}\n\nRun "skills", "projects", or "experience" for more details.`,
  };

  const formatProjectsDetails = () => PROJECTS.map((p, idx) => [
    `${idx + 1}. ${p.title} (${p.date}) ${p.status === "IN_PROGRESS" ? "[WIP]" : "[COMPLETE]"}`,
    `   ${p.desc}`,
    ...p.impact.map((line) => `   - ${line}`),
  ].join("\n")).join("\n\n");

  const formatExperienceDetails = () => EXPERIENCE.map((exp, idx) => [
    `${idx + 1}. ${exp.role} @ ${exp.company} (${exp.period})`,
    `   ${exp.type}`,
    `   ${exp.desc}`,
    ...exp.bullets.map((line) => `   - ${line}`),
  ].join("\n")).join("\n\n");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "input", text: `> ${input}` }];

    if (cmd === "") {
      setHistory(newHistory);
    } else if (cmd.startsWith("echo ")) {
      setHistory([...newHistory, { type: "output", text: input.slice(5) }]);
    } else if (cmd === "projects") {
      setHistory([...newHistory, { type: "output", text: formatProjectsDetails() }]);
    } else if (cmd === "experience") {
      setHistory([...newHistory, { type: "output", text: formatExperienceDetails() }]);
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
function TrashApp({ items, onRestoreItem, onDeleteItem, onEmpty }) {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Recycle Bin</div>
          <div style={{ fontSize: 12, color: "#555" }}>{items.length} item{items.length === 1 ? "" : "s"}</div>
        </div>
        <button
          onClick={onEmpty}
          disabled={items.length === 0}
          style={{
            background: "#c0c0c0",
            border: "none",
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
            borderRight: "2px solid #404040",
            borderBottom: "2px solid #404040",
            padding: "4px 10px",
            fontSize: 11,
            cursor: items.length === 0 ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: items.length === 0 ? 0.55 : 1,
          }}
        >
          Empty Bin
        </button>
      </div>

      <div style={{ border: "2px inset #c0c0c0", background: "#fff", flex: 1, minHeight: 180, overflow: "auto", padding: 8 }}>
        {items.length === 0 ? (
          <div style={{ fontSize: 12, color: "#666" }}>Recycle Bin is empty.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {items.map((entry) => (
              <div
                key={entry.item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 12,
                  color: "#222",
                  border: "1px solid #d0d0d0",
                  background: "#f7f7f7",
                  padding: "6px 8px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 600 }}>
                    {entry.item.title}
                  </div>
                  <div style={{ color: "#666", fontSize: 10 }}>
                    Deleted {new Date(entry.deletedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button onClick={() => onRestoreItem?.(entry.item.id)} style={{ fontSize: 10, padding: "2px 6px" }}>Restore</button>
                  <button onClick={() => onDeleteItem?.(entry.item.id)} style={{ fontSize: 10, padding: "2px 6px" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const DESKTOP_COLORS = [
  { label: "Default",     value: null,      preview: "linear-gradient(180deg, #0b4aa6, #0a3f90)" },
  { label: "Teal",        value: "#008080",  preview: "#008080" },
  { label: "Navy",        value: "#000080",  preview: "#000080" },
  { label: "Forest",      value: "#1a5c1a",  preview: "#1a5c1a" },
  { label: "Maroon",      value: "#800000",  preview: "#800000" },
  { label: "Purple",      value: "#4b0082",  preview: "#4b0082" },
  { label: "Dark Gray",   value: "#404040",  preview: "#404040" },
  { label: "Black",       value: "#000000",  preview: "#000000" },
];

function SettingsApp({ iconSizeMode, setIconSizeMode, clockFormat, setClockFormat, desktopColor, setDesktopColor }) {
  const [activeTab, setActiveTab] = useState("display");

  const tabBtn = (id, label) => {
    const isActive = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        style={{
          fontFamily: "inherit", fontSize: 11, cursor: "pointer",
          padding: "3px 10px 4px",
          background: isActive ? "#c0c0c0" : "#b0b0b0",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #404040",
          borderBottom: isActive ? "2px solid #c0c0c0" : "2px solid #404040",
          marginRight: 2,
          position: "relative",
          zIndex: isActive ? 2 : 1,
          fontWeight: isActive ? 700 : 400,
          color: "#111",
        }}
      >{label}</button>
    );
  };

  const win95Btn = (label, active, onClick) => (
    <button onClick={onClick} style={{
      fontFamily: "inherit", fontSize: 11, cursor: "pointer", padding: "3px 12px",
      background: "#c0c0c0",
      borderTop: active ? "1px solid #404040" : "2px solid #fff",
      borderLeft: active ? "1px solid #404040" : "2px solid #fff",
      borderRight: active ? "1px solid #fff" : "2px solid #404040",
      borderBottom: active ? "1px solid #fff" : "2px solid #404040",
      fontWeight: active ? 700 : 400, color: "#111",
    }}>{label}</button>
  );

  const secLabel = { fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #808080", paddingBottom: 3, marginBottom: 8, marginTop: 10 };

  return (
    <div style={{ padding: "12px 14px 0", background: "#fff", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", alignItems: "flex-end", borderBottom: "2px solid #404040", marginBottom: 0 }}>
        {tabBtn("display", "Display")}
        {tabBtn("clock", "Clock")}
        {tabBtn("about", "About")}
      </div>

      {/* Tab panel */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, border: "2px solid", borderTop: "none", borderColor: "#404040 #fff #fff #404040", padding: "10px 12px 14px", background: "#fff" }}>

        {activeTab === "display" && (
          <>
            <div style={secLabel}>Desktop Icon Size</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              {["small", "medium", "large"].map((size) =>
                win95Btn(size.charAt(0).toUpperCase() + size.slice(1), iconSizeMode === size, () => setIconSizeMode(size))
              )}
            </div>

            <div style={secLabel}>Desktop Background</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {DESKTOP_COLORS.map(({ label, value, preview }) => {
                const isSelected = desktopColor === value;
                return (
                  <div
                    key={label}
                    onClick={() => setDesktopColor(value)}
                    title={label}
                    style={{
                      cursor: "pointer",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    }}
                  >
                    <div style={{
                      width: 28, height: 20,
                      background: preview,
                      border: isSelected ? "2px solid #000080" : "1px solid #808080",
                      outline: isSelected ? "1px solid #fff" : "none",
                      outlineOffset: -3,
                    }} />
                    <span style={{ fontSize: 9, color: "#333", whiteSpace: "nowrap" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "clock" && (
          <>
            <div style={secLabel}>Time Format</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["12h", "12-hour (AM/PM)"], ["24h", "24-hour"]].map(([val, lbl]) => (
                <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 11, color: "#111" }}>
                  <div
                    onClick={() => setClockFormat(val)}
                    style={{
                      width: 13, height: 13, borderRadius: "50%",
                      border: "2px solid #808080",
                      borderTop: "2px solid #404040", borderLeft: "2px solid #404040",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#fff", cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    {clockFormat === val && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#000080" }} />}
                  </div>
                  <span onClick={() => setClockFormat(val)}>{lbl}</span>
                </label>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "6px 10px", border: "2px inset #c0c0c0", background: "#fff", fontSize: 11, color: "#111" }}>
              Preview: <strong>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: clockFormat === "12h" })}</strong>
            </div>
          </>
        )}

        {activeTab === "about" && (
          <>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 4 }}>
              <div style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>🖥</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 2 }}>JacobOS 98</div>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>Build 2026.03 · Portfolio Edition</div>
                <div style={{ fontSize: 11, color: "#222", lineHeight: 1.7 }}>
                  <div>Frontend: <strong>Next.js 15 · React 18</strong></div>
                  <div>Backend: <strong>Go 1.23 · PostgreSQL</strong></div>
                  <div>Infra: <strong>Digital Ocean · Upstash Redis</strong></div>
                  <div>Processor: <strong>Human Brain @ variable GHz</strong></div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: "6px 10px", border: "2px inset #c0c0c0", background: "#fff", fontSize: 10, color: "#555", lineHeight: 1.6 }}>
              This product is licensed to: <strong>Jacob Rushinski</strong><br />
              Full-stack engineer · Est. 2024<br />
              &copy; 2026 JacobOS Corp. All rights reserved.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function LocationApp() {
  const now = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  const dateText = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeText = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Jacobs Time</div>
      <div style={{ fontSize: 12, color: "#555" }}>Current system date and time.</div>
      <div style={{ border: "2px inset #c0c0c0", background: "#f6f8ff", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, color: "#333" }}><strong>Date:</strong> {dateText}</div>
        <div style={{ fontSize: 12, color: "#333" }}><strong>Time:</strong> {timeText}</div>
        <div style={{ fontSize: 12, color: "#333" }}><strong>Timezone:</strong> {timezone}</div>
      </div>
    </div>
  );
}
function ExplorerApp({ items, onOpenItem, onAction }) {
  const [navStack, setNavStack] = useState([]);
  const [fwdStack, setFwdStack] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null); // null = Desktop root
  const [selectedId, setSelectedId] = useState(null);

  const folders = items.filter((i) => i.itemType === "folder");

  const currentItems = currentFolderId === null
    ? items
    : items.filter((i) => i.parentId === currentFolderId);

  const currentFolderTitle = currentFolderId === null
    ? "Desktop"
    : (items.find((i) => i.id === currentFolderId)?.title || "Folder");

  const navigateTo = (folderId) => {
    setNavStack((prev) => [...prev, currentFolderId]);
    setFwdStack([]);
    setCurrentFolderId(folderId);
    setSelectedId(null);
  };

  const goBack = () => {
    if (navStack.length === 0) return;
    const prev = navStack[navStack.length - 1];
    setFwdStack((f) => [...f, currentFolderId]);
    setNavStack((n) => n.slice(0, -1));
    setCurrentFolderId(prev);
    setSelectedId(null);
  };

  const goForward = () => {
    if (fwdStack.length === 0) return;
    const next = fwdStack[fwdStack.length - 1];
    setNavStack((n) => [...n, currentFolderId]);
    setFwdStack((f) => f.slice(0, -1));
    setCurrentFolderId(next);
    setSelectedId(null);
  };

  const goUp = () => {
    if (currentFolderId === null) return;
    navigateTo(null);
  };

  const handleItemDoubleClick = (item) => {
    if (item.itemType === "folder") {
      navigateTo(item.id);
    } else {
      onOpenItem?.(item);
    }
  };

  const navBtn = (label, disabled, onClick) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "inherit", fontSize: 11, cursor: disabled ? "default" : "pointer",
        padding: "1px 7px", background: "#c0c0c0",
        borderTop: "2px solid #fff", borderLeft: "2px solid #fff",
        borderRight: "2px solid #404040", borderBottom: "2px solid #404040",
        color: disabled ? "#808080" : "#111", minWidth: 24,
      }}
    >{label}</button>
  );

  const itemIcon = (item) => {
    if (item.itemType === "folder") return "📁";
    if (item.itemType === "text") return "📄";
    return "🖥";
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "inherit", overflow: "hidden" }}>

      {/* Toolbar */}
      <div style={{ padding: "4px 6px", borderBottom: "1px solid #808080", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
        {navBtn("◄", navStack.length === 0, goBack)}
        {navBtn("►", fwdStack.length === 0, goForward)}
        {navBtn("▲", currentFolderId === null, goUp)}
        {/* Address bar */}
        <div style={{
          flex: 1, marginLeft: 4, padding: "1px 6px",
          border: "2px inset #c0c0c0", background: "#fff",
          fontSize: 11, color: "#111", lineHeight: "18px", height: 20,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          <span style={{ color: "#808080" }}>Desktop</span>
          {currentFolderId !== null && (
            <span> › <span style={{ color: "#111" }}>{currentFolderTitle}</span></span>
          )}
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* Left pane — folder tree */}
        <div style={{ width: 130, flexShrink: 0, borderRight: "1px solid #808080", overflowY: "auto", background: "#d4d0c8", padding: "4px 0" }}>
          <div
            onClick={() => navigateTo(null)}
            style={{
              padding: "2px 8px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              background: currentFolderId === null ? "#000080" : "transparent",
              color: currentFolderId === null ? "#fff" : "#111",
            }}
          >
            <span>🖥</span> Desktop
          </div>
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => navigateTo(folder.id)}
              style={{
                padding: "2px 8px 2px 20px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                background: currentFolderId === folder.id ? "#000080" : "transparent",
                color: currentFolderId === folder.id ? "#fff" : "#111",
              }}
            >
              <span>📁</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{folder.title}</span>
            </div>
          ))}
        </div>

        {/* Right pane — file list */}
        <div style={{ flex: 1, overflowY: "auto", background: "#fff", minWidth: 0 }}>
          {currentItems.length === 0 ? (
            <div style={{ padding: "16px", fontSize: 11, color: "#808080" }}>This folder is empty.</div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "2px 8px",
                  background: selectedId === item.id ? "#000080" : "transparent",
                  color: selectedId === item.id ? "#fff" : "#111",
                  fontSize: 11, cursor: "default", userSelect: "none",
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }}>{itemIcon(item)}</span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                <span style={{ fontSize: 9, color: selectedId === item.id ? "rgba(255,255,255,0.7)" : "#808080", flexShrink: 0 }}>
                  {item.itemType === "folder" ? "Folder" : item.itemType === "text" ? "Text Document" : "Application"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ padding: "2px 8px", borderTop: "1px solid #808080", fontSize: 10, color: "#555", flexShrink: 0, background: "#fff" }}>
        {currentItems.length} object{currentItems.length !== 1 ? "s" : ""}
        {selectedId && (() => { const sel = items.find((i) => i.id === selectedId); return sel ? ` · ${sel.title} selected` : ""; })()}
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
// Desktop Icon 
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
  isCutPending = false,
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
  const labelMaxWidth = Math.max(28, Math.min(view.maxLabel, view.tileW - 6));

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
        opacity: isCutPending ? 0.5 : 1,
        filter: isCutPending ? "grayscale(0.45) blur(0.6px) brightness(0.85)" : "none",
        transition: "opacity 120ms linear, filter 120ms linear",
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
            width: 12,
            height: 12,
            border: "none",
            borderTop: "1px solid #ffffff",
            borderLeft: "1px solid #ffffff",
            borderRight: "1px solid #3a3a3a",
            borderBottom: "1px solid #3a3a3a",
            background: selected ? "#c0c0c0" : "#e7e7e7",
            color: "#000080",
            fontSize: 9,
            lineHeight: "11px",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {selected ? "\u2713" : ""}
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
            display: "inline-block",
            width: "auto",
            maxWidth: labelMaxWidth,
            boxSizing: "border-box",
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
            display: "inline-block",
            width: "auto",
            maxWidth: labelMaxWidth,
            boxSizing: "border-box",
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
      { label: "Open About", action: () => openWindow("about") },
      { label: "Open Skills", action: () => openWindow("skills") },
      { label: "Open Experience", action: () => openWindow("experience") },
      { label: "Open Projects", action: () => openWindow("projects") },
      { label: "Open Videos", action: () => openWindow("videos") },
      { label: "Open Contact", action: () => openWindow("contact") },
      { label: "Open Jacobs Time", action: () => openWindow("location") },
      { label: "Open Terminal", action: () => openWindow("terminal") },
      { label: "Open File Explorer", action: () => openWindow("explorer") },
      { label: "Open Settings", action: () => openWindow("settings") },
      { label: "---------------", action: null },
      { label: "New Folder", action: createFolder },
      { label: "New Text Document", action: createTextDocument },
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
  const [selectedIconIds, setSelectedIconIds] = useState([]);
  const topZRef = useRef(100);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [desktopSelectionBox, setDesktopSelectionBox] = useState(null);
  const selectionBoxRef = useRef(null);
  const [marqueePreviewIds, setMarqueePreviewIds] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const [clockFormat, setClockFormat] = useState("12h");
  const [desktopColor, setDesktopColor] = useState(null);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const date = now.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "2-digit" });
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: clockFormat === "12h" });
      setClock(`${date} ${time}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [clockFormat]);

  //  Icons state 
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
  const [recycleBinItems, setRecycleBinItems] = useState([]);
  const [activeTextDocId, setActiveTextDocId] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(VIDEO_LIBRARY[0]?.id || null);
  const [renamingItem, setRenamingItem] = useState(null);
  const [pinnedTaskbarAppIds, setPinnedTaskbarAppIds] = useState(DEFAULT_PINNED_TASKBAR_IDS);
  const [taskbarMenu, setTaskbarMenu] = useState(null);
  const lastDesktopCursorRef = useRef(null);

  const [iconPositions, setIconPositions] = useState({
    welcome: { x: 12, y: 8 },
    about: { x: 12, y: 104 },
    skills: { x: 12, y: 200 },
    experience: { x: 12, y: 296 },
    projects: { x: 12, y: 392 },
    videos: { x: 112, y: 296 },
    github: { x: 12, y: 488 },
    contact: { x: 12, y: 584 },
    terminal: { x: 12, y: 680 },
    trash: { x: 112, y: 680 },
    explorer: { x: 112, y: 8 },
    settings: { x: 112, y: 104 },
    location: { x: 112, y: 200 },
  });

  const systemDesktopIcons = [
    { id: "welcome", title: "Welcome", glyph: Icons.welcome, windowId: "welcome", itemType: "app", system: true },
    { id: "about", title: "About", glyph: Icons.about, windowId: "about", itemType: "app", system: true },
    { id: "skills", title: "Skills", glyph: Icons.skills, windowId: "skills", itemType: "app", system: true },
    { id: "experience", title: "Experience", glyph: Icons.experience, windowId: "experience", itemType: "app", system: true },
    { id: "projects", title: "Projects", glyph: Icons.projects, windowId: "projects", itemType: "app", system: true },
    { id: "videos", title: "Videos", glyph: Icons.videos, windowId: "videos", itemType: "app", system: true },
    { id: "contact", title: "Contact", glyph: Icons.contact, windowId: "contact", itemType: "app", system: true },
    { id: "location", title: "Jacobs Time", glyph: Icons.location, windowId: "location", itemType: "app", system: true },
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

  //  Windows state (Welcome open by default) 
  const [windows, setWindows] = useState({
    welcome:    { id: "welcome",    title: "Welcome",                  x: 250, y: 95,  w: 800, h: 500, isOpen: true,  isMinimized: false, isMaximized: false, z: 11 },
    about:      { id: "about",      title: "About",                    x: 30, y: 20,  w: 1200, h: 600, isOpen: false, isMinimized: false, isMaximized: false, z: 10 },
    skills:     { id: "skills",     title: "Skills",                   x: 200, y: 60,  w: 480, h: 400, isOpen: false, isMinimized: false, isMaximized: false, z: 9 },
    experience: { id: "experience", title: "Experience",               x: 180, y: 50,  w: 560, h: 480, isOpen: false, isMinimized: false, isMaximized: false, z: 8 },
    projects:   { id: "projects",   title: "Projects",                 x: 100, y: 20,  w: 600, h: 560, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
    videos:     { id: "videos",     title: "Videos",                   x: 140, y: 40,  w: 840, h: 560, isOpen: false, isMinimized: false, isMaximized: false, z: 7 },
    contact:    { id: "contact",    title: "Contact",                  x: 260, y: 80,  w: 400, h: 380, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
    location:   { id: "location",   title: "Jacobs Time",              x: 280, y: 110, w: 560, h: 300, isOpen: false, isMinimized: false, isMaximized: false, z: 5 },
    terminal:   { id: "terminal",   title: "Terminal",                 x: 120, y: 50,  w: 500, h: 350, isOpen: false, isMinimized: false, isMaximized: false, z: 4 },
    trash:      { id: "trash",      title: "Recycle Bin",              x: 300, y: 100, w: 320, h: 260, isOpen: false, isMinimized: false, isMaximized: false, z: 3 },
    explorer:   { id: "explorer",   title: "File Explorer",            x: 260, y: 90,  w: 460, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 2 },
    settings:   { id: "settings",   title: "Settings",                 x: 300, y: 120, w: 380, h: 280, isOpen: false, isMinimized: false, isMaximized: false, z: 1 },
    textdoc:    { id: "textdoc",    title: "Text Document",            x: 240, y: 80,  w: 520, h: 360, isOpen: false, isMinimized: false, isMaximized: false, z: 12 },
  });

  const nextZ = () => ++topZRef.current;

  const openWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      const shouldMaximize = FULLSCREEN_WINDOW_IDS.has(id);
      const baseWindow = prev[id];
      const openedWindow = {
        ...baseWindow,
        isOpen: true,
        isMinimized: false,
        isMaximized: shouldMaximize,
        z: nextZ(),
      };

      if (id === "welcome") {
        return {
          ...prev,
          [id]: {
            ...openedWindow,
            isMaximized: false,
            x: 250,
            y: 95,
            w: 800,
            h: 540,
          },
        };
      }

      return {
        ...prev,
        [id]: openedWindow,
      };
    });
  }, []);

  const openVideoApp = useCallback(
    (videoId = null) => {
      if (videoId && VIDEO_LIBRARY_BY_ID[videoId]) {
        setSelectedVideoId(videoId);
      }
      openWindow("videos");
    },
    [openWindow]
  );

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

  const rememberDesktopCursor = useCallback((clientX, clientY) => {
    if (typeof clientX !== "number" || typeof clientY !== "number") return;
    lastDesktopCursorRef.current = { clientX, clientY };
  }, []);

  const toDesktopCursorPoint = useCallback((clientX, clientY) => {
    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: clamp(clientX - rect.left, 0, Math.max(0, rect.width - 1)),
      y: clamp(clientY - rect.top, 0, Math.max(0, rect.height - 1)),
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
    setSelectedIconIds([id]);
    setIconMenu(null);
    setDesktopMenu(null);
  }, [findFreeGridPosition, getNextDesktopSlot, normalizeIconPosition, toDesktopPoint]);

  const createFolder = useCallback((clientX, clientY) => {
    createDesktopItem("folder", clientX, clientY);
  }, [createDesktopItem]);

  const createTextDocument = useCallback((clientX, clientY) => {
    createDesktopItem("text", clientX, clientY);
  }, [createDesktopItem]);

  const resolvePasteBasePosition = useCallback((clientX, clientY) => {
    if (typeof clientX === "number" && typeof clientY === "number") {
      const explicitPoint = toDesktopCursorPoint(clientX, clientY);
      if (explicitPoint) return normalizeIconPosition(explicitPoint.x, explicitPoint.y);
    }

    if (lastDesktopCursorRef.current) {
      const trackedPoint = toDesktopCursorPoint(
        lastDesktopCursorRef.current.clientX,
        lastDesktopCursorRef.current.clientY,
      );
      if (trackedPoint) return normalizeIconPosition(trackedPoint.x, trackedPoint.y);
    }

    return getNextDesktopSlot();
  }, [getNextDesktopSlot, normalizeIconPosition, toDesktopCursorPoint]);

  const pasteDesktopItem = useCallback((clientX, clientY) => {
    if (!clipboardState) return;
    const source = desktopItems.find((item) => item.id === clipboardState.id);
    if (!source) return;

    const basePosition = resolvePasteBasePosition(clientX, clientY);

    if (clipboardState.mode === "cut") {
      setIconPositions((prev) => {
        const position = findFreeGridPosition(basePosition.x, basePosition.y, source.id, prev);
        return { ...prev, [source.id]: position };
      });
      setSelectedIconIds([source.id]);
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
    setSelectedIconIds([cloneId]);
  }, [clipboardState, desktopItems, findFreeGridPosition, resolvePasteBasePosition]);

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

  const moveItemToRecycleBin = useCallback((id, originalPosition = null) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;

    if (item.system) {
      showProtectedDeleteAlert();
      return;
    }

    const fallbackPosition = originalPosition || iconPositions[id] || getNextDesktopSlot();
    setRecycleBinItems((prev) => [
      ...prev.filter((entry) => entry.item.id !== id),
      {
        item: { ...item },
        originalPosition: fallbackPosition,
        deletedAt: Date.now(),
      },
    ]);

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
    if (selectedIconIds.includes(id)) {
      setSelectedIconIds((prev) => prev.filter((x) => x !== id));
    }
    if (clipboardState?.id === id) {
      setClipboardState(null);
    }
  }, [desktopItems, showProtectedDeleteAlert, iconPositions, getNextDesktopSlot, activeTextDocId, selectedIconIds, clipboardState]);

  const deleteDesktopItem = useCallback((id) => {
    moveItemToRecycleBin(id);
  }, [moveItemToRecycleBin]);

  const restoreRecycleBinItem = useCallback((id) => {
    const entry = recycleBinItems.find((candidate) => candidate.item.id === id);
    if (!entry) return;

    setRecycleBinItems((prev) => prev.filter((candidate) => candidate.item.id !== id));
    setCustomItems((prev) => (
      prev.some((item) => item.id === id)
        ? prev
        : [...prev, { ...entry.item, system: false }]
    ));
    setIconPositions((prev) => {
      const anchor = entry.originalPosition || getNextDesktopSlot();
      const restoredPos = findFreeGridPosition(anchor.x, anchor.y, id, prev);
      return { ...prev, [id]: restoredPos };
    });
    setSelectedIconIds([id]);
  }, [recycleBinItems, findFreeGridPosition, getNextDesktopSlot]);

  const permanentlyDeleteRecycleBinItem = useCallback((id) => {
    setRecycleBinItems((prev) => prev.filter((entry) => entry.item.id !== id));
  }, []);

  const emptyRecycleBin = useCallback(() => {
    setRecycleBinItems([]);
  }, []);

  const pinTaskbarItem = useCallback((id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!canPinItemToTaskbar(item)) return;
    setPinnedTaskbarAppIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [desktopItems]);

  const unpinTaskbarItem = useCallback((id) => {
    setPinnedTaskbarAppIds((prev) => prev.filter((entryId) => entryId !== id));
  }, []);

  const openDesktopItem = useCallback((item) => {
    if (!item) return;
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setTaskbarMenu(null);

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

  const getIconsInSelectionBox = useCallback((box) => {
    if (!box || box.w <= 0 || box.h <= 0) return [];
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    return desktopItems
      .filter((item) => {
        const pos = iconPositions[item.id];
        if (!pos) return false;
        return (
          pos.x < box.x + box.w
          && pos.x + view.tileW > box.x
          && pos.y < box.y + box.h
          && pos.y + view.tileH > box.y
        );
      })
      .sort((a, b) => {
        const pa = iconPositions[a.id] || { x: 0, y: 0 };
        const pb = iconPositions[b.id] || { x: 0, y: 0 };
        if (pa.x === pb.x) return pa.y - pb.y;
        return pa.x - pb.x;
      })
      .map((item) => item.id);
  }, [desktopItems, iconPositions, iconSizeMode]);

  const handleDesktopPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (e.target !== e.currentTarget) return;
    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;
    rememberDesktopCursor(e.clientX, e.clientY);

    const startX = clamp(e.clientX - rect.left, 0, rect.width);
    const startY = clamp(e.clientY - rect.top, 0, rect.height);
    const initialBox = { x: startX, y: startY, w: 0, h: 0 };

    setSelectedIconIds([]);
    setStartOpen(false);
    setCalendarOpen(false);
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setTaskbarMenu(null);
    setMarqueePreviewIds([]);
    setDesktopSelectionBox(initialBox);
    selectionBoxRef.current = initialBox;

    const handleMove = (ev) => {
      rememberDesktopCursor(ev.clientX, ev.clientY);
      const currentX = clamp(ev.clientX - rect.left, 0, rect.width);
      const currentY = clamp(ev.clientY - rect.top, 0, rect.height);
      const box = {
        x: Math.min(startX, currentX),
        y: Math.min(startY, currentY),
        w: Math.abs(currentX - startX),
        h: Math.abs(currentY - startY),
      };
      selectionBoxRef.current = box;
      setDesktopSelectionBox(box);
      if (box.w > 3 || box.h > 3) {
        setMarqueePreviewIds(getIconsInSelectionBox(box));
      } else {
        setMarqueePreviewIds([]);
      }
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      const box = selectionBoxRef.current;
      if (box && (box.w > 4 || box.h > 4)) {
        const hits = getIconsInSelectionBox(box);
        if (hits.length > 0) {
          setSelectedIconIds(hits);
        }
      }
      selectionBoxRef.current = null;
      setDesktopSelectionBox(null);
      setMarqueePreviewIds([]);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [getIconsInSelectionBox, rememberDesktopCursor]);

  const selectDesktopIcon = useCallback((id, opts = {}) => {
    if (opts.ctrlKey) {
      setSelectedIconIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setSelectedIconIds([id]);
    }
    setCalendarOpen(false);
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setTaskbarMenu(null);
  }, []);

  const openIconMenuAt = useCallback((id, clientX, clientY) => {
    rememberDesktopCursor(clientX, clientY);
    const rect = desktopRef.current?.getBoundingClientRect();
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    const iconPos = iconPositions[id];
    const menuW = 188;
    const menuH = 196;

    setSelectedIconIds([id]);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setCalendarOpen(false);
    setTaskbarMenu(null);

    if (rect && iconPos) {
      let menuX = iconPos.x + view.tileW + 6;
      if (menuX + menuW > rect.width - 4) {
        menuX = Math.max(4, iconPos.x - menuW - 6);
      }
      let menuY = clamp(iconPos.y + 4, 4, Math.max(4, rect.height - menuH - 4));
      if (menuX <= iconPos.x + view.tileW && menuX + menuW >= iconPos.x) {
        menuX = clamp(iconPos.x + view.tileW + 6, 4, Math.max(4, rect.width - menuW - 4));
        if (menuX <= iconPos.x + view.tileW && menuX + menuW >= iconPos.x) {
          menuX = clamp(iconPos.x - menuW - 6, 4, Math.max(4, rect.width - menuW - 4));
        }
      }
      setIconMenu({ id, x: menuX, y: menuY });
      return;
    }

    const point = toDesktopPoint(clientX, clientY);
    setIconMenu({ id, x: point.x, y: point.y });
  }, [rememberDesktopCursor, iconPositions, iconSizeMode, toDesktopPoint]);

  const openDesktopMenuAt = useCallback((clientX, clientY) => {
    rememberDesktopCursor(clientX, clientY);
    const point = toDesktopPoint(clientX, clientY);
    setDesktopMenu({ x: point.x, y: point.y });
    setDesktopViewMenuOpen(false);
    setIconMenu(null);
    setCalendarOpen(false);
    setTaskbarMenu(null);
  }, [rememberDesktopCursor, toDesktopPoint]);

  const handleIconAction = useCallback((action, id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    if (!item) return;
    setSelectedIconIds([id]);

    if (action === "open") openDesktopItem(item);
    if (action === "cut") setClipboardState({ mode: "cut", id });
    if (action === "copy") setClipboardState({ mode: "copy", id });
    if (action === "paste") pasteDesktopItem();
    if (action === "rename") renameDesktopItem(id);
    if (action === "delete") deleteDesktopItem(id);
    if (action === "pinTaskbar") pinTaskbarItem(id);
    if (action === "unpinTaskbar") unpinTaskbarItem(id);

    setIconMenu(null);
    setTaskbarMenu(null);
  }, [desktopItems, pasteDesktopItem, openDesktopItem, renameDesktopItem, deleteDesktopItem, pinTaskbarItem, unpinTaskbarItem]);

  const handleIconDragStart = useCallback((id, position) => {
    dragStartRef.current[id] = position;
    setSelectedIconIds([id]);
    setIconMenu(null);
    setDesktopMenu(null);
    setTaskbarMenu(null);
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
      moveItemToRecycleBin(id, dragStartRef.current[id] || snapped);
      return;
    }

    setIconPositions((prev) => {
      const freePos = findFreeGridPosition(snapped.x, snapped.y, id, prev);
      return { ...prev, [id]: freePos };
    });
  }, [desktopItems, iconSizeMode, iconPositions.trash, normalizeIconPosition, showProtectedDeleteAlert, moveItemToRecycleBin, findFreeGridPosition]);

  const nudgeSelectedIcon = useCallback((dxCells, dyCells) => {
    const id = selectedIconIds[0];
    if (!id) return;
    const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
    setIconPositions((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const targetX = current.x + dxCells * view.cellX;
      const targetY = current.y + dyCells * view.cellY;
      const freePos = findFreeGridPosition(targetX, targetY, id, prev);
      return { ...prev, [id]: freePos };
    });
  }, [selectedIconIds, iconSizeMode, findFreeGridPosition]);

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
    setSelectedIconIds([id]);
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
        setCalendarOpen(false);
        setTaskbarMenu(null);
        cancelRenameDesktopItem();
        return;
      }

      if (ctrl && e.shiftKey && (e.key === "N" || e.key === "n")) {
        e.preventDefault();
        createFolder();
        return;
      }

      if (ctrl && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
        if (!clipboardState) return;
        pasteDesktopItem();
        return;
      }

      const activeId = selectedIconIds[0];
      if (!activeId) return;

      if (ctrl && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        setClipboardState({ mode: "copy", id: activeId });
        return;
      }

      if (ctrl && (e.key === "x" || e.key === "X")) {
        e.preventDefault();
        setClipboardState({ mode: "cut", id: activeId });
        return;
      }

      if (e.key === "Delete") {
        e.preventDefault();
        deleteDesktopItem(activeId);
        return;
      }

      if (e.key === "F2") {
        e.preventDefault();
        renameDesktopItem(activeId);
        return;
      }

      if (e.shiftKey && e.key === "ArrowLeft") { e.preventDefault(); nudgeSelectedIcon(-1, 0); }
      if (e.shiftKey && e.key === "ArrowRight") { e.preventDefault(); nudgeSelectedIcon(1, 0); }
      if (e.shiftKey && e.key === "ArrowUp") { e.preventDefault(); nudgeSelectedIcon(0, -1); }
      if (e.shiftKey && e.key === "ArrowDown") { e.preventDefault(); nudgeSelectedIcon(0, 1); }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cancelRenameDesktopItem, clipboardState, createFolder, deleteDesktopItem, nudgeSelectedIcon, pasteDesktopItem, renameDesktopItem, selectedIconIds]);

  useEffect(() => {
    const closeTaskbarContext = () => setTaskbarMenu(null);
    window.addEventListener("pointerdown", closeTaskbarContext);
    return () => window.removeEventListener("pointerdown", closeTaskbarContext);
  }, []);

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
    setWindows((prev) => {
      if (!prev[id]) return prev;
      const topZ = Object.values(prev).reduce((max, win) => Math.max(max, win.z), -Infinity);
      if (prev[id].z === topZ) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], z: nextZ() },
      };
    });
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
  const desktopAppsById = new Map(
    desktopItems
      .filter((item) => canPinItemToTaskbar(item))
      .map((item) => [item.id, item]),
  );
  const normalizedPinnedIds = pinnedTaskbarAppIds.filter((id) => desktopAppsById.has(id));
  const pinnedTaskbarEntries = normalizedPinnedIds
    .filter((id) => !!windows[id])
    .map((id) => {
      const appItem = desktopAppsById.get(id);
      const win = windows[id];
      return {
        id,
        appItem,
        win,
        isOpen: !!win?.isOpen,
        title: appItem?.title || win?.title || id,
      };
    });
  const openTaskbarEntries = openWindows.map((win) => {
    const appItem = desktopAppsById.get(win.id);
    return {
      id: win.id,
      appItem,
      win,
      isPinned: normalizedPinnedIds.includes(win.id),
      title: appItem?.title || win.title || win.id,
    };
  });

  const activateTaskbarEntry = useCallback((id) => {
    const win = windows[id];
    if (!win) return;

    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setStartOpen(false);
    setCalendarOpen(false);
    setTaskbarMenu(null);

    if (!win.isOpen) {
      openWindow(id);
      return;
    }

    if (win.isMinimized) {
      setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isMinimized: false, z: nextZ() } }));
      return;
    }

    if (id === activeWindowId) {
      minimizeWindow(id);
      return;
    }

    focusWindow(id);
  }, [windows, activeWindowId, minimizeWindow, focusWindow, openWindow]);

  const openTaskbarMenuAt = useCallback((id, clientX, clientY) => {
    const menuW = 170;
    const menuH = 110;
    const maxX = Math.max(8, window.innerWidth - menuW - 8);
    const maxY = Math.max(8, window.innerHeight - menuH - 8);
    setTaskbarMenu({
      id,
      x: clamp(clientX, 8, maxX),
      y: clamp(clientY, 8, maxY),
    });
    setIconMenu(null);
    setDesktopMenu(null);
    setDesktopViewMenuOpen(false);
    setStartOpen(false);
    setCalendarOpen(false);
  }, []);

  const handleTaskbarMenuAction = useCallback((action, id) => {
    if (action === "close") closeWindow(id);
    if (action === "pinTaskbar") pinTaskbarItem(id);
    if (action === "unpinTaskbar") unpinTaskbarItem(id);
    setTaskbarMenu(null);
  }, [closeWindow, pinTaskbarItem, unpinTaskbarItem]);

  //  Start menu 

  const windowContent = {
    welcome: <WelcomeApp openWindow={openWindow} />,
    about: <AboutApp openWindow={openWindow} />,
    skills: <SkillsApp />,
    experience: <ExperienceApp />,
    projects: <ProjectsApp onOpenVideo={openVideoApp} />,
    videos: <VideosApp initialVideoId={selectedVideoId} />,
    contact: <ContactApp />,
    location: <LocationApp />,
    terminal: <TerminalApp />,
    trash: (
      <TrashApp
        items={recycleBinItems}
        onRestoreItem={restoreRecycleBinItem}
        onDeleteItem={permanentlyDeleteRecycleBinItem}
        onEmpty={emptyRecycleBin}
      />
    ),
    explorer: (
      <ExplorerApp
        items={desktopItems}
        onOpenItem={openDesktopItem}
        onAction={handleIconAction}
      />
    ),
    settings: <SettingsApp iconSizeMode={iconSizeMode} setIconSizeMode={setIconSizeMode} clockFormat={clockFormat} setClockFormat={setClockFormat} desktopColor={desktopColor} setDesktopColor={setDesktopColor} />,
    textdoc: <TextDocumentApp item={activeTextDoc} onChangeContent={updateTextContent} />,
  };

  const monthStart = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 1);
  const monthEnd = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 0);
  const monthLabel = monthStart.toLocaleDateString([], { month: "long", year: "numeric" });
  const leadingDays = monthStart.getDay();
  const dayCells = [];
  for (let i = 0; i < leadingDays; i += 1) dayCells.push(null);
  for (let d = 1; d <= monthEnd.getDate(); d += 1) dayCells.push(d);
  while (dayCells.length % 7 !== 0) dayCells.push(null);
  const today = new Date();
  const isToday = (day) => (
    day
    && today.getFullYear() === monthStart.getFullYear()
    && today.getMonth() === monthStart.getMonth()
    && today.getDate() === day
  );
  const iconMenuItem = iconMenu ? desktopItems.find((item) => item.id === iconMenu.id) : null;
  const iconMenuIsPinnable = canPinItemToTaskbar(iconMenuItem);
  const iconMenuPinned = iconMenuItem ? normalizedPinnedIds.includes(iconMenuItem.id) : false;
  const taskbarMenuWindow = taskbarMenu ? windows[taskbarMenu.id] : null;
  const taskbarMenuAppItem = taskbarMenu ? desktopAppsById.get(taskbarMenu.id) : null;
  const taskbarMenuIsPinnable = canPinItemToTaskbar(taskbarMenuAppItem);
  const taskbarMenuPinned = !!taskbarMenuAppItem && normalizedPinnedIds.includes(taskbarMenuAppItem.id);

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
          cursor: pointer;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #727272;
          border-top: 1px solid #a4a4a4;
          border-left: 1px solid #a4a4a4;
          border-right: 1px solid #4a4a4a;
          border-bottom: 1px solid #4a4a4a;
          cursor: pointer;
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
              background: desktopColor
                ? desktopColor
                : "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.15), transparent 55%), linear-gradient(180deg, #0b4aa6, #0a3f90)",
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

              {/*  OS Menu Bar with functional dropdowns  */}
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
                  />

              {/*  Desktop Area  */}
              <div
                ref={desktopRef}
                style={{ flex: 1, position: "relative", overflow: "hidden" }}
                onPointerDown={handleDesktopPointerDown}
                onPointerMove={(e) => rememberDesktopCursor(e.clientX, e.clientY)}
                onContextMenu={(e) => {
                  if (e.target !== e.currentTarget) return;
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
                    selected={selectedIconIds.includes(icon.id)}
                    hovered={hoveredIcon === icon.id || marqueePreviewIds.includes(icon.id)}
                    iconSizeMode={iconSizeMode}
                    onDoubleClick={() => openDesktopItem(icon)}
                    onDragStart={handleIconDragStart}
                    onDragMove={handleIconDragMove}
                    onDrop={handleIconDrop}
                    onSingleClick={(id, _x, _y, opts) => selectDesktopIcon(id, opts)}
                    onContextMenu={openIconMenuAt}
                    onHoverChange={setHoveredIcon}
                    isCutPending={clipboardState?.mode === "cut" && clipboardState.id === icon.id}
                    isRenaming={renamingItem?.id === icon.id}
                    renameValue={renamingItem?.id === icon.id ? renamingItem.value : icon.title}
                    onRenameChange={(value) => setRenamingItem((prev) => (prev?.id === icon.id ? { ...prev, value } : prev))}
                    onRenameCommit={commitRenameDesktopItem}
                    onRenameCancel={cancelRenameDesktopItem}
                  />
                ))}

                {desktopSelectionBox && (desktopSelectionBox.w > 0 || desktopSelectionBox.h > 0) && (
                  <div
                    style={{
                      position: "absolute",
                      left: desktopSelectionBox.x,
                      top: desktopSelectionBox.y,
                      width: desktopSelectionBox.w,
                      height: desktopSelectionBox.h,
                      background: "rgba(154,198,255,0.35)",
                      border: "1px solid #5b8fd8",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                      pointerEvents: "none",
                      zIndex: 150,
                    }}
                  />
                )}

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
                      ...(iconMenuIsPinnable
                        ? [{ key: iconMenuPinned ? "unpinTaskbar" : "pinTaskbar", label: iconMenuPinned ? "Unpin from Taskbar" : "Pin to Taskbar" }]
                        : []),
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

              {/*  Taskbar Buckets  */}
              <div style={{ display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
                {/* Pinned Apps Bucket */}
                <div style={{
                  background: "#b9b9b9",
                  borderTop: "1px solid #fff",
                  borderBottom: "1px solid #707070",
                  borderLeft: "1px solid #d6d6d6",
                  borderRight: "1px solid #707070",
                  padding: "2px 6px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  minHeight: 26,
                }}>
                  <span style={{ fontSize: 10, color: "#4a4a4a", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", flexShrink: 0 }}>
                    Pinned
                  </span>
                  <div style={{ width: 1, height: 14, background: "#808080", flexShrink: 0 }} />
                  <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden" }}>
                    {pinnedTaskbarEntries.map((entry) => {
                      const { id, title } = entry;
                      return (
                        <button
                          key={id}
                          onClick={(e) => { e.stopPropagation(); activateTaskbarEntry(id); }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          style={{
                            border: "none",
                            borderTop: "1px solid #fff",
                            borderLeft: "1px solid #fff",
                            borderRight: "1px solid #404040",
                            borderBottom: "1px solid #404040",
                            background: "#c0c0c0",
                            padding: "2px 8px",
                            fontSize: 11,
                            color: "#222",
                            fontFamily: "inherit",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 140,
                            lineHeight: 1.25,
                          }}
                        >
                          {title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/*  Main Taskbar  */}
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
                  onClick={(e) => { e.stopPropagation(); setCalendarOpen(false); setTaskbarMenu(null); setStartOpen((p) => !p); }}
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

                {/* Divider */}
                <div style={{ width: 1, height: 20, background: "#808080", marginLeft: 2, marginRight: 2 }} />

                {/* Open App Buttons */}
                <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden" }}>
                  {openTaskbarEntries.map((entry) => {
                    const { id, win, title } = entry;
                    const isActive = id === activeWindowId && !win.isMinimized;
                    return (
                    <div
                      key={id}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
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
                        onClick={(e) => { e.stopPropagation(); activateTaskbarEntry(id); }}
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
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            lineHeight: 1.2,
                            paddingBottom: 1,
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          {title}
                        </span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
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
                      >
                        x
                      </button>
                    </div>
                    );
                  })}
                </div>

                {taskbarMenu && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{
                      position: "fixed",
                      left: taskbarMenu.x,
                      top: taskbarMenu.y,
                      minWidth: 160,
                      background: "#c0c0c0",
                      borderTop: "2px solid #fff",
                      borderLeft: "2px solid #fff",
                      borderRight: "2px solid #404040",
                      borderBottom: "2px solid #404040",
                      boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
                      zIndex: 9500,
                      padding: "2px 0",
                    }}
                  >
                    {taskbarMenuWindow?.isOpen && (
                      <button
                        onClick={() => handleTaskbarMenuAction("close", taskbarMenu.id)}
                        style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 12px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                      >
                        Close
                      </button>
                    )}
                    {taskbarMenuIsPinnable && (
                      <button
                        onClick={() => handleTaskbarMenuAction(taskbarMenuPinned ? "unpinTaskbar" : "pinTaskbar", taskbarMenu.id)}
                        style={{ width: "100%", border: "none", background: "transparent", color: MENU_TEXT_COLOR, textAlign: "left", padding: "6px 12px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MENU_TEXT_COLOR; }}
                      >
                        {taskbarMenuPinned ? "Unpin from Taskbar" : "Pin to Taskbar"}
                      </button>
                    )}
                  </div>
                )}

                {/* Network + Clock */}
                <div style={{ display: "flex", alignItems: "stretch", gap: 4 }}>
                  <div
                    style={{
                      background: "#c0c0c0",
                      borderTop: "1px solid #404040",
                      borderLeft: "1px solid #404040",
                      borderRight: "1px solid #fff",
                      borderBottom: "1px solid #fff",
                      padding: "3px 6px",
                      display: "inline-flex",
                      alignItems: "flex-end",
                      gap: 1,
                      minWidth: 20,
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ width: 3, height: 3, background: "#0b3b8f" }} />
                    <span style={{ width: 3, height: 5, background: "#0b3b8f" }} />
                    <span style={{ width: 3, height: 7, background: "#0b3b8f" }} />
                    <span style={{ width: 3, height: 9, background: "#0b3b8f" }} />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setStartOpen(false);
                      setTaskbarMenu(null);
                      setCalendarOpen((prev) => !prev);
                    }}
                    style={{
                      background: "#c0c0c0",
                      border: "none",
                      borderTop: "1px solid #404040",
                      borderLeft: "1px solid #404040",
                      borderRight: "1px solid #fff",
                      borderBottom: "1px solid #fff",
                      padding: "3px 8px",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#111",
                      whiteSpace: "nowrap",
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    {clock}
                  </button>
                </div>

                {calendarOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      right: 6,
                      bottom: "100%",
                      marginBottom: 3,
                      width: 255,
                      background: "#c0c0c0",
                      borderTop: "2px solid #fff",
                      borderLeft: "2px solid #fff",
                      borderRight: "2px solid #404040",
                      borderBottom: "2px solid #404040",
                      boxShadow: "3px 3px 10px rgba(0,0,0,0.35)",
                      zIndex: 9100,
                      padding: 8,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <button
                        onClick={() => setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                        style={{
                          width: 20,
                          height: 18,
                          border: "none",
                          borderTop: "1px solid #fff",
                          borderLeft: "1px solid #fff",
                          borderRight: "1px solid #404040",
                          borderBottom: "1px solid #404040",
                          background: "#c0c0c0",
                          fontSize: 12,
                          color: MENU_TEXT_COLOR,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          lineHeight: 1,
                        }}
                      >
                        {"<"}
                      </button>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{monthLabel}</div>
                      <button
                        onClick={() => setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                        style={{
                          width: 20,
                          height: 18,
                          border: "none",
                          borderTop: "1px solid #fff",
                          borderLeft: "1px solid #fff",
                          borderRight: "1px solid #404040",
                          borderBottom: "1px solid #404040",
                          background: "#c0c0c0",
                          fontSize: 12,
                          color: MENU_TEXT_COLOR,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          lineHeight: 1,
                        }}
                      >
                        {">"}
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dow) => (
                        <div key={dow} style={{ textAlign: "center", fontSize: 11, color: "#2f2f2f", fontWeight: 700, padding: "1px 0" }}>
                          {dow}
                        </div>
                      ))}
                      {dayCells.map((day, idx) => (
                        <div
                          key={`${idx}-${day ?? "empty"}`}
                          style={{
                            textAlign: "center",
                            fontSize: 11,
                            color: day ? "#111" : "#777",
                            padding: "3px 0",
                            border: day && isToday(day) ? "1px solid #000080" : "1px solid transparent",
                            background: day && isToday(day) ? "#dbe7ff" : "transparent",
                            minHeight: 20,
                          }}
                        >
                          {day ?? ""}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                            <span style={{ width: 26, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                          <span style={{ width: 26, textAlign: "center" }}>DOC</span>
                          Resume.pdf
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>
                </>
              ) : (
                <BootSequence embedded onComplete={handleBootComplete} />
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














