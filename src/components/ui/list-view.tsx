import * as React from "react";
import { cn } from "../utils";

export interface ListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollDirection?: "vertical" | "horizontal";
  shrinkWrap?: boolean;
  padding?: number | string;
  gap?: number | string;
  itemCount?: number;
  itemBuilder?: (index: number) => React.ReactNode;
  /** Called when the user scrolls to the end of the list. */
  onEndReached?: () => void;
  /** Whether data is currently being loaded (shows a spinner at the bottom). */
  isLoadingMore?: boolean;
  /** Whether there is more data to load. If false, sentinel and spinner are hidden. */
  hasMore?: boolean;
  /** How far from the end (px) to trigger onEndReached. Default 250. */
  onEndReachedThreshold?: number;
  key?: React.Key;
}

/**
 * A scrollable list of widgets arranged linearly.
 * Equivalent to Flutter's ListView() widget.
 */
export const ListView = React.forwardRef<HTMLDivElement, ListViewProps>(
  (
    {
      children,
      scrollDirection = "vertical",
      shrinkWrap = false,
      padding,
      gap,
      itemCount,
      itemBuilder,
      className,
      style,
      onEndReached,
      isLoadingMore = false,
      hasMore,
      onEndReachedThreshold = 250,
      ...props
    },
    ref,
  ) => {
    const sentinelRef = React.useRef<HTMLDivElement>(null);
    const internalRef = React.useRef<HTMLDivElement>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    React.useEffect(() => {
      if (
        !onEndReached ||
        !sentinelRef.current ||
        hasMore === false ||
        !internalRef.current
      )
        return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isLoadingMore) onEndReached();
        },
        {
          root: internalRef.current,
          threshold: 0.1,
          rootMargin:
            scrollDirection === "vertical"
              ? `0px 0px ${onEndReachedThreshold}px 0px`
              : `0px ${onEndReachedThreshold}px 0px 0px`,
        },
      );

      observer.observe(sentinelRef.current);
      return () => observer.disconnect();
    }, [
      onEndReached,
      isLoadingMore,
      hasMore,
      onEndReachedThreshold,
      scrollDirection,
    ]);

    // Memoize built items to avoid re-creating the array on every render
    const content = React.useMemo(
      () =>
        itemBuilder && itemCount !== undefined
          ? Array.from({ length: itemCount }, (_, i) => (
              <React.Fragment key={i}>{itemBuilder(i)}</React.Fragment>
            ))
          : children,
      [itemBuilder, itemCount, children],
    );

    return (
      <div
        ref={setRefs}
        className={cn(
          "flex",
          scrollDirection === "vertical"
            ? "flex-col overflow-y-auto"
            : "flex-row overflow-x-auto",
          shrinkWrap ? "flex-none" : "flex-1",
          className,
        )}
        style={{
          padding: typeof padding === "number" ? `${padding}px` : padding,
          gap: typeof gap === "number" ? `${gap}px` : gap,
          ...style,
        }}
        {...props}
      >
        {content}

        {onEndReached && hasMore !== false && (
          <div
            ref={sentinelRef}
            className="flex justify-center items-center py-4"
          >
            {isLoadingMore && (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-60" />
            )}
          </div>
        )}
      </div>
    );
  },
);

ListView.displayName = "ListView";
