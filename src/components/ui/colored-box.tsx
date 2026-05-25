import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color } from "./flutter-style";

export interface ColoredBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The color to fill the box with. */
  color: Color;
  key?: React.Key;
}

/**
 * A widget that paints its area with a specified color.
 * Equivalent to Flutter's ColoredBox() widget.
 */
export const ColoredBox = React.forwardRef<HTMLDivElement, ColoredBoxProps>(
  ({ color, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-full", className)}
        style={{ backgroundColor: color, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ColoredBox.displayName = "ColoredBox";
