import Link from "next/link";
import { ADMIN_TIERS } from "@/lib/admin/features";
import { TIER_LABELS, TIER_PRICES } from "@/lib/demo/tiers";
import { cn } from "@/lib/utils";

export default function AdminTierSelectorPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl text-brand-cream">Admin Speed Apéro</h1>
        <p className="mt-2 text-brand-cream/50">
          Choisissez une formule pour voir le back-office correspondant
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {ADMIN_TIERS.map((tier) => {
          const isRecommended = tier === "pro";
          return (
            <Link
              key={tier}
              href={`/admin/${tier}/login`}
              className={cn(
                "food-card flex flex-col p-6 transition-all",
                isRecommended && "border-brand-orange/50 ring-1 ring-brand-orange/30"
              )}
            >
              {isRecommended && (
                <span className="mb-2 self-start rounded bg-brand-orange px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Recommandé
                </span>
              )}
              <h2 className="font-display text-3xl text-brand-cream">{TIER_LABELS[tier]}</h2>
              <p className="mt-1 font-display text-2xl text-brand-orange">{TIER_PRICES[tier]} €</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-xs text-brand-cream/60">
                <li>✓ Commandes + produits</li>
                {tier !== "starter" && <li>✓ Mode cuisine + dashboard</li>}
                {tier === "premium" && <li>✓ Livreurs + analytics</li>}
              </ul>
              <span className="mt-6 block rounded-lg bg-brand-orange/15 py-2.5 text-center text-sm font-bold text-brand-orange">
                Accéder à l&apos;admin {TIER_LABELS[tier]}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-brand-cream/30">
        Démo : admin@speedapero.demo / demo2026
      </p>
    </div>
  );
}
