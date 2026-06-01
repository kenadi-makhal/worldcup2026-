import { matches } from "@/data/mockData";
import { Radio } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function LiveIndicator() {
  const liveCount = matches.filter((m) => m.status === "LIVE").length;
  if (liveCount === 0) return null;

  return (
    <Link
      to="/matches"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={`${liveCount} live matches`}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-live animate-live-pulse" />
        <div className="relative flex items-center gap-2 rounded-full bg-live px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg group-hover:scale-105 transition-transform">
          <Radio className="h-4 w-4 animate-pulse" />
          <span>{liveCount} Live</span>
        </div>
      </div>
    </Link>
  );
}
