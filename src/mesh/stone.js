import * as THREE from "three";

export default function printstone() {
  // 텍스쳐
  const loader = new THREE.TextureLoader();
  const basecolor = loader.load("../../src/textures/stone/stone_basecolor.jpg");
  const normal = loader.load("../../src/textures/stone/stone_normal.jpg");
  const rough = loader.load("../../src/textures/stone/stone_roughness.jpg");
  const height = loader.load("../../src/textures/stone/stone_height.png");

  // 그룹
  const stone = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0x565656,
    map: basecolor,
    normalMap: normal,
    roughnessMap: rough,
    roughness: 0.8,
  });

  const headGeometry = new THREE.CylinderGeometry(1, 1.5, 3, 4);
  const head = new THREE.Mesh(headGeometry, material);
  //   head.rotation.y = THREE.MathUtils.degToRad(45);
  head.rotation.y = Math.PI / 4;
  head.position.y = 2.5;
  stone.add(head);

  const hatGeometry = new THREE.BoxGeometry(2, 0.2, 2);
  const hat = new THREE.Mesh(hatGeometry, material);
  hat.position.y = 3.5;
  stone.add(hat);

  const bodyGeometry = new THREE.CylinderGeometry(1.5, 1.8, 2, 4);
  const body = new THREE.Mesh(bodyGeometry, material);
  body.rotation.y = Math.PI / 4;
  stone.add(body);

  return stone;
}
