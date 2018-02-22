import React from "react";
import ReactDOM from "react-dom";

import { create3d } from "./scene";
import { App } from "./inputform/app";

const urlParams = new URLSearchParams(location.search);
if (urlParams.has("scene")) {
  create3d(JSON.parse(urlParams.get("scene")));
} else {
  ReactDOM.render(<App />, document.getElementById("container"));
}
