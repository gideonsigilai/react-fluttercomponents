import * as React from "react";
import { cn } from "../utils";

export type BoxFit = "contain" | "cover" | "fill" | "fitWidth" | "fitHeight" | "none" | "scaleDown";
export type Alignment = "topLeft" | "topCenter" | "topRight" | "centerLeft" | "center" | "centerRight" | "bottomLeft" | "bottomCenter" | "bottomRight";

export interface FittedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * How the child should be inscribed into the available space.
   * Mirrors Flutter's BoxFit enum.
   * Default: "contain"
   */
  fit?: BoxFit;
  /**
   * How to align the child within the FittedBox.
   * Default: "center"
   */
  alignment?: Alignment;
  /** Explicit width override. */
  width?: number | string;
  /** Explicit height override. */
  height?: number | string;
  key?: React.Key;
}

const alignmentToCSS = (a: Alignment): React.CSSProperties => {
  const map: Record<Alignment, React.CSSProperties> = {
    topLeft:      { justifyContent: "flex-start", alignItems: "flex-start" },
    topCenter:    { justifyContent: "center",     alignItems: "flex-start" },
    topRight:     { justifyContent: "flex-end",   alignItems: "flex-start" },
    centerLeft:   { justifyContent: "flex-start", alignItems: "center" },
    center:       { justifyContent: "center",     alignItems: "center" },
    centerRight:  { justifyContent: "flex-end",   alignItems: "center" },
    bottomLeft:   { justifyContent: "flex-start", alignItems: "flex-end" },
    bottomCenter: { justifyContent: "center",     alignItems: "flex-end" },
    bottomRight:  { justifyContent: "flex-end",   alignItems: "flex-end" },
  };
  return map[a] ?? map.center;
};

const fitToObjectFit = (fit: BoxFit): React.CSSProperties => {
  switch (fit) {
    case "cover":     return { objectFit: "cover" };
    case "fill":      return { objectFit: "fill" };
    case "fitWidth":  return { objectFit: "contain", width: "100%", height: "auto" };
    case "fitHeight": return { objectFit: "contain", width: "auto", height: "100%" };
    case "none":      return { objectFit: "none" };
    case "scaleDown": return { objectFit: "scale-down" };
    case "contain":
    default:          return { objectFit: "contain" };
  }
};

/**
 * A widget that scales and positions its child within itself according to fit.
 * Equivalent to Flutter's FittedBox() widget.
 *
 * For image children, the CSS objectFit property handles the scaling natively.
 * For non-image children, the child is wrapped and scaled via transform.
 */
export const FittedBox = React.forwardRef<HTMLDivElement, FittedBoxProps>(
  (
    {
      fit = "contain",
      alignment = "center",
      width,
      height,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const childRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    // For non-image children, compute a CSS scale transform
    React.useEffect(() => {
      if (fit === "none") { setScale(1); return; }
      const container = containerRef.current;
      const child = childRef.current;
      if (!container || !child) return;

      const ro = new ResizeObserver(() => {
        const cW = container.clientWidth  || 1;
        const cH = container.clientHeight || 1;
        const iW = child.scrollWidth      || 1;
        const iH = child.scrollHeight     || 1;

        let s = 1;
        if (fit === "contain" || fit === "scaleDown") {
          s = Math.min(cW / iW, cH / iH);
          if (fit === "scaleDown") s = Math.min(1, s);
        } else if (fit === "cover") {
          s = Math.max(cW / iW, cH / iH);
        } else if (fit === "fill") {
          // handled via separate W/H
          s = 1;
        } else if (fit === "fitWidth") {
          s = cW / iW;
        } else if (fit === "fitHeight") {
          s = cH / iH;
        }
        setScale(s);
      });
      ro.observe(container);
      ro.observe(child);
      return () => ro.disconnect();
    }, [fit]);

    const isImageChild =
      React.Children.count(children) === 1 &&
      React.isValidElement(children) &&
      (children as React.ReactElement).type === "img";

    const alignCSS = alignmentToCSS(alignment);

    return (
      <div
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === "function") ref(el!);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={cn("relative overflow-hidden flex", className)}
        style={{
          width:  typeof width  === "number" ? `${width}px`  : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...alignCSS,
          ...style,
        }}
        {...props}
      >
        {isImageChild ? (
          // Native image: use objectFit directly
          React.cloneElement(children as React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>, {
            style: {
              width: "100%",
              height: "100%",
              ...fitToObjectFit(fit),
              ...(children as React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>).props.style,
            },
          })
        ) : (
          <div
            ref={childRef}
            style={{
              transformOrigin: `${alignCSS.alignItems === "flex-start" ? "top" : alignCSS.alignItems === "flex-end" ? "bottom" : "center"} ${alignCSS.justifyContent === "flex-start" ? "left" : alignCSS.justifyContent === "flex-end" ? "right" : "center"}`,
              transform: fit === "none" || fit === "fill" ? undefined : `scale(${scale})`,
              display: "inline-flex",
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

FittedBox.displayName = "FittedBox";
