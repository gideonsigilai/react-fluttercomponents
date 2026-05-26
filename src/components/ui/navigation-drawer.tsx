import React from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NavDrawerDestination {
  icon: React.ReactNode;
  selectedIcon?: React.ReactNode;
  label: string;
  badge?: number | string;
}

export interface NavDrawerSection {
  header?: React.ReactNode;
  destinations: NavDrawerDestination[];
}

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sections?: NavDrawerSection[];
  destinations?: NavDrawerDestination[];
  selectedIndex: number;
  onDestinationSelected: (index: number) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  drawerWidth?: number;
  position?: "left" | "right";
  backgroundColor?: string;
  className?: string;
}

// ─── NavigationDrawer ─────────────────────────────────────────────────────────
export function NavigationDrawer({
  isOpen,
  onClose,
  sections,
  destinations,
  selectedIndex,
  onDestinationSelected,
  header,
  footer,
  drawerWidth = 304,
  position = "left",
  backgroundColor,
  className,
}: NavigationDrawerProps) {
  // Flatten all destinations for index tracking
  const allDests = sections
    ? sections.flatMap((s) => s.destinations)
    : destinations ?? [];

  let globalIndex = 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 z-50 flex flex-col border-border bg-card shadow-2xl transition-transform duration-300",
          position === "left" ? "left-0 border-r rounded-r-2xl" : "right-0 border-l rounded-l-2xl",
          isOpen
            ? "translate-x-0"
            : position === "left"
            ? "-translate-x-full"
            : "translate-x-full",
          className
        )}
        style={{ width: drawerWidth, backgroundColor: backgroundColor || undefined }}
      >
        {/* Header */}
        {header && (
          <div className="p-5 border-b border-border shrink-0">
            {header}
          </div>
        )}

        {/* Destinations / Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {sections ? (
            sections.map((section, sIdx) => (
              <div key={sIdx}>
                {section.header && (
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {section.header}
                  </div>
                )}
                {section.destinations.map((dest) => {
                  const idx = globalIndex++;
                  const isSelected = idx === selectedIndex;
                  return (
                    <DrawerDestinationItem
                      key={idx}
                      dest={dest}
                      isSelected={isSelected}
                      onClick={() => { onDestinationSelected(idx); onClose(); }}
                    />
                  );
                })}
              </div>
            ))
          ) : (
            allDests.map((dest, i) => (
              <DrawerDestinationItem
                key={i}
                dest={dest}
                isSelected={i === selectedIndex}
                onClick={() => { onDestinationSelected(i); onClose(); }}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-border shrink-0">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Internal: Drawer Destination Item ────────────────────────────────────────
function DrawerDestinationItem({
  dest,
  isSelected,
  onClick,
}: {
  dest: NavDrawerDestination;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        isSelected
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <span className="text-lg shrink-0">
        {isSelected && dest.selectedIcon ? dest.selectedIcon : dest.icon}
      </span>
      <span className="flex-1 text-left">{dest.label}</span>
      {dest.badge !== undefined && (
        <span className="min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
          {dest.badge}
        </span>
      )}
    </button>
  );
}
