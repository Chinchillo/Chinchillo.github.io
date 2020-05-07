//import "bootstrap/dist/css/bootstrap.min.css"

import React from "react";
import ReactDOM from "react-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";

import App from "./containers/App";

const rootNode = document.getElementById("root");
ReactDOM.render(<App />, rootNode);
