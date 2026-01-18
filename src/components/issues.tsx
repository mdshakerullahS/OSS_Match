"use client";

import { GitHubIssue } from "@/types";
import IssueCard from "./issueCard";
import { useEffect, useState } from "react";

export default function Issues() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);

  const fetchIssues = async () => {
    try {
      const res = await fetch("/api/issues");

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setIssues(data.issues);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="lg:max-h-[calc(100vh-106px)] lg:overflow-scroll lg:col-span-3 space-y-2">
      <div className="text-sm  font-medium text-muted-foreground">{`Found ${issues?.length} matched issues`}</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {issues?.length &&
          issues?.map((i, idx) => <IssueCard key={idx} issue={i} />)}
      </div>
    </div>
  );
}
