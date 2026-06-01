import type { Match } from "@/data/mockData";
import { Flag } from "./Flag";
import { MapPin, Clock } from "lucide-react";

export function StatusBadge({ status, minute }: { status: Match["status"]; minute?: number }) {
  if (status === "LIVE") {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-live ring-1 ring-live/40">
        <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse" />
        Live {minute ? `${minute}'` : ""}
      </div>
    );
  }
  if (status === "FT") {
    return (
      <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Full Time
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold ring-1 ring-gold/40">
      Upcoming
    </span>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const date = new Date(match.date);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="group relative gradient-card rounded-xl border border-border p-5 hover-lift overflow-hidden">
      {match.status === "LIVE" && (
        <div className="absolute inset-x-0 top-0 h-0.5 bg-live animate-pulse" />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {match.group ? `Group ${match.group}` : match.stage}
        </div>
        <StatusBadge status={match.status} minute={match.minute} />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex flex-col items-center text-center gap-2">
          <Flag team={match.home} className="w-14 h-10" />
          <div className="font-display font-bold text-sm tracking-wide truncate w-full">{match.home}</div>
        </div>

        <div className="flex flex-col items-center min-w-[80px]">
          {match.homeScore !== null ? (
            <div className="font-display text-3xl font-bold text-gold tabular-nums">
              {match.homeScore} <span className="text-muted-foreground">–</span> {match.awayScore}
            </div>
          ) : (
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">vs</div>
          )}
          <div className="text-[10px] text-muted-foreground mt-1 tabular-nums">{timeStr}</div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <Flag team={match.away} className="w-14 h-10" />
          <div className="font-display font-bold text-sm tracking-wide truncate w-full">{match.away}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          {dateStr}
        </div>
        <div className="flex items-center gap-1.5 truncate ml-2">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{match.venue}</span>
        </div>
      </div>
    </div>
  );
}
