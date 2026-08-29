import { Quote, ShieldCheck, Rocket, Headphones, Palette } from "lucide-react";
import { TESTIMONIALS, TRUST_BADGES } from "@/lib/demo/sales";

const BADGE_ICONS = [ShieldCheck, Rocket, Headphones, Palette];

export function SocialProofSection() {
  return (
    <section className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_BADGES.map((badge, i) => {
          const Icon = BADGE_ICONS[i] ?? ShieldCheck;
          return (
            <div
              key={badge.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <Icon className="h-5 w-5 text-brand-orange" />
              <p className="mt-2 text-sm font-semibold text-brand-cream">{badge.label}</p>
              <p className="mt-1 text-xs text-brand-cream/45">{badge.detail}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-center font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
          CE QUE DISENT LES GÉRANTS
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-brand-cream/50">
          Retours types de profils dark kitchen — illustrations commerciales.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              className="relative rounded-2xl border border-white/10 bg-brand-anthracite/60 p-5"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-orange/20" />
              <p className="text-sm leading-relaxed text-brand-cream/80">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 border-t border-white/5 pt-3">
                <p className="text-sm font-semibold text-brand-cream">{t.author}</p>
                <p className="text-xs text-brand-cream/45">{t.role}</p>
                <p className="mt-1 text-xs font-medium text-brand-orange">{t.result}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
