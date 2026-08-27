"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductImage } from "@/components/products/product-card";
import type { CatalogProduct } from "@/lib/data/catalog";
import { formatMoney, sumCents } from "@/lib/pricing/money";
import { useCartStore, type CartOption } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: CatalogProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getDefaultSelections(product: CatalogProduct): Record<string, string[]> {
  const defaults: Record<string, string[]> = {};
  product.optionGroups?.forEach((group) => {
    const defaultOpt = group.options.find((o) => o.isDefault);
    if (defaultOpt) {
      defaults[group.name] = [defaultOpt.name];
    } else if (group.required) {
      defaults[group.name] = [group.options[0]?.name ?? ""];
    } else {
      defaults[group.name] = [];
    }
  });
  return defaults;
}

function ProductModalContent({
  product,
  onClose,
}: {
  product: CatalogProduct;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState(() => getDefaultSelections(product));
  const addItem = useCartStore((s) => s.addItem);

  const selectedOptions: CartOption[] = [];
  product.optionGroups?.forEach((group) => {
    const selected = selections[group.name] ?? [];
    selected.forEach((name) => {
      const opt = group.options.find((o) => o.name === name);
      if (opt) {
        selectedOptions.push({
          groupName: group.name,
          optionName: opt.name,
          priceCents: opt.priceCents,
        });
      }
    });
  });

  const unitTotal = sumCents(product.priceCents, ...selectedOptions.map((o) => o.priceCents));
  const lineTotal = unitTotal * quantity;

  const toggleOption = (groupName: string, optionName: string, maxSelect: number) => {
    setSelections((prev) => {
      const current = prev[groupName] ?? [];
      if (current.includes(optionName)) {
        return { ...prev, [groupName]: current.filter((n) => n !== optionName) };
      }
      if (maxSelect === 1) {
        return { ...prev, [groupName]: [optionName] };
      }
      if (current.length >= maxSelect) return prev;
      return { ...prev, [groupName]: [...current, optionName] };
    });
  };

  const handleAdd = () => {
    const missingRequired = product.optionGroups?.some(
      (g) => g.required && (selections[g.name]?.length ?? 0) < g.minSelect
    );
    if (missingRequired) {
      toast.error("Veuillez sélectionner toutes les options obligatoires");
      return;
    }
    addItem(product, quantity, selectedOptions);
    toast.success(`${product.name} ajouté au panier`);
    onClose();
  };

  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        <Image
          src={getProductImage(product.slug)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-anthracite to-transparent" />
      </div>

      <div className="space-y-4 p-5">
        <div>
          {product.badge && <Badge className="mb-2">{product.badge}</Badge>}
          <h2 className="font-display text-3xl tracking-wide text-brand-cream">
            {product.name.toUpperCase()}
          </h2>
          <p className="mt-2 text-sm text-brand-cream/70">{product.description}</p>
        </div>

        {product.optionGroups?.map((group) => (
          <div key={group.name}>
            <h3 className="mb-2 font-accent text-sm font-bold uppercase tracking-wider text-brand-orange">
              {group.name}
              {group.required && <span className="text-brand-red"> *</span>}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.options.map((opt) => {
                const isSelected = selections[group.name]?.includes(opt.name);
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => toggleOption(group.name, opt.name, group.maxSelect)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm transition-all",
                      isSelected
                        ? "border-brand-orange bg-brand-orange/20 text-brand-orange"
                        : "border-white/10 bg-brand-black/50 text-brand-cream/70 hover:border-white/20"
                    )}
                  >
                    {opt.name}
                    {opt.priceCents > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        +{formatMoney(opt.priceCents)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between rounded-xl bg-brand-black/50 p-3">
          <span className="text-sm font-medium text-brand-cream/70">Quantité</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-anthracite"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-bold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button className="w-full font-display text-lg tracking-wide" size="lg" onClick={handleAdd}>
          AJOUTER AU PANIER — {formatMoney(lineTotal)}
        </Button>
      </div>
    </>
  );
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-md">
        {product && (
          <ProductModalContent
            key={product.slug}
            product={product}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
