# LUNAR LEGACY

An interactive 3D archive of lunar missions and surface history. The site is
packaged as three browser-ready files: `index.html`, `style.css`, and
`script.js`. No package installation or build step is required.

Keep the `lunar/` folder beside those files. It contains the Moon textures and
mission images used by the site.

## Run locally

Open `index.html` in a browser, or serve the project folder with any static
file server.

## Deploy to GitHub Pages

1. Push the repository to GitHub on the `main` or `master` branch.
2. In **Settings → Pages**, choose **GitHub Actions** as the deployment source.
3. The included workflow publishes the static site whenever you push to either
   branch. You can also start it from the repository's **Actions** tab.

The workflow does not install packages or run a build.
