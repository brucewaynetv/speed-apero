import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSupabaseAdmin } from "@/lib/db/supabase";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    const { data: user, error } = await supabase
      .from("User")
      .select("id, email, passwordHash, role")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (error) throw error;
    if (!user?.passwordHash) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: "ADMIN",
    });

    const response = NextResponse.json({ ok: true, email: user.email });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur de connexion" }, { status: 500 });
  }
}
