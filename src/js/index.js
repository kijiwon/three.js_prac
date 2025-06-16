import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 100);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const skyMaterialArray = [];
const texture_bk = new THREE.TextureLoader().load(
  "../../src/textures/sky/meadow_bk.jpg"
);
const texture_dn = new THREE.TextureLoader().load(
  "../../src/textures/sky/meadow_dn.jpg"
);
const texture_ft = new THREE.TextureLoader().load(
  "../../src/textures/sky/meadow_ft.jpg"
);
const texture_lf = new THREE.TextureLoader().load(
  "../../src/textures/sky/meadow_lf.jpg"
);
const texture_rt = new THREE.TextureLoader().load(
  "../../src/textures/sky/meadow_rt.jpg"
);
const texture_up = new THREE.TextureLoader().load(
  "../../src/textures/sky/meadow_up.jpg"
);

skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_ft,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_bk,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_up,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_dn,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_rt,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_lf,
  })
);

for (let i = 0; i < 6; i++) {
  skyMaterialArray[i].side = THREE.BackSide;
}

const skyGeometry = new THREE.BoxGeometry(400, 400, 400);
const skyMaterial = new THREE.MeshStandardMaterial({
  // color: 0x333333,
  // map: texture,
});
skyMaterial.side = THREE.BackSide;
const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
scene.add(sky);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// OrbitControls
const control = new OrbitControls(camera, renderer.domElement);
control.minDistance = 20;
control.maxDistance = 800;

// 애니메이션 콜백함수
function animate() {
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
