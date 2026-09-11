/**
 * English Message Catalogue (#80)
 *
 * All user-facing strings extracted into stable, hierarchical keys.
 * Serves as the canonical source for all current and future translations.
 */

export const en = {
  common: {
    appName: "ModelTrace",
    tagline: "Stellar · Soroban · AI governance",
    description: "Verifiable AI inference accounting on Stellar.",
    skipToContent: "Skip to content",
    viewSource: "View source on GitHub",
    footerText: "ModelTrace — verifiable AI inference accounting on Stellar.",
    nav: {
      product: "Product",
      contracts: "Contracts",
      compliance: "Compliance",
      operators: "Operators",
      docs: "Docs",
      roadmap: "Roadmap",
      contributors: "Contributors",
      explore: "Explore",
    },
    actions: {
      connect: "Connect Wallet",
      disconnect: "Disconnect",
      close: "Close",
      submit: "Submit",
      cancel: "Cancel",
      download: "Download",
      retry: "Try again",
    },
  },
  home: {
    headline: "Prove every inference.",
    lead: "ModelTrace turns AI usage into attested facts on-chain: which model ran, under which policy, and what it costs—so procurement, finance, and auditors share one neutral layer.",
    ctaRoadmap: "Ship the roadmap",
    ctaContracts: "Read the contracts story",
    stats: {
      metered: "Metered settlement",
      escrow: "Dispute-ready escrow",
      audit: "Export-grade audit trails",
    },
    pillarsHeading: "What ModelTrace provides",
    pillars: {
      attestationTitle: "Attestation rail",
      attestationDesc: "Signed inference events tied to tiers—your billing disputes shrink.",
      settlementTitle: "Settlement logic",
      settlementDesc: "Soroban payment-router patterns built for fast finality on Stellar.",
      uxTitle: "Operator-ready UX",
      uxDesc: "Roadmap toward dashboards gateways and enterprises actually adopt.",
    },
    trustStatement: "Built for teams who sell or buy inference at scale—and cannot afford black-box invoices.",
  },
  operators: {
    settlementStatusTitle: "Settlement Status",
    settlementStatusDesc: "Overview of token flows across escrow contracts.",
    noSettlementActivity: "No settlement activity to display.",
    escrowed: "Escrowed",
    disputed: "Disputed",
    released: "Released",
    attestationQuota: "Attestation quota",
    exportQuota: "Export quota",
    noQuotaData: "No quota data available.",
    quotaSummary: "{used} of {limit} {unit} used — {percent}",
    quotaThresholdWarning: ", past the 80% warning threshold.",
    recentAttestationsTitle: "Recent Attestations",
    recentAttestationsDesc: "The latest validated inferences stored on-chain.",
    noRecentAttestations: "No recent attestations.",
    noUsageData: "No usage data recorded yet.",
    table: {
      time: "Time",
      model: "Model",
      payer: "Payer",
      tokens: "Tokens",
      transaction: "Transaction",
    },
  },
  compliance: {
    tag: "Compliance",
    headline: "Cryptographic Audit Trails for AI",
    lead: "Verifiable lineage, GDPR-compliant data residency, and deterministic evidence for enterprise AI consumption.",
    evidenceModelHeading: "The Evidence Model",
    sampleAuditExportHeading: "Sample Audit Export",
    sampleAuditDesc: "What a compliance officer actually sees. Download a sample export below to review the schema and artifact format natively used by ModelTrace.",
    downloadCsv: "Download CSV",
    independentVerificationHeading: "Independent Verification",
  },
  errors: {
    genericTitle: "Something went wrong",
    genericMessage: "An unexpected error occurred while rendering this component.",
    notFoundTitle: "Page Not Found",
    notFoundMessage: "The page you are looking for does not exist or has been moved.",
    reload: "Reload page",
  },
} as const;

export type MessageCatalogue = typeof en;
