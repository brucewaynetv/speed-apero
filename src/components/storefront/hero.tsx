"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";
import { VISUALS } from "@/lib/data/visuals";

interface HeroSectionProps {
  basePath?: string;
}

export function HeroSection({ basePath = "" }: HeroSectionProps) {
  const demo = useDemoTierOptional();
  const tier = demo?.tier ?? "starter";

  const subtitle =
    tier === "premium"
      ? "Fidélité, suivi live et livraison premium — l'expérience complète."
      : tier === "pro"
        ? "Compte client, promos et commandes programmées inclus."
        : "Burgers, kebabs, wraps et recettes maison préparés avec passion.";

  const badges =
    tier === "premium"
      ? ["🔥 Fait maison", "📍 Suivi live", "⭐ Fidélité", "🛵 Livreurs"]
      : tier === "pro"
        ? ["🔥 Fait maison", "🏷️ Codes promo", "📅 Programmable", "👤 Compte client"]
        : ["🔥 Fait maison", "🛵 Livraison rapide", "🥩 Produits frais", "⭐ Préparé à la commande"];

  const heroImage =
    tier === "premium" ? VISUALS.grill : tier === "pro" ? VISUALS.smash : VISUALS.hero;

  return (
    <section id="accueil" className="relative min-h-[75vh] overflow-hidden sm:min-h-[85vh]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Burgers, frites et street food Speed Apéro"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/50" />
        <div className="grain-overlay absolute inset-0 opacity-50" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          {demo && (
            <Badge
              variant={tier === "premium" ? "gold" : tier === "pro" ? "orange" : "outline"}
              className="mb-4"
            >
              Démo {demo.label} · {demo.price} €
            </Badge>
          )}
          <h1 className="font-display text-5xl leading-none tracking-wide text-brand-cream sm:text-7xl lg:text-8xl">
            <span className="block brush-underline">DU FAIT MAISON.</span>
            <span className="mt-1 block text-brand-orange">DU GOÛT.</span>
            <span className="mt-1 block">LIVRÉ CHEZ VOUS.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-brand-cream/75 sm:text-lg">{subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-display text-xl tracking-wide">
              <Link href={`${basePath}#carte`}>COMMANDER MAINTENANT</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="font-display text-xl tracking-wide">
              <Link href={`${basePath}#carte`}>VOIR LA CARTE</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="outline" className="text-xs normal-case">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
