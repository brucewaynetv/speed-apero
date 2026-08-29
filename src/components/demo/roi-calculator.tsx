"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { TIER_LABELS, TIER_PRICES, type DemoTier } from "@/lib/demo/tiers";
import { PLATFORM_COMMISSION_RATE } from "@/lib/demo/sales";
import { cn } from "@/lib/utils";

const TIERS: DemoTier[] = ["starter", "pro", "premium"];

export function RoiCalculator() {
  const [ordersPerWeek, setOrdersPerWeek] = useState(30);
  const [avgBasket, setAvgBasket] = useState(28);

  const weeklyGmv = ordersPerWeek * avgBasket;
  const monthlyGmv = weeklyGmv * 4.3;
  const monthlyCommission = Math.round(monthlyGmv * PLATFORM_COMMISSION_RATE);
  const yearlyCommission = monthlyCommission * 12;

  const payback = useMemo(() => {
    return TIERS.map((tier) => {
      const price = TIER_PRICES[tier];
      const months = monthlyCommission > 0 ? price / monthlyCommission : Infinity;
      return { tier, price, months };
    });
  }, [monthlyCommission]);

  return (
    <section
      id="calculateur"
      className="rounded-2xl border border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 via-brand-anthracite/80 to-brand-anthracite p-6 sm:p-8"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-brand-orange/20 p-2.5 text-brand-orange">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
            COMBIEN VOUS COÛTENT LES APPS ?
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-brand-cream/60">
            Estimation indicative à ~{Math.round(PLATFORM_COMMISSION_RATE * 100)}&nbsp;% de
            commission (Uber Eats / Deliveroo). Comparez au prix unique Speed Apéro.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-cream/50">
              Commandes / semaine
            </span>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={120}
                value={ordersPerWeek}
                onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-orange"
              />
              <span className="w-10 text-right font-display text-2xl text-brand-orange">
                {ordersPerWeek}
              </span>
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-cream/50">
              Panier moyen (€)
            </span>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={12}
                max={55}
                value={avgBasket}
                onChange={(e) => setAvgBasket(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-orange"
              />
              <span className="w-10 text-right font-display text-2xl text-brand-orange">
                {avgBasket}
              </span>
            </div>
          </label>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-black/50 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-cream/40">
            Commission estimée
          </p>
          <p className="mt-2 font-display text-5xl text-brand-red">
            {monthlyCommission.toLocaleString("fr-FR")} €
            <span className="ml-2 text-lg text-brand-cream/40">/ mois</span>
          </p>
          <p className="mt-1 text-sm text-brand-cream/50">
            soit ~{yearlyCommission.toLocaleString("fr-FR")} € / an sur les plateformes
          </p>
          <p className="mt-4 text-xs text-brand-cream/40">
            CA mensuel estimé : {Math.round(monthlyGmv).toLocaleString("fr-FR")} €
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {payback.map(({ tier, price, months }) => {
          const isPro = tier === "pro";
          return (
            <div
              key={tier}
              className={cn(
                "rounded-xl border p-4",
                isPro
                  ? "border-brand-orange bg-brand-orange/10"
                  : "border-white/10 bg-white/[0.03]"
              )}
            >
              <p
                className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  isPro ? "text-brand-orange" : "text-brand-cream/50"
                )}
              >
                {TIER_LABELS[tier]} · {price} €
              </p>
              <p className="mt-2 font-display text-2xl text-brand-cream">
                {Number.isFinite(months)
                  ? months < 1
                    ? "< 1 mois"
                    : `~${months.toFixed(1)} mois`
                  : "—"}
              </p>
              <p className="mt-1 text-xs text-brand-cream/45">
                pour rentabiliser vs commissions
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
