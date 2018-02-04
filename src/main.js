import React from "react";
import ReactDOM from "react-dom";

import { create3d } from "./scene";
import { InputForm } from "./inputform";

Object.assign(document.body.style, {
  background: 'url("./textures/background.jpg")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundOpacity: 0.5,
  fontFamily: "Open Sans"
});
const urlParams = new URLSearchParams(location.search);
if (urlParams.has("scene")) {
  create3d(JSON.parse(urlParams.get("scene")));
} else {
  ReactDOM.render(<InputForm />, document.getElementById("container"));
}
