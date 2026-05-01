import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";



// render 會回傳查詢工具，這裡用 getByLabelText 依 label 文字找到 checkbox。
// fireEvent.click 用來模擬使用者點擊，驗證 checked 狀態是否有正確切換。
test("Selecting the checkbox should toggle its value", () => {
  const { getByLabelText } = render(<Checkbox />);
  const checkbox = getByLabelText(/not checked/i);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(false);
});
// getByLabelText(...) 是 Testing Library 的查詢方法
// 用來找出和 <label> 關聯的表單元素
// 這裡回傳的是那個 checkbox 的 DOM 節點
// 用 label 顯示文字找到對應的 checkbox。
// /not checked/i 是不分大小寫的正規表達式，會匹配畫面上的 "not checked"。