"use client";

import { cn } from "@/lib/utils";

export interface ChartBar {
  label: string;
  value: number;
}

interface MiniBarChartProps {
  title: string;
  bars: ChartBar[];
  accent?: "orange" | "gold" | "green";
  formatValue?: (v: number) => string;
  className?: string;
}

export function MiniBarChart({
  title,
  bars,
  accent = "orange",
  formatValue = (v) => String(v),
  className,
}: MiniBarChartProps) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  const color =
    accent === "gold"
      ? "bg-brand-gold"
      : accent === "green"
        ? "bg-green-400"
        : "bg-brand-orange";

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-brand-anthracite p-5", className)}>
      <h3 className="font-accent text-xs font-bold uppercase tracking-wider text-brand-cream/45">
        {title}
      </h3>
      <div className="mt-4 flex h-36 items-end gap-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="font-mono text-[10px] text-brand-cream/40">
              {formatValue(bar.value)}
            </span>
            <div className="relative flex w-full flex-1 items-end justify-center">
              <div
                className={cn("w-full max-w-[36px] rounded-t-md transition-all", color)}
                style={{ height: `${Math.max(6, (bar.value / max) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-brand-cream/50">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DonutStatProps {
  label: string;
  percent: number;
  detail: string;
  accent?: "orange" | "gold";
}

export function DonutStat({ label, percent, detail, accent = "orange" }: DonutStatProps) {
  const p = Math.min(100, Math.max(0, percent));
  const stroke = accent === "gold" ? "#f5b51b" : "#ff7300";
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-brand-anthracite p-5">
      <div className="relative h-20 w-20 shrink-0">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${p * 2.51} 251`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-xl text-brand-cream">
          {Math.round(p)}%
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
        <p className="mt-1 text-sm text-brand-cream/75">{detail}</p>
      </div>
    </div>
  );
}
