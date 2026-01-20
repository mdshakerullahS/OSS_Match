"use client";

import { Github, Loader2, Monitor, Moon, Sun } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { name: "Light", value: "light", icon: <Sun size={16} /> },
    { name: "Dark", value: "dark", icon: <Moon size={16} /> },
    { name: "System", value: "system", icon: <Monitor size={16} /> },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <header className="card border-border py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-primary p-2 rounded text-background shadow-lg shadow-primary/20">
            <Github />
          </div>
          <h1 className="text-2xl font-bold">OSS Match</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-3 border rounded-md bg-background hover:bg-accent transition-colors text-sm font-medium cursor-pointer"
            >
              {currentTheme.icon}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-36 border border-border rounded-md bg-background shadow-xl z-50 overflow-hidden">
                {themes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors hover:bg-accent cursor-pointer ${
                      theme === t.value
                        ? "text-primary bg-accent/50"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.icon}
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() =>
              session?.githubAccessToken
                ? signOut({ callbackUrl: "/" })
                : signIn("github", { callbackUrl: "/" })
            }
            className="btn-primary whitespace-nowrap"
          >
            {status === "loading" ? (
              <Loader2 className="animate-spin" />
            ) : (
              `Sign ${status === "unauthenticated" ? "In" : "Out"}`
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
