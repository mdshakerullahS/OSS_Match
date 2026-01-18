import { GitHubIssue } from "@/types";
import { MessageSquareText, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type IssueCardProp = {
  issue: GitHubIssue;
};

export default function IssueCard({ issue }: IssueCardProp) {
  const formattedDate = new Date(issue.created_at).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="card h-full p-5 hover:border-primary group space-y-2">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Image
          src={issue.user.avatar_url}
          height={48}
          width={48}
          alt={issue.user.login}
          className="w-5 h-5 rounded-full"
        />

        <div>
          {/* Repo Link */}
          <Link
            href={`https://github.com/${issue.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary text-sm"
          >
            {issue.repoName}
          </Link>

          {/* Date */}
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary">
        <Link href={issue.html_url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </Link>
      </h3>

      {/* Labels */}
      <div className="flex flex-wrap my-2 gap-2">
        {issue.labels?.map((label) => (
          <span
            key={label?.name}
            className="badge"
            style={{
              backgroundColor: `#${label.color}22`,
              borderColor: `#${label.color}`,
              color: `#${label.color}`,
            }}
          >
            {label?.name}
          </span>
        ))}
      </div>
    </div>
  );
}
