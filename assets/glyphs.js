/* ============================================================
 * LifeVocab — GLYPHS
 * UI 아이콘은 Lucide(<i data-lucide="...">), 보조 이모지는 Twemoji(트위터 이모지).
 * CDN에서 로드 후 렌더. 동적으로 추가된 콘텐츠는 window.renderGlyphs() 호출.
 * ============================================================ */
(function () {
  var LUCIDE = "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js";
  var TWEMOJI = "https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js";
  var TW_BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/";

  function inject(src, onload) {
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.crossOrigin = "anonymous";
    s.onload = onload;
    s.onerror = function () { console.warn("glyphs: failed to load", src); };
    document.head.appendChild(s);
  }

  function renderLucide() {
    try { if (window.lucide) window.lucide.createIcons(); } catch (e) {}
  }
  function renderTwemoji() {
    try {
      if (window.twemoji)
        window.twemoji.parse(document.body, {
          folder: "svg",
          ext: ".svg",
          base: TW_BASE,
          className: "twemoji",
        });
    } catch (e) {}
  }

  function start() {
    inject(LUCIDE, renderLucide);
    inject(TWEMOJI, renderTwemoji);
  }

  // 동적으로 추가된 DOM(예: 스타일가이드 스와치)을 다시 렌더
  window.renderGlyphs = function () { renderLucide(); renderTwemoji(); };

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();
