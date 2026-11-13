// Renders LaTeX math on every page using KaTeX (loaded from a CDN in each page's <head>).
//   Inline math:   $ ... $   or   \( ... \)
//   Display math:  $$ ... $$ or   \[ ... \]
// To show a literal dollar sign, wrap that text in <span class="no-math">...</span>.
document.addEventListener("DOMContentLoaded", function () {
  if (typeof renderMathInElement !== "function") return; // CDN unreachable: show raw TeX
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false }
    ],
    ignoredClasses: ["no-math"],
    throwOnError: false
  });
});
