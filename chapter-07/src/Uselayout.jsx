import React, { useState, useLayoutEffect } from "react";

// 即時追蹤視窗尺寸，顯示 寬x高。

function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
// 初始值 0，等 layout 後立刻更新。
  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
// 讀取視窗實際尺寸，寫進 state。
  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize(); // 掛載後立刻讀一次，避免初始顯示 0x0
    return () => window.removeEventListener("resize", resize); //綁定 resize 事件，unmount 時清除。
  }, []);

  return [width, height];
}

export default function App() {
  const [w, h] = useWindowSize();
  return (
    <div>
      {w}x{h}
    </div>
  );
}



// 關鍵：為什麼用 useLayoutEffect 而不是 useEffect？
// 執行時機用途useEffectDOM paint 之後（非同步）大多數副作用useLayoutEffectDOM paint 之前（同步）需要在畫面出現前就拿到正確尺寸
// 用 useEffect 的話，頁面會先閃一下 0x0，然後才更新成真實尺寸。useLayoutEffect 在瀏覽器畫出畫面前就執行完，使用者不會看到初始的 0。

// 關鍵思考點
// useLayoutEffect 是同步阻塞的，執行時間過長會卡住渲染。只在需要避免視覺閃爍時才用，其餘情況一律用 useEffect。