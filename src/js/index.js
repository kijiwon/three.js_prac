import * as THREE from "three";
import { OrbitControls } from "three/examples/jms/Addons.js";

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
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xff7b00,
});
// 아래쪽
const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
// scene.add(bottom);
// 위쪽
const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
const top = new THREE.Mesh(topGeometry, bodyMaterial);
// scene.add(top);
// 두 mesh를 합치기(top mesh의 position 설정)
top.position.y = 1.7;

// 나뭇잎
const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x008000,
  side: THREE.DoubleSide, // leaf이 모두 보이도록 설정
});

// 나뭇잎 줄기
const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
const stem = new THREE.Mesh(stemGeometry, leafMaterial);
// scene.add(stem);
// 줄기 위치 설정
stem.position.y = 2.5;

// 나뭇잎
const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
// scene.add(leaf);
leaf.position.set(-0.5, 2.4, -0.1);
leaf.rotation.z = Math.PI / -2;

// 나무
const tree = new THREE.Group();
// 그룹화 - 나무 몸통
const trunk = new THREE.Group();

const trunkMaterial = new THREE.MeshStandardMaterial({
  color: 0xa38049,
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.add(trunk1);

const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
trunk.add(trunk2);

const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
trunk.add(trunk3);

const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk4.position.set(0.3, 3.5, 0);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
trunk.add(trunk4);

tree.add(trunk);

// 그룹화 - 나뭇잎
const treeLeaf = new THREE.Group();

const treeLeafMaterial = new THREE.MeshStandardMaterial({
  color: 0x84ad88,
  side: THREE.DoubleSide,
});
const treeLeafGeometry = new THREE.SphereGeometry(
  2,
  32,
  16,
  Math.PI / 3, // 잎의 각도 = 60도
  Math.PI / 3 // 잎의 길이 = 60도
);
const treeLeaf1 = new THREE.Mesh(treeLeafGeometry, treeLeafMaterial);
treeLeaf1.rotation.x = Math.PI / -2;
treeLeaf1.position.set(0, 3.2, 2);
treeLeaf.add(treeLeaf1);

const treeLeaf2 = new THREE.Mesh(treeLeafGeometry, treeLeafMaterial);
treeLeaf2.rotation.x = Math.PI / -2;
treeLeaf2.rotation.z = Math.PI / 2;
treeLeaf2.position.set(2, 3.2, 0);
treeLeaf.add(treeLeaf2);

const treeLeaf3 = new THREE.Mesh(treeLeafGeometry, treeLeafMaterial);
treeLeaf3.rotation.x = Math.PI / -2;
treeLeaf3.rotation.z = Math.PI;
treeLeaf3.position.set(0, 3.2, -2);
treeLeaf.add(treeLeaf3);

const treeLeaf4 = new THREE.Mesh(treeLeafGeometry, treeLeafMaterial);
treeLeaf4.rotation.x = Math.PI / -2;
treeLeaf4.rotation.z = Math.PI / -2;
treeLeaf4.position.set(-2, 3.2, 0);
treeLeaf.add(treeLeaf4);

tree.add(treeLeaf);
treeLeaf.position.x = -0.4;
treeLeaf.rotation.z = THREE.MathUtils.degToRad(-10);

scene.add(tree);

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
