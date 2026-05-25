import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onPressed: () => void;
  backgroundColor?: string;
  foregroundColor?: string;
  className?: string;
  key?: React.Key;
}

/**
 * A material design floating action button.
 * Equivalent to Flutter's FloatingActionButton() widget.
 */
export const FloatingActionButton = ({
  icon,
  onPressed,
  backgroundColor,
  foregroundColor,
  className,
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onPressed}
      className={cn(
        "h-14 w-14 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all p-0",
        !backgroundColor && "bg-primary text-primary-foreground",
        className
      )}
      style={{ backgroundColor, color: foregroundColor }}
    >
      {icon}
    </Button>
  );
};
