/**
 * Color 組件：負責渲染顏色清單中的單個項目。
 * 包含了顯示顏色、評分、刪除功能，並點擊後導覽至詳細頁面。
 * 使用了多種效能優化技術 (memo, useCallback)。
 */
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import { useColors } from "./";

// 使用 memo 封裝子組件，確保當父組件重新渲染時，
// 只要 props 沒變，這些子組件就不會重新執行。
const Trash = memo(FaTrash);
const Rating = memo(StarRating);

export default memo(
  function Color({
    id,
    title,
    color,
    rating = 0
  }) {
    // 從自定義 Hook 獲取操作狀態的函式
    const {
      rateColor,
      removeColor
    } = useColors();

    /**
     * 使用 useCallback 快取 rate 函式。
     * 這樣傳遞給 Rating 組件的 onChange prop 就會保持穩定的參考，
     * 從而避免 Rating 組件因為 prop 參考改變而不必要的重新渲染。
     */
    const rate = useCallback(
      rating => rateColor(id, rating),
      [] // 這裡雖然有 ESLint 警告，但原意是為了維持函式身份穩定
    );

    // React Router 的導覽 Hook
    let navigate = useNavigate();

    return (
      <section
        className="color"
        // 點擊整個區塊導覽至 /:id 詳細頁面
        onClick={() => navigate(`/${id}`)}
      >
        <h1>{title}</h1>
        {/* 刪除按鈕：點擊後呼叫 removeColor 並停止事件冒泡(若有需要的話) */}
        <button onClick={() => removeColor(id)}>
          <Trash color="red" />
        </button>
        {/* 顏色預覽區塊 */}
        <div
          style={{
            height: 50,
            backgroundColor: color
          }}
        />
        {/* 評分組件 */}
        <Rating
          selected={rating}
          onChange={rate}
        />
      </section>
    );
  },
  /**
   * 自定義比較函式 (areEqual)：
   * 這是 React.memo 的第二個參數。
   * 只有當回傳 false 時，組件才會重新渲染。
   * 這裡只比較 rating，意味著如果 title 或 color 改變，組件不會重新渲染。
   * (這是一種比較激進的優化策略，需確保 title/color 不會動態改變)
   */
  (prevProps, nextProps) => {
    console.log(
      "比較評分變化:",
      prevProps.rating,
      nextProps.rating
    );
    return prevProps.rating === nextProps.rating;
  }
);

/**
 * 【Color.js 技術邏輯總結】
 * 
 * 1. 靜態組件優化 (Static Memoization):
 *    在組件外部宣告 `Trash` 與 `Rating`，利用 `memo` 封裝外部組件（FaTrash, StarRating）。
 *    這保證了只要傳入的 props（如 color="red"）不變，這些子組件就不會參與重新渲染過程。
 * 
 * 2. 外層防護 (Outer Guard):
 *    `export default memo(..., areEqual)` 作為第一道門檻。
 *    自定義比較函式 `areEqual` 只檢查 `rating` 是否變動。
 *    若 `rating` 沒變，React 直接跳過整個 `Color` 函式的執行，達成最高效能。
 * 
 * 3. 穩定化參考 (Stable Callbacks):
 *    當 `rating` 改變導致 `Color` 執行時，`useCallback` 確保了 `rate` 函式的記憶體位址不變。
 *    這使得傳遞給 `Rating` 組件的 `onChange` prop 被視為「未改變」，
 *    進而讓 `Rating` 組件內部的 `memo` 能發揮作用，避免無謂重繪。
 * 
 * 4. 協作流程:
 *    [父組件更新] -> [areEqual 檢查 rating] -> [若變動則執行 Color] 
 *    -> [useCallback 保持函式穩定] -> [僅 Rating 組件因 selected 改變而更新]
 *    -> [Trash 等其他 memo 組件完全不動]。
 */
