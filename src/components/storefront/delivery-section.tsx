"use client";

import Image from "next/image";
import { Truck, Clock, MapPin } from "lucide-react";
import { DELIVERY_ZONES } from "@/lib/data/catalog";
import { formatMoney } from "@/lib/pricing/money";
import { VISUALS } from "@/lib/data/visuals";

export function DeliverySection() {
  return (
    <section id="livraison" className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0">
        <Image
          src={VISUALS.delivery}
          alt="Livraison Speed Apéro"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/95 to-brand-black" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-4xl tracking-wide text-brand-cream sm:text-5xl">
          LIVRAISON & RETRAIT
        </h2>
        <p className="mt-3 max-w-xl text-brand-cream/60">
          Livraison rapide dans votre secteur ou retrait sur place.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Livraison",
              text: "Chez vous en 25 à 40 minutes.",
              color: "text-brand-orange",
            },
            {
              icon: MapPin,
              title: "Retrait",
              text: "Récupérez votre repas sur place.",
              color: "text-brand-gold",
            },
            {
              icon: Clock,
              title: "Horaires",
              text: "Lun-Ven 11h-23h · Week-end jusqu'à minuit",
              color: "text-brand-red",
            },
          ].map(({ icon: Icon, title, text, color }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-brand-anthracite/80 p-6 backdrop-blur-sm"
            >
              <Icon className={`h-8 w-8 ${color}`} />
              <h3 className="mt-3 font-accent text-lg font-bold uppercase">{title}</h3>
              <p className="mt-2 text-sm text-brand-cream/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-brand-black/60 backdrop-blur-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-left font-accent uppercase tracking-wider text-brand-orange">
                  Zone
                </th>
                <th className="px-4 py-3 text-left font-accent uppercase tracking-wider text-brand-orange">
                  Frais
                </th>
                <th className="hidden px-4 py-3 text-left font-accent uppercase tracking-wider text-brand-orange sm:table-cell">
                  Minimum
                </th>
                <th className="px-4 py-3 text-left font-accent uppercase tracking-wider text-brand-orange">
                  Délai
                </th>
              </tr>
            </thead>
            <tbody>
              {DELIVERY_ZONES.map((zone) => (
                <tr key={zone.name} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-brand-cream">{zone.name}</td>
                  <td className="px-4 py-3 text-brand-cream/70">
                    {formatMoney(zone.deliveryFeeCents)}
                  </td>
                  <td className="hidden px-4 py-3 text-brand-cream/70 sm:table-cell">
                    {formatMoney(zone.minimumCents)}
                  </td>
                  <td className="px-4 py-3 text-brand-cream/70">
                    ~{zone.estimatedMinutes} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
