import { prisma } from "@/lib/db/prisma";
import type { ProductImageRecord } from "@/lib/products/images";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
  sortOrder: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  categoryId: string;
  allergens: string | null;
  badge: string | null;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  category?: AdminCategory | null;
  images?: ProductImageRecord[];
}

function mapProduct(p: {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  categoryId: string;
  allergens: string | null;
  badge: string | null;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
    slug: string;
    emoji: string | null;
    sortOrder: number;
  } | null;
  images?: {
    id: string;
    productId: string;
    url: string;
    alt: string | null;
    sortOrder: number;
  }[];
}): AdminProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    priceCents: p.priceCents,
    categoryId: p.categoryId,
    allergens: p.allergens,
    badge: p.badge,
    isPopular: p.isPopular,
    isActive: p.isActive,
    sortOrder: p.sortOrder,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    category: p.category ?? null,
    images: p.images ?? [],
  };
}

export async function fetchCategories(): Promise<AdminCategory[]> {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, slug: true, emoji: true, sortOrder: true },
  });
}

export async function fetchProducts(): Promise<AdminProduct[]> {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      category: {
        select: { id: true, name: true, slug: true, emoji: true, sortOrder: true },
      },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  return products.map(mapProduct);
}

export async function fetchProduct(id: string): Promise<AdminProduct | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: { id: true, name: true, slug: true, emoji: true, sortOrder: true },
      },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  return product ? mapProduct(product) : null;
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const found = await prisma.product.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  });
  return Boolean(found);
}
