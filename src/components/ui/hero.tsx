import React, { useRef } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HeroProps {
  tag: string; // unique hero tag identifier
  child?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// In a web context, Hero is a semantic marker + shared element transition bridge.
// We implement it as a CSS view-transition compatible wrapper.
export function Hero({ tag, children, child, className }: HeroProps) {
  return (
    <div
      className={cn("hero-widget", className)}
      data-hero-tag={tag}
      style={{ viewTransitionName: `hero-${tag}` } as React.CSSProperties}
    >
      {children ?? child}
    </div>
  );
}

// ─── HeroMode ─────────────────────────────────────────────────────────────────
export type HeroFlightShuttleBuilder = (
  flightContext: unknown,
  animation: number,
  flightDirection: "push" | "pop",
  fromHeroContext: unknown,
  toHeroContext: unknown
) => React.ReactNode;

// ─── SelectionArea ────────────────────────────────────────────────────────────
interface SelectionAreaProps {
  child?: React.ReactNode;
  children?: React.ReactNode;
  onSelectionChanged?: (selection: string) => void;
  className?: string;
}

export function SelectionArea({
  children,
  child,
  onSelectionChanged,
  className,
}: SelectionAreaProps) {
  const handleMouseUp = () => {
    const sel = window.getSelection()?.toString();
    if (sel) onSelectionChanged?.(sel);
  };

  return (
    <div
      className={cn("select-text cursor-text", className)}
      onMouseUp={handleMouseUp}
      style={{ userSelect: "text" }}
    >
      {children ?? child}
    </div>
  );
}

// ─── InteractiveViewer (zoom/pan wrapper) ──────────────────────────────────────
interface InteractiveViewerProps {
  child?: React.ReactNode;
  children?: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  panEnabled?: boolean;
  scaleEnabled?: boolean;
  className?: string;
}

export function InteractiveViewer({
  children,
  child,
  minScale = 0.8,
  maxScale = 4.0,
  panEnabled = true,
  scaleEnabled = true,
  className,
}: InteractiveViewerProps) {
  const [scale, setScale] = React.useState(1);
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    if (!scaleEnabled) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.max(minScale, Math.min(maxScale, s * delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panEnabled) return;
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !panEnabled) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  };

  const handleMouseUp = () => { isDragging.current = false; };

  const reset = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  return (
    <div
      className={cn("overflow-hidden relative", className)}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: isDragging.current ? "none" : "transform 0.1s ease",
          cursor: panEnabled ? "grab" : "default",
        }}
      >
        {children ?? child}
      </div>
      <button
        onClick={reset}
        className="absolute top-2 right-2 text-[10px] px-2 py-1 bg-card/80 border border-border rounded-lg font-mono backdrop-blur-sm"
      >
        {scale.toFixed(1)}x ↺
      </button>
    </div>
  );
}
