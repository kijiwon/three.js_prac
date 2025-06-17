import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const objGroup = new THREE.Group();
const loader = new GLTFLoader();
loader.load("../../src/textures/shiba/scene.gltf", (gltf) => {
  const model = gltf.scene;
  objGroup.add(model);
});
scene.add(objGroup);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// raycaster
const raycaster = new THREE.Raycaster();

function onMouseMove(e) {
  const mouse = {
    x: (e.clientX / renderer.domElement.clientWidth) * 2 - 1, // -1 ~ 1 사이의 값
    y: -(e.clientY / renderer.domElement.clientHeight) * 2 + 1, // -1 ~ 1 사이의 값
  };

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // 마우스 인
    console.log("마우스 인");
    gsap.to(objGroup.rotation, 1, {
      y: 7,
    });
    gsap.to(objGroup.scale, 1, {
      x: 2,
      y: 2,
      z: 2,
    });
  } else {
    // 마우스 아웃
    console.log("마우스 아웃");
    gsap.to(objGroup.rotation, 1, {
      y: 0,
    });
    gsap.to(objGroup.scale, 1, {
      x: 1,
      y: 1,
      z: 1,
    });
  }
}

document.body.appendChild(renderer.domElement);
renderer.domElement.addEventListener("pointermove", onMouseMove);

// OrbitControls
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.minDistance = 1;
control.maxDistance = 100;

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
