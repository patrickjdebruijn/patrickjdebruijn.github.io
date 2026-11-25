// Fills <section class="featured-posts" data-from="blog/index.html" data-count="3">
// with the newest posts from the blog list, so new posts only have to be added in
// blog/index.html. If the list can't be loaded (e.g. when opening the file directly
// from disk instead of via a web server), the section simply stays hidden.
document.addEventListener("DOMContentLoaded", function () {
  var sections = document.querySelectorAll(".featured-posts[data-from]");
  Array.prototype.forEach.call(sections, function (section) {
    var source = new URL(section.getAttribute("data-from"), location.href);
    var count = parseInt(section.getAttribute("data-count"), 10) || 3;
    var target = section.querySelector(".post-list");

    fetch(source, { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var items = doc.querySelectorAll(".post-list > li");
        for (var i = 0; i < items.length && i < count; i++) {
          var li = document.importNode(items[i], true);
          // Links in the blog list are relative to blog/; make them work from here.
          Array.prototype.forEach.call(li.querySelectorAll("[href]"), function (a) {
            a.setAttribute("href", new URL(a.getAttribute("href"), source).href);
          });
          target.appendChild(li);
        }
        if (target.children.length) section.hidden = false;
      })
      .catch(function () { /* leave the section hidden */ });
  });
});
