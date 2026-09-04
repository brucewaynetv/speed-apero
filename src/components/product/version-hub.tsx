import Image from "next/image";
import Link from "next/link";
import { Check, LayoutDashboard, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCT_VERSIONS, type ProductVersionInfo } from "@/lib/product/versions";
import { VISUALS } from "@/lib/data/visuals";
import { cn } from "@/lib/utils";

const VERSION_IMAGE: Record<ProductVersionInfo["id"], string> = {
  starter: VISUALS.fries,
  pro: VISUALS.smash,
  premium: VISUALS.grill,
};

function VersionCard({ version }: { version: ProductVersionInfo }) {
  const isGold = version.accent === "gold";
  const isOrange = version.accent === "orange";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-brand-anthracite/60",
        isOrange && "border-brand-orange/50 ring-1 ring-brand-orange/30 lg:scale-[1.02]",
        isGold && "border-brand-gold/40",
        version.accent === "neutral" && "border-white/10"
      )}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={VERSION_IMAGE[version.id]}
          alt={`Speed Apéro ${version.label}`}
          fill
          className={cn(
            "object-cover",
            version.id === "starter" && "saturate-75",
            version.id === "premium" && "contrast-110"
          )}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {version.recommended ? <Badge variant="gold">Recommandé</Badge> : null}
          {isGold ? <Badge variant="gold">Complet</Badge> : null}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-cream/50">
            {version.audience}
          </p>
          <h2
            className={cn(
              "font-display tracking-wide",
              isGold ? "text-4xl text-brand-gold" : "text-3xl text-brand-cream"
            )}
          >
            {version.label}
          </h2>
          <p className="font-display text-2xl text-brand-orange">{version.price} €</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="text-sm font-medium text-brand-cream/80">{version.promise}</p>
        <ul className="space-y-1.5">
          {version.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-brand-cream/65">
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isGold ? "text-brand-gold" : "text-brand-orange"
                )}
              />
              {b}
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-white/8 bg-brand-black/40 p-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand-cream/40">
            Modules inclus ({version.modules.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {version.modules.map((m) => (
              <span
                key={m.id}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-brand-cream/70"
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-brand-cream/40">{version.includesSetup}</p>

        <div className="mt-auto grid gap-2 sm:grid-cols-2">
          <Button asChild size="lg" className="font-display tracking-wide">
            <Link href={version.storefrontPath}>
              <Store className="h-4 w-4" />
              Site client
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="font-display tracking-wide">
            <Link href={version.adminLoginPath}>
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function VersionHubPage() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-white/5 bg-brand-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="font-display text-3xl tracking-wide text-brand-orange">
            SPEED APÉRO
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/demo"
              className="hidden text-sm text-brand-cream/60 hover:text-brand-orange sm:inline"
            >
              Comparateur
            </Link>
            <Badge variant="orange">3 versions produit</Badge>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/5 py-14 sm:py-20">
        <div className="absolute inset-0">
          <Image src={VISUALS.hero} alt="" fill className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-brand-black/75" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Plateforme commande · sans commission
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-wide text-brand-cream sm:text-6xl">
            LES 3 VERSIONS
            <span className="block text-brand-orange">SPEED APÉRO</span>
          </h1>
          <p className="mt-4 text-brand-cream/65">
            Trois packs installables séparément chez le client (Starter, Pro, Premium).
            Chaque archive est autonome : site + admin, édition figée à la compilation.
          </p>
          <p className="mt-2 font-mono text-xs text-brand-cream/40">
            npm run build:editions → dist/editions/*.tgz
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {PRODUCT_VERSIONS.map((version) => (
            <VersionCard key={version.id} version={version} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-brand-cream/35">
          Admin démo : admin@speedapero.demo / demo2026
        </p>
      </main>
    </div>
  );
}
