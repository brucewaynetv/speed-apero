"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type PanelStatus = "idle" | "loading" | "served";

function CodeBlock({ lines }: { lines: { type: "sel" | "prop" | "val" | "plain"; text: string }[][] }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c0e] p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs">
      <code>
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line.map((tok, j) => (
              <span
                key={j}
                className={cn(
                  tok.type === "sel" && "text-sky-400",
                  tok.type === "prop" && "text-brand-cream/90",
                  tok.type === "val" && "text-brand-gold",
                  tok.type === "plain" && "text-brand-cream/45"
                )}
              >
                {tok.text}
              </span>
            ))}
          </div>
        ))}
      </code>
    </pre>
  );
}

function BurgerVisual({ status, progress }: { status: PanelStatus; progress: number }) {
  const loading = status === "loading";
  const served = status === "served";

  return (
    <div
      className={cn(
        "relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border bg-[#0e0e12] p-4 sm:min-h-[240px]",
        served ? "border-brand-gold/40 shadow-[0_0_24px_rgba(245,181,27,0.12)]" : "border-white/10",
        loading && "prep-panel-glow-orange"
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-widest",
            served ? "text-brand-gold" : loading ? "text-brand-orange" : "text-brand-cream/40"
          )}
        >
          {served ? "SERVED" : loading ? "STACKING…" : "READY"}
        </span>
        <span className="font-mono text-sm font-semibold text-brand-orange">{progress}%</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-4">
        <div className={cn("burger-stack", loading && "burger-stack--loading", served && "burger-stack--served")}>
          <span className="ingredient bun-top" />
          <span className="ingredient lettuce" />
          <span className="ingredient cheese" />
          <span className="ingredient patty" />
          <span className="ingredient bun-bottom" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-cream/80">
          STACK LOAD
        </span>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase",
            served
              ? "bg-pink-500/20 text-pink-400"
              : loading
                ? "bg-brand-orange/20 text-brand-orange"
                : "bg-sky-500/15 text-sky-400"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function DrinkVisual({ status, progress }: { status: PanelStatus; progress: number }) {
  const loading = status === "loading";
  const served = status === "served";

  return (
    <div
      className={cn(
        "relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border bg-[#0e0e12] p-4 sm:min-h-[240px]",
        loading ? "border-sky-500/30 prep-panel-glow-blue" : "border-white/10",
        served && "border-brand-gold/30"
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-widest",
            served ? "text-brand-gold" : loading ? "text-brand-cream/50" : "text-brand-cream/40"
          )}
        >
          {served ? "POURED" : loading ? "BREWING…" : "IDLE"}
        </span>
        <span className="font-mono text-sm font-semibold text-brand-orange">{progress}%</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-3">
        <div className={cn("drink-cup", loading && "drink-cup--loading", served && "drink-cup--served")}>
          <div className="drink-steam">
            <span />
            <span />
            <span />
          </div>
          <div className="drink-glass">
            <div className="drink-fill" style={{ ["--fill" as string]: `${progress}%` }}>
              <span className="drink-pct font-mono text-[10px] font-bold text-white/90">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-cream/80">
          BREW LOAD
        </span>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase",
            served
              ? "bg-pink-500/20 text-pink-400"
              : loading
                ? "bg-brand-orange/20 text-brand-orange"
                : "bg-sky-500/15 text-sky-400"
          )}
        >
          {status === "loading" ? "brewing" : status}
        </span>
      </div>
    </div>
  );
}

const BURGER_CODE = [
  [
    { type: "sel" as const, text: ".ingredient" },
    { type: "plain" as const, text: " {" },
  ],
  [
    { type: "plain" as const, text: "  " },
    { type: "prop" as const, text: "animation" },
    { type: "plain" as const, text: ": " },
    { type: "val" as const, text: "dropIn" },
    { type: "plain" as const, text: " " },
    { type: "val" as const, text: "0.45s" },
    { type: "plain" as const, text: " both;" },
  ],
  [{ type: "plain" as const, text: "}" }],
  [{ type: "plain" as const, text: "" }],
  [
    { type: "sel" as const, text: ".burger.loading .cheese" },
    { type: "plain" as const, text: " {" },
  ],
  [
    { type: "plain" as const, text: "  " },
    { type: "prop" as const, text: "animation-delay" },
    { type: "plain" as const, text: ": " },
    { type: "val" as const, text: "0.6s" },
    { type: "plain" as const, text: ";" },
  ],
  [{ type: "plain" as const, text: "}" }],
];

const DRINK_CODE = [
  [
    { type: "sel" as const, text: ".coffee-fill" },
    { type: "plain" as const, text: " {" },
  ],
  [
    { type: "plain" as const, text: "  " },
    { type: "prop" as const, text: "height" },
    { type: "plain" as const, text: ": " },
    { type: "val" as const, text: "0%" },
    { type: "plain" as const, text: ";" },
  ],
  [
    { type: "plain" as const, text: "  " },
    { type: "prop" as const, text: "animation" },
    { type: "plain" as const, text: ": " },
    { type: "val" as const, text: "fillCup" },
    { type: "plain" as const, text: " " },
    { type: "val" as const, text: "2.4s" },
    { type: "plain" as const, text: " forwards;" },
  ],
  [{ type: "plain" as const, text: "}" }],
  [{ type: "plain" as const, text: "" }],
  [
    { type: "sel" as const, text: ".steam" },
    { type: "plain" as const, text: " {" },
  ],
  [
    { type: "plain" as const, text: "  " },
    { type: "prop" as const, text: "animation" },
    { type: "plain" as const, text: ": " },
    { type: "val" as const, text: "steam" },
    { type: "plain" as const, text: " " },
    { type: "val" as const, text: "1.2s" },
    { type: "plain" as const, text: " infinite;" },
  ],
  [{ type: "plain" as const, text: "}" }],
];

interface PrepLabSectionProps {
  /** Compact embed for order tracking */
  compact?: boolean;
  autoPlay?: boolean;
}

export function PrepLabSection({ compact = false, autoPlay = true }: PrepLabSectionProps) {
  const [burgerStatus, setBurgerStatus] = useState<PanelStatus>("idle");
  const [drinkStatus, setDrinkStatus] = useState<PanelStatus>("idle");
  const [burgerPct, setBurgerPct] = useState(0);
  const [drinkPct, setDrinkPct] = useState(0);

  const runBurger = useCallback(() => {
    setBurgerStatus("loading");
    setBurgerPct(0);
    const start = performance.now();
    const duration = 2200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setBurgerPct(Math.round(t * 100));
      if (t < 1) requestAnimationFrame(tick);
      else setBurgerStatus("served");
    };
    requestAnimationFrame(tick);
  }, []);

  const runDrink = useCallback(() => {
    setDrinkStatus("loading");
    setDrinkPct(0);
    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDrinkPct(Math.round(t * 100));
      if (t < 1) requestAnimationFrame(tick);
      else setDrinkStatus("served");
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const t1 = window.setTimeout(runBurger, 400);
    const t2 = window.setTimeout(runDrink, 900);
    const loop = window.setInterval(() => {
      setBurgerStatus("idle");
      setDrinkStatus("idle");
      setBurgerPct(0);
      setDrinkPct(0);
      window.setTimeout(runBurger, 300);
      window.setTimeout(runDrink, 700);
    }, 8000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(loop);
    };
  }, [autoPlay, runBurger, runDrink]);

  return (
    <section
      id="prep-lab"
      className={cn(
        "relative overflow-hidden",
        compact ? "py-4" : "border-y border-white/5 bg-[#08080a] py-14 sm:py-20"
      )}
    >
      {!compact && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,115,0,0.08),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(56,189,248,0.06),transparent_45%)]" />
      )}

      <div className={cn("relative mx-auto max-w-7xl", compact ? "px-0" : "px-4 sm:px-6")}>
        {!compact && (
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              // kitchen_runtime
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-wide text-brand-cream sm:text-5xl">
              PREP LAB
            </h2>
            <p className="mt-3 text-brand-cream/55">
              La cuisine dark kitchen visualisée comme un process live — stack burger, fill boisson,
              statut en temps réel. L&apos;effet « app premium » qui fait la différence.
            </p>
          </div>
        )}

        <div className="space-y-4 sm:space-y-5">
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
            <CodeBlock lines={BURGER_CODE} />
            <button
              type="button"
              onClick={runBurger}
              className="text-left transition hover:brightness-110"
              aria-label="Relancer l'animation stack burger"
            >
              <BurgerVisual status={burgerStatus} progress={burgerPct} />
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
            <CodeBlock lines={DRINK_CODE} />
            <button
              type="button"
              onClick={runDrink}
              className="text-left transition hover:brightness-110"
              aria-label="Relancer l'animation brew boisson"
            >
              <DrinkVisual status={drinkStatus} progress={drinkPct} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
