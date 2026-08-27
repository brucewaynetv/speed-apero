"use client";

import { Check, Lock } from "lucide-react";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS } from "@/lib/demo/tiers";
import { cn } from "@/lib/utils";

const HIGHLIGHTS: {
  key: string;
  label: string;
  minTier: DemoTier;
}[] = [
  { key: "order", label: "Commande en ligne", minTier: "starter" },
  { key: "account", label: "Compte client", minTier: "pro" },
  { key: "promo", label: "Codes promo", minTier: "pro" },
  { key: "schedule", label: "Commande programmée", minTier: "pro" },
  { key: "loyalty", label: "Fidélité & crédit", minTier: "premium" },
  { key: "tracking", label: "Suivi en direct", minTier: "premium" },
];

const TIER_RANK: Record<DemoTier, number> = {
  starter: 0,
  pro: 1,
  premium: 2,
};

export function TierFeaturesStrip() {
  const { tier, label } = useDemoTier();

  return (
    <section className="border-y border-white/5 bg-brand-anthracite/20 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-brand-cream/40">
          Inclus dans la démo {label}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {HIGHLIGHTS.map((item) => {
            const unlocked = TIER_RANK[tier] >= TIER_RANK[item.minTier];
            return (
              <span
                key={item.key}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                  unlocked
                    ? "border-brand-orange/40 bg-brand-orange/10 text-brand-orange"
                    : "border-white/10 text-brand-cream/30"
                )}
              >
                {unlocked ? <Check className="h-3.5 w-3.5" /> : <Lock className="h-3 w-3" />}
                {item.label}
                {!unlocked && (
                  <span className="text-[10px] opacity-70">
                    {TIER_LABELS[item.minTier]}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
