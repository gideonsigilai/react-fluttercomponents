import * as React from "react";
import { cn } from "@/lib/utils";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  width?: string | number;
  position?: "left" | "right";
  key?: React.Key;
}

/**
 * A Flutter-style Drawer / Sidebar component.
 * Slides in from the edge of the screen and includes a backdrop.
 */
export const Sidebar = ({
  isOpen,
  onClose,
  width = 304, // Default Material drawer width
  position = "left",
  className,
  children,
  ...props
}: SidebarProps) => {
  // Prevent scrolling on the body when the sidebar is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const transformClass = position === "left" 
    ? (isOpen ? "translate-x-0" : "-translate-x-full")
    : (isOpen ? "translate-x-0" : "translate-x-full");

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 z-[110] flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto",
          position === "left" ? "left-0" : "right-0",
          transformClass,
          className
        )}
        style={{ width: typeof width === "number" ? `${width}px` : width }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export const SidebarHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-4 border-b border-border/50 bg-muted/20 min-h-[64px] flex items-center",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const SidebarBody = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex-1 overflow-y-auto p-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
