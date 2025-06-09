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
camera.position.set(2, 2, 2);
// 바라볼 좌표값 설정 - camera는 z축에 평행한 방향을 비춤
camera.lookAt(0, 0, 0);

// 그림자 넣기
// 1. renderer의 shadowMap 속성 활성화
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
renderer.shadowMap.enabled = true;

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});
const cube = new THREE.Mesh(geometry, material);
// 3. 그림자를 만들 Mesh의 속성 적용
cube.castShadow = true;
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x81a8f7,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
// 4. 그림자가 맺히는 Mesh의 속성 적용
plane.receiveShadow = true;
scene.add(plane);

const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 2, 2);
// 2. 빛에 그림자를 생성하는 속성 적용
dl.castShadow = true;
// 그림자 해상도 조절
dl.shadow.mapSize.width = 1024; // 기본값 512. 클수록 해상도↑
dl.shadow.mapSize.height = 1024; // 기본값 512. 클수록 해상도↑

// 그림자 가장자리 블러효과
dl.shadow.radius = 3;
scene.add(dl);

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
