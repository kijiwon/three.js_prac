import * as THREE from "three";

export default function printTangerine() {
  // 텍스쳐
  const loader = new THREE.TextureLoader();
  const basecolor = loader.load(
    "../../src/textures/orange/Orange_001_COLOR.jpg"
  );
  const normal = loader.load("../../src/textures/orange/Orange_001_NORM.jpg");
  const rough = loader.load("../../src/textures/orange/Orange_001_ROUGH.jpg");

  // 한라봉
  const tangerine = new THREE.Group();
  // 그룹화 - 몸통
  const body = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd16b,
    map: basecolor,
    normalMap: normal, // 빛의 왜곡 효과
    roughness: 0.2,
    roughnessMap: rough,
  });
  // 아래쪽
  const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
  const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
  body.add(bottom);
  // 위쪽
  const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
  const top = new THREE.Mesh(topGeometry, bodyMaterial);
  body.add(top);
  // 두 mesh를 합치기(top mesh의 position 설정)
  top.position.y = 1.7;

  // 그룹화 - 나뭇잎
  const fruitLeaf = new THREE.Group();
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x6ca06e,
    side: THREE.DoubleSide, // leaf이 모두 보이도록 설정
  });

  // 나뭇잎 줄기
  const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
  const stem = new THREE.Mesh(stemGeometry, leafMaterial);
  // 줄기 위치 설정
  stem.position.y = 2.5;
  fruitLeaf.add(stem);

  // 나뭇잎
  const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf.position.set(-0.5, 2.4, -0.1);
  leaf.rotation.z = Math.PI / -2;
  fruitLeaf.add(leaf);

  // 그림자
  for (const mesh of body.children) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
  for (const mesh of fruitLeaf.children) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  tangerine.add(body);
  tangerine.add(fruitLeaf);

  return tangerine;
}
