# Personal Homepage

A fast, interactive, single-page personal site — zero build step, pure HTML/CSS/JS.
Tech/sci-fi aesthetic with an animated particle network, scroll reveals, count-up
stats, a typing effect, 3D-tilt cards, and a light/dark toggle.

```
homepage/
├── index.html            # all content lives here — edit text in place
├── assets/
│   ├── css/style.css     # theme tokens at the top (:root) — change colors here
│   ├── js/main.js        # interactions (particles, typing, reveals…)
│   └── cv.pdf            # ← drop your résumé here (the Contact link points to it)
├── .nojekyll             # lets GitHub Pages serve /assets without Jekyll
└── README.md
```

## ✏️ Make it yours (5-minute checklist)

Open `index.html` and search/replace:

1. **`Your Name`** → your real name (appears in `<title>`, nav, hero, footer).
2. **`YN`** (nav logo) → your initials.
3. **Hero stats** — edit the `data-count` attributes (medals / papers / GPA).
4. **About / Research / Publications / Projects / Skills** — replace the sample
   text. The Kaggle/research entries are real categories of your work; swap in
   exact titles, rankings, and links.
5. **Links** — update `href="#"` placeholders and the social URLs in **Contact**
   (GitHub, LinkedIn, Kaggle, Google Scholar). The email is set to
   `zzhan744@asu.edu`.
6. **CV** — put your PDF at `assets/cv.pdf`.

Want different colors? Edit the `--accent`, `--accent-2`, `--accent-3`, and
`--grad` variables in `assets/css/style.css` (`:root` block).

## 🚀 Deploy to GitHub Pages

GitHub Pages serves a personal site from a repo named **`<username>.github.io`**.

```bash
# from inside the homepage/ folder
git init
git add .
git commit -m "Initial homepage"
git branch -M main
# create the repo on github named exactly: <your-username>.github.io
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
branch → `main` / `root`**. Your site goes live at
`https://<your-username>.github.io` within a minute or two.

> If you'd rather keep it inside an existing repo, push to any repo and set
> Pages source to that branch — the URL becomes `https://<username>.github.io/<repo>/`.

## 👀 Preview locally

```bash
cd homepage
python3 -m http.server 8000
# open http://localhost:8000
```

## ♿ Notes

- Respects `prefers-reduced-motion` (disables particles/typing/tilt).
- Fully responsive with a mobile menu.
- No tracking, no external JS — only Google Fonts.
