import * as React from "react";
import { cn } from "../utils";
import {
  borderToStyle,
  borderRadiusToStyle,
  edgeInsetsToStyle,
  sizeToCss,
  elevationToShadow,
  type BorderValue,
  type BorderRadiusInput,
  type EdgeInsetsInput,
  type Color,
  type SizeInput,
} from "./flutter-style";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: EdgeInsetsInput;
  margin?: EdgeInsetsInput;
  color?: Color;
  width?: SizeInput;
  height?: SizeInput;
  minWidth?: SizeInput;
  maxWidth?: SizeInput;
  minHeight?: SizeInput;
  maxHeight?: SizeInput;
  borderRadius?: BorderRadiusInput;
  border?: BorderValue;
  elevation?: number;
  alignment?: "center" | "start" | "end";
  key?: React.Key;
}

/**
 * A convenience widget that combines common painting, positioning, and sizing widgets.
 * Equivalent to Flutter's Container() widget.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      padding,
      margin,
      color,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      borderRadius,
      border,
      elevation,
      alignment,
      className,
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
          alignment === "center" && "items-center justify-center",
          alignment === "start" && "items-start justify-start",
          alignment === "end" && "items-end justify-end",
          className,
        )}
        style={{
          ...edgeInsetsToStyle(padding, "padding"),
          ...edgeInsetsToStyle(margin, "margin"),
          ...borderToStyle(border),
          ...borderRadiusToStyle(borderRadius),
          backgroundColor: color,
          width: sizeToCss(width),
          height: sizeToCss(height),
          minWidth: sizeToCss(minWidth),
          maxWidth: sizeToCss(maxWidth),
          minHeight: sizeToCss(minHeight),
          maxHeight: sizeToCss(maxHeight),
          boxShadow: elevation !== undefined ? elevationToShadow(elevation) : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
