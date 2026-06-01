import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { players, findTeam, type Player } from "@/data/mockData";
import { Flag } from "@/components/Flag";
import { X, Star, Target, Zap } from "lucide-react";

export const Route = createFileRoute("/players")({
  head: () => ({
    meta: [
      { title: "Player Stats — World Cup 2026" },
      { name: "description", content: "Top scorers, assists and player performance from World Cup 2026." },
    ],
  }),
  component: Players,
});

type Filter = "all" | "country" | "position";

function Players() {
  const [selected, setSelected] = useState<Player | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [country, setCountry] = useState<string>("All");
  const [position, setPosition] = useState<string>("All");

  const countries = useMemo(() => ["All", ...Array.from(new Set(players.map((p) => p.country)))], []);
  const positions = ["All", "FWD", "MID", "DEF", "GK"];

  const list = useMemo(() => {
    return [...players]
      .filter((p) => filter !== "country" || country === "All" || p.country === country)
      .filter((p) => filter !== "position" || position === "All" || p.position === position)
      .sort((a, b) => b.goals - a.goals || b.assists - a.assists);
  }, [filter, country, position]);

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-2">
          Golden Boot Race
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Top Scorers</h1>
      </header>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex rounded-lg overflow-hidden border border-border">
          {(["all", "country", "position"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === f ? "bg-gold text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Players" : f === "country" ? "By Country" : "By Position"}
            </button>
          ))}
        </div>
        {filter === "country" && (
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium"
          >
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        )}
        {filter === "position" && (
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium"
          >
            {positions.map((p) => <option key={p}>{p}</option>)}
          </select>
        )}
      </div>

      <div className="gradient-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-deep/60 border-b border-border">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="text-left p-3 pl-5 font-bold">#</th>
                <th className="text-left p-3 font-bold">Player</th>
                <th className="text-left p-3 font-bold hidden md:table-cell">Country</th>
                <th className="text-center p-3 font-bold">Pos</th>
                <th className="text-center p-3 font-bold text-gold">G</th>
                <th className="text-center p-3 font-bold">A</th>
                <th className="text-center p-3 font-bold hidden sm:table-cell">MP</th>
                <th className="text-right p-3 pr-5 font-bold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p, i) => (
                <tr
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="p-3 pl-5">
                    <span className={`font-display text-base font-bold ${i < 3 ? "text-gold" : "text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <PlayerAvatar name={p.name} />
                      <span className="font-semibold">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Flag team={p.country} className="w-6 h-4" />
                      <span className="text-muted-foreground">{p.country}</span>
                    </div>
                  </td>
                  <td className="text-center p-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground">
                      {p.position}
                    </span>
                  </td>
                  <td className="text-center p-3 font-display text-lg font-bold text-gold tabular-nums">{p.goals}</td>
                  <td className="text-center p-3 tabular-nums">{p.assists}</td>
                  <td className="text-center p-3 tabular-nums hidden sm:table-cell">{p.matches}</td>
                  <td className="text-right p-3 pr-5 font-bold tabular-nums">{p.rating.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function PlayerAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="h-9 w-9 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold text-xs ring-2 ring-gold/30">
      {initials}
    </div>
  );
}

function PlayerModal({ player, onClose }: { player: Player; onClose: () => void }) {
  const team = findTeam(player.country);
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg gradient-card rounded-2xl border border-gold/30 shadow-gold p-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <PlayerAvatar name={player.name} />
          <div>
            <div className="font-display text-2xl font-bold">{player.name}</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flag team={player.country} className="w-5 h-3.5" />
              {team.name} · {player.position}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Stat icon={<Target className="h-4 w-4" />} label="Goals" value={player.goals} accent />
          <Stat icon={<Zap className="h-4 w-4" />} label="Assists" value={player.assists} />
          <Stat icon={<Star className="h-4 w-4" />} label="Rating" value={player.rating.toFixed(1)} />
        </div>

        <div className="space-y-2 text-sm">
          <Row label="Matches Played" value={player.matches} />
          <Row label="Passes Completed" value={player.passes} />
          <Row label="Yellow Cards" value={player.yellow} color="text-yellow-400" />
          <Row label="Red Cards" value={player.red} color="text-live" />
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-lg p-4 text-center ${accent ? "bg-gold/10 ring-1 ring-gold/30" : "bg-muted/50"}`}>
      <div className={`flex items-center justify-center mb-1 ${accent ? "text-gold" : "text-muted-foreground"}`}>{icon}</div>
      <div className="font-display text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: number | string; color?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold tabular-nums ${color ?? ""}`}>{value}</span>
    </div>
  );
}
