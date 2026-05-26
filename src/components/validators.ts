/**
 * validators.ts — Flutter form validators equivalent for React
 * Mirrors: Flutter's validator pattern (returns null if valid, string if invalid)
 */

export type ValidatorFn<T = string> = (value: T) => string | null;

// ─── Basic validators ─────────────────────────────────────────────────────────
export function required(message = "This field is required"): ValidatorFn {
  return (value: string) => {
    if (!value || value.trim() === "") return message;
    return null;
  };
}

export function minLength(min: number, message?: string): ValidatorFn {
  return (value: string) => {
    if (value.length < min) return message ?? `Must be at least ${min} characters`;
    return null;
  };
}

export function maxLength(max: number, message?: string): ValidatorFn {
  return (value: string) => {
    if (value.length > max) return message ?? `Must be at most ${max} characters`;
    return null;
  };
}

export function exactLength(length: number, message?: string): ValidatorFn {
  return (value: string) => {
    if (value.length !== length) return message ?? `Must be exactly ${length} characters`;
    return null;
  };
}

// ─── Format validators ────────────────────────────────────────────────────────
export function emailValidator(message = "Enter a valid email address"): ValidatorFn {
  return (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return message;
    return null;
  };
}

export function phoneValidator(message = "Enter a valid phone number"): ValidatorFn {
  return (value: string) => {
    const cleaned = value.replace(/[\s\-().+]/g, "");
    if (!/^\d{7,15}$/.test(cleaned)) return message;
    return null;
  };
}

export function urlValidator(message = "Enter a valid URL"): ValidatorFn {
  return (value: string) => {
    try {
      const u = new URL(value);
      if (!["http:", "https:"].includes(u.protocol)) return message;
      return null;
    } catch {
      return message;
    }
  };
}

export function numericValidator(message = "Must be a number"): ValidatorFn {
  return (value: string) => {
    if (isNaN(Number(value)) || value.trim() === "") return message;
    return null;
  };
}

export function integerValidator(message = "Must be an integer"): ValidatorFn {
  return (value: string) => {
    if (!/^-?\d+$/.test(value.trim())) return message;
    return null;
  };
}

// ─── Range validators ─────────────────────────────────────────────────────────
export function min(minVal: number, message?: string): ValidatorFn {
  return (value: string) => {
    const n = Number(value);
    if (isNaN(n) || n < minVal) return message ?? `Must be at least ${minVal}`;
    return null;
  };
}

export function max(maxVal: number, message?: string): ValidatorFn {
  return (value: string) => {
    const n = Number(value);
    if (isNaN(n) || n > maxVal) return message ?? `Must be at most ${maxVal}`;
    return null;
  };
}

export function range(minVal: number, maxVal: number, message?: string): ValidatorFn {
  return (value: string) => {
    const n = Number(value);
    if (isNaN(n) || n < minVal || n > maxVal)
      return message ?? `Must be between ${minVal} and ${maxVal}`;
    return null;
  };
}

// ─── Pattern validators ───────────────────────────────────────────────────────
export function pattern(regex: RegExp, message = "Invalid format"): ValidatorFn {
  return (value: string) => {
    if (!regex.test(value)) return message;
    return null;
  };
}

export function alphaOnly(message = "Only letters are allowed"): ValidatorFn {
  return pattern(/^[a-zA-Z]+$/, message);
}

export function alphanumeric(message = "Only letters and numbers are allowed"): ValidatorFn {
  return pattern(/^[a-zA-Z0-9]+$/, message);
}

export function noWhitespace(message = "Spaces are not allowed"): ValidatorFn {
  return (value: string) => {
    if (/\s/.test(value)) return message;
    return null;
  };
}

// ─── Password validators ──────────────────────────────────────────────────────
export function passwordStrength(
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecial?: boolean;
  } = {}
): ValidatorFn {
  const {
    minLength: ml = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecial = false,
  } = options;

  return (value: string) => {
    if (value.length < ml) return `Password must be at least ${ml} characters`;
    if (requireUppercase && !/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
    if (requireLowercase && !/[a-z]/.test(value)) return "Password must contain a lowercase letter";
    if (requireNumbers && !/[0-9]/.test(value)) return "Password must contain a number";
    if (requireSpecial && !/[^a-zA-Z0-9]/.test(value)) return "Password must contain a special character";
    return null;
  };
}

export function mustMatch(matchValue: string, message = "Values do not match"): ValidatorFn {
  return (value: string) => {
    if (value !== matchValue) return message;
    return null;
  };
}

// ─── Compose validators ───────────────────────────────────────────────────────
/** Run validators in sequence, return first error found */
export function compose<T = string>(...validators: ValidatorFn<T>[]): ValidatorFn<T> {
  return (value: T) => {
    for (const v of validators) {
      const err = v(value);
      if (err !== null) return err;
    }
    return null;
  };
}

/** Run all validators and collect all errors */
export function composeAll<T = string>(...validators: ValidatorFn<T>[]): (value: T) => string[] {
  return (value: T) => validators.map((v) => v(value)).filter((e) => e !== null) as string[];
}
