import * as THREE from "three";
import { OrbitControls } from "three/examples/jms/Addons.js";

// html canvas 태그 선택
const $result = document.getElementById("result");

// three.js 구성요소
// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
// add -> 요소 추가
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50, // 시야 각
  $result.clientWidth / $result.clientHeight, // window의 종횡비
  0.1, // 최소거리
  1000 // 최대거리
);
// 위치 설정
camera.position.set(2, 2, 2);
// 바라볼 좌표값 설정 - camera는 z축에 평행한 방향을 비춤
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene과 Camera의 정보를 이용해 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true }); // 특정 DOM 요소 전달
// 사이즈 설정
renderer.setSize($result.clientWidth, $result.clientHeight);

// 화면에 표시
// document.body.appendChild(renderer.domElement);

// light 설정
const light = new THREE.DirectionalLight(0xffffff);
// light 위치 설정
light.position.set(2, 4, 3);
scene.add(light); // light가 밝히는 위치만 밝게 표시됨

// Mesh(3D 객체) ,Geometry(형태), Material(재질)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const basic = new THREE.MeshBasicMaterial({
  // Material 기본 속성
  // 1. color: Hex 코드 입력
  color: 0x2e6ff2,
  // 2. wireframe: 와이어프레임으로 렌더링(면 제거)
  //   wireframe: true,
  // 3. transparent: 투명도 사용 여부 -> true일 때 opacity 적용
  transparent: true,
  // 4. opacity: 불투명도
  opacity: 0.5,
});

const standard = new THREE.MeshStandardMaterial({
  color: 0xffaaaa,
  // 속성
  // 거칠기 - 숫자가 작을수록 매끄러움(0-1)
  roughness: 0.2,
  // 금속성 - 숫자가 클수록 금속 질감이 더 표현됨(0-1)
  metalness: 0.8,
  // 텍스처 - 텍스처를 적용하는 객체 연결
  // map:
  // 렌더링할 면 결정
  // 3D 객체에서는 확인하기 어려움 -> Plane 객체에서 확인
  // 기본값은 FrontSide(앞면) => 회전 시 뒷면은 표시되지 않음
  side: THREE.DoubleSide,
});

// physicalMaterial은 standardMaterial의 확장 버전 -> 고급 물리 기반 렌더링 제공
const physical = new THREE.MeshPhysicalMaterial({
  color: 0xffaaaa,
  // 반투명 레이어층
  clearcoat: 0.8,
  // 반투명 강도
  clearcoatRoughness: 0.2,
});

// 광택이 있는 표면을 표현(금속, 유리, 보석)
const phong = new THREE.MeshPhongMaterial({
  color: 0xffaaaa,
  // 광택의 정도
  shininess: 100,
  // 물체가 반사하는 빛의 색상
  specular: 0x2eff2,
});

const mesh = new THREE.Mesh(geometry, physical);
scene.add(mesh);

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
