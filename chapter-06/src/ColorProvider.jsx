import React, { createContext, useState, useContext } from "react";
import colorData from "./color-data.json"; // 預設顏色資料，作為初始 state
// eslint-disable-next-line import/no-unresolved
import { v4 } from "uuid"; // 產生不重複的唯一 id

// =============================================
// 1. 建立 Context
//    Context 是 React 的「全域資料容器」
//    讓任意層級的子元件都能直接取用資料，不需要一層一層傳 props
// =============================================
const ColorContext = createContext();

// =============================================
// 2. 自訂 Hook：useColors
//    把 useContext(ColorContext) 包一層，
//    讓子元件不用知道 Context 叫什麼名字，
//    直接呼叫 useColors() 就能拿到所有資料和方法
// =============================================
export const useColors = () => useContext(ColorContext);

// =============================================
// 3. ColorProvider 元件
//    這是整個顏色功能的「資料中心」，
//    必須包在最外層，裡面的子元件才能透過 useColors() 取用資料
//    { children } 代表被它包住的所有子元件
// =============================================
export default function ColorProvider({ children }) {

  // colors：當前的顏色清單（陣列）
  // setColors：更新清單的方法
  // 初始值來自 color-data.json
  const [colors, setColors] = useState(colorData);

  // =============================================
  // 新增顏色
  // 用展開運算子 ...colors 保留舊資料，
  // 再把新顏色物件附加到陣列最後面
  // =============================================
  const addColor = (title, color) =>
    setColors([
      ...colors,       // 保留所有舊顏色
      {
        id: v4(),      // 用 uuid 產生唯一 id，避免 id 重複
        rating: 0,     // 新顏色預設評分為 0
        title,         // 顏色名稱（來自表單輸入）
        color          // 顏色值，例如 #ff0000（來自表單輸入）
      }
    ]);

  // =============================================
  // 修改評分
  // 用 map 遍歷整個陣列，
  // 找到 id 相符的那筆就替換 rating，
  // 其餘資料用 ...color 原封不動保留
  // =============================================
  const rateColor = (id, rating) =>
    setColors(
      colors.map(color =>
        color.id === id
          ? { ...color, rating } // ← 命中：更新 rating
          : color                // ← 未命中：原樣保留
      )
    );

  // =============================================
  // 刪除顏色
  // 用 filter 過濾掉 id 相符的那筆，
  // 剩下的資料組成新陣列存回 state
  // =============================================
  const removeColor = id =>
    setColors(colors.filter(color => color.id !== id));

  // =============================================
  // Provider 把資料和三個操作方法打包成 value，
  // 傳遞給所有被包住的子元件，
  // 子元件透過 useColors() 就能解構取用
  // =============================================
  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
}

// import React, { createContext, useState, useContext } from "react";
// // 載入預設的顏色資料，作為一開始的 state
// import colorData from "./color-data.json";
// // eslint-disable-next-line import/no-unresolved
// import { v4 } from "uuid";// 載入 uuid 的 v4 函式，用來產生唯一 id

// // 建立一個 Context，之後用來共享顏色資料與操作方法
// const ColorContext = createContext();

// // 自訂 Hook，讓其他元件可以更方便取得 ColorContext 內容
// export const useColors = () => useContext(ColorContext);

// // ColorProvider 負責提供顏色資料給被它包住的子元件
// export default function ColorProvider({ children }) {
//   // colors: 目前的顏色清單
//   // setColors: 更新顏色清單的方法
//   // 初始值來自 color-data.json
//   const [colors, setColors] = useState(colorData);

//   // 新增顏色
//   // 傳入 title 和 color，建立一筆新的顏色資料加到陣列最後面
//   const addColor = (title, color) =>
//     setColors([
//       ...colors,
//       {
//         id: v4(), // 自動產生唯一 id
//         rating: 0, // 新增顏色時，預設評分為 0
//         title, // 顏色名稱
//         color // 顏色值
//       }
//     ]);

//   // 修改指定顏色的評分
//   // 找到 id 相同的那筆資料後，只更新 rating，其餘資料保持不變
//   const rateColor = (id, rating) =>
//     setColors(
//       colors.map(color => (color.id === id ? { ...color, rating } : color))
//     );

//   // 刪除指定 id 的顏色
//   // filter 會保留不符合 id 的資料，相同 id 的那筆就會被移除
//   const removeColor = id => setColors(colors.filter(color => color.id !== id));

//   return (
//     // Provider 把 colors 與相關操作方法提供給所有子元件使用
//     <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
//       {children}
//     </ColorContext.Provider>
//   );
// }
