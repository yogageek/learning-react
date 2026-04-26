import React, { useState } from "react";
import colorData from "./color-data.json";
import ColorList from "./ColorList.jsx";
// import StarRating5 from "./StarRating5.jsx";
import AddColorForm from "./AddColorForm.jsx";

// export default function App() {
//   const [colors] = useState(colorData);
//   return <ColorList colors={colors} />;
// }
// 這個檔案是最上層主元件。
// 它先把 color-data.json 當成初始資料放進 state，再把 colors 傳給 ColorList。
// 目前它的工作很單純，主要是準備資料並交給下一層元件顯示。

// export default function App5() {
//   return (
//     <StarRating5
//       style={{ backgroundColor: "lightblue" }}
//       onDoubleClick={e => alert("double click")}
//     />
//   );
// }

export default function App() {
  // 用 colorData 當作一開始的畫面資料。
  const [colors, setColors] = useState(colorData);

  const removeColor = id => {
    // 刪除 id 相同的那一筆，其餘保留。
    const newColors = colors.filter(color => color.id !== id);
    setColors(newColors);
  };

  const rateColor = (id, rating) => {
    // 找到指定顏色後，只更新它的 rating。
    const newColors = colors.map(color => 
      color.id === id ? { ...color, rating } : color // id 相同的話，就複製一筆新的資料並更新 rating，其他的話就照原本的回傳。
      // { ...color, rating } 會建立一個 新物件 
      // ...color — 展開運算子將 color 物件中的所有可列舉屬性複製到新物件中 
      // 新增一個名為 rating 的屬性，值為變數 rating 的內容
    );
    setColors(newColors);
  };

  return (
    <>
      <AddColorForm
        // 這裡之後會接真正的新增功能，現在先用 alert 佔位。
        onNewColor={(title, color) => alert(`TODO: Create ${title} - ${color}`)}
      />
      <ColorList
        // 把顏色清單交給 ColorList 顯示。
        colors={colors}
        // 把刪除和評分功能也一起傳下去。
        onRemoveColor={removeColor}
        onRateColor={rateColor}
      />
    </>
  );
}
