import React from "react";

// 範例資料：每一筆都是一座山峰的名稱與海拔高度。
const tahoe_peaks = [
  { name: "Freel Peak", elevation: 10891 },
  { name: "Monument Peak", elevation: 10067 },
  { name: "Pyramid Peak", elevation: 9983 },
  { name: "Mt. Tallac", elevation: 9735}
];

function List({ data = [], renderItem, renderEmpty }) {
  // props 解構：
  // data = [] 是預設值，外面沒傳 data 時就使用空陣列。
  // renderItem 是「每一筆資料要怎麼顯示」的函式。
  // renderEmpty 是「當資料為空時要顯示什麼」。
  return !data.length ? (
    // !data.length 代表陣列是空的，直接回傳外部提供的空狀態 UI。
    renderEmpty
  ) : (
    <ul>
      {data.map((item, i) => (
        // renderItem(item) 表示 List 不自己決定畫面，
        // 而是把 item 傳給外部提供的函式，由外部決定每一列長怎樣。
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default function RenderProps() {
  return (
    <List
      data={tahoe_peaks}
      // 這裡直接傳入一段 JSX，作為資料為空時的顯示內容。
      renderEmpty={<p>This list is empty</p>}
      // 這裡傳入一個函式，這就是 render props 的核心：
      // 外層把「如何 render 每一筆資料」交給 List 使用。
      renderItem={item => (
        <>
          {/* item 是 List 在 data.map(...) 時傳進來的目前那一筆資料 */}
          {item.name} - {item.elevation.toLocaleString()}
        </>
      )}
    />
  );
}
// List 負責處理清單，renderItem 負責決定每筆資料怎麼畫。

// List 負責：
// 判斷資料有沒有空
// 迴圈走訪 data
// 包成 <ul><li>...</li></ul>
// List 不用知道資料最後長什麼樣，重用性比較高。

// 外面負責：
// 每一筆資料到底怎麼顯示
// 空資料時要顯示什麼
// 所以第一個好處是 可重用性高。

// 每個都長很像，只差每列怎麼 render。
// 用 render props 就可以把共同邏輯抽成一個元件。

// 但也要補一句，render props 不是只有好處。

// 它的缺點通常是：

// JSX 會比較繞
// 一直傳函式時可讀性可能下降
// 多層 render props 容易變成 callback hell
// 在現代 React，很多情況會改用 children function、custom hooks、composition 來取代