import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIER_LABELS, TIER_PRICES, type DemoTier } from "@/lib/demo/tiers";
import { cn } from "@/lib/utils";

const TIERS: DemoTier[] = ["starter", "pro", "premium"];

const COMPARISON_ROWS = [
  { feature: "Commande en ligne", starter: true, pro: true, premium: true },
  { feature: "Produits/options", starter: true, pro: true, premium: true },
  { feature: "Livraison/retrait", starter: true, pro: true, premium: true },
  { feature: "Gestion commandes", starter: true, pro: true, premium: true },
  { feature: "Admin produits", starter: true, pro: true, premium: true },
  { feature: "Compte client", starter: false, pro: true, premium: true },
  { feature: "Promotions", starter: false, pro: true, premium: true },
  { feature: "Commande programmée", starter: false, pro: true, premium: true },
  { feature: "Dashboard avancé", starter: false, pro: true, premium: true },
  { feature: "Mode cuisine", starter: false, pro: true, premium: true },
  { feature: "Fidélité", starter: false, pro: false, premium: true },
  { feature: "Crédit client", starter: false, pro: false, premium: true },
  { feature: "Gestion livreurs", starter: false, pro: false, premium: true },
  { feature: "Tracking", starter: false, pro: false, premium: true },
  { feature: "PWA", starter: false, pro: false, premium: true },
  { feature: "Analytics avancées", starter: false, pro: false, premium: true },
];

export default function DemoComparatorPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 bg-brand-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/demo" className="font-display text-3xl tracking-wide text-brand-orange">
            SPEED APÉRO
          </Link>
          <Badge variant="gold">Démonstration commerciale</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="font-display text-4xl tracking-wide text-brand-cream sm:text-6xl">
            CHOISISSEZ VOTRE
            <span className="block text-brand-orange">PLATEFORME</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-cream/60">
            Trois formules adaptées à vos besoins. Une seule base technique, entièrement personnalisable.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => {
            const isRecommended = tier === "pro";
            return (
              <div
                key={tier}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 transition-all",
                  isRecommended
                    ? "border-brand-orange bg-brand-orange/5 shadow-2xl shadow-brand-orange/20 scale-[1.02] md:scale-105"
                    : "border-white/10 bg-brand-anthracite/50 hover:border-white/20"
                )}
              >
                {isRecommended && (
                  <Badge variant="gold" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    🔥 RECOMMANDÉ
                  </Badge>
                )}
                <h2 className="font-display text-3xl tracking-wide text-brand-cream">
                  {TIER_LABELS[tier].toUpperCase()}
                </h2>
                <p className="mt-2 font-display text-5xl text-brand-orange">
                  {TIER_PRICES[tier]} €
                </p>
                {isRecommended && (
                  <p className="mt-2 text-sm text-brand-gold">
                    Meilleur rapport qualité / prix
                  </p>
                )}
                {tier === "premium" && (
                  <p className="mt-2 text-sm text-brand-cream/60">
                    La plateforme complète pour développer votre activité
                  </p>
                )}
                {tier === "starter" && (
                  <p className="mt-2 text-sm text-brand-cream/60">
                    L&apos;essentiel pour commander en ligne
                  </p>
                )}
                <Button asChild className="mt-6 w-full font-display text-lg tracking-wide" size="lg">
                  <Link href={`/demo/${tier}`}>VOIR LA DÉMO</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-brand-anthracite">
                  <th className="px-4 py-4 text-left font-accent uppercase tracking-wider text-brand-cream">
                    Fonction
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier}
                      className={cn(
                        "px-4 py-4 text-center font-accent uppercase tracking-wider",
                        tier === "pro" ? "text-brand-orange" : "text-brand-cream/70"
                      )}
                    >
                      {TIER_LABELS[tier]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-brand-cream/80">{row.feature}</td>
                    {(["starter", "pro", "premium"] as const).map((tier) => (
                      <td key={tier} className="px-4 py-3 text-center">
                        {row[tier] ? (
                          <Check className="mx-auto h-5 w-5 text-emerald-400" />
                        ) : (
                          <Minus className="mx-auto h-5 w-5 text-brand-cream/20" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
