import React from "react";
import { useInput } from "./hooks.jsx";
import { useColors } from "./ColorProvider.jsx";
import { css } from "@emotion/css";
//import React, { useRef } from "react";

export default function AddColorForm() {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");
  const { addColor } = useColors(); // 從 Context 取用 addColor 函式，負責新增顏色到全域狀態 

  const submit = e => {// 這裡的 e 是事件物件，代表表單提交事件。
    e.preventDefault();// preventDefault()：阻止表單預設行為（避免頁面重新整理）
    addColor(titleProps.value, colorProps.value);// 呼叫 addColor 函式，傳入 title 和 color 的值，將新顏色加入全域狀態。
    resetTitle();  // 清空兩個輸入欄位，回到初始值
    resetColor();
  };

  return (// 使用 emotion 定義表單樣式
    <form
      className={css`
        display: flex;
        justify-content: space-around;
        margin: 0.25em;
        button {
          margin: 0.25em;
        }
        input {
          margin: 0.25em;
          &:first-child {
            flex: 1;
          }
        }
      `}
      onSubmit={submit}
    >
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />
      <input {...colorProps} type="color" required />
      <button>ADD</button>
    </form>
  );
}


// export default function AddColorForm({ onNewColor = f => f }) {
//   const txtTitle = useRef();
//   const hexColor = useRef();

//   const submit = e => {
//     e.preventDefault();
//     const title = txtTitle.current.value;
//     const color = hexColor.current.value;
//     onNewColor(title, color);
//     txtTitle.current.value = "";
//     hexColor.current.value = "";
//   };

//   return (
//     <form onSubmit={submit}>
//       <input ref={txtTitle} type="text" placeholder="color title..." required />
//       <input ref={hexColor} type="color" required />
//       <button>ADD</button>
//     </form>
//   );
// }

/*
================================================================================
AddColorForm 元件說明
================================================================================

功能：
  - 新增顏色表單元件，讓使用者輸入顏色名稱與選擇顏色
  - 提交後將資料傳送至全域狀態管理

使用技術：
  - useInput hook：自訂 hook，用於管理 input 的 value 與 onChange
  - useColors hook：從 ColorProvider 取用 addColor 函式
  - css-in-js (emotion)：使用標籤模板字串定義元件樣式

資料流向：
  1. 使用者輸入標題與選擇顏色
  2. 點擊 ADD 按鈕觸發 submit 事件
  3. e.preventDefault() 阻止表單預設提交行為（頁面刷新）
  4. 呼叫 addColor(title, color) 將新顏色加入全域狀態
  5. 呼叫 resetTitle() 與 resetColor() 清空輸入欄位

與舊版差異：
  - 舊版使用 useRef 直接操作 DOM 元素
  - 新版使用 useInput hook 實現受控元件（controlled component）模式
  - 新版透過 Context (useColors) 直接存取狀態，無需層層傳遞 props
================================================================================
*/
