import React, { useEffect, useState,useCallback } from "react";

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);
};

function WordCount({ children = "" }) {
  useAnyKeyToRender();

//   const fn = () => {
//     console.log("hello");
//     console.log("world");
//   };
//   fn 在 render 函式內宣告 → 每次 render 都產生新的函式物件 → 參考永遠不同 → effect 每次都跑。
// 按任意鍵就會不斷印出

  const fn = useCallback(() => {
    console.log("hello");
    console.log("world");
  }, []);// 沒有外部依賴，只建立一次
// useCallback 讓 fn 的參考在 re-render 之間保持不變 → [fn] 比較結果相同 → effect 不重跑。
// useCallback(fn, deps) 本質上就是 useMemo(() => fn, deps)，只是語意更明確。

  useEffect(() => {
    console.log("fresh render");
    fn();
  }, [fn]);

  return <p>{children}</p>;
}

export default function App() {
  return <WordCount>You are not going to believe this but...</WordCount>;
}
