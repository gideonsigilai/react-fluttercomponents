import * as React from "react";
import { cn } from "../utils";
import { elevationToShadow } from "./flutter-style";

export type CardVariant = "elevated" | "filled" | "outlined";

export interface M3CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  elevation?: number;
  hoverElevation?: number;
  onTap?: () => void;
  disabled?: boolean;
  borderRadius?: number;
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  width?: number | string;
  height?: number | string;
  key?: React.Key;
}

function resolvePadding(p?: M3CardProps["padding"]): React.CSSProperties {
  if (!p) return {};
  if (typeof p === "number") return { padding: p };
  return { paddingTop: p.top, paddingRight: p.right, paddingBottom: p.bottom, paddingLeft: p.left };
}

/**
 * Material 3 Card with three variants: elevated, filled, outlined.
 * Equivalent to Flutter's Card(), Card.filled(), Card.outlined() in M3.
 */
export const M3Card = React.forwardRef<HTMLDivElement, M3CardProps>(
  (
    {
      variant = "elevated",
      elevation = 1,
      hoverElevation = 3,
      onTap,
      disabled = false,
      borderRadius = 12,
      padding,
      width,
      height,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isInteractive = !!onTap && !disabled;

    const variantClasses = {
      elevated: "bg-card text-card-foreground",
      filled:   "bg-secondary/60 text-secondary-foreground",
      outlined: "bg-background text-foreground border border-border",
    }[variant];

    const currentElevation = variant === "elevated"
      ? (isHovered && isInteractive ? hoverElevation : elevation)
      : 0;

    return (
      <div
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={isInteractive ? onTap : undefined}
        onKeyDown={isInteractive ? (e) => { if (e.key === "Enter" || e.key === " ") onTap!(); } : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "overflow-hidden",
          variantClasses,
          isInteractive && "cursor-pointer hover:opacity-95 active:scale-[0.99]",
          disabled && "opacity-40 cursor-not-allowed",
          className,
        )}
        style={{
          borderRadius,
          boxShadow: elevationToShadow(currentElevation),
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          transition: "box-shadow 0.2s ease, transform 0.1s",
          ...resolvePadding(padding),
          ...style,
        }}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  },
);
M3Card.displayName = "M3Card";

export const ElevatedCard = React.forwardRef<HTMLDivElement, Omit<M3CardProps, "variant">>(
  (props, ref) => <M3Card ref={ref} variant="elevated" {...props} />,
);
ElevatedCard.displayName = "ElevatedCard";

export const FilledCard = React.forwardRef<HTMLDivElement, Omit<M3CardProps, "variant">>(
  (props, ref) => <M3Card ref={ref} variant="filled" {...props} />,
);
FilledCard.displayName = "FilledCard";

export const OutlinedCard = React.forwardRef<HTMLDivElement, Omit<M3CardProps, "variant">>(
  (props, ref) => <M3Card ref={ref} variant="outlined" {...props} />,
);
OutlinedCard.displayName = "OutlinedCard";

export const CardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { height?: number | string }
>(({ height = 180, children, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full overflow-hidden", className)}
    style={{ height: typeof height === "number" ? `${height}px` : height, ...style }}
    {...props}
  >
    {children}
  </div>
));
CardMedia.displayName = "CardMedia";

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-4", className)} {...props} />,
);
CardBody.displayName = "CardBody";

export const CardActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 px-4 pb-4 pt-0", className)} {...props} />
  ),
);
CardActions.displayName = "CardActions";
