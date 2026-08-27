"use client";

import Image from "next/image";
import Link from "next/link";
import { VISUALS } from "@/lib/data/visuals";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";

export function StorefrontFooter() {
  const demo = useDemoTierOptional();

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0">
        <Image
          src={VISUALS.ambiance}
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-black/90" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-4xl tracking-wide text-brand-orange">SPEED APÉRO</p>
          <p className="mt-2 max-w-md text-sm text-brand-cream/50">
            Dark kitchen · Street food maison · Livraison rapide
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#carte" className="text-brand-cream/60 hover:text-brand-orange">
            La carte
          </a>
          <a href="#livraison" className="text-brand-cream/60 hover:text-brand-orange">
            Livraison
          </a>
          {demo && (
            <Link
              href={`/admin/${demo.tier}/login`}
              className="text-brand-cream/60 hover:text-brand-orange"
            >
              Admin
            </Link>
          )}
          <Link href="/demo" className="text-brand-cream/60 hover:text-brand-orange">
            Formules
          </Link>
        </div>
      </div>
    </footer>
  );
}
