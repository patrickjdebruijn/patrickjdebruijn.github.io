# patrickjdebruijn.github.io — editing notes

The website is in the `docs/` folder. GitHub Pages publishes **only** that folder, so this README is not part of the website.

```
docs/
  index.html          Home: profile, about, interests, education
  research.html       Research topics, figures, videos
  publications.html   Publications
  css/style.css       All layout and styling (rarely needs editing)
  js/math.js          LaTeX math setup (rarely needs editing)
  images/             Profile photo
  figures/            Research figures
  videos/             Research videos
```

To publish a change, edit the file, then commit and push to `main`. The site updates within a minute or two. To preview locally, run `python3 -m http.server -d docs` and open http://localhost:8000.

Each page has short `<!-- ===== Section ===== -->` comments that mark where each section starts.

---

## Home page (`docs/index.html`)

**Bio:** edit the `<p>` under `<h2>About</h2>`. Add more paragraphs with additional `<p>…</p>` blocks.

**Photo:** save a square photo as `docs/images/profile.jpg` and change `src="images/profile.svg"` to `src="images/profile.jpg"`.

**Contact links:** add `<li>` items to `<ul class="contact-links">`:

```html
<li><a href="mailto:name@tudelft.nl">Email</a></li>
<li><a href="https://scholar.google.com/citations?user=XXXX">Google Scholar</a></li>
<li><a href="https://orcid.org/0000-0000-0000-0000">ORCID</a></li>
<li><a href="https://www.linkedin.com/in/XXXX">LinkedIn</a></li>
```

**Education:** replace `YYYY`, `Field of study` and `University, City, Country` in the `<ul class="timeline">` list. Each entry looks like this:

```html
<li>
  <span class="years">2018&ndash;2021</span>
  <span class="entry">
    <span class="degree">BSc, Physics</span>
    <span class="place">University, City, Country</span>
  </span>
</li>
```

(`&ndash;` is the en dash: 2018–2021.)

---

## Research page (`docs/research.html`)

Each topic is a `<section class="research-topic">` with an `<h2>` and paragraphs. Copy one to add a topic.

### Add a figure

Put the image in `docs/figures/` (PNG or JPG; aim for about 2000 px wide and under 1 MB). Then paste this where it should appear:

```html
<figure>
  <img src="figures/my-figure.png" alt="Short description of the figure">
  <figcaption>Caption text. Math works here too: $L_R = \sqrt{gH}/|f|$.</figcaption>
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

When you have your first publication, delete the `<p class="empty-note">…</p>` line and paste:

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

## Math (LaTeX)

Math works on every page:

- Inline: `$e^{i\pi} + 1 = 0$` or `\(...\)`
- Display: `$$ ... $$` or `\[ ... \]`

To write a literal `$`, wrap it as `<span class="no-math">$5</span>`. Inside math, write `<` as `&lt;`.

---

## Menu, footer, new pages

The header menu and footer are copied in all three HTML files, so change them in each file. To add a page, copy `research.html`, rename the copy, change its content, and add a menu link to every page.

## Colours and fonts

These are set at the top of `docs/css/style.css`. Changing `--accent` recolours all links.
