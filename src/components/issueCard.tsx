import { MatchedIssue } from "@/types/issue.types";
import { MessageSquareText, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type IssueCardProp = {
  issue: MatchedIssue;
};

export default function IssueCard({ issue }: IssueCardProp) {
  const formattedDate = new Date(issue.issue.created_at).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="card group p-5 hover:border-primary space-y-2">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Image
          src={issue.issue.user.avatar_url}
          height={48}
          width={48}
          alt={issue.issue.user.login}
          className="w-5 h-5 rounded-full"
        />

        {/* Repo Link */}
        <div>
          <Link
            href={`https://github.com/${issue.repoInfo.full_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary text-sm"
          >
            {issue.repoInfo.full_name}
          </Link>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary">
        <Link
          href={issue.issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {issue.issue.title}
        </Link>
      </h3>

      {/* Labels */}
      <div className="flex flex-wrap gap-2">
        {issue.issue.labels?.map((label) => (
          <span
            key={label?.name}
            className="badge my-2"
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

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Star size={16} />
            {issue.repoInfo.stargazers_count.toLocaleString()}
          </span>
          {issue.repoInfo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-ts"></span>
              {issue.repoInfo.language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <MessageSquareText size={16} />
          {issue.issue.comments}
        </div>
      </div>
    </div>
  );
}
