import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { matches, type Stage } from "@/data/mockData";
import { MatchCard } from "@/components/MatchCard";

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
  const filtered = matches.filter((m) => m.stage === active);

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-2">
          Fixtures & Results
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Match Center</h1>
      </header>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-2 overflow-x-auto">
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

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No matches in this stage yet.</div>
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
