import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface StepItem {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  isCompleted?: boolean;
}

type StepState = "indexed" | "editing" | "complete" | "disabled" | "error";

interface StepperProps {
  steps: StepItem[];
  currentStep?: number;
  onStepTapped?: (index: number) => void;
  isVertical?: boolean;
  physics?: "clamped" | "scroll";
  className?: string;
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
export function Stepper({
  steps,
  currentStep = 0,
  onStepTapped,
  isVertical = true,
  className,
}: StepperProps) {
  return (
    <div className={cn(isVertical ? "flex flex-col gap-0" : "flex flex-row items-start", className)}>
      {steps.map((step, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={i}
            className={cn(
              isVertical ? "flex gap-4" : "flex flex-col items-center flex-1"
            )}
          >
            {/* Step indicator + line */}
            <div className={cn(isVertical ? "flex flex-col items-center" : "flex items-center w-full")}>
              {/* Circle */}
              <button
                onClick={() => onStepTapped?.(i)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground border border-border"
                )}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </button>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "transition-colors duration-300",
                    isVertical ? "w-0.5 flex-1 min-h-[24px] my-1" : "h-0.5 flex-1 mx-1"
                  )}
                  style={{ backgroundColor: isDone ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                />
              )}
            </div>

            {/* Step content */}
            <div className={cn(isVertical ? "flex-1 pb-4" : "pt-2 text-center px-1")}>
              <div className={cn("text-xs font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                {step.title}
              </div>
              {step.subtitle && (
                <div className="text-[10px] text-muted-foreground/70 mt-0.5">{step.subtitle}</div>
              )}
              {isActive && step.content && (
                <div className="mt-3 text-xs">{step.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── useStepController ────────────────────────────────────────────────────────
export function useStepController(totalSteps: number, initial = 0) {
  const [currentStep, setCurrentStep] = useState(initial);
  const next = () => setCurrentStep((p) => Math.min(p + 1, totalSteps - 1));
  const previous = () => setCurrentStep((p) => Math.max(p - 1, 0));
  const goTo = (i: number) => setCurrentStep(i);
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  return { currentStep, next, previous, goTo, isFirst, isLast };
}
