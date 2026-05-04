# 筆記：Golang 與同構應用 (Isomorphic Apps)

## 什麼是「同構」？
簡單來說就是：**「一套程式碼，兩端（伺服器與瀏覽器）跑」**。

## Golang 實現同構的兩種主要方式

### 1. Go + WebAssembly (Wasm) —— 邏輯共享
*   **做法：** 把 Go 寫的邏輯（例如演算法、加密、驗證）編譯成 `.wasm` 檔案。
*   **效果：** 伺服器直接跑 Go，瀏覽器載入 Wasm 跑同樣的 Go 邏輯。
*   **優點：** 真正達成核心業務邏輯的**代碼 100% 共享**。

### 2. Go + JS 引擎 —— 驅動 SSR
*   **做法：** 在 Go 伺服器內嵌入 JavaScript 引擎（如 V8），去執行 React 的 JS 代碼。
*   **效果：** 由 Go 負責處理請求，但呼叫 React 生成 HTML 字串回傳。
*   **優點：** 結合了 Go 的高效能與 React 的 SSR 優勢。

## 對比總結

| 類型 | 同構的對象 | 核心技術 |
| :--- | :--- | :--- |
| **Node.js 同構** | JavaScript 代碼 | Node.js 直接執行 JS |
| **Golang 同構** | Go 代碼邏輯 | WebAssembly (Wasm) |

**一句話總結：**
在 Go 的世界裡，同構通常是指透過 **WebAssembly** 讓原本只能在後端跑的高效能 Go 邏輯，也能直接在瀏覽器執行。
