import React from "react";
import ReactDOM from "react-dom";
import Star from "./Star";
import { toHaveAttribute,toHaveClass } from "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; //可取代寫冗長的expect.extend

expect.extend({ toHaveAttribute,toHaveClass });

test("renders a star", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Star />, div);
  expect(div.querySelector("svg")).toHaveAttribute(
    "id",
    "star"
  );
});

//render函式接收受測元件 並回傳query物件 包含數十種工具函示 可用於在渲染結果中選出特定元素
//getByTest會回傳遞一個符合正規表達式的元素節點

test("renders an h1", () => {
  const { getByText } = render(<Star />);
  const h1 = getByText(/Great Star/);
  expect(h1).toHaveTextContent("Great Star");
});
