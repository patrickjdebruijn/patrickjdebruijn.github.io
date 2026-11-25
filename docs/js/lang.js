// English / Dutch switch.
// Every text block exists twice in the HTML: lang="en" and lang="nl". CSS hides the
// language that is not active. This script picks the language and wires up the flag.
// Order: ?lang=nl|en in the URL, then the visitor's last choice, then English.
(function () {
  var KEY = "site-lang";
  var root = document.documentElement;
  var titles = {};

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode etc. */ }
  }
  function fromUrl() {
    var m = /[?&]lang=(en|nl)\b/.exec(location.search);
    return m ? m[1] : null;
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    if (titles.en) document.title = lang === "nl" && titles.nl ? titles.nl : titles.en;
  }

  var lang = fromUrl() || saved() || "en";
  if (lang !== "nl") lang = "en";
  apply(lang); // runs in <head>, before the page is drawn: no flash

  document.addEventListener("DOMContentLoaded", function () {
    var meta = document.querySelector('meta[name="title-nl"]');
    titles.en = document.title;
    titles.nl = meta ? meta.getAttribute("content") : null;
    apply(lang);

    var buttons = document.querySelectorAll(".lang-toggle");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        lang = lang === "nl" ? "en" : "nl";
        save(lang);
        apply(lang);
      });
    }
  });
})();
