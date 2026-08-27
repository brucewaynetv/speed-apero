"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { RestaurantStatus } from "@/components/storefront/restaurant-status";
import { DemoTierSelector } from "@/components/demo/demo-tier-selector";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/pricing/money";
import { cn } from "@/lib/utils";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#carte", label: "La carte" },
  { href: "#formules", label: "Nos formules" },
  { href: "#livraison", label: "Livraison" },
  { href: "#apropos", label: "À propos" },
];

interface StorefrontHeaderProps {
  onCartOpen: () => void;
}

export function StorefrontHeader({ onCartOpen }: StorefrontHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const demoTier = useDemoTierOptional();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-brand-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href={demoTier ? demoTier.basePath : "/demo"}
          className="font-display text-2xl tracking-wide text-brand-orange sm:text-3xl"
        >
          SPEED APÉRO
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-cream/70 transition-colors hover:text-brand-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <RestaurantStatus />
          <button
            type="button"
            onClick={onCartOpen}
            className="relative flex items-center gap-1.5 rounded-lg bg-brand-anthracite px-3 py-2 text-sm font-semibold transition-colors hover:bg-brand-orange/20"
            aria-label={`Panier, ${itemCount} article${itemCount !== 1 ? "s" : ""}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Panier</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {demoTier && (
        <div className="flex items-center gap-3 border-t border-white/5 bg-brand-anthracite/50 px-4 py-2">
          <DemoTierSelector currentTier={demoTier.tier} />
          <Link
            href={`/admin/${demoTier.tier}/login`}
            className="shrink-0 text-xs font-semibold uppercase tracking-wide text-brand-cream/50 hover:text-brand-orange"
          >
            Admin →
          </Link>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-brand-anthracite transition-all lg:hidden",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-cream/80 hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-orange/30 bg-brand-black/95 p-3 backdrop-blur-xl md:hidden">
          <Button
            className="w-full font-display text-lg tracking-wide"
            size="lg"
            onClick={onCartOpen}
          >
            VOIR MON PANIER • {formatMoney(subtotal)}
          </Button>
        </div>
      )}
    </header>
  );
}
