import { Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-navy-deep">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold" />
            <span className="font-display text-sm tracking-wider">
              WORLD CUP <span className="text-gold">2026</span> LIVE TRACKER
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Unofficial fan dashboard • Mock data for demo purposes • USA · Canada · Mexico 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
