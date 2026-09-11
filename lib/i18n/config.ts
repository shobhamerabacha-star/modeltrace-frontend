/**
 * Internationalization Configuration (#80)
 *
 * Prepares the application for internationalization:
 * - English is currently the only active/supported locale.
 * - Architecture supports adding future locales (de, fi, es, etc.) without refactoring.
 * - Direction detection supports LTR and RTL scripts.
 */

export const DEFAULT_LOCALE = "en" as const;

export const SUPPORTED_LOCALES = ["en"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export type TextDirection = "ltr" | "rtl";

/**
 * Direction lookup by language code prefix.
 * Keeps the door open for Right-to-Left languages (Arabic, Hebrew, Persian, Urdu).
 */
export const RTL_LOCALES = new Set(["ar", "he", "fa", "ur"]);

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function getLocaleDirection(locale: string): TextDirection {
  const lang = locale.split(/[-_]/)[0]?.toLowerCase() ?? "";
  return RTL_LOCALES.has(lang) ? "rtl" : "ltr";
}
