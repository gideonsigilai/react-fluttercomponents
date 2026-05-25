import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color, BorderRadiusInput } from "./flutter-style";
import { borderRadiusToStyle } from "./flutter-style";

export interface ProgressBarProps {
  /**
   * The value of the progress bar, between 0.0 and 1.0.
   * If null or undefined, the progress bar is indeterminate (shows a pulse animation).
   */
  value?: number;
  /** The progress bar's background color. */
  backgroundColor?: Color;
  /** The color of the progress indicator itself. */
  color?: Color;
  /** The minimum height of the progress bar. Default is 4px. */
  minHeight?: number | string;
  /** The border radius of the progress bar. Default is 2px. */
  borderRadius?: BorderRadiusInput;
  className?: string;
  key?: React.Key;
}

/**
 * A material design linear progress indicator.
 * Equivalent to Flutter's LinearProgressIndicator() widget.
 * Minimizes CSS use by relying on inline styles for dynamic properties.
 */
export const ProgressBar = React.memo(({
  value,
  backgroundColor,
  color,
  minHeight = 4,
  borderRadius = 2,
  className,
}: ProgressBarProps) => {
  const isIndeterminate = value === undefined || value === null;

  const bgStyle: React.CSSProperties = {
    backgroundColor: backgroundColor ?? "hsl(var(--muted))",
    height: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
    ...borderRadiusToStyle(borderRadius),
  };

  const valueStyle: React.CSSProperties = {
    backgroundColor: color ?? "hsl(var(--primary))",
    height: "100%",
    width: isIndeterminate ? "40%" : `${Math.min(Math.max(value, 0), 1) * 100}%`,
    transition: isIndeterminate ? "none" : "width 0.3s ease-in-out",
    ...borderRadiusToStyle(borderRadius),
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={bgStyle}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : value * 100}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full",
          isIndeterminate && "animate-progress-indeterminate"
        )}
        style={valueStyle}
      />
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
