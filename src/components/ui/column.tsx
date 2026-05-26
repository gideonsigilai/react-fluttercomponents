import * as React from "react";
import { cn } from "../utils";
import {
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
} from "./layout-types";
import { sizePropsToStyle, sizeToCss, borderToStyle, edgeInsetsToStyle, borderRadiusToStyle, elevationToShadow, type SizeProps, type BorderValue, type Color, type BorderRadiusInput, type EdgeInsetsInput } from "./flutter-style";

export interface ColumnProps
  extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: number | string;
  padding?: EdgeInsetsInput;
  border?: BorderValue;
  color?: Color;
  borderRadius?: BorderRadiusInput;
  elevation?: number;
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
      border,
      color,
      borderRadius,
      elevation,
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
          ...edgeInsetsToStyle(padding, "padding"),
          ...borderToStyle(border),
          backgroundColor: color,
          ...borderRadiusToStyle(borderRadius),
          boxShadow: elevation !== undefined ? elevationToShadow(elevation) : undefined,
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
