import React, { useState, useRef, useEffect } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface TabItem {
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: TabItem[];
  selectedIndex: number;
  onTabChanged: (index: number) => void;
  indicatorColor?: string;
  labelColor?: string;
  unselectedLabelColor?: string;
  isScrollable?: boolean;
  className?: string;
}

// ─── TabBar ───────────────────────────────────────────────────────────────────
export function TabBar({
  tabs,
  selectedIndex,
  onTabChanged,
  indicatorColor = "#8b5cf6",
  labelColor,
  unselectedLabelColor,
  isScrollable = false,
  className,
}: TabBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[selectedIndex];
    if (el && containerRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const rect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - containerLeft + containerRef.current.scrollLeft,
        width: rect.width,
      });
    }
  }, [selectedIndex, tabs]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex border-b border-border",
        isScrollable ? "overflow-x-auto" : "",
        className
      )}
    >
      {tabs.map((tab, i) => (
        <button
          key={i}
          ref={(el) => { tabRefs.current[i] = el; }}
          onClick={() => onTabChanged(i)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors",
            i === selectedIndex ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
          style={
            i === selectedIndex
              ? labelColor ? { color: labelColor } : undefined
              : unselectedLabelColor ? { color: unselectedLabelColor } : undefined
          }
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}

      {/* Animated Indicator */}
      <div
        className="absolute bottom-0 h-0.5 rounded-full transition-all duration-300"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          backgroundColor: indicatorColor,
        }}
      />
    </div>
  );
}

// ─── TabBarView ───────────────────────────────────────────────────────────────
interface TabBarViewProps {
  children: React.ReactNode[];
  selectedIndex: number;
  className?: string;
}

export function TabBarView({ children, selectedIndex, className }: TabBarViewProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          className={cn(
            "transition-all duration-200",
            i === selectedIndex ? "block" : "hidden"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ─── DefaultTabController ─────────────────────────────────────────────────────
interface DefaultTabControllerProps {
  tabs: TabItem[];
  children: (index: number, setIndex: (i: number) => void) => React.ReactNode;
  initialIndex?: number;
}

export function DefaultTabController({ tabs, children, initialIndex = 0 }: DefaultTabControllerProps) {
  const [index, setIndex] = useState(initialIndex);
  return <>{children(index, setIndex)}</>;
}
