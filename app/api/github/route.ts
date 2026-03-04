import { NextResponse } from "next/server";

const GH_API = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "rushinski";
const TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

export async function GET() {
  try {
    // Fetch user profile + repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GH_API}/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`${GH_API}/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API error: ${userRes.status} / ${reposRes.status}`);
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Aggregate language stats
    const langMap: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    }
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count }));

    // Total stars
    const totalStars = repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0);

    // Most recently updated public repos (not forks, top 6)
    const featuredRepos = repos
      .filter((r: { fork: boolean }) => !r.fork)
      .slice(0, 6)
      .map((r: {
        name: string;
        description: string;
        html_url: string;
        language: string;
        stargazers_count: number;
        forks_count: number;
        updated_at: string;
        topics: string[];
      }) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
        topics: r.topics,
      }));

    return NextResponse.json({
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages,
      featuredRepos,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
