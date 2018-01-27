import * as THREE from "three";
import { floorMaterial, greenShinyMaterial, skyMaterials, textMaterial, woodenFenceMaterial } from "./materials";
import { setSlightBouncingAnimation, setRotationAnimation, setFlyingAroundAnimation } from "./behaviours";
import * as THREEOBJ from "./OBJLoader";
import * as THREEMTL from "./MTLLoader";

export const createFloor = scene => {
  let geometry = new THREE.PlaneGeometry(60, 60);
  let mesh = new THREE.Mesh(geometry, floorMaterial);
  mesh.rotation.x = THREE.Math.degToRad(-90);
  mesh.receiveShadow = true;
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
  setRotationAnimation(mesh);
  scene.add(mesh);
  return mesh;
};

const createLinkText = (scene, font, text) => {
  let geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 2,
    height: 0.2,
    curveSegments: 30,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 2
  });
  let mesh = new THREE.Mesh(geometry, textMaterial);
  mesh.castShadow = true;
  geometry.computeBoundingBox();
  mesh.position.x = -geometry.boundingBox.max.x / 2;
  setSlightBouncingAnimation(mesh);
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

const createFence = scene => {
  var objLoader = new THREE.OBJLoader();
  objLoader.load("../models/Picket Fence.obj", object => {
    let fenceMiddle = object.children[1];
    fenceMiddle.scale.x = 0.1;
    fenceMiddle.scale.y = 0.1;
    fenceMiddle.scale.z = 0.1;
    fenceMiddle.material = woodenFenceMaterial;
    fenceMiddle.castShadow = true;
    for (let i = 0; i < 24; i++) {
      let clone = fenceMiddle.clone();
      clone.position.x = i * 2.5 - 30.5;
      clone.position.z = -27;
      scene.add(clone);
    }
    for (let i = 0; i < 24; i++) {
      let clone = fenceMiddle.clone();
      clone.position.x = i * 2.5 - 30.5;
      clone.position.z = 33;
      scene.add(clone);
    }
    for (let i = 0; i < 24; i++) {
      let clone = fenceMiddle.clone();
      clone.position.x = 32.75;
      clone.position.z = i * 2.5 - 26.75;
      clone.rotation.y = THREE.Math.degToRad(90);
      scene.add(clone);
    }
    for (let i = 0; i < 24; i++) {
      let clone = fenceMiddle.clone();
      clone.position.x = -27;
      clone.position.z = i * 2.5 - 26.75;
      clone.rotation.y = THREE.Math.degToRad(90);
      scene.add(clone);
    }
  });
};

const loadObjMtl = (name, callback) => {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath("../models/");
  mtlLoader.setPath("../models/");
  mtlLoader.load(name + ".mtl", function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("../models/" + name + ".obj", callback);
  });
};

const loadAndPlaceMultiple = (scene, object, scale, positions) => {
  object.geometry.scale(scale, scale, scale);
  object.castShadow = true;
  positions.forEach(position => {
    let clone = object.clone();
    clone.position.x = position[0];
    clone.position.z = position[1];
    scene.add(clone);
  });
};

const getRandomPosition = () => {
  console.log("A");
  return [Math.random() * 50 - 25, Math.random() * 50 - 25];
};

const createTrees = scene => {
  loadObjMtl("Oak_Tree", object => {
    loadAndPlaceMultiple(scene, object.children[0], 2, [[-27, -8], [-15, 27], [8, 26], [24, 3]]);
  });
  loadObjMtl("Poplar_Tree", object => {
    loadAndPlaceMultiple(scene, object.children[0], 2, [[-28, -28], [-28, 28], [28, 28], [28, -28]]);
  });
  loadObjMtl("Carrot", object => {
    object.children[0].position.y = -0.5;
    let positions = [...new Array(100)];
    positions = positions.map(getRandomPosition);

    console.log(positions);
    loadAndPlaceMultiple(scene, object.children[0], 0.5, positions);
  });
};

const createPlane = scene => {
  loadObjMtl("Plane", object => {
    object.scale.x = 0.01;
    object.scale.z = 0.01;
    object.scale.y = 0.01;
    object.position.y = 10;
    object.position.z = 50;
    object.rotation.y = THREE.Math.degToRad(-90);
    object.rotation.z = THREE.Math.degToRad(-30);
    setFlyingAroundAnimation(object);
    scene.add(object);
  });
};
export const createLinks = scene => {
  let fontLoader = new THREE.FontLoader();
  fontLoader.load("../node_modules/three/examples/fonts/helvetiker_regular.typeface.json", function(font) {
    createLinkGroup(scene, font, "Bergsoft.pl", [20, 2, 20]);
    createLinkGroup(scene, font, "Google.com", [-20, 2, 20]);
    createLinkGroup(scene, font, "Onet.pl", [20, 2, -20]);
    createLinkGroup(scene, font, "E-mail", [-20, 2, -20]);
  });
  createTrees(scene);
  createFence(scene);
  createPlane(scene);
};
