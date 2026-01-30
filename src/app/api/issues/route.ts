import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { GitHubIssue } from "@/types";
import { headers } from "next/headers";
import { rateLimiter } from "@/lib/ratelimit";
import { redis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const { searchParams } = req.nextUrl;

    const sortedParams = new URLSearchParams(searchParams);
    sortedParams.sort();

    const cacheKey = `issues:${sortedParams.toString() || "all"}`;

    const cached = await redis.get<GitHubIssue[]>(cacheKey);

    if (cached) {
      return NextResponse.json(
        {
          success: true,
          issues: cached,
          source: "Cache",
        },
        { status: 200 },
      );
    }

    const token = session?.githubAccessToken || process.env.GITHUB_ACCESS_TOKEN;
    const isUser = !!session?.githubAccessToken;

    const ip = (await headers()).get("x-forwarded-for") || "anonymous";

    try {
      if ("limit" in rateLimiter) {
        const { success } = await rateLimiter.limit(ip);
        if (!success && !isUser) throw new Error("RATE_LIMIT");
      } else {
        await rateLimiter.consume(ip);
      }
    } catch (err: any) {
      if (!isUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Rate limit exceeded",
            suggestion: "Sign in with GitHub to get more limit (5000 req/hr)",
          },
          { status: 429 },
        );
      }
    }

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

    if (!githubResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "GitHub API Error",
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

    redis.set(cacheKey, issues, 300);

    return NextResponse.json(
      { success: true, issues, source: "API" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
