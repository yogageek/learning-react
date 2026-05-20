

import React, { useReducer } from "react";

/**
 function Checkbox() {
    const [checked, setChecked] = useState(false);
    
    function toggle() {
        setChecked(checked => !checked);
        }
        
    return (
        <>
        <input type="checkbox" value={checked} onChange={toggle} />
        {checked ? "checked" : "not checked"}
        </>
        );
        }
        */


function Checkbox() {
    // toggle 就是 dispatch，只是名字取得語意化。
    // 呼叫 toggle() → React 把 checked 丟進 checked => !checked → 回傳新值 → checked 翻轉。
    const [checked, toggle] = useReducer(checked => !checked, false);
    //     ↑ 當前state  ↑dispatch     ↑ reducer函式          ↑ 初始值

    return (
        <>
            <input type="checkbox" value={checked} onChange={toggle} />
            {checked ? "checked" : "not checked"}
        </>
    );
}

function Numbers() {
    const [number, setNumber] = useReducer(
        (number, newNumber) => number + newNumber,
        //  ↑ 舊state   ↑ dispatch傳進來的值
        0
        // 初始值
    );

    return <h1 onClick={() => setNumber(1)}>{number}</h1>;
    // dispatch(1) → reducer 收到 (當前number, 1) → 回傳 number + 1
}

// checkbox 的 reducer 不需要外部資訊（永遠取反），numbers 的 reducer 需要知道「加多少」，所以 dispatch 要傳值進去。

export default function App() {
  return (
    <>
      <Checkbox />
      <Numbers />
    </>
  );
}