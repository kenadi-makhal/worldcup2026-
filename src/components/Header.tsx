import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/matches", label: "Matches" },
  { to: "/standings", label: "Standings" },
  { to: "/players", label: "Players" },
  { to: "/teams", label: "Teams" },
  { to: "/news", label: "News" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Trophy className="h-7 w-7 text-gold transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 blur-md bg-gold/40 -z-10" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-wider text-foreground">
              WORLD CUP <span className="text-gold">2026</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">
              Live Tracker
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative px-4 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-gold data-[status=active]:after:absolute data-[status=active]:after:left-3 data-[status=active]:after:right-3 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:bg-gold data-[status=active]:after:rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border/50 bg-navy-deep/95 backdrop-blur-xl animate-fade-up">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border/30 last:border-0 data-[status=active]:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
