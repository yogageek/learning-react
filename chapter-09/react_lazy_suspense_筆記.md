# React Lazy + Suspense 筆記

---

## 1. `useState`：控制是否同意

**重點**
- `agree` = 狀態
- `setAgree` = 更新狀態
- 初始為 `false`

**為什麼**
React 用 state 觸發 re-render，UI 才會切換

**範例**
```jsx
const [on, setOn] = useState(false);

return (
  <button onClick={() => setOn(true)}>
    {on ? "開啟" : "關閉"}
  </button>
);
```

---

## 2. 條件渲染（未同意就擋住）

```jsx
if (!agree) return <Agreement onAgree={() => setAgree(true)} />;
```

**重點**
- 還沒同意 → 直接 return
- `onAgree` 是 callback

**邏輯**
子元件 → 呼叫 `onAgree()` → 父元件 state 改變 → re-render

**範例**
```jsx
function Child({ onOk }) {
  return <button onClick={onOk}>同意</button>;
}

// 父
if (!agree) return <Child onOk={() => setAgree(true)} />;
```

---

## 3. `lazy`：延遲載入元件（code splitting）

```jsx
const Main = lazy(() => import("./Main"));
```

**重點**
- 不一開始載入 `Main`
- 只有需要時才載

**為什麼**
減少初始 bundle，大型專案必要

**範例**
```jsx
const Page = lazy(() => import("./Page"));

function App() {
  return <Page />; // 第一次用才下載
}
```

---

## 4. `Suspense`：載入中的替代 UI

```jsx
<Suspense fallback={<ClimbingBoxLoader />}>
  <Main />
</Suspense>
```

**重點**
- `Main` 還沒載好 → 顯示 `fallback`
- 載好後 → 自動切換

**範例**
```jsx
<Suspense fallback={<div>Loading...</div>}>
  <LazyComp />
</Suspense>
```

---

## 5. 第三方 Loader（視覺效果）

```jsx
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
```

**重點**
- 純 UI loading 動畫
- 放在 `fallback`

**範例**
```jsx
<Suspense fallback={<ClimbingBoxLoader size={15} />}>
  <Main />
</Suspense>
```

---

## 6. 整體流程（核心理解）

**執行順序**
1. 初始：`agree = false`
2. 顯示 `<Agreement />`
3. 點擊 → `setAgree(true)`
4. re-render
5. 開始載入 `Main`（lazy）
6. 顯示 loader
7. 載完 → 顯示 `Main`

---

## 表格總結

| 技術 | 功能 | 觸發時機 |
|------|------|--------|
| useState | 控制流程 | 使用者操作 |
| 條件 render | 擋畫面 | 未同意 |
| lazy | 延遲載入 | 第一次 render |
| Suspense | loading UI | 載入中 |
| Loader | 視覺提示 | fallback |

---

## 名詞來源

- `lazy`：懶載入（需要才做）
- `Suspense`：暫停渲染直到資源完成
- `fallback`：替代方案（載入中畫面）

---

## 記住這個就好

👉 **這是一個「授權 → 才載入主頁」的 lazy loading 架構**

---

## 典型使用場景

- 登入後才載 dashboard
- 同意條款後才載主系統
- 大型頁面拆 chunk

---

## 一句話結論

👉 **用 state 控流程，用 lazy + Suspense 控資源載入**

