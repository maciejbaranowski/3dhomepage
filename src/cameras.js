import * as THREE from "three";

export const createCamera = () => {
  const fieldOfView = 60;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const nearClipping = 0.1;
  const farClipping = 1000;

  let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClipping, farClipping);
  camera.position.z = 5;
  camera.position.y = 5;
  window.addEventListener("resize", event => {
    camera.aspect = window.innerWidth / window.innerHeight;
    console.log(camera.aspect);
  });

  return camera;
};
