import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { uploadProductImageFile } from "@/lib/products/images";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Fichier requis" }, { status: 400 });
    }

    const url = await uploadProductImageFile(file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload image error:", error);
    const message =
      error instanceof Error ? error.message : "Erreur lors de l'upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
