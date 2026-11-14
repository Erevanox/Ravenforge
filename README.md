# LUNAR LEGACY

An interactive 3D archive of lunar missions and surface history, built with React, TypeScript, Vite, and Three.js.

## Run locally

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. Vite is configured with relative asset paths so the site works both at a domain root and under a GitHub Pages project path.

## GitHub Pages

1. Push this repository to GitHub on the `main` or `master` branch.
2. In **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
3. The included workflow builds the site and publishes `dist/` on pushes to either branch. You can also start it manually from the repository’s **Actions** tab.

The lunar textures and record images are stored locally under `public/lunar/` and are included in the Pages build.
