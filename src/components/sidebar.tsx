import { labels, languages } from "@/constants";
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
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
            Label
          </label>
          <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none">
            <option value="">Any Label</option>
            {labels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
            Sort By
          </label>
          <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none">
            <option value="created">Newest First</option>
            <option value="created-asc">Oldest First</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
