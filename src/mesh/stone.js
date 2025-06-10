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
    // displacementMap: height,
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

  // 팔
  const armsGm = new THREE.CylinderGeometry(0.5, 0.5, 2.5, 6);
  const leftArm = new THREE.Mesh(armsGm, material);
  leftArm.position.set(-1.5, 1.5, 0);
  leftArm.rotation.z = Math.PI / 3;
  stone.add(leftArm);

  const rightArm = new THREE.Mesh(armsGm, material);
  rightArm.position.set(1.5, 1.5, 0);
  rightArm.rotation.z = Math.PI / -3;
  stone.add(rightArm);

  // 눈
  const eyeGm = new THREE.CapsuleGeometry(0.3, 0.2);
  const eyeMt = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
  });
  const leftEye = new THREE.Mesh(eyeGm, eyeMt);
  leftEye.position.set(-0.25, 2.5, 0.75);
  const rightEye = new THREE.Mesh(eyeGm, eyeMt);
  rightEye.position.set(0.25, 2.5, 0.75);

  stone.add(leftEye);
  stone.add(rightEye);

  // 눈알
  const pupilGm = new THREE.SphereGeometry(0.1);
  const pupilMt = new THREE.MeshStandardMaterial({
    color: 0x000000,
  });
  const leftPupil = new THREE.Mesh(pupilGm, pupilMt);
  leftPupil.position.set(-0.2, 2.5, 1);
  const rightPupil = new THREE.Mesh(pupilGm, pupilMt);
  rightPupil.position.set(0.3, 2.5, 1);

  stone.add(leftPupil);
  stone.add(rightPupil);

  // 코
  const noseGm = new THREE.CylinderGeometry(0.1, 0.2, 0.4, 6);
  const nose = new THREE.Mesh(noseGm, material);
  nose.position.set(0, 2.2, 1);
  stone.add(nose);

  return stone;
}
