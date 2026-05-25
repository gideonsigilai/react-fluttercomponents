import * as React from "react";
import { cn } from "@/lib/utils";

export enum FlexFit {
  tight = "tight",
  loose = "loose",
}

export interface FlexibleProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: number;
  fit?: FlexFit;
  key?: React.Key;
}

/**
 * A widget that controls how a child of a Row or Column flexes.
 * Equivalent to Flutter's Flexible() widget.
 */
export const Flexible = React.forwardRef<HTMLDivElement, FlexibleProps>(
  (
    { flex = 1, fit = FlexFit.loose, children, className, style, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("min-w-0 min-h-0", className)}
        style={{
          flexGrow: flex,
          flexShrink: 1,
          flexBasis: fit === FlexFit.tight ? "0%" : "auto",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Flexible.displayName = "Flexible";
