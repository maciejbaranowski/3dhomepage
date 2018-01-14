import { createRenderer, createScene, createControls, loop } from "./scene";
import { createCamera } from "./cameras";

let renderer = createRenderer();
let camera = createCamera();
let controls = createControls(camera);
let scene = createScene();
loop(renderer, scene, camera, controls);
