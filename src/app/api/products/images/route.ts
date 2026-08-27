import { NextResponse } from "next/server";
import { fetchProductImageMap } from "@/lib/products/images";

export async function GET() {
  try {
    const map = await fetchProductImageMap();
    return NextResponse.json(map);
  } catch (error) {
    console.error("Product images map error:", error);
    return NextResponse.json({});
  }
}
