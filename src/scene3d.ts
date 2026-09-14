import * as THREE from 'three';

type MaterialKey = 'no-bag' | 'reusable' | 'paper' | 'compostable' | 'plastic';

export function initEcoWorld() {
  const canvas = document.querySelector<HTMLCanvasElement>('#ecoWorld');
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!canvas || !hero) return;
  const mobile = window.innerWidth < 800;
  const lowPower = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile && !lowPower, alpha: true, powerPreference: 'high-performance' });
  } catch {
    canvas.closest('.scene3d')?.classList.add('webgl-fallback');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : lowPower ? 1.05 : 1.35));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(6.2, 4.2, 8.4);
  camera.lookAt(0, 0.5, 0);
  const world = new THREE.Group();
  world.rotation.y = -0.35;
  scene.add(world);

  const palette = {
    dark: { platform: 0x10281d, building: 0x143d2b, accent: 0xc7e36a, leaf: 0x5d9a67, neutral: 0xdfe8e0, particle: 0xb9da76 },
    light: { platform: 0xdce8dd, building: 0xf7faf5, accent: 0x4e7d35, leaf: 0x4c8a58, neutral: 0x6f8176, particle: 0x5f8b42 },
  };
  const platformMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.12 });
  const buildingMat = new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.16 });
  const accentMat = new THREE.MeshStandardMaterial({ roughness: 0.28, metalness: 0.08, emissiveIntensity: 0.18 });
  const leafMat = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const neutralMat = new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.1 });
  const plasticMat = new THREE.MeshStandardMaterial({ color: 0xc66b67, roughness: 0.4, transparent: true, opacity: 0.85 });
  const paperMat = new THREE.MeshStandardMaterial({ color: 0xc9b998, roughness: 0.7 });
  const blueMat = new THREE.MeshStandardMaterial({ color: 0x72aaa0, roughness: 0.5 });

  const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.45, 3.8, 0.38, 64), platformMat);
  platform.position.y = -1.25;
  world.add(platform);
  const shop = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.55, 2.6), buildingMat);
  shell.position.y = 0.2;
  shop.add(shell);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.95, 0.18, 2.9), accentMat);
  roof.position.y = 1.55;
  shop.add(roof);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(2.25, 1.55, 0.08), new THREE.MeshPhysicalMaterial({ color: 0x8ec5aa, roughness: 0.05, transmission: 0.5, transparent: true, opacity: 0.55 }));
  glass.position.set(0.35, 0.25, 1.34);
  shop.add(glass);
  const awning = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.2, 0.7), accentMat);
  awning.position.set(0.25, 1.0, 1.65);
  awning.rotation.x = -0.16;
  shop.add(awning);
  for (let index = 0; index < 7; index += 1) {
    const product = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.46, 0.28), index % 2 === 0 ? accentMat : neutralMat);
    product.position.set(-0.85 + index * 0.28, -0.12 + (index % 2) * 0.53, 1.43);
    shop.add(product);
  }
  world.add(shop);

  const plasticGroup = new THREE.Group();
  for (let index = 0; index < 6; index += 1) {
    const plastic = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.44, 0.055), plasticMat);
    plastic.position.set(-2.1 + (index % 3) * 0.32, -0.55 + Math.floor(index / 3) * 0.48, 1.15);
    plasticGroup.add(plastic);
  }
  world.add(plasticGroup);

  const reusableGroup = new THREE.Group();
  const tote = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.24), accentMat);
  reusableGroup.add(tote);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 12, 28, Math.PI), neutralMat);
  handle.position.y = 0.68;
  handle.rotation.z = Math.PI;
  reusableGroup.add(handle);
  reusableGroup.position.set(-2.1, -0.15, 1.0);
  reusableGroup.rotation.y = 0.35;
  world.add(reusableGroup);

  const paperGroup = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.65, 0.18), paperMat);
    bag.position.set(-0.3 + index * 0.5, -0.42, 1.55);
    paperGroup.add(bag);
  }
  world.add(paperGroup);

  const wasteGroup = new THREE.Group();
  [0x4c8a58, 0x7399a5].forEach((color, index) => {
    const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.25, 0.62, 18), new THREE.MeshStandardMaterial({ color }));
    bin.position.set(2.2 + index * 0.48, -0.72, 0.5);
    wasteGroup.add(bin);
  });
  world.add(wasteGroup);

  const solarGroup = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.62), blueMat);
    panel.position.set(-0.9 + index * 0.95, 1.88, -0.2);
    panel.rotation.x = -0.28;
    solarGroup.add(panel);
  }
  world.add(solarGroup);

  const signage = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.58, 0.07), accentMat);
  signage.position.set(0.2, 1.0, 1.54);
  world.add(signage);

  const peopleGroup = new THREE.Group();
  [-1, 0.3, 1.25].forEach((x, index) => {
    const person = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.55, 5, 12), index === 1 ? accentMat : neutralMat);
    body.position.y = 0.35;
    person.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), neutralMat);
    head.position.y = 0.98;
    person.add(head);
    person.position.set(x, -0.9, 2.1 + index * 0.18);
    peopleGroup.add(person);
  });
  world.add(peopleGroup);

  const treePositions = [[2.2, -0.95, -1.4], [-2.3, -0.95, -1.55], [2.5, -0.95, 1.35]];
  treePositions.forEach(([x, y, z], index) => {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.75, 12), neutralMat);
    trunk.position.y = 0.35;
    tree.add(trunk);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.52 + index * 0.05, 1.35, 18), leafMat);
    crown.position.y = 1.25;
    tree.add(crown);
    tree.position.set(x, y, z);
    world.add(tree);
  });

  const haloMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.42 });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(4.15, 0.018, 8, 160), haloMat);
  halo.rotation.x = Math.PI / 2.2;
  halo.position.y = -0.2;
  world.add(halo);

  const networkGroup = new THREE.Group();
  const nodeGeometry = new THREE.SphereGeometry(0.1, 12, 10);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xc7e36a });
  const networkPositions: THREE.Vector3[] = [];
  for (let index = 0; index < 14; index += 1) {
    const angle = index / 14 * Math.PI * 2;
    const radius = 4.4 + (index % 3) * 0.25;
    const position = new THREE.Vector3(Math.cos(angle) * radius, -0.3 + (index % 2) * 0.65, Math.sin(angle) * radius);
    networkPositions.push(position);
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.copy(position);
    networkGroup.add(node);
  }
  const linePositions: number[] = [];
  networkPositions.forEach((position, index) => {
    const next = networkPositions[(index + 1) % networkPositions.length];
    linePositions.push(position.x, position.y, position.z, next.x, next.y, next.z);
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  networkGroup.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0xc7e36a, transparent: true, opacity: 0.34 })));
  world.add(networkGroup);

  const particleCount = mobile ? 48 : lowPower ? 72 : 120;
  const positions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    const radius = 4.4 + Math.random() * 2.4;
    const angle = Math.random() * Math.PI * 2;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 4.8;
    positions[index * 3 + 2] = Math.sin(angle) * radius;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ size: 0.035, transparent: true, opacity: 0.55 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  scene.add(new THREE.HemisphereLight(0xdfffe8, 0x142218, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, 4.2);
  key.position.set(4, 7, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0xc7e36a, 28, 14, 2);
  rim.position.set(-4, 2.5, 4);
  scene.add(rim);

  let selectedMaterial: MaterialKey = 'no-bag';
  let simulatorConfig: Record<string, boolean | number> = {};
  let scoreConfig: Record<string, boolean> = {};
  let heroProgress = 0;
  let stage = 0;
  let announcedStage = -1;

  const applyStage = () => {
    plasticGroup.visible = (stage <= 1 && scoreConfig.plastic !== false) || simulatorConfig.plastic === true || scoreConfig.plastic === true;
    reusableGroup.visible = stage >= 2 || simulatorConfig.reusable === true || scoreConfig.reusable === true || selectedMaterial === 'reusable';
    paperGroup.visible = stage >= 2 || simulatorConfig.paper === true || scoreConfig.paper === true || selectedMaterial === 'paper';
    wasteGroup.visible = stage >= 2 || simulatorConfig.waste === true || scoreConfig.waste === true;
    solarGroup.visible = stage >= 3 || simulatorConfig.energy === true;
    signage.visible = stage >= 1 || simulatorConfig.awareness === true || scoreConfig.awareness === true;
    peopleGroup.visible = stage >= 3;
    networkGroup.visible = stage >= 4;
    networkGroup.scale.setScalar(0.72 + Math.max(0, heroProgress - 0.72) * 1.2);
    plasticMat.opacity = stage === 0 ? 0.9 : 0.42;
    const stageRail = document.querySelectorAll('#heroStageRail span');
    stageRail.forEach((item, index) => item.classList.toggle('active', index === stage));
    if (announcedStage !== stage) {
      announcedStage = stage;
      window.dispatchEvent(new CustomEvent('eco-hero-stage', { detail: { stage } }));
    }
  };

  window.addEventListener('eco-material-change', (event: Event) => {
    selectedMaterial = (event as CustomEvent<{ material: MaterialKey }>).detail.material;
    applyStage();
  });
  window.addEventListener('eco-store-config', (event: Event) => {
    simulatorConfig = (event as CustomEvent<Record<string, boolean | number>>).detail;
    applyStage();
  });
  window.addEventListener('eco-score-update', (event: Event) => {
    const answers = (event as CustomEvent<{ answers: boolean[] }>).detail.answers;
    scoreConfig = { plastic: !answers[0], paper: answers[1], reusable: answers[2], packaging: answers[3], waste: answers[4], awareness: answers[5] };
    applyStage();
  });

  const applyPalette = () => {
    const mode = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const p = palette[mode];
    platformMat.color.setHex(p.platform);
    buildingMat.color.setHex(p.building);
    accentMat.color.setHex(p.accent);
    accentMat.emissive.setHex(p.accent);
    leafMat.color.setHex(p.leaf);
    neutralMat.color.setHex(p.neutral);
    haloMat.color.setHex(p.accent);
    particleMat.color.setHex(p.particle);
    nodeMaterial.color.setHex(p.accent);
  };
  applyPalette();
  new MutationObserver(applyPalette).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const pointer = { x: 0, y: 0 };
  canvas.addEventListener('pointermove', event => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  canvas.addEventListener('pointerleave', () => { pointer.x = 0; pointer.y = 0; });

  const updateScroll = () => {
    const rect = hero.getBoundingClientRect();
    const scrollable = Math.max(1, hero.offsetHeight - window.innerHeight);
    heroProgress = Math.max(0, Math.min(1, -rect.top / scrollable));
    stage = Math.min(4, Math.floor(heroProgress * 5));
    applyStage();
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  let heroVisible = true;
  let pageVisible = !document.hidden;
  new IntersectionObserver(entries => { heroVisible = entries[0]?.isIntersecting ?? true; }, { rootMargin: '20% 0px 20% 0px' }).observe(hero);
  document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; });

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    if (!heroVisible || !pageVisible) return;
    const time = clock.getElapsedTime();
    const motionOff = document.body.dataset.motion === 'reduced';
    const targetY = -0.35 + pointer.x * 0.16 + heroProgress * 0.45;
    const targetX = pointer.y * 0.07 - heroProgress * 0.05;
    world.rotation.y += (targetY - world.rotation.y) * 0.045;
    world.rotation.x += (targetX - world.rotation.x) * 0.045;
    camera.position.z = 8.4 - heroProgress * 1.25;
    camera.position.y = 4.2 - heroProgress * 0.55;
    camera.lookAt(0, 0.35 + heroProgress * 0.2, 0);
    if (!motionOff) {
      halo.rotation.z = time * 0.12;
      particles.rotation.y = time * 0.018;
      reusableGroup.position.y = -0.15 + Math.sin(time * 1.25) * 0.07;
      shop.position.y = Math.sin(time * 0.72) * 0.025;
      networkGroup.rotation.y = time * 0.035;
    }
    renderer.render(scene, camera);
  };
  animate();
}
