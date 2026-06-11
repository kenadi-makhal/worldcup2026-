import { createServerFn } from "@tanstack/react-start";
import type { Match, Stage, Status } from "@/data/mockData";

// Map football-data.org team names → names used in our local `teams` array
const NAME_MAP: Record<string, string> = {
  "United States": "USA",
  "Korea Republic": "South Korea",
  "Korea, Republic of": "South Korea",
  "IR Iran": "Iran",
  "Iran (Islamic Republic of)": "Iran",
  "Côte d'Ivoire": "Ivory Coast",
  "Cote d'Ivoire": "Ivory Coast",
  "Cape Verde Islands": "Cape Verde",
  "Türkiye": "Turkey",
  "Czech Republic": "Czechia",
};

const STAGE_MAP: Record<string, Stage> = {
  GROUP_STAGE: "Group Stage",
  LAST_32: "Round of 32",
  LAST_16: "Round of 16",
  QUARTER_FINALS: "Quarter Final",
  SEMI_FINALS: "Semi Final",
  FINAL: "Final",
  THIRD_PLACE: "3rd Place",
};

function mapStatus(s: string): Status {
  if (s === "IN_PLAY" || s === "PAUSED" || s === "LIVE") return "LIVE";
  if (s === "FINISHED" || s === "AWARDED") return "FT";
  return "Upcoming";
}

function mapName(name: string | null | undefined): string {
  if (!name) return "TBD";
  return NAME_MAP[name] ?? name;
}

export const getWorldCupMatches = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ matches: Match[]; error: string | null; live: boolean }> => {
    const token = process.env.FOOTBALL_DATA_API_KEY;
    if (!token) {
      return { matches: [], error: "Football API key not configured", live: false };
    }

    try {
      const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
        headers: { "X-Auth-Token": token },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("football-data error", res.status, text);
        return { matches: [], error: `API error (${res.status})`, live: false };
      }

      const json = (await res.json()) as {
        matches?: Array<{
          id: number;
          utcDate: string;
          status: string;
          stage: string;
          group?: string | null;
          minute?: number | null;
          venue?: string | null;
          homeTeam: { name?: string | null };
          awayTeam: { name?: string | null };
          score: {
            fullTime: { home: number | null; away: number | null };
          };
        }>;
      };

      const matches: Match[] = (json.matches ?? []).map((m) => {
        const stage = STAGE_MAP[m.stage] ?? "Group Stage";
        const status = mapStatus(m.status);
        const group = m.group?.replace(/^GROUP_/, "") ?? undefined;
        return {
          id: String(m.id),
          stage,
          group,
          home: mapName(m.homeTeam?.name),
          away: mapName(m.awayTeam?.name),
          homeScore: m.score.fullTime.home,
          awayScore: m.score.fullTime.away,
          date: m.utcDate,
          venue: m.venue ?? "TBD",
          status,
          minute: m.minute ?? undefined,
        };
      });

      return { matches, error: null, live: true };
    } catch (e) {
      console.error("getWorldCupMatches failed", e);
      return { matches: [], error: "Failed to fetch matches", live: false };
    }
  }
);
