import type { Match, StandingRow } from "@/data/mockData";
import { teams, standings as emptyStandings } from "@/data/mockData";

export function computeStandings(matches: Match[]): Record<string, StandingRow[]> {
  // Initialize a fresh blank table from the official team/group config
  const table: Record<string, Record<string, StandingRow>> = {};
  for (const t of teams) {
    (table[t.group] ??= {})[t.name] = {
      team: t.name, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0,
    };
  }

  const teamGroup = new Map(teams.map((t) => [t.name, t.group]));

  for (const m of matches) {
    if (m.stage !== "Group Stage") continue;
    if (m.status !== "FT") continue;
    if (m.homeScore == null || m.awayScore == null) continue;

    const g = teamGroup.get(m.home) ?? teamGroup.get(m.away);
    if (!g || !table[g]) continue;
    const home = table[g][m.home];
    const away = table[g][m.away];
    if (!home || !away) continue;

    home.played++; away.played++;
    home.gf += m.homeScore; home.ga += m.awayScore;
    away.gf += m.awayScore; away.ga += m.homeScore;

    if (m.homeScore > m.awayScore) {
      home.won++; home.points += 3; away.lost++;
    } else if (m.homeScore < m.awayScore) {
      away.won++; away.points += 3; home.lost++;
    } else {
      home.drawn++; away.drawn++;
      home.points++; away.points++;
    }
  }

  const out: Record<string, StandingRow[]> = {};
  for (const group of Object.keys(emptyStandings)) {
    const rows = Object.values(table[group] ?? {});
    rows.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.gf - a.ga, gdB = b.gf - b.ga;
      if (gdB !== gdA) return gdB - gdA;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.localeCompare(b.team);
    });
    out[group] = rows;
  }
  return out;
}
