import * as React from "react";
import { cn } from "../utils";
import type { Color } from "./flutter-style";

// ─── Variant presets (like Flutter's Theme.of(context).textTheme) ────────────
type TextVariant =
  | "displayLarge" // 57px
  | "displayMedium" // 45px
  | "displaySmall" // 36px
  | "headlineLarge" // 32px
  | "headlineMedium" // 28px
  | "headlineSmall" // 24px
  | "titleLarge" // 22px
  | "titleMedium" // 16px, medium weight
  | "titleSmall" // 14px, medium weight
  | "bodyLarge" // 16px
  | "bodyMedium" // 14px  (default)
  | "bodySmall" // 12px
  | "labelLarge" // 14px, medium weight
  | "labelMedium" // 12px, medium weight
  | "labelSmall" // 11px, medium weight
  // Legacy aliases for backwards compat
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "large"
  | "small"
  | "muted"
  | "p";

type TextOverflow = "ellipsis" | "clip" | "visible" | "fade";
type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";
type FontStyle = "normal" | "italic";
type TextDecoration = "none" | "underline" | "line-through" | "overline";
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

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic/style preset. Mirrors Flutter's TextTheme variants. Default "bodyMedium". */
  variant?: TextVariant;
  /** Override the rendered HTML element. */
  as?: keyof JSX.IntrinsicElements;

  // ── Direct TextStyle props (no TextStyle object needed) ──────────────────

  /** Font size in px or any CSS unit string. */
  fontSize?: number | string;
  /** Font weight. Accepts Flutter-style names or numeric values. */
  fontWeight?: FontWeight;
  /** Text color. */
  color?: Color;
  /** Letter spacing in px or CSS unit. */
  letterSpacing?: number | string;
  /** Line height multiplier or px/unit string. */
  lineHeight?: number | string;
  /** Text decoration. */
  decoration?: TextDecoration;
  /** How to handle text that overflows. */
  overflow?: TextOverflow;
  /** Whether the text wraps. false = single line. Default true. */
  softWrap?: boolean;
  /** Max number of lines before overflow applies. */
  maxLines?: number;
  /** Text alignment. */
  textAlign?: TextAlign;
  /** Font style. */
  fontStyle?: FontStyle;
  /** Opacity (0.0–1.0). */
  opacity?: number;

  key?: React.Key;
}

// ─── Font weight name → CSS value ────────────────────────────────────────────
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

// ─── Variant → Tailwind base classes ─────────────────────────────────────────
const variantClasses: Record<TextVariant, string> = {
  displayLarge: "text-[57px] font-light tracking-[-0.25px]",
  displayMedium: "text-[45px] font-light",
  displaySmall: "text-[36px] font-normal",
  headlineLarge: "text-[32px] font-normal",
  headlineMedium: "text-[28px] font-normal",
  headlineSmall: "text-2xl font-normal",
  titleLarge: "text-[22px] font-normal",
  titleMedium: "text-base font-medium tracking-[0.15px]",
  titleSmall: "text-sm font-medium tracking-[0.1px]",
  bodyLarge: "text-base font-normal tracking-[0.5px]",
  bodyMedium: "text-sm font-normal tracking-[0.25px]",
  bodySmall: "text-xs font-normal tracking-[0.4px]",
  labelLarge: "text-sm font-medium tracking-[0.1px]",
  labelMedium: "text-xs font-medium tracking-[0.5px]",
  labelSmall: "text-[11px] font-medium tracking-[0.5px]",
  // Legacy aliases
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

// Default HTML tag per variant
const variantTag: Partial<Record<TextVariant, keyof JSX.IntrinsicElements>> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  displayLarge: "h1",
  displayMedium: "h1",
  displaySmall: "h2",
  headlineLarge: "h2",
  headlineMedium: "h3",
  headlineSmall: "h3",
  titleLarge: "h4",
  titleMedium: "h5",
  titleSmall: "h6",
};

// Overflow → CSS
const overflowStyle = (
  overflow?: TextOverflow,
  softWrap?: boolean,
  maxLines?: number,
): React.CSSProperties => {
  const noWrap = softWrap === false || maxLines === 1;
  const css: React.CSSProperties = {};

  if (noWrap || maxLines) {
    css.overflow = "hidden";
    if (overflow === "ellipsis" || (!overflow && (noWrap || maxLines))) {
      css.textOverflow = "ellipsis";
    }
    if (noWrap) {
      css.whiteSpace = "nowrap";
    } else if (maxLines && maxLines > 1) {
      css.display = "-webkit-box";
      (css as Record<string, unknown>)["-webkit-line-clamp"] = maxLines;
      (css as Record<string, unknown>)["-webkit-box-orient"] = "vertical";
    }
  } else if (overflow === "clip") {
    css.overflow = "hidden";
  }

  return css;
};

/**
 * A rich text widget with Flutter-style inline styling props.
 * Equivalent to Flutter's Text() widget with TextStyle applied directly.
 *
 * @example
 * <Text fontSize={20} fontWeight="bold" color={AppColors.primary} maxLines={2} overflow="ellipsis">
 *   Hello world
 * </Text>
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = "bodyMedium",
      as,
      fontSize,
      fontWeight,
      color,
      letterSpacing,
      lineHeight,
      decoration,
      overflow,
      softWrap,
      maxLines,
      textAlign,
      fontStyle,
      opacity,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const Tag = (as ?? variantTag[variant] ?? "p") as React.ElementType;

    const inlineStyle: React.CSSProperties = {
      fontSize:
        fontSize !== undefined
          ? typeof fontSize === "number"
            ? `${fontSize}px`
            : fontSize
          : undefined,
      fontWeight: resolveFontWeight(fontWeight),
      color,
      letterSpacing:
        letterSpacing !== undefined
          ? typeof letterSpacing === "number"
            ? `${letterSpacing}px`
            : letterSpacing
          : undefined,
      lineHeight:
        lineHeight !== undefined
          ? typeof lineHeight === "number"
            ? lineHeight
            : lineHeight
          : undefined,
      textDecoration: decoration,
      textAlign,
      fontStyle,
      opacity,
      ...overflowStyle(overflow, softWrap, maxLines),
      ...style,
    };

    return (
      <Tag
        // @ts-expect-error — dynamic tag ref
        ref={ref}
        className={cn("text-foreground", variantClasses[variant], className)}
        style={inlineStyle}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";
