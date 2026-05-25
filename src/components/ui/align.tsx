import * as React from "react";
import { cn } from "../utils";
import { Alignment } from "./layout-types";
import { sizePropsToStyle, type SizeProps } from "./flutter-style";

export interface AlignProps
  extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  alignment?: Alignment;
  key?: React.Key;
}

/**
 * A widget that aligns its child within itself and optionally sizes itself based on the child's size.
 * Equivalent to Flutter's Align() widget.
 */
export const Align = React.forwardRef<HTMLDivElement, AlignProps>(
  (
    {
      alignment = Alignment.center,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full h-full", alignment, className)}
        style={{
          ...sizePropsToStyle({
            width,
            height,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
          }),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Align.displayName = "Align";
