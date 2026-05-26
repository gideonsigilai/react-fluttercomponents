import React, { useState, useEffect, useRef } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AnimatedItem {
  key: string;
  child: React.ReactNode;
}

interface AnimatedListProps {
  items: AnimatedItem[];
  itemBuilder?: (item: AnimatedItem, animation: number) => React.ReactNode;
  initialItemCount?: number;
  duration?: number;
  enterTransition?: "fade" | "slideDown" | "slideRight" | "scale";
  exitTransition?: "fade" | "slideDown" | "slideRight" | "scale";
  className?: string;
}

// ─── AnimatedList ─────────────────────────────────────────────────────────────
export function AnimatedList({
  items,
  itemBuilder,
  duration = 300,
  enterTransition = "slideDown",
  exitTransition = "fade",
  className,
}: AnimatedListProps) {
  const [rendered, setRendered] = useState<(AnimatedItem & { entering: boolean; leaving: boolean })[]>(
    items.map((i) => ({ ...i, entering: false, leaving: false }))
  );
  const prevKeys = useRef<string[]>(items.map((i) => i.key));

  useEffect(() => {
    const currentKeys = items.map((i) => i.key);
    const added = currentKeys.filter((k) => !prevKeys.current.includes(k));
    const removed = prevKeys.current.filter((k) => !currentKeys.includes(k));

    if (added.length > 0) {
      const newItems = items.filter((i) => added.includes(i.key));
      setRendered((prev) => [
        ...prev.filter((p) => !removed.includes(p.key)),
        ...newItems.map((i) => ({ ...i, entering: true, leaving: false })),
      ]);

      setTimeout(() => {
        setRendered((prev) => prev.map((p) => added.includes(p.key) ? { ...p, entering: false } : p));
      }, 50);
    }

    if (removed.length > 0) {
      setRendered((prev) => prev.map((p) => removed.includes(p.key) ? { ...p, leaving: true } : p));
      setTimeout(() => {
        setRendered((prev) => prev.filter((p) => !removed.includes(p.key)));
      }, duration);
    }

    prevKeys.current = currentKeys;
  }, [items]);

  const getEnterStyle = (entering: boolean): React.CSSProperties => {
    if (!entering) return {};
    switch (enterTransition) {
      case "slideDown": return { opacity: 0, transform: "translateY(-16px)" };
      case "slideRight": return { opacity: 0, transform: "translateX(-16px)" };
      case "scale": return { opacity: 0, transform: "scale(0.8)" };
      default: return { opacity: 0 };
    }
  };

  const getLeaveStyle = (leaving: boolean): React.CSSProperties => {
    if (!leaving) return {};
    switch (exitTransition) {
      case "slideDown": return { opacity: 0, transform: "translateY(-16px)", maxHeight: 0, overflow: "hidden" };
      case "slideRight": return { opacity: 0, transform: "translateX(16px)" };
      case "scale": return { opacity: 0, transform: "scale(0.8)" };
      default: return { opacity: 0, maxHeight: 0, overflow: "hidden" };
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {rendered.map((item) => (
        <div
          key={item.key}
          style={{
            transition: `all ${duration}ms ease-in-out`,
            ...getEnterStyle(item.entering),
            ...getLeaveStyle(item.leaving),
          }}
        >
          {itemBuilder ? itemBuilder(item, item.entering ? 0 : 1) : item.child}
        </div>
      ))}
    </div>
  );
}
