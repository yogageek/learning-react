import React from "react";
import StarRating from "./StarRating.jsx";
import { FaTrash } from "react-icons/fa";

// export default function Color({ title, color, rating }) {
//   return (
//     <section>
//       <h1>{title}</h1>
//       <div style={{ height: 50, backgroundColor: color }} />
//       <StarRating selectedStars={rating} />
//     </section>
//   );
// }
// 這個元件負責顯示單一顏色的內容。
// 它會顯示顏色標題、色塊，並把 rating 傳給 StarRating 去顯示星等。
// 可以把它看成一張顏色資訊卡片。
export default function Color({
  id,
  title,
  color,
  rating,
  onRemove = f => f,
  onRate = f => f
}) {
  return (
    <section>
      <h1>{title}</h1>
      {/* 按下垃圾桶按鈕時，刪除這張顏色卡片。 */}
      <button onClick={() => onRemove(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={rating}
        // 星數改變後，把目前這張卡片的 id 和分數一起送出去。
        onRate={rating => onRate(id, rating)}// 因為 ColorList 傳下來的 onRateColor 是 rateColor(id, rating)，所以這裡要傳 id 和 rating 兩個參數過去。
      />
    </section>
  );
}
