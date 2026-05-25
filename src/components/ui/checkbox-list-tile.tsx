import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color, EdgeInsetsInput } from "./flutter-style";
import { edgeInsetsToStyle } from "./flutter-style";
import { Checkbox } from "./checkbox";

export interface CheckboxListTileProps {
  /** The primary text. */
  title: React.ReactNode;
  /** Secondary text shown below the title. */
  subtitle?: React.ReactNode;
  /** Whether the checkbox is checked. */
  value: boolean;
  /** Called when the user taps the tile or the checkbox. */
  onChanged: (value: boolean) => void;
  /** Whether the tile is interactive. */
  enabled?: boolean;
  /** Whether the checkbox is at the start (leading) or end (trailing) of the tile. */
  controlAffinity?: "leading" | "trailing";
  /** Tile background color. */
  tileColor?: Color;
  /** Tile background color when selected. */
  selectedTileColor?: Color;
  /** Whether the tile is visually selected. */
  selected?: boolean;
  /** Color of the checkbox when checked. */
  activeColor?: Color;
  /** Color of the checkmark. */
  checkColor?: Color;
  /** Tile content padding. */
  contentPadding?: EdgeInsetsInput;
  /** Whether to use dense layout. */
  dense?: boolean;
  /** An additional widget at the opposite side from the checkbox. */
  secondary?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

/**
 * A ListTile with a Checkbox. Tapping anywhere on the tile toggles the checkbox.
 * Equivalent to Flutter's CheckboxListTile() widget.
 */
export const CheckboxListTile = ({
  title,
  subtitle,
  value,
  onChanged,
  enabled = true,
  controlAffinity = "trailing",
  tileColor,
  selectedTileColor,
  selected = false,
  activeColor,
  checkColor,
  contentPadding,
  dense = false,
  secondary,
  className,
  style,
}: CheckboxListTileProps) => {
  const background = selected ? (selectedTileColor ?? tileColor) : tileColor;

  const checkbox = (
    <Checkbox
      value={value}
      onChanged={onChanged}
      enabled={enabled}
      activeColor={activeColor}
      checkColor={checkColor}
    />
  );

  return (
    <div
      role="checkbox"
      aria-checked={value}
      tabIndex={enabled ? 0 : undefined}
      onClick={() => enabled && onChanged(!value)}
      onKeyDown={(e) => {
        if (enabled && (e.key === "Enter" || e.key === " ")) onChanged(!value);
      }}
      className={cn(
        "flex items-center transition-colors",
        dense ? "px-3 py-2" : "px-4 py-3",
        enabled ? "cursor-pointer hover:bg-accent/50" : "opacity-50 cursor-not-allowed",
        selected && !selectedTileColor && !tileColor && "bg-accent",
        className
      )}
      style={{
        backgroundColor: background,
        ...edgeInsetsToStyle(contentPadding, "padding"),
        ...style,
      }}
    >
      {controlAffinity === "leading" && (
        <span className="flex-none mr-4" onClick={(e) => e.stopPropagation()}>
          {checkbox}
        </span>
      )}
      {secondary && controlAffinity === "trailing" && (
        <span className="flex-none mr-4">{secondary}</span>
      )}
      {secondary && controlAffinity === "leading" && (
        <span className="flex-none mr-4">{secondary}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className={cn("font-medium", dense ? "text-sm" : "text-base")}>
          {title}
        </div>
        {subtitle && (
          <div className={cn("text-muted-foreground mt-0.5", dense ? "text-xs" : "text-sm")}>
            {subtitle}
          </div>
        )}
      </div>
      {controlAffinity === "trailing" && (
        <span className="flex-none ml-4" onClick={(e) => e.stopPropagation()}>
          {checkbox}
        </span>
      )}
    </div>
  );
};

CheckboxListTile.displayName = "CheckboxListTile";
