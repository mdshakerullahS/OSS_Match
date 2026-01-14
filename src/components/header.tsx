import { Github, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="card border-border py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-primary p-2 rounded text-background shadow-lg shadow-primary/20">
            <Github />
          </div>
          <h1 className="text-2xl font-bold">OSS Match</h1>
        </div>
        <form className="w-full max-w-md hidden lg:block">
          <div className="flex w-full rounded border bg-background px-3 py-2 text-sm items-center gap-2">
            <Search size={16} className="text-muted-foreground" />
            <input
              placeholder="Keywords (e.g. react, docker, authentication...)"
              type="text"
              className="w-full placeholder:text-muted-foreground outline-none"
            />
          </div>
        </form>

        <button className="btn-primary whitespace-nowrap">Sign In</button>
      </div>
    </header>
  );
}
