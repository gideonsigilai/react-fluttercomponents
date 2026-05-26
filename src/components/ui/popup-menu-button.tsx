import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PopupMenuEntry<T> {
  value?: T;
  child: React.ReactNode;
  enabled?: boolean;
  /** Divider instead of an item — omit value/child for a pure divider. */
  isDivider?: boolean;
  onTap?: () => void;
  height?: number;
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
}

export interface PopupMenuButtonProps<T> {
  /** The icon or widget that triggers the menu. Default: ⋮ icon. */
  child?: React.ReactNode;
  /** Icon to show (alternative to child). */
  icon?: React.ReactNode;
  /** Items to display in the popup menu. */
  itemBuilder: (context: null) => PopupMenuEntry<T>[];
  /** Called when an item is selected. */
  onSelected?: (value: T) => void;
  /** Called when the menu is cancelled without selection. */
  onCanceled?: () => void;
  /** Tooltip for the button. */
  tooltip?: string;
  /** Elevation of the popup menu. Default 8. */
  elevation?: number;
  /** Background color of the popup. */
  color?: string;
  /** Whether the button is enabled. */
  enabled?: boolean;
  /** Padding inside the button. Default 8px. */
  padding?: number;
  /** Icon size. Default 24. */
  iconSize?: number;
  /** Position to offset the menu. */
  offset?: { x?: number; y?: number };
  /** Which side to prefer opening on. */
  position?: "over" | "under";
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

// Stable more-vert SVG
const MoreVertIcon = (
  <svg
    viewBox="0 0 24 24"
    width={20}
    height={20}
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="5"  r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

const CheckIcon = (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * A material design popup menu button.
 * Equivalent to Flutter's PopupMenuButton<T>() widget.
 *
 * Renders a trigger (usually ⋮) and shows a portal menu on tap.
 */
export function PopupMenuButton<T>({
  child,
  icon,
  itemBuilder,
  onSelected,
  onCanceled,
  tooltip,
  elevation = 8,
  color,
  enabled = true,
  padding = 8,
  iconSize = 24,
  offset,
  position = "under",
  className,
  style,
}: PopupMenuButtonProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const items = React.useMemo(() => itemBuilder(null), [itemBuilder]);

  const openMenu = React.useCallback(() => {
    if (!enabled) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = position === "over" || (spaceBelow < 200 && rect.top > spaceBelow);

    const menuWidth = 180;
    let left = rect.left;
    if (left + menuWidth > window.innerWidth) {
      left = rect.right - menuWidth;
    }

    setMenuStyle({
      position: "fixed",
      zIndex: 9999,
      minWidth: menuWidth,
      left: left + (offset?.x ?? 0),
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + (offset?.y ?? 0) }
        : { top: rect.bottom + (offset?.y ?? 4) }),
      backgroundColor: color ?? "hsl(var(--popover))",
      borderRadius: 8,
      border: "1px solid hsl(var(--border))",
      boxShadow: `0 ${elevation}px ${elevation * 3}px rgba(0,0,0,0.18)`,
      overflow: "hidden",
    });
    setOpen(true);
  }, [enabled, position, offset, color, elevation]);

  // Close on outside click / Escape
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        onCanceled?.();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); onCanceled?.(); }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onCanceled]);

  const trigger = child ?? icon ?? MoreVertIcon;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={!enabled}
        onClick={open ? () => setOpen(false) : openMenu}
        title={tooltip}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors duration-150",
          "hover:bg-accent/60 active:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !enabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        style={{
          padding,
          width: iconSize + padding * 2,
          height: iconSize + padding * 2,
          ...style,
        }}
      >
        {trigger}
      </button>

      {open && ReactDOM.createPortal(
        <div
          ref={menuRef}
          role="menu"
          style={menuStyle}
          className="py-1 animate-in fade-in zoom-in-95 duration-100"
        >
          {items.map((item, i) => {
            if (item.isDivider) {
              return (
                <div
                  key={i}
                  role="separator"
                  className="h-px bg-border my-1 mx-3"
                  aria-hidden="true"
                />
              );
            }
            const itemEnabled = item.enabled !== false;
            return (
              <div
                key={i}
                role="menuitem"
                tabIndex={itemEnabled ? 0 : -1}
                aria-disabled={!itemEnabled}
                className={cn(
                  "flex items-center gap-2.5 px-4 text-sm text-popover-foreground transition-colors select-none",
                  itemEnabled
                    ? "cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    : "opacity-40 cursor-not-allowed",
                )}
                style={{
                  minHeight: item.height ?? 44,
                  paddingTop: item.padding?.top ?? 0,
                  paddingBottom: item.padding?.bottom ?? 0,
                  paddingLeft: item.padding?.left ?? 16,
                  paddingRight: item.padding?.right ?? 16,
                }}
                onClick={() => {
                  if (!itemEnabled) return;
                  item.onTap?.();
                  if (item.value !== undefined) {
                    onSelected?.(item.value);
                  }
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (!itemEnabled) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    item.onTap?.();
                    if (item.value !== undefined) onSelected?.(item.value);
                    setOpen(false);
                  }
                }}
              >
                {item.child}
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </>
  );
}

PopupMenuButton.displayName = "PopupMenuButton";

// ─── Convenience exports ──────────────────────────────────────────────────────

export function PopupMenuItem<T>(props: PopupMenuEntry<T>): PopupMenuEntry<T> {
  return props;
}

export function PopupMenuDivider(): PopupMenuEntry<never> {
  return { isDivider: true, child: null };
}
