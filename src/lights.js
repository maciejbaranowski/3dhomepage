import * as THREE from "three";

export const createLights = scene => {
  const ambientLight = new THREE.AmbientLight(0xb0b0b0);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xbbbbbb, 3, 200);
  pointLight.position.set(-20, 30, 20);
  pointLight.castShadow = true;
  scene.add(pointLight);
};
