import React from "react";
import StarRating from "./StarRating.jsx";

export default function Color({ title, color, rating }) {
  return (
    <section>
      <h1>{title}</h1>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating selectedStars={rating} />
    </section>
  );
}
// 這個元件負責顯示單一顏色的內容。
// 它會顯示顏色標題、色塊，並把 rating 傳給 StarRating 去顯示星等。
// 可以把它看成一張顏色資訊卡片。
