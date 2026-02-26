// ─── CONTENT DATA ────────────────────────────────────────────
// Edit this file to update portfolio content without touching components

export const personalInfo = {
  name: "Jacob Rushinski",
  firstName: "Jacob",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "Back End Developer"],
  tagline: "I'm a Backend / Full-Stack Developer currently looking for work in either role.",
  email: "jacobrushinski@gmail.com",
  location: "Lancaster, PA",
  timezone: "America/New_York",
  github: "https://github.com/rushinski",
  githubUsername: "rushinski",
  linkedin: "https://linkedin.com/in/jacobrushinski",
  instagram: "https://instagram.com/",
  resumeUrl: "/Jacob_Rushinski_Resume.pdf",
};

export const aboutLines = [
  "Software engineering student @ Thaddeus Stevens College of Technology",
  "Graduating May 2026 — GPA 3.52 / 4.00",
  "I build things that ship and hold up under pressure",
  "Currently expanding a production e-commerce platform into multi-tenant SaaS",
  "Interested in backend architecture, distributed systems, and automation",
  "Looking for backend or full-stack roles where I can do meaningful work",
];

export const stats = [
  { value: "3.52", label: "GPA" },
  { value: "60+",  label: "API_ROUTES_BUILT" },
  { value: "100%", label: "ORDER_SUCCESS_RATE" },
  { value: "58%",  label: "INFRA_COST_REDUCTION" },
];

export const skills = {
  languages: [
    "JavaScript", "TypeScript", "Python", "Java", "PHP", "C++", "SQL", "HTML", "CSS",
  ],
  technologies: [
    "Node.js", "Next.js", "React", "Supabase", "PostgreSQL", "MongoDB",
    "Stripe", "Shippo", "Upstash Redis", "AWS SES", "Docker", "Git",
    "GitHub Actions", "Vercel", "Discord.js", "ADBKit", "Tesseract.js", "Sharp",
  ],
  concepts: [
    "REST API Design", "Authentication & Authorization", "RBAC",
    "Row-Level Security", "Rate Limiting", "CSRF Protection",
    "Webhook Processing", "Idempotency", "Transactional Integrity",
    "Queue-Based Processing", "Concurrency Control",
    "Event-Driven Architecture", "CI/CD", "Secure Secrets Management",
  ],
};

export const experience = [
  {
    id: "exp_01",
    company: "Realdealkickzsc",
    role: "Contract Full-Stack Software Engineer",
    period: "Nov 2025 — Present",
    type: "Contract / Remote",
    description: "Built a production e-commerce platform from scratch to replace Shopify, handling architecture, security, payments, and deployment.",
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
    id: "exp_02",
    company: "Giant Food Stores",
    role: "Giant Direct Facilitator & Seafood Associate",
    period: "May 2022 — Present",
    type: "Part-time",
    description: "Led high-volume fulfillment operations and trained new associates during peak demand.",
    bullets: [
      "Processed 400+ unit orders during peak periods while onboarding new associates.",
      "Maintained accuracy and efficiency standards across high-volume fulfillment cycles.",
    ],
    stack: [],
  },
];

export const projects = [
  {
    id: "proj_01",
    title: "Discord Title Automation Bot",
    subtitle: "ADB automation pipeline with computer vision",
    date: "Jan–Mar 2025",
    status: "COMPLETE",
    description: "Orchestrated a Discord-to-device automation pipeline that mapped Discord user IDs to MongoDB player records and executed queued title requests via scoped ADB interactions.",
    problem: "Manual title assignment took ~1 minute per request and required constant human attention, making it unscalable for a growing community.",
    impact: [
      "Reduced manual title assignment from 1 minute → 5 seconds",
      "95% success rate via image-based UI state detection",
      "100% conflict-free processing with role-based bucket queue",
      "Eliminated race conditions across concurrent sessions",
    ],
    stack: ["JavaScript", "MongoDB", "ADBKit", "Tesseract.js", "Discord.js"],
    github: "https://github.com/rushinski",
    live: null,
  },
  {
    id: "proj_02",
    title: "Discord Automation & Moderation Bot",
    subtitle: "Modular event-driven bot for community management",
    date: "Oct 2024–Jan 2025",
    status: "COMPLETE",
    description: "Engineered a modular, event-driven Discord bot serving 8 servers and 900+ members, consolidating multiple single-purpose bots into one.",
    problem: "Admins were juggling multiple single-purpose bots with separate setup, maintenance, and permissions — creating overhead and coverage gaps.",
    impact: [
      "60% reduction in moderator workload",
      "1,000+ transcripts archived with GitHub Gist + MongoDB fallback",
      "500+ new members screened in 2 months — raid entries reduced 100%",
      "40% reduction in bot setup time",
    ],
    stack: ["JavaScript", "Discord.js", "MongoDB", "GitHub Gist API"],
    github: "https://github.com/rushinski",
    live: null,
  },
  {
    id: "proj_03",
    title: "RDK SaaS Platform",
    subtitle: "Multi-tenant sneaker marketplace — in progress",
    date: "2025 — Present",
    status: "IN_PROGRESS",
    description: "Multi-tenant SaaS expansion of the Realdealkickzsc platform, enabling other sneaker retailers to spin up their own storefronts on shared infrastructure.",
    problem: "Saw demand for a turnkey sneaker marketplace platform after building the original. Goal is to generalize the architecture into a product others can license.",
    impact: [
      "Multi-tenant Supabase architecture with full per-store data isolation",
      "Shared infra dramatically reduces per-tenant cost vs Shopify",
      "Reusing proven payment, webhook, and rate-limiting patterns",
      "22-week implementation roadmap in active progress",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Stripe", "Upstash Redis", "Vercel"],
    github: "https://github.com/rushinski",
    live: null,
  },
];

export const translations = {
  en: {
    nav_about: "about",
    nav_skills: "skills",
    nav_experience: "experience",
    nav_projects: "projects",
    nav_github: "github",
    nav_contact: "contact",
    hero_greeting: "Hi, I am",
    hero_desc: "I'm a Backend / Full-Stack Developer currently looking for work in either role.",
    hero_resume: "resume.pdf",
    hero_contact: "contact --me",
  },
  es: {
    nav_about: "sobre-mi",
    nav_skills: "habilidades",
    nav_experience: "experiencia",
    nav_projects: "proyectos",
    nav_github: "github",
    nav_contact: "contacto",
    hero_greeting: "Hola, soy",
    hero_desc: "Soy desarrollador Backend / Full-Stack y busco trabajo en cualquiera de los dos roles.",
    hero_resume: "curriculum.pdf",
    hero_contact: "contactar --me",
  },
  fr: {
    nav_about: "a-propos",
    nav_skills: "competences",
    nav_experience: "experience",
    nav_projects: "projets",
    nav_github: "github",
    nav_contact: "contact",
    hero_greeting: "Bonjour, je suis",
    hero_desc: "Je suis développeur Backend / Full-Stack et je recherche un emploi dans l'un ou l'autre rôle.",
    hero_resume: "cv.pdf",
    hero_contact: "contact --moi",
  },
};
