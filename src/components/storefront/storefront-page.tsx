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
        <FoodMosaic />
        <TierFeaturesStrip />
        <FoodMarquee />
        <MenuSection />
        <FormulesVisualSection />
        <DeliverySection />
        <AboutVisualSection />
      </main>
      <StorefrontFooter />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <FirstOrderPopup />
    </>
  );
}
