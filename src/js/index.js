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

const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
renderer.shadowMap.enabled = true;

// Texture
const loader = new THREE.TextureLoader();
const basecolor = loader.load("../../src/textures/bark/Bark_06_basecolor.jpg");
const normal = loader.load("../../src/textures/bark/Bark_06_normal.jpg");
const rough = loader.load("../../src/textures/bark/Bark_06_roughness.jpg");
const height = loader.load("../../src/textures/bark/Bark_06_height.png");

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  // color: 0x2e6ff2,
  // texture 연결
  map: basecolor, // material 색상
  normalMap: normal, // 표면에 빛을 왜곡시켜 입체감 표현
  // normalScale: new THREE.Vector2(0, 0), // 빛의 왜곡 정도 조절. 기본값은 (1,1)
  roughness: 0.4, // 거칠기를 줄여 입체감 확인

  roughnessMap: rough, // 질감에 따른 빛의 굴곡 표현

  displacementMap: height, // 텍스처의 명암에 따라 표면의 높낮이 조절(밝을수록 높고, 어두울수록 낮음)
  displacementScale: 0.2, // 높낮이의 정도 설정
});
const cube = new THREE.Mesh(geometry, material);

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

plane.receiveShadow = true;
scene.add(plane);

const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 2, 2);
dl.castShadow = true;
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
