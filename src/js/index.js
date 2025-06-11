import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import printIsland from "../mesh/island.js";
import printTangerine from "../mesh/tangerine.js";
import printTree from "../mesh/tree.js";
import printStone from "../mesh/stone.js";
import printMountain from "../mesh/mountain.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ccad5);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pl1 = new THREE.PointLight(0xff8c00, 1.5);
pl1.position.set(4, 6, -3);
scene.add(pl1);

const pl2 = new THREE.PointLight(0xffe287, 2);
pl2.position.set(-5.5, 3, 5);
scene.add(pl2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const island = printIsland();
scene.add(island);

const tangerine = printTangerine();
tangerine.position.set(-4, 2, 2.5);
scene.add(tangerine);
const miniTan = printTangerine();
miniTan.position.set(-1, 1.5, 3);
miniTan.scale.set(0.7, 0.7, 0.7);
scene.add(miniTan);

const tree = printTree();
tree.position.set(7, 1, -1);
tree.rotation.x = THREE.MathUtils.degToRad(10);
tree.rotation.y = THREE.MathUtils.degToRad(15);
scene.add(tree);
const miniTree = printTree();
miniTree.position.set(-7, 1, 0);
miniTree.scale.set(0.8, 0.8, 0.8);
scene.add(miniTree);

const stone = printStone();
stone.position.set(4, 1, 2.5);
scene.add(stone);

const mountain = printMountain();
mountain.position.set(0, 3.5, -1.5);
mountain.scale.set(2, 2);
scene.add(mountain);

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
