"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS, TIER_PRICES } from "@/lib/demo/tiers";

const TIERS: DemoTier[] = ["starter", "pro", "premium"];

export function DemoTierSelector({ currentTier }: { currentTier: DemoTier }) {
  return (
    <div className="mx-auto flex max-w-3xl gap-2">
      {TIERS.map((tier) => {
        const isActive = tier === currentTier;
        const isRecommended = tier === "pro";

        return (
          <Link
            key={tier}
            href={`/demo/${tier}`}
            className={cn(
              "relative flex flex-1 flex-col items-center rounded-xl border px-2 py-2 text-center transition-all sm:px-4 sm:py-2.5",
              isActive
                ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                : "border-white/10 bg-transparent text-brand-cream/60 hover:border-white/20 hover:text-brand-cream"
            )}
          >
            {isRecommended && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gold px-2 py-0.5 text-[9px] font-bold uppercase text-brand-black">
                Recommandé
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider sm:text-xs">
              {TIER_LABELS[tier]}
            </span>
            <span className="font-display text-lg sm:text-xl">{TIER_PRICES[tier]} €</span>
          </Link>
        );
      })}
    </div>
  );
}
