import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpansionTileProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  onExpansionChanged?: (expanded: boolean) => void;
  expandedCrossAxisAlignment?: "start" | "center" | "end" | "stretch";
  tilePadding?: string;
  childrenPadding?: string;
  backgroundColor?: string;
  collapsedBackgroundColor?: string;
  iconColor?: string;
  collapsedIconColor?: string;
  textColor?: string;
  collapsedTextColor?: string;
  className?: string;
  maintainState?: boolean;
}

// ─── ExpansionTile ────────────────────────────────────────────────────────────
export function ExpansionTile({
  title,
  subtitle,
  leading,
  trailing,
  children,
  initiallyExpanded = false,
  onExpansionChanged,
  tilePadding = "px-4 py-3",
  childrenPadding = "px-4 pb-4",
  backgroundColor,
  collapsedBackgroundColor,
  iconColor,
  collapsedIconColor,
  textColor,
  collapsedTextColor,
  className,
  maintainState = false,
}: ExpansionTileProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    onExpansionChanged?.(next);
  };

  return (
    <div
      className={cn(
        "border border-border rounded-xl overflow-hidden transition-colors",
        className
      )}
      style={{
        backgroundColor: isExpanded
          ? backgroundColor
          : collapsedBackgroundColor || undefined,
      }}
    >
      {/* Tile Header */}
      <button
        onClick={toggle}
        className={cn(
          "w-full flex items-center gap-3 text-left transition-colors hover:bg-accent/30",
          tilePadding
        )}
        style={{ color: isExpanded ? textColor : collapsedTextColor || undefined }}
      >
        {leading && <span className="shrink-0">{leading}</span>}

        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{title}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</div>
          )}
        </div>

        {trailing || (
          <span
            className={cn(
              "transition-transform duration-300 text-muted-foreground shrink-0",
              isExpanded ? "rotate-180" : ""
            )}
            style={{ color: isExpanded ? iconColor : collapsedIconColor || undefined }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>

      {/* Expansion Content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {(maintainState || isExpanded) && (
          <div className={cn("border-t border-border/60", childrenPadding)}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
