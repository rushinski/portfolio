// Shared skill icon lookup — used by Skills, Projects, and Experience apps
export const SKILL_ICON_FILES = {
  TypeScript: "typescript.png",
  JavaScript: "javascript.png",
  Python: "python.png",
  Go: "go.png",
  Java: "java.png",
  "C++": "CPlusPlus.png",
  PHP: "php.png",
  HTML: "HTML5.png",
  CSS: "CSS3.png",
  "Node.js": "nodejs.png",
  "Next.js": "nextjs.png",
  Flask: "flask.png",
  React: "react.png",
  PostgreSQL: "PostgresSQL.png",
  MySQL: "mysql.png",
  MongoDB: "mongodb.png",
  Redis: "redis.png",
  "Tailwind CSS": "tailwindcss.png",
  Stripe: "stripe.webp",
  Supabase: "Supabase.webp",
  "Discord.js": "Discordjs.png",
  ADBKit: "Android.png",
  "AWS SES": "AWS.png",
  Docker: "docker.png",
  Git: "git.png",
  GitHub: "github.png",
  "GitHub Actions": "githubactions.png",
  Vercel: "vercel.png",
  "Upstash Redis": "redis.png",
  "GitHub Gist API": "github.png",
};

export function getSkillIconSrc(name) {
  const file = SKILL_ICON_FILES[name];
  return file ? `/skills/${file}` : null;
}
