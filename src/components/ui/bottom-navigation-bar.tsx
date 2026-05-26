import React from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BottomNavItem {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: string;
  badge?: number | string;
}

interface BottomNavigationBarProps {
  items: BottomNavItem[];
  currentIndex: number;
  onTap: (index: number) => void;
  type?: "fixed" | "shifting";
  selectedItemColor?: string;
  unselectedItemColor?: string;
  backgroundColor?: string;
  elevation?: number;
  showSelectedLabels?: boolean;
  showUnselectedLabels?: boolean;
  className?: string;
}

// ─── BottomNavigationBar ──────────────────────────────────────────────────────
export function BottomNavigationBar({
  items,
  currentIndex,
  onTap,
  type = "fixed",
  selectedItemColor,
  unselectedItemColor,
  backgroundColor,
  elevation = 8,
  showSelectedLabels = true,
  showUnselectedLabels = true,
  className,
}: BottomNavigationBarProps) {
  const shadowMap: Record<number, string> = {
    0: "shadow-none",
    2: "shadow-sm",
    4: "shadow-md",
    8: "shadow-xl",
    16: "shadow-2xl",
  };

  return (
    <nav
      className={cn(
        "flex items-stretch border-t border-border",
        shadowMap[elevation] || "shadow-xl",
        className
      )}
      style={{ backgroundColor: backgroundColor || "hsl(var(--card))" }}
    >
      {items.map((item, i) => {
        const isSelected = i === currentIndex;
        return (
          <button
            key={i}
            onClick={() => onTap(i)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 relative transition-all",
              "hover:bg-accent/30"
            )}
            style={{
              color: isSelected
                ? selectedItemColor || "hsl(var(--primary))"
                : unselectedItemColor || "hsl(var(--muted-foreground))",
            }}
          >
            {/* Badge overlay */}
            {item.badge !== undefined && (
              <div className="absolute top-1.5 left-1/2 ml-2 min-w-[14px] h-[14px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                {item.badge}
              </div>
            )}

            {/* Icon */}
            <span
              className={cn(
                "text-xl transition-transform duration-200",
                isSelected ? "scale-110" : ""
              )}
            >
              {isSelected && item.activeIcon ? item.activeIcon : item.icon}
            </span>

            {/* Label */}
            {((isSelected && showSelectedLabels) || (!isSelected && showUnselectedLabels)) && (
              <span className={cn("text-[10px] font-semibold leading-tight", isSelected ? "font-bold" : "")}>
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
