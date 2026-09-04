"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CATALOG_PRODUCTS,
  getProductBySlug,
  type CatalogProduct,
} from "@/lib/data/catalog";
import { ProductModal } from "@/components/products/product-modal";
import { formatMoney } from "@/lib/pricing/money";

export function FormulesVisualSection() {
  const menus = useMemo(
    () =>
      CATALOG_PRODUCTS.filter(
        (p) =>
          p.categorySlug === "menus" ||
          p.categorySlug === "boxs" ||
          /menu|box/i.test(p.name)
      ).slice(0, 6),
    []
  );

  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (slug: string) => {
    const product = getProductBySlug(slug);
    if (!product) return;
    setSelected(product);
    setOpen(true);
  };

  if (menus.length === 0) return null;

  return (
    <section id="formules" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl tracking-wide text-brand-cream sm:text-5xl">
            MENUS & BOXS
          </h2>
          <p className="mt-3 text-brand-cream/60">
            Les formules FoodBooking — cliquez pour composer boissons, sauces et extras.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <button
              key={menu.slug}
              type="button"
              onClick={() => handleOpen(menu.slug)}
              className="group relative block min-h-[300px] overflow-hidden rounded-2xl text-left"
            >
              <Image
                src={menu.image}
                alt={menu.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl leading-tight text-brand-cream sm:text-3xl">
                  {menu.name}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-brand-cream/70">
                  {menu.description}
                </p>
                <p className="mt-3 font-display text-2xl text-brand-orange">
                  {formatMoney(menu.priceCents)}
                </p>
                <span className="mt-3 inline-block rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-accent font-bold uppercase tracking-wider text-white">
                  Composer →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProductModal product={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
