import * as React from "react";
import { cn } from "@/lib/utils";

export interface VerticalDividerProps {
  /** Width (thickness) of the line in px. Default 1. */
  thickness?: number;
  /** Space above the line. Equivalent to Flutter's `indent`. Default 0. */
  indent?: number | string;
  /** Space below the line. Equivalent to Flutter's `endIndent`. Default 0. */
  endIndent?: number | string;
  /** Explicit height of the divider. If omitted it stretches to fill its parent (self-stretch). */
  height?: number | string;
  /** Color of the line. Defaults to the theme border color. */
  color?: string;
  className?: string;
  key?: React.Key;
}

/**
 * A thin vertical line, with padding on either side.
 * Equivalent to Flutter's VerticalDivider() widget.
 *
 * Place inside a Row or any flex-row container for it to stretch to full height.
 */
export const VerticalDivider = ({
  thickness = 1,
  indent = 0,
  endIndent = 0,
  height,
  color,
  className,
}: VerticalDividerProps) => {
  return (
    <div
      className={cn("self-stretch bg-border", className)}
      style={{
        width: `${thickness}px`,
        height: height !== undefined
          ? (typeof height === "number" ? `${height}px` : height)
          : undefined,
        marginTop: typeof indent === "number" ? `${indent}px` : indent,
        marginBottom: typeof endIndent === "number" ? `${endIndent}px` : endIndent,
        backgroundColor: color,
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
};

VerticalDivider.displayName = "VerticalDivider";
