import React from "react";
import { render } from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

//router只使用一次 配置在樹的頂端

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
