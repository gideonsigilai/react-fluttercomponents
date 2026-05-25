import * as React from "react";
import { cn } from "../utils";
import { Row } from "./row";
import { MainAxisAlignment } from "./layout-types";
import type { Color } from "./flutter-style";
import { elevationToShadow } from "./flutter-style";

export interface AppBarProps {
  /** Widget at the leading (left) side, typically an IconButton. */
  leading?: React.ReactNode;
  /** Title widget or string. */
  title?: React.ReactNode;
  /** List of action widgets shown at the trailing (right) side. */
  actions?: React.ReactNode[];
  /** Whether to render the AppBar with a transparent/blurred background. */
  transparent?: boolean;
  /** Explicit background color. Overrides transparent mode. */
  backgroundColor?: Color;
  /** Color of the title text and icons. */
  foregroundColor?: Color;
  /** Height of the AppBar. Default 56px (kToolbarHeight). */
  toolbarHeight?: number;
  /** Elevation (shadow). Default 0. */
  elevation?: number;
  /** Whether to automatically add a back button as leading. */
  automaticallyImplyLeading?: boolean;
  /** Called when the auto-generated back button is pressed. */
  onLeadingTap?: () => void;
  /** Bottom widget (e.g. TabBar). Renders below the main bar. */
  bottom?: React.ReactNode;
  /** Whether the AppBar title is centered. Default false (material 3 behavior). */
  centerTitle?: boolean;
  className?: string;
  key?: React.Key;
}

// Back arrow SVG — stable reference, never re-created
const BackArrow = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * A material design app bar.
 * Equivalent to Flutter's AppBar() widget.
 */
export const AppBar = React.memo(({
  leading,
  title,
  actions,
  transparent = false,
  backgroundColor,
  foregroundColor,
  toolbarHeight = 56,
  elevation = 0,
  automaticallyImplyLeading = true,
  onLeadingTap,
  bottom,
  centerTitle = false,
  className,
}: AppBarProps) => {
  const effectiveLeading =
    leading ??
    (automaticallyImplyLeading && onLeadingTap ? (
      <button
        type="button"
        onClick={onLeadingTap}
        className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent/50 transition-colors"
        aria-label="Back"
      >
        {BackArrow}
      </button>
    ) : null);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        transparent && "bg-transparent backdrop-blur supports-[backdrop-filter]:bg-background/60 border-transparent",
        className
      )}
      style={{
        backgroundColor,
        color: foregroundColor,
        boxShadow: elevationToShadow(elevation),
      }}
    >
      <div
        className="w-full px-4 flex items-center"
        style={{ height: `${toolbarHeight}px` }}
      >
        {effectiveLeading && (
          <div className="flex-none mr-2">{effectiveLeading}</div>
        )}

        {centerTitle ? (
          <>
            <div className="flex-1" />
            <div className="flex-none">
              {typeof title === "string"
                ? <h1 className="text-lg font-semibold truncate">{title}</h1>
                : title}
            </div>
            <div className="flex-1" />
          </>
        ) : (
          <div className="flex-1 min-w-0">
            {typeof title === "string"
              ? <h1 className="text-lg font-semibold truncate">{title}</h1>
              : title}
          </div>
        )}

        {actions && actions.length > 0 && (
          <Row className="w-auto flex-none" gap={4} mainAxisAlignment={MainAxisAlignment.end}>
            {actions.map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}
          </Row>
        )}
      </div>
      {bottom && <div className="w-full">{bottom}</div>}
    </header>
  );
});

AppBar.displayName = "AppBar";
