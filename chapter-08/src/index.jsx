import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import Storage from "./Storage.jsx";
import RenderProps from "./RenderProps.jsx";
import VirtualizationWindowing from "./VirtualizationWindowing.jsx";


const rootElement = document.getElementById("root");

createRoot(rootElement).render(
<StrictMode>
  <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
    <div style={{ flex: 1 }}>
      <RenderProps />
      <Storage />
      <App />
    </div>

    <div style={{ flex: 1 }}>
      <VirtualizationWindowing />
    </div>
  </div>
</StrictMode>
);



/*
index.jsx -- 進入點

createRoot(rootElement).render(
  React.createElement(StrictMode, null, React.createElement(App))
);

把 App 掛進 DOM，StrictMode 包住整個應用，開發時會額外檢查問題。
*/
