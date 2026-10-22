# Kernel

A minimal newsletter web app for AI & technology. It installs to the iPhone/iPad
Home Screen and runs full-screen, offline-capable, like a native app.

> **Prototype.** The issues in `assets/data.js` are sample content and will be replaced.

## Highlights

- **Native feel**: iOS-style large titles that collapse into the nav bar, tab bar,
  push/pop transitions, edge-swipe back (when installed), bottom sheets, toasts.
- **Installable PWA**: manifest, Apple touch icon, light/dark launch screens for
  current iPhones and iPads, safe-area aware layout, standalone display.
- **Fast**: no framework, no build step, system fonts. ~27 KB gzipped for the whole
  app. A service worker precaches the shell so launches are instant and offline works.
- **Adaptive**: tab bar on phones and iPad portrait; sidebar + ⌘K command palette on
  iPad landscape and desktop. Light, dark or automatic theme; adjustable text size.

## Run locally

```sh
npx serve .            # or: python3 -m http.server 8080
```

Service workers need `http://localhost` or HTTPS.

## Install on iPhone / iPad

The app has to be served over HTTPS (e.g. GitHub Pages, Cloudflare Pages, Netlify).

1. Open the site in Safari.
2. Tap **Share** (on iOS 26: **•••** → **Share**) → **Add to Home Screen**.
3. Keep **Open as Web App** on, tap **Add**, and launch Kernel from the Home Screen.

### Deploy with GitHub Pages

Repository **Settings → Pages → Build and deployment**: Source *Deploy from a branch*,
branch `main`, folder `/ (root)`. All paths are relative, so it works under a subpath.

## Project layout

```
index.html              App shell, PWA meta tags, launch screens
manifest.webmanifest    Install metadata
sw.js                   Offline cache (bump VERSION when files change)
assets/app.css          Design system and layout
assets/app.js           Router, views, gestures, palette, install flow
assets/data.js          Content (sample issues, topics, site config)
icons/                  App icons (SVG source + generated PNGs) and splash screens
scripts/generate-assets.mjs   Regenerates PNG icons + launch screens from the SVGs
```

## Content

Each issue in `assets/data.js` has `number`, `slug`, `title`, `dek`, `topic`, `date`,
`author` and an HTML `body`. Read time is computed. The content source is a single
module, so it can later be swapped for Markdown files, a CMS, or an API.

## Regenerating icons

After editing `icons/icon.svg` or `icons/mark.svg`:

```sh
npm install && npm run assets
```
