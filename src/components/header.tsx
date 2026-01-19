"use client";

import { Github, Search } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="card border-border py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-primary p-2 rounded text-background shadow-lg shadow-primary/20">
            <Github />
          </div>
          <h1 className="text-2xl font-bold">OSS Match</h1>
        </div>

        <button
          onClick={() =>
            session?.githubAccessToken
              ? signOut({ callbackUrl: "/" })
              : signIn("github", { callbackUrl: "/" })
          }
          className="btn-primary whitespace-nowrap"
        >
          {status === "loading"
            ? "Loading..."
            : `Sign ${status === "unauthenticated" ? "In" : "Out"}`}
        </button>
      </div>
    </header>
  );
}
