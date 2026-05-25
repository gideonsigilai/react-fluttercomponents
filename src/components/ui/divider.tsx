import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps {
  thickness?: number;
  indent?: number | string;
  endIndent?: number | string;
  color?: string;
  className?: string;
  key?: React.Key;
}

/**
 * A thin horizontal line, with padding on either side.
 * Equivalent to Flutter's Divider() widget.
 */
export const Divider = ({
  thickness = 1,
  indent = 0,
  endIndent = 0,
  color,
  className,
}: DividerProps) => {
  return (
    <div
      className={cn("w-full", className)}
      style={{
        height: `${thickness}px`,
        marginLeft: typeof indent === "number" ? `${indent}px` : indent,
        marginRight: typeof endIndent === "number" ? `${endIndent}px` : endIndent,
        backgroundColor: color || "hsl(var(--border))",
      }}
      aria-hidden="true"
    />
  );
};
