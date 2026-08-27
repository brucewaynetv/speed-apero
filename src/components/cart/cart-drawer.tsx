"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/pricing/money";
import {
  UPSELL_PRODUCTS,
  getProductBySlug,
} from "@/lib/data/catalog";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, addItem, getSubtotal } = useCartStore();
  const demoTier = useDemoTierOptional();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? 350 : 0;
  const total = subtotal + deliveryFee;

  const upsellItems = UPSELL_PRODUCTS.map((slug) => getProductBySlug(slug)).filter(Boolean);

  const handleUpsell = (slug: string) => {
    const product = getProductBySlug(slug);
    if (product) {
      addItem(product, 1, []);
    }
  };

  const checkoutPath = demoTier ? `${demoTier.basePath}/checkout` : "/demo/starter/checkout";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isMobile ? "bottom" : "right"} onClose={() => onOpenChange(false)}>
        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <p className="text-4xl">🛒</p>
              <p className="mt-4 font-accent text-lg text-brand-cream/70">
                Votre panier est vide
              </p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => onOpenChange(false)}
              >
                Voir la carte
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/5 bg-brand-black/40 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-brand-cream">{item.productName}</h4>
                        {item.options.length > 0 && (
                          <p className="mt-1 text-xs text-brand-cream/50">
                            {item.options.map((o) => o.optionName).join(", ")}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-bold text-brand-orange">
                          {formatMoney(item.unitPriceCents * item.quantity)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded p-1 text-brand-cream/40 hover:text-brand-red"
                        aria-label={`Supprimer ${item.productName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-anthracite"
                        aria-label="Diminuer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white"
                        aria-label="Augmenter"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/5 p-4">
                  <h3 className="font-accent text-sm font-bold uppercase tracking-wider text-brand-orange">
                    Ça irait bien avec...
                  </h3>
                  <div className="mt-3 space-y-2">
                    {upsellItems.map((product) => {
                      if (!product) return null;
                      return (
                        <div
                          key={product.slug}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-brand-cream/80">
                            {product.name}{" "}
                            <span className="text-brand-orange">
                              +{formatMoney(product.priceCents)}
                            </span>
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpsell(product.slug)}
                          >
                            + AJOUTER
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-4 space-y-2">
                <div className="flex justify-between text-sm text-brand-cream/70">
                  <span>Sous-total</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-cream/70">
                  <span>Livraison</span>
                  <span>{formatMoney(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-cream/70">
                  <span>Réduction</span>
                  <span>—</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-display text-xl text-brand-cream">
                  <span>TOTAL</span>
                  <span className="text-brand-orange">{formatMoney(total)}</span>
                </div>
                <Button asChild className="w-full font-display text-lg tracking-wide" size="lg">
                  <Link href={checkoutPath} onClick={() => onOpenChange(false)}>
                    COMMANDER — {formatMoney(total)}
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
