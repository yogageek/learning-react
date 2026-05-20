import React, { useState, useEffect } from "react";

const useAnyKeyToRender = () => {
    const [, forceRender] = useState();
    // 省略第一個元素（不需要 state 值）
    // forceRender 拿到的是 setter function
    // 呼叫 setter → React 認為 state 變了 → 觸發 re-render

    useEffect(() => {
        window.addEventListener("keydown", forceRender);
        return () => window.removeEventListener("keydown", forceRender);
    }, []);
    // 按鍵時直接把 KeyboardEvent 物件丟給 setter
    // setter 收到任何值都會更新 state → re-render
    // cleanup function：元件 unmount 時移除監聽
    // 防止 memory leak
};

export default function App() {
    useAnyKeyToRender();

    useEffect(() => {
        console.log("fresh render");
    });

    return <h1>Open the console</h1>;
}
