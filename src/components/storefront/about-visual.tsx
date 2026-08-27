"use client";

import Image from "next/image";
import { VISUALS } from "@/lib/data/visuals";

export function AboutVisualSection() {
  return (
    <section id="apropos" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0">
        <Image
          src={VISUALS.kitchen}
          alt="Cuisine Speed Apéro"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-brand-black/40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-4xl tracking-wide text-brand-cream sm:text-5xl">
            À PROPOS
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-cream/75">
            Speed Apéro, c&apos;est la street-food généreuse faite maison et livrée rapidement.
            Burgers smashés, kebabs maison, wraps croustillants et loaded fries préparés avec
            passion dans notre dark kitchen.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Steaks smashés à la minute",
              "Sauces maison",
              "Frites fraîches",
              "Desserts préparés sur place",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-brand-black/40 px-4 py-3 text-sm text-brand-cream/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src={VISUALS.grill}
              alt="Grill et street food"
              fill
              className="object-cover"
              sizes="40vw"
            />
          </div>
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src={VISUALS.ingredients}
              alt="Ingrédients frais"
              fill
              className="object-cover"
              sizes="40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
