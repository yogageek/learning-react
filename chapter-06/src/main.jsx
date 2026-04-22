import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// 這個檔案是整個 React 程式的入口。
// 它先找到 index.html 裡的 root 節點，再把最上層的 App 元件掛上去。
// 可以把它想成「React 畫面開始運作的起點」。
