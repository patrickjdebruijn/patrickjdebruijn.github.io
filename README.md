# patrickjdebruijn.github.io — editing notes

The website is in the `docs/` folder. GitHub Pages publishes **only** that folder, so this README is not part of the website.

```
docs/
  index.html          Home: profile, about, interests, education
  research.html       Research topics, figures, videos
  publications.html   Publications
  blog/index.html     List of blog posts
  blog/YYYY-MM-DD-*.html  One file per post
  css/style.css       All layout and styling (rarely needs editing)
  js/math.js          LaTeX math setup (rarely needs editing)
  js/lang.js          English/Dutch switch (rarely needs editing)
  images/             Profile photo (profile.jpg)
  figures/            Figures (web-sized copies)
  videos/             Videos
originals/            Full-size originals of figures (ignored by git, never published)
tools/                Local helpers (not published)
```

To publish a change, edit the file, then commit and push to `main`. The site updates within a minute or two. To preview locally, run `python3 -m http.server -d docs` and open http://localhost:8000.

Each page has short `<!-- ===== Section ===== -->` comments that mark where each section starts.

---

## English and Dutch

Every piece of text appears **twice**, right next to each other: once with `lang="en"` and once with `lang="nl"`. The flag in the header switches between them, and the site remembers the visitor's choice. Equations, images and videos appear only once, without a `lang` attribute.

```html
<h2 lang="en">About</h2>
<h2 lang="nl">Over mij</h2>
<p lang="en">English text …</p>
<p lang="nl">Nederlandse tekst …</p>
```

- **Editing text:** change both versions.
- **Text that is the same in both languages:** leave out `lang` altogether, e.g. `<span class="degree">MSc, Hydraulic Engineering</span>`.
- **Short pieces inside a line:** use spans, e.g. `<span lang="en">present</span><span lang="nl">heden</span>`.
- **Page title in the browser tab:** `<title>` holds the English title, and `<meta name="title-nl" content="…">` holds the Dutch one.
- **Links to a specific language:** add `?lang=nl` or `?lang=en` to the address, e.g. `https://patrickjdebruijn.github.io/research.html?lang=nl`.
- **Without JavaScript,** visitors see the English text.
- **The language menu** (flags + English/Nederlands) is built by `docs/js/lang.js`. Each page only contains an empty `<div class="lang-switch"></div>` in the header.
- **After changing `style.css` or `lang.js`,** raise the version number in the links on every page (`style.css?v=2` → `?v=3`). Otherwise visitors' browsers may keep using the old file for a while.

---

## Home page (`docs/index.html`)

**Bio:** edit the `<p>` under `<h2>About</h2>`. Add more paragraphs with additional `<p>…</p>` blocks.

**Photo:** the site uses `docs/images/profile.jpg`.

- **Framing:** open `tools/photo-framer.html` in a browser (double-click it). Drag to move the photo and scroll to zoom. Then copy the `style="…"` line it gives you into the `<div class="profile-photo" …>` tag in `docs/index.html`. The three numbers can also be edited by hand:
  - `--zoom`: how many circle-widths wide the photo is. Higher zooms in.
  - `--x` and `--y`: the point of the photo, in % from the left and top, that sits at the centre of the circle.
- **Replacing the photo:** phone photos are large and contain **GPS location** in their metadata. Make a small copy without the metadata before publishing:

  ```sh
  sips -Z 1400 original.jpg --out docs/images/profile.jpg     # resize (keeps metadata!)
  python3 tools/strip-jpeg-metadata.py docs/images/profile.jpg  # remove EXIF/GPS
  strings docs/images/profile.jpg | grep -c Exif                # should print 0
  ```
- Original `PXL_*` phone photos in `docs/images/` are ignored by git (see `.gitignore`), so they won't be published by accident.

**Contact links:** add `<li>` items to `<ul class="contact-links">`:

```html
<li><a href="mailto:P.J.deBruijn@tudelft.nl">Email</a></li>
<!-- <li><a href="https://scholar.google.com/citations?user=XXXX">Google Scholar</a></li> -->
<li><a href="https://orcid.org/0009-0001-0555-012X">ORCID</a></li>
<li><a href="https://www.linkedin.com/in/patrick-de-bruijn-a11704140">LinkedIn</a></li>
```

**Education:** each entry in the `<ul class="timeline">` list looks like this:

```html
<li>
  <span class="years">2018&ndash;2021</span>
  <span class="entry">
    <span class="degree" lang="en">BSc, Civil Engineering</span>
    <span class="degree" lang="nl">BSc, Civiele Techniek</span>
    <span class="place" lang="en">Delft University of Technology, Delft, the Netherlands</span>
    <span class="place" lang="nl">Technische Universiteit Delft, Delft, Nederland</span>
  </span>
</li>
```

(`&ndash;` is the en dash: 2018–2021.)

---

## Research page (`docs/research.html`)

Each topic is a `<section class="research-topic">` with an `<h2>` and paragraphs. Copy one to add a topic.

### Add a figure

1. Put the full-size original in `originals/`, which git ignores.
2. Make a web copy in `docs/figures/`, about 1400–1800 px wide and under 1 MB, without metadata. Photos from a phone contain your **GPS location**.

   ```sh
   sips --resampleWidth 1800 originals/my-figure.jpg --out docs/figures/my-figure.jpg
   python3 tools/strip-jpeg-metadata.py docs/figures/my-figure.jpg
   strings docs/figures/my-figure.jpg | grep -c Exif    # should print 0
   ```

   For a tall photo, use `sips -Z 1400`, which limits the longest side, and add `class="narrow"` to its `<figure>`.

3. Paste this where the figure should appear:

```html
<figure>
  <img src="figures/my-figure.jpg" alt="Short description of the figure">
  <figcaption>
    <span lang="en">Caption text. Math works here too: $L_R = \sqrt{gH}/|f|$.</span>
    <span lang="nl">Onderschrift.</span>
  </figcaption>
</figure>
```

For two figures side by side (they stack on phones):

```html
<div class="figure-grid">
  <figure> …first figure… </figure>
  <figure> …second figure… </figure>
</div>
```

### Add a video

Put an `.mp4` in `docs/videos/`. Paste:

```html
<figure>
  <video src="videos/ctw.mp4" controls muted loop playsinline preload="metadata"></video>
  <figcaption>Coastally trapped wave propagating along the shelf.</figcaption>
</figure>
```

- Add `autoplay` next to `controls` to make it play automatically, like a GIF. It stays muted.
- Keep files small. GitHub rejects files over 100 MB, and anything above about 20 MB loads slowly. To shrink a video:
  `ffmpeg -i in.mov -vcodec libx264 -crf 28 -preset slow -an -movflags +faststart videos/ctw.mp4`
- To use YouTube instead, paste the embed code from YouTube's Share → Embed inside the `<figure>`.

A good way to show several results is a separate section near the end of the page:

```html
<h2>Gallery</h2>
<div class="figure-grid">
  <figure>…</figure>
  <figure>…</figure>
</div>
```

---

## Publications (`docs/publications.html`)

Titles, authors and venues are the same in both languages, so they need no `lang` attributes. To add a paper, paste this:

```html
<h2>2027</h2>
<ul class="pub-list">
  <li class="pub">
    <span class="pub-title">Title of the paper</span>
    <span class="pub-authors"><strong>P. de Bruijn</strong>, A. Coauthor</span>
    <span class="pub-venue">Journal Name, 2027</span>
    <span class="pub-links">
      <a href="https://doi.org/10.xxxx/xxxxx">DOI</a>
      <a href="https://arxiv.org/abs/xxxx.xxxxx">arXiv</a>
    </span>
  </li>
</ul>
```

- Put new papers at the top of a year's list.
- For a new year, add another `<h2>YEAR</h2>` + `<ul class="pub-list">…</ul>` above the older ones.
- Remove any link you don't have.

---

## Blog (`docs/blog/`)

To add a post:

1. Copy an existing post, e.g. `docs/blog/2026-11-24-preprint.html`, to a new file named `docs/blog/YYYY-MM-DD-short-name.html`.
2. In the new file, change:
   - `<title>` and `<meta name="title-nl">`;
   - the two `<h1>` headings;
   - the `<time>` element: the `datetime="YYYY-MM-DD"` value and both written-out dates;
   - the paragraphs, in both languages.
3. Add the post at the **top** of the list in `docs/blog/index.html`:

```html
<li>
  <time class="post-date" datetime="2027-01-15"><span lang="en">15 January 2027</span><span lang="nl">15 januari 2027</span></time>
  <a class="post-link" href="2027-01-15-short-name.html">
    <span lang="en">English title</span>
    <span lang="nl">Nederlandse titel</span>
  </a>
  <span class="post-summary" lang="en">One-line summary.</span>
  <span class="post-summary" lang="nl">Samenvatting in één regel.</span>
</li>
```

Blog files live one folder deeper, so their links to the rest of the site start with `../`, as in `../figures/my-figure.jpg` and `../css/style.css`.

---

## Math (LaTeX)

Math works on every page:

- Inline: `$e^{i\pi} + 1 = 0$` or `\(...\)`
- Display: `$$ ... $$` or `\[ ... \]`

To write a literal `$`, wrap it as `<span class="no-math">$5</span>`. Inside math, write `<` as `&lt;`.

---

## Menu, footer, new pages

The header (menu and language flag) and the footer are copied into every HTML file, including the blog pages, so a change there has to be made in each file. To add a page, copy `research.html`, rename the copy, change its content, and add a menu link to every page.

## Colours and fonts

These are set at the top of `docs/css/style.css`. Changing `--accent` recolours all links.
