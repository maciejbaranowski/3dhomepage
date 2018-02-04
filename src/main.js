import React from "react";
import ReactDOM from "react-dom";

import { create3d } from "./scene";
import { InputForm } from "./inputform";

const urlParams = new URLSearchParams(location.search);
if (urlParams.has("scene")) {
  create3d(JSON.parse(urlParams.get("scene")));
} else {
  ReactDOM.render(<InputForm />, document.getElementById("container"));
}
