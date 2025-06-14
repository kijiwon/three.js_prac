import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ccad5);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// const geometry = new THREE.SphereGeometry(1);
// const material = new THREE.MeshStandardMaterial({
//   color: 0x2e6ff2,
// });
// const cube = new THREE.Mesh(geometry, material);
// cube.castShadow = true;
// scene.add(cube);

// const geometry2 = new THREE.PlaneGeometry(10, 10);
// const material2 = new THREE.MeshStandardMaterial({
//   color: 0x81a8f7,
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(geometry2, material2);
// plane.rotation.x = Math.PI / -2;
// plane.position.y = -1;
// plane.receiveShadow = true;
// scene.add(plane);

const loader = new THREE.TextureLoader();
const materials = [
  new THREE.MeshStandardMaterial({
    map: loader.load("../src/textures/flowers/flower-1.jpg"),
  }),
  new THREE.MeshStandardMaterial({
    map: loader.load("../src/textures/flowers/flower-2.jpg"),
  }),
  new THREE.MeshStandardMaterial({
    map: loader.load("../src/textures/flowers/flower-3.jpg"),
  }),
  new THREE.MeshStandardMaterial({
    map: loader.load("../src/textures/flowers/flower-4.jpg"),
  }),
  new THREE.MeshStandardMaterial({
    map: loader.load("../src/textures/flowers/flower-5.jpg"),
  }),
  new THREE.MeshStandardMaterial({
    map: loader.load("../src/textures/flowers/flower-6.jpg"),
  }),
];

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshStandardMaterial({ color: 0x2e6ff2 });
const box = new THREE.Mesh(geometry2, materials);
scene.add(box);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(-10, 10, 10);
directionalLight.position.set(-1, 2, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 5;
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// OrbitControls
const control = new OrbitControls(camera, renderer.domElement);
// control.autoRotate = true;
control.autoRotateSpeed = -1;
control.minDistance = 10;
control.maxDistance = 30;

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
