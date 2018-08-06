import * as THREE from "three";
import {floorMaterial, redShinyMaterial, skyMaterials, textMaterial, woodenFenceMaterial} from "./materials";
import {setSlightBouncingAnimation, setRotationAnimation, setFlyingAroundAnimation, setTeleportAnimation, setBunnyMovementAnimation} from "./behaviours";
import * as THREEOBJ from "./OBJLoader";
import * as THREEMTL from "./MTLLoader";

export class ObjectsCreator {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
  }
  createFloor = scene => {
    let geometry = new THREE.PlaneGeometry(60, 60);
    let mesh = new THREE.Mesh(geometry, floorMaterial);
    mesh.rotation.x = THREE
      .Math
      .degToRad(-90);
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  };

  createSky = scene => {
    let geometry = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1);
    geometry.position = {
      x: -500,
      y: -500,
      z: -500
    };
    geometry.scale(-1, 1, 1);
    let mesh = new THREE.Mesh(geometry, skyMaterials);
    scene.add(mesh);
    return mesh;
  };

  createIndicatorBox = (scene, position) => {
    var geometry = new THREE.IcosahedronGeometry(0.8);
    var mesh = new THREE.Mesh(geometry, redShinyMaterial);
    mesh
      .position
      .set(position[0], position[1], position[2]);
    setRotationAnimation(mesh);
    scene.add(mesh);
    return mesh;
  };

  createLinkText = (scene, font, text) => {
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

  createLinkGroup = (scene, font, text, url, position) => {
    let group = new THREE.Object3D();
    let box = this.createIndicatorBox(group, [0, 3, 0]);
    let linkText = this.createLinkText(group, font, text);
    group
      .position
      .set(...position);
    group.lookAt(0, 0, 0);
    setTeleportAnimation(group, url);
    scene.add(group);
    return group;
  };

  createFence = scene => {
    var objLoader = new THREE.OBJLoader(this.loadingManager);
    objLoader.load("./models/Picket Fence.obj", object => {
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
        clone.rotation.y = THREE
          .Math
          .degToRad(90);
        scene.add(clone);
      }
      for (let i = 0; i < 24; i++) {
        let clone = fenceMiddle.clone();
        clone.position.x = -27;
        clone.position.z = i * 2.5 - 26.75;
        clone.rotation.y = THREE
          .Math
          .degToRad(90);
        scene.add(clone);
      }
    });
  };

  loadObjMtl = (name, callback) => {
    var mtlLoader = new THREE.MTLLoader(this.loadingManager);
    mtlLoader.setTexturePath("./models/");
    mtlLoader.setPath("./models/");
    mtlLoader.load(name + ".mtl", (materials) => {
      materials.preload();
      var objLoader = new THREE.OBJLoader(this.loadingManager);
      objLoader.setMaterials(materials);
      objLoader.load("./models/" + name + ".obj", callback);
    });
  };

  loadAndPlaceMultiple = (scene, object, scale, positions) => {
    object
      .geometry
      .scale(scale, scale, scale);
    object.castShadow = true;
    positions.forEach(position => {
      let clone = object.clone();
      clone.position.x = position[0];
      clone.position.z = position[1];
      scene.add(clone);
    });
  };

  getRandomPosition = () => {
    return [
      Math.random() * 50 - 25,
      Math.random() * 50 - 25
    ];
  };

  createTrees = scene => {
    this.loadObjMtl("Oak_Tree", object => {
      this.loadAndPlaceMultiple(scene, object.children[0], 2, [
        [
          -27, -8
        ],
        [
          -15, 27
        ],
        [
          8, 26
        ],
        [24, 3]
      ]);
    });
    this.loadObjMtl("Poplar_Tree", object => {
      this.loadAndPlaceMultiple(scene, object.children[0], 2, [
        [
          -28, -28
        ],
        [
          -28, 28
        ],
        [
          28, 28
        ],
        [28, -28]
      ]);
    });
    this.loadObjMtl("Carrot", object => {
      object.children[0].position.y = -0.5;
      let positions = [...new Array(100)];
      positions = positions.map(this.getRandomPosition);
      this.loadAndPlaceMultiple(scene, object.children[0], 0.5, positions);
    });
    this.loadObjMtl("Rabbit", object => {
      let rabbit = object.children[0];
      rabbit.position.y = -0.05;
      rabbit.castShadow = true;
      scene.add(rabbit);
      setBunnyMovementAnimation(rabbit);
    });
  };

  createPlane = scene => {
    this.loadObjMtl("Plane", object => {
      object.scale.x = 0.01;
      object.scale.z = 0.01;
      object.scale.y = 0.01;
      object.position.y = 10;
      object.position.z = 50;
      object.rotation.y = THREE
        .Math
        .degToRad(-90);
      object.rotation.z = THREE
        .Math
        .degToRad(-30);
        setFlyingAroundAnimation(object);
      scene.add(object);
    });
  };
  createLinks = (scene, urls) => {
    let fontLoader = new THREE.FontLoader(this.loadingManager);
    fontLoader.load("./textures/Open Sans_Regular.json", (font) => {
      const numberOfUrls = urls.length;
      const angleInterval = 360 / numberOfUrls;
      urls.forEach((url, i) => {
        this.createLinkGroup(scene, font, url.title, url.url, [
          Math.sin(THREE.Math.degToRad(i * angleInterval)) * 25,
          2,
          Math.cos(THREE.Math.degToRad(i * angleInterval)) * 25
        ]);
      });
    });
    this.createTrees(scene);
    this.createFence(scene);
    this.createPlane(scene);
  };
}
