import * as React from "react";
import { cn } from "../utils";
import { Input } from "./input";
import { Label } from "./label";
import type { Color, EdgeInsetsInput, InputBorderInput } from "./flutter-style";
import { edgeInsetsToStyle, inputBorderToStyle } from "./flutter-style";

export type TextInputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "search"
  | "multiline";

// ─── Text style types (mirrors text.tsx) ─────────────────────────────────────
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

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /** Label text shown above the field. */
  label?: string;
  /** Placeholder text inside the field. Equivalent to Flutter's hintText. */
  hintText?: string;
  /** Error message shown below the field. */
  errorText?: string;
  /** Helper message shown below the field (when no error). */
  helperText?: string;
  /** Widget shown inside the field at the start. */
  prefixIcon?: React.ReactNode;
  /** Widget shown inside the field at the end. */
  suffixIcon?: React.ReactNode;
  /** Text shown at the start of the field (e.g. "$"). */
  prefixText?: string;
  /** Text shown at the end of the field (e.g. ".com"). */
  suffixText?: string;
  /** Whether the field text is obscured (password). */
  obscureText?: boolean;
  /** Controls keyboard/input type. */
  keyboardType?: TextInputType;
  /** Max number of characters. */
  maxLength?: number;
  /** Max number of lines for multiline. */
  maxLines?: number;
  /** Min number of lines for multiline. */
  minLines?: number;
  /** Whether the field is read-only. */
  readOnly?: boolean;
  /** Whether the field is enabled. */
  enabled?: boolean;
  /** Whether to auto-focus. */
  autofocus?: boolean;
  /** Whether to fill the background. */
  filled?: boolean;
  /** Fill color when filled is true. */
  fillColor?: Color;
  /** Border radius of the field. */
  borderRadius?: number;
  /** Padding inside the field. */
  contentPadding?: EdgeInsetsInput;
  /** Called on value change. Equivalent to Flutter's onChanged. */
  onChanged?: (value: string) => void;
  /** Called when editing is complete (Enter pressed). */
  onEditingComplete?: () => void;
  /** Called when the field is submitted. */
  onFieldSubmitted?: (value: string) => void;
  // ─── Border decoration (mirrors Flutter InputDecoration) ───
  /** Default border for all states (fallback). Use InputBorder.none/outline/underline. */
  border?: InputBorderInput;
  /** Border when enabled and not focused. */
  enabledBorder?: InputBorderInput;
  /** Border when focused. */
  focusedBorder?: InputBorderInput;
  /** Border when disabled. */
  disabledBorder?: InputBorderInput;
  /** Border when errorText is set. */
  errorBorder?: InputBorderInput;
  /** Border when errorText is set and focused. */
  focusedErrorBorder?: InputBorderInput;
  // ─── Text style (mirrors Text component) ──────────────────
  /** Font size in px or CSS unit. */
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
  /** Whether text wraps. false = single line. */
  softWrap?: boolean;
  /** Text alignment. */
  textAlign?: TextAlign;
  /** Font style. */
  fontStyle?: FontStyle;
  /** Opacity (0.0–1.0). */
  opacity?: number;
  className?: string;
  key?: React.Key;
}

/**
 * A text field for capturing user input.
 * Equivalent to Flutter's TextField() widget.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      hintText,
      errorText,
      helperText,
      prefixIcon,
      suffixIcon,
      prefixText,
      suffixText,
      obscureText,
      keyboardType = "text",
      maxLength,
      maxLines,
      minLines,
      readOnly,
      enabled = true,
      autofocus,
      filled = false,
      fillColor,
      borderRadius = 8,
      contentPadding,
      onChanged,
      onEditingComplete,
      onFieldSubmitted,
      border,
      enabledBorder,
      focusedBorder,
      disabledBorder,
      errorBorder,
      focusedErrorBorder,
      fontSize,
      fontWeight,
      color,
      letterSpacing,
      lineHeight,
      decoration,
      overflow,
      softWrap,
      textAlign,
      fontStyle,
      opacity,
      className,
      id,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const isMultiline =
      keyboardType === "multiline" || (maxLines !== undefined && maxLines > 1);

    // ─── Border state (mirrors Flutter focus-aware decoration) ─
    const [isFocused, setIsFocused] = React.useState(false);
    const hasBorderOverride = !!(
      border ??
      enabledBorder ??
      focusedBorder ??
      disabledBorder ??
      errorBorder ??
      focusedErrorBorder
    );
    const activeBorder = React.useMemo<InputBorderInput | undefined>(() => {
      if (!hasBorderOverride) return undefined;
      if (!enabled) return disabledBorder ?? border;
      if (errorText)
        return isFocused
          ? (focusedErrorBorder ?? errorBorder ?? border)
          : (errorBorder ?? border);
      return isFocused ? (focusedBorder ?? border) : (enabledBorder ?? border);
    }, [
      isFocused,
      enabled,
      errorText,
      border,
      enabledBorder,
      focusedBorder,
      disabledBorder,
      errorBorder,
      focusedErrorBorder,
      hasBorderOverride,
    ]);
    const borderStyle = hasBorderOverride
      ? inputBorderToStyle(activeBorder)
      : {};

    const inputType = obscureText
      ? "password"
      : keyboardType === "email"
        ? "email"
        : keyboardType === "number"
          ? "number"
          : keyboardType === "tel"
            ? "tel"
            : keyboardType === "url"
              ? "url"
              : keyboardType === "search"
                ? "search"
                : "text";

    const textStyle: React.CSSProperties = {
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
      lineHeight: lineHeight !== undefined ? lineHeight : undefined,
      textDecoration: decoration,
      textAlign,
      fontStyle,
      opacity,
    };

    const sharedStyle: React.CSSProperties = {
      borderRadius: `${borderRadius}px`,
      backgroundColor: filled ? fillColor : undefined,
      ...edgeInsetsToStyle(contentPadding, "padding"),
      ...style,
    };

    return (
      <div className={cn("grid w-full items-center gap-1.5", className)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className="relative">
          {prefixText && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              {prefixText}
            </span>
          )}
          {prefixIcon && !prefixText && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {prefixIcon}
            </div>
          )}

          {isMultiline ? (
            <textarea
              id={inputId}
              ref={ref as any}
              placeholder={hintText}
              readOnly={readOnly}
              disabled={!enabled}
              autoFocus={autofocus}
              maxLength={maxLength}
              rows={minLines ?? 3}
              {...(props as any)}
              onChange={(e) => {
                onChanged?.(e.target.value);
                (
                  props as any
                ).onChange?.(e as any);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) onEditingComplete?.();
              }}
              className={cn(
                "flex w-full rounded-md bg-background px-3 py-2 text-sm",
                "ring-offset-background placeholder:text-muted-foreground",
                !hasBorderOverride &&
                  "border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                hasBorderOverride && "outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                prefixIcon && "pl-10",
                suffixIcon && "pr-10",
                errorText &&
                  !hasBorderOverride &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              style={{
                ...sharedStyle,
                ...borderStyle,
                ...textStyle,
                resize: "vertical",
              }}
            />
          ) : (
            <Input
              id={inputId}
              ref={ref}
              placeholder={hintText}
              type={inputType}
              readOnly={readOnly}
              disabled={!enabled}
              autoFocus={autofocus}
              maxLength={maxLength}
              onChange={(e) => onChanged?.(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEditingComplete?.();
                  onFieldSubmitted?.((e.target as HTMLInputElement).value);
                }
              }}
              className={cn(
                !hasBorderOverride &&
                  "border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                hasBorderOverride && "outline-none border-none",
                prefixIcon || prefixText ? "pl-10" : undefined,
                suffixIcon || suffixText ? "pr-10" : undefined,
                errorText &&
                  !hasBorderOverride &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              style={{ ...sharedStyle, ...borderStyle, ...textStyle }}
              {...props}
            />
          )}

          {suffixText && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              {suffixText}
            </span>
          )}
          {suffixIcon && !suffixText && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {suffixIcon}
            </div>
          )}
        </div>
        {errorText && (
          <p className="text-xs font-medium text-destructive">{errorText}</p>
        )}
        {!errorText && helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {maxLength !== undefined && (
          <p className="text-xs text-muted-foreground text-right">
            {String(props.value ?? "").length}/{maxLength}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
