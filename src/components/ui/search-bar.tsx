import React, { useState, useRef, useEffect } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SearchBarProps {
  hintText?: string;
  onChanged?: (value: string) => void;
  onSubmitted?: (value: string) => void;
  onTap?: () => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode[];
  controller?: React.MutableRefObject<string>;
  autoFocus?: boolean;
  backgroundColor?: string;
  elevation?: number;
  padding?: string;
  constraints?: { maxWidth?: number; minWidth?: number };
  className?: string;
}

// ─── SearchBar (Material 3) ───────────────────────────────────────────────────
export function SearchBar({
  hintText = "Search...",
  onChanged,
  onSubmitted,
  onTap,
  leading,
  trailing,
  autoFocus = false,
  backgroundColor,
  elevation = 2,
  padding = "px-4 py-3",
  constraints,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChanged?.(e.target.value);
  };

  const clear = () => {
    setValue("");
    onChanged?.("");
    inputRef.current?.focus();
  };

  const shadowMap: Record<number, string> = {
    0: "shadow-none",
    1: "shadow-sm",
    2: "shadow-md",
    4: "shadow-lg",
    8: "shadow-xl",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border",
        shadowMap[elevation] || "shadow-md",
        padding,
        className
      )}
      style={{
        backgroundColor: backgroundColor || "hsl(var(--card))",
        maxWidth: constraints?.maxWidth,
        minWidth: constraints?.minWidth,
      }}
      onClick={onTap}
    >
      {/* Leading icon */}
      <span className="text-muted-foreground shrink-0">
        {leading || (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && onSubmitted?.(value)}
        placeholder={hintText}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground/60 outline-none min-w-0"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={clear}
          className="text-muted-foreground hover:text-foreground transition shrink-0 rounded-full hover:bg-accent p-0.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Trailing actions */}
      {trailing?.map((t, i) => <span key={i} className="shrink-0">{t}</span>)}
    </div>
  );
}

// ─── SearchAnchor ─────────────────────────────────────────────────────────────
interface SearchAnchorProps {
  searchBar: React.ReactNode;
  suggestions: { label: string; value: string }[];
  onSelected?: (value: string) => void;
  className?: string;
}

export function SearchAnchor({ searchBar, suggestions, onSelected, className }: SearchAnchorProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = suggestions.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={cn("relative", className)}>
      <div onClick={() => setOpen(true)}>
        {React.cloneElement(searchBar as React.ReactElement, {
          onChanged: (v: string) => { setQuery(v); setOpen(true); },
        })}
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          {filtered.map((s) => (
            <button
              key={s.value}
              onClick={() => { onSelected?.(s.value); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
