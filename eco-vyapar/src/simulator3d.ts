import * as THREE from 'three';

type FeatureKey = 'plastic' | 'paper' | 'reusable' | 'packaging' | 'waste' | 'energy' | 'awareness';

const initialState: Record<FeatureKey, boolean> = {
  plastic: true,
  paper: false,
  reusable: false,
  packaging: false,
  waste: false,
  energy: false,
  awareness: false,
};

export function initGreenStoreSimulator() {
  const canvas = document.querySelector<HTMLCanvasElement>('#simWorld');
  const controls = document.querySelector<HTMLElement>('#simControls');
  if (!canvas || !controls) return;
  const state = { ...initialState };
  const mobile = window.innerWidth < 800;
  const lowPower = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  let started = false;

  const boot = () => {
    if (started) return;
    started = true;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile && !lowPower, alpha: true, powerPreference: 'high-performance' });
    } catch {
      canvas.closest('.sim-visual')?.classList.add('webgl-fallback');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : lowPower ? 1.05 : 1.3));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.5, 3.9, 7.8);
    camera.lookAt(0, 0.3, 0);
    const world = new THREE.Group();
    scene.add(world);

    const baseMat = new THREE.MeshStandardMaterial({ color: 0x173a2b, roughness: 0.45, metalness: 0.12 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xc7e36a, roughness: 0.3, emissive: 0x52652d, emissiveIntensity: 0.22 });
    const neutralMat = new THREE.MeshStandardMaterial({ color: 0xe9efe9, roughness: 0.55 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xc86d62, roughness: 0.5 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x6ea8a0, roughness: 0.5 });

    const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.55, 0.34, 48), new THREE.MeshStandardMaterial({ color: 0x10271c, roughness: 0.7 }));
    platform.position.y = -1.22;
    world.add(platform);
    const shell = new THREE.Mesh(new THREE.BoxGeometry(3.7, 2.5, 2.55), baseMat);
    shell.position.y = 0.15;
    world.add(shell);
    const front = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 0.06), new THREE.MeshPhysicalMaterial({ color: 0xa7d5bb, transmission: 0.45, transparent: true, opacity: 0.62, roughness: 0.08 }));
    front.position.set(0.35, 0.2, 1.3);
    world.add(front);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(4, 0.18, 2.85), accentMat);
    roof.position.y = 1.5;
    world.add(roof);

    const plasticGroup = new THREE.Group();
    for (let index = 0; index < 5; index += 1) {
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.46, 0.08), redMat);
      bag.position.set(-1.4 + index * 0.28, -0.35 + (index % 2) * 0.12, 1.5);
      plasticGroup.add(bag);
    }
    world.add(plasticGroup);

    const paperGroup = new THREE.Group();
    for (let index = 0; index < 3; index += 1) {
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.58, 0.16), neutralMat);
      bag.position.set(-0.4 + index * 0.46, -0.25, 1.52);
      paperGroup.add(bag);
    }
    world.add(paperGroup);

    const reusableGroup = new THREE.Group();
    const tote = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.95, 0.18), accentMat);
    tote.position.set(-1.8, -0.15, 1.5);
    reusableGroup.add(tote);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.05, 10, 24, Math.PI), neutralMat);
    handle.position.set(-1.8, 0.42, 1.5);
    handle.rotation.z = Math.PI;
    reusableGroup.add(handle);
    world.add(reusableGroup);

    const packagingGroup = new THREE.Group();
    const packageBlock = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.5, 0.65), blueMat);
    packageBlock.position.set(1.2, -0.45, 1.05);
    packagingGroup.add(packageBlock);
    world.add(packagingGroup);

    const wasteGroup = new THREE.Group();
    [0x4f8d5a, 0x7c98a8].forEach((color, index) => {
      const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.65, 18), new THREE.MeshStandardMaterial({ color }));
      bin.position.set(1.85 + index * 0.52, -0.72, 0.7);
      wasteGroup.add(bin);
    });
    world.add(wasteGroup);

    const awarenessGroup = new THREE.Group();
    const sign = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 0.08), accentMat);
    sign.position.set(0.2, 0.95, 1.5);
    awarenessGroup.add(sign);
    world.add(awarenessGroup);

    const efficientLight = new THREE.PointLight(0xc7e36a, 0, 9, 2);
    efficientLight.position.set(0, 2.6, 2.7);
    scene.add(efficientLight);
    scene.add(new THREE.HemisphereLight(0xe6fff0, 0x13241a, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(4, 7, 5);
    scene.add(key);

    const pointer = { x: 0, y: 0 };
    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    canvas.addEventListener('pointerleave', () => { pointer.x = 0; pointer.y = 0; });

    const updateScene = () => {
      plasticGroup.visible = state.plastic;
      paperGroup.visible = state.paper;
      reusableGroup.visible = state.reusable;
      packagingGroup.scale.setScalar(state.packaging ? 0.7 : 1.15);
      wasteGroup.visible = state.waste;
      awarenessGroup.visible = state.awareness;
      efficientLight.intensity = state.energy ? 14 : 0;
      const positives = ['paper','reusable','packaging','waste','energy','awareness'].filter(keyName => state[keyName as FeatureKey]).length;
      const score = Math.max(0, Math.min(100, Math.round(positives / 6 * 100 - (state.plastic ? 8 : 0))));
      const scoreEl = document.querySelector('#readinessScore');
      if (scoreEl) scoreEl.textContent = String(score);
      const labelEl = document.querySelector('#readinessLabel');
      const label = score >= 91 ? 'Green Retail Champion' : score >= 76 ? 'Advanced Green Retail' : score >= 56 ? 'Green Transition' : score >= 31 ? 'Early Transition' : 'Starting Point';
      if (labelEl) labelEl.textContent = label;
      window.dispatchEvent(new CustomEvent('eco-store-config', { detail: { ...state, score } }));
    };

    controls.querySelectorAll<HTMLButtonElement>('button[data-feature]').forEach(button => button.addEventListener('click', () => {
      const feature = button.dataset.feature as FeatureKey;
      state[feature] = !state[feature];
      button.setAttribute('aria-pressed', String(state[feature]));
      const status = button.querySelector('i');
      if (status) status.textContent = state[feature] ? 'ON' : 'OFF';
      updateScene();
    }));
    updateScene();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
      camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(canvas);
    resize();
    let visible = true;
    let pageVisible = !document.hidden;
    new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; }, { rootMargin: '18% 0px 18% 0px' }).observe(canvas);
    document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; });
    const clock = new THREE.Clock();
    const render = () => {
      requestAnimationFrame(render);
      if (!visible || !pageVisible) return;
      const motionOff = document.body.dataset.motion === 'reduced';
      world.rotation.y += ((-0.28 + pointer.x * 0.16) - world.rotation.y) * 0.04;
      world.rotation.x += ((pointer.y * 0.06) - world.rotation.x) * 0.04;
      if (!motionOff) roof.position.y = 1.5 + Math.sin(clock.getElapsedTime() * 0.9) * 0.02;
      renderer.render(scene, camera);
    };
    render();
  };

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      boot();
      observer.disconnect();
    }
  }, { rootMargin: '300px' });
  observer.observe(canvas);
}
