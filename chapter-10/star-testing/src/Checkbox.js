import React, { useReducer } from "react";

export function Checkbox() {
  const [checked, setChecked] = useReducer(
    checked => !checked,
    false
  );

  return (
    <>
      <label>
        {checked ? "checked" : "not checked"}
        <input
          type="checkbox"
          value={checked}
          onChange={setChecked}
          data-testid="checkbox" //可增加測試用的屬性        
        />
      </label>
    </>
  );
}

// 一開始 checked = false
// 畫面顯示 not checked
// 使用者點 checkbox
// onChange 觸發 setChecked
// reducer 把 false 變成 true
// 元件重新 render
// 畫面變成 checked

// Testing Library 官方習慣是：
// 優先用 getByRole
// 再來 getByLabelText
// getByTestId 放最後