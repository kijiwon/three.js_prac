import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const fogColor = 0x004fff;
const objColor = 0xffffff;
const floorColor = 0x555555;

const scene = new THREE.Scene();
scene.background = new THREE.Color(floorColor);
// fog
scene.fog = new THREE.Fog(fogColor, 10, 50);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 3);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const geometry = new THREE.TorusGeometry(1, 0.5, 12, 80);
const material = new THREE.MeshStandardMaterial({ color: objColor });
const obj = new THREE.Mesh(geometry, material);
obj.position.y = 0.8;
scene.add(obj);

const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: floorColor });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -3;
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

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
