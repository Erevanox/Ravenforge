import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
  categoryMap,
  isVisibleInRange,
  lunarObjects,
  type Category,
  type LunarObject,
} from './data/lunarData';
import { lunarImages } from './data/lunarImages';

const MIN_YEAR = 1959;
const MAX_YEAR = 2026;
const INITIAL_RANGE = { start: MIN_YEAR, end: MAX_YEAR };

function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

const eras = [
  { name: 'All history', start: 1959, end: 2026 },
  { name: 'Pioneer missions', start: 1959, end: 1966 },
  { name: 'Apollo era', start: 1969, end: 1972 },
  { name: 'Robotic exploration', start: 1970, end: 1976 },
  { name: 'Orbital mapping', start: 1998, end: 2012 },
  { name: 'Recent missions', start: 2019, end: 2026 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function latLonToVector3(lat: number, lon: number, radius = 1.615) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function SurfaceMarkers({
  records,
  selectedId,
  onSelect,
}: {
  records: LunarObject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {records.map((item) => {
        if (
          item.latitude == null ||
          item.longitude == null ||
          item.coordinateAccuracy === 'unknown'
        ) {
          return null;
        }

        const position = latLonToVector3(item.latitude, item.longitude);
        const normal = position.clone().normalize();
        const selected = item.id === selectedId;
        const approximate = item.coordinateAccuracy === 'approximate';
        const color = item.objectType === 'impact-site'
          ? '#ff6f61'
          : item.objectType === 'rover'
            ? '#5de0cb'
            : item.objectType === 'scientific-equipment'
              ? '#72c7ff'
              : item.objectType === 'crewed-landing'
                ? '#22B8CF'
                : '#7DD3FC';

        return (
          <group
            key={item.id}
            position={position}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 0, 1),
              normal,
            )}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(item.id);
            }}
          >
            <mesh position={[0, 0, 0.018]}>
              <circleGeometry args={[selected ? 0.042 : 0.028, 24]} />
              <meshBasicMaterial
                color={color}
                transparent={approximate}
                opacity={approximate ? 0.56 : 0.96}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[0, 0, 0.024]}>
              <ringGeometry args={[selected ? 0.05 : 0.034, selected ? 0.057 : 0.039, 28]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={selected ? 0.95 : 0.72}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
            {selected && (
              <Html center position={[0, 0.115, 0.03]}>
                <div className="marker-label">
                  {item.officialName}
                  {approximate && <small>Approximate location</small>}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}

function LunarGlobe() {
  const [colorMap, elevationMap] = useLoader(THREE.TextureLoader, [
    publicAsset('lunar/lroc-color-2k.jpg'),
    publicAsset('lunar/ldem-3-8bit.jpg'),
  ]);
  colorMap.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh>
      <sphereGeometry args={[1.6, 256, 256]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={elevationMap}
        displacementScale={0.012}
        displacementBias={-0.006}
        bumpMap={elevationMap}
        bumpScale={0.004}
        roughness={1}
      />
    </mesh>
  );
}

function OrbitalMarker({
  item,
  selected,
  onSelect,
}: {
  item: LunarObject;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const seed = [...item.id].reduce(
    (value, character) => (Math.imul(value, 31) + character.charCodeAt(0)) >>> 0,
    7,
  );
  const radius = 2.04 + (seed % 7) * 0.105;
  const inclination = 0.18 + ((seed >> 3) % 7) * 0.12;
  const ascendingNode = ((seed >> 5) % 12) * (Math.PI / 12);
  const initialPhase = ((seed >> 9) % 12) * (Math.PI / 6);
  const angularSpeed = 0.08 + ((seed >> 2) % 5) * 0.025;

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.z += delta * angularSpeed;
  });

  return (
    <group rotation={[inclination, 0, ascendingNode]}>
      <group ref={orbitRef} rotation={[0, 0, initialPhase]}>
        <mesh>
          <torusGeometry args={[radius, 0.0025, 6, 180]} />
          <meshBasicMaterial color="#8c7bff" transparent opacity={0.28} />
        </mesh>
        <group
          position={[radius, 0, 0]}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(item.id);
          }}
        >
          <mesh>
            <sphereGeometry args={[0.16, 16, 12]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh scale={selected ? 1.12 : 1}>
            <boxGeometry args={[0.075, 0.075, 0.075]} />
            <meshStandardMaterial
              color={selected ? '#e5ddff' : '#a99aff'}
              emissive="#806bff"
              emissiveIntensity={selected ? 0.7 : 0.3}
              metalness={0.58}
              roughness={0.38}
            />
          </mesh>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.145, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.205, 0.056, 0.012]} />
                <meshStandardMaterial color="#65728a" metalness={0.62} roughness={0.42} />
              </mesh>
              {[0, 1, 2].map((cell) => (
                <mesh key={cell} position={[(cell - 1) * 0.063, 0, 0.008]}>
                  <boxGeometry args={[0.002, 0.048, 0.002]} />
                  <meshBasicMaterial color="#d2c8ff" />
                </mesh>
              ))}
            </group>
          ))}
          <mesh position={[0, 0.086, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
          </mesh>
          {selected && (
            <Html center position={[0, 0.25, 0]}>
              <div className="marker-label orbital-label">
                {item.officialName}
                <small>Illustrative orbit · not to scale</small>
              </div>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}

function MoonScene({
  records,
  selectedId,
  onSelect,
  showSurface,
  showOrbits,
  autoRotate,
  controlsRef,
}: {
  records: LunarObject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showSurface: boolean;
  showOrbits: boolean;
  autoRotate: boolean;
  controlsRef: MutableRefObject<any>;
}) {
  const orbiters = records.filter((record) => record.objectType === 'orbiter');
  const surfaceRecords = records.filter((record) => record.objectType !== 'orbiter');

  return (
    <>
      <color attach="background" args={['#03070d']} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 3, 5]} intensity={2.25} color="#fff4dc" />
      <directionalLight position={[-4, -1, -3]} intensity={0.11} color="#71809a" />
      <Stars radius={70} depth={45} count={1600} factor={4} saturation={0} fade speed={0.35} />
      <Suspense fallback={null}>
        <LunarGlobe />
        {showSurface && (
          <SurfaceMarkers records={surfaceRecords} selectedId={selectedId} onSelect={onSelect} />
        )}
      </Suspense>
      {showOrbits && orbiters.map((item) => (
        <OrbitalMarker
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={onSelect}
        />
      ))}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.075}
        minDistance={2.05}
        maxDistance={8}
        autoRotate={autoRotate}
        autoRotateSpeed={0.22}
      />
    </>
  );
}

function formatYear(date: string | null) {
  return date ? new Date(date).getUTCFullYear() : 'Unknown';
}

function markerYear(record: LunarObject) {
  const date = record.deploymentDate ?? record.impactDate ?? record.arrivalDate;
  return date ? new Date(date).getUTCFullYear() : null;
}

function IconButton({
  label,
  children,
  onClick,
  active = false,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`icon-button${active ? ' active' : ''}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function RecordImage({ record }: { record: LunarObject }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = lunarImages[record.id];

  useEffect(() => {
    setImageFailed(false);
  }, [record.id]);

  return (
    <div className="drawer-image">
      {image && !imageFailed
        ? <img src={publicAsset(image.path)} alt={image.title} onError={() => setImageFailed(true)} />
        : <span className="image-unavailable">No local image is available for this record.</span>}
      {image && (
        <a
          className="image-caption"
          href={image.source}
          target="_blank"
          rel="noreferrer"
          title={`${image.title} · ${image.credit} · ${image.license}`}
        >
          {image.title} · {image.credit} · {image.license}
        </a>
      )}
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [rangeStart, setRangeStart] = useState(INITIAL_RANGE.start);
  const [rangeEnd, setRangeEnd] = useState(INITIAL_RANGE.end);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [recordsOpen, setRecordsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [showSurface, setShowSurface] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  const visibleObjects = useMemo(() => lunarObjects.filter((item) => {
    const matchesSearch = searchTerm.trim() === '' || [
      item.officialName,
      item.missionName,
      item.country,
      item.agency,
      item.category,
      item.lunarRegion,
      item.nearestLandmark,
      item.alternativeNames.join(' '),
    ].join(' ').toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    return matchesSearch && matchesCategory && isVisibleInRange(item, rangeStart, rangeEnd);
  }), [searchTerm, activeFilter, rangeStart, rangeEnd]);

  const selectedObject = selectedId
    ? visibleObjects.find((record) => record.id === selectedId) ?? null
    : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedId(null);
        setFiltersOpen(false);
        setRecordsOpen(false);
        setInfoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetView = () => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.object.position.set(0, 0.45, 4.7);
    controlsRef.current.update();
  };

  const zoomBy = (factor: number) => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const offset = controls.object.position.clone().sub(controls.target).multiplyScalar(factor);
    controls.object.position.copy(controls.target).add(offset);
    controls.update();
  };

  const selectRecord = (id: string) => {
    setSelectedId(id);
    setRecordsOpen(false);
    setFiltersOpen(false);
  };

  const setEra = (start: number, end: number) => {
    setRangeStart(start);
    setRangeEnd(end);
  };

  const startPercent = ((rangeStart - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  const endPercent = ((rangeEnd - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  const locatedCount = visibleObjects.filter(
    (record) => record.latitude != null && record.longitude != null,
  ).length;
  const orbitalCount = visibleObjects.filter((record) => record.objectType === 'orbiter').length;
  const rangeDuration = rangeEnd - rangeStart;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">☾</div>
          <div className="brand-copy">
            <div className="brand-title">LUNAR LEGACY <span>•</span> <b>NASA SPACE APPS</b></div>
            <div className="brand-subtitle">Interactive 3D Historical Archive · 1959–2026</div>
          </div>
        </div>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search missions, landers, Apollo sites, agencies…"
            aria-label="Search lunar archive"
          />
          {searchTerm && (
            <button type="button" onClick={() => setSearchTerm('')} aria-label="Clear search">×</button>
          )}
        </label>
        <nav className="header-actions" aria-label="Archive tools">
          <button
            type="button"
            className={filtersOpen ? 'header-button active' : 'header-button'}
            onClick={() => {
              setFiltersOpen((open) => !open);
              setRecordsOpen(false);
            }}
          >
            <span aria-hidden="true">▽</span> Filters
          </button>
          <button
            type="button"
            className={recordsOpen ? 'header-button active' : 'header-button'}
            onClick={() => {
              setRecordsOpen((open) => !open);
              setFiltersOpen(false);
            }}
          >
            <span aria-hidden="true">☷</span> Records
          </button>
          <IconButton label="About this archive" active={infoOpen} onClick={() => setInfoOpen(true)}>
            i
          </IconButton>
        </nav>
      </header>

      <main className="explorer">
        <div className="moon-canvas">
          <Canvas camera={{ position: [0, 0.45, 4.7], fov: 40 }} dpr={[1, 1.75]}>
            <MoonScene
              records={visibleObjects}
              selectedId={selectedId}
              onSelect={selectRecord}
              showSurface={showSurface}
              showOrbits={showOrbits}
              autoRotate={autoRotate}
              controlsRef={controlsRef}
            />
          </Canvas>
        </div>

        <div className="tool-rail" aria-label="Moon view controls">
          <IconButton label="Home view" onClick={resetView}>⌖</IconButton>
          <IconButton label="Zoom in" onClick={() => zoomBy(0.82)}>＋</IconButton>
          <IconButton label="Zoom out" onClick={() => zoomBy(1.22)}>−</IconButton>
          <IconButton label={autoRotate ? 'Pause rotation' : 'Resume rotation'} active={autoRotate} onClick={() => setAutoRotate((value) => !value)}>
            ↻
          </IconButton>
          <IconButton label={showSurface ? 'Hide surface markers' : 'Show surface markers'} active={showSurface} onClick={() => setShowSurface((value) => !value)}>
            ◉
          </IconButton>
        </div>

        <section className="telemetry" aria-label="Archive counts">
          <h2><span>⊕</span> Archive telemetry</h2>
          <div><span>RECORDS IN RANGE</span><strong>{visibleObjects.length}</strong></div>
          <div><span>SURFACE LOCATIONS</span><strong>{locatedCount}</strong></div>
          <div><span>ORBITAL MISSIONS</span><strong>{orbitalCount}</strong></div>
        </section>

        <a
          className="lunar-credit"
          href="https://svs.gsfc.nasa.gov/4720/"
          target="_blank"
          rel="noreferrer"
        >
          LROC WAC color + LOLA elevation · NASA / GSFC SVS
        </a>

        {filtersOpen && (
          <section className="floating-panel filters-panel" aria-label="Archive filters">
            <div className="floating-panel-heading">
              <h2>Layers & filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">×</button>
            </div>
            <label className="select-field">
              <span>Record category</span>
              <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value as Category)}>
                {Object.entries(categoryMap).map(([category, label]) => (
                  <option key={category} value={category}>{label}</option>
                ))}
              </select>
            </label>
            <label className="toggle-row">
              <span>Surface locations</span>
              <input type="checkbox" checked={showSurface} onChange={(event) => setShowSurface(event.target.checked)} />
            </label>
            <label className="toggle-row">
              <span>Orbital paths</span>
              <input type="checkbox" checked={showOrbits} onChange={(event) => setShowOrbits(event.target.checked)} />
            </label>
            <button
              type="button"
              className="subtle-action"
              onClick={() => {
                setActiveFilter('All');
                setSearchTerm('');
                setShowSurface(true);
                setShowOrbits(true);
              }}
            >
              Reset filters
            </button>
          </section>
        )}

        {recordsOpen && (
          <section className="floating-panel records-panel" aria-label="Historical records">
            <div className="floating-panel-heading">
              <div>
                <h2>Records</h2>
                <small>{visibleObjects.length} records in the selected view</small>
              </div>
              <button type="button" onClick={() => setRecordsOpen(false)} aria-label="Close records">×</button>
            </div>
            <div className="record-list">
              {visibleObjects.map((record) => (
                <button key={record.id} type="button" onClick={() => selectRecord(record.id)}>
                  <span className={`record-dot ${record.objectType}`} />
                  <span><strong>{record.officialName}</strong><small>{record.missionName} · {formatYear(record.arrivalDate)}</small></span>
                  <span aria-hidden="true">›</span>
                </button>
              ))}
              {visibleObjects.length === 0 && <p className="empty-state">No records match this search and date range.</p>}
            </div>
          </section>
        )}

        {selectedObject && (
          <aside className="details-drawer" aria-label={`${selectedObject.officialName} details`}>
            <div className="drawer-heading">
              <span>Mission record</span>
              <button type="button" onClick={() => setSelectedId(null)} aria-label="Close details">×</button>
            </div>
            <RecordImage key={selectedObject.id} record={selectedObject} />
            <div className="drawer-content">
              <div className="section-title">{selectedObject.category} · {selectedObject.country}</div>
              <h2>{selectedObject.officialName}</h2>
              <p className="drawer-agency">{selectedObject.agency} <span>·</span> {selectedObject.missionName}</p>
              <p className="description">{selectedObject.historicalSignificance}</p>
              <dl className="detail-list">
                <div><dt>Launch</dt><dd>{formatYear(selectedObject.launchDate)}</dd></div>
                <div><dt>Arrival / deployment</dt><dd>{formatYear(selectedObject.deploymentDate ?? selectedObject.arrivalDate)}</dd></div>
                <div><dt>Mission objective</dt><dd>{selectedObject.missionObjective}</dd></div>
                <div>
                  <dt>{selectedObject.objectType === 'orbiter' ? 'Orbital location' : 'Lunar coordinates'}</dt>
                  <dd>{selectedObject.objectType === 'orbiter'
                    ? 'Lunar orbit · illustrative path, not to scale'
                    : selectedObject.latitude != null && selectedObject.longitude != null
                      ? `${selectedObject.latitude}°, ${selectedObject.longitude}° · ${selectedObject.coordinateAccuracy}`
                      : 'Unknown / not mapped'}</dd>
                </div>
                <div><dt>Lunar region</dt><dd>{selectedObject.lunarRegion}</dd></div>
                <div><dt>Physical presence</dt><dd>{selectedObject.remainingHardware}</dd></div>
                <div><dt>Operational status</dt><dd>{selectedObject.operationalEndDate ? `Operations ended ${formatYear(selectedObject.operationalEndDate)}` : selectedObject.presenceStatus === 'active' ? 'Active / status as reported' : 'Not confirmed'}</dd></div>
              </dl>
              <div className="source-list">
                <strong>Sources</strong>
                {selectedObject.sourceReferences.length > 0
                  ? selectedObject.sourceReferences.map((source) => <span key={source}>{source}</span>)
                  : <span>Source references not yet attached.</span>}
              </div>
            </div>
          </aside>
        )}

        {infoOpen && (
          <div className="modal-backdrop" role="presentation" onClick={() => setInfoOpen(false)}>
            <section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="archive-info-title" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="modal-close" onClick={() => setInfoOpen(false)} aria-label="Close about panel">×</button>
              <div className="section-title">Interactive historical archive</div>
              <h2 id="archive-info-title">Explore the Moon’s human history</h2>
              <p>Drag to rotate, use the controls to zoom, select a marker or a record to open its details, and change the year range to explore physical presence through time.</p>
              <p>Surface coordinates are shown only where mapped. Orbital paths are illustrative and are not to scale.</p>
              <a href="https://svs.gsfc.nasa.gov/4720/" target="_blank" rel="noreferrer">NASA LROC / LOLA map source</a>
            </section>
          </div>
        )}
      </main>

      <footer className="timeline-panel">
        <div className="timeline-topline">
          <div className="epoch-display">
            <span>EPOCH</span>
            <strong>{rangeStart}</strong>
            <i>→</i>
            <strong className="end-year">{rangeEnd}</strong>
            <small>({rangeDuration} yrs)</small>
            <button type="button" onClick={() => setEra(MIN_YEAR, MAX_YEAR)} aria-label="Reset timeline">↻</button>
          </div>
          <div className="presence-count">
            <span>VISIBLE IN PERIOD</span>
            <strong>{visibleObjects.length}</strong>
            <span> / {lunarObjects.length}</span>
          </div>
        </div>
        <div className="era-list" aria-label="Historical periods">
          {eras.map((era) => {
            const active = rangeStart === era.start && rangeEnd === era.end;
            return (
              <button key={era.name} type="button" className={active ? 'era-chip active' : 'era-chip'} onClick={() => setEra(era.start, era.end)}>
                {era.name} <span>{era.start}–{era.end}</span>
              </button>
            );
          })}
        </div>
        <div className="timeline-control" style={{ '--range-start': `${startPercent}%`, '--range-end': `${endPercent}%` } as CSSProperties}>
          <div className="timeline-base" />
          <div className="timeline-selected" />
          {lunarObjects.map((record, index) => {
            const year = markerYear(record);
            if (year == null) return null;
            const percent = ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
            return (
              <span
                key={record.id}
                className="timeline-event"
                title={`${record.officialName} · ${year}`}
                style={{ left: `${percent}%`, top: `${5 + (index % 2) * 8}px` }}
              />
            );
          })}
          <input
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={rangeStart}
            aria-label="Timeline start year"
            onChange={(event) => setRangeStart(clamp(Number(event.target.value), MIN_YEAR, rangeEnd))}
          />
          <input
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={rangeEnd}
            aria-label="Timeline end year"
            onChange={(event) => setRangeEnd(clamp(Number(event.target.value), rangeStart, MAX_YEAR))}
          />
        </div>
        <div className="timeline-milestones">
          <span>1959</span>
          <span>1969 · Apollo</span>
          <span>1998 · Lunar Prospector</span>
          <span>2009 · LRO</span>
          <span>2019</span>
          <span>2026</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
