"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, Lock, LogOut, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS } from "@/lib/demo/tiers";
import { getAdminNav, getAdminNavWithLocks } from "@/lib/admin/features";

interface AdminShellProps {
  tier: DemoTier;
  email: string;
  children: React.ReactNode;
  /** Install client : pas de switcher ni teaser upgrade */
  clientEdition?: boolean;
}

export function AdminShell({
  tier,
  email,
  children,
  clientEdition = false,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = clientEdition ? getAdminNav(tier) : getAdminNavWithLocks(tier);

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
    <div
      className={cn(
        "flex min-h-dvh flex-col",
        tier === "premium" && "bg-gradient-to-b from-brand-gold/[0.04] to-transparent",
        tier === "pro" && "bg-gradient-to-b from-brand-orange/[0.03] to-transparent"
      )}
    >
      {!clientEdition ? (
        <div
          className={cn(
            "border-b px-4 py-1.5 text-center text-[11px] font-medium sm:text-xs",
            tier === "premium"
              ? "border-brand-gold/20 bg-brand-gold/10 text-brand-gold"
              : tier === "pro"
                ? "border-brand-orange/20 bg-brand-orange/10 text-brand-orange"
                : "border-white/5 bg-white/5 text-brand-cream/55"
          )}
        >
          Démo admin <strong>{TIER_LABELS[tier]}</strong>
          {" · "}
          <Link href={`/demo/${tier}`} className="underline underline-offset-2 hover:opacity-80">
            Voir le storefront
          </Link>
          {" · "}
          <Link href="/admin" className="underline underline-offset-2 hover:opacity-80">
            Changer de formule
          </Link>
        </div>
      ) : (
        <div
          className={cn(
            "border-b px-4 py-1.5 text-center text-[11px] font-medium sm:text-xs",
            tier === "premium"
              ? "border-brand-gold/20 bg-brand-gold/10 text-brand-gold"
              : tier === "pro"
                ? "border-brand-orange/20 bg-brand-orange/10 text-brand-orange"
                : "border-white/5 bg-white/5 text-brand-cream/55"
          )}
        >
          Speed Apéro <strong>{TIER_LABELS[tier]}</strong> · back-office
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:h-14">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <UtensilsCrossed className="h-5 w-5 shrink-0 text-brand-orange" />
            <span className="font-display text-lg tracking-wide text-brand-cream sm:text-xl">
              SPEED APÉRO
            </span>
            <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-cream/50">
              {TIER_LABELS[tier]}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={`/demo/${tier}`}
              className="hidden items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-brand-cream/60 hover:border-brand-orange/40 hover:text-brand-orange sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Site
            </Link>
            <span className="hidden max-w-[160px] truncate text-xs text-brand-cream/60 xl:inline">
              {email}
            </span>
            <Button variant="ghost" size="sm" className="h-9 gap-1.5 px-2.5" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>

        <nav
          aria-label="Navigation admin"
          className="border-t border-white/5 bg-brand-anthracite/40"
        >
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 py-2 scrollbar-hide sm:px-4">
            {nav.map(({ href, label, icon: Icon, locked, minTier }) => {
              const active = !locked && isActive(href);
              if (locked) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() =>
                      toast.message(`${label} · ${TIER_LABELS[minTier ?? "pro"]}`, {
                        description: `Débloqué en formule ${TIER_LABELS[minTier ?? "pro"]}`,
                      })
                    }
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-dashed border-white/10 px-3 text-sm font-medium text-brand-cream/30 hover:border-brand-gold/30 hover:text-brand-cream/50"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors",
                    active
                      ? tier === "premium"
                        ? "bg-brand-gold text-brand-black shadow-md shadow-brand-gold/20"
                        : "bg-brand-orange text-white shadow-md shadow-brand-orange/25"
                      : "text-brand-cream/65 hover:bg-white/5 hover:text-brand-cream"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
