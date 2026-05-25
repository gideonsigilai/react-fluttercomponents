import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color, EdgeInsetsInput, BorderRadiusInput, SizeInput } from "./flutter-style";
import { edgeInsetsToStyle, borderRadiusToStyle, sizeToCss, elevationToShadow } from "./flutter-style";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevation (shadow depth). Default 1. */
  elevation?: number;
  /** Background color of the card surface. */
  color?: Color;
  /** Padding inside the card. */
  padding?: EdgeInsetsInput;
  /** Margin outside the card. */
  margin?: EdgeInsetsInput;
  /** Border radius. Default 12. */
  borderRadius?: BorderRadiusInput;
  /** Explicit width. */
  width?: SizeInput;
  /** Explicit height. */
  height?: SizeInput;
  /** Called when the card is tapped (makes it pressable). */
  onTap?: () => void;
  key?: React.Key;
}

/**
 * A material design card.
 * Equivalent to Flutter's Card() widget.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      elevation = 1,
      color,
      padding,
      margin,
      borderRadius = 12,
      width,
      height,
      onTap,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") onTap?.(); },
      [onTap]
    );

    return (
      <div
        ref={ref}
        role={onTap ? "button" : undefined}
        tabIndex={onTap ? 0 : undefined}
        onClick={onTap}
        onKeyDown={onTap ? handleKeyDown : undefined}
        className={cn(
          "bg-card text-card-foreground",
          onTap && "cursor-pointer transition-opacity hover:opacity-90 active:opacity-70",
          className
        )}
        style={{
          boxShadow: elevationToShadow(elevation),
          backgroundColor: color,
          width: sizeToCss(width),
          height: sizeToCss(height),
          ...borderRadiusToStyle(borderRadius),
          ...edgeInsetsToStyle(padding, "padding"),
          ...edgeInsetsToStyle(margin, "margin"),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";
