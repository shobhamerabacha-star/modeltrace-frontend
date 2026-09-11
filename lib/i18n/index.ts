/**
 * Internationalization Library (#80)
 *
 * Provides translation lookup, string interpolation, and re-exports formatting utilities.
 */

import { DEFAULT_LOCALE, isSupportedLocale } from "./config";
import { en, type MessageCatalogue } from "./messages/en";

export * from "./config";
export * from "./formatters";
export { en };

const catalogues: Record<string, Record<string, unknown>> = {
  en: en as unknown as Record<string, unknown>,
};

/**
 * Recursive path type for dot-notation keys.
 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type MessageKey = NestedKeyOf<MessageCatalogue>;

/**
 * Replace placeholders like "{name}" or "{count}" with corresponding parameter values.
 */
export function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{([a-zA-Z0-9_-]+)\}/g, (match, key) => {
    return key in params ? String(params[key]) : match;
  });
}

/**
 * Lookup a string by dot-notated key with optional interpolation parameters.
 * Falls back to English if the requested locale or key is missing.
 */
export function t(
  key: MessageKey | (string & Record<never, never>),
  params?: Record<string, string | number>,
  locale: string = DEFAULT_LOCALE,
): string {
  const activeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const catalogue = catalogues[activeLocale] ?? catalogues[DEFAULT_LOCALE];

  const keys = key.split(".");
  let current: unknown = catalogue;

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      current = undefined;
      break;
    }
  }

  // Fallback to English if not found in active locale
  if (typeof current !== "string" && activeLocale !== DEFAULT_LOCALE) {
    let fallback: unknown = catalogues[DEFAULT_LOCALE];
    for (const k of keys) {
      if (fallback && typeof fallback === "object" && k in fallback) {
        fallback = (fallback as Record<string, unknown>)[k];
      } else {
        fallback = undefined;
        break;
      }
    }
    if (typeof fallback === "string") {
      current = fallback;
    }
  }

  if (typeof current === "string") {
    return interpolate(current, params);
  }

  // Return the key itself as safe fallback if missing
  return key;
}
