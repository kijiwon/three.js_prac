import * as THREE from "three";
import { OrbitControls } from "three/examples/jms/Addons.js";
import printTree from "../mesh/tree.js";
import printTangerine from "../mesh/tangerine.js";

const $result = document.getElementById("result");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 축
const axes = new THREE.AxesHelper(10);
scene.add(axes);

const camera = new THREE.PerspectiveCamera(
  100, // 시야 각
  $result.clientWidth / $result.clientHeight, // window의 종횡비
  0.1, // 최소거리
  1000 // 최대거리
);
// 위치 설정
camera.position.set(0, 10, 15);
// 바라볼 좌표값 설정 - camera는 z축에 평행한 방향을 비춤
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true }); // 특정 DOM 요소 전달
// 사이즈 설정
renderer.setSize($result.clientWidth, $result.clientHeight);

// light 설정
const light = new THREE.DirectionalLight(0xffffff);
// light 위치 설정
light.position.set(2, 4, 3);
scene.add(light); // light가 밝히는 위치만 밝게 표시됨

// 한라봉
const tangerine1 = printTangerine();
tangerine1.position.x = 3;
tangerine1.scale.set(0.8, 0.8, 0.8);
scene.add(tangerine1);

// 나무
const tree1 = printTree();
scene.add(tree1);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// 조작 범위 제어
controls.minDistance = 2;
controls.maxDistance = 10;

// 회전 시 관성 적용(부드러운 회전 효과)
controls.enableDamping = true;

function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}
animate();

// 반응형
window.addEventListener("resize", () => {
  // 1. camera 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // camera 업데이트

  // 2. renderer의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});
