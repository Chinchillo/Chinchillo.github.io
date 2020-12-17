import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css'
import "../node_modules/react-vis/dist/style.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";

const rootNode = document.getElementById("root");
ReactDOM.render(<App />, rootNode);
