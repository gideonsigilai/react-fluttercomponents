import * as React from "react";
import { cn } from "@/lib/utils";
import {
  borderRadiusToStyle,
  type BorderRadiusInput,
  type SizeInput,
  sizeToCss,
} from "./flutter-style";

export interface ClipRRectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Border radius to clip with. Default 8. */
  borderRadius?: BorderRadiusInput;
  width?: SizeInput;
  height?: SizeInput;
  key?: React.Key;
}

/**
 * A widget that clips its child using a rounded rectangle.
 * Equivalent to Flutter's ClipRRect() widget.
 */
export const ClipRRect = React.forwardRef<HTMLDivElement, ClipRRectProps>(
  ({ borderRadius = 8, width, height, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden", className)}
        style={{
          ...borderRadiusToStyle(borderRadius),
          width: sizeToCss(width),
          height: sizeToCss(height),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ClipRRect.displayName = "ClipRRect";
