"use client";

import { useEffect, useState } from "react";
import {
  CATALOG_CATEGORIES,
  getProductsByCategory,
  type CatalogProduct,
} from "@/lib/data/catalog";
import { CategoryBar, useCategoryObserver } from "@/components/storefront/category-bar";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";

export function MenuSection() {
  const categorySlugs = CATALOG_CATEGORIES.map((c) => c.slug);
  const [activeCategory, setActiveCategory] = useCategoryObserver(categorySlugs);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/products/images")
      .then((r) => r.json())
      .then((data) => setImageMap(data as Record<string, string>))
      .catch(() => undefined);
  }, []);

  const handleSelect = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section id="carte" className="py-8 sm:py-12">
      <CategoryBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {CATALOG_CATEGORIES.map((category) => {
          const products = getProductsByCategory(category.slug);
          if (products.length === 0) return null;

          return (
            <div
              key={category.slug}
              id={`cat-${category.slug}`}
              className="scroll-mt-36 py-8 first:pt-4"
            >
              <h2 className="mb-6 flex items-center gap-2 font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
                <span>{category.emoji}</span>
                {category.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    imageOverride={imageMap[product.slug]}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProductModal
        product={selectedProduct}
        imageOverride={selectedProduct ? imageMap[selectedProduct.slug] : undefined}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
