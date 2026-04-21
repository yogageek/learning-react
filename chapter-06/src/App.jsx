import React, { useState } from "react";
import colorData from "./color-data.json";
import ColorList from "./ColorList.jsx";

export default function App() {
  const [colors] = useState(colorData);
  return <ColorList colors={colors} />;
}
// 這個檔案是最上層主元件。
// 它先把 color-data.json 當成初始資料放進 state，再把 colors 傳給 ColorList。
// 目前它的工作很單純，主要是準備資料並交給下一層元件顯示。
