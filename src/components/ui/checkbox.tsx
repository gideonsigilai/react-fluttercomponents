import * as React from "react";
import { cn } from "../utils";
import type { Color } from "./flutter-style";

export interface CheckboxProps {
  /** Whether the checkbox is checked. */
  value: boolean;
  /** Called when the user taps the checkbox. */
  onChanged: (value: boolean) => void;
  /** Whether the checkbox is interactive. */
  enabled?: boolean;
  /** Color of the checkbox when checked. */
  activeColor?: Color;
  /** Color of the checkmark. */
  checkColor?: Color;
  /** Whether the checkbox is in a tristate (null = indeterminate). */
  tristate?: boolean;
  className?: string;
  key?: React.Key;
}

/**
 * A material design checkbox.
 * Equivalent to Flutter's Checkbox() widget.
 */
export const Checkbox = ({
  value,
  onChanged,
  enabled = true,
  activeColor,
  checkColor,
  tristate = false,
  className,
}: CheckboxProps) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={tristate && value === null ? "mixed" : value}
      disabled={!enabled}
      onClick={() => enabled && onChanged(!value)}
      className={cn(
        "h-5 w-5 rounded flex-none flex items-center justify-center border-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        value
          ? "border-primary bg-primary"
          : "border-input bg-background hover:border-primary/60",
        !enabled && "opacity-50 cursor-not-allowed",
        enabled && "cursor-pointer",
        className,
      )}
      style={{
        backgroundColor: value ? activeColor : undefined,
        borderColor: value ? activeColor : undefined,
      }}
    >
      {value && (
        <svg
          viewBox="0 0 12 10"
          className="h-3 w-3"
          fill="none"
          stroke={checkColor ?? "white"}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 5l3.5 3.5L11 1" />
        </svg>
      )}
    </button>
  );
};

Checkbox.displayName = "Checkbox";
