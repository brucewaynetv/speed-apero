"use client";

import { useState } from "react";
import { StorefrontHeader } from "@/components/storefront/header";
import { HeroSection } from "@/components/storefront/hero";
import { MenuSection } from "@/components/storefront/menu-section";
import { DeliverySection } from "@/components/storefront/delivery-section";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MarketingBanner } from "@/components/storefront/marketing-banner";
import { FirstOrderPopup } from "@/components/storefront/first-order-popup";
import { TierClientExtras } from "@/components/storefront/tier-client-extras";
import { TierFeaturesStrip } from "@/components/storefront/tier-features-strip";
import { FoodMosaic } from "@/components/storefront/food-mosaic";
import { FoodMarquee } from "@/components/storefront/food-marquee";
import { FormulesVisualSection } from "@/components/storefront/formules-visual";
import { AboutVisualSection } from "@/components/storefront/about-visual";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { PwaInstallBanner } from "@/components/storefront/pwa-install-banner";
import { DemoGuideBar } from "@/components/demo/demo-guide-bar";
import { CommercialCtaSection } from "@/components/demo/commercial-cta";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";
import { cn } from "@/lib/utils";

export function StorefrontPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const demoTier = useDemoTierOptional();
  const basePath = demoTier?.basePath ?? "";
  const tier = demoTier?.tier ?? "starter";

  return (
    <div
      className={cn(
        "tier-theme",
        tier === "starter" && "tier-starter",
        tier === "pro" && "tier-pro",
        tier === "premium" && "tier-premium"
      )}
    >
      {demoTier && !demoTier.clientEdition && <DemoGuideBar />}
      <MarketingBanner />
      <StorefrontHeader onCartOpen={() => setCartOpen(true)} />
      {demoTier && !demoTier.clientEdition && <TierClientExtras />}
      {demoTier?.clientEdition && demoTier.features.customerAccount && <TierClientExtras />}
      <main className={cn("pb-24 md:pb-0", tier === "starter" && "pb-20")}>
        <HeroSection basePath={basePath} />
        {tier !== "starter" && <FoodMosaic />}
        {!demoTier?.clientEdition && <TierFeaturesStrip />}
        {tier === "premium" && <FoodMarquee />}
        {!demoTier?.clientEdition && tier === "pro" && (
          <div className="border-y border-brand-orange/20 bg-brand-orange/5 py-3 text-center text-sm text-brand-orange">
            Version Pro — code promo{" "}
            <span className="font-bold">BIENVENUE10</span> au checkout
          </div>
        )}
        {!demoTier?.clientEdition && tier === "premium" && (
          <div className="border-y border-brand-gold/30 bg-brand-gold/10 py-3 text-center text-sm text-brand-gold">
            Version Premium — crédit 5 € au checkout + suivi live après commande
          </div>
        )}
        <MenuSection />
        {tier !== "starter" && <FormulesVisualSection />}
        <DeliverySection />
        {tier === "premium" && <AboutVisualSection />}
        {!demoTier?.clientEdition && tier === "starter" && (
          <section className="border-y border-white/5 bg-brand-anthracite/30 py-10 text-center">
            <p className="text-sm text-brand-cream/50">
              Formule essentielle — moins d’animations, focus commande rapide.
            </p>
            <a
              href="/demo/pro"
              className="mt-2 inline-block text-sm font-semibold text-brand-orange hover:underline"
            >
              Voir ce que Pro ajoute →
            </a>
          </section>
        )}
        {demoTier && !demoTier.clientEdition && (
          <CommercialCtaSection
            tier={demoTier.tier}
            title={`La formule ${demoTier.label} vous convient ?`}
            subtitle="On configure votre branding, votre zone et votre menu. Réponse sous 24 h."
          />
        )}
      </main>
      <StorefrontFooter />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <FirstOrderPopup />
      <PwaInstallBanner />
    </div>
  );
}
