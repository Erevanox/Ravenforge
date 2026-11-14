# Ares Legacy

An interactive Mars exploration archive built with HTML, CSS, JavaScript, and Three.js. This is a static site: it has no build step or package installation.

## Deploy manually with GitHub Pages

1. Create a GitHub repository and upload or push the **contents of this folder**, keeping the `assets` directory structure intact.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch you uploaded to (usually `main`) and the `/(root)` folder, then save.
5. After GitHub finishes publishing, open the URL shown in the Pages settings. It is usually `https://<username>.github.io/<repository-name>/`.

No GitHub Actions workflow or build command is needed. The site uses relative paths for its local files, so it can also be published from a repository subpath.

## Preview locally

Serve the folder over HTTP (ES modules do not work reliably when `index.html` is opened directly as a file):

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project files

- `index.html` — page structure and the Three.js import map
- `styles.css` — layout and responsive styles
- `app.js` — 3D scene, mission data, and interactions
- `assets/` — Mars texture and locally stored mission images

Mission dates, landing regions, and objectives are recorded in `app.js`, with a source link on each mission record. Exact or current surface positions remain unplotted unless verified; globe markers and orbital paths are schematic.

Three.js is loaded from jsDelivr and the DM Sans/DM Mono fonts are loaded from Google Fonts, so those resources require an internet connection. Mission image credits and source links are included in the site.
