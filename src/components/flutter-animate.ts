/**
 * flutter-animate.ts — Flutter `flutter_animate` package equivalent for React
 * CSS animation preset builders and chainable animation helpers.
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AnimationPreset {
  keyframes?: Keyframe[];
  options?: KeyframeAnimationOptions;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Duration presets ─────────────────────────────────────────────────────────
export const Duration = {
  zero: 0,
  milliseconds: (ms: number) => ms,
  seconds: (s: number) => s * 1000,
  minutes: (m: number) => m * 60_000,
  shortMs: 150,
  mediumMs: 300,
  longMs: 600,
};

// ─── Curves (easing functions) ────────────────────────────────────────────────
export const Curves = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  bounceIn: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  bounceOut: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  elasticIn: "cubic-bezier(0.36, 0.07, 0.19, 0.97)",
  elasticOut: "cubic-bezier(0.64, 0.57, 0.67, 1.53)",
  decelerate: "cubic-bezier(0, 0, 0.2, 1)",
  accelerate: "cubic-bezier(0.4, 0, 1, 1)",
  fastOutSlowIn: "cubic-bezier(0.4, 0, 0.2, 1)",
  slowMiddle: "cubic-bezier(0.15, 0.85, 0.15, 0.85)",
  anticipate: "cubic-bezier(0.36, 0, 0.66, -0.56)",
};

// ─── CSS class-based animation presets ────────────────────────────────────────
export const AnimatePresets = {
  fadeIn: "animate-in fade-in",
  fadeOut: "animate-out fade-out",
  slideInFromBottom: "animate-in slide-in-from-bottom",
  slideInFromTop: "animate-in slide-in-from-top",
  slideInFromLeft: "animate-in slide-in-from-left",
  slideInFromRight: "animate-in slide-in-from-right",
  zoomIn: "animate-in zoom-in",
  zoomOut: "animate-out zoom-out",
  spinIn: "animate-in spin-in",
};

// ─── Flutter-style animation chain builder ────────────────────────────────────
interface AnimationStep {
  type: "fade" | "scale" | "slide" | "rotate" | "blur" | "shake" | "shimmer";
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
  curve?: string;
  begin?: number;
  end?: number;
  offset?: { x?: number; y?: number };
}

export class Animate {
  private steps: AnimationStep[] = [];
  private _delay = 0;
  private _duration = 300;
  private _curve = Curves.easeInOut;

  static effect() { return new Animate(); }

  delay(ms: number) { this._delay = ms; return this; }
  duration(ms: number) { this._duration = ms; return this; }
  curve(c: string) { this._curve = c; return this; }

  fadeIn(from = 0, to = 1) {
    this.steps.push({ type: "fade", from, to });
    return this;
  }

  fadeOut(from = 1, to = 0) {
    this.steps.push({ type: "fade", from, to });
    return this;
  }

  scale(begin = 0, end = 1) {
    this.steps.push({ type: "scale", begin, end });
    return this;
  }

  slideX(begin = -1, end = 0) {
    this.steps.push({ type: "slide", offset: { x: begin }, end });
    return this;
  }

  slideY(begin = -1, end = 0) {
    this.steps.push({ type: "slide", offset: { y: begin }, end });
    return this;
  }

  rotate(begin = 0, end = 1) {
    this.steps.push({ type: "rotate", begin, end });
    return this;
  }

  shake() {
    this.steps.push({ type: "shake" });
    return this;
  }

  shimmer() {
    this.steps.push({ type: "shimmer" });
    return this;
  }

  /** Build CSS animation string */
  build(): React.CSSProperties {
    const transitions: string[] = [];
    const style: React.CSSProperties = {
      animationDelay: `${this._delay}ms`,
      animationDuration: `${this._duration}ms`,
      animationTimingFunction: this._curve,
      animationFillMode: "both",
    };

    return style;
  }

  /** Get CSS class string for tailwind animate plugin */
  toCssClass(): string {
    return ["animate-in", ...this.steps.map((s) => {
      if (s.type === "fade") return "fade-in";
      if (s.type === "scale") return "zoom-in";
      if (s.type === "slide" && s.offset?.y) return "slide-in-from-bottom";
      if (s.type === "slide" && s.offset?.x) return "slide-in-from-left";
      return "";
    })].join(" ");
  }
}

// ─── useAnimation hook ────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

export function useAnimation(
  trigger: boolean,
  duration = 300,
  delay = 0
): { isAnimating: boolean; style: React.CSSProperties } {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger) {
      const t = setTimeout(() => setIsAnimating(true), delay);
      return () => clearTimeout(t);
    } else {
      setIsAnimating(false);
    }
  }, [trigger, delay]);

  return {
    isAnimating,
    style: {
      opacity: isAnimating ? 1 : 0,
      transition: `all ${duration}ms ${Curves.fastOutSlowIn}`,
    },
  };
}

// ─── Spring animation helper ──────────────────────────────────────────────────
export function springAnimation(options: {
  mass?: number;
  stiffness?: number;
  damping?: number;
}) {
  const { mass = 1, stiffness = 300, damping = 30 } = options;
  const frequency = Math.sqrt(stiffness / mass);
  const ratio = damping / (2 * Math.sqrt(stiffness * mass));
  // Approximate spring as a CSS bezier
  return ratio < 1
    ? Curves.bounceOut
    : Curves.fastOutSlowIn;
}

import React from "react";
