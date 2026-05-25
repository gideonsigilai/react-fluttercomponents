import * as React from "react";
import { cn } from "@/lib/utils";

export interface SizedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  key?: React.Key;
}

/**
 * A box with a specified size.
 * Equivalent to Flutter's SizedBox() widget.
 */
export const SizedBox = React.forwardRef<HTMLDivElement, SizedBoxProps>(
  ({ width, height, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-none", className)}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SizedBox.displayName = "SizedBox";
