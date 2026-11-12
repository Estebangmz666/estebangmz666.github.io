const container = document.querySelector(".hero-art");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

async function mountScene() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true });
  if (!context) return;

  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js");
  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 25);
  camera.position.set(0, 0, 8);
  const sculpture = new THREE.Group();
  scene.add(sculpture);

  const crystalGeometry = new THREE.IcosahedronGeometry(1.38, 0);
  const crystal = new THREE.Mesh(crystalGeometry, new THREE.MeshStandardMaterial({
    color: 0x314b3e,
    roughness: 0.64,
    flatShading: true,
  }));
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(crystalGeometry),
    new THREE.LineBasicMaterial({ color: 0xc3e9d4, transparent: true, opacity: 0.64 }),
  );
  sculpture.add(crystal, edges);

  const ringMaterial = new THREE.LineBasicMaterial({
    color: 0x8ebca6, transparent: true, opacity: 0.52,
  });
  const ringGeometry = new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 96 }, (_, index) => {
      const angle = index * Math.PI * 2 / 96;
      return new THREE.Vector3(1.94 * Math.cos(angle), 1.94 * Math.sin(angle), 0);
    }),
  );
  const markerGeometry = new THREE.SphereGeometry(0.042, 8, 8);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xc3e9d4 });

  for (const [pitch, yaw, angle] of [[0.82, -0.42, 0.38], [-0.94, 0.74, 2.75]]) {
    const orbit = new THREE.LineLoop(ringGeometry, ringMaterial);
    orbit.rotation.set(pitch, yaw, 0);
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(1.94 * Math.cos(angle), 1.94 * Math.sin(angle), 0);
    orbit.add(marker);
    sculpture.add(orbit);
  }

  scene.add(new THREE.HemisphereLight(0xe1f8e7, 0x354e46, 1.8));
  const keyLight = new THREE.DirectionalLight(0xdaf5e5, 2.6);
  keyLight.position.set(-3, 4, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x85a99b, 1.4);
  rimLight.position.set(4, -2, -4);
  scene.add(rimLight);

  const restingPitch = 0.25;
  const restingYaw = -0.36;
  let targetPitch = restingPitch;
  let targetYaw = restingYaw;
  let frame = 0;
  let contextLost = false;

  function render() {
    if (!contextLost) renderer.render(scene, camera);
  }

  function move() {
    frame = 0;
    sculpture.rotation.x += (targetPitch - sculpture.rotation.x) * 0.12;
    sculpture.rotation.y += (targetYaw - sculpture.rotation.y) * 0.12;
    render();
    const distance = Math.abs(targetPitch - sculpture.rotation.x) + Math.abs(targetYaw - sculpture.rotation.y);
    if (distance > 0.002 && !contextLost && !reducedMotion.matches) {
      frame = requestAnimationFrame(move);
    }
  }

  function aim(pitch, yaw) {
    targetPitch = pitch;
    targetYaw = yaw;
    if (!frame && !contextLost) frame = requestAnimationFrame(move);
  }

  function resize() {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height || contextLost) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  }

  sculpture.rotation.set(restingPitch, restingYaw, -0.16);
  container.append(canvas);
  resize();
  container.classList.add("scene-ready");

  new ResizeObserver(resize).observe(container);
  container.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    const bounds = container.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    aim(restingPitch + y * 0.65, restingYaw + x * 0.9);
  });
  container.addEventListener("pointerleave", () => {
    if (!reducedMotion.matches) aim(restingPitch, restingYaw);
  });
  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = 0;
    sculpture.rotation.set(restingPitch, restingYaw, -0.16);
    render();
  });
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    contextLost = true;
    container.classList.remove("scene-ready");
  });
  canvas.addEventListener("webglcontextrestored", () => {
    contextLost = false;
    resize();
    container.classList.add("scene-ready");
  });
}

if (container) {
  mountScene().catch(() => {
    // The static illustration covers devices and networks without WebGL.
  });
}

