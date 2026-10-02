/**
 * Owner-editable settings. Use only approved URLs; blank means contact the office.
 * These values are delivered to every visitor. Never add credentials or secrets.
 * GitHub Pages is NOT made private by using a private repository or noindex.
 * See the separate handover guide before publishing.
 */
window.PANEL_SITE_CONFIG = Object.freeze({
  officeEmail: "dokupane@seedplanning.co.jp",
  updatedAt: "2026-10-02",
  links: Object.freeze({
    companyPortal: "",     // Optional: company portal URL.
    expense: "",           // Rakuraku Seisan URL. Blank: use existing company portal.
    screenRequest: "",     // Optional approved request form. Blank: office email.
    operationsManual: "",  // Protected internal manual link. Do not upload the file here.
    operatingRules: "",    // Protected internal operating-rules link.
    miniGuide: ""          // Protected internal Mini Survey guide link.
  })
});
