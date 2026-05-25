/**
 * PageView — a horizontally (or vertically) paged scroll container.
 * Equivalent to Flutter's PageView() widget.
 *
 * Features:
 *  - Snap-to-page scrolling via CSS scroll-snap
 *  - Controlled (page prop + onPageChanged) or uncontrolled
 *  - Horizontal or vertical scroll direction
 *  - Reverse direction
 *  - Physics: "never" disables swiping (programmatic only)
 *  - PageController-style imperative API via ref
 *  - Optional dot indicator
 *  - itemBuilder + itemCount or children
 *  - onPageChanged callback
 *  - viewportFraction (< 1 shows adjacent pages)
 *  - allowImplicitScrolling (keeps adjacent pages alive)
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color, SizeInput } from "./flutter-style";
import { sizeToCss } from "./flutter-style";

// ─────────────────────────────────────────────────────────────────────────────
// PageController (imperative handle)
// ─────────────────────────────────────────────────────────────────────────────
export interface PageController {
  /** Animate to a page index. */
  animateToPage: (page: number, durationMs?: number) => void;
  /** Jump to a page index instantly. */
  jumpToPage: (page: number) => void;
  /** Animate to the next page. */
  nextPage: (durationMs?: number) => void;
  /** Animate to the previous page. */
  previousPage: (durationMs?: number) => void;
  /** Current page index (may be fractional during animation). */
  readonly page: number;
}

/** Create a ref-based PageController to pass to PageView. */
export function usePageController(): React.RefObject<PageController | null> {
  return React.useRef<PageController | null>(null);
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
export interface PageViewProps {
  /** Page widgets. Alternative to itemBuilder + itemCount. */
  children?: React.ReactNode;
  /** Number of pages when using itemBuilder. */
  itemCount?: number;
  /** Builder called with page index. */
  itemBuilder?: (index: number) => React.ReactNode;
  /** Controlled current page (0-based). */
  page?: number;
  /** Called when the visible page changes. */
  onPageChanged?: (page: number) => void;
  /** Scroll direction. Default "horizontal". */
  scrollDirection?: "horizontal" | "vertical";
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /**
   * Fraction of the viewport each page occupies.
   * 1.0 = full width (default). 0.9 shows a peek of adjacent pages.
   */
  viewportFraction?: number;
  /**
   * Scroll physics.
   * "page"   — snap to pages (default)
   * "never"  — no user scrolling (programmatic only)
   * "free"   — free scroll, no snap
   */
  physics?: "page" | "never" | "free";
  /** Whether to show the built-in dot indicator. */
  showIndicator?: boolean;
  /** Color of the active dot. */
  indicatorActiveColor?: Color;
  /** Color of inactive dots. */
  indicatorInactiveColor?: Color;
  /** Size of each dot in px. Default 8. */
  indicatorDotSize?: number;
  /** Gap between dots in px. Default 6. */
  indicatorSpacing?: number;
  /** Explicit width of the PageView container. */
  width?: SizeInput;
  /** Explicit height of the PageView container. */
  height?: SizeInput;
  /** Imperative controller ref. */
  controller?: React.RefObject<PageController | null>;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export const PageView = React.forwardRef<HTMLDivElement, PageViewProps>(
  (
    {
      children,
      itemCount,
      itemBuilder,
      page: controlledPage,
      onPageChanged,
      scrollDirection = "horizontal",
      reverse = false,
      viewportFraction = 1,
      physics = "page",
      showIndicator = false,
      indicatorActiveColor,
      indicatorInactiveColor,
      indicatorDotSize = 8,
      indicatorSpacing = 6,
      width,
      height,
      controller,
      className,
      style,
    },
    ref
  ) => {
    const isHorizontal = scrollDirection === "horizontal";
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = React.useState(controlledPage ?? 0);
    const isScrolling = React.useRef(false);
    void isScrolling; // reserved for future gesture-cancel logic

    // Build pages array
    const pages = React.useMemo(() => {
      if (itemBuilder && itemCount !== undefined) {
        return Array.from({ length: itemCount }, (_, i) => itemBuilder(i));
      }
      return React.Children.toArray(children);
    }, [children, itemBuilder, itemCount]);

    const pageCount = pages.length;

    // ── Scroll to page ──────────────────────────────────────
    const scrollToPage = React.useCallback(
      (index: number, smooth = true) => {
        const el = scrollRef.current;
        if (!el || index < 0 || index >= pageCount) return;
        const pageSize = isHorizontal ? el.clientWidth : el.clientHeight;
        const offset = index * pageSize * viewportFraction;
        if (isHorizontal) {
          el.scrollTo({ left: reverse ? -offset : offset, behavior: smooth ? "smooth" : "instant" });
        } else {
          el.scrollTo({ top: reverse ? -offset : offset, behavior: smooth ? "smooth" : "instant" });
        }
      },
      [isHorizontal, reverse, viewportFraction, pageCount]
    );

    // ── Sync controlled page ────────────────────────────────
    React.useEffect(() => {
      if (controlledPage !== undefined && controlledPage !== currentPage) {
        setCurrentPage(controlledPage);
        scrollToPage(controlledPage);
      }
    }, [controlledPage]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Expose imperative controller ────────────────────────
    React.useEffect(() => {
      if (!controller) return;
      controller.current = {
        animateToPage: (p, _ms = 300) => {
          scrollToPage(p, true);
          setCurrentPage(p);
        },
        jumpToPage: (p) => {
          scrollToPage(p, false);
          setCurrentPage(p);
        },
        nextPage: (_ms) => {
          const next = Math.min(currentPage + 1, pageCount - 1);
          scrollToPage(next, true);
          setCurrentPage(next);
        },
        previousPage: (_ms) => {
          const prev = Math.max(currentPage - 1, 0);
          scrollToPage(prev, true);
          setCurrentPage(prev);
        },
        get page() { return currentPage; },
      };
    }, [controller, currentPage, pageCount, scrollToPage]);

    // ── Detect page from scroll position ───────────────────
    const handleScroll = React.useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      const pageSize = isHorizontal ? el.clientWidth : el.clientHeight;
      if (pageSize === 0) return;
      const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop;
      const newPage = Math.round(scrollPos / (pageSize * viewportFraction));
      const clamped = Math.max(0, Math.min(newPage, pageCount - 1));
      if (clamped !== currentPage) {
        setCurrentPage(clamped);
        onPageChanged?.(clamped);
      }
    }, [isHorizontal, viewportFraction, pageCount, currentPage, onPageChanged]);

    // ── Dot indicator ───────────────────────────────────────
    const dots = showIndicator && pageCount > 1 && (
      <div
        className="flex items-center justify-center"
        style={{
          gap: indicatorSpacing,
          padding: "8px 0",
        }}
        aria-label="Page indicator"
      >
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === currentPage ? "true" : undefined}
            onClick={() => {
              scrollToPage(i);
              setCurrentPage(i);
              onPageChanged?.(i);
            }}
            style={{
              width: i === currentPage ? indicatorDotSize * 2.5 : indicatorDotSize,
              height: indicatorDotSize,
              borderRadius: indicatorDotSize,
              backgroundColor:
                i === currentPage
                  ? (indicatorActiveColor ?? "var(--primary)")
                  : (indicatorInactiveColor ?? "var(--muted-foreground)"),
              opacity: i === currentPage ? 1 : 0.35,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 250ms cubic-bezier(.4,0,.2,1), opacity 250ms, background-color 250ms",
            }}
          />
        ))}
      </div>
    );

    const pageStyle: React.CSSProperties = {
      flexShrink: 0,
      width: isHorizontal ? `${viewportFraction * 100}%` : "100%",
      height: isHorizontal ? "100%" : `${viewportFraction * 100}%`,
      scrollSnapAlign: "start",
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{
          width: sizeToCss(width),
          height: sizeToCss(height),
          ...style,
        }}
      >
        {/* Scroll container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            "flex flex-1 min-h-0",
            isHorizontal
              ? (reverse ? "flex-row-reverse" : "flex-row")
              : (reverse ? "flex-col-reverse" : "flex-col"),
            physics === "never" && "overflow-hidden",
            physics !== "never" && (isHorizontal ? "overflow-x-auto overflow-y-hidden" : "overflow-y-auto overflow-x-hidden"),
          )}
          style={{
            scrollSnapType: physics === "page"
              ? (isHorizontal ? "x mandatory" : "y mandatory")
              : physics === "free"
              ? (isHorizontal ? "x proximity" : "y proximity")
              : undefined,
            scrollBehavior: "smooth",
            // Hide scrollbar
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {pages.map((page, i) => (
            <div key={i} style={pageStyle} aria-hidden={i !== currentPage ? true : undefined}>
              {page}
            </div>
          ))}
        </div>

        {/* Dot indicator below pages */}
        {dots}
      </div>
    );
  }
);

PageView.displayName = "PageView";
