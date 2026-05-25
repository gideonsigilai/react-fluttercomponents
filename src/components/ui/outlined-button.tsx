import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color, EdgeInsetsInput, BorderRadiusInput, SizeInput } from "./flutter-style";
import { edgeInsetsToStyle, borderRadiusToStyle, sizeToCss } from "./flutter-style";

export interface OutlinedButtonProps {
  /** The button label widget. */
  child: React.ReactNode;
  /** Called when the button is pressed. Pass undefined to disable. */
  onPressed?: () => void;
  /** Border color. Defaults to the theme border color. */
  borderColor?: Color;
  /** Foreground (text/icon) color. */
  foregroundColor?: Color;
  /** Background color (normally transparent). */
  backgroundColor?: Color;
  /** Border width. Default 1. */
  borderWidth?: number;
  /** Padding inside the button. */
  padding?: EdgeInsetsInput;
  /** Border radius. Default 8. */
  borderRadius?: BorderRadiusInput;
  /** Explicit width. */
  width?: SizeInput;
  /** Explicit height. */
  height?: SizeInput;
  /** Whether the button fills its parent width. */
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/**
 * A material design outlined button.
 * Equivalent to Flutter's OutlinedButton() widget.
 */
export const OutlinedButton = ({
  child,
  onPressed,
  borderColor,
  foregroundColor,
  backgroundColor,
  borderWidth = 1,
  padding,
  borderRadius = 8,
  width,
  height,
  fullWidth = false,
  className,
  style,
}: OutlinedButtonProps) => {
  const disabled = !onPressed;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPressed}
      className={cn(
        "inline-flex items-center justify-center text-sm font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:scale-[0.98]",
        !backgroundColor && "bg-transparent",
        !foregroundColor && "text-foreground",
        !borderColor && "border-border hover:border-primary/60 hover:bg-accent/50",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      style={{
        border: `${borderWidth}px solid ${borderColor ?? "var(--border)"}`,
        color: foregroundColor,
        backgroundColor,
        width: sizeToCss(width),
        height: sizeToCss(height),
        ...borderRadiusToStyle(borderRadius),
        ...edgeInsetsToStyle(padding ?? { top: 10, bottom: 10, left: 24, right: 24 }, "padding"),
        ...style,
      }}
    >
      {child}
    </button>
  );
};

OutlinedButton.displayName = "OutlinedButton";
