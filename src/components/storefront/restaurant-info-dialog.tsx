"use client";

import {
  Clock,
  CreditCard,
  Info,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  HOURS_LABELS,
  INFO_DELIVERY_ZONES,
  RESTAURANT,
} from "@/lib/data/restaurant";
import { formatMoney } from "@/lib/pricing/money";

interface RestaurantInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestaurantInfoDialog({ open, onOpenChange }: RestaurantInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto p-0 sm:max-w-2xl">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-brand-orange" />
            <h2 className="font-display text-2xl tracking-wide text-brand-cream">
              Infos & livraison
            </h2>
          </div>
          <p className="mt-1 text-sm text-brand-cream/55">{RESTAURANT.fullAddress}</p>
        </div>

        <div className="relative aspect-[16/10] w-full bg-brand-black">
          <iframe
            title="Carte des zones de livraison Speed Apéro"
            src={RESTAURANT.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <p className="border-b border-white/5 px-5 py-3 text-xs leading-relaxed text-brand-cream/45">
          {RESTAURANT.cookieNote}
        </p>

        <div className="grid gap-6 px-5 py-5 sm:grid-cols-2">
          <div className="space-y-5">
            <section>
              <h3 className="mb-3 flex items-center gap-2 font-accent text-xs font-bold uppercase tracking-wider text-brand-orange">
                <Truck className="h-4 w-4" />
                Frais de livraison
              </h3>
              <ul className="space-y-2.5">
                {INFO_DELIVERY_ZONES.map((zone) => (
                  <li
                    key={zone.id}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-brand-black/40 px-3 py-2.5"
                  >
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: zone.color }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-brand-cream">
                        Min {formatMoney(zone.minimumCents)} · Frais{" "}
                        {formatMoney(zone.deliveryFeeCents)}
                      </p>
                      <p className="text-xs text-brand-cream/45">{zone.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 flex items-center gap-2 font-accent text-xs font-bold uppercase tracking-wider text-brand-orange">
                <Truck className="h-4 w-4" />
                Livraison
              </h3>
              <p className="text-sm text-brand-cream/70">{RESTAURANT.deliveryNote}</p>
            </section>

            <section>
              <h3 className="mb-2 flex items-center gap-2 font-accent text-xs font-bold uppercase tracking-wider text-brand-orange">
                <CreditCard className="h-4 w-4" />
                Mode de paiement
              </h3>
              <ul className="space-y-1 text-sm text-brand-cream/70">
                {RESTAURANT.paymentMethods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 flex items-center gap-2 font-accent text-xs font-bold uppercase tracking-wider text-brand-orange">
                <Phone className="h-4 w-4" />
                Téléphone
              </h3>
              <a
                href={`tel:${RESTAURANT.phoneTel}`}
                className="text-sm font-semibold text-brand-cream hover:text-brand-orange"
              >
                {RESTAURANT.phoneDisplay}
              </a>
            </section>
          </div>

          <div className="space-y-5">
            <section>
              <h3 className="mb-3 flex items-center gap-2 font-accent text-xs font-bold uppercase tracking-wider text-brand-orange">
                <Clock className="h-4 w-4" />
                Horaires d&apos;ouverture
              </h3>
              <ul className="divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10">
                {HOURS_LABELS.map((row) => (
                  <li
                    key={row.days}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm"
                  >
                    <span className="text-brand-cream/70">{row.days}</span>
                    <span className="font-medium text-brand-cream">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 flex items-center gap-2 font-accent text-xs font-bold uppercase tracking-wider text-brand-orange">
                <MapPin className="h-4 w-4" />
                Adresse
              </h3>
              <p className="text-sm text-brand-cream/70">{RESTAURANT.fullAddress}</p>
              <a
                href={RESTAURANT.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-semibold text-brand-orange hover:underline"
              >
                Ouvrir dans Google Maps →
              </a>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
