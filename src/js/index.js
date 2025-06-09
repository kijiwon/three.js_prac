import * as THREE from "three";
import { OrbitControls } from "three/examples/jms/Addons.js";

const $result = document.getElementById("result");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(
  100, // 시야 각
  $result.clientWidth / $result.clientHeight, // window의 종횡비
  0.1, // 최소거리
  1000 // 최대거리
);
// 위치 설정
camera.position.set(3, 3, 3);
// 바라볼 좌표값 설정 - camera는 z축에 평행한 방향을 비춤
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
renderer.shadowMap.enabled = true;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffaaaa,
});

const materials = [
  // 정육면제에 적용할 재질
  new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  new THREE.MeshStandardMaterial({ color: 0xff8c00 }),
  new THREE.MeshStandardMaterial({ color: 0xffee00 }),
  new THREE.MeshStandardMaterial({ color: 0x4de94c }),
  new THREE.MeshStandardMaterial({ color: 0x3783ff }),
  new THREE.MeshStandardMaterial({ color: 0x4815aa }),
];

const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 4, 3);
scene.add(dl);
dl.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

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
