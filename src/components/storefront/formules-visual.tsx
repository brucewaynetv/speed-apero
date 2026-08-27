"use client";

import Image from "next/image";
import Link from "next/link";
import { FORMULE_MENUS } from "@/lib/data/visuals";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";

export function FormulesVisualSection() {
  const demo = useDemoTierOptional();
  const basePath = demo?.basePath ?? "";

  return (
    <section id="formules" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl tracking-wide text-brand-cream sm:text-5xl">
            NOS FORMULES
          </h2>
          <p className="mt-3 text-brand-cream/60">
            Menus complets, prêts à commander — généreux et sans prise de tête.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FORMULE_MENUS.map((menu) => (
            <Link
              key={menu.name}
              href={`${basePath}#carte`}
              className="group relative block min-h-[320px] overflow-hidden rounded-2xl"
            >
              <Image
                src={menu.image}
                alt={menu.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-3xl text-brand-cream">{menu.name}</p>
                <p className="mt-1 text-sm text-brand-cream/70">{menu.desc}</p>
                <p className="mt-3 font-display text-2xl text-brand-orange">{menu.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
