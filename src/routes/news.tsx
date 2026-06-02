import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { news } from "@/data/mockData";
import { Calendar, Play, X } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Highlights — World Cup 2026" },
      { name: "description", content: "Latest news, match reports and video highlights from World Cup 2026." },
    ],
  }),
  component: News,
});

function News() {
  const [video, setVideo] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-2">
          Latest From The Tournament
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">News & Highlights</h1>
      </header>

      {news.length === 0 ? (
        <div className="gradient-card rounded-xl border border-border p-10 text-center text-muted-foreground">
          No news yet — match reports and highlights will appear here once the tournament begins on 11 June 2026.
        </div>
      ) : (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n, i) => (
          <article
            key={n.id}
            style={{ animationDelay: `${i * 50}ms` }}
            className="group gradient-card rounded-xl border border-border overflow-hidden hover-lift animate-fade-up flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={n.thumb}
                alt={n.title}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {n.category}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
                <Calendar className="h-3 w-3" />
                {new Date(n.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <h2 className="font-display text-lg font-bold leading-tight mb-2 group-hover:text-gold transition-colors">
                {n.title}
              </h2>
              <p className="text-sm text-muted-foreground flex-1">{n.excerpt}</p>
              {n.videoId && (
                <button
                  onClick={() => setVideo(n.videoId!)}
                  className="mt-4 inline-flex items-center gap-2 self-start gradient-pitch text-primary-foreground font-bold uppercase tracking-wider text-xs rounded-lg px-4 py-2 shadow-pitch hover:scale-105 transition-transform"
                >
                  <Play className="h-3 w-3 fill-current" /> Watch Highlights
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      )}

      {video && (
        <div
          onClick={() => setVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-fade-up"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
            <button onClick={() => setVideo(null)} className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground">
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video rounded-xl overflow-hidden border border-gold/30 shadow-gold">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video}?autoplay=1`}
                title="Match Highlights"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
