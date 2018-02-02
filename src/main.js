import { createRenderer, createScene, createControls, loop } from "./scene";
import { createCamera } from "./cameras";

const create3d = sceneParameters => {
  let renderer = createRenderer();
  let camera = createCamera();
  let controls = createControls(camera);
  let scene = createScene(sceneParameters);
  loop(renderer, scene, camera, controls);
};

document.getElementById("execute").onclick = () => {
  const sceneParameters = {
    urls: []
  };
  Array.from(document.getElementsByClassName("url-provider")).forEach(e => {
    sceneParameters.urls.push({
      url: e.getElementsByClassName("path")[0].value,
      title: e.getElementsByClassName("title")[0].value
    });
  });

  document.getElementById("container").hidden = true;
  create3d(sceneParameters);
};

document.getElementById("fillExample").onclick = () => {
  const exampleParams = {
    urls: [
      {
        title: "Google",
        url: "http://www.google.com"
      },
      {
        title: "Facebook",
        url: "http://www.facebook.com"
      },
      {
        title: "Poczta",
        url: "http://poczta.onet.pl"
      },
      {
        title: "BergSoft",
        url: "http://www.bergsoft.pl"
      }
    ]
  };
  Array.from(document.getElementsByClassName("url-provider")).forEach((e, i) => {
    e.getElementsByClassName("path")[0].value = exampleParams.urls[i].url;
    e.getElementsByClassName("title")[0].value = exampleParams.urls[i].title;
  });
};
