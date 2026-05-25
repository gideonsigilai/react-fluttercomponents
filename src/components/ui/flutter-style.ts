import type * as React from "react";

/**
 * Flutter-style style helpers.
 * Lets you describe styling in TS like Flutter (Border, BorderRadius, EdgeInsets, Colors)
 * and converts them into plain CSS properties internally.
 */

// ─── Color ─────────────────────────────────────────────────
export type Color = string;

// ─── Size ──────────────────────────────────────────────────
export type SizeInput = number | string;

export const sizeToCss = (v?: SizeInput): string | undefined =>
  v === undefined ? undefined : typeof v === "number" ? `${v}px` : v;

export interface SizeProps {
  width?: SizeInput;
  height?: SizeInput;
  minWidth?: SizeInput;
  maxWidth?: SizeInput;
  minHeight?: SizeInput;
  maxHeight?: SizeInput;
}

export const sizePropsToStyle = (s: SizeProps): React.CSSProperties => ({
  width: sizeToCss(s.width),
  height: sizeToCss(s.height),
  minWidth: sizeToCss(s.minWidth),
  maxWidth: sizeToCss(s.maxWidth),
  minHeight: sizeToCss(s.minHeight),
  maxHeight: sizeToCss(s.maxHeight),
});

// ─── BorderSide / Border ───────────────────────────────────
export interface BorderSide {
  color?: Color;
  width?: number;
  style?: "solid" | "dashed" | "dotted" | "none";
}

export interface BorderInput {
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
  left?: BorderSide;
}

/** Null represents Border.none — explicitly removes all borders. */
export type BorderValue = BorderInput | null;

export const Border = {
  /** All four sides share the same BorderSide. */
  all: (side: BorderSide = {}): BorderValue => ({
    top: side, right: side, bottom: side, left: side,
  }),
  /** Vertical (top/bottom) and horizontal (left/right) sides. */
  symmetric: (opts: { vertical?: BorderSide; horizontal?: BorderSide } = {}): BorderValue => ({
    top: opts.vertical, bottom: opts.vertical,
    left: opts.horizontal, right: opts.horizontal,
  }),
  /** Specify each side individually. */
  only: (opts: BorderInput): BorderValue => opts,
  /** Removes all borders — equivalent to Border.none in Flutter. */
  none: null as null,
};

const sideToCss = (s?: BorderSide): string | undefined => {
  if (!s) return undefined;
  const width = s.width ?? 1;
  const style = s.style ?? "solid";
  const color = s.color ?? "currentColor";
  return `${width}px ${style} ${color}`;
};

export const borderToStyle = (b?: BorderValue): React.CSSProperties => {
  if (b === null) return { border: "none" };  // Border.none
  if (!b) return {};
  return {
    borderTop: sideToCss(b.top),
    borderRight: sideToCss(b.right),
    borderBottom: sideToCss(b.bottom),
    borderLeft: sideToCss(b.left),
  };
};

// ─── InputBorder (TextField decoration) ───────────────────
/** Options shared by OutlineInputBorder and UnderlineInputBorder. */
export interface InputBorderOptions {
  /** The color/width/style of the border line. */
  borderSide?: BorderSide;
  /** Corner radius — only meaningful for outline borders. */
  borderRadius?: BorderRadiusInput;
}

/**
 * Discriminated union mirroring Flutter's InputBorder hierarchy:
 * - `{ type: 'none' }`  → InputBorder.none
 * - `{ type: 'outline' }` → OutlineInputBorder
 * - `{ type: 'underline' }` → UnderlineInputBorder
 */
export type InputBorderInput =
  | { type: "none" }
  | { type: "outline"; options?: InputBorderOptions }
  | { type: "underline"; options?: InputBorderOptions };

export const InputBorder = {
  /** No visible border at all. */
  none: { type: "none" } as InputBorderInput,
  /** Rounded rectangle around the entire field (OutlineInputBorder). */
  outline: (options?: InputBorderOptions): InputBorderInput => ({ type: "outline", options }),
  /** Single line under the field (UnderlineInputBorder). */
  underline: (options?: InputBorderOptions): InputBorderInput => ({ type: "underline", options }),
};

/** Converts an InputBorderInput into CSS properties for a form element. */
export const inputBorderToStyle = (border?: InputBorderInput): React.CSSProperties => {
  if (!border || border.type === "none") {
    return { border: "none", outline: "none", boxShadow: "none" };
  }
  const side = (border as { options?: InputBorderOptions }).options?.borderSide;
  const cssWidth = side?.width ?? 1;
  const cssStyle = side?.style ?? "solid";
  const cssColor = side?.color ?? "hsl(var(--input))";
  const radiusStyle = borderRadiusToStyle(
    (border as { options?: InputBorderOptions }).options?.borderRadius
  );
  if (border.type === "outline") {
    return {
      border: `${cssWidth}px ${cssStyle} ${cssColor}`,
      ...radiusStyle,
    };
  }
  // underline
  return {
    border: "none",
    borderRadius: 0,
    borderBottom: `${cssWidth}px ${cssStyle} ${cssColor}`,
    ...radiusStyle,
  };
};

// ─── BorderRadius ──────────────────────────────────────────
export type BorderRadiusInput =
  | number
  | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number };

export const BorderRadius = {
  all: (r: number): BorderRadiusInput => r,
  circular: (r: number): BorderRadiusInput => r,
  only: (opts: {
    topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number;
  }): BorderRadiusInput => opts,
  vertical: (opts: { top?: number; bottom?: number }): BorderRadiusInput => ({
    topLeft: opts.top, topRight: opts.top,
    bottomLeft: opts.bottom, bottomRight: opts.bottom,
  }),
  horizontal: (opts: { left?: number; right?: number }): BorderRadiusInput => ({
    topLeft: opts.left, bottomLeft: opts.left,
    topRight: opts.right, bottomRight: opts.right,
  }),
};

export const borderRadiusToStyle = (r?: BorderRadiusInput): React.CSSProperties => {
  if (r === undefined) return {};
  if (typeof r === "number") return { borderRadius: `${r}px` };
  return {
    borderTopLeftRadius: r.topLeft !== undefined ? `${r.topLeft}px` : undefined,
    borderTopRightRadius: r.topRight !== undefined ? `${r.topRight}px` : undefined,
    borderBottomLeftRadius: r.bottomLeft !== undefined ? `${r.bottomLeft}px` : undefined,
    borderBottomRightRadius: r.bottomRight !== undefined ? `${r.bottomRight}px` : undefined,
  };
};

// ─── EdgeInsets ────────────────────────────────────────────
export type EdgeInsetsInput =
  | number
  | { top?: number; right?: number; bottom?: number; left?: number };

export const EdgeInsets = {
  all: (n: number): EdgeInsetsInput => n,
  symmetric: (opts: { vertical?: number; horizontal?: number }): EdgeInsetsInput => ({
    top: opts.vertical, bottom: opts.vertical,
    left: opts.horizontal, right: opts.horizontal,
  }),
  only: (opts: { top?: number; right?: number; bottom?: number; left?: number }): EdgeInsetsInput => opts,
  fromLTRB: (left: number, top: number, right: number, bottom: number): EdgeInsetsInput => ({
    left, top, right, bottom,
  }),
};

export const edgeInsetsToStyle = (
  e?: EdgeInsetsInput,
  prop: "padding" | "margin" = "padding"
): React.CSSProperties => {
  if (e === undefined) return {};
  if (typeof e === "number") return { [prop]: `${e}px` };
  return {
    [`${prop}Top`]: e.top !== undefined ? `${e.top}px` : undefined,
    [`${prop}Right`]: e.right !== undefined ? `${e.right}px` : undefined,
    [`${prop}Bottom`]: e.bottom !== undefined ? `${e.bottom}px` : undefined,
    [`${prop}Left`]: e.left !== undefined ? `${e.left}px` : undefined,
  };
};

// ─── Colors (Material palette) ─────────────────────────────
export const Colors = {
  transparent: "transparent",
  black: "#000000",
  white: "#FFFFFF",
  red: "#F44336",
  pink: "#E91E63",
  purple: "#9C27B0",
  deepPurple: "#673AB7",
  indigo: "#3F51B5",
  blue: "#2196F3",
  lightBlue: "#03A9F4",
  cyan: "#00BCD4",
  teal: "#009688",
  green: "#4CAF50",
  lightGreen: "#8BC34A",
  lime: "#CDDC39",
  yellow: "#FFEB3B",
  amber: "#FFC107",
  orange: "#FF9800",
  deepOrange: "#FF5722",
  brown: "#795548",
  grey: "#9E9E9E",
  blueGrey: "#607D8B",
} as const;

// ─── Elevation Shadows ─────────────────────────────────────
/** Material-style box shadows keyed by elevation dp. */
export const elevationToShadow = (elevation: number): string => {
  const map: Record<number, string> = {
    0: "none",
    1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
    2: "0 2px 6px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.10)",
    4: "0 4px 12px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.10)",
    8: "0 8px 20px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12)",
    16: "0 16px 32px rgba(0,0,0,0.20), 0 8px 12px rgba(0,0,0,0.14)",
    24: "0 24px 48px rgba(0,0,0,0.24), 0 12px 16px rgba(0,0,0,0.16)",
  };
  return map[elevation] ?? `0 ${elevation}px ${elevation * 3}px rgba(0,0,0,0.14)`;
};
