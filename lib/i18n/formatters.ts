/**
 * Internationalization Formatters (#80)
 *
 * Provides standardized formatting via the standard JavaScript `Intl` API
 * for numbers, currency, percentages, dates, and times.
 *
 * Avoids ambiguous hand-formatted values (such as "1,000.50" vs "1.000,50"
 * in financial/billing exports) and respects active locale conventions.
 */

import { DEFAULT_LOCALE } from "./config";

/**
 * Format a number using standard `Intl.NumberFormat`.
 */
export function formatNumber(
  value: number | bigint,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions,
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return new Intl.NumberFormat(DEFAULT_LOCALE, options).format(value);
  }
}

/**
 * Format a currency amount with currency code (e.g. USD, EUR, XLM).
 */
export function formatCurrency(
  amount: number | bigint,
  currency = "USD",
  locale: string = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      ...options,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: "currency",
      currency: "USD",
      ...options,
    }).format(amount);
  }
}

/**
 * Format a percentage value (0 to 100 or 0 to 1 depending on style).
 * Defaults to 0..100 input with 0 to 1 fraction digits.
 */
export function formatPercent(
  value: number,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions,
): string {
  try {
    // Standard Intl expects 0.8 for 80%. If input is > 1 (e.g. 80), normalize to 0.8
    const ratio = value > 1 ? value / 100 : value;
    return new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
      ...options,
    }).format(ratio);
  } catch {
    return `${Math.round(value)}%`;
  }
}

/**
 * Format a compact number representation (e.g., 1.2M, 45K) for dashboard metrics.
 */
export function formatCompactNumber(
  value: number | bigint,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
      ...options,
    }).format(value);
  } catch {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      notation: "compact",
      maximumFractionDigits: 1,
      ...options,
    }).format(value);
  }
}

/**
 * Format a date using `Intl.DateTimeFormat`.
 */
export function formatDate(
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
  } catch {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, defaultOptions).format(d);
  }
}

/**
 * Format date and time together.
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
  } catch {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, defaultOptions).format(d);
  }
}

/**
 * Format time only.
 */
export function formatTime(
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
  } catch {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, defaultOptions).format(d);
  }
}
