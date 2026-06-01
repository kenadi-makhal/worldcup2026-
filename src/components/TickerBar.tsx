import { matches } from "@/data/mockData";

export function TickerBar() {
  const recent = matches.filter((m) => m.status !== "Upcoming").slice(0, 10);
  const items = [...recent, ...recent]; // double for seamless loop

  return (
    <div className="relative overflow-hidden border-y border-border bg-navy-deep/80 py-2">
      <div className="flex w-max animate-ticker gap-8 whitespace-nowrap">
        {items.map((m, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            {m.status === "LIVE" && (
              <span className="inline-flex h-2 w-2 rounded-full bg-live animate-pulse" />
            )}
            <span
              className={`font-bold text-[10px] uppercase tracking-widest ${
                m.status === "LIVE" ? "text-live" : "text-gold"
              }`}
            >
              {m.status === "LIVE" ? `${m.minute}'` : "FT"}
            </span>
            <span className="font-semibold text-foreground">{m.home}</span>
            <span className="font-mono font-bold text-gold">
              {m.homeScore} – {m.awayScore}
            </span>
            <span className="font-semibold text-foreground">{m.away}</span>
            <span className="text-muted-foreground">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
