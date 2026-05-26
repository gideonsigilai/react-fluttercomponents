import React, { useState, useEffect } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FadeTransitionProps {
  opacity: number; // 0.0 - 1.0
  duration?: number; // ms
  curve?: "ease" | "easeIn" | "easeOut" | "easeInOut" | "linear";
  child?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onEnd?: () => void;
}

// ─── FadeTransition ───────────────────────────────────────────────────────────
export function FadeTransition({
  opacity,
  duration = 400,
  curve = "easeInOut",
  children,
  child,
  className,
  onEnd,
}: FadeTransitionProps) {
  const curveMap: Record<string, string> = {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    linear: "linear",
  };

  return (
    <div
      className={className}
      style={{
        opacity,
        transition: `opacity ${duration}ms ${curveMap[curve]}`,
      }}
      onTransitionEnd={onEnd}
    >
      {children ?? child}
    </div>
  );
}

// ─── AnimatedSwitcher ─────────────────────────────────────────────────────────
interface AnimatedSwitcherProps {
  child: React.ReactNode;
  duration?: number;
  transitionType?: "fade" | "scale" | "slide";
  className?: string;
}

export function AnimatedSwitcher({
  child,
  duration = 300,
  transitionType = "fade",
  className,
}: AnimatedSwitcherProps) {
  const [displayed, setDisplayed] = useState(child);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayed(child);
      setVisible(true);
    }, duration / 2);
    return () => clearTimeout(t);
  }, [child]);

  const transitionStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform:
      transitionType === "scale"
        ? visible ? "scale(1)" : "scale(0.85)"
        : transitionType === "slide"
        ? visible ? "translateY(0)" : "translateY(12px)"
        : undefined,
    transition: `opacity ${duration / 2}ms ease-in-out, transform ${duration / 2}ms ease-in-out`,
  };

  return (
    <div className={className} style={transitionStyle}>
      {displayed}
    </div>
  );
}

// ─── Visibility (conditional render preserving DOM) ───────────────────────────
interface VisibilityProps {
  visible: boolean;
  child: React.ReactNode;
  maintainSize?: boolean;
  maintainAnimation?: boolean;
  className?: string;
}

export function Visibility({
  visible,
  child,
  maintainSize = false,
  className,
}: VisibilityProps) {
  if (maintainSize) {
    return (
      <div
        className={className}
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        {child}
      </div>
    );
  }
  return visible ? <div className={className}>{child}</div> : null;
}

// ─── Opacity ──────────────────────────────────────────────────────────────────
interface OpacityProps {
  opacity: number;
  child?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  alwaysIncludeSemantics?: boolean;
}

export function Opacity({ opacity, children, child, className }: OpacityProps) {
  return (
    <div className={cn("", className)} style={{ opacity }}>
      {children ?? child}
    </div>
  );
}
