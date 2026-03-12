import { NextResponse } from "next/server";

const GH_API = "https://api.github.com";
const GH_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "rushinski";
const TOKEN = process.env.GITHUB_TOKEN;

const commonHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const PINNED_REPOS = ["rdk-webstore", "Discord-Bot-Unity", "Discord-Title-Bot"];

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ error: "No GitHub token configured" }, { status: 500 });
  }

  try {
    const [graphqlRes, reposRes, eventsRes] = await Promise.all([
      fetch(GH_GRAPHQL, {
        method: "POST",
        headers: { ...commonHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            user(login: "${USERNAME}") {
              name
              bio
              avatarUrl
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      weekday
                    }
                  }
                }
              }
            }
          }`,
        }),
        next: { revalidate: 3600 },
      }),
      fetch(`${GH_API}/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers: commonHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(`${GH_API}/users/${USERNAME}/events/public?per_page=30`, {
        headers: commonHeaders,
        next: { revalidate: 60 },
      }),
    ]);

    const [graphqlData, repos, events] = await Promise.all([
      graphqlRes.json(),
      reposRes.json(),
      eventsRes.json(),
    ]);

    if (graphqlData.errors) {
      throw new Error(graphqlData.errors[0]?.message || "GraphQL error");
    }

    const userData = graphqlData?.data?.user;
    const reposList = Array.isArray(repos) ? repos : [];
    const eventsList = Array.isArray(events) ? events : [];

    const langMap = {};
    for (const repo of reposList) {
      if (repo.language && !repo.fork) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    }

    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count }));

    const pinnedRepos = PINNED_REPOS.map((name) => {
      const repo = reposList.find((candidate) => candidate.name === name);
      if (!repo) {
        return null;
      }

      return {
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
      };
    }).filter(Boolean);

    const recentCommits = [];
    for (const event of eventsList) {
      if (event.type === "PushEvent" && event.payload?.commits) {
        for (const commit of event.payload.commits.slice(0, 2)) {
          recentCommits.push({
            message: commit.message.split("\n")[0].slice(0, 55),
            repo: (event.repo?.name ?? "").replace(`${USERNAME}/`, ""),
            date: (event.created_at ?? "").slice(0, 10),
          });

          if (recentCommits.length >= 7) {
            break;
          }
        }
      }

      if (recentCommits.length >= 7) {
        break;
      }
    }

    return NextResponse.json({
      name: userData?.name,
      bio: userData?.bio,
      avatarUrl: userData?.avatarUrl,
      contributionCalendar: userData?.contributionsCollection?.contributionCalendar,
      topLanguages,
      pinnedRepos,
      recentCommits,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
