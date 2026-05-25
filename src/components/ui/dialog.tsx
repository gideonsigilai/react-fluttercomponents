import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import type { Color, EdgeInsetsInput, BorderRadiusInput, SizeInput } from "./flutter-style";
import { edgeInsetsToStyle, borderRadiusToStyle, sizeToCss, elevationToShadow } from "./flutter-style";

export interface DialogProps {
  /** Whether the dialog is visible. */
  isOpen: boolean;
  /** Called when the user taps outside or presses Escape. */
  onClose?: () => void;
  /** Whether tapping the backdrop closes the dialog. Default true. */
  barrierDismissible?: boolean;
  /** The dialog content. */
  child: React.ReactNode;
  /** Background color of the dialog surface. */
  backgroundColor?: Color;
  /** Elevation (shadow). Default 24. */
  elevation?: number;
  /** Border radius. Default 28 (Material 3). */
  borderRadius?: BorderRadiusInput;
  /** Padding inside the dialog. */
  insetPadding?: EdgeInsetsInput;
  /** Max width of the dialog. */
  maxWidth?: SizeInput;
  /** Min width of the dialog. */
  minWidth?: SizeInput;
  className?: string;
  key?: React.Key;
}

/**
 * A material design dialog.
 * Equivalent to Flutter's Dialog() / AlertDialog() widget.
 * Use showDialog() from overlay-service for imperative usage.
 */
export const Dialog = ({
  isOpen,
  onClose,
  barrierDismissible = true,
  child,
  backgroundColor,
  elevation = 24,
  borderRadius = 28,
  insetPadding,
  maxWidth = 560,
  minWidth = 280,
  className,
}: DialogProps) => {
  // Keyboard + body scroll lock — single effect
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={barrierDismissible ? onClose : undefined}
        aria-hidden="true"
      />
      {/* Surface */}
      <div
        className={cn("relative bg-background text-foreground overflow-hidden", className)}
        style={{
          boxShadow: elevationToShadow(elevation),
          backgroundColor,
          maxWidth: sizeToCss(maxWidth),
          minWidth: sizeToCss(minWidth),
          width: "calc(100vw - 48px)",
          ...borderRadiusToStyle(borderRadius),
          ...edgeInsetsToStyle(insetPadding ?? 0, "padding"),
        }}
      >
        {child}
      </div>
    </div>,
    document.body
  );
};

Dialog.displayName = "Dialog";

// ─── AlertDialog ────────────────────────────────────────────────────────────

export interface AlertDialogProps extends Omit<DialogProps, "child"> {
  /** Dialog title. */
  title?: React.ReactNode;
  /** Dialog body content. */
  content?: React.ReactNode;
  /** Action buttons (e.g. Cancel / OK). */
  actions?: React.ReactNode[];
  /** Padding around the title. */
  titlePadding?: EdgeInsetsInput;
  /** Padding around the content. */
  contentPadding?: EdgeInsetsInput;
  /** Padding around the actions. */
  actionsPadding?: EdgeInsetsInput;
}

/**
 * A material design alert dialog.
 * Equivalent to Flutter's AlertDialog() widget.
 */
export const AlertDialog = ({
  title,
  content,
  actions,
  titlePadding,
  contentPadding,
  actionsPadding,
  ...dialogProps
}: AlertDialogProps) => (
  <Dialog
    {...dialogProps}
    child={
      <div className="flex flex-col">
        {title && (
          <div
            className="text-lg font-semibold"
            style={edgeInsetsToStyle(
              titlePadding ?? { top: 24, left: 24, right: 24, bottom: 16 },
              "padding"
            ) as React.CSSProperties}
          >
            {title}
          </div>
        )}
        {content && (
          <div
            className="text-sm text-muted-foreground"
            style={edgeInsetsToStyle(
              contentPadding ?? { left: 24, right: 24, bottom: 24 },
              "padding"
            ) as React.CSSProperties}
          >
            {content}
          </div>
        )}
        {actions && actions.length > 0 && (
          <div
            className="flex items-center justify-end gap-2"
            style={edgeInsetsToStyle(
              actionsPadding ?? { left: 24, right: 24, bottom: 16 },
              "padding"
            ) as React.CSSProperties}
          >
            {actions.map((action, i) => (
              <React.Fragment key={i}>{action}</React.Fragment>
            ))}
          </div>
        )}
      </div>
    }
  />
);

AlertDialog.displayName = "AlertDialog";
