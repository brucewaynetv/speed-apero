"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS } from "@/lib/demo/tiers";
import {
  getSalesEmail,
  interestMessage,
  whatsappUrl,
} from "@/lib/demo/sales";
import { cn } from "@/lib/utils";

interface CommercialCtaButtonsProps {
  tier?: DemoTier;
  compact?: boolean;
  className?: string;
}

export function CommercialCtaButtons({
  tier,
  compact = false,
  className,
}: CommercialCtaButtonsProps) {
  const msg = interestMessage(tier);
  const wa = whatsappUrl(msg);
  const mail = `mailto:${getSalesEmail()}?subject=${encodeURIComponent(
    tier
      ? `Intérêt formule ${TIER_LABELS[tier]}`
      : "Intérêt formules Speed Apéro"
  )}&body=${encodeURIComponent(msg)}`;

  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        <Button asChild variant="secondary" size="sm" className="flex-1">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm" className="flex-1">
          <a href={mail}>
            <Mail className="h-3.5 w-3.5" />
            Email
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Button asChild size="lg" className="font-display text-lg tracking-wide">
        <a href={wa} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-5 w-5" />
          {tier
            ? `Cette formule m'intéresse — ${TIER_LABELS[tier]}`
            : "Cette formule m'intéresse"}
        </a>
      </Button>
      <Button asChild variant="secondary" size="lg">
        <a href={mail}>
          <Mail className="h-5 w-5" />
          Écrire un email
        </a>
      </Button>
    </div>
  );
}

interface CommercialCtaSectionProps {
  tier?: DemoTier;
  title?: string;
  subtitle?: string;
  showCompareLink?: boolean;
}

export function CommercialCtaSection({
  tier,
  title = "Cette formule vous parle ?",
  subtitle = "On vous rappelle pour adapter le menu, la zone et le branding à votre dark kitchen.",
  showCompareLink = true,
}: CommercialCtaSectionProps) {
  return (
    <section
      id="contact-commercial"
      className="border-y border-brand-orange/20 bg-gradient-to-r from-brand-orange/15 via-brand-anthracite to-brand-anthracite px-4 py-10 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-brand-cream/60">{subtitle}</p>
        <div className="mt-6 flex justify-center">
          <CommercialCtaButtons tier={tier} />
        </div>
        {showCompareLink && (
          <p className="mt-4 text-sm">
            <Link href="/demo" className="text-brand-orange hover:underline">
              Comparer les 3 formules
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
