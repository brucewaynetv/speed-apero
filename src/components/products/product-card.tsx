"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CatalogProduct } from "@/lib/data/catalog";
import { formatMoney } from "@/lib/pricing/money";
import { cn } from "@/lib/utils";

const PRODUCT_IMAGES: Record<string, string> = {
  "smash-original": "https://images.unsplash.com/photo-1568901347635-c4030f17a265?w=600&q=80",
  "double-smash": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80",
  "triple-smash": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
  "chicken-crispy": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80",
  "bacon-bbq": "https://images.unsplash.com/photo-1594212699903-ecfd1599af05?w=600&q=80",
  "kebab-maison": "https://images.unsplash.com/photo-1529006557810-274dbfebf025?w=600&q=80",
  "kebab-xl": "https://images.unsplash.com/photo-1633945274413-48af323fb308?w=600&q=80",
  "kebab-raclette": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
  "wrap-chicken": "https://images.unsplash.com/photo-1626700051175-6818013e5787?w=600&q=80",
  "wrap-crispy": "https://images.unsplash.com/photo-1626094309840-30a07761a37b?w=600&q=80",
  "wrap-spicy": "https://images.unsplash.com/photo-1626700051175-6818013e5787?w=600&q=80",
  "frites-maison": "https://images.unsplash.com/photo-1573080496219-9984b4c89425?w=600&q=80",
  "loaded-fries-cheddar": "https://images.unsplash.com/photo-1630384067228-2c45a57f9254?w=600&q=80",
  "loaded-fries-bacon": "https://images.unsplash.com/photo-1630384067228-2c45a57f9254?w=600&q=80",
  "loaded-fries-chicken": "https://images.unsplash.com/photo-1630384067228-2c45a57f9254?w=600&q=80",
  "classic-dog": "https://images.unsplash.com/photo-1612392062631-94de55327fff?w=600&q=80",
  "crispy-dog": "https://images.unsplash.com/photo-1612392062631-94de55327fff?w=600&q=80",
  "bbq-bacon-dog": "https://images.unsplash.com/photo-1612392062631-94de55327fff?w=600&q=80",
  tenders: "https://images.unsplash.com/photo-1567620832904-9fe5cf7bcfe6?w=600&q=80",
  nuggets: "https://images.unsplash.com/photo-1562967962-632e146e281b?w=600&q=80",
  "mozzarella-sticks": "https://images.unsplash.com/photo-1531741289258-d87127930c6e?w=600&q=80",
  "onion-rings": "https://images.unsplash.com/photo-1639024377883-141e176e9408?w=600&q=80",
  "tiramisu-speculoos": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
  "tiramisu-oreo": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
  "cheesecake-maison": "https://images.unsplash.com/photo-1533134242443-8544e3700ad6?w=600&q=80",
  "coca-cola": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&q=80",
  "coca-zero": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&q=80",
  "oasis-tropical": "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80",
  "eau-minerale": "https://images.unsplash.com/photo-1548839140-29a7492991a9?w=600&q=80",
};

interface ProductCardProps {
  product: CatalogProduct;
  imageOverride?: string;
  onSelect: (product: CatalogProduct) => void;
}

export function ProductCard({ product, imageOverride, onSelect }: ProductCardProps) {
  const imageUrl = getProductImage(product.slug, imageOverride);

  return (
    <article className="food-card group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
        {product.badge && (
          <Badge className="absolute left-3 top-3 text-[10px]">{product.badge}</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-accent text-lg font-bold uppercase tracking-wide text-brand-cream">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-brand-cream/60">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-2xl text-brand-orange">
            {formatMoney(product.priceCents)}
          </span>
          <button
            type="button"
            onClick={() => onSelect(product)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-brand-orange text-white shadow-lg shadow-brand-orange/30",
              "transition-transform hover:scale-110 active:scale-95"
            )}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function getProductImage(slug: string, override?: string): string {
  if (override) return override;
  return PRODUCT_IMAGES[slug] ?? PRODUCT_IMAGES["smash-original"];
}
