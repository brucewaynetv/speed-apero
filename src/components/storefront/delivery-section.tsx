"use client";

import { Truck, Clock, MapPin } from "lucide-react";
import { DELIVERY_ZONES } from "@/lib/data/catalog";
import { formatMoney } from "@/lib/pricing/money";

export function DeliverySection() {
  return (
    <section id="livraison" className="border-t border-white/5 bg-brand-anthracite/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
          LIVRAISON & RETRAIT
        </h2>
        <p className="mt-2 max-w-xl text-brand-cream/60">
          Livraison rapide dans votre secteur ou retrait sur place.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-brand-black/50 p-6">
            <Truck className="h-8 w-8 text-brand-orange" />
            <h3 className="mt-3 font-accent text-lg font-bold uppercase">Livraison</h3>
            <p className="mt-2 text-sm text-brand-cream/60">
              Commandez en ligne, on livre chez vous en 25 à 40 minutes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-brand-black/50 p-6">
            <MapPin className="h-8 w-8 text-brand-gold" />
            <h3 className="mt-3 font-accent text-lg font-bold uppercase">Retrait</h3>
            <p className="mt-2 text-sm text-brand-cream/60">
              Passez commande et récupérez votre repas sur place.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-brand-black/50 p-6 sm:col-span-2 lg:col-span-1">
            <Clock className="h-8 w-8 text-brand-red" />
            <h3 className="mt-3 font-accent text-lg font-bold uppercase">Horaires</h3>
            <p className="mt-2 text-sm text-brand-cream/60">
              Lun-Mar-Jeu-Ven : 11h-13h & 16h-23h<br />
              Mer : 16h-23h<br />
              Sam-Dim : 11h-13h & 16h-00h
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-brand-black/50">
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
                  <td className="px-4 py-3 text-brand-cream/70">~{zone.estimatedMinutes} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
