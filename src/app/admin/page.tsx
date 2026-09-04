import Link from "next/link";
import { ADMIN_TIERS, getAdminBasePath } from "@/lib/admin/features";
import { PRODUCT_VERSIONS } from "@/lib/product/versions";
import { cn } from "@/lib/utils";

export default function AdminTierSelectorPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl text-brand-cream">Admin — 3 versions</h1>
        <p className="mt-2 text-brand-cream/50">
          Chaque formule a son back-office réel (modules filtrés selon le pack)
        </p>
        <Link href="/" className="mt-3 inline-block text-sm text-brand-orange hover:underline">
          ← Hub des versions
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PRODUCT_VERSIONS.map((version) => {
          const adminModules = version.modules.filter((m) => m.area === "admin");
          return (
            <Link
              key={version.id}
              href={version.adminLoginPath}
              className={cn(
                "food-card flex flex-col p-6 transition-all",
                version.recommended && "border-brand-orange/50 ring-1 ring-brand-orange/30",
                version.accent === "gold" && "border-brand-gold/40"
              )}
            >
              {version.recommended ? (
                <span className="mb-2 self-start rounded bg-brand-orange px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Recommandé
                </span>
              ) : null}
              <h2
                className={cn(
                  "font-display text-3xl",
                  version.accent === "gold" ? "text-brand-gold" : "text-brand-cream"
                )}
              >
                {version.label}
              </h2>
              <p className="mt-1 font-display text-2xl text-brand-orange">{version.price} €</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-xs text-brand-cream/60">
                {adminModules.map((m) => (
                  <li key={m.id}>✓ {m.label}</li>
                ))}
              </ul>
              <span className="mt-6 block rounded-lg bg-brand-orange/15 py-2.5 text-center text-sm font-bold text-brand-orange">
                Ouvrir admin {version.label}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-brand-cream/30">
        Identifiants : admin@speedapero.demo / demo2026 · Accès direct :{" "}
        {ADMIN_TIERS.map((t) => (
          <span key={t}>
            <Link href={getAdminBasePath(t)} className="text-brand-orange hover:underline">
              /admin/{t}
            </Link>{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
