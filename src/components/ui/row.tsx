import * as React from "react";
import { cn } from "../utils";
import {
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
} from "./layout-types";
import { sizePropsToStyle, sizeToCss, type SizeProps } from "./flutter-style";

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: number | string;
  padding?: number | string;
  key?: React.Key;
}

/**
 * A widget that displays its children in a horizontal array.
 * Equivalent to Flutter's Row() widget.
 */
export const Row = React.forwardRef<HTMLDivElement, RowProps>(
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
          "flex flex-row",
          mainAxisAlignment,
          crossAxisAlignment,
          mainAxisSize === MainAxisSize.max ? "w-full" : "w-auto",
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

Row.displayName = "Row";
