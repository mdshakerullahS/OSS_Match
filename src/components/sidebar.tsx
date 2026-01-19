"use client";

import { labels, languages } from "@/constants";
import { Funnel, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  keywords: string;
  language: string;
  label: string;
  sortBy: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const params = new URLSearchParams();

    if (data.keywords.trim()) params.set("q", data.keywords);
    if (data.language) params.set("language", data.language);
    if (data.label) params.set("label", data.label);
    if (data.sortBy) params.set("sort", data.sortBy);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="lg:col-span-1 lg:h-full card p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex w-full rounded border bg-background px-3 py-2 text-sm items-center gap-2">
          <Search size={16} className="text-muted-foreground" />
          <input
            placeholder="Keywords (e.g. react, docker, authentication...)"
            type="text"
            {...register("keywords")}
            className="w-full placeholder:text-muted-foreground outline-none"
          />
        </div>

        <div className="flex items-center gap-2 font-semibold mb-6">
          <Funnel size={16} strokeWidth={2.5} />
          Filters
        </div>
        <div className="space-y-5 md:grid grid-cols-3 gap-2 lg:grid-cols-1">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
              Language
            </label>
            <select
              {...register("language")}
              className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none"
            >
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
            <select
              {...register("label")}
              className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none"
            >
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
            <select
              {...register("sortBy")}
              className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none"
            >
              <option value="created">Newest First</option>
              <option value="created-asc">Oldest First</option>
            </select>
          </div>
        </div>

        <button className="btn-primary w-full">Apply</button>
      </form>
    </aside>
  );
}
