"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS, TIER_PRICES } from "@/lib/demo/tiers";
import { ADMIN_TIERS } from "@/lib/admin/features";

const TIER_SELECT: Record<DemoTier, string> = {
  starter: "bg-white/10 text-brand-cream border-white/20",
  pro: "bg-brand-orange/15 text-brand-orange border-brand-orange/40",
  premium: "bg-brand-gold/15 text-brand-gold border-brand-gold/40",
};

interface AdminTierSelectorProps {
  currentTier: DemoTier;
}

export function AdminTierSelector({ currentTier }: AdminTierSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTier(newTier: DemoTier) {
    if (newTier === currentTier) return;
    const newPath = pathname.replace(`/admin/${currentTier}`, `/admin/${newTier}`);
    router.push(newPath);
    router.refresh();
  }

  return (
    <div className="relative shrink-0">
      <select
        value={currentTier}
        onChange={(e) => switchTier(e.target.value as DemoTier)}
        aria-label="Changer de formule admin"
        className={cn(
          "h-8 cursor-pointer appearance-none rounded-md border py-0 pl-2.5 pr-7 text-[11px] font-bold uppercase tracking-wide outline-none transition-colors sm:text-xs",
          "focus:border-brand-orange focus:ring-1 focus:ring-brand-orange",
          TIER_SELECT[currentTier]
        )}
      >
        {ADMIN_TIERS.map((tier) => (
          <option key={tier} value={tier} className="bg-brand-anthracite text-brand-cream">
            {TIER_LABELS[tier]} · {TIER_PRICES[tier]} €
            {tier === "pro" ? " ★" : ""}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-60"
        aria-hidden
      />
    </div>
  );
}
