"use client";

export const PERSONAL = {
  name: "Jacob Rushinski",
  title: "Backend / Full-Stack Developer",
  tagline: "I build production-grade systems: APIs, data modeling, auth, payments, automation.",
  bio: "I'm currently attending Thaddeus Stevens College of Technology, graduating with an Associate's in Computer Software Engineering Technology in May 2026. I'm looking for Backend, Full-Stack, or related roles near Philadelphia, PA (within 50mi) or nationwide remote.\n\nRight now I'm rebuilding a multi-tenant sneaker marketplace from the ground up. I enjoy working on production-grade systems and the level of detail required to build software that is reliable and maintainable. I take pride in writing clean code and designing systems that perform well under real-world usage. If you'd like to connect or learn more about my work, feel free to reach out.",
  email: "jacobrushinski@gmail.com",
  phone: "(717) 216-9005",
  phoneHref: "tel:+17172169005",
  location: "United States",
  github: "https://github.com/rushinski",
  linkedin: "https://linkedin.com/in/jacobrushinski",
  resumeUrl: "/Jacob_Rushinski_Resume.pdf",
  school: "Thaddeus Stevens College of Technology",
  gradDate: "May 2026",
  gpa: "3.52 / 4.00",
};

export const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
  "Frameworks & Libraries": ["Node.js", "Next.js", "React", "Tailwind CSS"],
  "Databases & Infrastructure": ["PostgreSQL", "MongoDB", "Redis", "Docker", "AWS (SES)", "GitHub Actions"],
  "Developer Tools": ["Git", "GitHub", "Vercel", "Upstash", "Claude Code", "Codex"],
};

// Order within each tier controls display order on skills page when scores tie.
// Earlier = higher priority within the same score.
export const SKILL_PROFICIENCY = {
  JavaScript: 4,
  "Node.js": 4,
  TypeScript: 3,
  "Next.js": 3,
  PostgreSQL: 3,
  Git: 3,
  GitHub: 3,
  SQL: 3,
  "Claude Code": 3,
  Codex: 3,
  Python: 2,
  React: 2,
  Docker: 2,
  "GitHub Actions": 2,
  "AWS (SES)": 2,
  Vercel: 2,
  Upstash: 2,
  HTML: 2,
  CSS: 2,
  MongoDB: 1,
  Redis: 1,
  "Tailwind CSS": 1,
};

// Explicit top-4 shown on the About page — edit this to change what appears there.
export const TOP_SKILLS = ["JavaScript", "Node.js", "PostgreSQL", "TypeScript"];

export const EXPERIENCE = [
  {
    company: "Realdealkickzsc",
    role: "Contract Full-Stack Software Engineer",
    period: "Nov 2025 - Feb 2026",
    paragraph: "I was brought on as the sole engineer to replace an existing Shopify storefront with a fully custom platform — owning everything from the database schema and API design to deployment and infrastructure. The interesting part wasn't just building it, it was building it alone in production with a real business depending on it. I engineered the full order lifecycle including Stripe webhook pipelines with idempotent event handling, a centralized API gateway with rate limiting and CSRF protection securing 7.5M monthly requests, and a CI/CD pipeline that maintained 100% deployment uptime throughout the contract. By the end the platform was processing $8k in monthly GMV through a new sales channel and projected annual sessions had grown from 204k to 236k after migrating off Shopify.",
    stack: ["TypeScript", "Next.js", "Supabase", "Stripe", "Upstash Redis", "GitHub Actions", "AWS SES"],
  },
  {
    company: "Giant Food Stores",
    role: "Giant Direct Facilitator & Seafood Associate",
    period: "May 2022 - Present",
    paragraph: "I've worked here since May 2022 alongside my studies, leading fulfillment operations and training 15+ associates. It's not a technical role but it taught me how to stay accountable in a high-volume environment where things go wrong and someone has to own it.",
    stack: [],
  },
];

export const PROJECTS = [
  {
    id: "sneaker-marketplace",
    title: "Multi-Tenant Sneaker Marketplace",
    date: "Feb 2026 – Present",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Digital Ocean", "Upstash Redis"],
    overview: "While contracting on a single-tenant sneaker marketplace, 5 other resellers expressed interest in their own platforms. Rather than building and maintaining 5 separate backends and infrastructure stacks, I decided to build a proper multi-tenant SaaS. I'm also a sneakerhead myself, so this is a problem space I genuinely care about.",
    why: "The contract taught me what the problem actually was. By the end I had a clear picture of what a proper multi-tenant version should look like — and 5 people already asking for it.",
    challenges: "In active development — will be updated as the project progresses.",
    takeaway: "In active development — will be updated as the project progresses.",
    differently: "In active development — will be updated as the project progresses.",
    outcome: "In active development. Designed to support 6+ independent reseller storefronts with enforced tenant isolation.",
    githubUrl: "https://github.com/rushinski/rdk-webstore",
    liveUrl: "https://www.realdealkickzsc.com/",
  },
  {
    id: "title-bot",
    title: "Rise of Kingdoms Automation Bot",
    date: "Jan 2025 – Mar 2025",
    tech: ["JavaScript", "Node.js", "MongoDB", "Discord.js", "ADBKit", "Tesseract.js"],
    overview: "I was curious how automation bots for Rise of Kingdoms actually worked — the approach isn't publicly documented because it violates the game's TOS and the few people who know how to build them treat it as a competitive advantage.",
    why: "The secrecy around how these bots worked made me want to figure it out myself. Nobody was going to hand me the answer, so it was a pure reverse-engineering challenge.",
    challenges: "I had never heard of ADBKit or a VM before this project. The core questions were: how do I interact with the game programmatically, and how do I keep it running 24/7? The hardest unsolved problem was moving to an in-game chat approach — how modern bots work — instead of Discord commands. My attempt was a bot watching kingdom chat with OCR, but when a title request came in the watcher fell behind and missed messages. Splitting into two bots didn't solve it either — simultaneous requests still caused drops. I believe the real solution is data interception between the game client and server, which would also explain how some bots expose private player stats that should be invisible, but I never confirmed this. A separate hard problem was clicking accuracy: the governor profile menu can appear in 4 different screen positions, so I used Tesseract, Sharp, and PixelMatch to detect its location dynamically on each run.",
    takeaway: "For every problem that seems unsolvable, there's usually a layer deeper you haven't looked at yet. I got close but didn't dig far enough — the in-game approach was almost certainly a network-level solution, not a UI one.",
    differently: "I would have pushed harder to crack the in-game chat approach before falling back to Discord commands. The Discord version worked, but it was already outdated compared to what the best bots were doing.",
    outcome: "The bot worked and achieved 100% positioning accuracy for title assignments. Ultimately the client moved to an in-game solution, making the Discord approach obsolete, but the project delivered on its original scope.",
    githubUrl: "https://github.com/rushinski/Discord-Title-Bot",
    liveUrl: null,
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
  {
    id: "discord-bot",
    title: "Discord Automation & Moderation Bot",
    date: "Oct 2024 – Jan 2025",
    tech: ["JavaScript", "Node.js", "MongoDB", "Discord.js"],
    overview: "This was my first ever backend-focused project — everything before this was frontend. It opened an entirely new domain for me.",
    why: "I wanted to build something real for a community I was already part of. Five separate bots were handling different things in the server and it was a mess — I wanted to consolidate them and actually own the whole system.",
    challenges: "The most interesting part was discovering the need for a database organically. The bot was running giveaways and I realized if it restarted mid-giveaway, the state was gone. That forced me to learn persistent storage, and once I had a database I kept finding more uses for it — tracking infractions, reaction roles, message counts for a leveling system. Content moderation was its own problem. I started by manually listing every banned word and its variations, which was a losing battle — users could always get more creative. I researched solutions and found the fast-levenshtein package, which scores words by similarity to the original rather than requiring exact matches, making the system much harder to game.",
    takeaway: "Once you have a database, your instinct for what problems are worth solving changes completely — persistence unlocks a whole class of features that just aren't possible otherwise.",
    differently: "I didn't understand the concept of multiple environments until my contract work. If I had, I could have developed and tested the bot while keeping it live for users rather than taking it down during changes.",
    outcome: "Deployed to a server with 900+ members, used thousands of times per day. Generated 3 paid contract offers from people who wanted similar bots built.",
    githubUrl: "https://github.com/rushinski/Discord-Bot-Unity",
    liveUrl: "https://rushinski.github.io/Unity-Landing-Page/",
  },
];

export const LOCATIONS = [
  {
    id: "harrisburg",
    label: "Harrisburg, PA",
    role: "Home + Work",
    note: "Home base. Currently working at Giant Food Stores in the area.",
    color: "#008000",
    coordinates: [-76.8867, 40.2732],
    bx: -220, by: -105, bw: 152, bh: 72,
    noteLines: ["Home base. Work at", "Giant Food Stores."],
  },
  {
    id: "lancaster",
    label: "Lancaster, PA",
    role: "School",
    note: "Attending Thaddeus Stevens College of Technology. Most weekdays here during the semester.",
    color: "#000080",
    coordinates: [-76.3055, 40.0379],
    bx: -220, by: 22, bw: 152, bh: 72,
    noteLines: ["Thaddeus Stevens College", "of Technology. Weekdays."],
  },
  {
    id: "philadelphia",
    label: "Philadelphia, PA",
    role: "Weekends + Future",
    note: "In Philly most weekends. Looking to move here after graduation in May 2026.",
    color: "#800000",
    coordinates: [-75.1652, 39.9526],
    bx: 30, by: -82, bw: 158, bh: 72,
    noteLines: ["In Philly most weekends.", "Plans to move here."],
  },
];

export const VIDEO_LIBRARY = PROJECTS.flatMap((project, projectIdx) =>
  (project.videos || []).map((video, videoIdx) => ({
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
