import * as THREE from "three";

import FPC from "./FirstPersonControls";
import { createFloor, createLinks, createSky } from "./objects";
import { createLights } from "./lights";

export const loop = (renderer, scene, camera, controls) => {
  let clock = new THREE.Clock();
  const animate = () => {
    controls.update(clock.getDelta());
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
  document.body.appendChild(renderer.domElement);
  return renderer;
};

export const createScene = () => {
  let scene = new THREE.Scene();
  createFloor(scene);
  createSky(scene);
  createLinks(scene);
  createLights(scene);
  return scene;
};

export const createControls = camera => {
  return new FPC(camera);
};
