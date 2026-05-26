import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NavRailDestination {
  icon: React.ReactNode;
  selectedIcon?: React.ReactNode;
  label: string;
}

interface NavigationRailProps {
  destinations: NavRailDestination[];
  selectedIndex: number;
  onDestinationSelected: (index: number) => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  labelType?: "none" | "selected" | "all";
  minWidth?: number;
  backgroundColor?: string;
  indicatorColor?: string;
  className?: string;
}

// ─── NavigationRail ───────────────────────────────────────────────────────────
export function NavigationRail({
  destinations,
  selectedIndex,
  onDestinationSelected,
  leading,
  trailing,
  labelType = "selected",
  minWidth = 80,
  backgroundColor,
  indicatorColor,
  className,
}: NavigationRailProps) {
  return (
    <nav
      className={cn(
        "flex flex-col items-center py-4 gap-2 border-r border-border h-full",
        className
      )}
      style={{
        minWidth,
        backgroundColor: backgroundColor || undefined,
      }}
    >
      {leading && <div className="mb-4">{leading}</div>}

      {destinations.map((dest, i) => {
        const isSelected = i === selectedIndex;
        const showLabel = labelType === "all" || (labelType === "selected" && isSelected);

        return (
          <button
            key={i}
            onClick={() => onDestinationSelected(i)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full px-2 py-2 rounded-xl transition-all",
              isSelected ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {/* Indicator pill */}
            <div
              className={cn(
                "flex items-center justify-center w-14 h-8 rounded-full transition-all duration-200",
                isSelected ? "scale-105" : "hover:bg-accent/50"
              )}
              style={isSelected ? { backgroundColor: indicatorColor || "hsl(var(--primary) / 0.15)" } : undefined}
            >
              <span className="text-xl">
                {isSelected && dest.selectedIcon ? dest.selectedIcon : dest.icon}
              </span>
            </div>
            {showLabel && (
              <span className="text-[10px] font-semibold leading-tight text-center">
                {dest.label}
              </span>
            )}
          </button>
        );
      })}

      {trailing && <div className="mt-auto">{trailing}</div>}
    </nav>
  );
}
