import * as React from "react";
import { cn } from "@/lib/utils";
import { sizePropsToStyle, type SizeProps } from "./flutter-style";

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  key?: React.Key;
}

/**
 * A widget that centers its child within itself.
 * Equivalent to Flutter's Center() widget.
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  (
    { width, height, minWidth, maxWidth, minHeight, maxHeight, children, className, style, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center h-full w-full", className)}
        style={{
          ...sizePropsToStyle({ width, height, minWidth, maxWidth, minHeight, maxHeight }),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Center.displayName = "Center";
