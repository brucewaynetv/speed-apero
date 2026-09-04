"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CatalogProduct } from "@/lib/data/catalog";
import { formatMoney } from "@/lib/pricing/money";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: CatalogProduct;
  imageOverride?: string;
  onSelect: (product: CatalogProduct) => void;
}

export function ProductCard({ product, imageOverride, onSelect }: ProductCardProps) {
  const imageUrl = getProductImage(product, imageOverride);
  const disabled = Boolean(product.unavailable);

  return (
    <article
      className={cn(
        "food-card group flex flex-col",
        disabled && "opacity-60"
      )}
    >
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
            {product.priceCents > 0 ? formatMoney(product.priceCents) : "Infos"}
          </span>
          <button
            type="button"
            onClick={() => onSelect(product)}
            disabled={disabled}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-brand-orange text-white shadow-lg shadow-brand-orange/30",
              "transition-transform hover:scale-110 active:scale-95",
              disabled && "cursor-not-allowed opacity-50 hover:scale-100"
            )}
            aria-label={
              disabled
                ? `${product.name} indisponible`
                : `Composer ${product.name}`
            }
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function getProductImage(
  productOrSlug: CatalogProduct | string,
  override?: string
): string {
  if (override) return override;
  if (typeof productOrSlug === "string") {
    return "/images/food/food-spread.jpg";
  }
  return productOrSlug.image || "/images/food/food-spread.jpg";
}
