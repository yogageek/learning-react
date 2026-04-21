import React from "react";
import { FaStar } from "react-icons/fa";

export default function Star({ selected = false, onSelect = f => f }) {
  return <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />;
}
// 這個元件代表一顆星星，使用 react-icons 提供的 FaStar 來顯示圖示。
// selected 用來決定這顆星星目前是亮的還是灰的。
// onSelect 是點擊時要執行的 callback，之後如果要做互動評分可以直接接上。
