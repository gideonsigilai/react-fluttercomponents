import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  children: React.ReactNode;
  delay?: number;
  /**
   * Preferred side. "auto" flips to the bottom if there isn't enough room above the trigger.
   */
  side?: "top" | "bottom" | "auto";
  key?: React.Key;
}

const ESTIMATED_TOOLTIP_HEIGHT = 36;
const TOOLTIP_MARGIN = 8;

/**
 * A tooltip widget.
 * Equivalent to Flutter's Tooltip() widget.
 */
export const Tooltip = ({
  message,
  children,
  delay = 300,
  side = "auto",
  className,
  ...props
}: TooltipProps) => {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [resolvedSide, setResolvedSide] = React.useState<"top" | "bottom">(
    side === "bottom" ? "bottom" : "top"
  );

  const handleMouseEnter = React.useCallback(() => {
    if (side !== "auto") {
      setResolvedSide(side);
      return;
    }
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const needed = ESTIMATED_TOOLTIP_HEIGHT + TOOLTIP_MARGIN;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceAbove >= needed) {
      setResolvedSide("top");
    } else if (spaceBelow >= needed) {
      setResolvedSide("bottom");
    } else {
      setResolvedSide(spaceAbove >= spaceBelow ? "top" : "bottom");
    }
  }, [side]);

  const isTop = resolvedSide === "top";

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      className={cn("group relative inline-block", className)}
      {...props}
    >
      {children}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm",
          isTop ? "bottom-full mb-2" : "top-full mt-2",
          `delay-${delay}`
        )}
      >
        {message}
        {/* Triangle Arrow */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 border-4 border-transparent",
            isTop ? "top-full border-t-slate-800" : "bottom-full border-b-slate-800"
          )}
        />
      </div>
    </div>
  );
};
