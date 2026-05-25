import * as React from "react";
import { cn } from "../utils";

export interface CircularProgressIndicatorProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  key?: React.Key;
}

/**
 * A material design circular progress indicator, which spins to indicate that the application is busy.
 * Equivalent to Flutter's CircularProgressIndicator() widget.
 */
export const CircularProgressIndicator = ({
  size = 40,
  strokeWidth = 4,
  color,
  className,
}: CircularProgressIndicatorProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-solid border-t-transparent",
        className,
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${strokeWidth}px`,
        borderColor: color || "currentColor",
        borderTopColor: "transparent",
      }}
    />
  );
};
