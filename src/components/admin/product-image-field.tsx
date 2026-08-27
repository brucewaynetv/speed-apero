"use client";

import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  productName?: string;
}

export function ProductImageField({ value, onChange, productName }: ProductImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrl, setShowUrl] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload échoué");
      onChange(data.url);
      toast.success("Image uploadée");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur upload");
    } finally {
      setUploading(false);
    }
  }

  function applyUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      toast.error("URL invalide");
      return;
    }
    try {
      new URL(trimmed);
      onChange(trimmed);
      toast.success("Image mise à jour");
      setShowUrl(false);
    } catch {
      toast.error("URL invalide");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-brand-anthracite px-4 py-3 text-brand-cream outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-brand-cream/80">Image du produit</label>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-brand-anthracite/50",
          value ? "border-solid border-white/10" : ""
        )}
      >
        {value ? (
          <div className="relative aspect-[16/10] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={productName ?? "Aperçu produit"}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2 top-2 rounded-full bg-brand-black/80 p-1.5 text-brand-cream hover:bg-brand-red/80"
              aria-label="Supprimer l'image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 p-6 text-center">
            <ImagePlus className="h-10 w-10 text-brand-cream/30" />
            <p className="text-sm text-brand-cream/50">JPG, PNG ou WebP · max 5 Mo</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {value ? "Changer l'image" : "Importer une photo"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setUrlInput(value);
            setShowUrl((s) => !s);
          }}
        >
          <Link2 className="h-4 w-4" />
          URL externe
        </Button>
      </div>

      {showUrl && (
        <div className="flex gap-2">
          <input
            className={inputClass}
            type="url"
            placeholder="https://..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <Button type="button" size="sm" onClick={applyUrl}>
            OK
          </Button>
        </div>
      )}

      {value && (
        <p className="truncate text-xs text-brand-cream/30">{value}</p>
      )}
    </div>
  );
}
