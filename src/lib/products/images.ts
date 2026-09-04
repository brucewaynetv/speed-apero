import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/db/prisma";
import { tryCreateSupabaseAdmin } from "@/lib/db/supabase";

export interface ProductImageRecord {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export function getPrimaryImageUrl(
  images?: ProductImageRecord[] | null
): string | null {
  if (!images?.length) return null;
  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  return sorted[0]?.url ?? null;
}

export async function upsertProductImage(
  productId: string,
  url: string,
  alt?: string
): Promise<void> {
  const existing = await prisma.productImage.findFirst({
    where: { productId },
    orderBy: { sortOrder: "asc" },
    select: { id: true },
  });

  if (existing) {
    await prisma.productImage.update({
      where: { id: existing.id },
      data: { url, alt: alt ?? null },
    });
    return;
  }

  await prisma.productImage.create({
    data: {
      productId,
      url,
      alt: alt ?? null,
      sortOrder: 0,
    },
  });
}

export async function fetchProductImageMap(): Promise<Record<string, string>> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        images: {
          orderBy: { sortOrder: "asc" },
          select: { url: true, sortOrder: true },
        },
      },
    });

    const map: Record<string, string> = {};
    for (const product of products) {
      const url = product.images[0]?.url;
      if (url) map[product.slug] = url;
    }
    return map;
  } catch (e) {
    console.warn("Product images map fallback:", e);
    return {};
  }
}

const BUCKET = "product-images";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function uploadProductImageFile(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Format accepté : JPG, PNG, WebP ou GIF");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image trop lourde (max 5 Mo)");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${uuidv4()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = tryCreateSupabaseAdmin();
  if (supabase && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });
    if (!uploadError) {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
      return data.publicUrl;
    }
    console.warn("Supabase upload failed, fallback local:", uploadError.message);
  }

  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/products/${filename}`;
}
