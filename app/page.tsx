import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ExpectedPages } from "@/components/expected-pages";
import { t } from "@/lib/i18n";

export default function HomePage() {
  return (
    <>
      <section className="landing-hero">
        <div className="landing-orbs" aria-hidden />
        <div className="landing-hero-inner">
          <BrandLogo className="landing-logo" aria-label="ModelTrace logo" />
          <span className="tag">{t("common.tagline")}</span>
          <h1 className="hero-headline">{t("home.headline")}</h1>
          <p className="landing-lead">
            {t("home.lead")}
          </p>
          <div className="landing-cta-row">
            <Link href="/roadmap" className="cta">{t("home.ctaRoadmap")}</Link>
            <Link href="/contracts" className="cta-secondary">{t("home.ctaContracts")}</Link>
          </div>
          <ul className="landing-stats">
            <li>{t("home.stats.metered")}</li>
            <li>{t("home.stats.escrow")}</li>
            <li>{t("home.stats.audit")}</li>
          </ul>
        </div>
      </section>

      <section className="landing-pillars" aria-labelledby="pillars-heading">
        <h2 className="visually-hidden" id="pillars-heading">
          {t("home.pillarsHeading")}
        </h2>
        <article className="landing-pillar">
          <div className="landing-pillar-icon" aria-hidden>◆</div>
          <h3>{t("home.pillars.attestationTitle")}</h3>
          <p>{t("home.pillars.attestationDesc")}</p>
        </article>
        <article className="landing-pillar">
          <div className="landing-pillar-icon" aria-hidden>◇</div>
          <h3>{t("home.pillars.settlementTitle")}</h3>
          <p>{t("home.pillars.settlementDesc")}</p>
        </article>
        <article className="landing-pillar">
          <div className="landing-pillar-icon" aria-hidden>○</div>
          <h3>{t("home.pillars.uxTitle")}</h3>
          <p>{t("home.pillars.uxDesc")}</p>
        </article>
      </section>

      <p className="landing-trust">{t("home.trustStatement")}</p>

      <ExpectedPages />
    </>
  );
}
