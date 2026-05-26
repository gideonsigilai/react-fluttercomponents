import React from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ButtonSegment<T> {
  value: T;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  enabled?: boolean;
}

interface SegmentedButtonProps<T> {
  segments: ButtonSegment<T>[];
  selected: Set<T>;
  onSelectionChanged: (selected: Set<T>) => void;
  multiSelectionEnabled?: boolean;
  emptySelectionAllowed?: boolean;
  showSelectedIcon?: boolean;
  style?: "filled" | "outlined";
  className?: string;
}

// ─── SegmentedButton ──────────────────────────────────────────────────────────
export function SegmentedButton<T>({
  segments,
  selected,
  onSelectionChanged,
  multiSelectionEnabled = false,
  emptySelectionAllowed = false,
  showSelectedIcon = true,
  style = "outlined",
  className,
}: SegmentedButtonProps<T>) {
  const toggle = (value: T) => {
    const next = new Set(selected);
    if (next.has(value)) {
      if (!emptySelectionAllowed && next.size === 1) return;
      next.delete(value);
    } else {
      if (!multiSelectionEnabled) next.clear();
      next.add(value);
    }
    onSelectionChanged(next);
  };

  return (
    <div
      className={cn(
        "flex rounded-full overflow-hidden border border-border",
        style === "filled" ? "bg-muted" : "",
        className
      )}
    >
      {segments.map((seg, i) => {
        const isSelected = selected.has(seg.value);
        const isFirst = i === 0;
        const isLast = i === segments.length - 1;

        return (
          <button
            key={i}
            disabled={seg.enabled === false}
            onClick={() => toggle(seg.value)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all",
              !isFirst ? "border-l border-border" : "",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
              seg.enabled === false ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {showSelectedIcon && isSelected && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {seg.icon && <span>{seg.icon}</span>}
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
