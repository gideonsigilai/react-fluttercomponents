import * as React from "react";
import { cn } from "../utils";
import {
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
} from "./layout-types";
import { sizePropsToStyle, sizeToCss, type SizeProps } from "./flutter-style";

export interface ColumnProps
  extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: number | string;
  padding?: number | string;
  key?: React.Key;
}

/**
 * A widget that displays its children in a vertical array.
 * Equivalent to Flutter's Column() widget.
 */
export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      className,
      mainAxisAlignment = MainAxisAlignment.start,
      crossAxisAlignment = CrossAxisAlignment.center,
      mainAxisSize = MainAxisSize.max,
      gap,
      padding,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          mainAxisAlignment,
          crossAxisAlignment,
          mainAxisSize === MainAxisSize.max ? "h-full" : "h-auto",
          className,
        )}
        style={{
          gap: sizeToCss(gap),
          padding: sizeToCss(padding),
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

Column.displayName = "Column";
