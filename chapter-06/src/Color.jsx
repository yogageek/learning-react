import React from "react";
import StarRating from "./StarRating.jsx";
import { FaTrash } from "react-icons/fa";
import { useColors } from "./ColorProvider.jsx";
import { css } from "@emotion/css";

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

// export default function Color({
//   id,
//   title,
//   color,
//   rating,
//   onRemove = f => f,
//   onRate = f => f
// }) {
//   return (
//     <section>
//       <h1>{title}</h1>
//       {/* 按下垃圾桶按鈕時，刪除這張顏色卡片。 */}
//       <button onClick={() => onRemove(id)}>
//         <FaTrash />
//       </button>
//       <div style={{ height: 50, backgroundColor: color }} />
//       <StarRating
//         selectedStars={rating}
//         // 星數改變後，把目前這張卡片的 id 和分數一起送出去。
//         onRate={rating => onRate(id, rating)}// 因為 ColorList 傳下來的 onRateColor 是 rateColor(id, rating)，所以這裡要傳 id 和 rating 兩個參數過去。
//       />
//     </section>
//   );
// }

// Color 元件：顯示單一顏色卡片，包含標題、色塊、評分與刪除功能
export default function Color({ id, title, color, rating }) {
  // 從 Context 取得 rateColor（修改評分）和 removeColor（刪除顏色）
  const { rateColor, removeColor } = useColors();

  return (
    // 卡片容器：響應式寬度，螢幕越窄佔比越大，直到 500px 以下佔滿整行
    <section
      className={css`
        flex-basis: calc(25% - 2px - 0.5em);         /* 預設：4 欄 */
        @media screen and (max-width: 1200px) {
          flex-basis: calc(33.3334% - 2px - 0.5em);  /* 1200px 以下：3 欄 */
        }
        @media screen and (max-width: 800px) {
          flex-basis: calc(50% - 2px - 0.5em);        /* 800px 以下：2 欄 */
        }
        @media screen and (max-width: 500px) {
          flex-basis: calc(100% - 2px - 0.5em);       /* 500px 以下：1 欄 */
        }
        margin: 0.25em;
        border: 1px solid #ededed;
        h1 {
          margin: 0;
          text-align: center;
        }
      `}
    >
      {/* 標題區：相對定位，讓刪除按鈕可以絕對定位到右上角 */}
      <div className={css`position: relative;`}>
        <h1>{title}</h1>

        {/* 刪除按鈕：點擊後呼叫 removeColor，傳入此顏色的 id */}
        <button
          className={css`
            position: absolute;
            right: 0.25em;
            top: 0.25em;
            color: #c00;
          `}
          onClick={() => removeColor(id)}
        >
          <FaTrash />
        </button>
      </div>

      {/* 色塊：高度固定 50px，背景色為該顏色的 color 值 */}
      <div style={{ height: 50, backgroundColor: color }} />

      {/* 星星評分元件：顯示當前評分，點選後呼叫 rateColor 更新評分 */}
      <StarRating
        className={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.5em;
          p { margin: 0; }
        `}
        selectedStars={rating}
        onRate={rating => rateColor(id, rating)}
      />
    </section>
  );
}
