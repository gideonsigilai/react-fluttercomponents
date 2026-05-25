import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color, EdgeInsetsInput, BorderRadiusInput, SizeInput } from "./flutter-style";
import { edgeInsetsToStyle, borderRadiusToStyle, sizeToCss, elevationToShadow } from "./flutter-style";

export interface ElevatedButtonProps {
  /** The button label widget. */
  child: React.ReactNode;
  /** Called when the button is pressed. Pass undefined to disable. */
  onPressed?: () => void;
  /** Background color of the button. */
  backgroundColor?: Color;
  /** Foreground (text/icon) color. */
  foregroundColor?: Color;
  /** Elevation (shadow depth). Default 2. */
  elevation?: number;
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
 * A material design elevated button.
 * Equivalent to Flutter's ElevatedButton() widget.
 */
export const ElevatedButton = React.memo(({
  child,
  onPressed,
  backgroundColor,
  foregroundColor,
  elevation = 2,
  padding,
  borderRadius = 8,
  width,
  height,
  fullWidth = false,
  className,
  style,
}: ElevatedButtonProps) => {
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
        !backgroundColor && "bg-primary text-primary-foreground hover:bg-primary/90",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      style={{
        boxShadow: disabled ? "none" : elevationToShadow(elevation),
        backgroundColor,
        color: foregroundColor,
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
});

ElevatedButton.displayName = "ElevatedButton";
