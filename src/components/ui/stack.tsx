import * as React from "react";
import { cn } from "../utils";
import { Alignment } from "./layout-types";
import { sizePropsToStyle, type SizeProps } from "./flutter-style";
import { POSITIONED_DISPLAY_NAME } from "./positioned";

export enum StackFit {
  /** Non-positioned children take their natural size. */
  loose = "loose",
  /**
   * Each non-positioned child is forced to fill the entire stack
   * (width & height 100%).  Achieved by wrapping in an absolute-fill div.
   */
  expand = "expand",
  /** Pass constraints through unchanged (same as loose in HTML). */
  passthrough = "passthrough",
}

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
  /**
   * Where non-positioned children are placed inside the stack.
   * Only meaningful when fit is "loose" / "passthrough".
   * Equivalent to Flutter's Stack.alignment.
   */
  alignment?: Alignment;
  /**
   * How non-positioned children are sized relative to the stack.
   * Equivalent to Flutter's Stack.fit.
   */
  fit?: StackFit;
  /** Whether to clip children that overflow. Default "hidden". */
  clipBehavior?: "hidden" | "visible";
  key?: React.Key;
}

// Maps our Alignment enum values (which are Tailwind class strings) to
// plain CSS so we can apply them inline without needing Tailwind at runtime.
const alignToCss: Record<Alignment, React.CSSProperties> = {
  [Alignment.topLeft]: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  [Alignment.topCenter]: { alignItems: "flex-start", justifyContent: "center" },
  [Alignment.topRight]: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  [Alignment.centerLeft]: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  [Alignment.center]: { alignItems: "center", justifyContent: "center" },
  [Alignment.centerRight]: { alignItems: "center", justifyContent: "flex-end" },
  [Alignment.bottomLeft]: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  [Alignment.bottomCenter]: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  [Alignment.bottomRight]: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
};

/**
 * A widget that positions its children relative to the edges of its box.
 * Non-positioned children are stacked in document order (last child on top).
 * Use <Positioned> for children that need explicit top/right/bottom/left.
 *
 * Equivalent to Flutter's Stack() widget.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      alignment = Alignment.topLeft,
      fit = StackFit.loose,
      clipBehavior = "hidden",
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Stack is a positioned container — NOT a flex container.
          // Children use absolute positioning (via <Positioned>) or natural
          // stacking (display:contents / block inside position:relative).
          "relative",
          clipBehavior === "hidden" ? "overflow-hidden" : "overflow-visible",
          className,
        )}
        style={{
          ...sizePropsToStyle({
            width,
            height,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
          }),
          ...style,
        }}
        {...props}
      >
        {fit === StackFit.expand
          ? // Wrap each child in an absolutely-positioned fill div so it
            // stretches to fill the entire stack — no cloneElement needed.
            React.Children.map(children, (child, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  ...alignToCss[alignment],
                }}
              >
                {child}
              </div>
            ))
          : // Default (loose): children stack in normal flow inside the
            // relative container.  Each non-Positioned child sits in its
            // own layer using a flex wrapper that honours the alignment.
            React.Children.map(children, (child, i) => {
              // Skip null / undefined / boolean children
              if (
                child === null ||
                child === undefined ||
                typeof child === "boolean"
              ) {
                return child;
              }

              // Detect <Positioned> via its displayName — it manages its own placement.
              const isPositioned =
                React.isValidElement(child) &&
                (child.type as { displayName?: string }).displayName ===
                  POSITIONED_DISPLAY_NAME;

              if (isPositioned)
                return <React.Fragment key={i}>{child}</React.Fragment>;

              // Non-positioned children: wrap in an absolute fill + flex div
              // that aligns the child according to the stack's alignment.
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    pointerEvents: "none",
                    ...alignToCss[alignment],
                  }}
                >
                  <div style={{ pointerEvents: "auto" }}>{child}</div>
                </div>
              );
            })}
      </div>
    );
  },
);

Stack.displayName = "Stack";
