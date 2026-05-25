import * as React from "react";
import { cn } from "../utils";
import type {
  Color,
  EdgeInsetsInput,
  BorderRadiusInput,
  BorderValue,
} from "./flutter-style";
import {
  edgeInsetsToStyle,
  borderRadiusToStyle,
  borderToStyle,
  elevationToShadow,
} from "./flutter-style";

// ─── Text-style types (mirrors text.tsx) ─────────────────────────────────────
type FontWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "normal"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
type TextOverflow = "ellipsis" | "clip" | "visible" | "fade";
type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";
type FontStyle = "normal" | "italic";
type TextDecoration = "none" | "underline" | "line-through" | "overline";

const fontWeightMap: Record<string, string> = {
  thin: "100",
  extraLight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
};
const resolveFontWeight = (w?: FontWeight): string | undefined => {
  if (w === undefined) return undefined;
  if (typeof w === "number") return String(w);
  return fontWeightMap[w] ?? String(w);
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared props base (mirrors Flutter's ChipThemeData fields)
// ─────────────────────────────────────────────────────────────────────────────
export interface ChipProps {
  /** The primary label content of the chip. */
  label: React.ReactNode;

  /**
   * Widget shown before the label (e.g. an Icon or CircularAvatar).
   * Equivalent to Flutter's `avatar` prop.
   */
  avatar?: React.ReactNode;

  /**
   * Widget shown after the label.
   * Equivalent to Flutter's `deleteIcon` / trailing slot.
   */
  deleteIcon?: React.ReactNode;

  /** Called when the chip itself is tapped. */
  onPressed?: () => void;

  /** Called when the delete icon is tapped. Renders deleteIcon automatically if set. */
  onDeleted?: () => void;

  /** Whether the chip is selected (used by FilterChip / ChoiceChip). */
  selected?: boolean;

  /** Whether the chip is interactive. Default true. */
  enabled?: boolean;

  /** Background color of the chip surface. */
  backgroundColor?: Color;

  /** Background color when selected. */
  selectedColor?: Color;

  /** Background color when disabled. */
  disabledColor?: Color;

  /** Color for the label text and icons. Alias: `color`. */
  labelColor?: Color;

  /** Color used when the chip is selected (label + indicator). */
  selectedLabelColor?: Color;

  /** Color of the delete icon. */
  deleteIconColor?: Color;

  /** Inner padding. Default EdgeInsets.symmetric(horizontal:8, vertical:4). */
  padding?: EdgeInsetsInput;

  /** Padding around just the label. */
  labelPadding?: EdgeInsetsInput;

  /** Border radius applied to the label span (for pill/highlight effects on the label only). */
  labelBorderRadius?: BorderRadiusInput;

  /** Background color applied only to the label span area. */
  labelBackgroundColor?: Color;

  // ── Direct TextStyle props on the label (same API as Text component) ────────

  /** Font size of the label in px or CSS unit. */
  fontSize?: number | string;
  /** Font weight of the label. */
  fontWeight?: FontWeight;
  /** Letter spacing of the label in px or CSS unit. */
  letterSpacing?: number | string;
  /** Line height of the label. */
  lineHeight?: number | string;
  /** Text decoration on the label. */
  decoration?: TextDecoration;
  /** How the label text overflows. */
  overflow?: TextOverflow;
  /** Whether the label text wraps. Default true. */
  softWrap?: boolean;
  /** Max lines for the label before overflow applies. */
  maxLines?: number;
  /** Text alignment of the label. */
  textAlign?: TextAlign;
  /** Font style of the label. */
  fontStyle?: FontStyle;

  /** Border radius. Default 8 (rounded-lg, matching Material 3). */
  borderRadius?: BorderRadiusInput;

  /** Border definition. */
  border?: BorderValue;

  /** Elevation (shadow). Default 0. */
  elevation?: number;

  /** Elevation when pressed. Default 4. */
  pressElevation?: number;

  /** Tooltip string shown on long hover. */
  tooltip?: string;

  /**
   * Visual variant:
   * - "filled"   → solid background (InputChip / ActionChip default)
   * - "outlined" → transparent with a border (FilterChip default)
   * - "elevated" → white with elevation shadow
   * - "assist"   → like ActionChip with a leading icon
   */
  variant?: "filled" | "outlined" | "elevated" | "assist";

  className?: string;
  key?: React.Key;
}

/**
 * A material design chip widget.
 * Equivalent to Flutter's Chip() / ActionChip() / FilterChip() / InputChip().
 *
 * All variants are unified into one component; use `variant` + `onPressed` +
 * `selected` to replicate each Flutter chip type:
 *
 *   Chip         → <Chip label="Label" />
 *   ActionChip   → <Chip label="Action" onPressed={() => {}} />
 *   FilterChip   → <Chip label="Filter" selected={true} variant="outlined" onPressed={() => {}} />
 *   InputChip    → <Chip label="Input" onDeleted={() => {}} />
 *   ChoiceChip   → <Chip label="Choice" selected={true} selectedColor={...} onPressed={() => {}} />
 */
export const Chip = React.memo(
  ({
    label,
    avatar,
    deleteIcon,
    onPressed,
    onDeleted,
    selected = false,
    enabled = true,
    backgroundColor,
    selectedColor,
    disabledColor,
    labelColor,
    selectedLabelColor,
    deleteIconColor,
    padding,
    labelPadding,
    labelBorderRadius,
    labelBackgroundColor,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    decoration,
    overflow,
    softWrap,
    maxLines,
    textAlign,
    fontStyle,
    borderRadius = 8,
    border,
    elevation = 0,
    pressElevation = 4,
    tooltip,
    variant = "filled",
    className,
  }: ChipProps) => {
    const [pressed, setPressed] = React.useState(false);

    const isInteractive = enabled && (!!onPressed || !!onDeleted);

    // ── Resolve background color ──────────────────────────────
    const resolvedBg = (() => {
      if (!enabled) return disabledColor ?? "hsl(var(--muted))";
      if (selected) return selectedColor ?? "hsl(var(--primary))";
      if (backgroundColor) return backgroundColor;
      switch (variant) {
        case "outlined":
          return "transparent";
        case "elevated":
          return "hsl(var(--card))";
        case "assist":
          return "hsl(var(--card))";
        default:
          return "hsl(var(--secondary))";
      }
    })();

    // ── Resolve label color ───────────────────────────────────
    const resolvedLabelColor = (() => {
      if (!enabled) return "hsl(var(--muted-foreground))";
      if (selected)
        return selectedLabelColor ?? "hsl(var(--primary-foreground))";
      if (labelColor) return labelColor;
      switch (variant) {
        case "outlined":
          return "hsl(var(--foreground))";
        default:
          return "hsl(var(--secondary-foreground))";
      }
    })();

    // ── Resolve border ────────────────────────────────────────
    const resolvedBorder: BorderValue | undefined =
      border ??
      (variant === "outlined" || variant === "elevated"
        ? {
            top: {
              color: selected ? "hsl(var(--primary))" : "hsl(var(--border))",
              width: 1,
            },
            right: {
              color: selected ? "hsl(var(--primary))" : "hsl(var(--border))",
              width: 1,
            },
            bottom: {
              color: selected ? "hsl(var(--primary))" : "hsl(var(--border))",
              width: 1,
            },
            left: {
              color: selected ? "hsl(var(--primary))" : "hsl(var(--border))",
              width: 1,
            },
          }
        : undefined);

    const currentElevation =
      pressed && isInteractive ? pressElevation : elevation;

    const chipStyle: React.CSSProperties = {
      backgroundColor: resolvedBg,
      color: resolvedLabelColor,
      boxShadow: elevationToShadow(currentElevation),
      overflow: "hidden", // ensures borderRadius clips the background
      ...borderRadiusToStyle(borderRadius),
      ...borderToStyle(resolvedBorder),
      ...edgeInsetsToStyle(padding ?? { top: 4, bottom: 4, left: 8, right: 8 }),
      transition:
        "box-shadow 0.15s ease, opacity 0.15s ease, background-color 0.15s ease",
    };

    // ── Label text style (mirrors Text component resolution) ──────────────
    const isNoWrap = softWrap === false || maxLines === 1;
    const labelStyle: React.CSSProperties = {
      ...edgeInsetsToStyle(labelPadding),
      ...(labelBorderRadius !== undefined
        ? borderRadiusToStyle(labelBorderRadius)
        : {}),
      ...(labelBackgroundColor !== undefined
        ? { backgroundColor: labelBackgroundColor }
        : {}),
      fontSize:
        fontSize !== undefined
          ? typeof fontSize === "number"
            ? `${fontSize}px`
            : fontSize
          : undefined,
      fontWeight: resolveFontWeight(fontWeight),
      letterSpacing:
        letterSpacing !== undefined
          ? typeof letterSpacing === "number"
            ? `${letterSpacing}px`
            : letterSpacing
          : undefined,
      lineHeight: lineHeight !== undefined ? lineHeight : undefined,
      textDecoration: decoration,
      textAlign,
      fontStyle,
      ...(isNoWrap || maxLines
        ? {
            overflow: "hidden",
            textOverflow: overflow === "clip" ? "clip" : "ellipsis",
            ...(isNoWrap
              ? { whiteSpace: "nowrap" as const }
              : maxLines && maxLines > 1
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: maxLines,
                    WebkitBoxOrient: "vertical" as const,
                  }
                : {}),
          }
        : overflow === "clip"
          ? { overflow: "hidden" as const }
          : {}),
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") onPressed?.();
    };

    const chip = (
      <div
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-pressed={onPressed ? selected : undefined}
        aria-disabled={!enabled}
        onClick={enabled ? onPressed : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className={cn(
          "inline-flex items-center gap-1.5 select-none outline-none",
          isInteractive && enabled && "cursor-pointer",
          !enabled && "cursor-not-allowed opacity-50",
          isInteractive &&
            enabled &&
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isInteractive && enabled && "hover:opacity-85 active:opacity-70",
          className,
        )}
        style={chipStyle}
      >
        {/* Avatar / Leading icon */}
        {avatar && (
          <span className="flex-none flex items-center justify-center -ml-1">
            {avatar}
          </span>
        )}

        {/* Selected checkmark (FilterChip / ChoiceChip style) */}
        {selected && !avatar && onPressed && (
          <span className="flex-none flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                d="M20 6L9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}

        {/* Label */}
        <span
          className="text-sm font-medium leading-none"
          style={{ color: resolvedLabelColor, ...labelStyle }}
        >
          {label}
        </span>

        {/* Delete icon */}
        {(onDeleted || deleteIcon) && (
          <span
            role="button"
            tabIndex={enabled ? 0 : -1}
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              if (enabled) onDeleted?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                if (enabled) onDeleted?.();
              }
            }}
            className={cn(
              "flex-none flex items-center justify-center -mr-1 rounded-full",
              "hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            )}
            style={{ color: deleteIconColor ?? resolvedLabelColor }}
          >
            {deleteIcon ?? (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
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
            )}
          </span>
        )}
      </div>
    );

    if (tooltip) {
      return (
        <div className="relative group/chip inline-flex">
          {chip}
          <div
            className={cn(
              "pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50",
              "px-2 py-1 rounded text-xs font-medium whitespace-nowrap",
              "bg-popover text-popover-foreground shadow-md border border-border",
              "opacity-0 group-hover/chip:opacity-100 transition-opacity duration-150",
            )}
          >
            {tooltip}
          </div>
        </div>
      );
    }

    return chip;
  },
);

Chip.displayName = "Chip";
