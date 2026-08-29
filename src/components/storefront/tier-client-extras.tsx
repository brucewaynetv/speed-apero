"use client";

import Link from "next/link";
import { Award, Smartphone, User, Wallet } from "lucide-react";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { formatMoney } from "@/lib/pricing/money";
import { CREDIT_CENTS, LOYALTY_POINTS } from "@/lib/demo/account-demo";
import { cn } from "@/lib/utils";

export function TierClientExtras() {
  const { features, label, tier, basePath } = useDemoTier();

  if (tier === "starter") {
    return (
      <div className="border-b border-white/5 bg-brand-anthracite/30 px-4 py-2 text-center text-xs text-brand-cream/50">
        Formule <span className="font-semibold text-brand-cream/70">{label}</span> — commande
        essentielle ·{" "}
        <Link href="/demo/pro/compte" className="text-brand-orange hover:underline">
          compte client dès Pro
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 bg-brand-anthracite/40 px-4 py-2 sm:justify-between sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        {features.customerAccount && (
          <Link
            href={`${basePath}/compte`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-cream/80 hover:border-brand-orange/40 hover:text-brand-orange"
          >
            <User className="h-3.5 w-3.5" />
            Jean D. · Mon compte
          </Link>
        )}
        {features.loyalty && (
          <Link
            href={`${basePath}/compte`}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold"
          >
            <Award className="h-3.5 w-3.5" />
            {LOYALTY_POINTS} pts
          </Link>
        )}
        {features.customerCredit && (
          <Link
            href={`${basePath}/compte`}
            className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
          >
            <Wallet className="h-3.5 w-3.5" />
            {formatMoney(CREDIT_CENTS)}
          </Link>
        )}
        {features.pwa && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-brand-cream/60">
            <Smartphone className="h-3.5 w-3.5" />
            App installable
          </span>
        )}
      </div>
      <p className={cn("text-[11px] uppercase tracking-wide text-brand-cream/40")}>
        Démo {label}
      </p>
    </div>
  );
}
