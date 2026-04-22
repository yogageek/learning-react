import React, { useState } from "react";
import Star from "./Star.jsx";
import { createArray } from "./lib";



export default function StarRating5({ style = {}, totalStars = 5, ...props }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    // 這裡的 `style` 和 `...props` 是為了讓外部可以傳入自訂的樣式和事件，例如背景色、雙擊事件等等。
    <div style={{ padding: 5, ...style }} {...props}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
}

// selected={selectedStars > i}
// 如果目前已選星數 selectedStars 大於目前這顆星的索引 i，這顆星就算「已選取」。
// 例如選了 3 顆星時，索引 0、1、2 都會是 true，所以會亮起來。

// setSelectedStars(i + 1) 是把目前選到的星數更新成「第幾顆星」。
// 因為 i 是從 0 開始算索引，但星星數量是從 1 開始算，所以要 +1。
// 這裡用箭頭函式是為了「先包住一個動作」，等你真的點星星時才執行

// 以你現在的 [StarRating5.jsx](d:/vibecode/learning-react/learning-react/chapter-06/src/StarRating5.jsx) 來看：

// **1. 變成可互動元件**
// 在第 10 到 14 行附近：

// ```jsx
// <Star
//   key={i}
//   selected={selectedStars > i}
//   onSelect={() => setSelectedStars(i + 1)}
// />
// ```

// 重點是：
// - `onSelect={...}` 把點擊行為傳給 `Star`
// - `() => setSelectedStars(i + 1)` 是箭頭函式
// - 意思是「點第幾顆星，就把分數設成幾顆」

// 也就是互動的核心在這裡。

// **2. 把狀態收進元件內部**
// 在第 7 行附近：

// ```jsx
// const [selectedStars, setSelectedStars] = useState(0);
// ```

// 語法意思：
// - `useState(0)` 建立 state，初始值是 `0`
// - `selectedStars` 是目前狀態值
// - `setSelectedStars` 是更新這個值的函式

// 白話就是：
// - `selectedStars` = 現在選了幾顆星
// - `setSelectedStars(...)` = 改分數的方法

// 這一行就是它從「純顯示」進化成「自己會記住狀態」的關鍵。

// **3. 元件更可重用**
// 在 function 參數這行：

// ```jsx
// export default function StarRating5({ style = {}, totalStars = 5, ...props }) {
// ```

// 這裡有三個點：

// - `style = {}`  
//   代表如果外面沒傳 `style`，預設就是空物件

// - `totalStars = 5`  
//   代表如果外面沒傳總星數，預設是 5 顆

// - `...props`  
//   代表把其他剩下的 props 全部收集起來

// 例如你在 [App.jsx](d:/vibecode/learning-react/learning-react/chapter-06/src/App.jsx) 傳：

// ```jsx
// <StarRating5
//   style={{ backgroundColor: "lightblue" }}
//   onDoubleClick={e => alert("double click")}
// />
// ```

// 那：
// - `style` 會進 `style`
// - `onDoubleClick` 不在前面明寫，就會進 `...props`

// **4. 把外部傳進來的設定套到畫面上**
// 在第 9 行附近：

// ```jsx
// <div style={{ padding: 5, ...style }} {...props}>
// ```

// 這行很重要。

// - `style={{ padding: 5, ...style }}`
//   意思是先給預設 `padding: 5`
//   再把外面傳進來的 `style` 合進去

// - `{...props}`
//   意思是把其他 props 全部掛到這個 `<div>` 上

// 例如外面傳：
// ```jsx
// onDoubleClick={...}
// ```

// 最後就會變成這個 `<div>` 有 `onDoubleClick` 事件。

// **5. 顯示目前狀態**
// 在第 16 到 18 行附近：

// ```jsx
// <p>
//   {selectedStars} of {totalStars} stars
// </p>
// ```

// 這裡是 JSX 裡插入 JavaScript 值：
// - `{selectedStars}` 會顯示目前選到幾顆
// - `{totalStars}` 會顯示總共有幾顆

// 所以點星星後，這段文字會跟著更新。

// ---

// **一句話對照**
// - `useState(0)`：讓元件有自己的記憶
// - `onSelect={() => setSelectedStars(i + 1)}`：讓點擊能改變記憶
// - `{ style = {}, totalStars = 5, ...props }`：讓元件更彈性、更好重用
// - `<div style={{ padding: 5, ...style }} {...props}>`：把外部設定真正套用進來




// 重點差在：`StarRating.jsx` 只是「顯示結果」，`StarRating5.jsx` 已經變成「可互動元件」。

// **`StarRating.jsx`**
// - 接收 `selectedStars` 當 props
// - 自己不管理 state
// - 只能顯示幾顆星亮
// - 比較像展示元件

// **`StarRating5.jsx`**
// - 自己用 `useState(0)` 管理 `selectedStars`
// - 點星星會更新 state
// - 可以即時互動評分
// - 還支援 `style` 和其餘 `props` 往外層 `<div>` 傳

// 所以後者的進化點是：

// 1. **從靜態顯示變成互動元件**  
// 原本只能看分數，後來可以自己點星星改分數。

// 2. **把狀態收進元件內部**  
// 原本分數要靠外面傳進來；後來元件自己就能記住目前選到幾顆星，使用更方便。

// 3. **元件更可重用**  
// `style = {}` 和 `...props` 讓外部可以傳背景色、事件、className 之類的東西，不用每次都改元件本體。

// 4. **更接近真正 UI 元件**  
// 它不只是 render 畫面，而是自己處理使用者互動，這才是 React 裡常見的元件演進方向。

// 一句話總結：

// - `StarRating.jsx`：顯示型元件
// - `StarRating5.jsx`：互動型元件

// 如果再講更白話：
// 前者像「分數看板」，後者像「可點選評分器」。

// 如果你要，我可以再幫你直接逐行對照兩個檔案，指出哪幾行就是進化的關鍵。