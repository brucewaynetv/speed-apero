import { redirect } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <UtensilsCrossed className="mx-auto mb-4 h-10 w-10 text-brand-orange" />
          <h1 className="font-display text-4xl text-brand-cream">Admin Speed Apéro</h1>
          <p className="mt-2 text-sm text-brand-cream/50">
            Connectez-vous pour gérer les commandes
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-6">
          <LoginForm />
        </div>

        <p className="mt-4 text-center text-xs text-brand-cream/30">
          Démo : admin@speedapero.demo / demo2026
        </p>
      </div>
    </div>
  );
}
