import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color } from "./flutter-style";

export interface SliderProps {
  /** Current value of the slider. */
  value: number;
  /** Called continuously as the user drags. */
  onChanged?: (value: number) => void;
  /** Called when the user starts dragging. */
  onChangeStart?: (value: number) => void;
  /** Called when the user stops dragging. */
  onChangeEnd?: (value: number) => void;
  /** Minimum value. Default 0. */
  min?: number;
  /** Maximum value. Default 1. */
  max?: number;
  /** Number of discrete divisions. If set, snaps to divisions. */
  divisions?: number;
  /** Label shown above the thumb when dragging (requires divisions). */
  label?: string;
  /** Color of the active track (left of thumb). */
  activeColor?: Color;
  /** Color of the inactive track (right of thumb). */
  inactiveColor?: Color;
  /** Color of the thumb. */
  thumbColor?: Color;
  /** Whether the slider is interactive. */
  enabled?: boolean;
  className?: string;
  key?: React.Key;
}

/**
 * A material design slider.
 * Equivalent to Flutter's Slider() widget.
 */
export const Slider = ({
  value,
  onChanged,
  onChangeStart,
  onChangeEnd,
  min = 0,
  max = 1,
  divisions,
  activeColor,
  inactiveColor,
  thumbColor,
  enabled = true,
  className,
}: SliderProps) => {
  const step = divisions ? (max - min) / divisions : undefined;
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex items-center w-full h-6", className)}>
      {/* Track background */}
      <div
        className="absolute inset-x-0 h-1 rounded-full"
        style={{ backgroundColor: inactiveColor ?? "var(--input)" }}
      />
      {/* Active track */}
      <div
        className="absolute left-0 h-1 rounded-full"
        style={{
          width: `${percent}%`,
          backgroundColor: activeColor ?? "var(--primary)",
        }}
      />
      {/* Native range input (invisible but handles interaction) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={!enabled}
        onChange={(e) => onChanged?.(parseFloat(e.target.value))}
        onMouseDown={(e) => onChangeStart?.(parseFloat((e.target as HTMLInputElement).value))}
        onMouseUp={(e) => onChangeEnd?.(parseFloat((e.target as HTMLInputElement).value))}
        onTouchStart={(e) => onChangeStart?.(parseFloat((e.target as HTMLInputElement).value))}
        onTouchEnd={(e) => onChangeEnd?.(parseFloat((e.target as HTMLInputElement).value))}
        className={cn(
          "absolute inset-0 w-full opacity-0 cursor-pointer h-full",
          !enabled && "cursor-not-allowed opacity-50"
        )}
        style={{ margin: 0 }}
      />
      {/* Thumb */}
      <div
        className="absolute h-5 w-5 rounded-full shadow-md border-2 border-background pointer-events-none transition-transform"
        style={{
          left: `calc(${percent}% - 10px)`,
          backgroundColor: thumbColor ?? activeColor ?? "var(--primary)",
        }}
      />
    </div>
  );
};

Slider.displayName = "Slider";
