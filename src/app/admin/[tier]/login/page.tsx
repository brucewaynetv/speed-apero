import { notFound, redirect } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { parseAdminTier, getAdminBasePath, getTierMeta } from "@/lib/admin/features";
import { LoginForm } from "@/components/admin/login-form";
import { isClientEdition } from "@/lib/product/edition";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function TierAdminLoginPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  const session = await getSession();
  if (session?.role === "ADMIN") {
    redirect(getAdminBasePath(tier));
  }

  const meta = getTierMeta(tier);

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <UtensilsCrossed className="mx-auto mb-4 h-10 w-10 text-brand-orange" />
          <h1 className="font-display text-4xl text-brand-cream">
            Admin {meta.label}
          </h1>
          <p className="mt-2 text-sm text-brand-cream/50">
            {isClientEdition()
              ? `Back-office ${meta.label}`
              : `Formule ${meta.label} · ${meta.price} €`}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-6">
          <LoginForm tier={tier} />
        </div>

        <p className="mt-4 text-center text-xs text-brand-cream/30">
          {isClientEdition() ? (
            <>Identifiants fournis à l&apos;installation</>
          ) : (
            <>
              admin@speedapero.demo / demo2026 ·{" "}
              <a href="/admin" className="text-brand-orange hover:underline">
                Changer de formule
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
