import * as React from "react";
import { cn } from "../utils";

const STYLE_ID = "__skeletonizer_styles__";

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes __skeletonizer_wave__ {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .skeletonizer-active {
      pointer-events: none !important;
      user-select: none !important;
    }

    /* Target all leaf nodes that usually contain content */
    .skeletonizer-active p,
    .skeletonizer-active h1,
    .skeletonizer-active h2,
    .skeletonizer-active h3,
    .skeletonizer-active h4,
    .skeletonizer-active h5,
    .skeletonizer-active h6,
    .skeletonizer-active span,
    .skeletonizer-active label,
    .skeletonizer-active li,
    .skeletonizer-active td,
    .skeletonizer-active th,
    .skeletonizer-active button,
    .skeletonizer-active img,
    .skeletonizer-active svg,
    .skeletonizer-active input,
    .skeletonizer-active textarea,
    .skeletonizer-active select,
    .skeletonizer-active [data-skeleton="true"] {
      color: transparent !important;
      border-color: transparent !important;
      background-color: var(--skeleton-base, hsl(var(--muted, 210 40% 96%))) !important;
      background-image: linear-gradient(
        90deg,
        transparent 0%,
        var(--skeleton-highlight, rgba(255, 255, 255, 0.4)) 50%,
        transparent 100%
      ) !important;
      background-size: 200% 100% !important;
      animation: __skeletonizer_wave__ var(--skeleton-duration, 1.5s) ease-in-out infinite !important;
      border-radius: var(--skeleton-radius, 4px);
      box-shadow: none !important;
      text-decoration: none !important;
    }

    /* Make text-containing blocks shrink to fit their actual text width */
    .skeletonizer-active p,
    .skeletonizer-active h1,
    .skeletonizer-active h2,
    .skeletonizer-active h3,
    .skeletonizer-active h4,
    .skeletonizer-active h5,
    .skeletonizer-active h6,
    .skeletonizer-active label {
      width: fit-content !important;
      min-width: 3ch; /* Ensure empty or tiny text still shows a small block */
    }

    /* SVG icon paths should be invisible so only the background block shows */
    .skeletonizer-active svg * {
      fill: transparent !important;
      stroke: transparent !important;
    }

    /* Hide image content, keep bounding box */
    .skeletonizer-active img {
      object-position: -99999px -99999px !important;
    }

    /* Hide placeholder text */
    .skeletonizer-active input::placeholder,
    .skeletonizer-active textarea::placeholder {
      color: transparent !important;
    }

    /* Standalone block skeleton */
    .skeleton-block {
      background-color: var(--skeleton-base, hsl(var(--muted, 210 40% 96%)));
      background-image: linear-gradient(
        90deg,
        transparent 0%,
        var(--skeleton-highlight, rgba(255, 255, 255, 0.4)) 50%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: __skeletonizer_wave__ var(--skeleton-duration, 1.5s) ease-in-out infinite;
      border-radius: var(--skeleton-radius, 4px);
    }
  `;
  document.head.appendChild(el);
}

export interface SkeletonProps {
  /**
   * When true the shimmer overlay is applied to leaf elements.
   * When false children render normally.
   * Default: true.
   */
  isActive?: boolean;
  children?: React.ReactNode;
  /** Base (background) colour of the skeleton. */
  baseColor?: string;
  /** Colour / gradient of the travelling shimmer highlight. */
  highlightColor?: string;
  /** Duration of one shimmer cycle in ms. Default 1600. */
  duration?: number;
  width?: number | string;
  height?: number | string;
  /**
   * Corner radius applied to the shimmer overlay.
   * Override for circular avatars: borderRadius={9999}.
   */
  borderRadius?: number | string;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/**
 * A true "Skeletonizer" component.
 * Instead of wrapping the whole component in a solid block, it deeply targets
 * text, icons, and images to perfectly trace their shape, just like Flutter's Skeletonizer.
 *
 * @example
 * <Skeleton isActive={isLoading}>
 *   <ListTile title="Kalenjin" subtitle="English" />
 * </Skeleton>
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      isActive = true,
      children,
      borderRadius,
      baseColor,
      highlightColor,
      duration = 1600,
      width,
      height,
      className,
      style,
    },
    ref,
  ) => {
    React.useLayoutEffect(() => {
      ensureStyles();
    }, []);

    const resolvedRadius =
      borderRadius !== undefined
        ? typeof borderRadius === "number"
          ? `${borderRadius}px`
          : borderRadius
        : undefined;

    const resolvedWidth =
      width !== undefined
        ? typeof width === "number"
          ? `${width}px`
          : width
        : undefined;

    const resolvedHeight =
      height !== undefined
        ? typeof height === "number"
          ? `${height}px`
          : height
        : undefined;

    const customVars = {
      ...(baseColor && { "--skeleton-base": baseColor }),
      ...(highlightColor && { "--skeleton-highlight": highlightColor }),
      ...(duration && { "--skeleton-duration": `${duration}ms` }),
      ...(resolvedRadius && { "--skeleton-radius": resolvedRadius }),
    } as React.CSSProperties;

    // ── Standalone Block Mode ──
    if (!children) {
      if (!isActive) return null;
      return (
        <div
          ref={ref}
          className={cn("skeleton-block", className)}
          style={{
            width: resolvedWidth || "100%",
            height: resolvedHeight || "1rem",
            ...customVars,
            ...style,
          }}
        />
      );
    }

    // ── Wrapper Mode ──
    // If the user didn't provide any layout-altering props on the wrapper,
    // we use `display: contents` so the wrapper itself doesn't break flex layouts.
    const isLayoutUnobtrusive = !className && !style && !width && !height;

    if (!isActive) {
      if (isLayoutUnobtrusive) {
        return <>{children}</>;
      }
      return (
        <div
          ref={ref}
          className={className}
          style={{ width: resolvedWidth, height: resolvedHeight, ...style }}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("skeletonizer-active", className)}
        style={{
          display: isLayoutUnobtrusive ? "contents" : undefined,
          width: resolvedWidth,
          height: resolvedHeight,
          ...customVars,
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);

Skeleton.displayName = "Skeleton";
