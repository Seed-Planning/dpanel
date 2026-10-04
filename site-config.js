/**
 * Owner-editable settings. Use only approved URLs; blank means contact the office.
 * These values are delivered to every visitor. Never add credentials or secrets.
 * GitHub Pages is NOT made private by using a private repository or noindex.
 * This package contains internal PDFs. Keep the site AND docs access-controlled.
 * See the separate handover guide before any distribution.
 */
window.PANEL_SITE_CONFIG = Object.freeze({
  officeEmail: "dokupane@seedplanning.co.jp",
  updatedAt: "2026-10-04",
  links: Object.freeze({
    companyPortal: "",     // Optional: company portal URL.
    expense: "",           // Rakuraku Seisan URL. Blank: use existing company portal.
    screenRequest: "",     // Optional approved request form. Blank: office email.
    // PDF paths below are reference only. Edit the HTML hrefs for bundled PDFs.
    // PDF anchors are never rewritten by site.js or converted into mailto links.
    managementManual: "docs/panel-management-manual-v2.0-20260927.pdf",
    operationsManual: "docs/panel-system-operation-manual-v3.0.pdf",
    firstStepGuide: "docs/panel-distribution-first-step-guide-v1.0.pdf",
    operatingRules: "docs/panel-operating-rules-board-20260930.pdf",
    miniGuide: "docs/panel-mini-survey-internal-guide-v1.0-20261004.pdf" // Internal Mini Survey guide PDF.
  })
});
