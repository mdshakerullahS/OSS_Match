export interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  repoName: string;
  repository_url: string;
  labels: { name: string; color: string }[];
  user: { login: string; avatar_url: string };
  created_at: string;
  updated_at: string;
  body: string;
}

export interface SearchFilters {
  keywords: string;
  language: string;
  label: string;
}
