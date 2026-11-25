// English / Dutch switch.
// Every text block exists twice in the HTML: lang="en" and lang="nl". Only the active
// language is shown. This script picks the language and builds the language menu in
// every <div class="lang-switch"></div>.
// Order: ?lang=nl|en in the URL, then the visitor's last choice, then English.
(function () {
  var KEY = "site-lang";
  var root = document.documentElement;

  // The hide rule lives here (as well as in style.css) so a cached old stylesheet
  // can never show both languages at once.
  var style = document.createElement("style");
  style.textContent =
    'html:not([data-lang="nl"]) body [lang="nl"],' +
    'html[data-lang="nl"] body [lang="en"]{display:none!important}';
  document.head.appendChild(style);

  var FLAGS = {
    en: '<svg class="flag" viewBox="0 0 60 30" width="22" height="11" aria-hidden="true"><clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#uk-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#FFF" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
    nl: '<svg class="flag" viewBox="0 0 9 6" width="18" height="12" aria-hidden="true"><rect width="9" height="6" fill="#21468B"/><rect width="9" height="4" fill="#FFF"/><rect width="9" height="2" fill="#AE1C28"/></svg>'
  };
  var NAMES = { en: "English", nl: "Nederlands" };
  var CARET = '<svg class="caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M0 0h10L5 6z" fill="currentColor"/></svg>';

  var titles = {};
  var lang = fromUrl() || saved() || "en";
  if (lang !== "nl") lang = "en";

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(l) {
    try { localStorage.setItem(KEY, l); } catch (e) { /* private mode etc. */ }
  }
  function fromUrl() {
    var m = /[?&]lang=(en|nl)\b/.exec(location.search);
    return m ? m[1] : null;
  }

  function apply() {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    if (titles.en) document.title = lang === "nl" && titles.nl ? titles.nl : titles.en;
    var current = document.querySelectorAll(".lang-current");
    for (var i = 0; i < current.length; i++) {
      current[i].innerHTML = FLAGS[lang] + "<span>" + NAMES[lang] + "</span>" + CARET;
    }
    var options = document.querySelectorAll(".lang-options button");
    for (var j = 0; j < options.length; j++) {
      options[j].setAttribute("aria-checked", String(options[j].getAttribute("data-lang") === lang));
    }
  }

  function build(el) {
    el.innerHTML =
      '<button class="lang-current" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Language / Taal"></button>' +
      '<ul class="lang-options" role="menu" hidden>' +
      ["en", "nl"].map(function (l) {
        return '<li><button type="button" role="menuitemradio" data-lang="' + l + '">' +
          FLAGS[l] + "<span>" + NAMES[l] + "</span></button></li>";
      }).join("") +
      "</ul>";

    var toggle = el.querySelector(".lang-current");
    var menu = el.querySelector(".lang-options");

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(menu.hidden);
    });
    menu.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-lang]");
      if (!btn) return;
      lang = btn.getAttribute("data-lang");
      save(lang);
      apply();
      setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!el.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
  }

  root.setAttribute("data-lang", lang); // before the page is drawn: no flash
  root.setAttribute("lang", lang);

  document.addEventListener("DOMContentLoaded", function () {
    var meta = document.querySelector('meta[name="title-nl"]');
    titles.en = document.title;
    titles.nl = meta ? meta.getAttribute("content") : null;
    var switches = document.querySelectorAll(".lang-switch");
    for (var i = 0; i < switches.length; i++) build(switches[i]);
    apply();
  });
})();
