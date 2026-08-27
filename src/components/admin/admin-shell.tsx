"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminNav, getTierMeta } from "@/lib/admin/features";
import { TIER_LABELS } from "@/lib/demo/tiers";

interface AdminShellProps {
  tier: DemoTier;
  email: string;
  children: React.ReactNode;
}

const TIER_BADGE: Record<DemoTier, string> = {
  starter: "bg-white/10 text-brand-cream border-white/20",
  pro: "bg-brand-orange/20 text-brand-orange border-brand-orange/40",
  premium: "bg-brand-gold/20 text-brand-gold border-brand-gold/40",
};

export function AdminShell({ tier, email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = getAdminNav(tier);
  const meta = getTierMeta(tier);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/admin/${tier}/login`);
    router.refresh();
  }

  function isActive(href: string) {
    if (href.endsWith(`/admin/${tier}`)) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-5 w-5 text-brand-orange" />
            <span className="font-display text-xl tracking-wide text-brand-cream">
              SPEED APÉRO
            </span>
            <span
              className={cn(
                "hidden rounded border px-2 py-0.5 text-xs font-bold uppercase sm:inline",
                TIER_BADGE[tier]
              )}
            >
              {TIER_LABELS[tier]} · {meta.price} €
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(href)
                    ? "bg-brand-orange/15 text-brand-orange"
                    : "text-brand-cream/70 hover:bg-white/5 hover:text-brand-cream"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="hidden text-xs text-brand-cream/40 hover:text-brand-orange sm:inline"
            >
              Changer de formule
            </Link>
            <span className="hidden text-xs text-brand-cream/50 lg:inline">{email}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden scrollbar-hide">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium",
                isActive(href) ? "bg-brand-orange/15 text-brand-orange" : "text-brand-cream/70"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
