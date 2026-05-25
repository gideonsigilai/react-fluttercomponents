import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color } from "./flutter-style";

export interface SwitchProps {
  /** Whether the switch is on. */
  value: boolean;
  /** Called when the user toggles the switch. Pass undefined to disable. */
  onChanged?: (value: boolean) => void;
  /** Color of the track when the switch is on. */
  activeColor?: Color;
  /** Color of the thumb when the switch is on. */
  activeThumbColor?: Color;
  /** Color of the track when the switch is off. */
  inactiveTrackColor?: Color;
  /** Color of the thumb when the switch is off. */
  inactiveThumbColor?: Color;
  className?: string;
  key?: React.Key;
}

/**
 * A material design switch.
 * Equivalent to Flutter's Switch() widget.
 */
export const Switch = ({
  value,
  onChanged,
  activeColor,
  activeThumbColor,
  inactiveTrackColor,
  inactiveThumbColor,
  className,
}: SwitchProps) => {
  const disabled = !onChanged;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      disabled={disabled}
      onClick={() => onChanged?.(!value)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        !activeColor && value && "bg-primary",
        !inactiveTrackColor && !value && "bg-input",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
      style={{
        backgroundColor: value
          ? (activeColor ?? undefined)
          : (inactiveTrackColor ?? undefined),
      }}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full shadow-md ring-0 transition-transform duration-200",
          value ? "translate-x-5" : "translate-x-0.5",
          !activeThumbColor && !inactiveThumbColor && "bg-background"
        )}
        style={{
          backgroundColor: value
            ? (activeThumbColor ?? undefined)
            : (inactiveThumbColor ?? undefined),
        }}
      />
    </button>
  );
};

Switch.displayName = "Switch";
