"use client";

import Image from "next/image";
import { MARQUEE_IMAGES } from "@/lib/data/visuals";

export function FoodMarquee() {
  const strip = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/5 bg-brand-black py-3"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-black to-transparent" />
      <div className="animate-marquee flex w-max gap-3">
        {strip.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-44"
          >
            <Image src={src} alt="" fill className="object-cover" sizes="176px" />
          </div>
        ))}
      </div>
    </section>
  );
}
