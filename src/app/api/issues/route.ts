import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { GitHubIssue } from "@/types";
import { headers } from "next/headers";
import { anonLimiter } from "@/lib/ratelimit";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const token = session?.githubAccessToken || process.env.GITHUB_ACCESS_TOKEN;
    const isUser = !!session?.githubAccessToken;

    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    const { success } = await anonLimiter.limit(ip);

    if (!isUser) {
      if (!success) {
        return NextResponse.json(
          {
            success: false,
            error: "Rate limit exceeded",
            suggestion: "Sign in with GitHub to get more limits(5000req/hr)",
          },
          { status: 429 },
        );
      }
    }

    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q");
    const label = searchParams.get("label");
    const language = searchParams.get("language");

    const queryParts = ["state:open", "is:issue"];
    if (q) queryParts.push(q);
    if (label) queryParts.push(`label:"${label}"`);
    if (language) queryParts.push(`language:${language}`);

    const githubQuery = queryParts.join(" ");

    const githubResponse = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(githubQuery)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    const data = await githubResponse.json();
    console.log(data.message);

    if (!githubResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Failed to fetch GitHub issues",
        },
        { status: githubResponse.status },
      );
    }

    const issues: GitHubIssue[] = data.items?.map((i: any) => {
      const repoName = i.repository_url.split("/").slice(4).join("/");

      return {
        id: i.id,
        title: i.title,
        html_url: i.html_url,
        repoName,
        repository_url: `https://github.com/${repoName}`,
        labels:
          i.labels?.map((l: any) => ({
            name: l.name,
            color: l.color,
          })) || [],
        user: i.user
          ? {
              login: i.user.login,
              avatar_url: i.user.avatar_url,
            }
          : null,
        created_at: i.created_at,
        updated_at: i.updated_at,
        body: i.body,
      };
    });

    console.log(issues);

    return NextResponse.json({ success: true, issues }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
