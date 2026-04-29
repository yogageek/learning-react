import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);



/*
index.jsx -- 進入點

createRoot(rootElement).render(
  React.createElement(StrictMode, null, React.createElement(App))
);

把 App 掛進 DOM，StrictMode 包住整個應用，開發時會額外檢查問題。
*/
