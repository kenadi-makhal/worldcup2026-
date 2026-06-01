import { teams, flag } from "@/data/mockData";

interface FlagProps {
  team: string;
  size?: 40 | 80 | 160;
  className?: string;
}

export function Flag({ team, size = 80, className = "" }: FlagProps) {
  const t = teams.find((x) => x.name === team);
  if (team === "TBD" || !t) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-muted text-[10px] font-bold text-muted-foreground ${className}`}>
        {team === "TBD" || !team ? "?" : team.slice(0, 3).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={flag(t.code, size)}
      alt={`${t.name} flag`}
      loading="lazy"
      className={`object-cover rounded-sm shadow-md ring-1 ring-border ${className}`}
    />
  );
}
