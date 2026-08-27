import { v4 as uuidv4 } from "uuid";
import { createSupabaseAdmin } from "@/lib/db/supabase";

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
  const supabase = createSupabaseAdmin();
  const { data: existing } = await supabase
    .from("ProductImage")
    .select("id")
    .eq("productId", productId)
    .order("sortOrder", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (existing?.id) {
    const { error } = await supabase
      .from("ProductImage")
      .update({ url, alt: alt ?? null })
      .eq("id", existing.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("ProductImage").insert({
    id: uuidv4(),
    productId,
    url,
    alt: alt ?? null,
    sortOrder: 0,
  });
  if (error) throw error;
}

export async function fetchProductImageMap(): Promise<Record<string, string>> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("Product")
    .select("slug, images:ProductImage(url, sortOrder)")
    .eq("isActive", true);

  if (error) throw error;

  const map: Record<string, string> = {};
  for (const product of data ?? []) {
    const images = product.images as { url: string; sortOrder: number }[] | null;
    const url = getPrimaryImageUrl(
      images?.map((img, i) => ({
        id: "",
        productId: "",
        url: img.url,
        alt: null,
        sortOrder: img.sortOrder ?? i,
      }))
    );
    if (url && product.slug) map[product.slug] = url;
  }
  return map;
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

  const supabase = createSupabaseAdmin();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${uuidv4()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    if (uploadError.message.includes("Bucket not found")) {
      await supabase.storage.createBucket(BUCKET, { public: true });
      const { error: retryError } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type, upsert: false });
      if (retryError) throw retryError;
    } else {
      throw uploadError;
    }
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
