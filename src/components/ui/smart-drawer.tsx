/**
 * SmartDrawer — Responsive Flutter-style navigation drawer panel.
 *
 * Breakpoint behaviour:
 *   desktop  (≥1024px) → always-visible expanded rail (icons + labels)
 *   tablet   (640–1023px) → always-visible icon-only rail
 *   mobile   (<640px)  → hidden; hamburger button triggers a slide-over drawer
 *
 * Usage: Pass as Scaffold's `drawer` or `endDrawer` prop.
 * Children: SmartDrawerTile elements are rendered as nav tiles.
 *           Any other React node is rendered inline in the tile list area.
 * Header/Footer: Accept any ReactNode.
 */
import * as React from "react";
import { cn } from "../utils";
import type {
  Color,
  EdgeInsetsInput,
  BorderRadiusInput,
} from "./flutter-style";
import {
  edgeInsetsToStyle,
  borderRadiusToStyle,
  elevationToShadow,
} from "./flutter-style";

// ─────────────────────────────────────────────────────────────────────────────
// BREAKPOINTS (px)
// ─────────────────────────────────────────────────────────────────────────────
const BP_TABLET = 640;
const BP_DESKTOP = 1024;

function useBreakpoint() {
  const [width, setWidth] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth : BP_DESKTOP,
  );
  React.useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < BP_TABLET,
    isTablet: width >= BP_TABLET && width < BP_DESKTOP,
    isDesktop: width >= BP_DESKTOP,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SmartDrawerTile
// ─────────────────────────────────────────────────────────────────────────────
export interface SmartDrawerTileProps {
  /** Icon widget shown in the rail and drawer. */
  icon: React.ReactNode;
  /** Primary label. Hidden on tablet (icon-only) rail. */
  title: string;
  /** Secondary line shown only in the expanded drawer. */
  subtitle?: string;
  /** Widget pinned to the trailing edge (expanded mode only). */
  trailing?: React.ReactNode;
  /** Tooltip shown on hover — auto-shown on tablet rail. */
  tooltip?: string;
  /** Whether this tile is currently active/selected. */
  selected?: boolean;
  /** Called when the tile is tapped. */
  onTap?: () => void;
  /** Accent color for the selected indicator. */
  activeColor?: Color;
  /** Whether the tile is interactive. */
  enabled?: boolean;
  /** Badge count shown on the icon. */
  badgeCount?: number;
  /** Whether to show a dot badge (no count). */
  badgeDot?: boolean;
  /** Custom padding. */
  contentPadding?: EdgeInsetsInput;
  /** Border radius of the tile. Default 12. */
  borderRadius?: BorderRadiusInput;
  key?: React.Key;
}

// Internal — rendered differently per breakpoint
interface TileRenderProps extends SmartDrawerTileProps {
  mode: "expanded" | "rail" | "drawer";
  ltr?: boolean;
}

const TileIcon = ({
  icon,
  badgeCount,
  badgeDot,
  activeColor,
  selected,
}: Pick<
  SmartDrawerTileProps,
  "icon" | "badgeCount" | "badgeDot" | "activeColor" | "selected"
>) => (
  <div className="relative flex-none">
    <div
      className={cn(
        "flex items-center justify-center w-6 h-6 transition-transform duration-200",
        selected && "scale-110",
      )}
      style={{
        color: selected ? (activeColor ?? "var(--primary)") : undefined,
      }}
    >
      {icon}
    </div>
    {/* Badge */}
    {(badgeCount !== undefined || badgeDot) && (
      <span
        className={cn(
          "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground font-semibold ring-2 ring-background",
          badgeDot || badgeCount === 0
            ? "h-2 w-2"
            : "min-h-[18px] min-w-[18px] px-1 text-[10px]",
        )}
      >
        {!badgeDot && badgeCount !== undefined && badgeCount > 0
          ? badgeCount > 99
            ? "99+"
            : badgeCount
          : null}
      </span>
    )}
  </div>
);

const DrawerTileInner = React.memo(
  ({
    icon,
    title,
    subtitle,
    trailing,
    tooltip,
    selected,
    onTap,
    activeColor,
    enabled = true,
    badgeCount,
    badgeDot,
    contentPadding,
    borderRadius = 12,
    mode,
    ltr,
  }: TileRenderProps) => {
    const isRail = mode === "rail";
    const isExpanded = mode === "expanded" || mode === "drawer";

    const inner = (
      <div
        role="button"
        tabIndex={enabled ? 0 : -1}
        aria-selected={selected}
        aria-disabled={!enabled}
        onClick={enabled ? onTap : undefined}
        onKeyDown={
          enabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") onTap?.();
              }
            : undefined
        }
        className={cn(
          "group relative flex items-center gap-3 w-full transition-all duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isRail ? "flex-col gap-1 px-2 py-3 justify-center" : "px-3 py-2.5",
          ltr && !isRail && "flex-row-reverse",
          enabled ? "cursor-pointer" : "cursor-not-allowed opacity-40",
          selected
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
        )}
        style={{
          ...borderRadiusToStyle(borderRadius),
          ...edgeInsetsToStyle(contentPadding),
        }}
      >
        {/* Selected indicator bar */}
        {selected && !isRail && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-1 rounded-full h-6 transition-all duration-300",
              ltr ? "right-0" : "left-0",
            )}
            style={{ backgroundColor: activeColor ?? "var(--primary)" }}
          />
        )}

        {/* Selected pill background */}
        <span
          className={cn(
            "absolute inset-0 rounded-[inherit] transition-all duration-200",
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
          style={{
            backgroundColor: selected
              ? activeColor
                ? `${activeColor}18`
                : "var(--primary)/10"
              : "var(--accent)",
            ...(selected && activeColor
              ? { backgroundColor: `${activeColor}18` }
              : selected
                ? {}
                : {}),
          }}
          aria-hidden="true"
        />

        {/* Icon */}
        <TileIcon
          icon={icon}
          badgeCount={badgeCount}
          badgeDot={badgeDot}
          activeColor={activeColor}
          selected={selected}
        />

        {/* Text — hidden on rail */}
        {isExpanded && (
          <div className={cn("flex-1 min-w-0 relative", ltr && "text-right")}>
            <p
              className={cn(
                "text-sm font-medium leading-tight truncate transition-colors duration-200",
                selected
                  ? "text-primary"
                  : "text-foreground group-hover:text-foreground",
              )}
              style={{
                color: selected ? (activeColor ?? undefined) : undefined,
              }}
            >
              {title}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Rail label */}
        {isRail && (
          <span
            className={cn(
              "text-[10px] font-medium leading-none text-center max-w-[56px] truncate transition-colors duration-200",
              selected ? "text-primary" : "text-muted-foreground",
            )}
            style={{ color: selected ? (activeColor ?? undefined) : undefined }}
          >
            {title}
          </span>
        )}

        {/* Trailing — expanded only */}
        {isExpanded && trailing && (
          <span className="flex-none relative">{trailing}</span>
        )}
      </div>
    );

    // On rail mode, always show tooltip; on expanded, only if tooltip prop given
    if (isRail || tooltip) {
      return (
        <div className="relative group/tip w-full">
          {inner}
          <div
            className={cn(
              "pointer-events-none absolute z-[300] px-2 py-1 rounded text-xs font-medium",
              "bg-popover text-popover-foreground shadow-md border border-border",
              "opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 whitespace-nowrap",
              isRail
                ? "left-full ml-3 top-1/2 -translate-y-1/2"
                : "bottom-full mb-2 left-1/2 -translate-x-1/2",
            )}
          >
            {tooltip ?? title}
            {/* Arrow */}
            {isRail && (
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
            )}
          </div>
        </div>
      );
    }

    return <div className="w-full">{inner}</div>;
  },
);

DrawerTileInner.displayName = "DrawerTileInner";

/**
 * SmartDrawerTile — a navigation tile for use inside SmartDrawer.
 * Renders as a descriptor; SmartDrawer handles actual rendering.
 */
export function SmartDrawerTile(_props: SmartDrawerTileProps): null {
  return null;
}
SmartDrawerTile.displayName = "SmartDrawerTile";

// ─────────────────────────────────────────────────────────────────────────────
// SmartDrawer
// ─────────────────────────────────────────────────────────────────────────────
export interface SmartDrawerProps {
  /**
   * Navigation content. SmartDrawerTile elements are rendered as interactive
   * nav tiles. Any other React node is rendered inline as-is in the tile area.
   */
  children?: React.ReactNode;

  /** Which side the drawer appears on. Default "left". */
  position?: "left" | "right";

  /**
   * ltr — if true, tile content is laid out right-to-left
   * (icon on right, text on left). Mirrors Flutter's ltr concept.
   */
  ltr?: boolean;

  /** Header widget shown at the top of the drawer. Accepts any ReactNode. */
  header?: React.ReactNode;

  /** Footer widget shown at the bottom of the drawer. Accepts any ReactNode. */
  footer?: React.ReactNode;

  /** Width of the expanded drawer/rail. Default 260. */
  drawerWidth?: number;

  /** Width of the icon-only rail (tablet). Default 72. */
  railWidth?: number;

  /** Elevation of the drawer surface. Default 2. */
  elevation?: number;

  /** Background color of the drawer. */
  backgroundColor?: Color;

  /** Color used for selected tile indicators. */
  activeColor?: Color;

  /** Custom trigger button for mobile (replaces default hamburger). */
  mobileTrigger?: (open: () => void) => React.ReactNode;

  /** Whether to show a divider between the drawer and body. Default true. */
  showDivider?: boolean;

  className?: string;
  key?: React.Key;
}

export const SmartDrawer = React.memo(
  ({
    children,
    position = "left",
    ltr = false,
    header,
    footer,
    drawerWidth = 260,
    railWidth = 72,
    elevation = 2,
    backgroundColor,
    activeColor,
    mobileTrigger,
    showDivider = true,
    className,
  }: SmartDrawerProps) => {
    const { isMobile, isTablet, isDesktop } = useBreakpoint();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const shadow = elevationToShadow(elevation);
    const isRight = position === "right";

    // ── Render any slot (children / header / footer) ──────────────────────────
    // SmartDrawerTile elements → DrawerTileInner; everything else → as-is.
    const renderSlot = (
      slot: React.ReactNode,
      mode: "expanded" | "rail" | "drawer",
      opts?: { skipNonTilesOnRail?: boolean },
    ): React.ReactNode[] => {
      const isRail = mode === "rail";
      const skipNonTiles = opts?.skipNonTilesOnRail ?? false;
      const items: React.ReactNode[] = [];

      React.Children.forEach(slot, (child, i) => {
        if (
          React.isValidElement(child) &&
          (child.type as { displayName?: string }).displayName ===
            "SmartDrawerTile"
        ) {
          const tileProps = child.props as SmartDrawerTileProps;
          items.push(
            <DrawerTileInner
              key={tileProps.key ?? `tile-${i}`}
              {...tileProps}
              activeColor={tileProps.activeColor ?? activeColor}
              mode={mode}
              ltr={ltr}
              onTap={
                mode === "drawer"
                  ? () => {
                      tileProps.onTap?.();
                      setMobileOpen(false);
                    }
                  : tileProps.onTap
              }
            />,
          );
        } else if (!(isRail && skipNonTiles)) {
          items.push(
            <div
              key={
                React.isValidElement(child)
                  ? (child.key ?? `other-${i}`)
                  : `other-${i}`
              }
              className="w-full"
            >
              {child}
            </div>,
          );
        }
      });

      return items;
    };

    // ── Rail / Drawer panel ──────────────────────────────────
    const renderPanel = (mode: "expanded" | "rail") => {
      const w = mode === "expanded" ? drawerWidth : railWidth;

      return (
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex flex-col h-full bg-background transition-all duration-300 overflow-hidden",
            showDivider &&
              (isRight ? "border-l border-border" : "border-r border-border"),
            className,
          )}
          style={{
            width: w,
            minWidth: w,
            maxWidth: w,
            boxShadow: shadow,
            backgroundColor,
          }}
        >
          {/* Header — any ReactNode incl. SmartDrawerTile */}
          {header != null && (
            <div
              className={cn(
                "flex-none border-b border-border/50",
                mode === "rail"
                  ? "px-1 py-2 flex flex-col items-center gap-1"
                  : "px-2 py-2 flex flex-col gap-0.5",
              )}
            >
              {renderSlot(header, mode, { skipNonTilesOnRail: false })}
            </div>
          )}

          {/* Tile + content area */}
          <div
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden py-2",
              mode === "rail"
                ? "px-1 flex flex-col items-center gap-1"
                : "px-2 flex flex-col gap-0.5",
            )}
          >
            {renderSlot(children, mode, { skipNonTilesOnRail: true })}
          </div>

          {/* Footer — any ReactNode incl. SmartDrawerTile */}
          {footer != null && (
            <div
              className={cn(
                "flex-none border-t border-border/50",
                mode === "rail"
                  ? "px-1 py-2 flex flex-col items-center gap-1"
                  : "px-2 py-2 flex flex-col gap-0.5",
              )}
            >
              {renderSlot(footer, mode, { skipNonTilesOnRail: false })}
            </div>
          )}
        </nav>
      );
    };

    // ── Mobile slide-over ────────────────────────────────────
    const renderMobileDrawer = () => (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={cn(
            "fixed top-0 bottom-0 z-[210] flex flex-col bg-background transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
            position === "right" ? "right-0" : "left-0",
            position === "right"
              ? mobileOpen
                ? "translate-x-0"
                : "translate-x-full"
              : mobileOpen
                ? "translate-x-0"
                : "-translate-x-full",
            showDivider &&
              (position === "right"
                ? "border-l border-border"
                : "border-r border-border"),
            className,
          )}
          style={{
            width: drawerWidth,
            boxShadow: elevationToShadow(8),
            backgroundColor,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {/* Drag handle / header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
              {header != null ? (
                renderSlot(header, "drawer")
              ) : (
                <span className="text-sm font-semibold text-foreground">
                  Menu
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex-none flex items-center justify-center h-8 w-8 rounded-full hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-0.5">
            {renderSlot(children, "drawer")}
          </div>

          {footer != null && (
            <div className="flex-none border-t border-border/50 px-2 py-2 flex flex-col gap-0.5">
              {renderSlot(footer, "drawer")}
            </div>
          )}
        </div>
      </>
    );

    // ── Hamburger trigger ────────────────────────────────────
    const hamburger = mobileTrigger ? (
      mobileTrigger(() => setMobileOpen(true))
    ) : (
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className={cn(
          "fixed z-[150] flex items-center justify-center h-10 w-10 rounded-full",
          "bg-background border border-border shadow-md",
          "hover:bg-accent transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          position === "right" ? "right-4" : "left-4",
          "top-3",
        )}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
          <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
        </svg>
      </button>
    );

    // ── Render: just the panel (no body — Scaffold handles layout) ───────────
    return (
      <>
        {/* Desktop: full expanded panel */}
        {isDesktop && renderPanel("expanded")}

        {/* Tablet: icon-only rail */}
        {isTablet && renderPanel("rail")}

        {/* Mobile: hamburger + slide-over */}
        {isMobile && (
          <>
            {hamburger}
            {renderMobileDrawer()}
          </>
        )}
      </>
    );
  },
);

SmartDrawer.displayName = "SmartDrawer";
