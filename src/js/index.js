import * as THREE from "three";

// three.js 구성요소
// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
// add -> 요소 추가
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight, // window의 종횡비
  0.1, // 최소거리
  1000 // 최대거리
);
// 위치 설정
camera.position.set(2, 2, 2);
// 바라볼 좌표값 설정 - camera는 z축에 평행한 방향을 비춤
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene과 Camera의 정보를 이용해 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer();
// 사이즈 설정
renderer.setSize(window.innerWidth, window.innerHeight);

// 화면에 표시
document.body.appendChild(renderer.domElement);

// light 설정
const light = new THREE.DirectionalLight(0xffffff);
// light 위치 설정
light.position.set(2, 4, 3);
scene.add(light); // light가 밝히는 위치만 밝게 표시됨

// 정육면체 표시하기
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);
// box 안보임 왜? camera 기본 위치가 정육면체의 기본 위치와 동일하기 때문(0,0,0)
// -> camera 위치를 바꿔줌(camera.position.set)

// scene, camera 연결
renderer.render(scene, camera);
