import * as THREE from "three";
import { floorMaterial, greenShinyMaterial, skyMaterials, textMaterial } from "./materials";

export const createFloor = scene => {
  let geometry = new THREE.PlaneGeometry(60, 60);
  let mesh = new THREE.Mesh(geometry, floorMaterial);
  mesh.rotation.x = THREE.Math.degToRad(-90);
  scene.add(mesh);
  return mesh;
};

export const createSky = scene => {
  let geometry = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1);
  geometry.position = { x: -500, y: -500, z: -500 };
  geometry.scale(-1, 1, 1);
  let mesh = new THREE.Mesh(geometry, skyMaterials);
  scene.add(mesh);
  return mesh;
};

const createIndicatorBox = (scene, position) => {
  var geometry = new THREE.IcosahedronGeometry(0.8);
  var mesh = new THREE.Mesh(geometry, greenShinyMaterial);
  mesh.position.set(position[0], position[1], position[2]);
  setInterval(() => {
    mesh.rotation.x += 0.03;
    mesh.rotation.y += 0.03;
  }, 30);
  scene.add(mesh);
  return mesh;
};

const createLinkText = (scene, font, text) => {
  let geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 2,
    height: 0.2,
    curveSegments: 30
  });
  let mesh = new THREE.Mesh(geometry, textMaterial);
  geometry.computeBoundingBox();
  mesh.position.x = -geometry.boundingBox.max.x / 2;
  scene.add(mesh);
  return mesh;
};

const createLinkGroup = (scene, font, text, position) => {
  let group = new THREE.Object3D();
  let box = createIndicatorBox(group, [0, 3, 0]);
  let linkText = createLinkText(group, font, text);
  group.position.set(...position);
  group.lookAt(0, 0, 0);
  scene.add(group);
  return group;
};

export const createLinks = scene => {
  let fontLoader = new THREE.FontLoader();
  fontLoader.load("../node_modules/three/examples/fonts/helvetiker_regular.typeface.json", function(font) {
    createLinkGroup(scene, font, "Bergsoft.pl", [20, 2, 20]);
    createLinkGroup(scene, font, "Google.com", [-20, 2, 20]);
    createLinkGroup(scene, font, "Onet.pl", [20, 2, -20]);
    createLinkGroup(scene, font, "E-mail", [-20, 2, -20]);
  });
};
