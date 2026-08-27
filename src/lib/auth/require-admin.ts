import { NextResponse } from "next/server";
import { getSession, type SessionPayload } from "./session";

export async function requireAdmin(): Promise<
  { session: SessionPayload } | { error: NextResponse }
> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return {
      error: NextResponse.json({ error: "Non autorisé" }, { status: 401 }),
    };
  }
  return { session };
}
