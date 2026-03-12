"use client";

export const PERSONAL = {
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

export const SKILLS = {
  Languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "Java", "C++", "PHP", "HTML", "CSS"],
  Technologies: ["Node.js", "Next.js", "Flask", "React", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Tailwind CSS"],
  Integrations: ["Stripe", "Supabase", "Discord.js", "ADBKit", "AWS SES"],
  "Developer Tools": ["Docker", "Git", "GitHub", "GitHub Actions", "Vercel"],
};

export const EXPERIENCE = [
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
    stack: ["TypeScript", "Next.js", "Supabase", "Stripe", "Upstash Redis", "GitHub Actions", "AWS SES"],
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

export const PROJECTS = [
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

export const VIDEO_LIBRARY = PROJECTS.flatMap((project, projectIdx) =>
  (project.links?.videos || []).map((video, videoIdx) => ({
    ...video,
    id: video.id || `video-${projectIdx}-${videoIdx}`,
    label: video.label || `Video ${videoIdx + 1}`,
    src: video.src || "",
    projectTitle: project.title,
    projectIdx,
    videoIdx,
  })),
);

export const VIDEO_LIBRARY_BY_ID = VIDEO_LIBRARY.reduce((acc, video) => {
  acc[video.id] = video;
  return acc;
}, {});
