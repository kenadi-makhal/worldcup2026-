import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { matches, type Stage } from "@/data/mockData";
import { MatchCard } from "@/components/MatchCard";
import { Search, X } from "lucide-react";

const stages: Stage[] = ["Group Stage", "Round of 16", "Quarter Final", "Semi Final", "Final"];

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Match Center — World Cup 2026" },
      { name: "description", content: "All World Cup 2026 fixtures and results from group stage to the final." },
    ],
  }),
  component: MatchCenter,
});

function MatchCenter() {
  const [active, setActive] = useState<Stage>("Group Stage");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const byStage = matches.filter((m) => m.stage === active);
    if (!search.trim()) return byStage;
    const q = search.trim().toLowerCase();
    return byStage.filter(
      (m) => m.home.toLowerCase().includes(q) || m.away.toLowerCase().includes(q)
    );
  }, [active, search]);

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-2">
          Fixtures & Results
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Match Center</h1>
      </header>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2 border-b border-border pb-2 overflow-x-auto flex-1">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                active === s
                  ? "bg-gold text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by team..."
            className="w-full rounded-lg border border-border bg-card pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          {search.trim() ? `No matches found for "${search.trim()}".` : "No matches in this stage yet."}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <div key={m.id} style={{ animationDelay: `${i * 40}ms` }} className="animate-fade-up">
              <MatchCard match={m} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
