import * as React from "react";
import { cn } from "@/lib/utils";
import { GestureDetector, GestureDetectorProps } from "./gesture-detector";

/**
 * A rectangular area of a Material Design that responds to touch.
 * Equivalent to Flutter's InkWell() widget.
 */
export const InkWell = React.forwardRef<HTMLDivElement, GestureDetectorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <GestureDetector
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-200 hover:bg-accent/50 active:bg-accent/80 rounded-sm",
          className
        )}
        {...props}
      >
        {children}
      </GestureDetector>
    );
  }
);

InkWell.displayName = "InkWell";
