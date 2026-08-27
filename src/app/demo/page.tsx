import Image from "next/image";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIER_LABELS, TIER_PRICES, type DemoTier } from "@/lib/demo/tiers";
import { cn } from "@/lib/utils";
import { VISUALS, MOSAIC_IMAGES } from "@/lib/data/visuals";

const TIERS: DemoTier[] = ["starter", "pro", "premium"];

const TIER_IMAGES: Record<DemoTier, string> = {
  starter: VISUALS.fries,
  pro: VISUALS.smash,
  premium: VISUALS.grill,
};

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
      <header className="relative z-10 border-b border-white/5 bg-brand-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/demo" className="font-display text-3xl tracking-wide text-brand-orange">
            SPEED APÉRO
          </Link>
          <Badge variant="gold">Démonstration commerciale</Badge>
        </div>
      </header>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src={VISUALS.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl tracking-wide text-brand-cream sm:text-7xl">
            CHOISISSEZ VOTRE
            <span className="block text-brand-orange">PLATEFORME</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-cream/70">
            Trois formules adaptées à vos besoins. Une seule base technique, entièrement
            personnalisable.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
        {MOSAIC_IMAGES.map((item) => (
          <div key={item.label} className="relative aspect-square overflow-hidden">
            <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="20vw" />
          </div>
        ))}
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => {
            const isRecommended = tier === "pro";
            return (
              <div
                key={tier}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border transition-all",
                  isRecommended
                    ? "border-brand-orange shadow-2xl shadow-brand-orange/20 md:scale-[1.02]"
                    : "border-white/10 bg-brand-anthracite/50 hover:border-white/20"
                )}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={TIER_IMAGES[tier]}
                    alt={TIER_LABELS[tier]}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-anthracite via-transparent to-transparent" />
                  {isRecommended && (
                    <Badge variant="gold" className="absolute left-3 top-3">
                      🔥 RECOMMANDÉ
                    </Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
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
                    <p className="mt-2 text-sm text-brand-cream/50">
                      Fidélité, livreurs, tracking & PWA
                    </p>
                  )}
                  {tier === "starter" && (
                    <p className="mt-2 text-sm text-brand-cream/50">
                      L&apos;essentiel pour démarrer
                    </p>
                  )}
                  <div className="mt-auto pt-6">
                    <Button asChild className="w-full font-display text-lg tracking-wide" size="lg">
                      <Link href={`/demo/${tier}`}>VOIR LA DÉMO</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-brand-anthracite">
                <th className="px-4 py-3 text-left font-accent uppercase text-brand-cream/50">
                  Fonctionnalité
                </th>
                {TIERS.map((tier) => (
                  <th
                    key={tier}
                    className={cn(
                      "px-4 py-3 text-center font-accent uppercase",
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
                        <Check className="mx-auto h-4 w-4 text-brand-orange" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-brand-cream/20" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
