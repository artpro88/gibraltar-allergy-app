# Portfolio Site

A static portfolio site scaffolded from pokacity.com (placeholder content, since the
live site couldn't be fetched in this environment). No build step required.

## Run locally

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Replace placeholders

- `index.html` — swap name, bio, role titles, dates, and project/contact copy.
- `assets/profile.svg` — replace with a real photo (`profile.jpg`/`.png`) and update the `<img src>` in `index.html`.
- `assets/logos/company-*.svg` — replace with real company logos (same filenames, or update the `src` paths).
- `assets/projects/project-*.svg` — replace with real project screenshots.
