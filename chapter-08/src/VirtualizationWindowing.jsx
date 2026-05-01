import React from "react";
import { FixedSizeList } from "react-window";
import faker from "faker";

//vrtualization（虛擬化）和 windowing（視窗化）是同一個概念的兩種說法，

// [...Array(5000)] 先建立一個長度為 5000 的陣列，
// 再用 map 產生 5000 筆假資料。
const bigList = [...Array(5000)].map(() => ({
  // faker 用來建立假資料，這裡建立姓名、email、頭像。
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar()
}));

export default function VirtualizationWindowing() {
  // { index, style } 是 react-window 傳進來的參數：
  // index 代表目前要顯示第幾筆資料，
  // style 是每一列必須套用的定位與尺寸樣式。
  const renderRow = ({ index, style }) => (
    // ...style 是展開運算子，把 react-window 提供的樣式套進 div。
    // display: "flex" 則是額外補上的自訂樣式。
    <div style={{ ...style, ...{ display: "flex" } }}>
      <img
        src={bigList[index].avatar}
        alt={bigList[index].name}
        width={50}
      />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  );

  return (
    <FixedSizeList
      // 清單顯示區域的高度。
      height={window.innerHeight}
      // 清單顯示區域的寬度。
      width={window.innerWidth - 20}
      // 總共有多少筆資料。
      itemCount={bigList.length}
      // 每一列固定高度 50px，這也是 FixedSizeList 名稱的由來。
      itemSize={50}
    >
      {/* 把 renderRow 函式交給 FixedSizeList，讓它決定要顯示哪些列 */}
      {renderRow}
    </FixedSizeList>
  );
}
