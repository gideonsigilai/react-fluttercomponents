import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelected: (date: Date) => void;
  initialDate?: Date;
  firstDate?: Date;
  lastDate?: Date;
  className?: string;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ─── DatePicker ───────────────────────────────────────────────────────────────
export function DatePicker({
  isOpen,
  onClose,
  onDateSelected,
  initialDate = new Date(),
  firstDate,
  lastDate,
  className,
}: DatePickerProps) {
  const [viewDate, setViewDate] = useState(initialDate);
  const [selected, setSelected] = useState<Date | null>(null);

  if (!isOpen) return null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDay = (day: number) => {
    const d = new Date(year, month, day);
    setSelected(d);
    onDateSelected(d);
    onClose();
  };

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    if (firstDate && d < firstDate) return true;
    if (lastDate && d > lastDate) return true;
    return false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const cells = [];
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) cells.push(null);
  // Day cells
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={cn("bg-card border border-border rounded-2xl shadow-2xl w-72 overflow-hidden", className)}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-primary text-primary-foreground">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-white/20 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-bold text-sm">
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-white/20 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 px-3 pt-3 pb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-bold text-muted-foreground">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-0.5 px-3 pb-4">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`empty-${i}`} />
            ) : (
              <button
                key={day}
                onClick={() => !isDisabled(day) && selectDay(day)}
                disabled={isDisabled(day)}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-all",
                  isDisabled(day)
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : isToday(day)
                    ? "bg-primary/20 text-primary font-bold hover:bg-primary hover:text-primary-foreground"
                    : "hover:bg-accent text-foreground"
                )}
              >
                {day}
              </button>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── showDatePicker helper (returns selected date via callback) ────────────────
export function showDatePicker({
  context: _context,
  initialDate,
  firstDate,
  lastDate,
  onSelected,
}: {
  context?: unknown;
  initialDate?: Date;
  firstDate?: Date;
  lastDate?: Date;
  onSelected: (date: Date) => void;
}) {
  // In React, render the <DatePicker> component directly with state
  console.warn("showDatePicker: Render <DatePicker> component with isOpen state instead.");
  return null;
}
