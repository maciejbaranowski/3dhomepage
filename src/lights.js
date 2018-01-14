import * as THREE from "three";

export const createLights = scene => {
  const ambientLight = new THREE.AmbientLight(0xb0b0b0);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xbbbbbb, 1, 0);
  pointLight.position.set(-100, 100, 100);
  scene.add(pointLight);
};
