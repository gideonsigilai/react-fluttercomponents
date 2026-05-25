import * as React from "react";
import { cn } from "../utils";
import {
  edgeInsetsToStyle,
  sizePropsToStyle,
  type EdgeInsetsInput,
  type SizeProps,
} from "./flutter-style";

export interface PaddingProps
  extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  padding: EdgeInsetsInput;
  key?: React.Key;
}

/**
 * A widget that insets its child by the given padding.
 * Equivalent to Flutter's Padding() widget.
 */
export const Padding = React.forwardRef<HTMLDivElement, PaddingProps>(
  (
    {
      padding,
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
        className={cn(className)}
        style={{
          ...edgeInsetsToStyle(padding, "padding"),
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

Padding.displayName = "Padding";
