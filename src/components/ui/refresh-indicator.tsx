import * as React from "react";
import { cn } from "../utils";

export interface RefreshIndicatorProps {
  /** The scrollable child that can be pulled to refresh. */
  child?: React.ReactNode;
  /** Alternate way to provide React children. */
  children?: React.ReactNode;
  /**
   * Async function called when a refresh is triggered.
   * The indicator stays visible until the Future completes.
   */
  onRefresh: () => Promise<void>;
  /**
   * Displacement from the top before the refresh triggers.
   * Equivalent to Flutter's displacement prop. Default 40.
   */
  displacement?: number;
  /** Color of the indicator circle. */
  color?: string;
  /** Background color of the indicator badge. */
  backgroundColor?: string;
  /** Stroke width of the spinner. Default 2.5. */
  strokeWidth?: number;
  /** Size of the circular indicator. Default 36. */
  indicatorSize?: number;
  /**
   * How far the user must drag before the refresh is triggered.
   * Default 80px.
   */
  triggerMode?: "onEdge" | "anywhere";
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/** Spinner SVG — stable reference */
const Spinner = ({ color, size, strokeWidth }: { color: string; size: number; strokeWidth: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="animate-spin"
    aria-label="Loading"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeOpacity={0.25}
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

/**
 * A widget that supports the Material "swipe down to refresh" idiom.
 * Equivalent to Flutter's RefreshIndicator() widget.
 *
 * The `onRefresh` callback must return a Promise; the spinner stays
 * visible until that promise resolves.
 *
 * Note: Since browsers block native pull-to-refresh, this component
 * implements a CSS overscroll / pointer-drag approach.
 */
export const RefreshIndicator = React.forwardRef<HTMLDivElement, RefreshIndicatorProps>(
  (
    {
      child,
      children,
      onRefresh,
      displacement = 40,
      color,
      backgroundColor,
      strokeWidth = 2.5,
      indicatorSize = 36,
      triggerMode = "onEdge",
      className,
      style,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [pullY, setPullY] = React.useState(0);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const startYRef = React.useRef(0);
    const MAX_PULL = displacement + 60;
    const TRIGGER_THRESHOLD = displacement;

    const resolvedColor = color ?? "hsl(var(--primary))";
    const resolvedBg = backgroundColor ?? "hsl(var(--background))";

    const progress = Math.min(1, pullY / TRIGGER_THRESHOLD);
    const indicatorOpacity = pullY > 0 ? Math.min(1, progress * 1.5) : 0;
    const indicatorTranslate = -indicatorSize - 8 + Math.min(pullY, MAX_PULL);

    // ── Touch / Pointer handling ──────────────────────────────────────────────

    const handlePointerDown = (e: React.PointerEvent) => {
      if (isRefreshing) return;
      const el = containerRef.current;
      if (!el) return;
      // Only allow pull when already at the top
      if (triggerMode === "onEdge" && el.scrollTop > 0) return;
      startYRef.current = e.clientY;
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging || isRefreshing) return;
      const el = containerRef.current;
      if (!el) return;
      if (triggerMode === "onEdge" && el.scrollTop > 0) {
        setIsDragging(false);
        setPullY(0);
        return;
      }
      const delta = Math.max(0, e.clientY - startYRef.current);
      // Apply rubber-band damping
      const dampened = delta > MAX_PULL ? MAX_PULL + (delta - MAX_PULL) * 0.2 : delta;
      setPullY(Math.min(dampened, MAX_PULL * 1.2));
    };

    const handlePointerUp = React.useCallback(async () => {
      if (!isDragging) return;
      setIsDragging(false);
      if (pullY >= TRIGGER_THRESHOLD) {
        setIsRefreshing(true);
        setPullY(TRIGGER_THRESHOLD); // snap to trigger position
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullY(0);
        }
      } else {
        setPullY(0);
      }
    }, [isDragging, pullY, TRIGGER_THRESHOLD, onRefresh]);

    const showIndicator = pullY > 0 || isRefreshing;
    const indicatorRotation = isRefreshing ? undefined : `rotate(${progress * 270}deg)`;

    return (
      <div
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === "function") ref(el!);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={cn("relative overflow-y-auto overflow-x-hidden", className)}
        style={{ touchAction: "pan-x", ...style }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* ── Indicator badge ────────────────────────────────────────────── */}
        <div
          aria-live="polite"
          aria-busy={isRefreshing}
          className="pointer-events-none absolute left-1/2 z-50 flex items-center justify-center rounded-full shadow-lg"
          style={{
            width: indicatorSize + 8,
            height: indicatorSize + 8,
            backgroundColor: resolvedBg,
            border: `1px solid hsl(var(--border))`,
            transform: `translateX(-50%) translateY(${indicatorTranslate}px)`,
            opacity: indicatorOpacity,
            top: 8,
            transition: isRefreshing || isDragging
              ? "opacity 0.15s"
              : "transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.25s",
          }}
        >
          {showIndicator && (
            <div
              style={{
                transform: isRefreshing ? undefined : indicatorRotation,
                transition: isRefreshing ? undefined : "transform 0.05s",
              }}
            >
              <Spinner color={resolvedColor} size={indicatorSize - 8} strokeWidth={strokeWidth} />
            </div>
          )}
        </div>

        {/* ── Scrollable content ─────────────────────────────────────────── */}
        <div
          style={{
            transform: isDragging || isRefreshing
              ? `translateY(${Math.min(pullY, MAX_PULL)}px)`
              : "translateY(0)",
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(.34,1.56,.64,1)",
            willChange: "transform",
          }}
        >
          {children ?? child}
        </div>
      </div>
    );
  },
);

RefreshIndicator.displayName = "RefreshIndicator";
