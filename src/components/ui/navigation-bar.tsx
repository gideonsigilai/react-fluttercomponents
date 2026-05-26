import * as React from "react";
import { cn } from "../utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NavigationBarDestination {
  /** The icon displayed when this destination is unselected. */
  icon: React.ReactNode;
  /** The icon displayed when this destination is selected. Optional; falls back to icon. */
  selectedIcon?: React.ReactNode;
  /** The text label below the icon. */
  label: string;
  /** Whether this destination is enabled. Default true. */
  enabled?: boolean;
  /** Badge content (number or dot). */
  badge?: number | boolean;
  /** Tooltip string. */
  tooltip?: string;
}

export interface NavigationBarProps {
  /** Currently selected index. */
  selectedIndex?: number;
  /** Called when user taps a destination. */
  onDestinationSelected?: (index: number) => void;
  /** Array of destinations. */
  destinations: NavigationBarDestination[];
  /** Background color of the bar. */
  backgroundColor?: string;
  /** Elevation (shadow). Default 3. */
  elevation?: number;
  /** Height of the navigation bar. Default 80. */
  height?: number;
  /** Color used for indicator behind selected icon. */
  indicatorColor?: string;
  /** Label behavior. */
  labelBehavior?: "alwaysShow" | "alwaysHide" | "onlyShowSelected";
  /** Whether labels are shown. Overridden by labelBehavior. */
  showLabels?: boolean;
  /** Animation duration in ms. Default 200. */
  animationDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/**
 * A Material 3 Navigation Bar.
 * Equivalent to Flutter's NavigationBar() widget (Material 3).
 *
 * Differs from BottomNavigationBar in that it uses an indicator pill behind
 * the selected icon instead of just a color change.
 */
export const NavigationBar = React.memo(({
  selectedIndex = 0,
  onDestinationSelected,
  destinations,
  backgroundColor,
  elevation = 3,
  height = 80,
  indicatorColor,
  labelBehavior = "alwaysShow",
  showLabels = true,
  animationDuration = 200,
  className,
  style,
}: NavigationBarProps) => {
  const resolvedBg = backgroundColor ?? "hsl(var(--card))";
  const resolvedIndicator = indicatorColor ?? "hsl(var(--primary) / 0.15)";

  const showLabel = (i: number): boolean => {
    if (labelBehavior === "alwaysHide") return false;
    if (labelBehavior === "alwaysShow") return showLabels;
    if (labelBehavior === "onlyShowSelected") return i === selectedIndex;
    return showLabels;
  };

  const shadow =
    elevation === 0
      ? "none"
      : `0 -${elevation}px ${elevation * 4}px rgba(0,0,0,0.08)`;

  return (
    <nav
      className={cn(
        "w-full flex items-stretch border-t border-border",
        className,
      )}
      style={{
        backgroundColor: resolvedBg,
        height,
        boxShadow: shadow,
        ...style,
      }}
      aria-label="Navigation bar"
    >
      {destinations.map((dest, i) => {
        const isSelected = i === selectedIndex;
        const isEnabled = dest.enabled !== false;

        return (
          <button
            key={i}
            type="button"
            disabled={!isEnabled}
            onClick={() => isEnabled && onDestinationSelected?.(i)}
            title={dest.tooltip ?? dest.label}
            aria-label={dest.label}
            aria-current={isSelected ? "page" : undefined}
            className={cn(
              "relative flex-1 flex flex-col items-center justify-center gap-1",
              "transition-all duration-200 outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              isEnabled ? "cursor-pointer" : "cursor-not-allowed opacity-40",
            )}
          >
            {/* ── Indicator pill ──────────────────────────────────────────── */}
            <div className="relative flex items-center justify-center">
              <span
                className="absolute rounded-full transition-all"
                style={{
                  backgroundColor: isSelected ? resolvedIndicator : "transparent",
                  width: isSelected ? 64 : 32,
                  height: 32,
                  transitionDuration: `${animationDuration}ms`,
                  transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)",
                }}
                aria-hidden="true"
              />

              {/* ── Badge ─────────────────────────────────────────────────── */}
              <span className="relative z-10 flex items-center justify-center text-xl"
                style={{
                  color: isSelected
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
                  transition: `color ${animationDuration}ms`,
                }}
              >
                {isSelected ? (dest.selectedIcon ?? dest.icon) : dest.icon}

                {/* Badge dot or number */}
                {dest.badge !== undefined && dest.badge !== false && (
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground font-bold"
                    style={{
                      minWidth: typeof dest.badge === "number" && dest.badge > 0 ? 16 : 8,
                      height: typeof dest.badge === "number" && dest.badge > 0 ? 16 : 8,
                      fontSize: 9,
                      paddingLeft: typeof dest.badge === "number" && dest.badge > 0 ? 3 : 0,
                      paddingRight: typeof dest.badge === "number" && dest.badge > 0 ? 3 : 0,
                    }}
                  >
                    {typeof dest.badge === "number" && dest.badge > 0
                      ? dest.badge > 99 ? "99+" : dest.badge
                      : null}
                  </span>
                )}
              </span>
            </div>

            {/* ── Label ─────────────────────────────────────────────────────── */}
            <span
              className="text-[10px] font-medium leading-none transition-all select-none"
              style={{
                color: isSelected
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
                opacity: showLabel(i) ? 1 : 0,
                maxHeight: showLabel(i) ? 20 : 0,
                transitionDuration: `${animationDuration}ms`,
                fontWeight: isSelected ? "600" : "500",
              }}
              aria-hidden={!showLabel(i)}
            >
              {dest.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
});

NavigationBar.displayName = "NavigationBar";
