import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const categories = [
  {
    title: "General Information",
    intro: "Earth is a rocky, oblate planet with a dynamic surface, liquid-water oceans, and diverse life. Measurements are rounded reference values rather than live data.",
    facts: ["Age: about 4.54 billion years; mean radius: 6,371 km; equatorial circumference: about 40,075 km", "Surface area: about 510 million km²; water covers about 71% and land about 29%", "Average surface gravity is about 9.8 m/s²; Earth has one natural moon", "Earth is slightly wider at the equator than from pole to pole"]
  },
  {
    title: "Earth's Structure and Internal Layers",
    intro: "Earth's interior is layered by composition and physical state. Heat escaping from the deep interior and slow mantle motion help power plate tectonics.",
    facts: ["Crust: solid outer layer, about 5–10 km thick beneath much ocean floor and roughly 30–70 km beneath many continents and mountain belts; continental crust is generally thicker and less dense", "Mantle: hot, mostly solid silicate rock extending to about 2,900 km depth; it flows very slowly over geological time", "Outer core: mostly liquid iron and nickel from about 2,900 to 5,150 km depth; its moving conductive metal generates Earth's magnetic field", "Inner core: mostly solid iron and nickel from about 5,150 km depth to Earth's center, held solid by immense pressure"]
  },
  {
    title: "Continents and Oceans",
    intro: "The familiar seven-continent model is one convention: some systems combine Europe and Asia as Eurasia or treat the Americas as one continent. The five named oceans form one connected global ocean.",
    facts: ["Asia is largest by area and population: Himalayas, Tibetan Plateau, Gobi, Arabian Peninsula, Siberian plains, Deccan Plateau, and Southeast Asian islands", "Africa includes the Sahara, Sahel, Congo Basin, East African Rift, Ethiopian Highlands, Kalahari, and Namib; key features include the Nile, Congo, Lake Victoria, Kilimanjaro, and Okavango Delta", "North America includes the Rockies, Appalachians, Great Plains, Canadian Shield, Great Basin, Arctic tundra, Great Lakes, and Mississippi–Missouri system; Central America and the Caribbean connect and border the region", "South America includes the Andes, Amazon Basin, Brazilian Highlands, Atacama, Patagonia, and Pampas; Antarctica is ice-covered, Europe is a varied western Eurasian peninsula, and Oceania spans Australia, New Zealand, Melanesia, Micronesia, and Polynesia", "Pacific: largest and deepest; Atlantic: second-largest; Indian: third-largest and strongly influenced by monsoons; Southern: circles Antarctica; Arctic: smallest and shallowest, with declining seasonal sea ice"]
  },
  {
    title: "Atmosphere and Its Layers",
    intro: "Earth's atmosphere supplies breathable air, moderates temperature, and protects life from much harmful radiation. Water vapour varies with place and weather.",
    facts: ["Dry air near sea level is about 78% nitrogen, 21% oxygen, and 0.93% argon; carbon dioxide is a small but climate-important fraction, above 400 parts per million in the reference", "Troposphere: lowest layer and home to most weather; stratosphere: contains ozone that absorbs much ultraviolet radiation", "Mesosphere: many meteors burn up; thermosphere: very thin, hot air where auroras occur mainly; exosphere: outer transition into space"]
  },
  {
    title: "Earth's Rotation and Revolution",
    intro: "Earth's spin creates the day-night cycle. Its orbit and tilted axis shape the year and seasons.",
    facts: ["One rotation relative to distant stars takes about 23 hours 56 minutes; the average solar day is about 24 hours", "One orbit around the Sun takes about 365.2422 days", "The axis is tilted about 23.4°; the hemisphere tilted toward the Sun gets more direct sunlight and longer days", "Seasons are opposite between hemispheres; near the equator, wet and dry seasons may be more prominent"]
  },
  {
    title: "Climate and Weather",
    intro: "Weather is the short-term state of the air; climate describes long-term patterns, commonly assessed over about 30 years. Sunlight, oceans, land, and the atmosphere interact to shape both.",
    facts: ["Climate zones include tropical, dry, temperate, continental, polar, and highland climates", "The ITCZ, seasonal monsoons, ENSO, jet streams, and Hadley, Ferrel, and Polar circulation cells redistribute heat and moisture", "Ocean currents influence global heat transport and coastal climates; tropical cyclones are called hurricanes, typhoons, or cyclones in different basins", "Earth's axial tilt is the main reason for seasons; human greenhouse-gas emissions are driving modern climate change"]
  },
  {
    title: "Natural Resources",
    intro: "Earth's water, soils, ecosystems, minerals, and energy sources support life and human societies. Their availability and renewal vary, so use and conservation matter.",
    facts: ["Renewable resources include sunlight, wind, flowing water, forests, and fisheries when managed within ecological limits", "Fresh water, fertile soil, wetlands, and healthy ecosystems are essential but unevenly distributed", "Minerals and fossil fuels form over geological time and are finite on human timescales", "Extraction, pollution, overuse, and habitat loss can degrade the natural systems that provide resources"]
  },
  {
    title: "Biodiversity and Ecosystems",
    intro: "Biomes are broad ecological regions; ecosystems are the living communities and physical processes within them. Biodiversity includes variation in species, genes, and ecosystems.",
    facts: ["Major biomes include tropical and temperate forests, savannas, deserts, grasslands, Mediterranean shrublands, boreal forest, tundra, polar ice, mountain, freshwater, and marine habitats", "High-value regions include the Tropical Andes, Amazon and Congo, Madagascar, Sundaland, Wallacea, Himalaya, Western Ghats and Sri Lanka, Cape Floristic Region, Mediterranean Basin, Mesoamerica, Caribbean, and Coral Triangle", "Wildlife examples include elephants, lions, giraffes, tigers, pandas, bison, jaguars, capybaras, bears, kangaroos, kiwis, penguins, seals, and whales", "Habitat loss, pollution, invasive species, climate change, and overuse threaten many species and ecosystems"]
  },
  {
    title: "Natural Disasters",
    intro: "A natural hazard becomes a disaster when it seriously affects exposed communities. Plate motion shapes many earthquake and volcano zones; preparedness and resilient infrastructure reduce risk.",
    facts: ["Major plates include Pacific, North American, South American, Eurasian, African, Antarctic, Indo-Australian, Nazca, Philippine Sea, Arabian, Caribbean, Cocos, Juan de Fuca, and Scotia", "Divergent boundaries move apart; convergent boundaries collide or subduct; transform boundaries slide past one another", "Notable active regions include the Pacific Ring of Fire, Mid-Atlantic Ridge, East African Rift, Himalaya collision zone, San Andreas system, Japan, and Indonesia", "Hazards include earthquakes, volcanoes, tsunamis, cyclones, floods, droughts, landslides, wildfires, heatwaves, and cold waves"]
  },
  {
    title: "Earth's Magnetic Field",
    intro: "Motion of electrically conducting liquid iron in Earth's outer core generates a magnetic field. The field extends into space and helps deflect many charged particles from the Sun.",
    facts: ["Magnetic poles move over time", "Compasses align approximately with the field", "The field has reversed direction many times in Earth's history"]
  },
  {
    title: "Moon and Its Relationship with Earth",
    intro: "Earth's Moon formed early in the planet's history. Its gravity raises most of Earth's ocean tides, and its presence has influenced Earth's rotation over geological time.",
    facts: ["Average distance: about 384,400 km", "The Moon completes an orbit in about 27.3 days", "The familiar phase cycle lasts about 29.5 days"]
  },
  {
    title: "Interesting Facts About Earth",
    intro: "Earth's measurements and geographic superlatives depend on how they are defined and measured. Treat these rounded values as reference facts, not live records.",
    facts: ["Mount Everest is about 8,849 m above mean sea level; Challenger Deep is roughly 10.9 km below sea level, with measurements varying by survey", "The Pacific is the largest ocean; Asia is the largest continent; Australia is smallest under the common seven-continent model", "Greenland is generally considered the largest island; Australia is classified as a continent", "River lengths, mountain heights, lake areas, and population rankings can vary among authoritative sources"]
  },
  {
    title: "Seas, Gulfs, Straits, and Marine Regions",
    intro: "Smaller seas and narrow passages connect the global oceans, shape regional ecosystems, and form important geographic and transport corridors.",
    facts: ["Mediterranean connects to the Atlantic through Gibraltar; Caribbean lies between Central America, the Greater Antilles, and northern South America", "South China Sea, Arabian Sea, Bay of Bengal, Bering Sea, Coral Sea, Red Sea, Black Sea, and Baltic Sea are major marine regions", "Gulf of Mexico, Persian Gulf, and Gulf of Guinea are prominent gulfs; Malacca, Hormuz, and Gibraltar are important straits", "Drake Passage lies between South America and the Antarctic Peninsula; the Sargasso Sea and Mid-Atlantic Ridge are notable Atlantic features"]
  },
  {
    title: "Mountain Ranges and High Peaks",
    intro: "Mountain belts form through plate collision, subduction, and uplift. They influence watersheds, climate, habitats, and settlement.",
    facts: ["Major ranges: Himalayas, Andes, Rockies, Alps, Atlas, Appalachians, Great Dividing Range, Urals, Caucasus, Drakensberg, Southern Alps, Scandinavian Mountains, and Transantarctic Mountains", "The Himalayas formed as India collided with Eurasia; the Andes formed mainly through subduction along South America's western edge", "Everest is the highest summit above sea level; K2 and Kangchenjunga are next; Aconcagua is highest outside Asia", "Other high peaks include Denali, Kilimanjaro, Elbrus, Vinson Massif, and Puncak Jaya"]
  },
  {
    title: "Major Rivers and Lakes",
    intro: "Rivers connect mountains, forests, farms, cities, wetlands, and oceans. Lakes store freshwater and support distinctive ecosystems.",
    facts: ["Major rivers include the Nile, Amazon, Yangtze, Mississippi–Missouri, Congo, Ganges, Brahmaputra, Mekong, Danube, Volga, Indus, Tigris–Euphrates, Zambezi, Murray–Darling, Lena, Yenisei, and Ob", "The Amazon carries more water by volume than any other river system; the Yangtze is Asia's longest; the Volga is generally considered Europe's longest", "Lake Baikal is exceptionally deep and ancient; Lake Superior is the largest freshwater lake by surface area; Lake Victoria is Africa's largest by surface area", "Other important waters include the Caspian Sea (technically a lake), Tanganyika, Malawi, Great Bear, Great Slave, Titicaca, the Dead Sea, and the diminished Aral Sea"]
  },
  {
    title: "Deserts, Plains, Plateaus, and Landscapes",
    intro: "Landscapes range from arid deserts and open grasslands to elevated plateaus. Polar deserts are also deserts because they receive very little precipitation.",
    facts: ["Deserts include the Sahara, Arabian, Gobi, Kalahari, Namib, Atacama, Great Victoria, Great Basin, Antarctic, and Arctic deserts", "Major plains and grasslands include the Great Plains, Pampas, Eurasian Steppe, Serengeti, Indo-Gangetic Plain, and North European Plain", "Important plateaus include Tibet, Deccan, Brazilian Highlands, Ethiopian Highlands, Colorado, and Iranian plateaus", "The Antarctic Desert is the largest desert by total area; the Sahara is the largest hot desert; the Atacama is among the driest non-polar regions"]
  },
  {
    title: "Natural Landmarks and Islands",
    intro: "Earth's landmarks include reefs, rainforests, waterfalls, canyons, deltas, salt flats, and culturally significant landscapes. Islands range from continental fragments to volcanic and coral archipelagos.",
    facts: ["Landmarks include the Grand Canyon, Great Barrier Reef, Amazon and Congo rainforests, Galápagos, Serengeti, Okavango Delta, Victoria, Iguazu, Angel, and Niagara Falls", "Other landmarks include Yellowstone, Yosemite, Wadi Rum, Ha Long Bay, Plitvice Lakes, Milford Sound, Lake Baikal, Salar de Uyuni, Mount Fuji, Table Mountain, Uluru, and Antarctica's Dry Valleys", "Large islands include Greenland, New Guinea, Borneo, Madagascar, Sumatra, Java, Sulawesi, Great Britain, Ireland, Iceland, Sri Lanka, and New Zealand's North and South Islands", "Other island groups include Japan's Honshu, Hokkaido, Kyushu, and Shikoku; the Philippines, Hawaii, Galápagos, Maldives, Seychelles, Fiji, Samoa, Tonga, Vanuatu, and the Greater and Lesser Antilles; many islands have endemic species"]
  },
  {
    title: "Water Cycle and Freshwater",
    intro: "Water continually moves among oceans, atmosphere, land, and living things. Fresh water is a small share of Earth's total water and is unevenly available.",
    facts: ["The cycle includes evaporation, plant transpiration, condensation, precipitation, infiltration, runoff, groundwater flow, and storage", "Oceans hold most of Earth's water; much of its freshwater is stored in glaciers, ice sheets, and groundwater", "Wetlands filter water, store floodwater, and support biodiversity; rivers link uplands, farms, cities, wetlands, and oceans", "Freshwater stress can result from overuse, pollution, and unequal access"]
  },
  {
    title: "Human Geography",
    intro: "Human settlement is uneven, shaped by landforms, water, climate, transport, and economic opportunity. Population and urban rankings change and depend on how boundaries are defined.",
    facts: ["Earth is home to more than eight billion people; exact population changes continuously", "People are concentrated in fertile plains, river valleys, coasts, and urban regions; a megacity is commonly defined as an urban area with at least 10 million people", "Major urban regions include Tokyo, Delhi, Shanghai, Dhaka, Mumbai, Jakarta, Manila, Cairo, Lagos, Kinshasa, London, Paris, New York, Mexico City, São Paulo, Buenos Aires, and Sydney", "Languages, cultures, religions, political systems, and economies are diverse; this reference focuses on physical geography rather than cataloguing every state"]
  },
  {
    title: "Global Geographic Lines and Reference Points",
    intro: "Latitude and longitude locate places on the globe. Several named lines mark hemispheres, climate zones, and conventional geographic boundaries.",
    facts: ["Equator: 0° latitude; Prime Meridian: 0° longitude through Greenwich", "Tropics of Cancer and Capricorn: about 23.4° north and south; Arctic and Antarctic Circles: about 66.6° north and south", "North and South Poles: 90° north and south; the International Date Line roughly follows 180° longitude but bends around countries and island groups", "A great circle passes through the center of a sphere; the Equator and meridians are examples"]
  },
  {
    title: "Environmental Issues and Conservation",
    intro: "Human activity and environmental change affect climate, ecosystems, water, and communities. Protected areas help conserve important landscapes, but names, boundaries, and legal status can change.",
    facts: ["Key issues include climate change, biodiversity loss, deforestation, land degradation, ocean warming and acidification, coral bleaching, pollution, freshwater stress, melting ice, sea-level rise, overfishing, and invasive species", "Protected places include the Serengeti, Kruger, Virunga, Yellowstone, Grand Canyon, Galápagos, Great Barrier Reef, Manu, Iguazú/Iguaçu, Banff, Jasper, Sagarmatha, Komodo, Sundarbans, Plitvice Lakes, Fiordland, and Wadden Sea", "Protected areas include national parks, wildlife reserves, marine protected areas, biosphere reserves, and World Heritage sites", "Conservation status and protection should be verified with current local or international sources"]
  },
  {
    title: "Website Guide and Data Quality",
    intro: "The reference recommends organizing an Earth site around physical geography and clearly identifying the source and date of place information. This is a global educational overview, not an exhaustive gazetteer.",
    facts: ["Suggested topics: overview, continents, oceans, landforms, natural wonders, climate, ecosystems, biodiversity, geology, environment, and human geography", "Useful map layers include coastlines, optional country borders, oceans and seas, mountains, rivers and lakes, biomes, landmarks, plate boundaries, climate zones, and protected areas", "Place records can include name, type, region, coordinates, elevation or depth, size, physical and ecological description, cultural context, threats, protection status, source, and verification date", "Continent counts, the Europe–Asia boundary, Southern Ocean definition, superlatives, borders, and population rankings can vary by convention or method; do not present changing values as live data", "For publication, verify names, coordinates, measurements, boundaries, and conservation details with authoritative geographic, geological, climate, oceanographic, or conservation organizations"]
  }
];

const locations = [
  { name: "Amazon Rainforest", lat: -3.1, lon: -60, type: "BIOME / SOUTH AMERICA", text: "The Amazon is the world's largest tropical rainforest. Its immense river system and forests hold exceptional biodiversity and influence water and carbon cycles across the region." },
  { name: "Sahara Desert", lat: 23, lon: 13, type: "LANDSCAPE / AFRICA", text: "The Sahara is the world's largest hot desert, spanning much of North Africa. It contains rocky plateaus, gravel plains, and shifting sand seas." },
  { name: "Himalayas", lat: 28, lon: 86, type: "MOUNTAIN RANGE / ASIA", text: "The Himalayas formed as the Indian and Eurasian tectonic plates converged. The range includes Mount Everest, Earth's highest mountain above sea level." },
  { name: "Great Barrier Reef", lat: -18.3, lon: 147.7, type: "REEF / AUSTRALIA", text: "Off northeastern Australia, the Great Barrier Reef is the world's largest coral reef system. Its many habitats support a remarkable range of marine life." },
  { name: "Nile Delta", lat: 30.8, lon: 31, type: "RIVER DELTA / AFRICA", text: "At the Mediterranean coast, the Nile Delta is a fertile, densely populated landscape shaped by river sediments and seasonal water flows." },
  { name: "Galápagos Islands", lat: -0.5, lon: -90.5, type: "ISLANDS / PACIFIC OCEAN", text: "These volcanic islands are known for unusual species and ecosystems. Their isolation has helped scientists understand adaptation and evolution." },
  { name: "Mariana Trench", lat: 11.3, lon: 142.2, type: "OCEAN TRENCH / PACIFIC", text: "The Mariana Trench is the deepest known ocean trench. Its deepest part, Challenger Deep, is nearly 11 km below sea level." },
  { name: "Antarctic Peninsula", lat: -66, lon: -64, type: "POLAR REGION / ANTARCTICA", text: "The Antarctic Peninsula reaches north toward South America. Its cold waters, sea ice, and surrounding ecosystems are sensitive to shifts in climate." },
  { name: "Yellowstone", lat: 44.6, lon: -110.5, type: "VOLCANIC REGION / NORTH AMERICA", text: "Yellowstone sits above a volcanic hotspot and is famous for geysers and hot springs. Its geothermal features show heat moving from Earth's interior." }
];

const timeline = [
  { date: "4.54 BILLION YEARS AGO", title: "Earth takes shape", text: "Earth formed from material orbiting the young Sun. Radiometric dating of meteorites and ancient Earth minerals places its age at about 4.54 billion years." },
  { date: "~4.51 BILLION YEARS AGO", title: "The Moon forms", text: "The leading explanation is that a large collision early in Earth's history sent debris into orbit, which gathered to form the Moon." },
  { date: "~4.4 BILLION YEARS AGO", title: "An early atmosphere", text: "Volcanic gases built a secondary atmosphere. Ancient zircon crystals suggest liquid water may have existed at Earth's surface by around this time." },
  { date: "~4.4 BILLION YEARS AGO", title: "Oceans emerge", text: "As the planet cooled, water vapor condensed and collected at the surface. Evidence from very old minerals points to early oceans, though their timing remains studied." },
  { date: "AT LEAST 3.5 BILLION YEARS AGO", title: "Early life", text: "Fossils and chemical traces show that microbial life was present billions of years ago. The exact date and nature of life's first beginnings remain uncertain." },
  { date: "~1.2 BILLION YEARS AGO", title: "Multicellular life", text: "Fossil evidence for multicellular organisms becomes clearer in the Proterozoic. Complex animal life diversified much later, especially during the Cambrian." },
  { date: "~230–66 MILLION YEARS AGO", title: "Age of dinosaurs", text: "Dinosaurs dominated many land ecosystems during the Mesozoic Era. A mass extinction about 66 million years ago ended the reign of non-avian dinosaurs." },
  { date: "~2.8 MILLION YEARS AGO", title: "Early humans", text: "The earliest fossils assigned to the genus Homo date to roughly 2.8 million years ago. Homo sapiens appeared much later, around 300,000 years ago." },
  { date: "~300,000 YEARS AGO", title: "Homo sapiens", text: "Our species evolved in Africa. Over time, humans spread to every continent except Antarctica and developed diverse cultures and ways of life." },
  { date: "~5,500 YEARS AGO", title: "Early civilizations", text: "Some of the earliest cities and writing systems emerged in Mesopotamia around the late fourth millennium BCE, alongside early urban societies elsewhere." }
];

const canvas = document.querySelector("#earth-canvas");
const globeWrap = document.querySelector("#globe-wrap");
const infoPanel = document.querySelector("#info-panel");
const categoryDrawer = document.querySelector("#category-drawer");
const panelContent = document.querySelector("#panel-content");
const panelKicker = document.querySelector("#panel-kicker");
const leftDock = document.querySelector(".left-dock");
const dockToggle = document.querySelector("#dock-toggle");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const coordinatesText = document.querySelector("#coordinates-text");
const toast = document.querySelector("#toast");
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
const homePosition = new THREE.Vector3(0, 0, 9.8);
camera.position.copy(homePosition);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enablePan = false;
controls.minDistance = 6.2;
controls.maxDistance = 13;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.42;
controls.rotateSpeed = 0.54;
controls.zoomSpeed = 0.65;

scene.add(new THREE.AmbientLight(0x8ea5c1, 0.42));
const sunlight = new THREE.DirectionalLight(0xfff1dc, 3.2);
sunlight.position.set(-5, 2.8, 6);
scene.add(sunlight);
const fillLight = new THREE.DirectionalLight(0x4b9cff, 0.25);
fillLight.position.set(5, -2, -4);
scene.add(fillLight);

const earthGroup = new THREE.Group();
scene.add(earthGroup);
const earthRadius = 2.35;
let oceanMask = null;
let oceanMaskWidth = 0;
let oceanMaskHeight = 0;
const textureLoader = new THREE.TextureLoader();
textureLoader.load("assets/earth-daymap.jpg", (earthTexture) => {
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const mapImage = earthTexture.image;
  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = mapImage.naturalWidth || mapImage.width;
  roughnessCanvas.height = mapImage.naturalHeight || mapImage.height;
  const roughnessContext = roughnessCanvas.getContext("2d");
  if (!roughnessContext) throw new Error("Could not create the Earth surface roughness map.");
  roughnessContext.drawImage(mapImage, 0, 0);
  const roughnessPixels = roughnessContext.getImageData(0, 0, roughnessCanvas.width, roughnessCanvas.height);
  oceanMaskWidth = roughnessCanvas.width;
  oceanMaskHeight = roughnessCanvas.height;
  oceanMask = new Uint8Array(oceanMaskWidth * oceanMaskHeight);
  for (let i = 0; i < roughnessPixels.data.length; i += 4) {
    const red = roughnessPixels.data[i];
    const green = roughnessPixels.data[i + 1];
    const blue = roughnessPixels.data[i + 2];
    const isOcean = blue > red * 1.24 && blue > green * 1.06;
    oceanMask[i / 4] = isOcean ? 1 : 0;
    const roughness = isOcean ? 150 : 235;
    roughnessPixels.data[i] = roughness;
    roughnessPixels.data[i + 1] = roughness;
    roughnessPixels.data[i + 2] = roughness;
    roughnessPixels.data[i + 3] = 255;
  }
  roughnessContext.putImageData(roughnessPixels, 0, 0);
  const roughnessTexture = new THREE.CanvasTexture(roughnessCanvas);
  roughnessTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(earthRadius, 96, 72),
    new THREE.MeshStandardMaterial({ map: earthTexture, roughnessMap: roughnessTexture, roughness: 0.9, metalness: 0 })
  );
  earth.name = "earth-surface";
  earth.userData.surface = true;
  earthGroup.add(earth);
}, undefined, (error) => {
  console.error("Could not load the local Earth map texture.", error);
  showToast("Earth map could not be loaded. Check that assets/earth-daymap.jpg is available.");
});

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(earthRadius * 1.025, 72, 56),
  new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vView = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.1);
        gl_FragColor = vec4(0.3, 0.66, 1.0, rim * 0.32);
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  })
);
atmosphere.name = "atmosphere";
earthGroup.add(atmosphere);

function createLocationMarkers() {
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x59b8a6 });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x006d5b, transparent: true, opacity: 0.3 });
  for (const location of locations) {
    const phi = THREE.MathUtils.degToRad(location.lon + 180);
    const theta = THREE.MathUtils.degToRad(90 - location.lat);
    const position = new THREE.Vector3(
      -earthRadius * Math.cos(phi) * Math.sin(theta),
      earthRadius * Math.cos(theta),
      earthRadius * Math.sin(phi) * Math.sin(theta)
    );
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.027, 12, 10), markerMaterial);
    marker.position.copy(position.clone().normalize().multiplyScalar(earthRadius * 1.015));
    marker.userData.location = location;
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.064, 12, 10), glowMaterial);
    glow.position.copy(marker.position);
    glow.userData.location = location;
    earthGroup.add(glow, marker);
  }
}
createLocationMarkers();

function resizeRenderer() {
  const bounds = globeWrap.getBoundingClientRect();
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  renderer.setSize(width, height, false);
  camera.clearViewOffset();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  const stageHeight = document.querySelector(".stage").getBoundingClientRect().height;
  const targetDiameter = Math.min(width * 0.9, height * 0.78, Math.max(300, stageHeight - 30));
  const viewRatio = targetDiameter / height;
  const halfFovTangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const fitDistance = earthRadius * 1.025 * Math.sqrt(1 + (1 / (viewRatio * halfFovTangent)) ** 2);
  const offsetPixels = Math.min(42, Math.max(0, (stageHeight - targetDiameter) / 2 - 6));
  globeWrap.style.setProperty("--globe-size", `${targetDiameter}px`);
  globeWrap.style.setProperty("--globe-radius", `${targetDiameter / 2}px`);
  globeWrap.style.setProperty("--halo-size", `${targetDiameter * 1.25}px`);
  const zoomRatio = camera.position.distanceTo(controls.target) / homePosition.z;
  const viewDirection = camera.position.clone().sub(controls.target).normalize();
  homePosition.set(0, 0, fitDistance);
  controls.maxDistance = Math.max(13, fitDistance * 1.35);
  controls.minDistance = Math.min(6.2, fitDistance * 0.62);
  camera.setViewOffset(width, height, 0, -offsetPixels, width, height);
  camera.position.copy(controls.target).add(viewDirection.multiplyScalar(fitDistance * zoomRatio));
  controls.update();
}
new ResizeObserver(resizeRenderer).observe(globeWrap);
resizeRenderer();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

function showInfo(title, intro, facts = [], kicker = "FIELD NOTES / EARTH", stat = "") {
  categoryDrawer.hidden = true;
  panelKicker.textContent = kicker;
  const list = facts.length ? `<ul>${facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>` : "";
  const statistic = stat ? `<div class="panel-stat">${stat}</div>` : "";
  panelContent.innerHTML = `<h2>${title}</h2><p>${intro}</p>${list}${statistic}`;
  infoPanel.hidden = false;
}

function showCategory(category) {
  showInfo(category.title, category.intro, category.facts, "FIELD GUIDE / EARTH");
}

function showLocation(location) {
  showInfo(
    location.name,
    location.text,
    [],
    location.type,
    `<span>APPROX. POSITION</span><strong>${Math.abs(location.lat).toFixed(1)}°${location.lat >= 0 ? "N" : "S"} / ${Math.abs(location.lon).toFixed(1)}°${location.lon >= 0 ? "E" : "W"}</strong>`
  );
  coordinatesText.textContent = `${Math.abs(location.lat).toFixed(1)}°${location.lat >= 0 ? "N" : "S"}  /  ${Math.abs(location.lon).toFixed(1)}°${location.lon >= 0 ? "E" : "W"}  ·  ${location.name.toUpperCase()}`;
}

function showTimelineEvent(event) {
  showInfo(event.title, event.text, [], "GEOLOGICAL TIMELINE / EARTH", `<span>WHEN</span><strong>${event.date}</strong>`);
}

function toggleCategories(force) {
  const open = typeof force === "boolean" ? force : categoryDrawer.hidden;
  categoryDrawer.hidden = !open;
  if (open) infoPanel.hidden = true;
}

function setMobileDockOpen(open) {
  leftDock.classList.toggle("is-open", open);
  dockToggle.classList.toggle("is-open", open);
  dockToggle.setAttribute("aria-expanded", String(open));
  dockToggle.setAttribute("aria-label", open ? "Hide Earth controls and stats" : "Show Earth controls and stats");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function getSurfaceIsOcean(uv) {
  if (!oceanMask) return null;
  const x = Math.min(oceanMaskWidth - 1, Math.max(0, Math.floor(uv.x * oceanMaskWidth)));
  const y = Math.min(oceanMaskHeight - 1, Math.max(0, Math.floor((1 - uv.y) * oceanMaskHeight)));
  return oceanMask[y * oceanMaskWidth + x] === 1;
}

function getRegion(latitude, longitude, isOcean) {
  if (isOcean) {
    if (latitude <= -55) return { title: "Southern Ocean", key: "southern ocean", detail: "The Southern Ocean circles Antarctica. The Antarctic Circumpolar Current links its waters and helps move heat and nutrients around the globe." };
    if (latitude >= 66) return { title: "Arctic Ocean", key: "arctic ocean", detail: "The Arctic Ocean is the smallest and shallowest of the five oceans. Sea ice and surrounding land strongly shape its seasonal conditions." };
    if (longitude > -80 && longitude < 20) return { title: "Atlantic Ocean", key: "atlantic ocean", detail: "The Atlantic Ocean separates the Americas from Europe and Africa. Its currents move heat between the tropics and higher latitudes." };
    if (longitude >= 20 && longitude <= 120) return { title: "Indian Ocean", key: "indian ocean", detail: "The Indian Ocean is the warmest of the major oceans and is bordered by Africa, Asia, Australia, and the Southern Ocean." };
    return { title: "Pacific Ocean", key: "pacific ocean", detail: "The Pacific is Earth's largest and deepest ocean. The Ring of Fire around its margins is an active zone of earthquakes and volcanoes." };
  }
  if (latitude < -60) return { title: "Antarctica", key: "antarctica", detail: "Earth's southernmost continent is covered by a vast ice sheet. Its high interior is the coldest, driest, and windiest region on the planet." };
  if ((longitude >= -168 && longitude <= -52 && latitude >= 7 && latitude <= 83) || (longitude >= -75 && longitude <= -10 && latitude >= 59 && latitude <= 84)) {
    return { title: "North America", key: "north america", detail: "North America stretches from Arctic landscapes to tropical forests. Its landforms include broad plains, major mountain ranges, and the Great Lakes." };
  }
  if (longitude >= -82 && longitude <= -34 && latitude >= -56 && latitude <= 13) return { title: "South America", key: "south america", detail: "South America is home to the Andes, the Amazon Basin, and a wide range of climates and ecosystems." };
  if (longitude >= -25 && longitude <= 45 && latitude >= 35 && latitude <= 72) return { title: "Europe", key: "europe", detail: "Europe is a peninsula-rich region on the western part of the Eurasian landmass, with varied landscapes and long histories of settlement." };
  if (longitude >= -18 && longitude <= 52 && latitude >= -35 && latitude < 35) return { title: "Africa", key: "africa", detail: "Africa spans the equator and contains the Sahara, the Congo rainforest, vast savannas, and the Nile and many other river systems." };
  if ((longitude >= 112 && longitude <= 155 && latitude >= -45 && latitude <= -10) || (longitude >= 130 && longitude <= 155 && latitude >= -11 && latitude < 0) || (longitude >= 165 && latitude >= -48 && latitude <= -33)) {
    return { title: "Australia and Oceania", key: "oceania", detail: "Australia and the islands of Oceania range from arid interiors to tropical reefs and remote volcanic islands." };
  }
  if (latitude >= -10 && longitude >= 42 && longitude < 180) return { title: "Asia", key: "asia", detail: "Asia is Earth's largest continent, spanning Arctic tundra, high mountain ranges, deserts, forests, and densely populated river plains." };
  return { title: "Land region", key: "land", detail: "This point lies on land. Explore the nearby marked locations or use the field guide to learn about Earth's regions." };
}

function onGlobeClick(event) {
  const bounds = canvas.getBoundingClientRect();
  pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(earthGroup.children, false);
  const surfaceHit = hits.find((hit) => hit.object.userData.surface);
  const markerHit = hits.find((hit) => hit.object.userData.location);
  if (markerHit && (!surfaceHit || markerHit.distance < surfaceHit.distance)) {
    showLocation(markerHit.object.userData.location);
    return;
  }
  if (!surfaceHit || !surfaceHit.uv) return;
  const latitude = surfaceHit.uv.y * 180 - 90;
  const longitude = surfaceHit.uv.x * 360 - 180;
  const region = getRegion(latitude, longitude, getSurfaceIsOcean(surfaceHit.uv));
  const formattedLatitude = `${Math.abs(latitude).toFixed(1)}°${latitude >= 0 ? "N" : "S"}`;
  const formattedLongitude = `${Math.abs(longitude).toFixed(1)}°${longitude >= 0 ? "E" : "W"}`;
  coordinatesText.textContent = `${formattedLatitude}  /  ${formattedLongitude}  ·  ${region.title.toUpperCase()}`;
  showInfo(
    region.title,
    region.detail,
    [],
    `${region.key.includes("ocean") ? "OCEAN" : "CONTINENT"} / FIELD NOTES`,
    `<span>APPROX. POSITION</span><strong>${formattedLatitude} / ${formattedLongitude}</strong>`
  );
}

let pointerStart = null;
canvas.addEventListener("pointerdown", (event) => {
  pointerStart = { x: event.clientX, y: event.clientY };
});
canvas.addEventListener("pointerup", (event) => {
  if (!pointerStart) return;
  const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
  pointerStart = null;
  if (moved < 7) onGlobeClick(event);
});

function setZoom(nextDistance) {
  const direction = camera.position.clone().sub(controls.target).normalize();
  camera.position.copy(controls.target).add(direction.multiplyScalar(THREE.MathUtils.clamp(nextDistance, controls.minDistance, controls.maxDistance)));
  controls.update();
}

document.querySelector("#focus-button").addEventListener("click", () => {
  setZoom(homePosition.z * 0.88);
  showToast("Earth in focus");
});
document.querySelector("#zoom-in").addEventListener("click", () => setZoom(camera.position.distanceTo(controls.target) - 0.6));
document.querySelector("#zoom-out").addEventListener("click", () => setZoom(camera.position.distanceTo(controls.target) + 0.6));
document.querySelector("#reset-button").addEventListener("click", () => {
  camera.position.copy(homePosition);
  controls.target.set(0, 0, 0);
  controls.autoRotate = true;
  rotationButton.classList.add("is-active");
  rotationButton.setAttribute("aria-label", "Turn automatic rotation off");
  rotationButton.title = "Auto rotation on";
  coordinatesText.textContent = "ROTATE TO EXPLORE THE PLANET";
  controls.update();
});
const rotationButton = document.querySelector("#rotation-button");
rotationButton.addEventListener("click", () => {
  controls.autoRotate = !controls.autoRotate;
  rotationButton.classList.toggle("is-active", controls.autoRotate);
  rotationButton.setAttribute("aria-label", controls.autoRotate ? "Turn automatic rotation off" : "Turn automatic rotation on");
  rotationButton.title = `Auto rotation ${controls.autoRotate ? "on" : "off"}`;
});

document.querySelector("#categories-button").addEventListener("click", () => toggleCategories());
document.querySelector("#drawer-close").addEventListener("click", () => toggleCategories(false));
document.querySelector("#panel-close").addEventListener("click", () => { infoPanel.hidden = true; });
document.querySelector("#info-button").addEventListener("click", () => showCategory(categories[0]));
document.querySelector("#facts-button").addEventListener("click", () => showCategory(categories[categories.length - 1]));
document.querySelector("#category-list").innerHTML = categories.map((category, index) =>
  `<button class="category-item" data-category="${index}"><span class="category-number">${String(index + 1).padStart(2, "0")}</span><span class="category-label">${category.title}</span></button>`
).join("");
document.querySelector("#category-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) showCategory(categories[Number(button.dataset.category)]);
});

document.querySelector("#timeline-events").innerHTML = timeline.map((event, index) =>
  `<button class="timeline-event" data-event="${index}"><span class="timeline-dot" aria-hidden="true"></span><time>${event.date}</time><span>${event.title}</span></button>`
).join("");
document.querySelector("#timeline-events").addEventListener("click", (event) => {
  const button = event.target.closest("[data-event]");
  if (button) showTimelineEvent(timeline[Number(button.dataset.event)]);
});
document.querySelector("#timeline-left").addEventListener("click", () => document.querySelector("#timeline-track").scrollBy({ left: -380, behavior: "smooth" }));
document.querySelector("#timeline-right").addEventListener("click", () => document.querySelector("#timeline-track").scrollBy({ left: 380, behavior: "smooth" }));

dockToggle.addEventListener("click", () => setMobileDockOpen(!leftDock.classList.contains("is-open")));
window.addEventListener("resize", () => {
  if (!window.matchMedia("(max-width: 620px)").matches) setMobileDockOpen(false);
});

let dockSwipeStart = null;
const stage = document.querySelector(".stage");
stage.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "touch" || !window.matchMedia("(max-width: 620px)").matches) return;
  const isOpen = leftDock.classList.contains("is-open");
  const startsAtLeftEdge = event.clientX <= 28 && !isOpen;
  const startsInsideDock = isOpen && leftDock.contains(event.target) && !event.target.closest("button");
  if (!startsAtLeftEdge && !startsInsideDock) return;
  dockSwipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, mode: startsAtLeftEdge ? "open" : "close" };
  event.stopPropagation();
}, true);
stage.addEventListener("pointerup", (event) => {
  if (!dockSwipeStart || event.pointerId !== dockSwipeStart.pointerId) return;
  const deltaX = event.clientX - dockSwipeStart.x;
  const deltaY = event.clientY - dockSwipeStart.y;
  if (Math.abs(deltaY) < 80 && dockSwipeStart.mode === "open" && deltaX > 56) setMobileDockOpen(true);
  if (Math.abs(deltaY) < 80 && dockSwipeStart.mode === "close" && deltaX < -56) setMobileDockOpen(false);
  dockSwipeStart = null;
  event.stopPropagation();
}, true);
stage.addEventListener("pointercancel", () => { dockSwipeStart = null; }, true);

function searchableItems() {
  return [
    ...categories.map((item, index) => ({ label: item.title, detail: "EARTH FIELD GUIDE", action: () => showCategory(categories[index]) })),
    ...locations.map((item) => ({ label: item.name, detail: item.type, action: () => showLocation(item) })),
    ...timeline.map((item, index) => ({ label: item.title, detail: item.date, action: () => showTimelineEvent(timeline[index]) }))
  ];
}
function updateSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    return;
  }
  const matches = searchableItems().filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(query)).slice(0, 6);
  searchResults.innerHTML = matches.length
    ? matches.map((item, index) => `<button class="search-result" data-result="${index}"><span>${item.label}</span><small>${item.detail}</small></button>`).join("")
    : `<p class="search-empty">No Earth topics found.</p>`;
  searchResults.hidden = false;
}
searchInput.addEventListener("input", updateSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    updateSearch();
    searchInput.blur();
  }
  if (event.key === "Enter") {
    const first = searchResults.querySelector(".search-result");
    if (first) first.click();
  }
});
searchResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-result]");
  if (!button) return;
  const query = searchInput.value.trim().toLowerCase();
  const matches = searchableItems().filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(query)).slice(0, 6);
  matches[Number(button.dataset.result)]?.action();
  searchResults.hidden = true;
  searchInput.value = "";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    infoPanel.hidden = true;
    categoryDrawer.hidden = true;
    searchResults.hidden = true;
    setMobileDockOpen(false);
  }
});

document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  camera.position.copy(homePosition);
  controls.target.set(0, 0, 0);
  controls.autoRotate = true;
  rotationButton.classList.add("is-active");
  infoPanel.hidden = true;
  categoryDrawer.hidden = true;
  coordinatesText.textContent = "ROTATE TO EXPLORE THE PLANET";
});
