import * as React from "react";
import { cn } from "../utils";

export interface GridTileProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  child: React.ReactNode;
  key?: React.Key;
}

/**
 * A tile in a GridView.
 * Equivalent to Flutter's GridTile() widget.
 */
export const GridTile = React.forwardRef<HTMLDivElement, GridTileProps>(
  ({ header, footer, child, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col overflow-hidden rounded-md border bg-card",
          className,
        )}
        {...props}
      >
        {header && (
          <div className="absolute top-0 left-0 right-0 z-10">{header}</div>
        )}
        <div className="flex-1">{child}</div>
        {footer && (
          <div className="absolute bottom-0 left-0 right-0 z-10">{footer}</div>
        )}
      </div>
    );
  },
);

GridTile.displayName = "GridTile";
