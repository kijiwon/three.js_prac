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

const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true }); // 특정 DOM 요소 전달
// 사이즈 설정
renderer.setSize($result.clientWidth, $result.clientHeight);

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x81a8f7,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
scene.add(plane);

// Light
// 1. ambientLight - 모든 mesh를 대상으로 전역적으로 빛을 발산 + 빛의 방향 없음 => 그림자나 명암 발생x => 객체의 출력이나 재질을 확인할 때 용이함
const ambientLight = new THREE.AmbientLight(
  0xffffff, // 빛의 색상
  1 // 빛의 강도
);

// 2. directionalLight - 방향이 있음(0,1,0 위치에 생성(기본값) - 0,0,0위치를 비춤(그림자 생성))
// 햇빛과 같은 방향성 광원 -> 모든 점에서 일정한 방향으로 광을 발산함
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-2, 2, 0);

// Light Helper - directionalLight의 형태를 시각화
const dlHelper = new THREE.DirectionalLightHelper(
  directionalLight, // 적용할 light
  1, // 크기
  0xff0000 // 색상
);

// 3. pointLight - 전구와 같이 모든 방향으로 빛을 발산(광원)
const pointLight = new THREE.PointLight(0xff0000);
pointLight.position.set(1, 1, 0);

const plHelper = new THREE.PointLightHelper(pointLight, 1, 0x00ff00);

// 4. spotLight - 한 점에서 원뿔형태로 빛을 발산(0,1,0 위치에 생성(기본값) -> 그림자 생성)
const spotLight = new THREE.SpotLight(
  0xffffff,
  1, // 빛의 거리
  0,
  Math.PI / 6, // 각도(각도에 따라 spotLight의 모양을 변경)
  0.5 // peumbra - 가장자리 흐림 효과
);
spotLight.position.y = 2;

const slHelper = new THREE.SpotLightHelper(spotLight, 0xff0000);

// 5. hemisphereLight - 하늘과 바닥의 면의 색상을 지정, 그림자는 사용x
const hemisphereLight = new THREE.HemisphereLight(
  0xffaaaa, // 하늘면
  0x00ff00 // 땅면
);
scene.add(hemisphereLight);

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
