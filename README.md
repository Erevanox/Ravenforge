# LUNAR LEGACY

LUNAR LEGACY is a static, interactive Moon heritage explorer built as a browser-based archive of human lunar missions, landing sites, rovers, orbiters, and impact events from 1959 through 2026.

The project presents a curated lunar history timeline in a polished single-page interface with a 3D-style Moon view, searchable mission records, a mission timeline, and detailed data panels for each object.

## Project overview

This project tracks lunar presence across multiple mission types, including:

- Soft landers and surface missions
- Crewed Apollo landing sites and equipment
- Lunar rovers and scientific instruments
- Orbiters and deliberate impacts
- Failed landings and crash sites
- Recent commercial and international missions

The app is designed to help users explore where humanity has touched the Moon, what remains there today, and how lunar activity evolved over time.

## Features

- Interactive lunar interface with a large Moon viewport
- Search and filter for missions by name and mission type
- Timeline controls for historical era browsing
- Record list with mission categories, countries, and years
- Details drawer for each mission with status, coordinates, and context
- Historical metadata and source references
- Static asset-driven design with no build or dependency installation required

## Repository contents

- `index.html` — app entry point
- `style.css` — interface styling and layout
- `script.js` — front-end logic, timeline logic, data rendering, and UI behavior
- `lunar/` — Moon textures and mission imagery used by the app
- `Information-Moon.txt` — detailed research dataset, mission notes, source references, and record metadata
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow
- `.gitignore` — repository ignore rules

## Data set

The app is backed by a lunar mission archive that includes both historical and recent records, including:

- Luna 2
- Luna 9
- Surveyor 3
- Apollo 11, Apollo 12, Apollo 15, Apollo 17
- Lunokhod 1 and Lunokhod 2
- Lunar Prospector
- SMART-1
- Kaguya
- Chandrayaan-1
- Lunar Reconnaissance Orbiter
- Beresheet
- Chandrayaan-2 Vikram
- Danuri
- Chandrayaan-3 Vikram and Pragyan
- SLIM
- Odysseus
- Blue Ghost Mission 1
- IM-2 Athena

The mission facts and metadata are documented in `Information-Moon.txt`, which provides structured research notes, dates, locations, status summaries, and source guidance.

## Run locally

Because this is a static site, there is no npm install or build step.

### Option 1: open directly

Open `index.html` in a browser.

### Option 2: serve locally

From the project root, you can serve it with any static web server, for example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Important: keep the `lunar/` folder in the same directory as the entry files. The browser loads textures and mission images from that folder.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow for deployment.

### Current deployment setup

- The workflow is defined in `.github/workflows/deploy.yml`
- It deploys the site to GitHub Pages using the `actions/deploy-pages` action
- The workflow is triggered on pushes to the `moon` branch and also supports manual execution from the Actions tab

### Deployment steps

1. Push the project to GitHub.
2. Make sure the repository is using the `moon` branch as the deployment branch for this workflow.
3. In GitHub, go to **Settings → Pages**.
4. Select **GitHub Actions** as the source.
5. Push changes or run the workflow manually.

The site is designed as static content; there is no application build process and no package installation step during deployment.

## Notes

- The project is suitable for educational, archival, and mission-history presentation use.
- The included dataset is research-oriented and intended for a historical explorer experience rather than a production-grade spacecraft tracking system.
- Data quality and mission status may vary by mission, and some entries are marked approximate or pending verification when public confirmation is incomplete.

## Credits

This project is aligned with NASA Space Apps Challenge-style mission storytelling and lunar heritage archiving, using public mission data and historical context.
