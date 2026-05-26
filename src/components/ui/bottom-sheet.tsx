import React, { useEffect, useRef } from "react";
import { cn } from "../utils";

// ─── BottomSheet ─────────────────────────────────────────────────────────────
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Height constraint: "auto" | "half" | "full" | number (px) */
  height?: "auto" | "half" | "full" | number;
  /** Show drag handle indicator */
  showHandle?: boolean;
  /** Whether tapping backdrop closes the sheet */
  isDismissible?: boolean;
  /** Persistent (not modal) — no backdrop */
  persistent?: boolean;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  className,
  height = "auto",
  showHandle = true,
  isDismissible = true,
  persistent = false,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissible) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isDismissible, onClose]);

  const heightClass =
    height === "half"
      ? "max-h-[50vh]"
      : height === "full"
      ? "h-[90vh]"
      : height === "auto"
      ? "max-h-[80vh]"
      : "";

  const inlineHeight = typeof height === "number" ? { maxHeight: height } : undefined;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      {!persistent && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={isDismissible ? onClose : undefined}
        />
      )}

      {/* Sheet */}
      <div
        ref={sheetRef}
        style={inlineHeight}
        className={cn(
          "relative z-10 w-full rounded-t-2xl bg-card border border-border shadow-2xl",
          "transition-transform duration-300",
          heightClass,
          "overflow-y-auto",
          className
        )}
      >
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ─── ModalBottomSheet ─────────────────────────────────────────────────────────
interface ModalBottomSheetProps extends Omit<BottomSheetProps, "persistent"> {
  title?: React.ReactNode;
}

export function ModalBottomSheet({ title, children, ...props }: ModalBottomSheetProps) {
  return (
    <BottomSheet {...props}>
      {title && (
        <div className="px-6 pb-2 pt-1 border-b border-border flex items-center justify-between">
          <span className="font-semibold text-sm text-foreground">{title}</span>
          <button
            onClick={props.onClose}
            className="p-1 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}
      <div className="p-5">{children}</div>
    </BottomSheet>
  );
}
