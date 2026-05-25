import * as React from "react";
import { cn } from "../utils";

export interface ExpandedProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: number;
  key?: React.Key;
}

/**
 * A widget that expands a child of a Row or Column so that the child fills the available space.
 * Equivalent to Flutter's Expanded() widget.
 */
export const Expanded = React.forwardRef<HTMLDivElement, ExpandedProps>(
  ({ children, flex = 1, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-grow min-w-0 min-h-0", className)}
        style={{ flex: `${flex} ${flex} 0%`, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Expanded.displayName = "Expanded";
