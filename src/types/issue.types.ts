export interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  labels: { name: string; color: string }[];
  user: { login: string; avatar_url: string };
  created_at: string;
  updated_at: string;
  body: string;
  comments: number;
  reactions?: { [key: string]: number };
}

export interface RepositoryInfo {
  full_name: string;
  stargazers_count: number;
  language: string;
}

export interface MatchedIssue {
  repoInfo: RepositoryInfo;
  issue: GitHubIssue;
}

export enum SortOption {
  NEWEST = "created",
  OLDEST = "created-asc",
  STARS = "stars",
  COMMENTS = "comments",
}

export interface SearchFilters {
  keywords: string;
  language: string;
  label: string;
  sort: SortOption;
}
