import React, { useState, useEffect } from "react";

export default function App() {
  const [val, set] = useState("");//輸入框的當下文字，初始為空字串
  const [phrase, setPhrase] = useState("example phrase");

  const createPhrase = () => {
    setPhrase(val);//把輸入框目前的值寫進 phrase state
    set("");//清空輸入框（val → ""）
  };

//   useEffect(() => {//沒有第二參數 → 每次 state 改變都觸發
//     console.log(`typing "${val}"`);
//   });

//   useEffect(() => {//
//     console.log(`saved phrase: "${phrase}"`);
//   });

  useEffect(() => {
    console.log(`typing "${val}"`);
  }, [val]);

  useEffect(() => {
    console.log(`saved phrase: "${phrase}"`);
  }, [phrase]);
  
  return (
    <>
      <label>Favorite phrase:</label>
      <input
        value={val}
        placeholder={phrase}
        onChange={e => set(e.target.value)}
      />
      <button onClick={createPhrase}>send</button>
    </>
  );
}

// 打字 onChange → val 改變
//   → useEffect #1 執行  ✅
//   → useEffect #2 執行  ❌ phrase 根本沒變，不該跑
// React 在同一個 event handler 裡的多個 setState 會自動 batch（React 18），所以按 send 只觸發一次 render，#1 只跑一次。這個例子剛好不會炸。
// 但真正的風險是：未來擴充時