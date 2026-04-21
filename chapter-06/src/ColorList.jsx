import React from "react";
import Color from "./Color.jsx";

export default function ColorList({ colors = [] }) {
  if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

  return (
    <div>
      {colors.map(color => (
        <Color key={color.id} {...color} />
      ))}
    </div>
  );
}
// 這個元件負責顯示顏色清單。
// 如果沒有任何 colors 資料，就顯示提示訊息。
// 如果有資料，就用 map 把每一筆顏色資料轉成一個 Color 元件。
