"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Gift, MapPin, Sparkles } from "lucide-react";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { DemoTierSelector } from "@/components/demo/demo-tier-selector";
import { CommercialCtaButtons } from "@/components/demo/commercial-cta";
import { TIER_LABELS, type DemoTier } from "@/lib/demo/tiers";
import { OFFER_PITCHES } from "@/lib/demo/sales";
import { cn } from "@/lib/utils";

const GUIDE_HINTS: Record<
  DemoTier,
  { label: string; href: string; icon: typeof Gift }[]
> = {
  starter: [
    { label: "Voir la carte", href: "#carte", icon: Sparkles },
    { label: "Comparer Pro", href: "/demo/pro", icon: ArrowRight },
  ],
  pro: [
    { label: "Tester une promo", href: "#carte", icon: Gift },
    { label: "Mon compte", href: "compte", icon: Sparkles },
    { label: "Programmer", href: "checkout", icon: CalendarClock },
  ],
  premium: [
    { label: "Fidélité", href: "compte", icon: Sparkles },
    { label: "Suivi live", href: "#carte", icon: MapPin },
    { label: "Crédit 5 €", href: "checkout", icon: Gift },
  ],
};

export function DemoGuideBar() {
  const { tier, label, price, basePath, features } = useDemoTier();
  const pitch = OFFER_PITCHES[tier];
  const hints = GUIDE_HINTS[tier];

  const lockedHint =
    tier === "starter"
      ? "Sans compte client ni promos — basculez en Pro pour les tester"
      : tier === "pro"
        ? "Pas de suivi live ni fidélité — basculez en Premium pour les voir"
        : "Vous voyez l'expérience complète (fidélité, tracking, crédit)";

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-white/10 bg-brand-black/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-brand-cream/50">
                Démo{" "}
                <span
                  className={cn(
                    "font-semibold",
                    tier === "premium" ? "text-brand-gold" : "text-brand-orange"
                  )}
                >
                  {label}
                </span>{" "}
                · {price} € — {pitch.promise}
              </p>
              <p className="mt-0.5 hidden truncate text-[11px] text-brand-cream/35 sm:block">
                {lockedHint}
              </p>
            </div>
            <div className="w-full sm:max-w-md">
              <DemoTierSelector currentTier={tier} />
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {hints.map((hint) => {
              const Icon = hint.icon;
              const href = hint.href.startsWith("/")
                ? hint.href
                : hint.href.startsWith("#")
                  ? `${basePath}${hint.href}`
                  : `${basePath}/${hint.href}`;
              return (
                <Link
                  key={hint.label}
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-brand-cream/80 hover:border-brand-orange/50 hover:text-brand-orange"
                >
                  <Icon className="h-3 w-3" />
                  {hint.label}
                </Link>
              );
            })}
            {tier !== "premium" && (
              <Link
                href={`/demo/${tier === "starter" ? "pro" : "premium"}`}
                className="inline-flex items-center gap-1 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold text-brand-orange"
              >
                Voir {TIER_LABELS[tier === "starter" ? "pro" : "premium"]}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
            {features.orderTracking && (
              <span className="hidden text-[11px] text-brand-gold sm:inline">
                Passez commande pour tester le suivi
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brand-black/95 p-3 backdrop-blur-xl md:hidden">
        <CommercialCtaButtons tier={tier} compact className="justify-center" />
      </div>
    </>
  );
}
