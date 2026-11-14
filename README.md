# Earth Legacy

Earth Legacy is a responsive, interactive 3D Earth explorer built with HTML, CSS, JavaScript, and Three.js. It presents educational information about Earth's geography, science, environments, and geological history.

## Features

- Interactive 3D globe with automatic rotation, mouse/touch dragging, and zoom controls
- Clickable geographic locations and land/ocean regions with summaries and approximate coordinates
- Search across educational topics, locations, and timeline events
- Field guide covering Earth's structure, continents and oceans, atmosphere, climate, biodiversity, natural hazards, and more
- Horizontal geological timeline from Earth's formation to early civilizations
- Responsive layout, including mobile controls that can be revealed from the left edge
- Dark interface with a `#006D5B` accent theme

## Run locally

Serve the project directory over HTTP. For example, with Python installed:

```powershell
cd "D:\1\v1(EARTH)"
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. The page loads Three.js and its `OrbitControls` module from jsDelivr, so an internet connection is required. The Earth map itself is stored locally in `assets`.

Alternatively, open the folder in Visual Studio Code and use an HTTP development server extension such as Live Server.

## Controls

- Drag the globe to rotate it; scroll or pinch to zoom.
- Use the globe controls to focus, zoom, reset the view, or toggle automatic rotation.
- Select a location or click the globe to view geographic information.
- Use **Search Earth**, **Categories**, or **Earth facts** to open information.
- Select a timeline event to read its summary.
- On narrow screens, tap the edge handle or swipe right from the left edge to reveal the globe controls and Earth statistics.

## Project structure

```text
.
|-- index.html             Page markup and Three.js import map
|-- styles.css             Layout, visual theme, and responsive styles
|-- app.js                 Globe, interactions, educational content, and timeline
`-- assets/
    `-- earth-daymap.jpg   Earth surface texture
```

Educational measurements and summaries are static reference content, not live data. Geographic positions and region boundaries are approximate.
