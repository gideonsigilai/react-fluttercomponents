/**
 * intl.ts — Flutter `intl` package equivalent for React
 * Mirrors: DateFormat, NumberFormat, Intl.PluralRules
 */

// ─── DateFormat ───────────────────────────────────────────────────────────────
export class DateFormat {
  private formatStr: string;
  private locale: string;

  constructor(formatStr: string, locale: string = "en") {
    this.formatStr = formatStr;
    this.locale = locale;
  }

  format(date: Date): string {
    const pad = (n: number, len = 2) => String(n).padStart(len, "0");
    const d = date;

    const MONTHS_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const WEEKDAYS_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const WEEKDAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const hours24 = d.getHours();
    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 < 12 ? "AM" : "PM";

    return this.formatStr
      .replace("MMMM", MONTHS_FULL[d.getMonth()])
      .replace("MMM", MONTHS_SHORT[d.getMonth()])
      .replace("MM", pad(d.getMonth() + 1))
      .replace("M", String(d.getMonth() + 1))
      .replace("EEEE", WEEKDAYS_FULL[d.getDay()])
      .replace("EEE", WEEKDAYS_SHORT[d.getDay()])
      .replace("yyyy", String(d.getFullYear()))
      .replace("yy", String(d.getFullYear()).slice(-2))
      .replace("dd", pad(d.getDate()))
      .replace("d", String(d.getDate()))
      .replace("HH", pad(hours24))
      .replace("H", String(hours24))
      .replace("hh", pad(hours12))
      .replace("h", String(hours12))
      .replace("mm", pad(d.getMinutes()))
      .replace("ss", pad(d.getSeconds()))
      .replace("a", ampm)
      .replace("S", pad(d.getMilliseconds(), 3));
  }

  parse(input: string): Date {
    return new Date(input);
  }

  // Common preset factories
  static yMd(locale?: string) { return new DateFormat("M/d/yyyy", locale); }
  static yMMMd(locale?: string) { return new DateFormat("MMM d, yyyy", locale); }
  static yMMMMd(locale?: string) { return new DateFormat("MMMM d, yyyy", locale); }
  static yMMMEd(locale?: string) { return new DateFormat("EEE, MMM d, yyyy", locale); }
  static jm(locale?: string) { return new DateFormat("h:mm a", locale); }
  static Hm(locale?: string) { return new DateFormat("HH:mm", locale); }
  static jms(locale?: string) { return new DateFormat("h:mm:ss a", locale); }
  static MMMd(locale?: string) { return new DateFormat("MMM d", locale); }
  static EEEE(locale?: string) { return new DateFormat("EEEE", locale); }
  static LLLL(locale?: string) { return new DateFormat("MMMM", locale); }
}

// ─── NumberFormat ─────────────────────────────────────────────────────────────
export class NumberFormat {
  private options: Intl.NumberFormatOptions;
  private locale: string;
  private _prefix: string;
  private _suffix: string;

  constructor(options: Intl.NumberFormatOptions = {}, locale = "en", prefix = "", suffix = "") {
    this.options = options;
    this.locale = locale;
    this._prefix = prefix;
    this._suffix = suffix;
  }

  format(value: number): string {
    return this._prefix + new Intl.NumberFormat(this.locale, this.options).format(value) + this._suffix;
  }

  parse(input: string): number {
    return parseFloat(input.replace(/[^0-9.-]/g, ""));
  }

  // Preset factories
  static currency(symbol: string, locale = "en", decimalDigits = 2): NumberFormat {
    return new NumberFormat({
      style: "currency",
      currency: symbol,
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
    }, locale);
  }

  static decimalPattern(locale = "en"): NumberFormat {
    return new NumberFormat({ style: "decimal" }, locale);
  }

  static percentPattern(locale = "en"): NumberFormat {
    return new NumberFormat({ style: "percent", maximumFractionDigits: 1 }, locale);
  }

  static compact(locale = "en"): NumberFormat {
    return new NumberFormat({ notation: "compact" } as Intl.NumberFormatOptions, locale);
  }

  static compactCurrency(symbol: string, locale = "en"): NumberFormat {
    return new NumberFormat({
      style: "currency",
      currency: symbol,
      notation: "compact",
    } as Intl.NumberFormatOptions, locale);
  }

  static simpleCurrency(symbol: string, locale = "en", decimalDigits = 2): NumberFormat {
    return new NumberFormat({
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
    }, locale, symbol);
  }
}

// ─── Intl helpers (pluralization, etc.) ──────────────────────────────────────
export function plural(
  count: number,
  { zero, one, two, few, many, other }: {
    zero?: string; one?: string; two?: string;
    few?: string; many?: string; other: string;
  },
  locale = "en"
): string {
  const pr = new Intl.PluralRules(locale);
  const rule = pr.select(count);
  if (count === 0 && zero) return zero.replace("#", String(count));
  if (rule === "one" && one) return one.replace("#", String(count));
  if (rule === "two" && two) return two.replace("#", String(count));
  if (rule === "few" && few) return few.replace("#", String(count));
  if (rule === "many" && many) return many.replace("#", String(count));
  return other.replace("#", String(count));
}

export function select<K extends string>(
  value: K,
  options: Partial<Record<K, string>> & { other: string }
): string {
  return (options[value] ?? options.other);
}

// ─── RelativeTimeFormat ───────────────────────────────────────────────────────
export function timeAgo(date: Date, locale = "en"): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const now = Date.now();
  const diff = date.getTime() - now;
  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (Math.abs(seconds) < 60) return rtf.format(seconds, "second");
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  return rtf.format(days, "day");
}
