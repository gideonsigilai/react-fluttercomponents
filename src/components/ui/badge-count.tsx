import * as React from "react";
import { cn } from "../utils";

export interface BadgeCountProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  label?: React.ReactNode;
  showZero?: boolean;
  max?: number;
  isLabelVisible?: boolean;
  offset?: { x: number; y: number };
  key?: React.Key;
}

export function BadgeCount({
  children,
  count,
  label,
  showZero = false,
  max = 999,
  isLabelVisible = true,
  offset,
  className,
  ...props
}: BadgeCountProps) {
  let displayContent = label;

  if (count !== undefined) {
    if (count === 0 && !showZero) {
      isLabelVisible = false;
    } else if (count > max) {
      displayContent = `${max}+`;
    } else {
      displayContent = count.toString();
    }
  }

  const isSmall = displayContent === undefined || displayContent === null;

  return (
    <div
      className={cn("relative inline-flex flex-shrink-0", className)}
      {...props}
    >
      {children}
      {isLabelVisible && (
        <span
          className={cn(
            "absolute z-10 flex items-center justify-center rounded-full bg-destructive font-semibold text-destructive-foreground ring-2 ring-background transition-transform",
            isSmall
              ? "h-2 w-2 right-0 top-0 translate-x-1/3 -translate-y-1/3"
              : "min-h-5 min-w-5 px-1 text-[11px] right-0 top-0 translate-x-1/3 -translate-y-1/3",
          )}
          style={{
            ...(offset
              ? {
                  transform: `translate(calc(33.33% + ${offset.x}px), calc(-33.33% + ${offset.y}px))`,
                }
              : {}),
          }}
        >
          {displayContent}
        </span>
      )}
    </div>
  );
}
