import * as THREE from "three";

import FPC from "./FirstPersonControls";
import { ObjectsCreator } from "./objects";
import { createLights } from "./lights";
import { createCamera } from "./cameras";
import { actBehaviours } from "./behaviours";
import { createLoadingManager  } from "./loadingManager"
import RenderStats from "./threex.renderstats.js";

const loop = (renderer, scene, camera, controls) => {
  let rendererStats = createRenderStats();
  let clock = new THREE.Clock();
  const animate = () => {
    controls.update(clock.getDelta());
    actBehaviours(scene, camera);
    renderer.render(scene, camera);
    rendererStats.update(renderer);
    requestAnimationFrame(animate);
  };
  animate(renderer, scene, camera, controls);
};

const createRenderStats = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    let rendererStats	= new RenderStats()
    rendererStats.domElement.style.position	= 'absolute'
    rendererStats.domElement.style.left	= '0px'
    rendererStats.domElement.style.bottom	= '0px'
    document.body.appendChild( rendererStats.domElement )
    console.log()
    return rendererStats;  
  }
  return { update: () => {}};
}

const createRenderer = () => {
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

const createScene = sceneParameters => {
  let scene = new THREE.Scene();
  let creator = new ObjectsCreator(createLoadingManager(sceneParameters.language));
  creator.createFloor(scene);
  creator.createSky(scene);
  creator.createLinks(scene, sceneParameters.urls);
  createLights(scene);
  scene.fog = new THREE.Fog(0xffffff, 10, 1000);
  return scene;
};

const createControls = camera => {
  return new FPC(camera);
};

export const create3d = sceneParameters => {
  let renderer = createRenderer();
  let camera = createCamera();
  let controls = createControls(camera);
  let scene = createScene(sceneParameters);
  loop(renderer, scene, camera, controls);
};
