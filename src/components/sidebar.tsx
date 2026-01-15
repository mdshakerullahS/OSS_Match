import { Funnel, Search } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="lg:col-span-1 lg:h-full card p-5 space-y-6">
      <form className="w-full max-w-md lg:hidden">
        <div className="flex w-full rounded border bg-background px-3 py-2 text-sm items-center gap-2">
          <Search size={16} className="text-muted-foreground" />
          <input
            placeholder="Keywords (e.g. react, docker, authentication...)"
            type="text"
            className="w-full placeholder:text-muted-foreground outline-none"
          />
        </div>
      </form>

      <div className="flex items-center gap-2 font-semibold mb-6">
        <Funnel size={16} strokeWidth={2.5} />
        Filters
      </div>
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
            Language
          </label>
          <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none">
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="Rust">Rust</option>
            <option value="Go">Go</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Ruby">Ruby</option>
            <option value="PHP">PHP</option>
            <option value="Swift">Swift</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
            Label
          </label>
          <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none">
            <option value="">Any Label</option>
            <option value="good first issue">good first issue</option>
            <option value="help wanted">help wanted</option>
            <option value="bug">bug</option>
            <option value="enhancement">enhancement</option>
            <option value="documentation">documentation</option>
            <option value="hacktoberfest">hacktoberfest</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
            Sort By
          </label>
          <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none">
            <option value="created">Newest First</option>
            <option value="created-asc">Oldest First</option>
            <option value="stars">Repo Popularity (Stars)</option>
            <option value="comments">Most Discussed</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
