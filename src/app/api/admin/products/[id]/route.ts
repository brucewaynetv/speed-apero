import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { fetchProduct, slugExists } from "@/lib/products/queries";
import { upsertProductImage } from "@/lib/products/images";
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
      imageUrl?: string;
    };

    const existing = await fetchProduct(id);
    if (!existing) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    const data: {
      name?: string;
      slug?: string;
      description?: string;
      priceCents?: number;
      categoryId?: string;
      allergens?: string | null;
      badge?: string | null;
      isPopular?: boolean;
      isActive?: boolean;
    } = {};

    if (body.name !== undefined) {
      data.name = body.name.trim();
      const baseSlug = slugify(body.name);
      if (baseSlug && baseSlug !== existing.slug) {
        data.slug = await uniqueProductSlug(baseSlug, (s) => slugExists(s, id));
      }
    }
    if (body.description !== undefined) data.description = body.description.trim();
    if (body.priceCents !== undefined) data.priceCents = Math.round(body.priceCents);
    if (body.categoryId !== undefined) data.categoryId = body.categoryId;
    if (body.allergens !== undefined) data.allergens = body.allergens.trim() || null;
    if (body.badge !== undefined) data.badge = body.badge.trim() || null;
    if (body.isPopular !== undefined) data.isPopular = body.isPopular;
    if (body.isActive !== undefined) data.isActive = body.isActive;

    await prisma.product.update({ where: { id }, data });

    if (body.imageUrl?.trim()) {
      await upsertProductImage(id, body.imageUrl.trim(), (body.name ?? existing.name).trim());
    }

    const product = await fetchProduct(id);
    return NextResponse.json(product);
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
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
