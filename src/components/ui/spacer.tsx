import * as React from "react";
import { cn } from "../utils";

interface SpacerProps {
  className?: string;
  flex?: number;
  key?: React.Key;
}

/**
 * A widget that takes up all available space in a flex container.
 * Equivalent to Flutter's Spacer() widget.
 */
const Spacer = ({ className, flex = 1 }: SpacerProps) => {
  return (
    <div
      className={cn("flex-grow min-w-0 min-h-0 self-stretch", className)}
      style={{ flex: `${flex} ${flex} 0%` }}
      aria-hidden="true"
    />
  );
};

export { Spacer };
