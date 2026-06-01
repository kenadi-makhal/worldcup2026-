import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { standings } from "@/data/mockData";
import { Flag } from "@/components/Flag";

const groups = Object.keys(standings);

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "Group Standings — World Cup 2026" },
      { name: "description", content: "Live point tables for all eight World Cup 2026 groups." },
    ],
  }),
  component: Standings,
});

function Standings() {
  const [active, setActive] = useState<string>("A");
  const table = standings[active];

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-2">
          Point Tables
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Group Standings</h1>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setActive(g)}
            className={`min-w-[52px] px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
              active === g
                ? "bg-gold text-primary-foreground shadow-gold"
                : "glass text-muted-foreground hover:text-foreground hover:border-gold"
            }`}
          >
            Group {g}
          </button>
        ))}
      </div>

      <div className="gradient-card rounded-xl border border-border overflow-hidden animate-fade-up">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-deep/60 border-b border-border">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="text-left p-3 pl-5 font-bold">#</th>
                <th className="text-left p-3 font-bold">Team</th>
                <th className="text-center p-3 font-bold">P</th>
                <th className="text-center p-3 font-bold">W</th>
                <th className="text-center p-3 font-bold">D</th>
                <th className="text-center p-3 font-bold">L</th>
                <th className="text-center p-3 font-bold hidden sm:table-cell">GF</th>
                <th className="text-center p-3 font-bold hidden sm:table-cell">GA</th>
                <th className="text-center p-3 font-bold">GD</th>
                <th className="text-right p-3 pr-5 font-bold text-gold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => {
                const qualified = i < 2;
                return (
                  <tr
                    key={row.team}
                    className={`border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors ${
                      qualified ? "bg-pitch/5" : ""
                    }`}
                  >
                    <td className="p-3 pl-5">
                      <div className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                        qualified ? "bg-pitch text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {i + 1}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Flag team={row.team} className="w-7 h-5" />
                        <span className="font-semibold">{row.team}</span>
                      </div>
                    </td>
                    <td className="text-center tabular-nums p-3">{row.played}</td>
                    <td className="text-center tabular-nums p-3">{row.won}</td>
                    <td className="text-center tabular-nums p-3">{row.drawn}</td>
                    <td className="text-center tabular-nums p-3">{row.lost}</td>
                    <td className="text-center tabular-nums p-3 hidden sm:table-cell">{row.gf}</td>
                    <td className="text-center tabular-nums p-3 hidden sm:table-cell">{row.ga}</td>
                    <td className="text-center tabular-nums p-3">{row.gf - row.ga > 0 ? "+" : ""}{row.gf - row.ga}</td>
                    <td className="text-right p-3 pr-5 font-display font-bold text-gold tabular-nums text-base">
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-pitch" />
          Qualified for Round of 16
        </div>
      </div>
    </div>
  );
}
