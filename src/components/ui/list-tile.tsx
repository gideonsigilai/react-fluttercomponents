import * as React from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";
import {
  borderToStyle,
  borderRadiusToStyle,
  edgeInsetsToStyle,
  sizeToCss,
  type BorderValue,
  type BorderRadiusInput,
  type EdgeInsetsInput,
  type Color,
  type SizeInput,
} from "./flutter-style";

export interface ListTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onTap?: () => void;
  ltr?: boolean;
  border?: BorderValue;
  borderRadius?: BorderRadiusInput;
  tileColor?: Color;
  selected?: boolean;
  selectedTileColor?: Color;
  contentPadding?: EdgeInsetsInput;
  dense?: boolean;
  enabled?: boolean;
  width?: SizeInput;
  height?: SizeInput;
  minWidth?: SizeInput;
  maxWidth?: SizeInput;
  minHeight?: SizeInput;
  maxHeight?: SizeInput;
  key?: React.Key;
}

/**
 * A single fixed-height row that typically contains some text as well as a leading or trailing icon.
 * Equivalent to Flutter's ListTile() widget.
 */
export const ListTile = React.forwardRef<HTMLDivElement, ListTileProps>(
  (
    {
      leading,
      title,
      subtitle,
      trailing,
      onTap,
      ltr,
      border,
      borderRadius,
      tileColor,
      selected = false,
      selectedTileColor,
      contentPadding,
      dense = false,
      enabled = true,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const background = selected ? selectedTileColor ?? tileColor : tileColor;
    return (
      <div
        ref={ref}
        onClick={enabled ? onTap : undefined}
        aria-disabled={!enabled}
        data-selected={selected || undefined}
        className={cn(
          "flex items-center transition-colors",
          dense ? "px-3 py-2" : "px-4 py-3",
          enabled ? "cursor-pointer hover:bg-accent/50" : "cursor-not-allowed opacity-50",
          selected && !selectedTileColor && !tileColor && "bg-accent",
          ltr && "flex-row-reverse",
          className
        )}
        style={{
          ...borderToStyle(border),
          ...borderRadiusToStyle(borderRadius),
          ...edgeInsetsToStyle(contentPadding, "padding"),
          backgroundColor: background,
          width: sizeToCss(width),
          height: sizeToCss(height),
          minWidth: sizeToCss(minWidth),
          maxWidth: sizeToCss(maxWidth),
          minHeight: sizeToCss(minHeight),
          maxHeight: sizeToCss(maxHeight),
          ...style,
        }}
        {...props}
      >
        {leading && <div className={cn("flex-none", ltr ? "ml-4" : "mr-4")}>{leading}</div>}
        <div className={cn("flex-1 min-w-0", ltr && "text-right")}>
          <div className={cn("font-medium break-words", dense ? "text-xs sm:text-sm" : "text-sm sm:text-base")}>
            {typeof title === "string" ? <Text variant="p" className="m-0 p-0 leading-snug">{title}</Text> : title}
          </div>
          {subtitle && (
            <div className={cn("text-muted-foreground break-words mt-0.5", dense ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm")}>
              {typeof subtitle === "string" ? <Text variant="muted" className="m-0 p-0">{subtitle}</Text> : subtitle}
            </div>
          )}
        </div>
        {trailing && <div className={cn("flex-none", ltr ? "mr-4" : "ml-4")}>{trailing}</div>}
      </div>
    );
  }
);

ListTile.displayName = "ListTile";
