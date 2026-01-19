"use client";

import { GitHubIssue } from "@/types";
import IssueCard from "./issueCard";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Issues() {
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const pathname = usePathname();

  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/issues?${paramsString}`);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch issues");
      }

      setIssues(data.issues);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [paramsString]);

  return (
    <div className="lg:max-h-[calc(100vh-106px)] lg:overflow-scroll lg:col-span-3 space-y-2 hide-scrollbar">
      <div className="text-sm  font-medium text-muted-foreground">{`Found ${issues?.length} matched issues`}</div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium animate-pulse">
            Scanning GitHub for opportunities...
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}.</p>

          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                signIn("github", { callbackUrl: pathname + "?" + paramsString })
              }
              className="text-sm font-semibold underline cursor-pointer"
            >
              Sign in
            </button>
            <p className="text-sm font-medium">
              with GitHub to get more limits(5000 req/hr).
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {issues?.map((i) => (
          <IssueCard key={i.id} issue={i} />
        ))}
      </div>
    </div>
  );
}
