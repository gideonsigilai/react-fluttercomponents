import * as React from "react";
import { cn } from "../utils";

export interface GridViewProps extends React.HTMLAttributes<HTMLDivElement> {
  crossAxisCount?: number;
  maxCrossAxisExtent?: number;
  mainAxisSpacing?: number | string;
  crossAxisSpacing?: number | string;
  padding?: number | string;
  itemCount?: number;
  itemBuilder?: (index: number) => React.ReactNode;
  key?: React.Key;
}

/**
 * A scrollable grid of widgets.
 * Equivalent to Flutter's GridView() widget.
 */
export const GridView = React.forwardRef<HTMLDivElement, GridViewProps>(
  (
    {
      children,
      crossAxisCount,
      maxCrossAxisExtent,
      mainAxisSpacing = 0,
      crossAxisSpacing = 0,
      padding,
      itemCount,
      itemBuilder,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const content =
      itemBuilder && itemCount !== undefined
        ? Array.from({ length: itemCount }).map((_, i) => (
            <React.Fragment key={i}>{itemBuilder(i)}</React.Fragment>
          ))
        : children;

    const gridTemplateColumns = crossAxisCount
      ? `repeat(${crossAxisCount}, minmax(0, 1fr))`
      : maxCrossAxisExtent
        ? `repeat(auto-fill, minmax(${
            typeof maxCrossAxisExtent === "number"
              ? `${maxCrossAxisExtent}px`
              : maxCrossAxisExtent
          }, 1fr))`
        : undefined;

    return (
      <div
        ref={ref}
        className={cn("grid overflow-y-auto", className)}
        style={{
          gridTemplateColumns,
          rowGap:
            typeof mainAxisSpacing === "number"
              ? `${mainAxisSpacing}px`
              : mainAxisSpacing,
          columnGap:
            typeof crossAxisSpacing === "number"
              ? `${crossAxisSpacing}px`
              : crossAxisSpacing,
          padding: typeof padding === "number" ? `${padding}px` : padding,
          ...style,
        }}
        {...props}
      >
        {content}
      </div>
    );
  },
);

GridView.displayName = "GridView";
