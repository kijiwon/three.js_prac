import * as THREE from "three";
import { OrbitControls } from "three/examples/jms/Addons.js";

// html canvas 태그 선택
const $result = document.getElementById("result");

// three.js 구성요소
// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50, // 시야 각
  $result.clientWidth / $result.clientHeight, // window의 종횡비
  0.1, // 최소거리
  1000 // 최대거리
);
// 위치 설정
camera.position.set(5, 5, 5);
// 바라볼 좌표값 설정 - camera는 z축에 평행한 방향을 비춤
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene과 Camera의 정보를 이용해 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true }); // 특정 DOM 요소 전달
// 사이즈 설정
renderer.setSize($result.clientWidth, $result.clientHeight);

// light 설정
const light = new THREE.DirectionalLight(0xffffff);
// light 위치 설정
light.position.set(2, 4, 3);
scene.add(light); // light가 밝히는 위치만 밝게 표시됨

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 조작 설정 - zoom 제어
// controls.enableZoom = false;
// controls.enableRotate = false; // 회전 제어
// controls.enablePan = false; // 카메라 이동 제어

// 조작 범위 제어
controls.minDistance = 2;
controls.maxDistance = 10;
// 회전 각도 지정
// controls.maxPolarAngle = Math.PI / 3;

// 자동 회전
// controls.autoRotate = true;
controls.autoRotateSpeed = 10; // 회전 속도 설정 - 음수로 설정시 반대로 회전

// 회전 시 관성 적용(부드러운 회전 효과)
controls.enableDamping = true;

const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffaaaa,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 좌표축 추가
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Mesh 조작하기
// 1. 위치
mesh.position.x = 2;
mesh.position.y = 1;
mesh.position.set(0, 2, 1); // (x, y, z)축 이동

// 2. 회전
// mesh.rotation.y = 360;
// 각도가 변경됨 -> 도 기준이 아닌 라디안 값을 이용하기 때문 => three.js에서 메소드를 제공함
mesh.rotation.y = THREE.MathUtils.degToRad(30);

// 3. 크기 - 1보다 큼(확대), 1보다 작음(축소)
mesh.scale.x = 1.2;
mesh.scale.y = 0.5;

function animate() {
  // box 회전
  //   box.rotation.y += 0.01;
  // box가 회전할 때마다 렌더링해야함(변경된 속성값 렌더링)
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
