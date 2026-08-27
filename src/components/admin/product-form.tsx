"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { AdminCategory, AdminProduct } from "@/lib/products/queries";
import { getPrimaryImageUrl } from "@/lib/products/images";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath } from "@/lib/admin/features";
import { ProductImageField } from "@/components/admin/product-image-field";

interface ProductFormProps {
  tier: DemoTier;
  categories: AdminCategory[];
  product?: AdminProduct;
}

export function ProductForm({ tier, categories, product }: ProductFormProps) {
  const router = useRouter();
  const base = getAdminBasePath(tier);
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [priceEuros, setPriceEuros] = useState(
    product ? (product.priceCents / 100).toFixed(2) : ""
  );
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ?? categories[0]?.id ?? ""
  );
  const [allergens, setAllergens] = useState(product?.allergens ?? "");
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [isPopular, setIsPopular] = useState(product?.isPopular ?? false);
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [imageUrl, setImageUrl] = useState(getPrimaryImageUrl(product?.images) ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceCents = Math.round(parseFloat(priceEuros.replace(",", ".")) * 100);
    if (!name.trim() || !categoryId || Number.isNaN(priceCents) || priceCents < 0) {
      toast.error("Vérifiez les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        description,
        priceCents,
        categoryId,
        allergens,
        badge,
        isPopular,
        isActive,
        imageUrl: imageUrl.trim() || undefined,
      };

      const res = await fetch(
        isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");

      toast.success(isEdit ? "Produit mis à jour" : "Produit créé");
      router.push(`${base}/produits`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-brand-anthracite px-4 py-3 text-brand-cream outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5">
      <ProductImageField value={imageUrl} onChange={setImageUrl} productName={name} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-cream/80">
          Nom *
        </label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-cream/80">
          Description
        </label>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-cream/80">
            Prix (€) *
          </label>
          <input
            className={inputClass}
            type="text"
            inputMode="decimal"
            value={priceEuros}
            onChange={(e) => setPriceEuros(e.target.value)}
            placeholder="12.90"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-cream/80">
            Catégorie *
          </label>
          <select
            className={inputClass}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-cream/80">
            Allergènes
          </label>
          <input className={inputClass} value={allergens} onChange={(e) => setAllergens(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-cream/80">
            Badge (ex: Nouveau)
          </label>
          <input className={inputClass} value={badge} onChange={(e) => setBadge(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-brand-cream/80">
          <input
            type="checkbox"
            checked={isPopular}
            onChange={(e) => setIsPopular(e.target.checked)}
            className="rounded border-white/20"
          />
          Produit populaire
        </label>
        <label className="flex items-center gap-2 text-sm text-brand-cream/80">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded border-white/20"
          />
          Actif (visible sur la carte)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Enregistrer" : "Créer le produit"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
