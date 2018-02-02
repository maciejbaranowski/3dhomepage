import * as THREE from "three";

import FPC from "./FirstPersonControls";
import { createFloor, createLinks, createSky } from "./objects";
import { createLights } from "./lights";
import { actBehaviours } from "./behaviours";

export const loop = (renderer, scene, camera, controls) => {
  let clock = new THREE.Clock();
  const animate = () => {
    controls.update(clock.getDelta());
    actBehaviours(scene, camera);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate(renderer, scene, camera, controls);
};

export const createRenderer = () => {
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  window.addEventListener("resize", event => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);
  return renderer;
};

export const createScene = sceneParameters => {
  let scene = new THREE.Scene();
  createFloor(scene);
  createSky(scene);
  createLinks(scene, sceneParameters.urls);
  createLights(scene);
  scene.fog = new THREE.Fog(0xffffff, 10, 1000);
  return scene;
};

export const createControls = camera => {
  return new FPC(camera);
};
