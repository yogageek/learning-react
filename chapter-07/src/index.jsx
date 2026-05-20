import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import App2 from "./App2.jsx";
import App3 from "./App3.jsx";
import App4 from "./App4.jsx";
import App5 from "./App5.jsx";
import Uselayout from "./Uselayout.jsx";
import UseLayout2 from "./UseLayout2.jsx";
import UseReducder from "./UseReducder.jsx";
import UseReducerWinState from "./UseReducerWinState.jsx";
import Cat from "./Cat.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App />
    <App2 />
    <App3 />
    <App4 />
    <App5 />
    <Uselayout />
    <UseLayout2 /> 
    <UseReducder />
    <UseReducerWinState /> */}
    <Cat />
  </StrictMode>
);