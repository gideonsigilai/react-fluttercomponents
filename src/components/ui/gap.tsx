import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A widget that adds a fixed amount of space in a Row or Column.
 * Equivalent to Flutter's Gap widget.
 */
export const Gap = React.forwardRef<HTMLDivElement, { size: number | string; className?: string; key?: React.Key }>(
  ({ size, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-none", className)}
        style={{ flexBasis: typeof size === "number" ? `${size}px` : size }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Gap.displayName = "Gap";
