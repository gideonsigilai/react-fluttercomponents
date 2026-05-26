import React, { useState, useRef } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FormFieldState<T = string> {
  value: T;
  errorText: string | null;
  isDirty: boolean;
  isValid: boolean;
}

type ValidatorFn<T = string> = (value: T) => string | null;

interface TextFormFieldProps {
  label?: string;
  hintText?: string;
  helperText?: string;
  initialValue?: string;
  validator?: ValidatorFn;
  onChanged?: (value: string) => void;
  onSaved?: (value: string) => void;
  obscureText?: boolean;
  keyboardType?: "text" | "email" | "number" | "tel" | "url" | "multiline";
  maxLines?: number;
  maxLength?: number;
  enabled?: boolean;
  readOnly?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  decoration?: "outline" | "filled" | "underline";
  className?: string;
  name?: string;
}

// ─── TextFormField ────────────────────────────────────────────────────────────
export function TextFormField({
  label,
  hintText,
  helperText,
  initialValue = "",
  validator,
  onChanged,
  onSaved,
  obscureText = false,
  keyboardType = "text",
  maxLines = 1,
  maxLength,
  enabled = true,
  readOnly = false,
  prefix,
  suffix,
  prefixIcon,
  suffixIcon,
  decoration = "outline",
  className,
  name,
}: TextFormFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const validate = (v: string) => {
    const err = validator?.(v) ?? null;
    setError(err);
    return err;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValue(v);
    onChanged?.(v);
    if (touched) validate(v);
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    validate(value);
    onSaved?.(value);
  };

  const inputType = obscureText
    ? "password"
    : keyboardType === "email" ? "email"
    : keyboardType === "number" ? "number"
    : keyboardType === "tel" ? "tel"
    : keyboardType === "url" ? "url"
    : "text";

  const borderStyle =
    decoration === "filled"
      ? "border-0 border-b-2 rounded-t-lg rounded-b-none bg-accent/40"
      : decoration === "underline"
      ? "border-0 border-b-2 rounded-none bg-transparent"
      : "border rounded-xl bg-card";

  const borderColor = error
    ? "border-red-500"
    : focused
    ? "border-primary"
    : "border-border";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label className={cn("text-xs font-semibold", error ? "text-red-500" : focused ? "text-primary" : "text-muted-foreground")}>
          {label}
        </label>
      )}

      <div className={cn("flex items-center gap-2 px-3 py-2.5 transition-all", borderStyle, borderColor)}>
        {prefixIcon && <span className="text-muted-foreground shrink-0">{prefixIcon}</span>}
        {prefix && <span className="text-muted-foreground text-xs shrink-0">{prefix}</span>}

        {maxLines > 1 ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            placeholder={hintText}
            maxLength={maxLength}
            disabled={!enabled}
            readOnly={readOnly}
            rows={maxLines}
            className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground/60 outline-none resize-none"
          />
        ) : (
          <input
            name={name}
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            placeholder={hintText}
            maxLength={maxLength}
            disabled={!enabled}
            readOnly={readOnly}
            className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground/60 outline-none"
          />
        )}

        {suffix && <span className="text-muted-foreground text-xs shrink-0">{suffix}</span>}
        {suffixIcon && <span className="text-muted-foreground shrink-0">{suffixIcon}</span>}
      </div>

      {(error || helperText) && (
        <p className={cn("text-[11px] px-1", error ? "text-red-500" : "text-muted-foreground")}>
          {error ?? helperText}
        </p>
      )}
      {maxLength && (
        <p className="text-[10px] text-muted-foreground text-right px-1">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
interface FormProps {
  children: React.ReactNode;
  onSubmit?: (data: FormData) => void;
  className?: string;
}

export function Form({ children, onSubmit, className }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const data = new FormData(e.currentTarget);
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", className)} noValidate>
      {children}
    </form>
  );
}
