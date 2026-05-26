import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelected: (time: { hour: number; minute: number }) => void;
  initialTime?: { hour: number; minute: number };
  use24HourFormat?: boolean;
  className?: string;
}

// ─── TimePicker ───────────────────────────────────────────────────────────────
export function TimePicker({
  isOpen,
  onClose,
  onTimeSelected,
  initialTime = { hour: 12, minute: 0 },
  use24HourFormat = false,
  className,
}: TimePickerProps) {
  const [hour, setHour] = useState(initialTime.hour % (use24HourFormat ? 24 : 12) || (use24HourFormat ? 0 : 12));
  const [minute, setMinute] = useState(initialTime.minute);
  const [period, setPeriod] = useState<"AM" | "PM">(initialTime.hour >= 12 ? "PM" : "AM");

  if (!isOpen) return null;

  const confirm = () => {
    let h = hour;
    if (!use24HourFormat) {
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
    }
    onTimeSelected({ hour: h, minute });
    onClose();
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const maxHour = use24HourFormat ? 23 : 12;
  const minHour = use24HourFormat ? 0 : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={cn("bg-card border border-border rounded-2xl shadow-2xl w-72 overflow-hidden", className)}>
        {/* Title */}
        <div className="px-6 pt-5 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Time</h3>
          <div className="flex items-center gap-2 mt-3">
            {/* Hour */}
            <div className="flex-1 bg-accent/40 rounded-xl flex items-center justify-center">
              <div className="flex flex-col items-center py-2">
                <button onClick={() => setHour((h) => h >= maxHour ? minHour : h + 1)} className="p-1 hover:text-primary transition">▲</button>
                <span className="text-3xl font-bold text-primary font-mono w-16 text-center">{pad(hour)}</span>
                <button onClick={() => setHour((h) => h <= minHour ? maxHour : h - 1)} className="p-1 hover:text-primary transition">▼</button>
              </div>
            </div>

            <span className="text-2xl font-bold text-muted-foreground">:</span>

            {/* Minute */}
            <div className="flex-1 bg-accent/40 rounded-xl flex items-center justify-center">
              <div className="flex flex-col items-center py-2">
                <button onClick={() => setMinute((m) => m >= 59 ? 0 : m + 1)} className="p-1 hover:text-primary transition">▲</button>
                <span className="text-3xl font-bold font-mono w-16 text-center">{pad(minute)}</span>
                <button onClick={() => setMinute((m) => m <= 0 ? 59 : m - 1)} className="p-1 hover:text-primary transition">▼</button>
              </div>
            </div>

            {/* AM/PM */}
            {!use24HourFormat && (
              <div className="flex flex-col gap-1">
                {(["AM", "PM"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={cn(
                      "w-12 py-2 rounded-lg text-xs font-bold transition-all",
                      period === p ? "bg-primary text-primary-foreground" : "bg-accent/40 text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-border">
          <button onClick={onClose} className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition">CANCEL</button>
          <button onClick={confirm} className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">OK</button>
        </div>
      </div>
    </div>
  );
}
