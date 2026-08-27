import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createSupabaseAdmin } from "@/lib/db/supabase";
import { fetchProduct, slugExists } from "@/lib/products/queries";
import { slugify, uniqueProductSlug } from "@/lib/products/slug";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const product = await fetchProduct(id);
    if (!product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      name?: string;
      description?: string;
      priceCents?: number;
      categoryId?: string;
      allergens?: string;
      badge?: string;
      isPopular?: boolean;
      isActive?: boolean;
    };

    const existing = await fetchProduct(id);
    if (!existing) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (body.name !== undefined) {
      updates.name = body.name.trim();
      const baseSlug = slugify(body.name);
      if (baseSlug && baseSlug !== existing.slug) {
        updates.slug = await uniqueProductSlug(baseSlug, (s) => slugExists(s, id));
      }
    }
    if (body.description !== undefined) updates.description = body.description.trim();
    if (body.priceCents !== undefined) updates.priceCents = Math.round(body.priceCents);
    if (body.categoryId !== undefined) updates.categoryId = body.categoryId;
    if (body.allergens !== undefined) updates.allergens = body.allergens.trim() || null;
    if (body.badge !== undefined) updates.badge = body.badge.trim() || null;
    if (body.isPopular !== undefined) updates.isPopular = body.isPopular;
    if (body.isActive !== undefined) updates.isActive = body.isActive;

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("Product")
      .update(updates)
      .eq("id", id)
      .select("*, category:Category(id, name, slug, emoji, sortOrder)")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("Product")
      .update({ isActive: false, updatedAt: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
