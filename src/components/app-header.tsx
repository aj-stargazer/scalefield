import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppHeader({
  right,
  className,
}: {
  right?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-fg no-underline">
          <span className="flex size-7 items-center justify-center rounded-sm bg-bg-subtle shadow-[var(--shadow-border)]">
            <Layers className="size-3.5 text-primary" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Scale Field</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className="rounded-sm px-2.5 py-1.5 text-xs font-medium text-muted no-underline transition-colors hover:text-fg"
            activeProps={{ className: "text-fg" }}
            activeOptions={{ exact: true }}
          >
            Compare
          </Link>
          <Link
            to="/contribute"
            className="rounded-sm px-2.5 py-1.5 text-xs font-medium text-muted no-underline transition-colors hover:text-fg"
            activeProps={{ className: "text-fg" }}
          >
            Contribute
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
