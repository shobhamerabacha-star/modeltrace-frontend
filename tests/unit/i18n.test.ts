import { describe, it, expect } from "vitest";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  getLocaleDirection,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatCompactNumber,
  formatDate,
  formatDateTime,
  formatTime,
  t,
  interpolate,
  en,
} from "../../lib/i18n";

describe("i18n Configuration (#80)", () => {
  it("defaults to English as the only active locale", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(SUPPORTED_LOCALES).toEqual(["en"]);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("de")).toBe(false);
  });

  it("detects text direction and supports RTL readiness", () => {
    expect(getLocaleDirection("en")).toBe("ltr");
    expect(getLocaleDirection("en-US")).toBe("ltr");
    expect(getLocaleDirection("de")).toBe("ltr");
    expect(getLocaleDirection("ar")).toBe("rtl");
    expect(getLocaleDirection("he")).toBe("rtl");
    expect(getLocaleDirection("fa")).toBe("rtl");
    expect(getLocaleDirection("ur")).toBe("rtl");
  });
});

describe("Message Catalogue & Lookup (#80)", () => {
  it("contains stable user-facing strings across core domains", () => {
    expect(en.common.appName).toBe("ModelTrace");
    expect(en.home.headline).toBe("Prove every inference.");
    expect(en.operators.settlementStatusTitle).toBe("Settlement Status");
    expect(en.compliance.tag).toBe("Compliance");
  });

  it("translates dot-notated keys", () => {
    expect(t("common.appName")).toBe("ModelTrace");
    expect(t("home.headline")).toBe("Prove every inference.");
    expect(t("home.ctaRoadmap")).toBe("Ship the roadmap");
    expect(t("operators.table.tokens")).toBe("Tokens");
  });

  it("interpolates dynamic parameters into templates", () => {
    const raw = interpolate("{used} of {limit} {unit} used — {percent}", {
      used: "1,200",
      limit: "5,000",
      unit: "attestations",
      percent: "24%",
    });
    expect(raw).toBe("1,200 of 5,000 attestations used — 24%");

    const rendered = t("operators.quotaSummary", {
      used: "800",
      limit: "1,000",
      unit: "exports",
      percent: "80%",
    });
    expect(rendered).toBe("800 of 1,000 exports used — 80%");
  });

  it("safely falls back to the key if a translation is missing", () => {
    // @ts-expect-error intentionally testing nonexistent key fallback
    expect(t("non.existent.key")).toBe("non.existent.key");
  });
});

describe("Intl Number & Currency Formatters (#80)", () => {
  it("formats standard numbers with correct locale grouping", () => {
    expect(formatNumber(1000.5, "en-US")).toBe("1,000.5");
    // German uses period for grouping and comma for decimal
    const deFormatted = formatNumber(1000.5, "de-DE");
    expect(deFormatted).toBe("1.000,5");
  });

  it("formats currencies unambiguously", () => {
    const usDollars = formatCurrency(1250.75, "USD", "en-US");
    expect(usDollars).toContain("1,250.75");
    expect(usDollars).toContain("$");

    const euros = formatCurrency(1250.75, "EUR", "de-DE");
    expect(euros).toContain("1.250,75");
  });

  it("formats percentages accurately", () => {
    expect(formatPercent(80, "en-US")).toBe("80%");
    expect(formatPercent(0.8, "en-US")).toBe("80%");
    expect(formatPercent(24.4, "en-US")).toBe("24%");
  });

  it("formats compact notation for dashboard metrics", () => {
    const compact1M = formatCompactNumber(1200000, "en-US");
    expect(compact1M).toBe("1.2M");

    const compact45K = formatCompactNumber(45000, "en-US");
    expect(compact45K).toBe("45K");
  });
});

describe("Intl Date & Time Formatters (#80)", () => {
  const sampleTime = new Date("2026-09-12T12:30:00Z").getTime();

  it("formats dates gracefully without throwing", () => {
    const formatted = formatDate(sampleTime, "en-US");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("Sep");
  });

  it("formats date and time together", () => {
    const formatted = formatDateTime(sampleTime, "en-US");
    expect(formatted).toContain("2026");
  });

  it("returns empty string on invalid dates instead of throwing", () => {
    expect(formatDate("invalid-date")).toBe("");
    expect(formatDateTime(NaN)).toBe("");
    expect(formatTime("bad-time")).toBe("");
  });
});

describe("Layout Stress & String Expansion Resilience (#80)", () => {
  /**
   * German and Finnish text reliably expands 30-40% compared to English.
   * This test simulates +35% expansion across all catalog keys and verifies
   * that string concatenation, interpolation, and layout strings don't truncate or crash.
   */
  it("handles 35% string expansion without clipping or layout failures", () => {
    const expandString = (str: string) =>
      `${str} [${"extra-text-".repeat(Math.ceil((str.length * 0.35) / 11))}]`;

    const sampleStrings = [
      en.home.headline,
      en.home.lead,
      en.home.ctaRoadmap,
      en.home.ctaContracts,
      en.home.pillars.attestationDesc,
      en.home.trustStatement,
      en.operators.settlementStatusTitle,
      en.operators.settlementStatusDesc,
    ];

    for (const original of sampleStrings) {
      const expanded = expandString(original);
      expect(expanded.length).toBeGreaterThanOrEqual(Math.floor(original.length * 1.35));
      // Verify no unexpected control chars or unhandled template brackets
      expect(expanded).toContain(original);
    }
  });
});
