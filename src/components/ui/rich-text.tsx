import * as React from "react";
import { cn } from "../utils";

// ─── TextSpan ─────────────────────────────────────────────────────────────────

export interface TextStyle {
  color?: string;
  fontSize?: number | string;
  fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" |
    "thin" | "extraLight" | "light" | "normal" | "medium" | "semiBold" | "bold" | "extraBold" | "black";
  fontStyle?: "normal" | "italic";
  letterSpacing?: number | string;
  wordSpacing?: number | string;
  decoration?: "none" | "underline" | "overline" | "line-through";
  decorationColor?: string;
  decorationStyle?: "solid" | "dashed" | "dotted" | "double";
  backgroundColor?: string;
  fontFamily?: string;
  height?: number; // lineHeight multiplier
  shadows?: { color: string; offsetX?: number; offsetY?: number; blurRadius?: number }[];
}

export interface TextSpanProps {
  /** The text content of this span. */
  text?: string;
  /** Nested child spans for inline mixed styles. */
  children?: TextSpanProps | TextSpanProps[];
  /** Text style applied to this span and its children. */
  style?: TextStyle;
  /** Called when this span is tapped. Makes it a recognizer span. */
  onTap?: () => void;
  /** Semantic label for accessibility. */
  semanticsLabel?: string;
  /** Whether to spell-check this span. */
  spellOut?: boolean;
}

const fontWeightMap: Record<string, string> = {
  thin: "100", extraLight: "200", light: "300", normal: "400",
  medium: "500", semiBold: "600", bold: "700", extraBold: "800", black: "900",
};

function textStyleToCSS(style?: TextStyle): React.CSSProperties {
  if (!style) return {};
  const fw = style.fontWeight
    ? fontWeightMap[style.fontWeight] ?? style.fontWeight
    : undefined;

  const shadows = style.shadows?.map(
    (s) => `${s.offsetX ?? 0}px ${s.offsetY ?? 0}px ${s.blurRadius ?? 0}px ${s.color}`
  ).join(", ");

  return {
    color: style.color,
    fontSize: typeof style.fontSize === "number" ? `${style.fontSize}px` : style.fontSize,
    fontWeight: fw,
    fontStyle: style.fontStyle,
    letterSpacing: typeof style.letterSpacing === "number" ? `${style.letterSpacing}px` : style.letterSpacing,
    wordSpacing: typeof style.wordSpacing === "number" ? `${style.wordSpacing}px` : style.wordSpacing,
    textDecoration: style.decoration === "none" ? "none" : style.decoration,
    textDecorationColor: style.decorationColor,
    textDecorationStyle: style.decorationStyle,
    backgroundColor: style.backgroundColor,
    fontFamily: style.fontFamily,
    lineHeight: style.height,
    textShadow: shadows,
  };
}

/** Recursively render a TextSpan tree into React <span> elements. */
function renderSpan(span: TextSpanProps, key?: string | number): React.ReactNode {
  const css = textStyleToCSS(span.style);
  const isInteractive = !!span.onTap;
  const childrenArray = span.children
    ? (Array.isArray(span.children) ? span.children : [span.children])
    : [];

  return (
    <span
      key={key}
      style={css}
      title={span.semanticsLabel}
      onClick={span.onTap}
      className={cn(
        isInteractive && "cursor-pointer hover:opacity-80 transition-opacity",
      )}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => { if (e.key === "Enter" || e.key === " ") span.onTap!(); } : undefined}
    >
      {span.text}
      {childrenArray.map((child, i) => renderSpan(child, i))}
    </span>
  );
}

// ─── RichText ─────────────────────────────────────────────────────────────────

export interface RichTextProps {
  /** The root TextSpan, which may contain nested children. */
  text: TextSpanProps;
  /** Text alignment. */
  textAlign?: "left" | "center" | "right" | "justify";
  /** Max lines before overflow. */
  maxLines?: number;
  /** How overflow is handled. */
  overflow?: "ellipsis" | "clip" | "visible";
  /** Text direction. */
  textDirection?: "ltr" | "rtl";
  /** Soft-wrap toggle. */
  softWrap?: boolean;
  /** Scale factor for text. */
  textScaleFactor?: number;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/**
 * A paragraph of rich text.
 * Equivalent to Flutter's RichText() widget + TextSpan() API.
 *
 * Usage:
 * ```tsx
 * <RichText
 *   text={{
 *     text: "Hello ",
 *     style: { fontSize: 16 },
 *     children: [
 *       { text: "World", style: { color: "#8b5cf6", fontWeight: "bold" } },
 *       { text: "! Click me", style: { color: "#3b82f6", decoration: "underline" }, onTap: () => {} },
 *     ]
 *   }}
 * />
 * ```
 */
export const RichText = React.forwardRef<HTMLParagraphElement, RichTextProps>(
  (
    {
      text,
      textAlign,
      maxLines,
      overflow = "visible",
      textDirection = "ltr",
      softWrap = true,
      textScaleFactor = 1,
      className,
      style,
    },
    ref,
  ) => {
    const overflowStyle: React.CSSProperties =
      maxLines
        ? {
            overflow: "hidden",
            textOverflow: overflow === "ellipsis" ? "ellipsis" : "clip",
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical" as const,
          }
        : overflow === "clip"
          ? { overflow: "hidden" }
          : {};

    return (
      <p
        ref={ref}
        dir={textDirection}
        className={cn("m-0", className)}
        style={{
          textAlign,
          fontSize: textScaleFactor !== 1 ? `${textScaleFactor}em` : undefined,
          whiteSpace: softWrap ? "normal" : "nowrap",
          ...overflowStyle,
          ...style,
        }}
      >
        {renderSpan(text)}
      </p>
    );
  },
);

RichText.displayName = "RichText";

// ─── Re-export TextSpan as a builder helper ───────────────────────────────────

/** Helper to construct a TextSpan descriptor object (mirrors Dart syntax). */
export function TextSpan(props: TextSpanProps): TextSpanProps {
  return props;
}
