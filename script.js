/* COSMIC HORIZON — one-screen solar-system exploration experience.
   The scene uses bundled surface maps and local fallback materials. */
(() => {
  'use strict';
  const host = document.getElementById('solar-system');
  const loading = document.getElementById('loading-screen');
  let introStarted = false;
  let introElapsed = 0;
  function startIntro(){
    if(introStarted)return;
    introStarted=true;
    document.body.classList.remove('intro-pending');
    document.body.classList.add('intro-started');
  }
  if (!host || !window.THREE) {
    startIntro();
    if (loading) loading.innerHTML = '<span>3D FLIGHT SYSTEM UNAVAILABLE · CHECK YOUR CONNECTION</span>';
    return;
  }

  const worlds = [
    {name:'Sun',key:'sun',orbitRadius:0,angle:0,r:2.05,texture:'2k_sun.jpg',color:0xffc36b,spin:.045},
    {name:'Mercury',key:'mercury',orbitRadius:5.4,angle:.15,r:.47,texture:'2k_mercury.jpg',color:0xb4a18d,spin:.22,orbitSpeed:.085},
    {name:'Venus',key:'venus',orbitRadius:8.1,angle:1.1,r:.82,texture:'2k_venus_surface.jpg',color:0xd7ad75,spin:.08,orbitSpeed:.052},
    {name:'Earth',key:'earth',orbitRadius:11.2,angle:3.66,r:1.05,texture:'assets/earth_daymap.jpg',color:0x3485c6,spin:.32,orbitSpeed:.035,type:'TERRESTRIAL WORLD',number:'003',coordinate:'SOL / 1.00 AU',intro:'The only known world with an atmosphere that sings with life. Every trace beyond this blue horizon began here.',history:'From the first orbital signals to the International Space Station, Earth has been our launchpad, our observatory and our only home.',objects:['apollo','lro','iss']},
    {name:'Mars',key:'mars',orbitRadius:15,angle:3.96,r:.88,texture:'assets/2k_mars.jpg',color:0x9b4034,spin:.27,orbitSpeed:.026,type:'TERRESTRIAL WORLD',number:'004',coordinate:'SOL / 1.52 AU',intro:'A rust red desert scattered with the hardware of our curiosity. Mars holds the longest trail of robotic footprints beyond Earth.',history:'From the first Mariner flyby to the active rover missions, each generation of explorers has left another mark in Martian dust.',objects:['sojourner','curiosity','insight']},
    {name:'Jupiter',key:'jupiter',orbitRadius:21,angle:5.0,r:1.72,texture:'2k_jupiter.jpg',color:0xd4a578,spin:.4,orbitSpeed:.014},
    {name:'Saturn',key:'saturn',orbitRadius:27.4,angle:2.3,r:1.48,texture:'2k_saturn.jpg',color:0xd7c08e,spin:.36,orbitSpeed:.009},
    {name:'Uranus',key:'uranus',orbitRadius:33.4,angle:4.3,r:1.13,texture:'2k_uranus.jpg',color:0x79bdc8,spin:.3,orbitSpeed:.005},
    {name:'Neptune',key:'neptune',orbitRadius:40.5,angle:1.9,r:1.1,texture:'2k_neptune.jpg',color:0x4c69bd,spin:.28,orbitSpeed:.003},
    {name:'Moon',key:'moon',orbitRadius:2.15,angle:1.15,r:.3,texture:'assets/2k_moon.jpg',color:0xb0b9bd,spin:.09,orbitSpeed:.3,type:'EARTH’S MOON',number:'LUNA',coordinate:'EARTH / 384,400 KM',intro:'A silent record of our first steps beyond Earth. Bootprints, descent stages and experiments remain where the Apollo crews left them.',history:'Six Apollo crews walked here between 1969 and 1972. Their hardware and footprints remain in a landscape with no rain or wind to erase them.',objects:['apollo','lrv','survey']}
  ];
  // Planet-name markers are HTML HUD labels projected over their 3D bodies.
  const markerHost=document.getElementById('space-view');
  worlds.filter(world=>!['Earth','Moon','Mars'].includes(world.name)).forEach(world=>{
    const marker=document.createElement('div');marker.className='planet-label secondary-label visible';marker.dataset.planetLabel=world.name;
    marker.innerHTML=`<i></i> ${world.name.toUpperCase()}`;markerHost.appendChild(marker);
  });
  const records = {
    apollo:{title:'APOLLO 11 LUNAR MODULE',kicker:'TRANQUILITY BASE · 1969',summary:'The descent stage of Eagle remains at Tranquility Base, the historic site of humanity’s first crewed lunar landing.',fact:'No atmosphere means the astronauts’ bootprints may remain visible for millions of years.',image:'https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg',thumb:'https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~small.jpg',credit:'NASA / AS11-40-5874'},
    lro:{title:'LUNAR RECONNAISSANCE ORBITER',kicker:'LUNAR ORBIT · 2009—PRESENT',summary:'A robotic mapper orbiting the Moon, recording landing sites, equipment and trails from the Apollo era in remarkable detail.',fact:'LRO images reveal the descent stages, experiment packages and paths taken by astronauts on the surface.',image:'https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg',thumb:'https://images-assets.nasa.gov/image/PIA12235/PIA12235~small.jpg',credit:'NASA / GODDARD / ASU'},
    iss:{title:'INTERNATIONAL SPACE STATION',kicker:'LOW EARTH ORBIT · 1998—PRESENT',summary:'A continuously crewed research outpost assembled in orbit by 15 nations, a human foothold above our planet.',fact:'The station has been continuously occupied since November 2000 and circles Earth about every 90 minutes.',image:'https://images-assets.nasa.gov/image/iss068e001053/iss068e001053~orig.jpg',thumb:'https://images-assets.nasa.gov/image/iss068e001053/iss068e001053~small.jpg',credit:'NASA'},
    sojourner:{title:'SOJOURNER ROVER',kicker:'ARES VALLIS · 1997',summary:'A compact six wheeled rover that turned a distant Martian landing into a mobile field investigation.',fact:'Sojourner was designed for a seven sol mission and continued sending data for 83 sols.',image:'https://images-assets.nasa.gov/image/PIA01555/PIA01555~orig.jpg',thumb:'https://images-assets.nasa.gov/image/PIA01555/PIA01555~small.jpg',credit:'NASA / JPL'},
    curiosity:{title:'CURIOSITY ROVER',kicker:'GALE CRATER · 2012—PRESENT',summary:'A car sized laboratory climbing Mount Sharp and studying the ancient environments recorded in Martian rock.',fact:'Curiosity’s tracks stretch for more than 30 kilometres across the floor of Gale Crater and its foothills.',image:'https://images-assets.nasa.gov/image/PIA22210/PIA22210~orig.jpg',thumb:'https://images-assets.nasa.gov/image/PIA22210/PIA22210~small.jpg',credit:'NASA / JPL-CALTECH / MSSS'},
    insight:{title:'INSIGHT LANDER',kicker:'ELYSIUM PLANITIA · 2018—2022',summary:'A stationary geophysical observatory that listened for marsquakes and measured the planet’s internal heat.',fact:'InSight detected more than 1,300 marsquakes before its mission ended in December 2022.',image:'https://images-assets.nasa.gov/image/PIA22874/PIA22874~orig.jpg',thumb:'https://images-assets.nasa.gov/image/PIA22874/PIA22874~small.jpg',credit:'NASA / JPL-CALTECH'},
    lrv:{title:'LUNAR ROVING VEHICLE',kicker:'MOON · 1971—1972',summary:'The battery powered rover let Apollo crews travel kilometres from their landing sites to collect samples and survey the landscape.',fact:'Three lunar rovers remain parked on the Moon, one each from Apollo 15, 16 and 17.',image:'https://images-assets.nasa.gov/image/as17-145-22162/as17-145-22162~orig.jpg',thumb:'https://images-assets.nasa.gov/image/as17-145-22162/as17-145-22162~small.jpg',credit:'NASA / AS17-145-22162'},
    survey:{title:'SURVEYOR 3',kicker:'OCEANUS PROCELLARUM · 1967',summary:'A robotic lander that tested the lunar surface before Apollo. Apollo 12 astronauts later visited it and brought parts back to Earth.',fact:'Surveyor 3 is the only spacecraft visited by humans on another world after its landing.',image:'https://images-assets.nasa.gov/image/AS12-48-7134/AS12-48-7134~orig.jpg',thumb:'https://images-assets.nasa.gov/image/AS12-48-7134/AS12-48-7134~small.jpg',credit:'NASA / AS12-48-7134'}
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x03070d);
  const camera = new THREE.PerspectiveCamera(43,1,.1,500);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  } catch (error) {
    startIntro();
    if (loading) loading.innerHTML = '<span>3D FLIGHT SYSTEM UNAVAILABLE · ENABLE WEBGL TO EXPLORE</span>';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .84;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const worldRoot = new THREE.Group();
  scene.add(worldRoot);
  const ambient = new THREE.HemisphereLight(0x9bbbd0,0x111421,.3);
  scene.add(ambient);
  const sunLight = new THREE.DirectionalLight(0xffebd2,1.45);
  sunLight.position.set(-18,13,28);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024,1024);
  sunLight.shadow.camera.left=-35;sunLight.shadow.camera.right=35;sunLight.shadow.camera.top=25;sunLight.shadow.camera.bottom=-25;
  scene.add(sunLight);

  // Distant stars use a single buffer draw call to keep the scene light on mobile.
  const starPositions=[],starColors=[];
  for(let i=0;i<2600;i++){
    const radius=90+Math.random()*130,theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);
    starPositions.push(radius*Math.sin(phi)*Math.cos(theta),radius*Math.cos(phi),radius*Math.sin(phi)*Math.sin(theta));
    const tint=.72+Math.random()*.28;starColors.push(.82*tint,.92*tint,tint);
  }
  const starGeometry=new THREE.BufferGeometry();
  starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3));
  starGeometry.setAttribute('color',new THREE.Float32BufferAttribute(starColors,3));
  const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({size:.24,vertexColors:true,transparent:true,opacity:1,sizeAttenuation:true}));
  scene.add(stars);

  // A restrained single-draw-call asteroid belt between the Mars and Jupiter orbits.
  const asteroidPositions=[],asteroidColors=[];
  for(let i=0;i<1200;i++){
    const angle=Math.random()*Math.PI*2,radius=16.9+Math.random()*2.4;
    asteroidPositions.push(Math.cos(angle)*radius,Math.sin(angle)*radius,(Math.random()-.5)*.32);
    const shade=.68+Math.random()*.3;asteroidColors.push(shade,shade*.83,shade*.65);
  }
  const asteroidGeometry=new THREE.BufferGeometry();
  asteroidGeometry.setAttribute('position',new THREE.Float32BufferAttribute(asteroidPositions,3));
  asteroidGeometry.setAttribute('color',new THREE.Float32BufferAttribute(asteroidColors,3));
  const asteroidBelt=new THREE.Points(asteroidGeometry,new THREE.PointsMaterial({size:.18,vertexColors:true,transparent:true,opacity:.9,sizeAttenuation:true,depthWrite:false}));
  worldRoot.add(asteroidBelt);

  // Soft additive sprites add luminous sun spill without a postprocessing dependency.
  function glowTexture(){
    const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
    const ctx=canvas.getContext('2d');const gradient=ctx.createRadialGradient(64,64,0,64,64,64);
    gradient.addColorStop(0,'rgba(255,235,190,0.55)');gradient.addColorStop(.22,'rgba(255,171,91,0.2)');gradient.addColorStop(1,'rgba(255,130,45,0)');
    ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);return new THREE.CanvasTexture(canvas);
  }
  const sunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture(),color:0xffbb72,transparent:true,opacity:.82,blending:THREE.AdditiveBlending,depthWrite:false}));
  sunGlow.position.set(0,0,-1);sunGlow.scale.set(13,13,1);worldRoot.add(sunGlow);
  const texLoader=new THREE.TextureLoader();texLoader.setCrossOrigin('anonymous');
  // Offline Jupiter surface fallback: layered cloud belts, turbulence and the Great Red Spot.
  function createJupiterFallbackTexture(){
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;
    const ctx=canvas.getContext('2d');const image=ctx.createImageData(canvas.width,canvas.height);
    for(let y=0;y<canvas.height;y++){
      const v=y/canvas.height,lat=(.5-v)*Math.PI;
      for(let x=0;x<canvas.width;x++){
        const u=x/canvas.width,lon=u*Math.PI*2;
        const turbulence=Math.sin(lon*3.2+lat*17)*.16+Math.sin(lon*8.5-lat*31)*.08;
        const belt=Math.sin(lat*31+turbulence)+.42*Math.sin(lat*72+lon*2.4)+.18*Math.sin(lat*125-lon*6);
        const grain=Math.sin(x*12.9898+y*78.233)*.025;
        let r,g,b;
        if(belt>.72){r=239;g=219;b=187;}else if(belt>.18){r=194;g=151;b=111;}else if(belt>-.34){r=151;g=99;b=71;}else{r=218;g=185;b=147;}
        const stormX=(u-.69)/.095,stormY=(v-.59)/.052,stormR=Math.sqrt(stormX*stormX+stormY*stormY);
        if(stormR<1){const swirl=Math.sin(stormR*23-Math.atan2(stormY,stormX)*2)*.12;const a=(1-stormR)*.78+swirl;r=r*(1-a)+184*a;g=g*(1-a)+91*a;b=b*(1-a)+62*a;}
        const i=(y*canvas.width+x)*4,shade=1+grain;
        image.data[i]=r*shade;image.data[i+1]=g*shade;image.data[i+2]=b*shade;image.data[i+3]=255;
      }
    }
    ctx.putImageData(image,0,0);const texture=new THREE.CanvasTexture(canvas);texture.encoding=THREE.sRGBEncoding;return texture;
  }
  const jupiterFallbackTexture=createJupiterFallbackTexture();
  const expectedTextureMaps=worlds.length+1;
  let resolvedTextureMaps=0;
  function resolveTextureMap(){
    resolvedTextureMaps++;
    if(resolvedTextureMaps>=expectedTextureMaps){clearTimeout(textureFallbackTimer);loading.classList.add('done');startIntro();}
  }
  const textureFallbackTimer=setTimeout(()=>{loading.classList.add('done');startIntro();},1800);
  const meshes=new Map(),destinations=['Earth','Moon','Mars'];
  const targetRings=new Map();
  const orbitLines=new Map();
  const orbitGlows=new Map();

  function makeAtmosphere(radius,color){
    const mat=new THREE.ShaderMaterial({uniforms:{glowColor:{value:new THREE.Color(color)},glowStrength:{value:.58}},vertexShader:'varying vec3 vNormal; varying vec3 vView; void main(){vNormal=normalize(normalMatrix*normal);vec4 mvPosition=modelViewMatrix*vec4(position,1.0);vView=normalize(-mvPosition.xyz);gl_Position=projectionMatrix*mvPosition;}',fragmentShader:'uniform vec3 glowColor; uniform float glowStrength; varying vec3 vNormal; varying vec3 vView; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),3.0);gl_FragColor=vec4(glowColor,rim*glowStrength);}',side:THREE.FrontSide,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false});
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius*1.12,40,40),mat);return mesh;
  }
  worlds.forEach((world,index)=>{
    const isSun=world.key==='sun';
    if(!isSun&&world.key!=='moon'){
      const orbitLine=new THREE.Mesh(new THREE.RingGeometry(world.orbitRadius-.022,world.orbitRadius+.022,180),new THREE.MeshBasicMaterial({color:0x78b6d1,transparent:true,opacity:.19,side:THREE.DoubleSide,depthWrite:false}));
      orbitLine.position.z=-.5;orbitLine.scale.set(0,0,1);worldRoot.add(orbitLine);orbitLines.set(world.name,orbitLine);
      const orbitGlow=new THREE.Mesh(new THREE.RingGeometry(world.orbitRadius-.045,world.orbitRadius+.045,180),new THREE.MeshBasicMaterial({color:0x66bded,transparent:true,opacity:.045,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));
      orbitGlow.position.z=-.46;orbitGlow.scale.set(0,0,1);worldRoot.add(orbitGlow);orbitGlows.set(world.name,orbitGlow);
    }
    const isEarth=world.key==='earth';
    const mat=isEarth||isSun
      ?new THREE.MeshBasicMaterial({color:world.color})
      :new THREE.MeshStandardMaterial({color:world.color,roughness:.94,metalness:.01});
    if(world.key==='jupiter'){mat.map=jupiterFallbackTexture;mat.color.set(0xffffff);mat.needsUpdate=true;}
    const sphere=new THREE.Mesh(new THREE.SphereGeometry(world.r,isEarth?112:72,isEarth?112:72),mat);
    if(isSun)sphere.position.set(0,0,0);
    else if(world.key==='moon'){const earth=meshes.get('Earth');sphere.position.set(earth.position.x+Math.cos(world.angle)*world.orbitRadius,earth.position.y+Math.sin(world.angle)*world.orbitRadius,.18);}
    else sphere.position.set(Math.cos(world.angle)*world.orbitRadius,Math.sin(world.angle)*world.orbitRadius,0);
    sphere.castShadow=true;sphere.receiveShadow=true;
    sphere.userData.world=world;sphere.userData.baseColor=new THREE.Color(world.color);
    worldRoot.add(sphere);meshes.set(world.name,sphere);
    // The remote fallback endpoint serves HTML and fails CORS; use only maps bundled with the site.
    const hasLocalTexture=['sun','earth','mars','moon'].includes(world.key);
    if(hasLocalTexture){
      const textureUrl=isEarth?(window.SPACE_TRACE_EARTH_TEXTURE||world.texture):isSun?(window.SPACE_TRACE_SUN_TEXTURE||world.texture):world.key==='mars'?(window.SPACE_TRACE_MARS_TEXTURE||world.texture):window.SPACE_TRACE_MOON_TEXTURE||world.texture;
      texLoader.load(textureUrl,texture=>{texture.encoding=THREE.sRGBEncoding;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());mat.map=texture;mat.color.set(world.key==='mars'?0xb75a48:0xffffff);mat.needsUpdate=true;resolveTextureMap();},undefined,resolveTextureMap);
    }else{
      resolveTextureMap();
    }
    if(world.key==='earth'){
      const clouds=new THREE.Mesh(new THREE.SphereGeometry(world.r*1.012,96,96),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.24,depthWrite:false,visible:false}));
      clouds.position.copy(sphere.position);worldRoot.add(clouds);sphere.userData.clouds=clouds;
      texLoader.load('assets/earth_clouds.jpg',texture=>{texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());clouds.material.alphaMap=texture;clouds.material.visible=true;clouds.material.needsUpdate=true;resolveTextureMap();},undefined,resolveTextureMap);
      const atmosphere=makeAtmosphere(world.r,0x67bdff);atmosphere.position.copy(sphere.position);worldRoot.add(atmosphere);sphere.userData.atmosphere=atmosphere;
    }
    if(world.key==='mars'){const atmosphere=makeAtmosphere(world.r,0xb94738);atmosphere.position.copy(sphere.position);worldRoot.add(atmosphere);sphere.userData.atmosphere=atmosphere;}
    if(world.key==='saturn'){
      const ringMat=new THREE.MeshStandardMaterial({color:0xcbb78c,roughness:1,side:THREE.DoubleSide,transparent:true,opacity:.78});
      const rings=new THREE.Mesh(new THREE.RingGeometry(world.r*1.3,world.r*2.2,128),ringMat);rings.rotation.z=-.18;rings.position.copy(sphere.position);worldRoot.add(rings);sphere.userData.planetRings=rings;
    }
    if(destinations.includes(world.name)){
      sphere.userData.isDestination=true;
      const halo=makeAtmosphere(world.r,0x49dfff);halo.position.copy(sphere.position);halo.scale.setScalar(1.07);worldRoot.add(halo);sphere.userData.halo=halo;
      const indicator=new THREE.Mesh(new THREE.TorusGeometry(world.r*1.18,.012,8,96),new THREE.MeshBasicMaterial({color:0x73e6ff,transparent:true,opacity:.38,depthWrite:false}));
      indicator.position.copy(sphere.position);indicator.position.z+=.08;worldRoot.add(indicator);targetRings.set(world.name,indicator);
    }
  });
  const moonOrbitLine=new THREE.Mesh(new THREE.RingGeometry(worlds.find(world=>world.name==='Moon').orbitRadius-.018,worlds.find(world=>world.name==='Moon').orbitRadius+.018,96),new THREE.MeshBasicMaterial({color:0x7ac8e5,transparent:true,opacity:.24,side:THREE.DoubleSide,depthWrite:false}));
  moonOrbitLine.position.copy(meshes.get('Earth').position);moonOrbitLine.position.z=-.16;moonOrbitLine.scale.set(0,0,1);worldRoot.add(moonOrbitLine);
  const moonOrbitGlow=new THREE.Mesh(new THREE.RingGeometry(worlds.find(world=>world.name==='Moon').orbitRadius-.04,worlds.find(world=>world.name==='Moon').orbitRadius+.04,96),new THREE.MeshBasicMaterial({color:0x76cbee,transparent:true,opacity:.06,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));
  moonOrbitGlow.position.copy(moonOrbitLine.position);moonOrbitGlow.position.z=-.13;moonOrbitGlow.scale.set(0,0,1);worldRoot.add(moonOrbitGlow);
  function updateMoonOrbit(dt){
    const earth=meshes.get('Earth').position,moon=meshes.get('Moon'),moonData=worlds.find(world=>world.name==='Moon');
    moonData.angle+=dt*moonData.orbitSpeed*1.2;
    moon.position.set(earth.x+Math.cos(moonData.angle)*moonData.orbitRadius,earth.y+Math.sin(moonData.angle)*moonData.orbitRadius,.18);
    moonOrbitLine.position.set(earth.x,earth.y,-.16);
    moonOrbitGlow.position.set(earth.x,earth.y,-.13);
    if(moon.userData.halo)moon.userData.halo.position.copy(moon.position);
    const marker=targetRings.get('Moon');marker.position.copy(moon.position);marker.position.z+=.08;
  }
  function setFocusedScene(active){
    asteroidBelt.visible=!active;
    meshes.forEach(mesh=>{
      mesh.visible=true;
      if(mesh.userData.halo)mesh.userData.halo.visible=true;
      if(mesh.userData.clouds)mesh.userData.clouds.visible=true;
      if(mesh.userData.atmosphere)mesh.userData.atmosphere.visible=true;
      if(mesh.userData.planetRings)mesh.userData.planetRings.visible=true;
    });
    orbitLines.forEach(line=>{line.visible=!active;});
    orbitGlows.forEach(line=>{line.visible=!active;});
    moonOrbitLine.visible=!active&&mobileFocus;
    moonOrbitGlow.visible=!active&&mobileFocus;
    sunGlow.visible=!active&&!mobileFocus;
    document.querySelectorAll('.planet-label').forEach(label=>{label.hidden=active&&label.dataset.planetLabel!==selected?.name;});
    document.getElementById('space-view').classList.toggle('destination-selected',active);
  }

  // A decorative orbital route visually ties the three homepage destinations together.
  // Camera framing scales the complete orbital system to the available screen width.
  let viewWidth=1,viewHeight=1,baseRootScale=1,mobileFocus=false,mobileFlightPose=null,cameraPanned=false;
  const cameraState={x:0,y:0,z:1,tx:0,ty:0};
  function resize(){
    const w=host.clientWidth||innerWidth,h=host.clientHeight||innerHeight,aspect=w/h;
    renderer.setSize(w,h,false);camera.aspect=aspect;camera.updateProjectionMatrix();
    mobileFocus=aspect<.8;
    baseRootScale=aspect<1.1?Math.max(.36,aspect/1.35):1;
    worldRoot.scale.setScalar(baseRootScale);
    const halfFov=THREE.MathUtils.degToRad(camera.fov/2);
    viewWidth=aspect;viewHeight=h;
    if(mobileFocus){
      const systemExtent=43*baseRootScale;
      const systemDistance=Math.max(systemExtent/(Math.max(aspect,.01)*Math.tan(halfFov)),systemExtent/Math.tan(halfFov));
      mobileFlightPose={x:0,y:0,z:Math.max(15,systemDistance*1.12),tx:0,ty:0};
      Object.assign(overviewPose,{x:0,y:0,tx:0,ty:0,z:Math.max(22,mobileFlightPose.z*1.3)});
    }else{
      const worldHalfWidth=43*baseRootScale;
      const halfHeight=43*baseRootScale;
      const fitDistance=Math.max(worldHalfWidth/Math.max(aspect,.01),halfHeight)/Math.tan(halfFov);
      mobileFlightPose=null;
      Object.assign(overviewPose,{x:0,y:0,tx:0,ty:0,z:Math.max(34,fitDistance*1.12)});
    }
    setFocusedScene(Boolean(selected));
    if(!flightStarted){applyCamera(overviewPose);}
  }
  const overviewPose={x:0,y:0,z:70,tx:0,ty:0};
  function innerSystemPose(){
    if(mobileFocus)return mobileDestinationsPose();
    const earth=worldRoot.localToWorld(meshes.get('Earth').position.clone());
    const mars=worldRoot.localToWorld(meshes.get('Mars').position.clone());
    const x=(earth.x+mars.x)/2,y=(earth.y+mars.y)/2;
    return{x,y:y+1.5,z:22,tx:x,ty:y};
  }
  function mobileDestinationsPose(){
    worldRoot.updateMatrixWorld(true);
    const destinations=['Earth','Moon','Mars'].map(name=>{
      const world=worlds.find(item=>item.name===name);
      const position=meshes.get(name).getWorldPosition(new THREE.Vector3());
      const radius=world.r*baseRootScale;
      return{left:position.x-radius,right:position.x+radius,bottom:position.y-radius,top:position.y+radius};
    });
    const left=Math.min(...destinations.map(item=>item.left)),right=Math.max(...destinations.map(item=>item.right));
    const bottom=Math.min(...destinations.map(item=>item.bottom)),top=Math.max(...destinations.map(item=>item.top));
    const x=(left+right)/2,y=(bottom+top)/2,tanHalfFov=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
    const distance=Math.max((right-left)/(2*camera.aspect*tanHalfFov),(top-bottom)/(2*tanHalfFov))*1.2;
    return{x,y,z:Math.max(8,distance),tx:x,ty:y};
  }
  function applyCamera(p){camera.position.set(p.x,p.y,p.z);camera.lookTargetX=p.tx;camera.lookTargetY=p.ty;camera.lookAt(p.tx,p.ty,0);}
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(host);else addEventListener('resize',resize);

  const openingHold=.45,openingDuration=3,mobileOpeningHold=1.5,mobileOpeningDuration=2.4;
  let flightStarted=false,flightTime=0,flightComplete=false,flightEndPose=null,paused=false,selected=null,focusTween=null,dragging=false,dragMoved=false,lastX=0,lastY=0,rotationY=.08,rotationX=.34;
  worldRoot.rotation.set(rotationX,rotationY,0);
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
  const clock=new THREE.Clock();
  resize();
  const touchPointers=new Map();let pinchDistance=0;
  function zoomCamera(factor){
    if(mobileFocus){
      focusTween=null;
      if(!flightComplete&&!selected){flightComplete=true;updateDestinationReadiness();}
    }
    const minZoom=mobileFocus ? .5 : 5.2;
    camera.position.z=THREE.MathUtils.clamp(camera.position.z*factor,minZoom,overviewPose.z*1.15);
    camera.lookAt(camera.lookTargetX||0,camera.lookTargetY||0,0);
  }

  const stageIndex=document.getElementById('stage-index'),stageTitle=document.getElementById('stage-title'),stageCaption=document.getElementById('stage-caption');
  const prompt=document.getElementById('destination-prompt');
  prompt.classList.add('visible');
  function setStage(index,title,caption){stageIndex.textContent=index;stageTitle.textContent=title;stageCaption.textContent=caption;}
  function updateDestinationReadiness(){
    document.querySelectorAll('.planet-label').forEach(label=>label.classList.add('visible'));
    prompt.classList.add('visible');
    document.getElementById('enter-destination').disabled=false;
    document.getElementById('flight-status').innerHTML='<i></i> DESTINATIONS IN RANGE';
    setStage('02','DESTINATIONS IN RANGE','EARTH · MOON · MARS / SELECT TO IDENTIFY');
  }
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
  function easeZoom(t){return ease(t);}
  function lerpPose(a,b,t){return{x:THREE.MathUtils.lerp(a.x,b.x,t),y:THREE.MathUtils.lerp(a.y,b.y,t),z:THREE.MathUtils.lerp(a.z,b.z,t),tx:THREE.MathUtils.lerp(a.tx,b.tx,t),ty:THREE.MathUtils.lerp(a.ty,b.ty,t)};}
  function worldPose(world){const mesh=meshes.get(world.name);worldRoot.updateMatrixWorld(true);const position=mesh.getWorldPosition(new THREE.Vector3());const x=position.x,y=position.y;const distance=world.name==='Moon'?1:world.name==='Earth'?3.6:3.2;return{x,y,z:distance,tx:x,ty:y};}
  function moveCameraTo(pose,duration=1.7){focusTween={from:{x:camera.position.x,y:camera.position.y,z:camera.position.z,tx:camera.lookTargetX||0,ty:camera.lookTargetY||0},to:pose,time:0,duration};}
  function chooseDestination(world){
    if(!world||!destinations.includes(world.name))return;
    setHoveredPlanet(null);
    selected=world;cameraPanned=false;setFocusedScene(true);prompt.classList.add('visible');
    document.querySelectorAll('.planet-label').forEach(el=>el.classList.toggle('selected',el.dataset.planetLabel===world.name));
    document.getElementById('destination-class').innerHTML=`${world.type}<span> · </span>${world.number}`;
    document.getElementById('destination-name').textContent=world.name.toUpperCase();
    document.getElementById('destination-description').textContent=world.intro;
    document.getElementById('destination-coordinate').textContent=world.coordinate;
    document.getElementById('destination-card').classList.add('open');
    document.getElementById('destination-card').setAttribute('aria-hidden','false');
    document.getElementById('flight-status').innerHTML='<i></i> DESTINATION LOCKED';
    setStage('03',world.name.toUpperCase()+' / TARGET LOCKED','DESTINATION IDENTIFIED · SELECT EXPLORE TO OPEN THE ARCHIVE');
    moveCameraTo(worldPose(world),1.8);
  }
  document.querySelectorAll('[data-destination]').forEach(button=>button.addEventListener('click',()=>chooseDestination(worlds.find(world=>world.name===button.dataset.destination))));
  function updateScreenLabels(){
    worlds.forEach(world=>{const pos=meshes.get(world.name).position.clone().add(new THREE.Vector3(0,world.r+.72,0));worldRoot.localToWorld(pos);pos.project(camera);const el=document.querySelector(`[data-planet-label="${world.name}"]`);if(!el)return;el.style.left=((pos.x*.5+.5)*viewWidth*host.clientHeight)+'px';el.style.top=((-pos.y*.5+.5)*host.clientHeight)+'px';});
    if(infoWorld){
      const pos=meshes.get(infoWorld.name).position.clone();worldRoot.localToWorld(pos);pos.project(camera);
      const x=(pos.x*.5+.5)*host.clientWidth,y=(-pos.y*.5+.5)*host.clientHeight;
      const cardWidth=hoverCard.offsetWidth||300,cardHeight=hoverCard.offsetHeight||170,gap=26,pad=14;
      const desiredX=x<host.clientWidth*.58?x+gap:x-cardWidth-gap;
      hoverCard.style.left=THREE.MathUtils.clamp(desiredX,pad,Math.max(pad,host.clientWidth-cardWidth-pad))+'px';
      hoverCard.style.right='auto';
      hoverCard.style.top=THREE.MathUtils.clamp(y-cardHeight*.5,78,Math.max(78,host.clientHeight-cardHeight-56))+'px';
    }
  }
  function showRecord(key){
    const rec=records[key];if(!rec)return;
    document.querySelectorAll('.object-choice').forEach(btn=>btn.classList.toggle('active',btn.dataset.record===key));
    document.getElementById('object-kicker').textContent=rec.kicker;
    document.getElementById('object-title').textContent=rec.title;
    document.getElementById('object-description').textContent=rec.summary;
    document.getElementById('object-fact').textContent=rec.fact;
    document.getElementById('object-image').style.backgroundImage=`linear-gradient(0deg,#07111b40,#07111b00),url("${rec.image}")`;
    document.getElementById('image-credit').textContent='IMAGE: '+rec.credit;
  }
  function openExplore(){
    if(!selected)return;
    const destinations={Earth:'earth/index.html',Moon:'moon/index.html',Mars:'mars/index.html'};
    window.siteNav.navigate(destinations[selected.name]);
  }

  // Pointer interaction: subtle hover lighting, click-to-lock, drag-to-orbit.
  let hovered=null;
  let infoWorld=null;
  let hoverDismissTimer=null;
  const hoverCard=document.getElementById('planet-hover-card');
  const enterDestination=document.getElementById('enter-destination');
  enterDestination.disabled=false;
  function scheduleHoverDismiss(){clearTimeout(hoverDismissTimer);hoverDismissTimer=setTimeout(()=>setHoveredPlanet(null),450);}
  function setHoveredPlanet(mesh){
    clearTimeout(hoverDismissTimer);
    hovered=mesh;
    const world=mesh&&['Mars','Moon'].includes(mesh.userData.world.name)?mesh.userData.world:null;
    if(world){
      infoWorld=world;
      document.getElementById('planet-hover-name').textContent=world.name.toUpperCase();
      document.getElementById('planet-hover-description').textContent=world.name==='Mars'
        ?'A rust-red frontier crossed by rover tracks and the remains of human exploration.'
        :'Apollo footprints and landing hardware remain preserved on this silent world.';
      hoverCard.classList.add('open');
      hoverCard.setAttribute('aria-hidden','false');
    }else{
      infoWorld=null;
      hoverCard.classList.remove('open');
      hoverCard.setAttribute('aria-hidden','true');
    }
  }
  renderer.domElement.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'&&touchPointers.has(event.pointerId)){
      touchPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
      if(touchPointers.size>1){
        const points=Array.from(touchPointers.values()),distance=Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);
        if(pinchDistance>0&&distance>0)zoomCamera(THREE.MathUtils.clamp(pinchDistance/distance,.75,1.3));
        pinchDistance=distance;dragging=false;dragMoved=true;return;
      }
    }
    if(hoverCard.contains(event.target)){clearTimeout(hoverDismissTimer);return;}
    if(dragging){const dx=event.clientX-lastX,dy=event.clientY-lastY;if(Math.abs(dx)+Math.abs(dy)>2)dragMoved=true;
      if(event.pointerType==='touch'){
        focusTween=null;
        if(!flightComplete&&!selected){flightComplete=true;updateDestinationReadiness();}
        const worldPerPixel=2*camera.position.z*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))/host.clientHeight;
        camera.lookTargetX=(camera.lookTargetX||0)-dx*worldPerPixel;camera.lookTargetY=(camera.lookTargetY||0)+dy*worldPerPixel;
        camera.position.x-=dx*worldPerPixel;camera.position.y+=dy*worldPerPixel;cameraPanned=true;
        camera.lookAt(camera.lookTargetX,camera.lookTargetY,0);
      }else{
        rotationY+=dx*.004;rotationX=THREE.MathUtils.clamp(rotationX+dy*.003,-.85,.85);worldRoot.rotation.set(rotationX,rotationY,0);
      }
      lastX=event.clientX;lastY=event.clientY;return;
    }
    const rect=renderer.domElement.getBoundingClientRect();pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(Array.from(meshes.values()).filter(mesh=>mesh.userData.isDestination),false)[0];
    if(hit)setHoveredPlanet(hit.object);else if(infoWorld)scheduleHoverDismiss();else setHoveredPlanet(null);
    renderer.domElement.style.cursor=hovered?'pointer':'grab';
  });
  renderer.domElement.addEventListener('pointerleave',event=>{if(hoverCard.contains(event.relatedTarget))clearTimeout(hoverDismissTimer);else if(infoWorld)scheduleHoverDismiss();else setHoveredPlanet(null);renderer.domElement.style.cursor='grab';});
  hoverCard.addEventListener('pointerenter',()=>clearTimeout(hoverDismissTimer));
  hoverCard.addEventListener('pointerleave',event=>{if(!renderer.domElement.contains(event.relatedTarget))scheduleHoverDismiss();});
  renderer.domElement.addEventListener('pointerdown',event=>{
    renderer.domElement.setPointerCapture(event.pointerId);
    if(event.pointerType==='touch'){
      touchPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
      if(touchPointers.size>1){
        const points=Array.from(touchPointers.values());pinchDistance=Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);
        dragging=false;dragMoved=true;return;
      }
    }
    dragging=true;dragMoved=false;lastX=event.clientX;lastY=event.clientY;
  });
  renderer.domElement.addEventListener('pointerup',event=>{
    if(event.pointerType==='touch'&&touchPointers.has(event.pointerId)){
      const wasPinching=touchPointers.size>1||pinchDistance>0;
      touchPointers.delete(event.pointerId);pinchDistance=0;
      if(wasPinching){dragging=false;dragMoved=true;return;}
    }
    if(!dragging)return;dragging=false;if(dragMoved)return;
    const rect=renderer.domElement.getBoundingClientRect();pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(Array.from(meshes.values()).filter(mesh=>mesh.userData.isDestination),false)[0];
    if(hit)chooseDestination(hit.object.userData.world);
  });
  enterDestination.addEventListener('click',()=>{if(infoWorld)chooseDestination(infoWorld);});
  renderer.domElement.addEventListener('pointercancel',()=>{touchPointers.clear();pinchDistance=0;dragging=false;});
  renderer.domElement.addEventListener('wheel',event=>{event.preventDefault();zoomCamera(THREE.MathUtils.clamp(1+event.deltaY*.001,.75,1.3));},{passive:false});
  document.getElementById('zoom-in-button').addEventListener('click',()=>zoomCamera(.8));
  document.getElementById('zoom-out-button').addEventListener('click',()=>zoomCamera(1.25));

  document.getElementById('explore-button').addEventListener('click',openExplore);
  const creditsDialog=document.getElementById('credits-dialog');
  function closeCredits(){creditsDialog.classList.remove('open');creditsDialog.setAttribute('aria-hidden','true');document.getElementById('open-credits').focus();}
  document.getElementById('open-credits').addEventListener('click',()=>{creditsDialog.classList.add('open');creditsDialog.setAttribute('aria-hidden','false');document.getElementById('close-credits').focus();});
  document.getElementById('close-credits').addEventListener('click',closeCredits);
  creditsDialog.querySelector('[data-close-credits]').addEventListener('click',closeCredits);
  creditsDialog.querySelectorAll('.copy-email').forEach(button=>button.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent='COPIED';
    }catch{
      const field=document.createElement('textarea');field.value=button.dataset.copy;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();
      const copied=document.execCommand('copy');field.remove();button.textContent=copied?'COPIED':'SELECT EMAIL';
    }
    setTimeout(()=>{button.textContent='COPY';},1400);
  }));
  document.getElementById('close-explore').addEventListener('click',()=>{const overlay=document.getElementById('explore-overlay');overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');setStage('03',selected.name.toUpperCase()+' / TARGET LOCKED','DESTINATION IDENTIFIED · SELECT EXPLORE TO OPEN THE ARCHIVE');});
  document.getElementById('close-destination').addEventListener('click',()=>{document.getElementById('destination-card').classList.remove('open');document.getElementById('destination-card').setAttribute('aria-hidden','true');selected=null;cameraPanned=false;setFocusedScene(false);document.querySelectorAll('.planet-label').forEach(el=>el.classList.remove('selected'));moveCameraTo(overviewPose,1.8);updateDestinationReadiness();});
  document.getElementById('reset-view').addEventListener('click',()=>{
    setHoveredPlanet(null);enterDestination.disabled=true;
    selected=null;cameraPanned=false;setFocusedScene(false);focusTween=null;flightTime=0;flightComplete=false;flightEndPose=null;flightStarted=true;rotationY=.08;rotationX=.34;worldRoot.rotation.set(rotationX,rotationY,0);
    document.getElementById('destination-card').classList.remove('open');document.getElementById('destination-card').setAttribute('aria-hidden','true');
    const overlay=document.getElementById('explore-overlay');overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');
    document.querySelectorAll('.planet-label').forEach(el=>el.classList.remove('selected','visible'));prompt.classList.remove('visible');
    document.getElementById('flight-status').innerHTML='<i></i> AUTO FLIGHT IN PROGRESS';setStage('01','THE SOLAR SYSTEM','A HUMAN STORY, WRITTEN ACROSS WORLDS');moveCameraTo(overviewPose,2.2);
  });
  document.getElementById('pause-button').addEventListener('click',event=>{paused=!paused;event.currentTarget.textContent=paused?'▶':'Ⅱ';event.currentTarget.setAttribute('aria-label',paused?'Resume planet rotation':'Pause planet rotation');});
  addEventListener('keydown',event=>{if(event.key==='Escape'){if(creditsDialog.classList.contains('open'))closeCredits();else{const overlay=document.getElementById('explore-overlay');if(overlay.classList.contains('open'))document.getElementById('close-explore').click();else document.getElementById('close-destination').click();}}});

  let errorLogged=false;
  function animate(){
    requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);flightStarted=true;
    if(introStarted&&introElapsed<1.8){introElapsed=Math.min(1.8,introElapsed+dt);const draw=Math.min(1,Math.max(0,(introElapsed-.55)/1.15));orbitLines.forEach(line=>line.scale.set(draw,draw,1));orbitGlows.forEach(line=>line.scale.set(draw,draw,1));moonOrbitLine.scale.set(draw,draw,1);moonOrbitGlow.scale.set(draw,draw,1);}
    const orbiting=!paused&&!selected;
    if(orbiting){
      worlds.forEach(world=>{
        if(world.key==='sun'||world.key==='moon')return;
        world.angle+=dt*world.orbitSpeed*1.2;
        const mesh=meshes.get(world.name);mesh.position.set(Math.cos(world.angle)*world.orbitRadius,Math.sin(world.angle)*world.orbitRadius,0);
        if(mesh.userData.clouds)mesh.userData.clouds.position.copy(mesh.position);
        if(mesh.userData.halo)mesh.userData.halo.position.copy(mesh.position);
        if(mesh.userData.atmosphere)mesh.userData.atmosphere.position.copy(mesh.position);
        if(mesh.userData.planetRings)mesh.userData.planetRings.position.copy(mesh.position);
        if(orbitLines.has(world.name))orbitLines.get(world.name).rotation.z=0;
      });
      ['Earth','Moon','Mars'].forEach(name=>{const marker=targetRings.get(name);marker.position.copy(meshes.get(name).position);marker.position.z+=.08;});
    }
    if(!paused&&(!selected||selected.name==='Earth'))updateMoonOrbit(dt);
    if(!paused){
      meshes.forEach(mesh=>{const world=mesh.userData.world;mesh.rotation.y+=dt*world.spin*.30;if(mesh.userData.clouds)mesh.userData.clouds.rotation.y+=dt*world.spin*.30*1.12;});
      stars.rotation.y+=dt*.003;
      if(asteroidBelt.visible)asteroidBelt.rotation.z+=dt*.025;
      targetRings.forEach((ring,name)=>{ring.material.opacity=.48+Math.sin(clock.elapsedTime*2.1+(name==='Mars'?1:0))*.16;});
      orbitGlows.forEach((glow,index)=>{glow.material.opacity=.032+Math.sin(clock.elapsedTime*.55+index*.8)*.018;});
      moonOrbitGlow.material.opacity=.045+Math.sin(clock.elapsedTime*.7)*.018;
      sunGlow.material.opacity=.72+Math.sin(clock.elapsedTime*.42)*.07;
      sunGlow.scale.setScalar(13+Math.sin(clock.elapsedTime*.42)*.28);
    }
    if(!flightComplete&&!selected&&!focusTween&&(!mobileFocus||introStarted)){const hold=mobileFocus?mobileOpeningHold:openingHold,duration=mobileFocus?mobileOpeningDuration:openingDuration;if(flightTime<hold&&flightTime+dt>=hold)flightEndPose=innerSystemPose();flightTime+=dt;const progress=THREE.MathUtils.clamp((flightTime-hold)/duration,0,1);const eased=easeZoom(progress);applyCamera(lerpPose(overviewPose,flightEndPose||innerSystemPose(),eased));
      if(progress>.03){document.getElementById('flight-status').innerHTML='<i></i> APPROACHING INNER SYSTEM';setStage('01','INBOUND / INNER SYSTEM','CAMERA FLIGHT · DESTINATIONS WILL BE IN RANGE');}
      if(progress>=1){flightComplete=true;updateDestinationReadiness();}
    }
    if(focusTween){focusTween.time+=dt;const t=THREE.MathUtils.clamp(focusTween.time/focusTween.duration,0,1);applyCamera(lerpPose(focusTween.from,focusTween.to,ease(t)));if(t>=1)focusTween=null;}
    camera.lookTargetX=selected&&focusTween===null&&!cameraPanned?worldPose(selected).tx:camera.lookTargetX||0;
    updateScreenLabels();
    meshes.forEach(mesh=>{
      if(mesh.userData.isDestination&&mesh.material.emissive){mesh.material.emissive.set(0x000000);mesh.material.emissiveIntensity=0;}
      const isHoverTarget=mesh===hovered&&['Mars','Moon'].includes(mesh.userData.world.name);
      const planetScale=mesh.scale.x+( (isHoverTarget?1.055:1)-mesh.scale.x )*(1-Math.exp(-dt*8));
      mesh.scale.setScalar(planetScale);
      if(mesh.userData.halo){const haloScale=mesh.userData.halo.scale.x+((isHoverTarget?1.2:1.07)-mesh.userData.halo.scale.x)*(1-Math.exp(-dt*7));mesh.userData.halo.scale.setScalar(haloScale);const strength=mesh.userData.halo.material.uniforms.glowStrength;strength.value+=((isHoverTarget ? .82 : .58)-strength.value)*(1-Math.exp(-dt*7));}
    });
    renderer.render(scene,camera);
  }
  animate();
})();
