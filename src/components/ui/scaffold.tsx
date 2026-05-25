import * as React from "react";
import { cn } from "@/lib/utils";
import type { Color } from "./flutter-style";

export interface ScaffoldProps {
  /** The app bar to display at the top. Equivalent to Flutter's appBar. */
  appBar?: React.ReactNode;
  /** The primary content of the scaffold. Equivalent to Flutter's body. */
  body: React.ReactNode;
  /** A button displayed floating above the body. */
  floatingActionButton?: React.ReactNode;
  /** Alignment of the FAB. Default bottom-right. */
  floatingActionButtonLocation?:
    | "bottomRight"
    | "bottomLeft"
    | "bottomCenter"
    | "topRight"
    | "topLeft";
  /** A navigation bar displayed at the bottom. */
  bottomNavigationBar?: React.ReactNode;
  /** A drawer shown on the left side. */
  drawer?: React.ReactNode;
  /** A drawer shown on the right side (endDrawer). */
  endDrawer?: React.ReactNode;
  /** Background color of the scaffold. */
  backgroundColor?: Color;
  /** Whether the scaffold should resize when the keyboard appears. */
  resizeToAvoidBottomInset?: boolean;
  /** Whether the body should extend behind the appBar. */
  extendBodyBehindAppBar?: boolean;
  /** Whether the body should extend behind the bottom navigation bar. */
  extendBody?: boolean;
  className?: string;
  key?: React.Key;
}

const fabPositionMap: Record<
  NonNullable<ScaffoldProps["floatingActionButtonLocation"]>,
  string
> = {
  bottomRight: "bottom-6 right-6",
  bottomLeft: "bottom-6 left-6",
  bottomCenter: "bottom-6 left-1/2 -translate-x-1/2",
  topRight: "top-6 right-6",
  topLeft: "top-6 left-6",
};

/**
 * Implements the basic material design visual layout structure.
 * Equivalent to Flutter's Scaffold() widget.
 */
export const Scaffold = ({
  appBar,
  body,
  floatingActionButton,
  floatingActionButtonLocation = "bottomRight",
  bottomNavigationBar,
  drawer,
  endDrawer,
  backgroundColor,
  extendBodyBehindAppBar = false,
  extendBody = false,
  className,
}: ScaffoldProps) => {
  return (
    <div
      className={cn(
        // h-screen + overflow-hidden locks the viewport.
        // Only <main> scrolls — the AppBar never enters the scroll container.
        "relative flex h-screen w-full flex-col overflow-hidden",
        className,
      )}
      style={{ backgroundColor }}
    >
      {/* ── Normal AppBar (extendBodyBehindAppBar=false) ──────────────────
          flex-none: sits above the scroll area, never moves.
          The AppBar's own z-50 glass effect lets scrolled content show through. */}
      {appBar && !extendBodyBehindAppBar && (
        <div
          className={cn(
            "flex-none z-50",
            drawer && "sm:pl-0 pl-14",
            endDrawer && "sm:pr-0 pr-14",
          )}
        >
          {appBar}
        </div>
      )}

      {/* Body area ────────────────────────────────────────────────────── */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* ── Overlay AppBar (extendBodyBehindAppBar=true) ───────────────
            Absolutely positioned over the scroll area.
            Safe-space div inside <main> reserves the initial offset. */}
        {appBar && extendBodyBehindAppBar && (
          <div className="absolute top-0 left-0 right-0 z-50">{appBar}</div>
        )}

        {/* Left drawer */}
        {drawer && <div className="flex-none flex h-full">{drawer}</div>}

        {/* Main scroll container — the ONLY element that scrolls */}
        <main className="flex flex-1 flex-col overflow-y-auto min-w-0">
          {appBar && extendBodyBehindAppBar && (
            // Pushes content below the overlaid AppBar on initial load
            <div className="h-14 flex-none" aria-hidden="true" />
          )}
          {body}
        </main>

        {/* Right / end drawer */}
        {endDrawer && <div className="flex-none flex h-full">{endDrawer}</div>}

        {/* FAB */}
        {floatingActionButton && (
          <div
            className={cn(
              "absolute z-40",
              fabPositionMap[floatingActionButtonLocation],
            )}
          >
            {floatingActionButton}
          </div>
        )}
      </div>

      {/* Bottom navigation bar */}
      {bottomNavigationBar && !extendBody && (
        <div className="flex-none z-50">{bottomNavigationBar}</div>
      )}
      {bottomNavigationBar && extendBody && (
        <div className="absolute bottom-0 left-0 right-0 z-50">
          {bottomNavigationBar}
        </div>
      )}
    </div>
  );
};

Scaffold.displayName = "Scaffold";
