import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8 py-4 border-t text-center">
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <span>Built with</span>
        <span className="text-red-500">❤️</span>
        <span>
          by{" "}
          <Link
            href={"https://shakerullah.vercel.app"}
            className="text-foreground font-medium"
          >
            Shakerullah
          </Link>
        </span>
      </div>
    </footer>
  );
}
