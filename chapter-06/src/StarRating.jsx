import React from "react";
import { createArray } from "./lib";
import Star from "./Star.jsx";

// export default function StarRating({ totalStars = 5, selectedStars = 0 }) {
//   return (
//     <>
//       {createArray(totalStars).map((n, i) => (
//         <Star key={i} selected={selectedStars > i} />
//       ))}
//       <p>
//         {selectedStars} of {totalStars} stars
//       </p>
//     </>
//   );
// }
// 這個元件負責顯示整體星等。
// 它會先依照 totalStars 建立固定數量的星星，再用 selectedStars 判斷哪些星星要亮起來。
// 最後下面的文字會一起顯示目前是幾顆星，例如 3 of 5 stars。

// export default function StarRating({
//   totalStars = 5,
//   selectedStars = 0,
//   onRate = f => f // 預設 onRate 是一個空函式，這樣如果沒有傳 onRate 進來的話，就不會出錯。
// }) {
//   return (
//     <>
//       {createArray(totalStars).map((n, i) => (
//         <Star
//           key={i} 
//           selected={selectedStars > i} // 這裡的 selected 邏輯是：如果 selectedStars 大於目前的 index，就亮起來。
//           // 點到第幾顆星，就回傳對應的分數。
//           onSelect={() => onRate(i + 1)}// 因為 index 是從 0 開始的，所以要加 1 才會得到正確的分數。
//         />
//       ))}
//       <p>
//         {selectedStars} of {totalStars} stars
//       </p>
//     </>
//   );
// }

export default function StarRating({
  className = "",// 這裡的 className 是為了讓外部可以傳入自訂的 CSS 類別，預設是空字串。
  totalStars = 5,
  selectedStars = 0,
  onRate = f => f
}) {
  return (
    <div className={className}>
      <div>
        {createArray(totalStars).map((n, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
            onSelect={() => onRate(i + 1)}
          />
        ))}
      </div>
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
}