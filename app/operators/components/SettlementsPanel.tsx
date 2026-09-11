import { fetchSettlements } from "../../../lib/api/operators";
import { PanelEmpty } from "./PanelStates";
import { t, formatCompactNumber } from "../../../lib/i18n";

export default async function SettlementsPanel() {
  const data = await fetchSettlements();

  if (data.escrowed === 0 && data.disputed === 0 && data.released === 0) {
    return <PanelEmpty message={t("operators.noSettlementActivity")} />;
  }

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 8px" }}>{t("operators.settlementStatusTitle")}</h3>
      <p style={{ color: "var(--muted)", margin: "0 0 16px", fontSize: "0.9rem" }}>
        {t("operators.settlementStatusDesc")}
      </p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12, textAlign: "center", borderTop: "1px solid color-mix(in srgb, var(--accent) 15%, transparent)", paddingTop: 16 }}>
        <div>
          <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("operators.escrowed")}</p>
          <strong style={{ fontSize: "1.5rem" }}>{formatCompactNumber(data.escrowed)}</strong>
        </div>
        <div>
          <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("operators.disputed")}</p>
          <strong style={{ fontSize: "1.5rem", color: "color-mix(in srgb, orange 90%, white)" }}>{formatCompactNumber(data.disputed)}</strong>
        </div>
        <div>
          <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("operators.released")}</p>
          <strong style={{ fontSize: "1.5rem", color: "color-mix(in srgb, var(--accent-2) 90%, white)" }}>{formatCompactNumber(data.released)}</strong>
        </div>
      </div>
    </div>
  );
}
