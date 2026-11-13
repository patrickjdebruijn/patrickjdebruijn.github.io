# Personal academic website

Plain HTML + CSS, no build step. Hosted with GitHub Pages.

```
index.html          Home: photo, bio, affiliation, contact links, news
research.html       Research topics
publications.html   Publication list
css/style.css       All layout and styling (rarely needs editing)
js/math.js          KaTeX setup for LaTeX math (rarely needs editing)
images/             Photos and figures
```

In every page, the part you edit is between these two comments:

```html
<!-- ===================== CONTENT START — edit below ===================== -->
...
<!-- ====================== CONTENT END — edit above ====================== -->
```

Everything outside those markers is layout.

## Edit the bio, affiliation, or contact links

Open `index.html` and edit the content section:

- **Bio:** the `<p>` paragraphs under `<h2>About</h2>`.
- **Affiliation:** the `<p class="affiliation">` block. Each `<br>` starts a new line.
- **Contact links:** the `<li>` items in `<ul class="contact-links">`. Add, remove, or reorder them.
- **Photo:** save a square image as `images/profile.jpg` and change the `src` of the `<img class="profile-photo">` tag to `images/profile.jpg`.

## Add a publication

Open `publications.html`. Copy this block into the right year's `<ul class="pub-list">`, with the newest at the top:

```html
<li class="pub">
  <span class="pub-title">Title of the paper</span>
  <span class="pub-authors">A. Coauthor, <strong>P. de Bruijn</strong>, B. Coauthor</span>
  <span class="pub-venue">Journal or Conference Name, 2026</span>
  <span class="pub-links">
    <a href="papers/my-paper.pdf">PDF</a>
    <a href="https://doi.org/10.xxxx/xxxxx">DOI</a>
  </span>
</li>
```

- Delete any link you don't have. Delete the whole `pub-links` span if there are no links.
- Your own name goes in `<strong>` to make it bold.
- **New year:** copy an `<h2>YEAR</h2>` heading together with its `<ul class="pub-list">…</ul>` and put it above the older years.
- **Hosting PDFs here:** create a `papers/` folder, put the PDF in it, and link to `papers/file.pdf`.

The same copy-and-paste template is in a comment at the top of the list in `publications.html`.

## Math (LaTeX)

Math works on every page:

- Inline: `$e^{i\pi} + 1 = 0$` or `\(e^{i\pi} + 1 = 0\)`
- Display: `$$ \int_0^1 x^2\,dx = \tfrac13 $$` or `\[ ... \]`

To show a literal dollar sign, wrap it in a span, e.g. `<span class="no-math">costs $5</span>`.
In HTML, write `<` as `&lt;` inside math, e.g. `$a &lt; b$`.

## Navigation and page titles

The header (site name and menu) and the footer are copied in all three HTML files. To rename a menu item or add a page, change it in each file. To add a page, copy `research.html`, rename the copy, and add a menu link to every page.

## Preview locally

Open `index.html` in a browser, or run a local server:

```sh
python3 -m http.server
# then visit http://localhost:8000
```

## Publishing

Commit and push to `main`. In the repository's **Settings → Pages**, set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. The empty `.nojekyll` file tells GitHub to serve the files as they are, without running Jekyll.

To be served at `https://patrickjdebruijn.github.io/`, the repository must be named `patrickjdebruijn.github.io`. From any other repository name, the site is served at `https://patrickjdebruijn.github.io/<repo-name>/`.
