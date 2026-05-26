/**
 * currency-format.ts — Currency formatting utilities
 * Inspired by Flutter's NumberFormat.currency and intl package
 */

// ─── Currency symbols map ─────────────────────────────────────────────────────
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥",
  KES: "KSh", NGN: "₦", GHS: "₵", ZAR: "R", EGP: "£",
  INR: "₹", BRL: "R$", AUD: "A$", CAD: "C$", CHF: "Fr",
  MXN: "MX$", SEK: "kr", NOK: "kr", DKK: "kr", PLN: "zł",
  RUB: "₽", TRY: "₺", AED: "د.إ", SAR: "﷼", THB: "฿",
  PHP: "₱", IDR: "Rp", MYR: "RM", VND: "₫", TWD: "NT$",
  HKD: "HK$", SGD: "S$", NZD: "NZ$", CZK: "Kč", HUF: "Ft",
  ILS: "₪", CLP: "$", COP: "$", PEN: "S/", UYU: "$",
  KRW: "₩", PKR: "₨", BDT: "৳", LKR: "₨", MMK: "K",
};

// ─── formatCurrency ───────────────────────────────────────────────────────────
export interface CurrencyFormatOptions {
  currencyCode?: string;
  locale?: string;
  decimalDigits?: number;
  symbol?: string;
  symbolPlacement?: "before" | "after";
  thousandsSeparator?: string;
  decimalSeparator?: string;
  compact?: boolean;
  showSymbol?: boolean;
}

export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    currencyCode = "USD",
    locale = "en",
    decimalDigits = 2,
    symbol,
    compact = false,
    showSymbol = true,
  } = options;

  const sym = symbol ?? CURRENCY_SYMBOLS[currencyCode] ?? currencyCode;

  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
      notation: compact ? "compact" : "standard",
    } as Intl.NumberFormatOptions).format(amount);

    if (!showSymbol) {
      return formatted.replace(/[^0-9.,\s]/g, "").trim();
    }

    return formatted;
  } catch {
    // Fallback
    const abs = Math.abs(amount);
    const fixed = abs.toFixed(decimalDigits);
    const [int, dec] = fixed.split(".");
    const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const result = dec ? `${intFormatted}.${dec}` : intFormatted;
    const signed = amount < 0 ? `-${sym}${result}` : `${sym}${result}`;
    return signed;
  }
}

// ─── parseCurrency ────────────────────────────────────────────────────────────
export function parseCurrency(input: string): number {
  const cleaned = input.replace(/[^0-9.-]/g, "");
  return parseFloat(cleaned) || 0;
}

// ─── formatCompact ────────────────────────────────────────────────────────────
export function formatCompact(amount: number, locale = "en"): string {
  return new Intl.NumberFormat(locale, { notation: "compact" } as Intl.NumberFormatOptions).format(amount);
}

// ─── formatCurrencyCompact ────────────────────────────────────────────────────
export function formatCurrencyCompact(amount: number, currencyCode = "USD", locale = "en"): string {
  return formatCurrency(amount, { currencyCode, locale, compact: true });
}

// ─── Accounting-style formatting ──────────────────────────────────────────────
export function formatAccounting(amount: number, currencyCode = "USD", locale = "en"): string {
  if (amount < 0) {
    return `(${formatCurrency(Math.abs(amount), { currencyCode, locale })})`;
  }
  return formatCurrency(amount, { currencyCode, locale });
}

// ─── CurrencyFormatter class ──────────────────────────────────────────────────
export class CurrencyFormatter {
  private options: CurrencyFormatOptions;

  constructor(options: CurrencyFormatOptions = {}) {
    this.options = options;
  }

  format(amount: number): string {
    return formatCurrency(amount, this.options);
  }

  parse(input: string): number {
    return parseCurrency(input);
  }

  withCurrency(currencyCode: string): CurrencyFormatter {
    return new CurrencyFormatter({ ...this.options, currencyCode });
  }

  withLocale(locale: string): CurrencyFormatter {
    return new CurrencyFormatter({ ...this.options, locale });
  }

  withDecimals(decimalDigits: number): CurrencyFormatter {
    return new CurrencyFormatter({ ...this.options, decimalDigits });
  }

  static usd(locale = "en") { return new CurrencyFormatter({ currencyCode: "USD", locale }); }
  static eur(locale = "de") { return new CurrencyFormatter({ currencyCode: "EUR", locale }); }
  static gbp(locale = "en-GB") { return new CurrencyFormatter({ currencyCode: "GBP", locale }); }
  static jpy(locale = "ja") { return new CurrencyFormatter({ currencyCode: "JPY", locale, decimalDigits: 0 }); }
  static kes(locale = "sw") { return new CurrencyFormatter({ currencyCode: "KES", locale }); }
  static ngn(locale = "en-NG") { return new CurrencyFormatter({ currencyCode: "NGN", locale }); }
  static inr(locale = "hi") { return new CurrencyFormatter({ currencyCode: "INR", locale }); }
}
