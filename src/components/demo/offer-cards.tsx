"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TIER_LABELS, TIER_PRICES, type DemoTier } from "@/lib/demo/tiers";
import { OFFER_PITCHES } from "@/lib/demo/sales";
import { VISUALS } from "@/lib/data/visuals";
import { cn } from "@/lib/utils";
import { CommercialCtaButtons } from "@/components/demo/commercial-cta";

const TIERS: DemoTier[] = ["starter", "pro", "premium"];

const TIER_IMAGES: Record<DemoTier, string> = {
  starter: VISUALS.fries,
  pro: VISUALS.smash,
  premium: VISUALS.grill,
};

export function OfferCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {TIERS.map((tier) => {
        const pitch = OFFER_PITCHES[tier];
        const isRecommended = tier === "pro";
        const isPremium = tier === "premium";

        return (
          <article
            key={tier}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-2xl border transition-all",
              isRecommended &&
                "border-brand-orange shadow-2xl shadow-brand-orange/25 ring-1 ring-brand-orange/40 lg:scale-[1.03]",
              isPremium && !isRecommended && "border-brand-gold/40 bg-brand-anthracite/80",
              tier === "starter" && "border-white/10 bg-brand-anthracite/40"
            )}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={TIER_IMAGES[tier]}
                alt={TIER_LABELS[tier]}
                fill
                className={cn(
                  "object-cover",
                  tier === "starter" && "saturate-75",
                  isPremium && "contrast-110"
                )}
                sizes="33vw"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t",
                  isPremium
                    ? "from-brand-black via-brand-black/40 to-brand-gold/10"
                    : "from-brand-anthracite via-transparent to-transparent"
                )}
              />
              {isRecommended && (
                <Badge variant="gold" className="absolute left-3 top-3">
                  Recommandé
                </Badge>
              )}
              {isPremium && (
                <Badge variant="gold" className="absolute left-3 top-3">
                  Expérience complète
                </Badge>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-cream/40">
                {pitch.audience}
              </p>
              <h2
                className={cn(
                  "mt-1 font-display tracking-wide",
                  isPremium ? "text-4xl text-brand-gold" : "text-3xl text-brand-cream"
                )}
              >
                {TIER_LABELS[tier].toUpperCase()}
              </h2>
              <p className="mt-3 text-base font-medium leading-snug text-brand-cream/90">
                {pitch.promise}
              </p>
              <p
                className={cn(
                  "mt-4 font-display",
                  isPremium ? "text-5xl text-brand-gold" : "text-5xl text-brand-orange"
                )}
              >
                {TIER_PRICES[tier]} €
                <span className="ml-2 text-sm font-body font-normal text-brand-cream/40">
                  paiement unique
                </span>
              </p>
              {isRecommended && (
                <p className="mt-2 text-sm text-brand-gold">
                  Meilleur rapport qualité / prix · setup + formation inclus
                </p>
              )}

              <ul className="mt-5 space-y-2.5">
                {pitch.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-brand-cream/75">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        isPremium ? "text-brand-gold" : "text-brand-orange"
                      )}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-brand-cream/45">{pitch.includesSetup}</p>

              <div className="mt-auto space-y-2 pt-6">
                <Button
                  asChild
                  className="w-full font-display text-lg tracking-wide"
                  size="lg"
                  variant={isPremium ? "gold" : "default"}
                >
                  <Link href={`/demo/${tier}`}>Voir la démo</Link>
                </Button>
                <CommercialCtaButtons
                  tier={tier}
                  compact
                  className="w-full justify-center"
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
