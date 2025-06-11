import * as THREE from "three";

export default function printIsland() {
  const island = new THREE.Group();

  const topGeometry = new THREE.CylinderGeometry(5, 5, 1, 9);
  const topMaterial = new THREE.MeshStandardMaterial({
    color: 0x6ca06e,
  });
  const top = new THREE.Mesh(topGeometry, topMaterial);
  top.scale.x = 2;
  island.add(top);

  return island;
}
