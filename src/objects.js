import * as THREE from "three";
import { floorMaterial, greenShinyMaterial, skyMaterials, textMaterial } from "./materials";

export const createFloor = scene => {
  let geometry = new THREE.PlaneGeometry(60, 60);
  let mesh = new THREE.Mesh(geometry, floorMaterial);
  mesh.rotation.x = THREE.Math.degToRad(-90);
  scene.add(mesh);
};

export const createSky = scene => {
  let geometry = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1);
  geometry.position = { x: -500, y: -500, z: -500 };
  geometry.scale(-1, 1, 1);
  let mesh = new THREE.Mesh(geometry, skyMaterials);
  scene.add(mesh);
};

export const createBox = (scene, position) => {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var cube = new THREE.Mesh(geometry, greenShinyMaterial);
  cube.position.x = position[0];
  cube.position.y = position[1];
  cube.position.z = position[2];
  scene.add(cube);
  setInterval(() => {
    cube.rotation.x += 0.03;
    cube.rotation.y += 0.03;
  }, 30);
};

export const addLink = (scene, font, text, position) => {
  let geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 2,
    height: 0.2,
    curveSegments: 30
  });
  let meshText = new THREE.Mesh(geometry, textMaterial);
  meshText.position.x = position[0];
  meshText.position.y = position[1];
  meshText.position.z = position[2];
  meshText.lookAt(0, 0, 0);
  scene.add(meshText);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  let bulbPosition = new THREE.Vector3();
  bulbPosition.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
  bulbPosition.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
  bulbPosition.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
  bulbPosition = meshText.localToWorld(bulbPosition);
  createBox(scene, [bulbPosition.x, bulbPosition.y, bulbPosition.z]);
};

export const createLinks = scene => {
  let fontLoader = new THREE.FontLoader();
  fontLoader.load("../node_modules/three/examples/fonts/helvetiker_regular.typeface.json", function(font) {
    addLink(scene, font, "Bergsoft.pl", [20, 2, 20]);
    addLink(scene, font, "Google.com", [-20, 2, 20]);
    addLink(scene, font, "Onet.pl", [20, 2, -20]);
    addLink(scene, font, "E-mail", [-20, 2, -20]);
  });
};
