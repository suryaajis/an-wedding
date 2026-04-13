# an-wedding

Static wedding invitation site for "Aji & Nikmah" — plain HTML/CSS/JS, deployed via Firebase Hosting.

## Structure

- `index.html` / `style.css` — the site source at the repo root.
- `assets/` — `img/`, `audio/`, `font/`, `countdown/` (simplyCountdown), `sakura/` (jquery-sakura).
- `manifest.json` / `service-worker.js` — PWA manifest and service worker at the repo root.
- `public/` — Firebase Hosting deploy root. Mirrors `index.html`, `style.css`, `manifest.json`, `service-worker.js`, and `assets/` from the repo root; `firebase.json` serves from here.
- `firebase.json` / `.firebaserc` — Firebase Hosting config.

No build step, no package manager, no framework. Third-party libs (Bootstrap, AOS, FontAwesome, Google Fonts) are loaded from CDNs in `index.html`.

## Editing workflow

Because `public/` is a copy of the root files, any change to `index.html`, `style.css`, `manifest.json`, `service-worker.js`, or `assets/` must also be applied to the matching path under `public/` before deploying — otherwise the deployed site will not reflect the change. When editing, update both copies in the same change.

Preview locally by opening `index.html` directly in a browser, or run `firebase serve` / `firebase emulators:start` against the `public/` directory. Note: service workers require `http(s)://` — use `firebase serve` (not `file://`) to test PWA behavior.

## PWA

The site is installable as a PWA:

- `manifest.json` — app metadata, `display: standalone`, theme color `#b08968`. Icons currently reuse `assets/img/aji.png` and `assets/img/nikmah.png`; swap in a dedicated square 512×512 PNG for a crisper home-screen icon.
- `service-worker.js` — precaches core files (HTML, CSS, manifest, favicon, aji/nikmah images, audio) and uses a cache-first strategy with network fallback. Navigation requests fall back to cached `index.html` when offline.
- `index.html` registers the service worker on `load` and declares `<link rel="manifest">`, `theme-color`, and Apple touch icon meta tags.

**Cache busting:** when `index.html`, `style.css`, or any precached asset changes, bump `CACHE_VERSION` in `service-worker.js` (both copies) — otherwise returning users will keep seeing the old cached version.

## Deploy

`firebase deploy --only hosting` — publishes `public/` to Firebase Hosting.
