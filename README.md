# COSMIC HORIZON

**Abandoned but Not Forgotten** — an interactive archive of humanity's traces across the solar system.

COSMIC HORIZON pairs a navigable 3D solar system with stories about the human objects and missions that have left a mark on Earth, the Moon, and Mars. Choose a destination to browse mission artifacts, field notes, and imagery.

## Features

- Animated Three.js solar system with orbiting planets and a star field.
- Destination views for Earth, the Moon, and Mars.
- Mission records covering objects such as Apollo hardware, lunar rovers, Surveyor 3, Sojourner, Curiosity, InSight, and the Lunar Reconnaissance Orbiter.
- About page and team credits.
- Responsive interface with mouse, keyboard, and touch support.

## Run locally

There is no build step or package installation. Serve the project root with any static HTTP server, then open the local address it provides. For example, with Python installed:

```bash
python -m http.server 8000
```

Visit <http://localhost:8000>.

Serving over HTTP is recommended so local assets load consistently. The site also needs an internet connection for the Three.js CDN library, Solar System Scope textures used as fallbacks, and NASA archive images.

## Controls

- Select a planet or use the Earth, Moon, and Mars destination buttons to open a destination.
- Drag to rotate the solar system.
- Scroll to zoom.
- Use **Reset View** to return to the overview.
- Use the pause control to stop or resume planetary motion.
- On touch screens, tap and drag to explore; use the destination buttons for direct access.

## Project files

- `index.html` — main interactive experience and credits/archive dialogs.
- `about.html` — project background, sources, and team information.
- `style.css` — layout, visual styling, and responsive behavior.
- `script.js` — Three.js scene, camera interactions, destination content, and controls.
- `assets/` — local planet textures, texture data, and team logo.

## Sources and credits

Mission histories and selected imagery are credited in the site and draw on NASA mission archives and the [NASA Image and Video Library](https://images.nasa.gov/). Planet surface maps are credited to [Solar System Scope](https://www.solarsystemscope.com/textures/). Three.js is loaded from cdnjs.

The project was created by **Team Ravenforge**. See the Credits dialog on the home page for team links.
