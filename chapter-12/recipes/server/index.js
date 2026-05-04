/**
 * 檔案角色：伺服器原始碼 (Server Source)
 * 在同構渲染中的作用：定義 SSR（伺服器端渲染）行為的原始邏輯，
 * 利用 ReactDOMServer.renderToString() 將組件轉為 HTML 字串。
 *
 * 執行順序：在請求階段 (Request Phase) 中，負責生成 HTML 片段並注入模板，發送回瀏覽器。
 * 註：開發時專注於編寫此檔案；實際啟動階段 (Startup Phase) 時，Node.js 執行的是編譯後的 server-build/index.js。
 */
import path from "path";
import fs from "fs";
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import { Menu } from "../src/Menu.js";

const PORT = process.env.PORT || 4000;
const app = express();

/**
 * 伺服器端渲染 (SSR) 流程說明：
 * 
 * 1. 靜態資源服務：
 *    當瀏覽器收到 HTML 後，仍需下載編譯後的 JS 與 CSS 來進行「注水 (Hydration)」。
 *    因此需將 build 資料夾設為靜態路徑。
 */
//Webpack 將 src/index.js 與所有 React 組件打包成瀏覽器看得懂的 JS 檔案（通常放在 build/ 資料夾下）。
app.use(express.static("./build")); //express伺服器會對外提供build資料夾，裡面會放預渲染的靜態html和動態js

app.get("/*", (req, res) => { //不論使用者造訪哪個網址，伺服器都會回傳預先渲染好的HTML內容。

  const appHtml = ReactDOMServer.renderToString( //Menu組件渲染成靜態HTML字串
    <Menu />
  );
  
  const indexFile = path.resolve(// 讀取react建構的 index.html 
    "./build/index.html"
  );


  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`  //將原本空的 <div id="root"></div> 替換成伺服器渲染出來的組件HTML字串。
      )
    );
  });
});

//此時使用者已經可以看到畫面（體驗極佳），但按鈕點了還沒有反應。
//下載資源： 瀏覽器解析 HTML 時，發現裡面有 <script> 標籤，於是回頭向伺服器下載客戶端的 JS 檔案。
//接著看src/index.js

app.listen(PORT, () =>
  console.log(
    `Server is listening on port ${PORT}`
  )
);
