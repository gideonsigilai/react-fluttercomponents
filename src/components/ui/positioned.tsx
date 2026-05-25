import * as React from "react";
import { cn } from "../utils";

/** Exported so Stack can detect <Positioned> children by displayName. */
export const POSITIONED_DISPLAY_NAME = "Positioned" as const;

export interface PositionedProps {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  /** Width of the positioned child. */
  width?: number | string;
  /** Height of the positioned child. */
  height?: number | string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/**
 * A widget that controls where a child of a Stack is positioned.
 * Equivalent to Flutter's Positioned() widget.
 */
export const Positioned = ({
  top,
  right,
  bottom,
  left,
  width,
  height,
  children,
  className,
  style,
}: PositionedProps) => {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        top: typeof top === "number" ? `${top}px` : top,
        right: typeof right === "number" ? `${right}px` : right,
        bottom: typeof bottom === "number" ? `${bottom}px` : bottom,
        left: typeof left === "number" ? `${left}px` : left,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

Positioned.displayName = POSITIONED_DISPLAY_NAME;
