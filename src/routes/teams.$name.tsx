import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { teams, matches } from "@/data/mockData";
import { Flag } from "@/components/Flag";
import { MatchCard } from "@/components/MatchCard";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/teams/$name")({
  loader: ({ params }) => {
    const team = teams.find((t) => t.name === params.name);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.team.name ?? "Team"} — World Cup 2026` },
      { name: "description", content: `${loaderData?.team.name ?? "Team"} schedule, squad and results at World Cup 2026.` },
    ],
  }),
  component: TeamDetail,
  notFoundComponent: () => (
    <div className="container mx-auto py-20 text-center">
      <p className="text-muted-foreground">Team not found.</p>
      <Link to="/teams" className="text-gold underline mt-2 inline-block">Back to Teams</Link>
    </div>
  ),
});

function TeamDetail() {
  const { team } = Route.useLoaderData();
  const teamMatches = matches.filter((m) => m.home === team.name || m.away === team.name);

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/teams" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-gold mb-6">
        <ArrowLeft className="h-3 w-3" /> All Teams
      </Link>

      <header className="gradient-card rounded-2xl border border-gold/30 p-8 md:p-10 mb-10 shadow-gold relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex items-center gap-6">
          <Flag team={team.name} size={160} className="w-28 h-20 md:w-36 md:h-24" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-1">
              Group {team.group}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold">{team.name}</h1>
            {team.coach && team.coach !== "—" && (
              <div className="mt-2 text-sm text-muted-foreground">Head Coach: <span className="text-foreground font-semibold">{team.coach}</span></div>
            )}
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-display text-2xl font-bold mb-4">Fixtures & Results</h2>
        {teamMatches.length === 0 ? (
          <p className="text-muted-foreground">No matches scheduled yet — fixtures appear here as the live feed updates.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {teamMatches.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        )}
      </section>
    </div>
  );
}
