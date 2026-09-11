import { fetchQuotas } from "../../../lib/api/operators";
import { QuotaGauge } from "../../../components/charts";
import { PanelEmpty } from "./PanelStates";
import { t, formatNumber, formatPercent } from "../../../lib/i18n";

function generateSummary(used: number, limit: number, unit: string) {
  const ratio = limit > 0 ? used / limit : 0;
  const percentStr = formatPercent(ratio);
  let text = t("operators.quotaSummary", {
    used: formatNumber(used),
    limit: formatNumber(limit),
    unit,
    percent: percentStr,
  });
  if (ratio >= 0.8) {
    text += t("operators.quotaThresholdWarning");
  }
  return text;
}

export default async function QuotasPanel() {
  const data = await fetchQuotas();

  if (!data || Object.keys(data).length === 0) {
    return <PanelEmpty message={t("operators.noQuotaData")} />;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      <QuotaGauge
        title={t("operators.attestationQuota")}
        summary={generateSummary(data.attestation.used, data.attestation.limit, data.attestation.unit)}
        used={data.attestation.used}
        limit={data.attestation.limit}
        unit={data.attestation.unit}
      />
      <QuotaGauge
        title={t("operators.exportQuota")}
        summary={generateSummary(data.export.used, data.export.limit, data.export.unit)}
        used={data.export.used}
        limit={data.export.limit}
        unit={data.export.unit}
      />
    </div>
  );
}
