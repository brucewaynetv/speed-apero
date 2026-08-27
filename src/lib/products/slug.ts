export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uniqueProductSlug(
  baseSlug: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = baseSlug;
  let i = 1;
  while (await exists(slug)) {
    slug = `${baseSlug}-${i}`;
    i += 1;
  }
  return slug;
}
