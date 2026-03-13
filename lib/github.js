const GH_API = "https://api.github.com";
const GH_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "rushinski";
const TOKEN = process.env.GITHUB_TOKEN;

const COMMON_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

const PINNED_REPOS = ["rdk-webstore", "Discord-Bot-Unity", "Discord-Title-Bot"];

function getHeaders(extraHeaders = {}) {
  return {
    ...COMMON_HEADERS,
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    ...extraHeaders,
  };
}

async function readJson(response, label) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${label} failed with status ${response.status}`);
  }

  return data;
}

export function isGitHubConfigured() {
  return Boolean(TOKEN);
}

export async function getGitHubData() {
  if (!TOKEN) {
    return null;
  }

  const [graphqlData, repos] = await Promise.all([
    fetch(GH_GRAPHQL, {
      method: "POST",
      headers: getHeaders({ "Content-Type": "application/json" }),
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
    }).then((response) => readJson(response, "GitHub GraphQL request")),
    fetch(`${GH_API}/users/${USERNAME}/repos?per_page=100&sort=updated`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }).then((response) => readJson(response, "GitHub repos request")),
  ]);

  if (graphqlData.errors) {
    throw new Error(graphqlData.errors[0]?.message || "GitHub GraphQL error");
  }

  const userData = graphqlData?.data?.user;
  const reposList = Array.isArray(repos) ? repos : [];

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

  const pinnedRepos = PINNED_REPOS
    .map((name) => {
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
    })
    .filter(Boolean);

  return {
    name: userData?.name,
    bio: userData?.bio,
    avatarUrl: userData?.avatarUrl,
    contributionCalendar: userData?.contributionsCollection?.contributionCalendar,
    topLanguages,
    pinnedRepos,
  };
}
