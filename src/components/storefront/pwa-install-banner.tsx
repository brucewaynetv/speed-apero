"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useDemoTierOptional } from "@/components/demo/demo-tier-provider";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Bannière d'installation PWA — Premium uniquement. */
export function PwaInstallBanner() {
  const demo = useDemoTierOptional();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (demo?.tier !== "premium" || !demo.features.pwa) return;

    const linkId = "speed-apero-pwa-manifest";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "manifest";
      link.href = "/manifest-premium.webmanifest";
      document.head.appendChild(link);
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, [demo?.tier, demo?.features.pwa]);

  if (!demo?.features.pwa || !deferred || dismissed) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-40 mx-auto max-w-md rounded-2xl border border-brand-gold/40 bg-brand-anthracite/95 p-4 shadow-2xl backdrop-blur md:bottom-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-brand-cream">Installer Speed Apéro</p>
          <p className="text-xs text-brand-cream/55">
            Version Premium — comme une app sur votre téléphone
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              variant="gold"
              onClick={async () => {
                await deferred.prompt();
                setDeferred(null);
              }}
            >
              Installer
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
              Plus tard
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full p-1 text-brand-cream/40 hover:bg-white/5"
          onClick={() => setDismissed(true)}
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
