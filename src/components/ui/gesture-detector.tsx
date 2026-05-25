import * as React from "react";
import { cn } from "../utils";

export interface GestureDetectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  key?: React.Key;
}

/**
 * A widget that detects gestures.
 * Equivalent to Flutter's GestureDetector() widget.
 */
export const GestureDetector = React.forwardRef<
  HTMLDivElement,
  GestureDetectorProps
>(
  (
    {
      children,
      onTap,
      onDoubleTap,
      onLongPress,
      className,
      onClick,
      onDoubleClick,
      onContextMenu,
      ...props
    },
    ref,
  ) => {
    const handleLongPress = (e: React.MouseEvent) => {
      if (onLongPress) {
        e.preventDefault();
        onLongPress();
      }
    };

    return (
      <div
        ref={ref}
        onClick={(e) => {
          onTap?.();
          onClick?.(e);
        }}
        onDoubleClick={(e) => {
          onDoubleTap?.();
          onDoubleClick?.(e);
        }}
        onContextMenu={(e) => {
          if (onLongPress) {
            handleLongPress(e);
          }
          onContextMenu?.(e);
        }}
        className={cn("cursor-pointer select-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GestureDetector.displayName = "GestureDetector";
