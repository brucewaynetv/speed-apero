"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/pricing/money";
import type { AdminProduct } from "@/lib/products/queries";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath } from "@/lib/admin/features";

interface ProductsManagerProps {
  tier: DemoTier;
  initialProducts: AdminProduct[];
}

export function ProductsManager({ tier, initialProducts }: ProductsManagerProps) {
  const base = getAdminBasePath(tier);
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [deleting, setDeleting] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Désactiver « ${name} » ?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast.success("Produit désactivé");
      await refresh();
      router.refresh();
    } catch {
      toast.error("Impossible de supprimer");
    } finally {
      setDeleting(null);
    }
  }

  const active = products.filter((p) => p.isActive);
  const inactive = products.filter((p) => !p.isActive);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-brand-cream/60">
          {active.length} produit{active.length !== 1 ? "s" : ""} actif
          {active.length !== 1 ? "s" : ""}
        </p>
        <Button asChild>
          <Link href={`${base}/produits/nouveau`}>
            <Plus className="h-4 w-4" />
            Ajouter un produit
          </Link>
        </Button>
      </div>

      <ProductTable
        products={active}
        tier={tier}
        deleting={deleting}
        onDelete={handleDelete}
      />

      {inactive.length > 0 && (
        <section>
          <h2 className="mb-3 font-accent text-sm font-bold uppercase tracking-wide text-brand-cream/40">
            Inactifs
          </h2>
          <ProductTable
            products={inactive}
            tier={tier}
            deleting={deleting}
            onDelete={handleDelete}
            muted
          />
        </section>
      )}
    </div>
  );
}

function ProductTable({
  products,
  tier,
  deleting,
  onDelete,
  muted,
}: {
  products: AdminProduct[];
  tier: DemoTier;
  deleting: string | null;
  onDelete: (id: string, name: string) => void;
  muted?: boolean;
}) {
  const base = getAdminBasePath(tier);

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-10 text-center text-brand-cream/50">
        Aucun produit
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-brand-anthracite text-left text-xs uppercase tracking-wide text-brand-cream/40">
          <tr>
            <th className="px-4 py-3">Produit</th>
            <th className="hidden px-4 py-3 sm:table-cell">Catégorie</th>
            <th className="px-4 py-3">Prix</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-brand-black/40">
          {products.map((product) => (
            <tr key={product.id} className={muted ? "opacity-50" : undefined}>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-brand-cream">{product.name}</span>
                  {product.isPopular && <Badge variant="gold">Populaire</Badge>}
                  {product.badge && <Badge>{product.badge}</Badge>}
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-brand-cream/40">
                  {product.description}
                </p>
              </td>
              <td className="hidden px-4 py-3 text-brand-cream/60 sm:table-cell">
                {product.category?.emoji} {product.category?.name}
              </td>
              <td className="px-4 py-3 font-semibold text-brand-gold">
                {formatMoney(product.priceCents)}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`${base}/produits/${product.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deleting === product.id}
                    onClick={() => onDelete(product.id, product.name)}
                  >
                    {deleting === product.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-brand-red" />
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
