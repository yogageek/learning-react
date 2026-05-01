import { useState, useCallback, useMemo } from "react";

// 這裡展示暫存值，實作記憶化memoization的用法

// useState 用來管理狀態。
// useCallback 用來記住函式。
// useMemo 用來記住計算結果。

// export const：宣告並匯出這個常數，其他檔案可 import 使用。
// 因為函式名稱以 use 開頭，而且內部用了 React Hook，所以這就是自訂 Hook。

export const useIterator = (items = [], initialValue = 0) => {
  const [i, setIndex] = useState(initialValue);

  // useCallback() 讓你可以記住一個函式，直到它的依賴改變才重新創建。
  // 這裡的 prev 和 next 函式會根據當前索引 i 來更新索引，實現循環切換。

  const prev = useCallback(() => {  // useCallback(fn, deps)：React 會在依賴沒變時，重用同一個函式參考
    if (i === 0) return setIndex(items.length - 1);//如果目前已經在第 0 個，就跳到最後一個。否則索引減 1
    setIndex(i - 1);
  }, [i]);  //[i]：依賴陣列，表示 i 變了才重新建立 prev

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);//如果目前在最後一個，就回到第 0 個。否則索引加 1
    setIndex(i + 1);
  }, [i]);

  // 這表示把 items[i] 的計算結果記住。只有 i 改變時才重新計算
  const item = useMemo(() => items[i], [i]);

  return [item || items[0], prev, next];
  // 這是回傳陣列，讓外部可以用陣列解構接值，例如：
  // const [item, prev, next] = useIterator(data);
  // 意思是回傳：
  // item || items[0]：目前項目，如果 item 是 falsy，就退回 items[0]
  // prev：上一個函式
  // next：下一個函式

};


// 這支 Hook 的核心概念

// 用 useState 記錄目前索引。
// 用 useCallback 包住 prev / next。
// 用 useMemo 算出目前項目。
// 回傳 [目前項目, 上一個函式, 下一個函式]，讓元件可直接使用。

