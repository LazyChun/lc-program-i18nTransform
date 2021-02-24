import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import config from "./lazychun";
import { getConfig } from "./libs/config";
import serverStore from "./libs/mockServerStore";

window.config = config;
window.serverStore = window.serverStore || serverStore;
window.programConfig = getConfig();
ReactDom.render(<App />, document.getElementById("__$program_code$__"));
