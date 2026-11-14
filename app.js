import * as THREE from "three";

const sourceDate = "14 Nov 2026";
const MIN_YEAR = 1971;
const MAX_YEAR = 2026;
const SCHEMATIC_ORBIT_SPEED = .055;
const missions = [
  {
    id: "mars-2", year: 1971, name: "Mars 2", kind: "Orbiter · lander",
    agency: "Soviet Union", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Exact crash coordinates unknown; no agency-confirmed surface point",
    locationLabel: "impact site unconfirmed",
    locationDetail: "The supplied notes describe a crash during descent but do not identify an agency-confirmed impact area. No precise point can be plotted.",
    objective: "Not supplied in audit notes.",
    status: "Historical · precise surface location unconfirmed", statusType: "approximate", note: "The supplied audit notes explicitly caution against plotting an exact crash coordinate.",
    confidence: "Location unconfirmed in supplied audit notes", source: null,
    sourceLabel: "No reference URL supplied in audit notes", markerType: "surface",
  },
  {
    id: "mars-3", year: 1971, name: "Mars 3", kind: "Orbiter · lander",
    agency: "Soviet Union", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Proposed site not confirmed by an agency",
    locationLabel: "proposed site unconfirmed",
    locationDetail: "A proposed landing site is not agency-confirmed in the supplied notes, so the exact surface point remains unknown.",
    objective: "Not supplied in audit notes.",
    status: "Historical · proposed landing site unconfirmed", statusType: "approximate", note: "An amateur proposed identification is not agency confirmation. No precise map pin is shown.",
    confidence: "Location unconfirmed in supplied audit notes", source: null,
    sourceLabel: "No reference URL supplied in audit notes", markerType: "surface",
  },
  {
    id: "pathfinder", year: 1997, name: "Mars Pathfinder", kind: "Lander · technology demonstrator",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "4 Jul 1997 · landed",
    coordinates: null, location: "Surface object · site details not supplied in audit notes",
    locationLabel: "site details unavailable",
    locationDetail: "Pathfinder landed on 4 Jul 1997. Site-specific context and coordinates are not included in the supplied notes; Sojourner's deployment is recorded separately.",
    objective: "Not supplied in audit notes.",
    status: "Historical · completed", statusType: "ended", note: "Pathfinder landed on 4 July 1997. Sojourner was deployed approximately 6 July; its deployment is a separate event.",
    confidence: "Chronology correction in supplied audit notes", source: null,
    sourceLabel: "No reference URL supplied in audit notes", markerType: "surface",
  },
  {
    id: "sojourner", year: 1997, name: "Sojourner", kind: "Rover · Pathfinder deployment",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "Approximately 6 Jul 1997 · deployed",
    coordinates: null, location: "Final coordinates not supplied in audit notes",
    locationLabel: "final point unknown",
    locationDetail: "Sojourner was deployed at the Pathfinder site approximately 6 Jul 1997. Its final position and coordinates are not supplied.",
    objective: "Not supplied in audit notes.",
    status: "Historical · deployment date approximate", statusType: "ended", note: "Keep the deployment separate from Pathfinder's 4 July landing; the audit notes say approximately 6 July.",
    confidence: "Approximate chronology correction in supplied audit notes", source: null,
    sourceLabel: "No reference URL supplied in audit notes", markerType: "surface",
  },
  {
    id: "odyssey", year: 2001, name: "2001 Mars Odyssey", kind: "Orbiter",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Mars orbit · no surface object associated", objective: "Not supplied in audit notes.",
    status: `Operating · agency status reviewed ${sourceDate}`, statusType: "active", note: "Orbiter status is time-sensitive. This is a dated status, not a guarantee of future operations.",
    confidence: "NASA status cited in supplied audit notes", source: "https://science.nasa.gov/mission/odyssey/",
    sourceLabel: "NASA mission page", markerType: "orbiter",
  },
  {
    id: "opportunity", year: 2004, name: "Opportunity", kind: "Mars Exploration Rover · rover",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Final coordinates not supplied in audit notes",
    locationLabel: "final point unknown",
    locationDetail: "The supplied notes do not include Opportunity's final coordinates or a verified end-of-mission map point.",
    objective: "Not supplied in audit notes.",
    status: "Historical · end date not supplied", statusType: "ended", note: "Opportunity remains the longest-operating Mars rover at 5,111 sols. Its 45.16 km driving record was surpassed by Perseverance on 11 Oct 2026.",
    confidence: "NASA achievement correction in supplied audit notes", source: "https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/",
    sourceLabel: "NASA distance record", markerType: "surface",
  },
  {
    id: "mro", year: 2006, name: "Mars Reconnaissance Orbiter", kind: "Orbiter",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Mars orbit · no surface object associated", objective: "Not supplied in audit notes.",
    status: `Operating · agency status reviewed ${sourceDate}`, statusType: "active", note: "Orbiter status is time-sensitive. This is a dated status, not a guarantee of future operations.",
    confidence: "NASA status cited in supplied audit notes", source: "https://www.jpl.nasa.gov/missions/mars-reconnaissance-orbiter-mro/",
    sourceLabel: "JPL mission page", markerType: "orbiter",
  },
  {
    id: "curiosity", year: 2012, name: "Curiosity", kind: "Mars Science Laboratory · rover",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Landing / current coordinates not supplied in audit notes",
    locationLabel: "Mount Sharp · point unknown",
    locationDetail: "The notes report a 1 km elevation gain on Mount Sharp as of 26 Aug 2026. Landing and current coordinates are not supplied.",
    objective: "Not supplied in audit notes.",
    status: `Operating · NASA status reviewed ${sourceDate}`, statusType: "active", note: "The audit notes report 1 km of elevation gain on Mount Sharp as of 26 Aug 2026. Its exact current position is not supplied.",
    confidence: "NASA status and dated milestone cited in supplied audit notes", source: "https://science.nasa.gov/mars/curiosity-reaches-1-kilometer-elevation-gain/",
    sourceLabel: "NASA milestone", markerType: "surface",
  },
  {
    id: "perseverance", year: 2021, name: "Perseverance", kind: "Mars 2020 · rover",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Jezero region · landing / current coordinates not supplied",
    locationLabel: "Jezero region only",
    locationDetail: "The supplied data identifies the Jezero region only; it does not provide landing or current coordinates. The Three Forks depot is listed separately.",
    objective: "Not supplied in audit notes.",
    status: `Operating · NASA status reviewed ${sourceDate}`, statusType: "active", note: "NASA recorded 45.22 km driven on 11 Oct 2026, surpassing Opportunity's driving-distance record. This is a dated figure, not a current total. The Three Forks depot's final tube was deposited 28 Jan 2023; completion was confirmed 29 Jan 2023.",
    confidence: "NASA status and dated achievements cited in supplied audit notes", source: "https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/",
    sourceLabel: "NASA distance record", markerType: "surface",
  },
  {
    id: "maven", year: 2014, name: "MAVEN", kind: "Orbiter · atmospheric science",
    agency: "NASA · United States", launch: "Not supplied in audit notes", arrival: "21 Sep 2014 · orbit insertion",
    coordinates: null, location: "Mars orbit · post-failure orbital fate uncertain", objective: "Not supplied in audit notes.",
    status: "Ended · declared 3 Jun 2026", statusType: "ended", note: "Last signal: 6 Dec 2025 after passing behind Mars. NASA concluded it was not recoverable. It completed more than 11 years in orbit. No confirmed impact or surface location.",
    confidence: "NASA status correction in supplied audit notes", source: "https://science.nasa.gov/mission/maven/",
    sourceLabel: "NASA mission page", markerType: "orbiter",
  },
  {
    id: "hope", year: 2021, name: "Hope", kind: "Orbiter · Emirates Mars Mission",
    agency: "UAE Space Agency · United Arab Emirates", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Mars orbit · no surface object associated", objective: "Not supplied in audit notes.",
    status: "Operating · extension announced through 2028", statusType: "active", note: "Mission extension announced 17 Feb 2026. The supplied audit notes do not provide orbital coordinates or full science objectives.",
    confidence: "UAE announcement cited in supplied audit notes", source: "https://www.wam.ae/en/article/bysbi4j-uae-space-agency-announces-extension-emirates-mars",
    sourceLabel: "WAM announcement", markerType: "orbiter",
  },
  {
    id: "mars-express", year: 2003, name: "Mars Express", kind: "Orbiter",
    agency: "ESA · European Space Agency", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Mars orbit · no surface object associated", objective: "Not supplied in audit notes.",
    status: `Operating · checked ${sourceDate}`, statusType: "active", note: "ESA's mission page identifies Mars Express as in operation. Status is dated and can change.",
    confidence: "ESA status cited in supplied audit notes", source: "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express",
    sourceLabel: "ESA mission page", markerType: "orbiter",
  },
  {
    id: "mom", year: 2014, name: "Mars Orbiter Mission", kind: "Orbiter · Mangalyaan",
    agency: "ISRO · India", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Mars orbit · no surface object associated", objective: "Not supplied in audit notes.",
    status: "Ended · declared 27 Sep 2022; update published 3 Oct", statusType: "ended", note: "Communication was lost after a long eclipse in April 2022. ISRO announced the end / non-recoverable status at a national meeting on 27 Sep; do not treat April as the formal end date.",
    confidence: "ISRO sources cited in supplied audit notes", source: "https://www.isro.gov.in/MOM_NationalMeet_2022SEP.html",
    sourceLabel: "ISRO mission update", markerType: "orbiter",
  },
  {
    id: "tgo", year: 2016, name: "ExoMars Trace Gas Orbiter", kind: "Orbiter",
    agency: "ESA · European Space Agency", launch: "Not supplied in audit notes", arrival: "19 Oct 2016 · arrived at Mars",
    coordinates: null, location: "Mars orbit · no surface object associated", objective: "Not supplied in audit notes.",
    status: `Operating · verified ${sourceDate}`, statusType: "active", note: "ESA marked ten years at Mars on 19 Oct 2026. Its 2026 material confirms that TGO remains in operation.",
    confidence: "ESA status cited in supplied audit notes", source: "https://www.esa.int/Enabling_Support/Operations/A_Mars-velous_decade_Celebrating_ten_years_of_TGO",
    sourceLabel: "ESA ten-year update", markerType: "orbiter",
  },
  {
    id: "zhurong", year: 2021, name: "Zhurong", kind: "Rover",
    agency: "CNSA · China", launch: "Not supplied in audit notes", arrival: "Not supplied in audit notes",
    coordinates: null, location: "Landing / last-known coordinates not supplied in audit notes",
    locationLabel: "landing point unavailable",
    locationDetail: "Landing and last-known coordinates are not included in the supplied notes, so no precise surface point can be identified.",
    objective: "Not supplied in audit notes.",
    status: "Dormant · no confirmed reactivation", statusType: "dormant", note: "The audit notes say the rover entered hibernation in May 2022 and did not resume expected communications. Its failure mechanism and future status are unconfirmed.",
    confidence: "Operational status not independently verified in supplied audit notes", source: null,
    sourceLabel: "Not independently verified", markerType: "surface",
  },
  {
    id: "three-forks", year: 2022, name: "Three Forks sample depot", kind: "Perseverance sample depot · surface object",
    agency: "NASA · United States", launch: "Not applicable · depot", arrival: "First tube: 21 Dec 2022 · final tube: 28 Jan 2023",
    coordinates: null, location: "Jezero Crater · 10-tube depot; per-tube coordinates not included",
    locationLabel: "Jezero Crater · sample depot",
    locationDetail: "The 10 tubes were laid out as a mapped zigzag pattern in Jezero Crater. Per-tube coordinates are not transcribed in the supplied notes.",
    objective: "Preserve a mapped set of samples for possible future retrieval.",
    status: "Completed · NASA confirmed 29 Jan 2023", statusType: "ended", note: "Ten tubes: seven rock cores, one regolith sample, one atmospheric sample, and one witness tube. Each is about 18.6 cm long; tubes were laid out in a mapped zigzag pattern.",
    confidence: "NASA depot map and completion announcement cited in supplied audit notes", source: "https://science.nasa.gov/resource/perseverances-three-forks-sample-depot-map/",
    sourceLabel: "NASA depot map", markerType: "surface",
  },
  {
    id: "escapade", year: 2025, name: "ESCAPADE", kind: "Twin-spacecraft science mission · en route",
    agency: "NASA · United States", launch: "Nov 2025 · launched", arrival: "Planned for Sep 2027 · not yet at Mars",
    coordinates: null, location: "En route to Mars · not a Mars surface object", objective: "Not supplied in audit notes.",
    status: "En route · arrival planned, not achieved", statusType: "planned", note: "As of 14 Nov 2026 ESCAPADE is en route. It is not shown as a landed object or an orbital Mars mission.",
    confidence: "NASA mission status cited in supplied audit notes", source: "https://science.nasa.gov/mission/escapade/",
    sourceLabel: "NASA mission page", markerType: "en-route",
  },
];
missions.sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));

const missionArtwork = {
  "mars-2": {
    src: "./assets/missions/mars-2-search.jpg",
    alt: "Mars Reconnaissance Orbiter image of an area searched for Mars 2 debris.",
    caption: "Mars 2 search area; this image does not confirm the impact site.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA18888",
  },
  "mars-3": {
    src: "./assets/missions/mars-3-candidate.jpg",
    alt: "Pair of HiRISE images showing possible Mars 3 lander hardware; identification is uncertain.",
    caption: "Possible Mars 3 hardware; identification remains unconfirmed.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA16920",
  },
  pathfinder: {
    src: "./assets/missions/pathfinder-ramp.jpg",
    alt: "Mars Pathfinder rear rover ramp unfurled on the Martian surface.",
    caption: "Pathfinder rear ramp, photographed on Sol 2.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA00627",
  },
  sojourner: {
    src: "./assets/missions/sojourner-deployment.jpg",
    alt: "Sojourner rover still latched to a Pathfinder lander petal on Sol 1.",
    caption: "Sojourner before deployment, on Pathfinder's first Martian day.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA00632",
  },
  odyssey: {
    src: "./assets/missions/odyssey-themis.jpg",
    alt: "First thermal infrared image of Mars acquired by the 2001 Mars Odyssey spacecraft.",
    caption: "First THEMIS infrared image from Mars Odyssey.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA03459",
  },
  opportunity: {
    src: "./assets/missions/opportunity-from-orbit.jpg",
    alt: "Opportunity rover and its tracks on Murray Ridge, photographed from Mars orbit.",
    caption: "Opportunity on Murray Ridge, seen from orbit.",
    credit: "NASA/JPL-Caltech/University of Arizona",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA17941",
  },
  mro: {
    src: "./assets/missions/mro-configuration.jpg",
    alt: "NASA's Mars Reconnaissance Orbiter spacecraft near final configuration before launch.",
    caption: "Mars Reconnaissance Orbiter during pre-launch assembly.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA07214",
  },
  curiosity: {
    src: "./assets/missions/curiosity-from-orbit.jpg",
    alt: "Curiosity rover on Mars, photographed by the Mars Reconnaissance Orbiter after landing.",
    caption: "Curiosity spotted on the Martian surface from orbit.",
    credit: "NASA/JPL-Caltech/University of Arizona",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA16000",
  },
  perseverance: {
    src: "./assets/missions/perseverance-jezero.jpg",
    alt: "Perseverance's view across Jezero Crater on mission sol 143.",
    caption: "Perseverance panorama across Jezero Crater.",
    credit: "NASA/JPL-Caltech/ASU/MSSS",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA24745",
  },
  maven: {
    src: "./assets/missions/maven-concept.jpg",
    alt: "Artist's concept of the MAVEN spacecraft near Mars.",
    caption: "Artist's concept of MAVEN at Mars.",
    credit: "NASA",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA14761",
  },
  hope: {
    src: "./assets/missions/hope-olympus-mons.png",
    alt: "Processed view of Olympus Mons from the Emirates Mars Mission Hope orbiter.",
    caption: "Olympus Mons observed by Hope; processed science imagery.",
    credit: "Andrea Luck",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    source: "https://commons.wikimedia.org/wiki/File:Mars_-_Olympus_Mons_-_Hope_Mission,_Orbit_12_(52268121690).png",
  },
  "mars-express": {
    src: "./assets/missions/mars-express-spacecraft.jpg",
    alt: "ESA illustration of the Mars Express spacecraft.",
    caption: "ESA image of the Mars Express spacecraft.",
    credit: "European Space Agency",
    license: "CC BY-SA 3.0 IGO",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/igo/",
    source: "https://commons.wikimedia.org/wiki/File:Mars_Express.jpg",
  },
  mom: {
    src: "./assets/missions/mangalyaan-concept.jpg",
    alt: "Artist's concept of India's Mars Orbiter Mission spacecraft.",
    caption: "Artist's concept of Mars Orbiter Mission; not a spacecraft photograph.",
    credit: "Nesnad",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Mars_Orbiter_Mission_-_India_-_ArtistsConcept.jpg",
  },
  tgo: {
    src: "./assets/missions/tgo-spiders.png",
    alt: "Spider-like surface features on Mars imaged by ESA's Trace Gas Orbiter.",
    caption: "Surface features observed by TGO; this is not a spacecraft image.",
    credit: "European Space Agency",
    license: "CC BY-SA 3.0 IGO",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/igo/",
    source: "https://commons.wikimedia.org/wiki/File:%E2%80%98Spiders%E2%80%99_on_Mars_as_seen_by_ESA%E2%80%99s_ExoMars_Trace_Gas_Orbiter_ESA496676.png",
  },
  zhurong: {
    src: "./assets/missions/zhurong-from-orbit.jpg",
    alt: "Tianwen-1 lander and Zhurong rover in southern Utopia Planitia, photographed from orbit.",
    caption: "Tianwen-1 lander and Zhurong rover seen from orbit.",
    credit: "NASA/JPL/University of Arizona",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://www.uahirise.org/hipod/ESP_069665_2055",
  },
  "three-forks": {
    src: "./assets/missions/three-forks-depot.jpg",
    alt: "Perseverance selfie showing the rover beside nine of the ten tubes deposited at Three Forks.",
    caption: "Perseverance beside nine of the ten Three Forks tubes.",
    credit: "NASA/JPL-Caltech/MSSS",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/PIA25735",
  },
  escapade: {
    src: "./assets/missions/escapade-spacecraft.jpg",
    alt: "NASA's two ESCAPADE spacecraft being inspected at Astrotech before launch.",
    caption: "ESCAPADE's twin spacecraft during pre-launch processing.",
    credit: "NASA/Kim Shiflett",
    license: "Public domain",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    source: "https://images.nasa.gov/details/KSC-20240822-PH-KLS01_0033",
  },
};

const $ = (selector) => document.querySelector(selector);
const canvasHost = $("#mars-canvas");
const stage = $("#globe-stage");
const markerLayer = $("#marker-layer");
const startRange = $("#start-range");
const endRange = $("#end-range");
const startInput = $("#start-year");
const endInput = $("#end-year");
const missionPanel = $("#mission-panel");
const infoToggle = $("#open-info");
const missionSearch = $("#mission-search");
const missionSuggestions = $("#mission-suggestions");
const eraFilters = $("#era-filters");
const filtersToggle = $("#filters-toggle");
missions.forEach((mission) => {
  const option = document.createElement("option");
  option.value = mission.name;
  option.label = mission.agency;
  missionSuggestions.appendChild(option);
});
let selectedId = "maven";
let currentStart = MIN_YEAR;
let currentEnd = MAX_YEAR;
let markerElements = new Map();
let satelliteModels = new Map();
let satelliteOrbits = new Map();
let orbitalPaths = new Map();
let scene, camera, renderer, mars, clouds, stars;
let drag = null;
let previousFrameTime = null;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let autoRotation = !prefersReducedMotion.matches;
let targetZoom = 4.15;

const satelliteBusMaterial = new THREE.MeshStandardMaterial({ color: 0xb9a98b, metalness: .62, roughness: .42 });
const satellitePanelMaterial = new THREE.MeshStandardMaterial({ color: 0x28517a, metalness: .55, roughness: .48, emissive: 0x0b1d32, emissiveIntensity: .35 });
const satelliteDetailMaterial = new THREE.MeshStandardMaterial({ color: 0xe7d2a7, metalness: .7, roughness: .38 });
const surfaceMarkerDirections = [
  [-.42, .17, .89], [.48, .34, .81], [.63, -.14, .76], [-.67, -.27, .69],
  [-.12, -.46, .88], [.13, .57, .81], [.82, .02, .57], [-.30, .52, .80],
  [.31, -.65, .69], [-.86, .16, .48], [.04, -.11, .99], [.70, .48, .52],
  [-.16, .78, .60], [-.56, .66, .50], [.62, .60, .51], [-.74, -.51, .42],
  [.39, -.78, .49],
];

function loadMarsTexture() {
  const texture = new THREE.TextureLoader().load(
    "./assets/2k_mars.jpg",
    (loadedTexture) => {
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      $("#texture-status").textContent = "2K SURFACE MAP LOADED";
      mars.material.color.set(0xffffff);
    },
    undefined,
    (error) => {
      $("#texture-status").textContent = "SURFACE MAP COULD NOT BE LOADED";
      console.error("Could not load the supplied Mars texture at ./assets/2k_mars.jpg.", error);
    },
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

function createScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(33, 1, .1, 100);
  camera.position.set(0, .06, targetZoom);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  canvasHost.appendChild(renderer.domElement);

  const ambient = new THREE.HemisphereLight(0xc4d1df, 0x3e201b, 1.35);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffdfc4, 3.2);
  key.position.set(-4, 3, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe46c43, 2.35);
  rim.position.set(3, -1.2, -4);
  scene.add(rim);

  const surfaceMaterial = new THREE.MeshStandardMaterial({ color: 0x9f5034, roughness: 1, metalness: 0 });
  mars = new THREE.Mesh(
    new THREE.SphereGeometry(1, 112, 80),
    surfaceMaterial,
  );
  surfaceMaterial.map = loadMarsTexture();
  mars.rotation.z = .13;
  scene.add(mars);
  createOrbitalSystem();

  clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.009, 96, 64),
    new THREE.MeshBasicMaterial({ color: 0xefa37b, transparent: true, opacity: .045, side: THREE.BackSide }),
  );
  scene.add(clouds);
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.045, 72, 56),
    new THREE.ShaderMaterial({
      vertexShader: "varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "varying vec3 vNormal; void main(){float rim=pow(0.72-dot(vNormal,vec3(0.0,0.0,1.0)),3.0);gl_FragColor=vec4(0.78,0.26,0.13,rim*0.35);}",
      blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
    }),
  );
  scene.add(atmosphere);
  stars = createStars();
  scene.add(stars);
  setupInteraction();
  buildMarkerElements();
  resize();
  window.addEventListener("resize", resize, { passive: true });
  animate();
}

function createStars() {
  const positions = [], sizes = [];
  for (let i = 0; i < 380; i++) {
    const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
    const radius = 4 + Math.random() * 7;
    positions.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
    sizes.push(Math.random() < .08 ? 2 : 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
  return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xd5d9de, size: .017, transparent: true, opacity: .52, sizeAttenuation: true }));
}

function createSatelliteModel() {
  const satellite = new THREE.Group();
  satellite.add(new THREE.Mesh(new THREE.BoxGeometry(.046, .038, .036), satelliteBusMaterial));

  [-1, 1].forEach((side) => {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(.078, .006, .054), satellitePanelMaterial);
    panel.position.x = side * .078;
    satellite.add(panel);

    [-1, 0, 1].forEach((segment) => {
      const gridLine = new THREE.Mesh(new THREE.BoxGeometry(.0018, .007, .054), satelliteDetailMaterial);
      gridLine.position.set(side * .078 + segment * .023, 0, 0);
      satellite.add(gridLine);
    });

    const support = new THREE.Mesh(new THREE.BoxGeometry(.012, .008, .008), satelliteDetailMaterial);
    support.position.x = side * .037;
    satellite.add(support);
  });

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(.014, .014, .004, 16), satelliteDetailMaterial);
  antenna.position.y = .022;
  satellite.add(antenna);
  const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(.0015, .0015, .018, 6), satelliteBusMaterial);
  antennaStem.position.set(0, .032, 0);
  satellite.add(antennaStem);
  return satellite;
}

function createOrbitalSystem() {
  const orbitalMissions = missions.filter((mission) => mission.markerType === "orbiter");
  orbitalMissions.forEach((mission, index) => {
    const orbitRadius = 1.02 + index * .05;
    const inclination = .18 + index * .11;
    const nodeAngle = index / orbitalMissions.length * Math.PI * 2;
    const cosNode = Math.cos(nodeAngle);
    const sinNode = Math.sin(nodeAngle);
    const cosInclination = Math.cos(inclination);
    const sinInclination = Math.sin(inclination);
    const orbitAxis = new THREE.Vector3(cosNode, sinNode, 0);
    const orbitSide = new THREE.Vector3(
      -sinNode * cosInclination,
      cosNode * cosInclination,
      sinInclination,
    );
    const orbitPoints = [];
    const orbitPointCount = 128;

    for (let point = 0; point < orbitPointCount; point++) {
      const angle = point / orbitPointCount * Math.PI * 2;
      orbitPoints.push(
        orbitAxis.clone().multiplyScalar(Math.cos(angle))
          .addScaledVector(orbitSide, Math.sin(angle)).multiplyScalar(orbitRadius),
      );
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbit = new THREE.LineLoop(
      orbitGeometry,
      new THREE.LineBasicMaterial({ color: 0xff5fa2, linewidth: 1, transparent: true, opacity: .192, depthWrite: false }),
    );
    mars.add(orbit);
    orbitalPaths.set(mission.id, orbit);

    const phase = Math.random() * Math.PI * 2;
    const radial = orbitAxis.clone().multiplyScalar(Math.cos(phase))
      .addScaledVector(orbitSide, Math.sin(phase)).normalize();
    const position = radial.clone().multiplyScalar(orbitRadius);
    const tangent = orbitAxis.clone().multiplyScalar(-Math.sin(phase))
      .addScaledVector(orbitSide, Math.cos(phase)).normalize();
    const localUp = tangent.clone().cross(radial).normalize();
    const satellite = createSatelliteModel();
    satellite.position.copy(position);
    satellite.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(tangent, radial, localUp));
    mars.add(satellite);
    satelliteModels.set(mission.id, satellite);
    satelliteOrbits.set(mission.id, {
      model: satellite,
      axis: orbitAxis,
      side: orbitSide,
      radius: orbitRadius,
      phase,
      speed: SCHEMATIC_ORBIT_SPEED * (.72 + Math.random() * .56),
    });
  });
  updateOrbitalFocus();
}

function resize() {
  if (!renderer) return;
  const width = Math.max(1, canvasHost.clientWidth);
  const height = Math.max(1, canvasHost.clientHeight);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  updateMarkers();
}

function buildMarkerElements() {
  missions.forEach((mission) => {
    if (mission.markerType === "en-route") return;
    const button = document.createElement("button");
    button.className = `mission-marker ${mission.markerType === "orbiter" ? "orbiter" : "surface"}`;
    button.type = "button";
    button.setAttribute("aria-label", mission.markerType === "orbiter"
      ? `Open ${mission.name} mission file. Schematic 3D satellite and selected orbit.`
      : `Open ${mission.name} mission file. Schematic marker for ${mission.locationLabel}; coordinates are not supplied.`);
    button.innerHTML = `<span class="marker-tooltip">${mission.name} · ${mission.markerType === "orbiter" ? "schematic orbit" : `${mission.locationLabel} · schematic`}</span>`;
    button.addEventListener("click", () => selectMission(mission.id));
    markerLayer.appendChild(button);
    markerElements.set(mission.id, button);
  });
  updateMarkers();
}

function updateMarkers() {
  if (!camera || !mars) return;
  const width = stage.clientWidth, height = stage.clientHeight;
  missions.forEach((mission, index) => {
    const marker = markerElements.get(mission.id);
    if (!marker) return;
    const satellite = satelliteModels.get(mission.id);
    const point = satellite
      ? satellite.position.clone().applyEuler(mars.rotation)
      : new THREE.Vector3(...surfaceMarkerDirections[index % surfaceMarkerDirections.length]).normalize().multiplyScalar(1.006).applyEuler(mars.rotation);
    const isBehind = point.z < (mission.markerType === "orbiter" ? -.15 : .015);
    const isInRange = mission.year >= currentStart && mission.year <= currentEnd;
    if (satellite) {
      satellite.visible = isInRange && !isBehind;
      satellite.scale.setScalar(mission.id === selectedId ? 1.28 : 1);
    }
    point.project(camera);
    marker.style.left = `${width * (point.x + 1) / 2}px`;
    marker.style.top = `${height * (1 - point.y) / 2}px`;
    marker.classList.toggle("hidden", !isInRange || isBehind);
    marker.classList.toggle("selected", mission.id === selectedId);
    marker.classList.toggle("unfocused", mission.markerType === "orbiter" && mission.id !== selectedId);
  });
}

function setupInteraction() {
  const element = renderer.domElement;
  element.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    drag = { x: event.clientX, y: event.clientY, moved: false };
    autoRotation = false;
    element.setPointerCapture(event.pointerId);
  });
  element.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
    mars.rotation.y += dx * .006;
    mars.rotation.x = THREE.MathUtils.clamp(mars.rotation.x + dy * .004, -.8, .8);
    drag.x = event.clientX;
    drag.y = event.clientY;
    clouds.rotation.copy(mars.rotation);
    updateMarkers();
  });
  const release = () => { autoRotation = !prefersReducedMotion.matches; drag = null; };
  element.addEventListener("pointerup", release);
  element.addEventListener("pointercancel", release);
  element.addEventListener("wheel", (event) => {
    event.preventDefault();
    targetZoom = THREE.MathUtils.clamp(targetZoom + event.deltaY * .0035, 2.6, 6);
  }, { passive: false });
  element.addEventListener("dblclick", () => resetView());
}

function updateSatellitePositions(delta) {
  if (prefersReducedMotion.matches) return;
  satelliteOrbits.forEach((orbit) => {
    orbit.phase = (orbit.phase + orbit.speed * delta + Math.PI * 2) % (Math.PI * 2);
    const radial = orbit.axis.clone().multiplyScalar(Math.cos(orbit.phase))
      .addScaledVector(orbit.side, Math.sin(orbit.phase)).normalize();
    const tangent = orbit.axis.clone().multiplyScalar(-Math.sin(orbit.phase))
      .addScaledVector(orbit.side, Math.cos(orbit.phase)).normalize();
    orbit.model.position.copy(radial).multiplyScalar(orbit.radius);
    orbit.model.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(tangent, radial, tangent.clone().cross(radial).normalize()),
    );
  });
}

function animate(timestamp = 0) {
  requestAnimationFrame(animate);
  const delta = previousFrameTime === null ? 0 : Math.min((timestamp - previousFrameTime) / 1000, .05);
  previousFrameTime = timestamp;
  updateSatellitePositions(delta);
  if (autoRotation && !drag) {
    mars.rotation.y += .0007 * delta * 60;
    clouds.rotation.y += .00076 * delta * 60;
  }
  camera.position.z += (targetZoom - camera.position.z) * .08;
  renderer.render(scene, camera);
  updateMarkers();
}

function resetView() {
  mars.rotation.set(0, 0, .13);
  clouds.rotation.copy(mars.rotation);
  targetZoom = 4.15;
  autoRotation = !prefersReducedMotion.matches;
  updateMarkers();
}

function selectMission(id, openInfo = true) {
  selectedId = id;
  renderMission();
  updateMarkers();
  updateOrbitalFocus();
  renderTimeline();
  if (openInfo) setInfoPanelOpen(true);
}

function selectSearchedMission() {
  const query = missionSearch.value.trim().toLowerCase();
  if (!query) return;
  const mission = missions.find((item) => item.name.toLowerCase() === query)
    || missions.find((item) => `${item.name} ${item.kind} ${item.agency}`.toLowerCase().includes(query));
  if (!mission) return;
  if (mission.year < currentStart || mission.year > currentEnd) {
    setRange(Math.min(currentStart, mission.year), Math.max(currentEnd, mission.year));
  }
  selectMission(mission.id);
  missionSearch.value = "";
}

function updateOrbitalFocus() {
  const selectedMission = missions.find((mission) => mission.id === selectedId);
  const selectedOrbiterInRange = selectedMission?.markerType === "orbiter"
    && selectedMission.year >= currentStart
    && selectedMission.year <= currentEnd;
  orbitalPaths.forEach((orbit, missionId) => {
    const mission = missions.find((item) => item.id === missionId);
    const inRange = mission.year >= currentStart && mission.year <= currentEnd;
    const active = inRange && missionId === selectedId;
    orbit.visible = inRange;
    orbit.material.opacity = active ? .48 : selectedOrbiterInRange ? .02 : .035;
  });
}

function setInfoPanelOpen(open) {
  missionPanel.classList.toggle("is-open", open);
  missionPanel.setAttribute("aria-hidden", String(!open));
  missionPanel.inert = !open;
  infoToggle.setAttribute("aria-expanded", String(open));
  (open ? $("#close-info") : infoToggle).focus({ preventScroll: true });
}

function renderMission() {
  const mission = missions.find((item) => item.id === selectedId);
  if (!mission) return;
  const artwork = missionArtwork[mission.id];
  const index = missions.filter((item) => item.year >= currentStart && item.year <= currentEnd).findIndex((item) => item.id === mission.id);
  const visible = missions.filter((item) => item.year >= currentStart && item.year <= currentEnd);
  $("#mission-index").textContent = `${String(Math.max(index + 1, 1)).padStart(2, "0")} / ${String(visible.length).padStart(2, "0")}`;
  $("#mission-content").innerHTML = `
    <div class="mission-kicker">${mission.year} <span>·</span> ${mission.markerType === "orbiter" ? "ORBITAL MISSION" : mission.markerType === "en-route" ? "EN ROUTE · NOT AT MARS" : "SURFACE EXPLORATION"}</div>
    <figure class="mission-image">
      <img src="${artwork.src}" alt="${artwork.alt}" decoding="async">
      <figcaption>
        <span class="mission-image-caption">${artwork.caption}</span>
        <span class="mission-image-credit">Credit: ${artwork.credit} · <a href="${artwork.licenseUrl}" target="_blank" rel="noreferrer">${artwork.license}</a> · <a href="${artwork.source}" target="_blank" rel="noreferrer">Source ↗</a></span>
      </figcaption>
    </figure>
    <h2 class="mission-name">${mission.name}</h2>
    <p class="mission-subtitle">${mission.kind}<br>${mission.agency}</p>
    <div class="mission-status ${mission.statusType}">${mission.status}</div>
    <dl class="mission-facts">
      ${fact("LAUNCH", mission.launch)}
      ${fact("MARS ARRIVAL", mission.arrival)}
      ${fact("LOCATION", mission.location)}
      ${fact("OBJECTIVE", mission.objective)}
    </dl>
    <details class="mission-extra">
      <summary>MISSION NOTES, COORDINATES &amp; SOURCES</summary>
      <dl class="mission-facts">
        ${mission.locationDetail ? fact("LOCATION DETAIL", mission.locationDetail) : ""}
        ${fact("POINT STATUS", mission.coordinates === null
        ? mission.markerType === "orbiter" ? "Orbit path is schematic; orbital coordinates are not supplied." : "Surface marker is schematic; site coordinates are not supplied."
        : "Coordinates available in project data.")}
        ${fact("COORDINATES", mission.coordinates === null ? "Latitude: null · longitude: null · reference: not supplied" : "Coordinate reference not supplied")}
        ${fact("MISSION NOTE", mission.note)}
        ${fact("EVIDENCE", mission.confidence)}
        ${fact("REFERENCE", mission.source ? `<a href="${mission.source}" target="_blank" rel="noreferrer">${mission.sourceLabel} ↗</a>` : mission.sourceLabel)}
      </dl>
    </details>`;
  $("#mission-content").scrollTop = 0;
  const locationIsOrbiter = mission.markerType === "orbiter";
  $("#location-disclosure").textContent = locationIsOrbiter
    ? "Satellite models, orbital paths, and speeds are schematic; no orbital elements or coordinates are supplied."
    : mission.markerType === "en-route"
      ? "ESCAPADE is en route to Mars, not at Mars; no Mars surface coordinates are assigned."
      : `${mission.locationLabel}. The globe marker is schematic, not a confirmed map point. Coordinates remain null.`;
  $("#scene-caption").textContent = mission.markerType === "orbiter"
    ? `${mission.name} · schematic orbital view`
    : mission.markerType === "en-route"
      ? `${mission.name} · en route to Mars`
      : `${mission.name} · ${mission.locationLabel}`;
}

function fact(label, value) {
  return `<div class="fact-row"><dt>${label}</dt><dd>${value}</dd></div>`;
}

function renderTimeline() {
  const visible = missions.filter((mission) => mission.year >= currentStart && mission.year <= currentEnd);
  $("#visible-count").textContent = String(visible.filter((mission) => mission.markerType !== "en-route").length).padStart(2, "0");
  $("#timeline-count").textContent = visible.length;
  $("#surface-count").textContent = visible.filter((mission) => mission.markerType === "surface").length;
  $("#orbiter-count").textContent = visible.filter((mission) => mission.markerType === "orbiter").length;
  $("#year-span").textContent = `(${currentEnd - currentStart} yrs)`;
  document.querySelectorAll(".era-chip").forEach((chip) => {
    const active = Number(chip.dataset.start) === currentStart && Number(chip.dataset.end) === currentEnd;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  const ruler = $("#timeline-ruler");
  ruler.replaceChildren();
  [MIN_YEAR, 1980, 1990, 2000, 2010, 2020, MAX_YEAR].forEach((year, index, years) => {
    const tick = document.createElement("span");
    tick.textContent = year;
    tick.style.left = `${((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100}%`;
    if (index === 0) tick.classList.add("first");
    if (index === years.length - 1) tick.classList.add("last");
    ruler.appendChild(tick);
  });
  const markers = $("#timeline-markers");
  const labels = $("#timeline-events");
  markers.replaceChildren();
  labels.replaceChildren();
  missions.forEach((mission, index) => {
    const percent = ((mission.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
    const sameYearOffset = missions.slice(0, index).filter((item) => item.year === mission.year).length;
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `timeline-event-marker ${mission.markerType === "orbiter" ? "orbit-marker" : ""} ${visible.includes(mission) ? "" : "muted"} ${mission.id === selectedId ? "selected" : ""}`;
    marker.style.left = `${percent}%`;
    marker.style.top = `${3 + sameYearOffset * 11}px`;
    marker.setAttribute("aria-label", `${mission.year}: ${mission.name}`);
    marker.title = `${mission.year} · ${mission.name}`;
    marker.disabled = !visible.includes(mission);
    if (mission.id === selectedId && visible.includes(mission)) marker.setAttribute("aria-current", "true");
    marker.addEventListener("click", () => selectMission(mission.id));
    markers.appendChild(marker);
    if (visible.includes(mission) && mission.id === selectedId) {
      const label = document.createElement("span");
      label.className = `timeline-event-label ${mission.id === selectedId ? "active" : ""}`;
      label.textContent = `${mission.year} · ${mission.name}`;
      label.style.left = `${percent}%`;
      if (percent < 2) label.classList.add("first");
      if (percent > 98) label.classList.add("last");
      labels.appendChild(label);
    }
  });
  const startPercent = ((currentStart - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  const endPercent = ((currentEnd - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  $("#track-selected").style.left = `${startPercent}%`;
  $("#track-selected").style.right = `${100 - endPercent}%`;
  updateMarkers();
  if (!visible.some((mission) => mission.id === selectedId) && visible.length) {
    selectedId = visible[0].id;
    renderMission();
    updateMarkers();
  }
  if (!visible.length) {
    $("#mission-index").textContent = "00 / 00";
    $("#mission-content").innerHTML = `<div class="mission-kicker">NO MISSIONS IN RANGE</div><h2 class="mission-name">A quiet chapter</h2><p class="mission-subtitle">Try widening the year range to see Mars exploration milestones.</p>`;
  }
  updateOrbitalFocus();
}

function setRange(start, end) {
  currentStart = Math.min(MAX_YEAR, Math.max(MIN_YEAR, Math.min(start, end)));
  currentEnd = Math.min(MAX_YEAR, Math.max(currentStart, Math.max(start, end)));
  startRange.value = currentStart;
  endRange.value = currentEnd;
  startInput.value = currentStart;
  endInput.value = currentEnd;
  renderTimeline();
}

startRange.addEventListener("input", () => setRange(Number(startRange.value), currentEnd));
endRange.addEventListener("input", () => setRange(currentStart, Number(endRange.value)));
const commitStartYear = () => setRange(Number(startInput.value), currentEnd);
const commitEndYear = () => setRange(currentStart, Number(endInput.value));
startInput.addEventListener("change", commitStartYear);
endInput.addEventListener("change", commitEndYear);
startInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") commitStartYear();
});
endInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") commitEndYear();
});
$("#reset-history").addEventListener("click", () => setRange(MIN_YEAR, MAX_YEAR));
document.querySelectorAll(".era-chip").forEach((chip) => {
  chip.addEventListener("click", () => setRange(Number(chip.dataset.start), Number(chip.dataset.end)));
});
$("#reset-view").addEventListener("click", resetView);
$("#zoom-in").addEventListener("click", () => { targetZoom = THREE.MathUtils.clamp(targetZoom - .35, 2.6, 6); });
$("#zoom-out").addEventListener("click", () => { targetZoom = THREE.MathUtils.clamp(targetZoom + .35, 2.6, 6); });
filtersToggle.addEventListener("click", () => {
  const expanded = eraFilters.classList.toggle("is-collapsed") === false;
  filtersToggle.setAttribute("aria-expanded", String(expanded));
});
missionSearch.addEventListener("change", selectSearchedMission);
missionSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") selectSearchedMission();
});
infoToggle.addEventListener("click", () => setInfoPanelOpen(true));
$("#close-info").addEventListener("click", () => setInfoPanelOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && missionPanel.classList.contains("is-open")) setInfoPanelOpen(false);
});

const sourcesDialog = $("#sources-dialog");
$("#sources-button").addEventListener("click", () => sourcesDialog.showModal());
$("#close-sources").addEventListener("click", () => sourcesDialog.close());
sourcesDialog.addEventListener("click", (event) => {
  if (event.target === sourcesDialog) sourcesDialog.close();
});

setRange(MIN_YEAR, MAX_YEAR);
selectMission(selectedId, false);
createScene();
