
import React, { useState, useLayoutEffect } from "react";
// 結論：用滑鼠座標即時移動一個 div，模擬自訂游標。
function useMousePosition() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const setPosition = ({ x, y }) => {
        setX(x);
        setY(y);
    };
    // 解構 MouseEvent 的 x、y 屬性，寫進 state。
    useLayoutEffect(() => {
        window.addEventListener("mousemove", setPosition);//每次滑鼠移動，瀏覽器自動傳入 MouseEvent 物件，setPosition 從中取出座標。
        return () => window.removeEventListener("mousemove", setPosition);
    }, []);

    return [x, y];
}

export default function App() {
    const [left, top] = useMousePosition(); 
     // top / left 跟著滑鼠座標更新 → div 跟著移動
     // cursor: "none" 隱藏原生游標，讓這個 div 取代它
    return ( 
        <div style={{ position: "absolute", top, left, cursor: "none" }}>
            {top}x{left}
        </div>
      
       
    );
}


// 為什麼這裡用 useLayoutEffect？
// 滑鼠移動時，如果位置更新發生在 paint 之後，div 的位置會永遠落後游標一幀，視覺上有拖影感。useLayoutEffect 確保座標在畫面刷新前就寫入，讓 div 位置與游標同步。