export type Stage = "Group Stage" | "Round of 16" | "Quarter Final" | "Semi Final" | "Final";
export type Status = "LIVE" | "FT" | "Upcoming";

export interface Team {
  code: string; // ISO2 for flagcdn
  name: string;
  group: string;
  coach: string;
}

export const teams: Team[] = [
  { code: "us", name: "USA", group: "A", coach: "Mauricio Pochettino" },
  { code: "mx", name: "Mexico", group: "A", coach: "Javier Aguirre" },
  { code: "ca", name: "Canada", group: "A", coach: "Jesse Marsch" },
  { code: "ec", name: "Ecuador", group: "A", coach: "Sebastián Beccacece" },
  { code: "br", name: "Brazil", group: "B", coach: "Dorival Júnior" },
  { code: "ar", name: "Argentina", group: "B", coach: "Lionel Scaloni" },
  { code: "uy", name: "Uruguay", group: "B", coach: "Marcelo Bielsa" },
  { code: "co", name: "Colombia", group: "B", coach: "Néstor Lorenzo" },
  { code: "fr", name: "France", group: "C", coach: "Didier Deschamps" },
  { code: "es", name: "Spain", group: "C", coach: "Luis de la Fuente" },
  { code: "de", name: "Germany", group: "C", coach: "Julian Nagelsmann" },
  { code: "it", name: "Italy", group: "C", coach: "Luciano Spalletti" },
  { code: "gb-eng", name: "England", group: "D", coach: "Thomas Tuchel" },
  { code: "pt", name: "Portugal", group: "D", coach: "Roberto Martínez" },
  { code: "nl", name: "Netherlands", group: "D", coach: "Ronald Koeman" },
  { code: "be", name: "Belgium", group: "D", coach: "Domenico Tedesco" },
  { code: "hr", name: "Croatia", group: "E", coach: "Zlatko Dalić" },
  { code: "ch", name: "Switzerland", group: "E", coach: "Murat Yakin" },
  { code: "dk", name: "Denmark", group: "E", coach: "Brian Riemer" },
  { code: "pl", name: "Poland", group: "E", coach: "Michał Probierz" },
  { code: "jp", name: "Japan", group: "F", coach: "Hajime Moriyasu" },
  { code: "kr", name: "South Korea", group: "F", coach: "Hong Myung-bo" },
  { code: "au", name: "Australia", group: "F", coach: "Tony Popovic" },
  { code: "ir", name: "Iran", group: "F", coach: "Amir Ghalenoei" },
  { code: "sn", name: "Senegal", group: "G", coach: "Pape Thiaw" },
  { code: "ma", name: "Morocco", group: "G", coach: "Walid Regragui" },
  { code: "eg", name: "Egypt", group: "G", coach: "Hossam Hassan" },
  { code: "ci", name: "Ivory Coast", group: "G", coach: "Emerse Faé" },
  { code: "qa", name: "Qatar", group: "H", coach: "Bartolomé Márquez" },
  { code: "sa", name: "Saudi Arabia", group: "H", coach: "Hervé Renard" },
  { code: "ng", name: "Nigeria", group: "H", coach: "Eric Chelle" },
  { code: "no", name: "Norway", group: "H", coach: "Ståle Solbakken" },
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

// NOTE: The 2026 World Cup starts on 11 June 2026. Until then, no real
// matches have been played, so every fixture below is Upcoming with no
// score. Once live data is available from football-data.org, the Match
// Center will switch over automatically.
export const matches: Match[] = [
  { id: "m1", stage: "Group Stage", group: "A", home: "Mexico", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-11T20:00:00Z", venue: "Estadio Azteca, Mexico City", status: "Upcoming" },
  { id: "m2", stage: "Group Stage", group: "B", home: "Canada", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-12T20:00:00Z", venue: "BMO Field, Toronto", status: "Upcoming" },
  { id: "m3", stage: "Group Stage", group: "D", home: "USA", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-12T23:00:00Z", venue: "SoFi Stadium, LA", status: "Upcoming" },
  { id: "m4", stage: "Group Stage", group: "C", home: "Brazil", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-13T20:00:00Z", venue: "MetLife Stadium, NJ", status: "Upcoming" },
  { id: "m5", stage: "Group Stage", group: "E", home: "Argentina", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-13T23:00:00Z", venue: "AT&T Stadium, Dallas", status: "Upcoming" },
  { id: "m6", stage: "Group Stage", group: "F", home: "France", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-14T17:00:00Z", venue: "Mercedes-Benz, Atlanta", status: "Upcoming" },
  { id: "m7", stage: "Group Stage", group: "G", home: "England", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-14T20:00:00Z", venue: "Lincoln Financial, Philly", status: "Upcoming" },
  { id: "m8", stage: "Group Stage", group: "H", home: "Spain", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-15T20:00:00Z", venue: "Hard Rock Stadium, Miami", status: "Upcoming" },
  { id: "k1", stage: "Round of 16", home: "TBD", away: "TBD", homeScore: null, awayScore: null, date: "2026-06-29T20:00:00Z", venue: "MetLife Stadium, NJ", status: "Upcoming" },
  { id: "k2", stage: "Quarter Final", home: "TBD", away: "TBD", homeScore: null, awayScore: null, date: "2026-07-05T20:00:00Z", venue: "AT&T Stadium, Dallas", status: "Upcoming" },
  { id: "k3", stage: "Semi Final", home: "TBD", away: "TBD", homeScore: null, awayScore: null, date: "2026-07-14T20:00:00Z", venue: "MetLife Stadium, NJ", status: "Upcoming" },
  { id: "k4", stage: "Final", home: "TBD", away: "TBD", homeScore: null, awayScore: null, date: "2026-07-19T20:00:00Z", venue: "MetLife Stadium, NJ", status: "Upcoming" },
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

export const players: Player[] = [
  { id: "p1", name: "Kylian Mbappé", country: "France", position: "FWD", goals: 6, assists: 3, matches: 4, passes: 142, yellow: 1, red: 0, rating: 8.9 },
  { id: "p2", name: "Lionel Messi", country: "Argentina", position: "FWD", goals: 5, assists: 4, matches: 4, passes: 188, yellow: 0, red: 0, rating: 9.1 },
  { id: "p3", name: "Erling Haaland", country: "Norway", position: "FWD", goals: 5, assists: 1, matches: 3, passes: 78, yellow: 1, red: 0, rating: 8.4 },
  { id: "p4", name: "Vinícius Jr.", country: "Brazil", position: "FWD", goals: 4, assists: 4, matches: 4, passes: 156, yellow: 2, red: 0, rating: 8.6 },
  { id: "p5", name: "Harry Kane", country: "England", position: "FWD", goals: 4, assists: 2, matches: 4, passes: 121, yellow: 0, red: 0, rating: 8.2 },
  { id: "p6", name: "Jude Bellingham", country: "England", position: "MID", goals: 3, assists: 5, matches: 4, passes: 234, yellow: 1, red: 0, rating: 8.7 },
  { id: "p7", name: "Lamine Yamal", country: "Spain", position: "FWD", goals: 3, assists: 3, matches: 3, passes: 167, yellow: 0, red: 0, rating: 8.5 },
  { id: "p8", name: "Pedri", country: "Spain", position: "MID", goals: 2, assists: 4, matches: 3, passes: 289, yellow: 0, red: 0, rating: 8.3 },
  { id: "p9", name: "Florian Wirtz", country: "Germany", position: "MID", goals: 3, assists: 2, matches: 3, passes: 198, yellow: 1, red: 0, rating: 8.1 },
  { id: "p10", name: "Achraf Hakimi", country: "Morocco", position: "DEF", goals: 1, assists: 3, matches: 3, passes: 176, yellow: 1, red: 0, rating: 8.0 },
  { id: "p11", name: "Takefusa Kubo", country: "Japan", position: "MID", goals: 3, assists: 1, matches: 3, passes: 145, yellow: 0, red: 0, rating: 8.0 },
  { id: "p12", name: "Rafael Leão", country: "Portugal", position: "FWD", goals: 2, assists: 3, matches: 3, passes: 102, yellow: 1, red: 0, rating: 7.9 },
];

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

const makeGroup = (groupTeams: string[]): StandingRow[] =>
  groupTeams.map((team, i) => ({
    team,
    played: 3,
    won: [3, 2, 1, 0][i],
    drawn: [0, 0, 1, 1][i],
    lost: [0, 1, 1, 2][i],
    gf: [7, 5, 3, 2][i],
    ga: [1, 3, 4, 9][i],
    points: [9, 6, 4, 1][i],
  }));

export const standings: Record<string, StandingRow[]> = {
  A: makeGroup(["USA", "Mexico", "Canada", "Ecuador"]),
  B: makeGroup(["Argentina", "Brazil", "Uruguay", "Colombia"]),
  C: makeGroup(["France", "Spain", "Germany", "Italy"]),
  D: makeGroup(["England", "Portugal", "Netherlands", "Belgium"]),
  E: makeGroup(["Croatia", "Denmark", "Switzerland", "Poland"]),
  F: makeGroup(["Japan", "South Korea", "Australia", "Iran"]),
  G: makeGroup(["Morocco", "Senegal", "Ivory Coast", "Egypt"]),
  H: makeGroup(["Norway", "Nigeria", "Saudi Arabia", "Qatar"]),
};

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  thumb: string;
  videoId?: string;
}

export const news: NewsItem[] = [
  { id: "n1", title: "Messi magic seals dramatic draw against Brazil", excerpt: "A stoppage-time equalizer from the Argentine captain leaves Group B wide open.", date: "2026-06-14", category: "Match Report", thumb: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800", videoId: "dQw4w9WgXcQ" },
  { id: "n2", title: "France stun Germany in tactical masterclass", excerpt: "Mbappé's solo goal proves the difference in a tense Group C opener.", date: "2026-06-14", category: "Highlights", thumb: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800", videoId: "dQw4w9WgXcQ" },
  { id: "n3", title: "Haaland breaks tournament scoring record at 25", excerpt: "Norwegian striker now leads all-time WC goals among players under 26.", date: "2026-06-13", category: "Feature", thumb: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800" },
  { id: "n4", title: "USA-Mexico rivalry renewed in Dallas tonight", excerpt: "All eyes on AT&T Stadium as the hosts face their fiercest continental rivals.", date: "2026-06-14", category: "Preview", thumb: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800" },
  { id: "n5", title: "Morocco eyes second consecutive semi-final run", excerpt: "Atlas Lions enter Group G as favorites after their 2022 heroics.", date: "2026-06-12", category: "Feature", thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800" },
  { id: "n6", title: "VAR controversy mars Uruguay's win over Colombia", excerpt: "Late penalty decision sparks debate on social media.", date: "2026-06-13", category: "News", thumb: "https://images.unsplash.com/photo-1551854838-212c9a5e9cd0?w=800" },
];

export const flag = (code: string, size: 40 | 80 | 160 = 80) =>
  `https://flagcdn.com/w${size}/${code}.png`;
