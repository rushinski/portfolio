// Shared skill icon lookup — used by Skills, Projects, and Experience apps
export const SKILL_ICON_FILES = {
  // Languages
  JavaScript:       "javascript.png",
  TypeScript:       "typescript.png",
  Python:           "python.png",
  SQL:              "sql.svg",
  HTML:             "HTML5.png",
  CSS:              "CSS3.png",
  // Frameworks & Libraries
  "Node.js":        "nodejs.png",
  "Next.js":        "nextjs.png",
  React:            "react.png",
  "Tailwind CSS":   "tailwindcss.png",
  // Databases & Infrastructure
  PostgreSQL:       "PostgresSQL.png",
  MongoDB:          "mongodb.png",
  Redis:            "redis.png",
  Docker:           "docker.png",
  "AWS (SES)":      "AWS.png",
  "GitHub Actions": "githubactions.png",
  // Developer Tools
  Git:              "git.png",
  GitHub:           "github.png",
  Vercel:           "vercel.png",
  Upstash:          "upstash.svg",
  "Claude Code":    "anthropic.svg",
  Codex:            "openai.svg",
  // Legacy aliases (used in project/experience stacks)
  "Upstash Redis":  "upstash.svg",
  "GitHub Gist API":"github.png",
  "AWS SES":        "AWS.png",
  Stripe:           "stripe.webp",
  Supabase:         "Supabase.webp",
  "Discord.js":     "Discordjs.png",
  ADBKit:           "Android.png",
  "Tesseract.js":   "tesseract.png",
  "C#":             "csharp.webp",
  "ASP.NET":        "dotnet.png",
  "Digital Ocean":  "digitalocean.webp",
};

export function getSkillIconSrc(name) {
  const file = SKILL_ICON_FILES[name];
  return file ? `/skills/${file}` : null;
}
