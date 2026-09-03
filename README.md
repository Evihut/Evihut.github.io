# evihut.github.io

Personal homepage of Zhengji Zhang — https://evihut.github.io/

Static, zero build step: three files, no framework, no tracking, no external JS.
Only Google Fonts is loaded from a third party.

```
index.html             all content — edit the text in place
assets/css/style.css   design tokens live in the :root block at the top
assets/js/main.js      theme toggle + copyright year (29 lines)
.nojekyll              lets Pages serve /assets without Jekyll
```

## Editing

**Content** — everything is in `index.html`, in reading order: masthead, about,
selected work, interests, contact. Each project is one `<article class="entry">`;
copy one to add another.

**Colours and type** — change the tokens in `:root` at the top of `style.css`.
The dark palette is defined twice (once under `html[data-theme="dark"]` for the
toggle, once under `prefers-color-scheme` for the system default); keep the two
in sync.

**Metric tables** — `<table class="metrics">`. Mark the row you want emphasised
with `class="best"`, and use `class="pos"` / `class="flat"` on a number to tint
it. The `<caption>` carries the experimental conditions; keep it filled in.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushing to `main` publishes automatically
(Settings → Pages → Deploy from a branch → `main` / root).
