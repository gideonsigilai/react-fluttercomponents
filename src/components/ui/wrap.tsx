import * as React from "react";
import { cn } from "@/lib/utils";
import type { EdgeInsetsInput } from "./flutter-style";
import { edgeInsetsToStyle } from "./flutter-style";

export enum WrapAlignment {
  start = "justify-start",
  end = "justify-end",
  center = "justify-center",
  spaceBetween = "justify-between",
  spaceAround = "justify-around",
  spaceEvenly = "justify-evenly",
}

export enum WrapCrossAlignment {
  start = "items-start",
  end = "items-end",
  center = "items-center",
}

export interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between children in the main axis. */
  spacing?: number;
  /** Spacing between lines in the cross axis. */
  runSpacing?: number;
  /** How children within a run are aligned in the main axis. */
  alignment?: WrapAlignment;
  /** How children are aligned in the cross axis within a run. */
  crossAxisAlignment?: WrapCrossAlignment;
  /** Padding around the Wrap. */
  padding?: EdgeInsetsInput;
  /** Direction of the wrap. */
  direction?: "horizontal" | "vertical";
  key?: React.Key;
}

/**
 * A widget that displays its children in multiple horizontal or vertical runs.
 * Equivalent to Flutter's Wrap() widget.
 */
export const Wrap = React.forwardRef<HTMLDivElement, WrapProps>(
  (
    {
      spacing = 0,
      runSpacing = 0,
      alignment = WrapAlignment.start,
      crossAxisAlignment = WrapCrossAlignment.start,
      padding,
      direction = "horizontal",
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
        className={cn(
          "flex flex-wrap",
          direction === "vertical" ? "flex-col" : "flex-row",
          alignment,
          crossAxisAlignment,
          className,
        )}
        style={{
          // CSS gap shorthand: "<row-gap> <column-gap>"
          // runSpacing = gap between runs (rows)  → row-gap
          // spacing    = gap between items in a run → column-gap
          gap: `${runSpacing}px ${spacing}px`,
          ...edgeInsetsToStyle(padding, "padding"),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Wrap.displayName = "Wrap";
