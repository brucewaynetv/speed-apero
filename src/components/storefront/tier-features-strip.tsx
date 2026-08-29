"use client";

import { Check, Lock } from "lucide-react";
import Link from "next/link";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS } from "@/lib/demo/tiers";
import { cn } from "@/lib/utils";

const HIGHLIGHTS: {
  key: string;
  label: string;
  outcome: string;
  minTier: DemoTier;
}[] = [
  {
    key: "order",
    label: "Vente directe",
    outcome: "Sans commission",
    minTier: "starter",
  },
  {
    key: "account",
    label: "Compte client",
    outcome: "Clients qui reviennent",
    minTier: "pro",
  },
  {
    key: "promo",
    label: "Promos",
    outcome: "Remplir les creux",
    minTier: "pro",
  },
  {
    key: "schedule",
    label: "Programmé",
    outcome: "Lisser le rush",
    minTier: "pro",
  },
  {
    key: "loyalty",
    label: "Fidélité",
    outcome: "Panier qui monte",
    minTier: "premium",
  },
  {
    key: "tracking",
    label: "Suivi live",
    outcome: "Comme une app",
    minTier: "premium",
  },
];

const TIER_RANK: Record<DemoTier, number> = {
  starter: 0,
  pro: 1,
  premium: 2,
};

export function TierFeaturesStrip() {
  const { tier, label } = useDemoTier();

  return (
    <section
      className={cn(
        "border-y py-6",
        tier === "premium"
          ? "border-brand-gold/20 bg-brand-gold/5"
          : tier === "pro"
            ? "border-brand-orange/20 bg-brand-orange/5"
            : "border-white/5 bg-brand-anthracite/20"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-brand-cream/40">
          Ce que vous vivez en démo {label}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {HIGHLIGHTS.map((item) => {
            const unlocked = TIER_RANK[tier] >= TIER_RANK[item.minTier];
            return (
              <span
                key={item.key}
                title={item.outcome}
                className={cn(
                  "inline-flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2 text-left sm:min-w-[140px]",
                  unlocked
                    ? tier === "premium"
                      ? "border-brand-gold/40 bg-brand-gold/10 text-brand-gold"
                      : "border-brand-orange/40 bg-brand-orange/10 text-brand-orange"
                    : "border-white/10 text-brand-cream/30"
                )}
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                  {unlocked ? <Check className="h-3.5 w-3.5" /> : <Lock className="h-3 w-3" />}
                  {item.label}
                  {!unlocked && (
                    <span className="text-[10px] opacity-70">{TIER_LABELS[item.minTier]}</span>
                  )}
                </span>
                <span
                  className={cn(
                    "pl-5 text-[10px]",
                    unlocked ? "text-brand-cream/55" : "text-brand-cream/25"
                  )}
                >
                  {item.outcome}
                </span>
              </span>
            );
          })}
        </div>
        {tier !== "premium" && (
          <p className="mt-3 text-center text-xs text-brand-cream/40">
            Fonction grisée ={" "}
            <Link
              href={`/demo/${tier === "starter" ? "pro" : "premium"}`}
              className="text-brand-orange hover:underline"
            >
              disponible en {TIER_LABELS[tier === "starter" ? "pro" : "premium"]}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
