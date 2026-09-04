"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";
import { OFFER_PITCHES } from "@/lib/demo/sales";
import { VISUALS } from "@/lib/data/visuals";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  basePath?: string;
}

export function HeroSection({ basePath = "" }: HeroSectionProps) {
  const demo = useDemoTierOptional();
  const tier = demo?.tier ?? "starter";
  const pitch = OFFER_PITCHES[tier];

  const brandLine =
    tier === "premium"
      ? { a: "FIDÉLISEZ.", b: "SUIVEZ.", c: "LIVREZ PREMIUM." }
      : tier === "pro"
        ? { a: "REMPLISSEZ.", b: "RELANCER.", c: "PROGRAMMEZ." }
        : { a: "DU FAIT MAISON.", b: "DU GOÛT.", c: "LIVRÉ CHEZ VOUS." };

  const badges =
    tier === "premium"
      ? ["Suivi live", "Fidélité", "Crédit client", "Livreurs"]
      : tier === "pro"
        ? ["Codes promo", "Compte client", "Programmable", "Mode cuisine"]
        : ["Sans commission", "Livraison rapide", "Fait maison", "Admin simple"];

  const heroImage =
    tier === "premium" ? VISUALS.grill : tier === "pro" ? VISUALS.smash : VISUALS.hero;

  return (
    <section
      id="accueil"
      className={cn(
        "relative min-h-[70vh] overflow-hidden sm:min-h-[80vh]",
        tier === "starter" && "min-h-[65vh] sm:min-h-[72vh]"
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Burgers, frites et street food Speed Apéro"
          fill
          priority
          className={cn(
            "object-cover",
            tier === "starter" && "saturate-[0.85]",
            tier === "premium" && "contrast-[1.08] saturate-[1.1]"
          )}
          sizes="100vw"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/55",
            tier === "premium" && "via-brand-black/80"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/50" />
        {tier === "premium" && (
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-transparent" />
        )}
        {tier === "pro" && (
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/15 via-transparent to-transparent" />
        )}
        <div className="grain-overlay absolute inset-0 opacity-50" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          {demo && !demo.clientEdition && (
            <Badge
              variant={tier === "premium" ? "gold" : tier === "pro" ? "orange" : "outline"}
              className="mb-4"
            >
              Version {demo.label} · {demo.price} €
            </Badge>
          )}
          <h1
            className={cn(
              "font-display leading-none tracking-wide text-brand-cream",
              tier === "premium"
                ? "text-5xl sm:text-7xl lg:text-8xl"
                : tier === "starter"
                  ? "text-4xl sm:text-6xl lg:text-7xl"
                  : "text-5xl sm:text-7xl lg:text-8xl"
            )}
          >
            <span className="block brush-underline">{brandLine.a}</span>
            <span
              className={cn(
                "mt-1 block",
                tier === "premium" ? "text-brand-gold" : "text-brand-orange"
              )}
            >
              {brandLine.b}
            </span>
            <span className="mt-1 block">{brandLine.c}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-brand-cream/75 sm:text-lg">
            {pitch.promise}. {pitch.audience}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              variant={tier === "premium" ? "gold" : "default"}
              className="font-display text-xl tracking-wide"
            >
              <Link href={`${basePath}#carte`}>COMMANDER MAINTENANT</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="font-display text-xl tracking-wide"
            >
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
