import Image from "next/image";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TIER_LABELS, type DemoTier } from "@/lib/demo/tiers";
import { cn } from "@/lib/utils";
import { VISUALS, MOSAIC_IMAGES } from "@/lib/data/visuals";
import { OfferCards } from "@/components/demo/offer-cards";
import { RoiCalculator } from "@/components/demo/roi-calculator";
import { SocialProofSection } from "@/components/demo/social-proof";
import { CommercialCtaSection } from "@/components/demo/commercial-cta";

const TIERS: DemoTier[] = ["starter", "pro", "premium"];

const COMPARISON_ROWS = [
  { feature: "Commande en ligne (sans commission)", starter: true, pro: true, premium: true },
  { feature: "Produits / options / livraison", starter: true, pro: true, premium: true },
  { feature: "Admin commandes & produits", starter: true, pro: true, premium: true },
  { feature: "Compte client & historique", starter: false, pro: true, premium: true },
  { feature: "Promos & bannières marketing", starter: false, pro: true, premium: true },
  { feature: "Commande programmée", starter: false, pro: true, premium: true },
  { feature: "Mode cuisine & dashboard", starter: false, pro: true, premium: true },
  { feature: "Fidélité & crédit client", starter: false, pro: false, premium: true },
  { feature: "Livreurs & suivi en direct", starter: false, pro: false, premium: true },
  { feature: "PWA & analytics avancées", starter: false, pro: false, premium: true },
];

export default function DemoComparatorPage() {
  return (
    <div className="min-h-screen">
      <header className="relative z-10 border-b border-white/5 bg-brand-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/demo" className="font-display text-3xl tracking-wide text-brand-orange">
            SPEED APÉRO
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="#contact-commercial"
              className="hidden text-sm font-medium text-brand-cream/70 hover:text-brand-orange sm:inline"
            >
              Nous contacter
            </a>
            <Badge variant="gold">Démonstration commerciale</Badge>
          </div>
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Votre marque · Vos marges · Sans commission
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-wide text-brand-cream sm:text-7xl">
            CHOISISSEZ VOTRE
            <span className="block text-brand-orange">PLATEFORME</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-cream/70">
            Trois formules pour vendre en direct. Testez chaque démo, comparez le coût des apps,
            puis dites-nous laquelle vous convient.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-display text-lg tracking-wide">
              <a href="#offres">Voir les offres</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#calculateur">Calculer mon économie</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
        {MOSAIC_IMAGES.map((item) => (
          <div key={item.label} className="relative aspect-square overflow-hidden">
            <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="20vw" />
          </div>
        ))}
      </div>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <div id="offres">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-display text-4xl tracking-wide text-brand-cream">
              DES RÉSULTATS, PAS DES COCHES
            </h2>
            <p className="mt-2 text-brand-cream/55">
              Chaque formule répond à un objectif métier. Cliquez pour vivre l’expérience client
              correspondante.
            </p>
          </div>
          <OfferCards />
        </div>

        <RoiCalculator />

        <SocialProofSection />

        <div>
          <h2 className="mb-4 font-display text-3xl tracking-wide text-brand-cream">
            DÉTAIL DES FONCTIONNALITÉS
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-brand-anthracite">
                  <th className="px-4 py-3 text-left font-accent uppercase text-brand-cream/50">
                    Capacité
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier}
                      className={cn(
                        "px-4 py-3 text-center font-accent uppercase",
                        tier === "pro"
                          ? "text-brand-orange"
                          : tier === "premium"
                            ? "text-brand-gold"
                            : "text-brand-cream/70"
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
                          <Check
                            className={cn(
                              "mx-auto h-4 w-4",
                              tier === "premium" ? "text-brand-gold" : "text-brand-orange"
                            )}
                          />
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
        </div>
      </main>

      <CommercialCtaSection
        title="Prêt à choisir une formule ?"
        subtitle="Dites-nous laquelle vous intéresse — on adapte branding, zone et menu à votre cuisine."
        showCompareLink={false}
      />
    </div>
  );
}
