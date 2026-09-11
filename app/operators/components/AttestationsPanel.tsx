import { fetchRecentAttestations } from "../../../lib/api/operators";
import { PanelEmpty } from "./PanelStates";
import { t, formatTime, formatNumber } from "../../../lib/i18n";

export default async function AttestationsPanel() {
  const { attestations } = await fetchRecentAttestations();

  if (!attestations || attestations.length === 0) {
    return <PanelEmpty message={t("operators.noRecentAttestations")} />;
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "18px 18px 0" }}>
        <h3 style={{ margin: "0 0 8px" }}>{t("operators.recentAttestationsTitle")}</h3>
        <p style={{ color: "var(--muted)", margin: "0 0 16px", fontSize: "0.9rem" }}>
          {t("operators.recentAttestationsDesc")}
        </p>
      </div>
      <div className="site-map" style={{ paddingTop: 0, borderTop: "none", overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("operators.table.time")}</th>
              <th>{t("operators.table.model")}</th>
              <th>{t("operators.table.payer")}</th>
              <th>{t("operators.table.tokens")}</th>
              <th>{t("operators.table.transaction")}</th>
            </tr>
          </thead>
          <tbody>
            {attestations.map((att) => (
              <tr key={att.id}>
                <td>{formatTime(att.timestamp)}</td>
                <td>{att.model}</td>
                <td>{att.payer}</td>
                <td>{formatNumber(att.tokens)}</td>
                <td>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${att.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "underline" }}
                  >
                    {att.txHash.substring(0, 8)}...
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
