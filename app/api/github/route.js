import { NextResponse } from "next/server";
import { getGitHubData, isGitHubConfigured } from "@/lib/github";

export async function GET() {
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "No GitHub token configured" }, { status: 500 });
  }

  try {
    const data = await getGitHubData();
    if (!data) {
      return NextResponse.json({ error: "No GitHub data available" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
