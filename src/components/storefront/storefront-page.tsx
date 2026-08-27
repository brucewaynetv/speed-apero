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
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";

export function StorefrontPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const demoTier = useDemoTierOptional();
  const basePath = demoTier?.basePath ?? "";

  return (
    <>
      <MarketingBanner />
      <StorefrontHeader onCartOpen={() => setCartOpen(true)} />
      <TierClientExtras />
      <main className="pb-20 md:pb-0">
        <HeroSection basePath={basePath} />
        <TierFeaturesStrip />
        <MenuSection />
        <DeliverySection />
        <section id="formules" className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
              NOS FORMULES
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-cream/60">
              Menus complets pour tous les appétits. Composez votre repas ou choisissez une
              formule généreuse.
            </p>
          </div>
        </section>
        <section
          id="apropos"
          className="border-t border-white/5 bg-brand-anthracite/30 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
              À PROPOS
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-brand-cream/70">
              Speed Apéro, c&apos;est la street-food généreuse faite maison et livrée rapidement.
              Burgers smashés, kebabs maison, wraps croustillants et loaded fries préparés avec
              passion dans notre dark kitchen.
            </p>
          </div>
        </section>
      </main>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <FirstOrderPopup />
    </>
  );
}
