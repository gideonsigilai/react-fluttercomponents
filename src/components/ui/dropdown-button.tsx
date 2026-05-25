import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../utils";
import type {
  Color,
  EdgeInsetsInput,
  BorderRadiusInput,
  SizeInput,
} from "./flutter-style";
import {
  edgeInsetsToStyle,
  borderRadiusToStyle,
  sizeToCss,
  elevationToShadow,
} from "./flutter-style";

// ─── DropdownMenuItem ───────────────────────────────────────────────────────

export interface DropdownMenuItemProps<T> {
  value: T;
  child: React.ReactNode;
  enabled?: boolean;
  onTap?: () => void;
  /** Height of the item row. Default 48. */
  height?: number;
  key?: React.Key;
}

/**
 * An item in a DropdownButton menu.
 * Equivalent to Flutter's DropdownMenuItem<T>.
 */
export function DropdownMenuItem<T>(_props: DropdownMenuItemProps<T>): null {
  return null;
}
DropdownMenuItem.displayName = "DropdownMenuItem";

// ─── DropdownButton ─────────────────────────────────────────────────────────

export interface DropdownButtonProps<T> {
  value?: T;
  onChanged?: (value: T) => void;
  items: React.ReactElement<DropdownMenuItemProps<T>>[];
  hint?: React.ReactNode;
  disabledHint?: React.ReactNode;
  icon?: React.ReactNode;
  iconEnabledColor?: Color;
  iconDisabledColor?: Color;
  iconSize?: number;
  enabled?: boolean;
  elevation?: number;
  dropdownColor?: Color;
  menuBackgroundColor?: Color;
  style?: React.CSSProperties;
  padding?: EdgeInsetsInput;
  borderRadius?: BorderRadiusInput;
  width?: SizeInput;
  buttonHeight?: number;
  menuMaxHeight?: number;
  label?: string;
  errorText?: string;
  filled?: boolean;
  borderColor?: Color;
  preferUp?: boolean;
  alignment?: "start" | "end" | "center";
  className?: string;
  key?: React.Key;
}

function readItemProps<T>(
  el: React.ReactElement<DropdownMenuItemProps<T>>,
): DropdownMenuItemProps<T> {
  return el.props;
}

// Stable checkmark SVG — defined once outside component
const CheckIcon = (
  <svg
    viewBox="0 0 12 10"
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 5l3.5 3.5L11 1" />
  </svg>
);

/**
 * A material design dropdown button.
 * Equivalent to Flutter's DropdownButton<T>() widget.
 */
export function DropdownButton<T>({
  value,
  onChanged,
  items,
  hint,
  disabledHint,
  icon,
  iconEnabledColor,
  iconDisabledColor,
  iconSize = 20,
  enabled: enabledProp = true,
  elevation = 2,
  dropdownColor,
  menuBackgroundColor,
  style,
  padding,
  borderRadius = 8,
  width,
  buttonHeight = 48,
  menuMaxHeight = 300,
  label,
  errorText,
  filled = false,
  borderColor,
  preferUp = false,
  alignment = "start",
  className,
}: DropdownButtonProps<T>) {
  const enabled = enabledProp && !!onChanged;
  const [open, setOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const openMenu = React.useCallback(() => {
    if (!enabled) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp = preferUp || (spaceBelow < 200 && spaceAbove > spaceBelow);

    const alignOffset =
      alignment === "end"
        ? { right: window.innerWidth - rect.right }
        : alignment === "center"
          ? { left: rect.left + rect.width / 2 }
          : { left: rect.left };

    setMenuStyle({
      position: "fixed",
      zIndex: 9999,
      width: rect.width,
      maxHeight: menuMaxHeight,
      boxShadow: elevationToShadow(elevation),
      backgroundColor: menuBackgroundColor ?? "var(--popover)",
      ...borderRadiusToStyle(borderRadius),
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
      ...alignOffset,
    });
    setOpen(true);
  }, [
    enabled,
    preferUp,
    alignment,
    menuMaxHeight,
    elevation,
    menuBackgroundColor,
    borderRadius,
  ]);

  // Close on outside click / Escape
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const selectedItem = React.useMemo(
    () => items.find((el) => readItemProps(el).value === value),
    [items, value],
  );

  const displayChild = selectedItem
    ? readItemProps(selectedItem).child
    : enabled
      ? hint
      : (disabledHint ?? hint);

  const chevronColor = enabled ? iconEnabledColor : iconDisabledColor;

  const defaultIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: chevronColor,
        flexShrink: 0,
        transition: "transform 200ms",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const handleToggle = React.useCallback(
    () => (open ? setOpen(false) : openMenu()),
    [open, openMenu],
  );

  return (
    <div
      className={cn("inline-flex flex-col w-full", className)}
      style={{ width: sizeToCss(width) }}
    >
      {label && (
        <label
          className={cn(
            "text-sm font-medium mb-1 select-none",
            !enabled && "opacity-50",
            errorText ? "text-destructive" : "text-foreground",
          )}
        >
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        type="button"
        disabled={!enabled}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center justify-between gap-2 w-full text-sm",
          "border transition-colors duration-150 select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          filled ? "bg-secondary" : "bg-background",
          open
            ? "border-primary ring-2 ring-primary/20"
            : errorText
              ? "border-destructive"
              : "border-border hover:border-primary/60",
          !enabled && "opacity-50 cursor-not-allowed",
        )}
        style={{
          height: `${buttonHeight}px`,
          backgroundColor: dropdownColor,
          borderColor,
          ...borderRadiusToStyle(borderRadius),
          ...edgeInsetsToStyle(
            padding ?? { top: 0, bottom: 0, left: 12, right: 8 },
            "padding",
          ),
          ...style,
        }}
      >
        <span className="flex-1 min-w-0 text-left truncate">
          {displayChild ?? (
            <span className="text-muted-foreground">Select…</span>
          )}
        </span>
        {icon ?? defaultIcon}
      </button>

      {errorText && (
        <p className="mt-1 text-xs font-medium text-destructive">{errorText}</p>
      )}

      {open &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-label={label}
            style={{
              ...menuStyle,
              overflowY: "auto",
              border: "1px solid var(--border)",
            }}
            className="py-1"
          >
            {items.map((el, i) => {
              const itemProps = readItemProps(el);
              const isSelected = itemProps.value === value;
              const itemEnabled = itemProps.enabled !== false;

              return (
                <div
                  key={el.key ?? i}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={!itemEnabled}
                  tabIndex={itemEnabled ? 0 : undefined}
                  style={{ minHeight: `${itemProps.height ?? 48}px` }}
                  className={cn(
                    "flex items-center px-4 text-sm transition-colors cursor-pointer select-none",
                    isSelected
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-popover-foreground",
                    itemEnabled
                      ? "hover:bg-accent hover:text-accent-foreground"
                      : "opacity-40 cursor-not-allowed",
                  )}
                  onClick={() => {
                    if (!itemEnabled) return;
                    itemProps.onTap?.();
                    onChanged?.(itemProps.value);
                    setOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (!itemEnabled) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      itemProps.onTap?.();
                      onChanged?.(itemProps.value);
                      setOpen(false);
                    }
                  }}
                >
                  <span
                    className={cn(
                      "mr-2 flex-none w-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  >
                    {CheckIcon}
                  </span>
                  {itemProps.child}
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}

DropdownButton.displayName = "DropdownButton";
