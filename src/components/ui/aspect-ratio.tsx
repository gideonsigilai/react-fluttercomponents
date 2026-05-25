import * as React from "react";
import { cn } from "@/lib/utils";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  key?: React.Key;
}

/**
 * A widget that attempts to size the child to a specific aspect ratio.
 * Equivalent to Flutter's AspectRatio() widget.
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden", className)}
        style={{ aspectRatio: ratio.toString(), ...style }}
        {...props}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
