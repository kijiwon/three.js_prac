import * as THREE from "three";

export default function printMountain() {
  // 텍스쳐
  const loader = new THREE.TextureLoader();
  const top = loader.load("../../src/textures/mountain/mountain_top.jpg");
  const side = loader.load("../../src/textures/mountain/mountain.jpg");

  const geometry = new THREE.CylinderGeometry(
    1,
    3,
    3,
    8 // radialSegments -> 각진느낌
  );
  const material = new THREE.MeshStandardMaterial({
    color: 0xffaaaa,
  });
  const materials = [
    new THREE.MeshStandardMaterial({
      map: side, // 옆면의 basecolor 텍스쳐
    }),
    new THREE.MeshStandardMaterial({
      map: top, // 윗면의 basecolor 텍스쳐
    }),
    new THREE.MeshStandardMaterial({ color: 0x609966 }),
  ];
  const mountain = new THREE.Mesh(geometry, materials);

  return mountain;
}
