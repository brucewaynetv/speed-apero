"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PrepKind = "stack" | "brew";

export function PrepGlyph({
  kind,
  busy = false,
  className,
}: {
  kind: PrepKind;
  busy?: boolean;
  className?: string;
}) {
  if (kind === "brew") {
    return (
      <span
        className={cn("drink-cup drink-cup--btn", busy && "drink-cup--loading", className)}
        aria-hidden
      >
        <span className="drink-steam">
          <span />
          <span />
          <span />
        </span>
        <span className="drink-glass">
          <span
            className="drink-fill"
            style={{ ["--fill" as string]: busy ? "72%" : "28%" }}
          />
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "burger-stack burger-stack--btn",
        busy ? "burger-stack--loading" : "burger-stack--idle",
        className
      )}
      aria-hidden
    >
      <span className="ingredient bun-top" />
      <span className="ingredient lettuce" />
      <span className="ingredient cheese" />
      <span className="ingredient patty" />
      <span className="ingredient bun-bottom" />
    </span>
  );
}

export interface PrepButtonProps extends ButtonProps {
  prep?: PrepKind;
  busy?: boolean;
  busyLabel?: string;
}

export const PrepButton = React.forwardRef<HTMLButtonElement, PrepButtonProps>(
  (
    {
      prep = "stack",
      busy = false,
      busyLabel,
      children,
      className,
      disabled,
      asChild,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Button
          ref={ref}
          asChild
          disabled={disabled}
          className={cn("relative overflow-hidden", busy && "prep-btn--busy", className)}
          {...props}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        disabled={disabled || busy}
        className={cn(
          "relative overflow-hidden",
          busy && prep === "stack" && "prep-btn--stacking",
          busy && prep === "brew" && "prep-btn--brewing",
          className
        )}
        {...props}
      >
        {busy && prep === "brew" ? (
          <span className="prep-btn-fill" style={{ ["--fill" as string]: "100%" }} aria-hidden />
        ) : null}
        <span className="relative z-[1] flex w-full items-center gap-2.5">
          <PrepGlyph kind={prep} busy={busy} />
          <span className="min-w-0 flex-1">{busy && busyLabel ? busyLabel : children}</span>
        </span>
      </Button>
    );
  }
);
PrepButton.displayName = "PrepButton";
