import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { GitHubIssue } from "@/types";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.githubAccessToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const githubToken = session.githubAccessToken;

    const githubResponse = await fetch(
      `https://api.github.com/search/issues?q=state:open+label:"good first issue"`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!githubResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch GitHub issues" },
        { status: githubResponse.status }
      );
    }

    const { items } = await githubResponse.json();

    const issues: GitHubIssue[] = items?.map((i: any) => {
      const repoName = i.repository_url.split("/").slice(4).join("/");

      return {
        id: i.id,
        title: i.title,
        html_url: i.html_url,
        repoName,
        repository_url: `https://github.com/repo/${repoName}`,
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

    return NextResponse.json({ success: true, issues }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
