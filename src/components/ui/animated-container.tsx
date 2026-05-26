import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AnimatedValue {
  width?: number | string;
  height?: number | string;
  color?: string;
  padding?: number | string;
  margin?: number | string;
  borderRadius?: number | string;
  opacity?: number;
  transform?: string;
}

interface AnimatedContainerProps {
  duration?: number; // ms
  curve?: "ease" | "easeIn" | "easeOut" | "easeInOut" | "linear" | "spring";
  width?: number | string;
  height?: number | string;
  color?: string;
  padding?: number | string;
  margin?: number | string;
  borderRadius?: number | string;
  opacity?: number;
  transform?: string;
  child?: React.ReactNode;
  children?: React.ReactNode;
  onEnd?: () => void;
  className?: string;
}

const CURVE_MAP: Record<string, string> = {
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  linear: "linear",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ─── AnimatedContainer ────────────────────────────────────────────────────────
export function AnimatedContainer({
  duration = 300,
  curve = "easeInOut",
  width,
  height,
  color,
  padding,
  margin,
  borderRadius,
  opacity,
  transform,
  children,
  child,
  onEnd,
  className,
}: AnimatedContainerProps) {
  const style: CSSProperties = {
    transition: `all ${duration}ms ${CURVE_MAP[curve] || "ease-in-out"}`,
    width: width,
    height: height,
    backgroundColor: color,
    padding: padding,
    margin: margin,
    borderRadius: borderRadius,
    opacity: opacity,
    transform: transform,
  };

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={style}
      onTransitionEnd={onEnd}
    >
      {children ?? child}
    </div>
  );
}

// ─── AnimatedOpacity ──────────────────────────────────────────────────────────
interface AnimatedOpacityProps {
  opacity: number;
  duration?: number;
  curve?: string;
  children: React.ReactNode;
  className?: string;
  onEnd?: () => void;
}

export function AnimatedOpacity({
  opacity,
  duration = 300,
  curve = "easeInOut",
  children,
  className,
  onEnd,
}: AnimatedOpacityProps) {
  return (
    <div
      className={className}
      style={{
        opacity,
        transition: `opacity ${duration}ms ${CURVE_MAP[curve] || "ease-in-out"}`,
      }}
      onTransitionEnd={onEnd}
    >
      {children}
    </div>
  );
}

// ─── AnimatedScale ────────────────────────────────────────────────────────────
interface AnimatedScaleProps {
  scale: number;
  duration?: number;
  curve?: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedScale({
  scale,
  duration = 300,
  curve = "easeInOut",
  children,
  className,
}: AnimatedScaleProps) {
  return (
    <div
      className={cn("inline-block", className)}
      style={{
        transform: `scale(${scale})`,
        transition: `transform ${duration}ms ${CURVE_MAP[curve] || "ease-in-out"}`,
      }}
    >
      {children}
    </div>
  );
}

// ─── AnimatedSlide ────────────────────────────────────────────────────────────
interface AnimatedSlideProps {
  offset: { x: number; y: number };
  duration?: number;
  curve?: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSlide({
  offset,
  duration = 300,
  curve = "easeInOut",
  children,
  className,
}: AnimatedSlideProps) {
  return (
    <div
      className={className}
      style={{
        transform: `translate(${offset.x * 100}%, ${offset.y * 100}%)`,
        transition: `transform ${duration}ms ${CURVE_MAP[curve] || "ease-in-out"}`,
      }}
    >
      {children}
    </div>
  );
}

// ─── TweenAnimationBuilder ────────────────────────────────────────────────────
interface TweenAnimationBuilderProps {
  tween: { begin: number; end: number };
  duration?: number;
  builder: (value: number, child?: React.ReactNode) => React.ReactNode;
  child?: React.ReactNode;
  onEnd?: () => void;
}

export function TweenAnimationBuilder({
  tween,
  duration = 500,
  builder,
  child,
  onEnd,
}: TweenAnimationBuilderProps) {
  const [value, setValue] = useState(tween.begin);
  const frameRef = useRef<number>();
  const startRef = useRef<number>();
  const startValue = useRef(tween.begin);
  const targetValue = useRef(tween.end);

  useEffect(() => {
    targetValue.current = tween.end;
    startValue.current = value;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const current = startValue.current + (targetValue.current - startValue.current) * eased;
      setValue(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        onEnd?.();
      }
    };

    startRef.current = undefined;
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current!);
  }, [tween.end]);

  return <>{builder(value, child)}</>;
}
