"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminNav } from "@/lib/admin/features";
import { AdminTierSelector } from "@/components/admin/admin-tier-selector";

interface AdminShellProps {
  tier: DemoTier;
  email: string;
  children: React.ReactNode;
}

export function AdminShell({ tier, email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = getAdminNav(tier);

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
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:h-14">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <UtensilsCrossed className="h-5 w-5 shrink-0 text-brand-orange" />
            <span className="font-display text-lg tracking-wide text-brand-cream sm:text-xl">
              SPEED APÉRO
            </span>
            <AdminTierSelector currentTier={tier} />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden max-w-[180px] truncate text-xs text-brand-cream/60 xl:inline">
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
            {nav.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-orange text-white shadow-md shadow-brand-orange/25"
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
