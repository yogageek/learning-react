import React from "react";
import Color from "./Color.jsx";
import { useColors } from "./ColorProvider.jsx";
import { css } from "@emotion/css";

// export default function ColorList({ colors = [] }) {
//   if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

//   return (
//     <div>
//       {colors.map(color => (
//         <Color key={color.id} {...color} />
//       ))}
//     </div>
//   );
// }
// 這個元件負責顯示單一顏色的內容。
// 它會顯示顏色標題、色塊，並把 rating 傳給 StarRating 去顯示星等。
// 可以把它看成一張顏色資訊卡片。

// export default function ColorList({
//   colors = [],// 預設 colors 是空陣列，這樣如果沒有傳 colors 進來的話，就不會出錯。
//   onRemoveColor = f => f,
//   onRateColor = f => f
// }) {
//   if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

//   return (
//     <div>
//       {colors.map(color => ( //陣列丟進去，回傳新陣列
//         <Color
//         // 把 color 物件中的欄位直接拆開傳給 Color。
//           key={color.id}
//           {...color}// 這裡的 ...color 是展開運算子，會把 color 物件中的欄位直接拆開傳給 Color，例如 id={color.id} title={color.title} color={color.color} rating={color.rating}。
//           // 這兩個函式提供給每張顏色卡片使用。
//           onRemove={onRemoveColor}
//           onRate={onRateColor}
//         />
//       ))}
//     </div>
//   );
// }

// ColorList 元件：負責把所有顏色清單渲染出來
export default function ColorList() {
  // 從 Context 取得 colors 陣列
  const { colors } = useColors();

  // colors 為空時，顯示提示訊息，不渲染列表
  if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

  // 使用 emotion 動態產生 css：flex 排列，允許換行
  return (
    <div className={css`
      display: flex;
      flex-wrap: wrap;
    `}>
      {/* 將 colors 陣列逐筆展開成 Color 元件，key 使用唯一的 id */}
      {colors.map(color => (
        <Color key={color.id} {...color} />
      ))}
    </div>
  );
}