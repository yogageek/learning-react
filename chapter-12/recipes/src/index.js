/**
 * 檔案角色：客戶端入口 (Client Entry)
 * 在同構渲染中的作用：瀏覽器端的「接棒者」，負責將伺服器傳回的靜態 HTML 
 * 透過 ReactDOM.hydrate() 進行注水（Hydration），使其具備互動功能。
 * 
 * 執行順序：在請求階段 (Request Phase) 的「注水 (Hydration)」步驟中執行。
 * 瀏覽器執行編譯後的客戶端 JS，React 對比 DOM 並掛載事件監聽器，使頁面變回動態。
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Menu } from "./Menu";


const data = [
  {
    name: "Baked Salmon",
    ingredients: [
      {
        name: "Salmon",
        amount: 1,
        measurement: "l lb"
      },
      {
        name: "Pine Nuts",
        amount: 1,
        measurement: "cup"
      },
      {
        name: "Butter Lettuce",
        amount: 2,
        measurement: "cups"
      },
      {
        name: "Yellow Squash",
        amount: 1,
        measurement: "med"
      },
      {
        name: "Olive Oil",
        amount: 0.5,
        measurement: "cup"
      },
      {
        name: "Garlic",
        amount: 3,
        measurement: "cloves"
      }
    ],
    steps: [
      "Preheat the oven to 350 degrees.",
      "Spread the olive oil around a glass baking dish.",
      "Add the yellow squash and place in the oven for 30 mins.",
      "Add the salmon, garlic, and pine nuts to the dish.",
      "Bake for 15 minutes.",
      "Remove from oven. Add the lettuce and serve."
    ]
  },
  {
    name: "Fish Tacos",
    ingredients: [
      {
        name: "Whitefish",
        amount: 1,
        measurement: "l lb"
      },
      {
        name: "Cheese",
        amount: 1,
        measurement: "cup"
      },
      {
        name: "Iceberg Lettuce",
        amount: 2,
        measurement: "cups"
      },
      {
        name: "Tomatoes",
        amount: 2,
        measurement: "large"
      },
      {
        name: "Tortillas",
        amount: 3,
        measurement: "med"
      }
    ],
    steps: [
      "Cook the fish on the grill until hot.",
      "Place the fish on the 3 tortillas.",
      "Top them with lettuce, tomatoes, and cheese."
    ]
  }
];


ReactDOM.hydrate(//將動態js功能附加在(伺服器端先渲染好的)靜態html上
  <Menu
    recipes={data}
    title="Delicious Recipes"
  />,
  document.getElementById("root")
);

//注水 (Hydration)： 客戶端 JS 下載完畢並執行，進入 src/index.js。
//這裡呼叫了 ReactDOM.hydrate()。React 不會把剛剛伺服器畫好的 DOM 砍掉重練，
//而是去「巡視」現有的 DOM 樹，並把事件監聽器（例如 onClick、onChange）綁定上去。

