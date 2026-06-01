import { createFileRoute, Link } from "@tanstack/react-router";
import { matches } from "@/data/mockData";
import { MatchCard, StatusBadge } from "@/components/MatchCard";
import { TickerBar } from "@/components/TickerBar";
import { Flag } from "@/components/Flag";
import { ArrowRight, Calendar, Trophy } from "lucide-react";
import stadium from "@/assets/stadium-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Live Dashboard — World Cup 2026" },
      { name: "description", content: "Live scores, today's fixtures and featured matches from the FIFA World Cup 2026." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const live = matches.filter((m) => m.status === "LIVE");
  const upcoming = matches.filter((m) => m.status === "Upcoming").slice(0, 4);
  const recent = matches.filter((m) => m.status === "FT").slice(0, 3);
  const featured = live[0] ?? matches[0];

  return (
    <div>
      <TickerBar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={stadium}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
              <Trophy className="h-3.5 w-3.5 text-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                USA · Canada · Mexico 2026
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              THE WORLD
              <br />
              <span className="text-gold">PLAYS HERE.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
              Every goal, every save, every moment from the 23rd FIFA World Cup —
              tracked live across 48 nations and 16 host cities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/matches"
                className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-bold uppercase tracking-wider text-sm rounded-lg px-6 py-3 shadow-gold hover:scale-105 transition-transform"
              >
                Watch Matches <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/standings"
                className="inline-flex items-center gap-2 glass text-foreground font-bold uppercase tracking-wider text-sm rounded-lg px-6 py-3 hover:border-gold transition-colors"
              >
                Group Standings
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { v: "48", l: "Nations" },
              { v: "104", l: "Matches" },
              { v: "16", l: "Host Cities" },
              { v: live.length.toString(), l: "Live Now", live: true },
            ].map((s) => (
              <div key={s.l} className="glass rounded-lg p-4">
                <div className={`font-display text-3xl font-bold tabular-nums ${s.live ? "text-live" : "text-gold"}`}>
                  {s.v}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MATCH */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader title="Featured Match" subtitle="Don't miss the action" />
        <div className="relative overflow-hidden rounded-2xl border-2 border-gold/30 gradient-card shadow-gold p-8 md:p-12">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-pitch/10 blur-3xl" />

          <div className="relative flex items-center justify-between mb-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              {featured.group ? `Group ${featured.group}` : featured.stage}
            </div>
            <StatusBadge status={featured.status} minute={featured.minute} />
          </div>

          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <Flag team={featured.home} size={160} className="w-24 h-16 md:w-32 md:h-20 animate-float" />
              <div className="font-display text-xl md:text-3xl font-bold tracking-wide">{featured.home}</div>
            </div>
            <div className="font-display text-5xl md:text-7xl font-bold text-gold tabular-nums">
              {featured.homeScore ?? "–"}
              <span className="text-muted-foreground mx-2">:</span>
              {featured.awayScore ?? "–"}
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Flag team={featured.away} size={160} className="w-24 h-16 md:w-32 md:h-20 animate-float" />
              <div className="font-display text-xl md:text-3xl font-bold tracking-wide">{featured.away}</div>
            </div>
          </div>

          <div className="relative mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            {featured.venue}
          </div>
        </div>
      </section>

      {/* TODAY'S MATCHES */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader
          title="Today's Matches"
          subtitle="Live & upcoming fixtures"
          link={{ to: "/matches", label: "All Matches" }}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...live, ...upcoming].slice(0, 6).map((m, i) => (
            <div key={m.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-up">
              <MatchCard match={m} />
            </div>
          ))}
        </div>
      </section>

      {/* RECENT RESULTS */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader title="Recent Results" subtitle="Latest full-time scores" />
        <div className="grid gap-4 md:grid-cols-3">
          {recent.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  link,
}: {
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-1">
          <Calendar className="h-3 w-3" /> {subtitle}
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      </div>
      {link && (
        <Link
          to={link.to as "/matches"}
          className="hidden md:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
        >
          {link.label} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
