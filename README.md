# COSMIC HORIZON

**Abandoned but Not Forgotten** is a static website about the equipment and traces humans have left across Earth, the Moon, and Mars. The COSMIC HORIZON home page presents an interactive 3D solar system; choose a destination and select **Explore** to open that world's independent explorer.

## Run locally

From the project root, start Python's static file server:

```bash
python -m http.server 8000
```

Open <http://localhost:8000>. There is no build step, package installation, or framework. An internet connection is needed for the Three.js CDN/module imports, fonts, and some external imagery.

## Deploy to GitHub Pages

1. Push this project to the repository's default branch on GitHub.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Open the **Actions** tab and allow the **Deploy static site to GitHub Pages** workflow to finish. Future pushes to the default branch deploy automatically.
4. Find the published URL under **Settings → Pages**. For a project repository, it is usually `https://<owner>.github.io/<repository>/`.

To deploy manually, open **Actions → Deploy static site to GitHub Pages → Run workflow** and select the default branch. The workflow publishes the repository root as-is; it does not install dependencies or run a build. Keep the four pages and their assets in the repository so their relative links continue to work under the project URL.

## Site structure

```text
.
|-- index.html                 COSMIC HORIZON home page
|-- about.html                 Project background and team credits
|-- style.css
|-- script.js
|-- assets/                    Home page textures and logo
|-- earth/                     Earth Legacy explorer
|-- moon/                      LUNAR LEGACY explorer
|   |-- lunar/                 Moon textures and mission imagery
|   `-- Information-Moon.txt   Lunar mission research notes
|-- mars/                      Ares Legacy explorer and mission imagery
|-- shared/                    Cross-page navigation and transitions
`-- .github/workflows/         GitHub Pages deployment
```

Each explorer remains an independent static page with its own scripts, styles, data, assets, and Three.js loading method. All local links are relative so the site works from a GitHub Pages repository subpath.

## Credits and sources

- **COSMIC HORIZON:** Mission histories and selected imagery draw on NASA mission archives and the [NASA Image and Video Library](https://images.nasa.gov/). Planet surface maps are credited to [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0). Three.js is loaded from cdnjs. The project was created by **Team Ravenforge**; team links are in the home-page Credits dialog.
- **Earth Legacy:** Three.js and OrbitControls are loaded from jsDelivr. The explorer uses a local Earth map and static educational reference content; measurements and geographic boundaries are approximate.
- **LUNAR LEGACY:** Mission data and historical context use public sources and are documented in `Information-Moon.txt` and in the explorer's records.
- **Ares Legacy:** Mission source links and image credits are included with the records. Three.js is loaded from jsDelivr; DM Sans and DM Mono are loaded from Google Fonts.

The explorers are educational archives. Mission locations, dates, and measurements may be approximate; consult the linked primary sources for details.
