const collisionObservers = [];
const animationObservers = [];

const isNearby = (pos, x, z) => {
  const e = 2;
  return pos.x >= x - e && pos.x <= x + e && pos.z >= z - e && pos.z <= z + e;
};

const fadeAndRedirect = url => {
  window.location = url;
  document.getElementsByTagName("canvas")[0].style.opacity = 0.01;
};

export const setTeleportAnimation = (mesh, url) => {
  collisionObservers.push(position => {
    if (isNearby(position, mesh.position.x, mesh.position.z)) {
      fadeAndRedirect(url);
    }
  });
};

export const actBehaviours = (scene, camera) => {
  collisionObservers.forEach(e => {
    e(camera.position);
  });
  animationObservers.forEach(e => {
    e.animate();
  });
};

export const setRotationAnimation = mesh => {
  animationObservers.push({
    animate: () => {
      mesh.rotation.x += 0.03;
      mesh.rotation.y += 0.03;
    }
  });
};

export const setFlyingAroundAnimation = mesh => {
  let currentRadPosition = 0;
  const r = 50;
  let animation = {
    animate: () => {
      mesh.position.x = r * Math.cos(currentRadPosition);
      mesh.position.z = r * Math.sin(currentRadPosition);
      mesh.rotation.y = Math.PI - currentRadPosition;
      currentRadPosition += 0.003;
    }
  };
  animationObservers.push(animation);
};

export const setSlightBouncingAnimation = mesh => {
  let currentOffset = 0;
  let currentDirection = true;
  const speed = 0.02;
  const maxOffset = 0.5;
  const minOffset = -0.5;
  let animation = {
    animate: () => {
      const movement = currentDirection ? speed : -speed;
      mesh.position.y += movement;
      currentOffset += movement;
      if (currentOffset >= maxOffset) currentDirection = false;
      if (currentOffset <= minOffset) currentDirection = true;
    }
  };
  animationObservers.push(animation);
};
