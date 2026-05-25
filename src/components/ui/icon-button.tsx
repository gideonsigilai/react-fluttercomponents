import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode;
  onPressed?: () => void;
  key?: React.Key;
}

/**
 * A material design icon button.
 * Equivalent to Flutter's IconButton() widget.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, onPressed, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={onPressed}
        className={cn("rounded-full", className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
