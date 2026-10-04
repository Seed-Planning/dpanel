/* Plain JavaScript, no frameworks, storage, tracking, APIs, or automatic email sending. */
(() => {
  "use strict";
  document.body.classList.add("js");
  const source = window.PANEL_SITE_CONFIG || {};
  const defaultEmail = "dokupane@seedplanning.co.jp";
  const validEmail = (v) => typeof v === "string" && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
  const email = validEmail(source.officeEmail) ? source.officeEmail : defaultEmail;
  const links = source.links && typeof source.links === "object" ? source.links : {};
  const defaultSubject = "\u3010\u30c9\u30af\u30bf\u30fc\u30d1\u30cd\u30eb\u76f8\u8ac7\u3011";
  const greeting = "\u30c9\u30af\u30bf\u30fc\u30d1\u30cd\u30eb\u4e8b\u52d9\u5c40 \u3054\u62c5\u5f53\u8005\u69d8\r\n\r\n";
  const commonFields = "\u30fb\u6848\u4ef6\u540d\uff08\u672a\u5b9a\u3067\u3082\u53ef\uff09\uff1a\r\n\u30fb\u5bfe\u8c61\u8005\u30fb\u53c2\u52a0\u6761\u4ef6\uff1a\r\n\u30fb\u5e0c\u671b\u4eba\u6570\uff1a\r\n\u30fb\u5e0c\u671b\u6642\u671f\uff1a\r\n\u30fb\u3054\u76f8\u8ac7\u5185\u5bb9\uff1a\r\n";
  const topics = {
    general: {subject: "\u5229\u7528\u306b\u3064\u3044\u3066", body: greeting + "\u4ee5\u4e0b\u306e\u6848\u4ef6\u306b\u3064\u3044\u3066\u76f8\u8ac7\u3055\u305b\u3066\u304f\u3060\u3055\u3044\u3002\r\n\r\n" + commonFields},
    feasibility: {subject: "\u56de\u53ce\u898b\u8fbc\u307f\u306e\u78ba\u8a8d", body: greeting + "\u4ee5\u4e0b\u306e\u6761\u4ef6\u3067\u3001\u56de\u53ce\u898b\u8fbc\u307f\u3092\u78ba\u8a8d\u3057\u305f\u304f\u3054\u9023\u7d61\u3057\u307e\u3057\u305f\u3002\r\n\r\n" + commonFields + "\u30fb\u8abf\u67fb\u65b9\u6cd5\u30fb\u6240\u8981\u6642\u9593\uff1a\r\n"},
    application: {subject: "\u697d\u697d\u7cbe\u7b97\u3067\u306e\u5229\u7528\u7533\u8acb", body: greeting + "\u30c9\u30af\u30bf\u30fc\u30d1\u30cd\u30eb\u306e\u5229\u7528\u7533\u8acb\u306b\u3064\u3044\u3066\u3001\u624b\u7d9a\u304d\u3092\u78ba\u8a8d\u3055\u305b\u3066\u304f\u3060\u3055\u3044\u3002\r\n\r\n\u30fb\u6848\u4ef6\u540d\uff1a\r\n\u30fb\u78ba\u8a8d\u3057\u305f\u3044\u5185\u5bb9\uff1a\r\n"},
    web: {subject: "Web\u753b\u9762\u4f5c\u6210\u306e\u76f8\u8ac7", body: greeting + "\u8abf\u67fb\u7968\u306eWeb\u753b\u9762\u4f5c\u6210\u306b\u3064\u3044\u3066\u76f8\u8ac7\u3055\u305b\u3066\u304f\u3060\u3055\u3044\u3002\r\n\r\n" + commonFields + "\u30fb\u8abf\u67fb\u7968\u306e\u6e96\u5099\u72b6\u6cc1\uff1a\r\n\u30fb\u5e0c\u671b\u3059\u308b\u753b\u9762\u78ba\u8a8d\u65e5\uff1a\r\n"},
    mini: {subject: "\u7c21\u6613\u8abf\u67fb\u306e\u76f8\u8ac7", body: greeting + "\u7c21\u6613\u8abf\u67fb\u306e\u5229\u7528\u306b\u3064\u3044\u3066\u76f8\u8ac7\u3055\u305b\u3066\u304f\u3060\u3055\u3044\u3002\r\n\r\n" + commonFields + "\u30fb\u77e5\u308a\u305f\u3044\u3053\u3068\u30fb\u8a2d\u554f\u306e\u6848\uff1a\r\n"}
  };
  const docs = {
    managementManual: "運用・管理マニュアル",
    firstStepGuide: "配信権限者ファーストステップガイド",
    operationsManual: "\u64cd\u4f5c\u30de\u30cb\u30e5\u30a2\u30eb",
    operatingRules: "\u904b\u7528\u30eb\u30fc\u30eb",
    miniGuide: "\u7c21\u6613\u8abf\u67fb\u306e\u8cc7\u6599"
  };
  Object.entries(docs).forEach(([key, label]) => {
    topics[key] = {
      subject: label + "\u306e\u95b2\u89a7\u5148\u78ba\u8a8d",
      body: greeting + label + "\u306e\u6700\u65b0\u7248\u3092\u78ba\u8a8d\u3057\u305f\u304f\u3001\u95b2\u89a7\u5148\u3092\u3054\u6848\u5185\u3044\u305f\u3060\u3051\u307e\u3059\u3067\u3057\u3087\u3046\u304b\u3002\r\n\r\n\u30fb\u6240\u5c5e\u30fb\u6c0f\u540d\uff1a\r\n"
    };
  });
  function makeMail(topicName) {
    const topic = topics[topicName] || topics.general;
    return "mailto:" + email + "?subject=" + encodeURIComponent(defaultSubject + topic.subject) + "&body=" + encodeURIComponent(topic.body);
  }
  document.querySelectorAll("[data-mail-topic]").forEach((el) => {
    el.href = makeMail(el.dataset.mailTopic);
    el.title = "\u30e1\u30fc\u30eb\u4f5c\u6210\u753b\u9762\u3092\u958b\u304d\u307e\u3059\u3002\u9001\u4fe1\u306f\u30e1\u30fc\u30eb\u30bd\u30d5\u30c8\u3067\u884c\u3063\u3066\u304f\u3060\u3055\u3044\u3002";
  });
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = email;
    el.href = "mailto:" + email;
  });
  const stamp = typeof source.updatedAt === "string" ? source.updatedAt : "2026-10-03";
  if (/^\d{4}-\d{2}-\d{2}$/.test(stamp) && !Number.isNaN(Date.parse(stamp))) {
    document.querySelectorAll("[data-updated]").forEach((el) => {
      el.textContent = stamp.replaceAll("-", ".");
      el.dateTime = stamp;
    });
  }
  function approvedURL(value, key) {
    if (typeof value !== "string" || value.trim() === "" || /[\r\n]/.test(value)) return null;
    // Allow only flat PDF filenames inside docs/ for known document keys.
    // Preserve the relative URL so extracted packages and subdirectory sites both work.
    if (Object.hasOwn(docs, key) && /^docs\/[A-Za-z0-9][A-Za-z0-9._-]*\.pdf$/.test(value.trim())) return value.trim();
    try {
      const url = new URL(value.trim());
      if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return null;
      return url.href;
    } catch (_) { return null; }
  }
  document.querySelectorAll("[data-link]").forEach((el) => {
    const key = el.dataset.link;
    const url = approvedURL(links[key], key);
    if (!url) return; // Keep the labelled, working email fallback; never create a dead button.
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.hidden = false;
    el.removeAttribute("data-mail-topic");
    const label = el.dataset.readyLabel;
    const labelNode = el.querySelector("[data-link-label]");
    if (labelNode) labelNode.textContent = label;
    else if (label) el.textContent = label;
    el.title = "\u5225\u30bf\u30d6\u3067\u958b\u304d\u307e\u3059";
    el.setAttribute("aria-label", (el.dataset.documentTitle ? el.dataset.documentTitle + "の" : "") + label + "\uff08\u5225\u30bf\u30d6\uff09");
    document.querySelectorAll('[data-resource-note="' + key + '"]').forEach((note) => {
      note.textContent = "\u793e\u5185\u3067\u5171\u6709\u3055\u308c\u3066\u3044\u308b\u8cc7\u6599\u3092\u3001\u5225\u30bf\u30d6\u3067\u958b\u304d\u307e\u3059\u3002";
    });
  });
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.hidden = false;
    const setMenu = (open) => { toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open); };
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }
  let toastTimer;
  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    clearTimeout(toastTimer);
    el.textContent = message;
    el.classList.add("is-visible");
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3200);
  }
  function showCopyDialog(text) {
    const dialog = document.getElementById("copy-dialog");
    const textarea = document.getElementById("copy-value");
    if (!dialog || !textarea) return false;
    textarea.value = text;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    textarea.focus();
    textarea.select();
    return true;
  }
  async function copyText(text) {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
      toast("\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\u3002");
      return;
    } catch (_) {
      const previous = document.activeElement;
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.className = "clipboard-helper";
      helper.setAttribute("aria-label", "Copy text");
      document.body.append(helper);
      helper.select();
      let done = false;
      try { done = document.execCommand("copy"); } catch (_) { /* Manual fallback below. */ }
      helper.remove();
      if (previous && typeof previous.focus === "function") previous.focus();
      if (done) toast("\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\u3002");
      else if (showCopyDialog(text)) toast("\u81ea\u52d5\u30b3\u30d4\u30fc\u3067\u304d\u306a\u304b\u3063\u305f\u305f\u3081\u3001\u30c6\u30ad\u30b9\u30c8\u3092\u8868\u793a\u3057\u307e\u3057\u305f\u3002");
    }
  }
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", () => copyText(email));
  });
  document.querySelectorAll("[data-copy-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = topics[button.dataset.copyTemplate] || topics.general;
      const text = "\u5b9b\u5148\uff1a" + email + "\r\n\u4ef6\u540d\uff1a" + defaultSubject + topic.subject + "\r\n\r\n" + topic.body;
      copyText(text);
    });
  });
  const dialog = document.getElementById("copy-dialog");
  const close = document.querySelector(".dialog-close");
  if (dialog && close) close.addEventListener("click", (event) => {
    event.preventDefault();
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  });
})();
