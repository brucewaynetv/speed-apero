"use client";

import Image from "next/image";
import { MOSAIC_IMAGES } from "@/lib/data/visuals";

export function FoodMosaic() {
  return (
    <section aria-label="Galerie street food" className="overflow-hidden border-y border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {MOSAIC_IMAGES.map((item, i) => (
          <a
            key={item.label}
            href="#carte"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              priority={i < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
            <span className="absolute bottom-3 left-3 font-display text-xl tracking-wide text-brand-cream sm:text-2xl">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
