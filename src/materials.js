import * as THREE from "three";

const prepareTextureLoading = () => {
  let textureBuffer = document.createElement("canvas");
  textureBuffer.width = 128;
  textureBuffer.height = 128;
  let context = textureBuffer.getContext("2d");
  context.fillStyle = "rgb( 200, 200, 200 )";
  context.fillRect(0, 0, textureBuffer.width, textureBuffer.height);
  return textureBuffer;
};

const loadTexture = (path, textureBuffer) => {
  let texture = new THREE.Texture(textureBuffer);
  let material = new THREE.MeshBasicMaterial({ map: texture });
  let image = new Image();
  image.onload = function() {
    texture.image = this;
    texture.needsUpdate = true;
  };
  image.src = path;
  return material;
};

let textureBuffer = prepareTextureLoading();

const createFloorMaterial = textureBuffer => {
  let loader = new THREE.TextureLoader();
  let texture = loader.load("../textures/grass.jpg", function(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(30, 30);
  });
  return new THREE.MeshLambertMaterial({
    map: texture
  });
};

export const textMaterial = new THREE.MeshPhongMaterial({ color: 0xdd0000, shininess: 30 });
export const normalMaterial = new THREE.MeshNormalMaterial();
export const floorMaterial = createFloorMaterial(textureBuffer);
export const redShinyMaterial = new THREE.MeshStandardMaterial({
  color: 0xdd1111,
  roughness: 0.1,
  metalness: 0.6
});
export const woodenFenceMaterial = new THREE.MeshStandardMaterial({
  color: 0x745d23,
  roughness: 1,
  metalness: 0.1
});
export const skyMaterials = [
  loadTexture("../textures/px.jpg", textureBuffer), // right
  loadTexture("../textures/nx.jpg", textureBuffer), // left
  loadTexture("../textures/py.jpg", textureBuffer), // top
  loadTexture("../textures/ny.jpg", textureBuffer), // bottom
  loadTexture("../textures/pz.jpg", textureBuffer), // back
  loadTexture("../textures/nz.jpg", textureBuffer) // front
];
