import React from "react";
import { createArray } from "./lib";
import Star from "./Star.jsx";

export default function StarRating({ totalStars = 5, selectedStars = 0 }) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star key={i} selected={selectedStars > i} />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
// 這個元件負責顯示整體星等。
// 它會先依照 totalStars 建立固定數量的星星，再用 selectedStars 判斷哪些星星要亮起來。
// 最後下面的文字會一起顯示目前是幾顆星，例如 3 of 5 stars。
