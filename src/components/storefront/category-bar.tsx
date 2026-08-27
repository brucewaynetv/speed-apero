"use client";

import { useEffect, useRef, useState } from "react";
import { CATALOG_CATEGORIES } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <nav
      ref={scrollRef}
      className="sticky top-[calc(3.5rem+1px)] z-30 border-b border-white/5 bg-brand-black/95 backdrop-blur-xl sm:top-[calc(4rem+1px)]"
      aria-label="Catégories du menu"
    >
      <div className="scrollbar-hide flex gap-1 overflow-x-auto px-4 py-3 sm:px-6">
        {CATALOG_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => {
              onCategoryChange(cat.slug);
              document.getElementById(`cat-${cat.slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap",
              activeCategory === cat.slug
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/25"
                : "bg-brand-anthracite text-brand-cream/70 hover:bg-brand-anthracite/80 hover:text-brand-cream"
            )}
            aria-current={activeCategory === cat.slug ? "true" : undefined}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export function useCategoryObserver(categorySlugs: string[]) {
  const [activeCategory, setActiveCategory] = useState(categorySlugs[0] ?? "populaires");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categorySlugs.forEach((slug) => {
      const el = document.getElementById(`cat-${slug}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveCategory(slug);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categorySlugs]);

  return [activeCategory, setActiveCategory] as const;
}
