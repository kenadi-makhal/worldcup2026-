export type Stage = "Group Stage" | "Round of 16" | "Round of 32" | "Quarter Final" | "Semi Final" | "3rd Place" | "Final";
export type Status = "LIVE" | "FT" | "Upcoming";

export interface Team {
  code: string; // ISO2 for flagcdn
  name: string;
  group: string;
  coach: string;
}

// Official FIFA World Cup 2026 draw (48 teams · 12 groups).
// Source: live football-data.org `/competitions/WC/teams` feed.
export const teams: Team[] = [
  // Group A
  { code: "mx", name: "Mexico", group: "A", coach: "—" },
  { code: "cz", name: "Czechia", group: "A", coach: "—" },
  { code: "za", name: "South Africa", group: "A", coach: "—" },
  { code: "kr", name: "South Korea", group: "A", coach: "—" },
  // Group B
  { code: "ca", name: "Canada", group: "B", coach: "—" },
  { code: "ch", name: "Switzerland", group: "B", coach: "—" },
  { code: "qa", name: "Qatar", group: "B", coach: "—" },
  { code: "ba", name: "Bosnia-Herzegovina", group: "B", coach: "—" },
  // Group C
  { code: "br", name: "Brazil", group: "C", coach: "—" },
  { code: "ma", name: "Morocco", group: "C", coach: "—" },
  { code: "gb-sct", name: "Scotland", group: "C", coach: "—" },
  { code: "ht", name: "Haiti", group: "C", coach: "—" },
  // Group D
  { code: "us", name: "USA", group: "D", coach: "—" },
  { code: "au", name: "Australia", group: "D", coach: "—" },
  { code: "py", name: "Paraguay", group: "D", coach: "—" },
  { code: "tr", name: "Turkey", group: "D", coach: "—" },
  // Group E
  { code: "de", name: "Germany", group: "E", coach: "—" },
  { code: "ec", name: "Ecuador", group: "E", coach: "—" },
  { code: "ci", name: "Ivory Coast", group: "E", coach: "—" },
  { code: "cw", name: "Curaçao", group: "E", coach: "—" },
  // Group F
  { code: "jp", name: "Japan", group: "F", coach: "—" },
  { code: "nl", name: "Netherlands", group: "F", coach: "—" },
  { code: "se", name: "Sweden", group: "F", coach: "—" },
  { code: "tn", name: "Tunisia", group: "F", coach: "—" },
  // Group G
  { code: "be", name: "Belgium", group: "G", coach: "—" },
  { code: "eg", name: "Egypt", group: "G", coach: "—" },
  { code: "ir", name: "Iran", group: "G", coach: "—" },
  { code: "nz", name: "New Zealand", group: "G", coach: "—" },
  // Group H
  { code: "es", name: "Spain", group: "H", coach: "—" },
  { code: "uy", name: "Uruguay", group: "H", coach: "—" },
  { code: "sa", name: "Saudi Arabia", group: "H", coach: "—" },
  { code: "cv", name: "Cape Verde", group: "H", coach: "—" },
  // Group I
  { code: "fr", name: "France", group: "I", coach: "—" },
  { code: "no", name: "Norway", group: "I", coach: "—" },
  { code: "sn", name: "Senegal", group: "I", coach: "—" },
  { code: "iq", name: "Iraq", group: "I", coach: "—" },
  // Group J
  { code: "ar", name: "Argentina", group: "J", coach: "—" },
  { code: "at", name: "Austria", group: "J", coach: "—" },
  { code: "dz", name: "Algeria", group: "J", coach: "—" },
  { code: "jo", name: "Jordan", group: "J", coach: "—" },
  // Group K
  { code: "pt", name: "Portugal", group: "K", coach: "—" },
  { code: "co", name: "Colombia", group: "K", coach: "—" },
  { code: "cd", name: "Congo DR", group: "K", coach: "—" },
  { code: "uz", name: "Uzbekistan", group: "K", coach: "—" },
  // Group L
  { code: "gb-eng", name: "England", group: "L", coach: "—" },
  { code: "hr", name: "Croatia", group: "L", coach: "—" },
  { code: "gh", name: "Ghana", group: "L", coach: "—" },
  { code: "pa", name: "Panama", group: "L", coach: "—" },
];

export const findTeam = (name: string) => teams.find((t) => t.name === name)!;

export interface Match {
  id: string;
  stage: Stage;
  group?: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string; // ISO
  venue: string;
  status: Status;
  minute?: number;
}

// Tournament starts 11 June 2026. Real fixtures stream in via football-data.org
// (see src/lib/football.functions.ts) — this list is only a placeholder shown
// when the live API is unreachable.
export const matches: Match[] = [
  { id: "m1", stage: "Group Stage", group: "A", home: "Mexico", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-11T20:00:00Z", venue: "Estadio Azteca, Mexico City", status: "Upcoming" },
  { id: "m2", stage: "Group Stage", group: "B", home: "Canada", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-12T20:00:00Z", venue: "BMO Field, Toronto", status: "Upcoming" },
  { id: "m3", stage: "Group Stage", group: "D", home: "USA", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-12T23:00:00Z", venue: "SoFi Stadium, Los Angeles", status: "Upcoming" },
];

export interface Player {
  id: string;
  name: string;
  country: string;
  position: "FWD" | "MID" | "DEF" | "GK";
  goals: number;
  assists: number;
  matches: number;
  passes: number;
  yellow: number;
  red: number;
  rating: number;
}

// Top scorers / assists populate from real match data once the tournament begins.
export const players: Player[] = [];

export interface StandingRow {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
}

const emptyRow = (team: string): StandingRow => ({
  team, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0,
});

export const standings: Record<string, StandingRow[]> = teams.reduce((acc, t) => {
  (acc[t.group] ??= []).push(emptyRow(t.name));
  return acc;
}, {} as Record<string, StandingRow[]>);

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  thumb: string;
  videoId?: string;
}

// Real news will be wired to a live feed. Empty until then to avoid fake stories.
export const news: NewsItem[] = [];

export const flag = (code: string, size: 40 | 80 | 160 = 80) =>
  `https://flagcdn.com/w${size}/${code}.png`;
