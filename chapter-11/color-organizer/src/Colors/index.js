/**
 * 此檔案是 Color Organizer 應用的主要進入組件。
 * 它整合了顏色管理的核心功能，包括：
 * 1. 使用 ColorProvider 提供全域狀態管理。
 * 2. 顯示新增顏色的表單 (AddColorForm)。
 * 3. 設置路由 (Routes) 來切換顏色列表與詳細資訊視圖。
 */
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddColorForm from "./AddColorForm";
import ColorList from "./ColorList";
import { ColorDetails } from "./ColorDetails";
import "./Colors.css";
import { ColorProvider } from "./hooks";
export * from "./hooks";

export default function App() {
  return (
    <ColorProvider>
      {/* AddColorForm 置於 Routes 之外，因此在所有頁面都會顯示 */}
      <AddColorForm />
      
      {/* 
        Routes 容器會根據目前的 URL 路徑，渲染最匹配的一個 Route。
      */}
      <Routes>
        {/* 
          根路徑 (/)：當 URL 為首頁時，渲染 ColorList 組件展示所有顏色。
        */}
        <Route
          path="/"
          element={<ColorList />}
        ></Route>
        
        {/* 
          動態路由 (:id)：使用冒號標記參數。
          當 URL 為 /<某個ID> 時，會渲染 ColorDetails 組件，
          並可透過 useParams() 獲取該 id 參數。
        */}
        <Route
          path=":id"
          element={<ColorDetails />}
        />
      </Routes>
    </ColorProvider>
  );
}
