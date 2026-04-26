import React from "react";
import { createRoot } from "react-dom/client";
import ColorProvider from "./ColorProvider.jsx";
import App from "./App.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ColorProvider>
    <App />
  </ColorProvider>
);






// App 被包在 ColorProvider 裡，所以 App 以及它底下的元件，都可以透過 context 取得顏色資料與操作函式。


// 原本它的啟動鏈是：
// index.html -> main.jsx -> App.jsx
// 如果 index.html 沒有改成載入 src/index.jsx，那這個檔案就不會自動執行。你這個專案目前指向的是 main.jsx