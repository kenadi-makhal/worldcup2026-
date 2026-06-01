import { createFileRoute, Link } from "@tanstack/react-router";
import { teams, matches } from "@/data/mockData";
import { Flag } from "@/components/Flag";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams — World Cup 2026" },
      { name: "description", content: "All 32 national teams competing in World Cup 2026, with squads and coaches." },
    ],
  }),
  component: Teams,
});

function Teams() {
  const grouped = teams.reduce<Record<string, typeof teams>>((acc, t) => {
    (acc[t.group] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-2">
          32 Nations · 1 Trophy
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Team Profiles</h1>
      </header>

      <div className="space-y-10">
        {Object.entries(grouped).map(([group, list]) => (
          <section key={group}>
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg gradient-gold text-primary-foreground">
                {group}
              </span>
              Group {group}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((t) => {
                const teamMatches = matches.filter((m) => m.home === t.name || m.away === t.name);
                return (
                  <Link
                    key={t.name}
                    to="/teams/$name"
                    params={{ name: t.name }}
                    className="gradient-card rounded-xl border border-border p-5 hover-lift group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Flag team={t.name} className="w-12 h-9" />
                      <div>
                        <div className="font-display font-bold text-lg leading-tight">{t.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Group {t.group}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-3 truncate">
                      Coach: <span className="text-foreground">{t.coach}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{teamMatches.length} matches</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
