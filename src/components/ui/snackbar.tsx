import React, { useEffect, useRef, useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export type SnackBarBehavior = "fixed" | "floating";

interface SnackBarProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
  duration?: number; // ms, 0 = no auto-dismiss
  action?: { label: string; onPressed: () => void };
  behavior?: SnackBarBehavior;
  backgroundColor?: string;
  className?: string;
}

// ─── SnackBar ─────────────────────────────────────────────────────────────────
export function SnackBar({
  message,
  isVisible,
  onDismiss,
  duration = 3000,
  action,
  behavior = "floating",
  backgroundColor,
  className,
}: SnackBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isVisible && duration > 0) {
      timerRef.current = setTimeout(onDismiss, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [isVisible, duration, onDismiss]);

  return (
    <div
      className={cn(
        "fixed z-[60] transition-all duration-300 pointer-events-none",
        behavior === "floating"
          ? "bottom-6 left-1/2 -translate-x-1/2 px-4 w-full max-w-sm"
          : "bottom-0 left-0 w-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium",
          backgroundColor ? "" : "bg-foreground text-background",
          behavior === "fixed" ? "rounded-none" : "",
          className
        )}
        style={backgroundColor ? { backgroundColor, color: "#fff" } : undefined}
      >
        <span className="flex-1 text-xs leading-relaxed">{message}</span>
        {action && (
          <button
            onClick={() => { action.onPressed(); onDismiss(); }}
            className="text-[11px] font-bold uppercase tracking-wider text-primary hover:opacity-80 transition shrink-0"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={onDismiss}
          className="opacity-60 hover:opacity-100 transition text-base leading-none ml-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ─── useSnackBar hook ─────────────────────────────────────────────────────────
export function useSnackBar() {
  const [state, setState] = useState<{
    message: string;
    action?: { label: string; onPressed: () => void };
  } | null>(null);

  const show = (message: string, action?: { label: string; onPressed: () => void }) => {
    setState({ message, action });
  };

  const hide = () => setState(null);

  const element = state ? (
    <SnackBar
      message={state.message}
      isVisible={!!state}
      onDismiss={hide}
      action={state.action}
    />
  ) : null;

  return { show, hide, element };
}
