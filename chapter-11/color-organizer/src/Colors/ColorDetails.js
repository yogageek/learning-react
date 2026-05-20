/**
 * ColorDetails 組件：負責顯示單一顏色的詳細資訊頁面。
 * 當使用者點擊特定顏色進入動態路由時（例如 /some-id），此組件會被渲染。
 */
import React from "react";
import { useColors } from "./";
import { useParams } from "react-router-dom";

export function ColorDetails() {
  // 1. 從 URL 中獲取動態參數 'id' (對應 Route path=":id")
  let { id } = useParams();
  
  // 2. 從自定義 Hook useColors 獲取目前的顏色清單
  let { colors } = useColors();

  // 3. 根據 URL 的 id，從陣列中找出匹配的顏色物件
  let foundColor = colors.find(
    color => color.id === id
  );

  // 如果找不到顏色（例如 ID 錯誤），可在此處進行錯誤處理或顯示找不到頁面
  if (!foundColor) {
    return <h1>找不到該顏色的詳細資訊</h1>;
  }

  return (
    <div>
      {/* 顯示該顏色的色塊縮圖 */}
      <div
        style={{
          backgroundColor: foundColor.color,
          height: 100,
          width: 100
        }}
      ></div>
      {/* 顯示顏色標題與色碼 */}
      <h1>{foundColor.title}</h1>
      <h1>{foundColor.color}</h1>
    </div>
  );
}
