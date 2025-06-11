import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import printIsland from "../mesh/island.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ccad5);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 20);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const island = printIsland();
scene.add(island);

// OrbitControls
const control = new OrbitControls(camera, renderer.domElement);

// 애니메이션 콜백함수
function animate() {
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
