# Chapter 08 學習筆記

日期：2026-04-29

這份筆記根據今天在 `chapter-08` 的實作、除錯與提問整理，重點放在 React 資料流、render prop、callback prop、Vite 開發流程。

## 今天做了什麼

- 把 `chapter-08` 專案跑起來，補上 `index.html` 與入口設定。
- 修正 `Fetch1` / `UserRepositories` 的 import/export 問題。
- 釐清 `renderSuccess`、`onSelect`、`repoName` 的來源與呼叫順序。
- 了解 `ReactDOM.render` 和 `createRoot` 的差異。
- 了解 `dist/` 與 `assets/` 的用途。

## 今天學到的重點

### 1. `renderSuccess` 是外面傳進去的 function

`Fetch1` 不負責決定資料成功後要怎麼顯示，它只負責：

- 接收 `uri`
- fetch 資料
- 在成功時呼叫 `renderSuccess({ data })`

所以這種寫法：

```jsx
<Fetch1
  uri={`https://api.github.com/users/${login}/repos`}
  renderSuccess={({ data }) => (
    <RepoMenu repositories={data} onSelect={onSelect} />
  )}
/>
```

意思是：

- `Fetch1` 抓到資料後
- 把資料包成 `{ data }`
- 再呼叫你傳進去的 `renderSuccess`
- `renderSuccess` 回傳要 render 的 UI

### 2. `({ data }) => ...` 是參數解構

這段：

```jsx
renderSuccess={({ data }) => (...)}
```

等價於：

```jsx
renderSuccess={(result) => (
  <RepoMenu repositories={result.data} />
)}
```

所以 `data` 的來源確實是 `Fetch1`，只是被用解構參數的方式取出來。

### 3. `onSelect` 是 callback prop

`onSelect` 的作用不是自己顯示在畫面上，而是讓子元件把結果通知回父元件。

資料方向：

- props 往下傳
- 事件結果往上回報

在這個例子中：

- `App.jsx` / `UserDetails` 把 `onSelect` 傳下去
- `UserRepositories.jsx` 繼續往下傳給 `RepoMenu`
- `RepoMenu.jsx` 在 repo 改變時呼叫 `onSelect(name)`

也就是：

```jsx
onSelect(name)
```

這樣父層就知道目前選到哪一個 repo。

### 4. `repoName` 是從 `RepoMenu` 傳上去的

這段：

```jsx
onSelect={(repoName) => console.log(`${repoName} selected`)}
```

裡面的 `repoName` 不是憑空出現的，它來自 `RepoMenu.jsx`：

```jsx
const [{ name }, previous, next] = useIterator(repositories);

useEffect(() => {
  if (!name) return;
  onSelect(name);
}, [name]);
```

所以流程是：

```text
repositories -> 目前選到的 repo object -> name -> onSelect(name) -> repoName
```

### 5. `<p>onSelect={onSelect}</p>` 沒有實際意義

因為 `onSelect` 是 function，不是你真正想顯示的資料。

你應該顯示的是：

- `name`
- 或父層 state 裡的 `selectedRepo`

例如：

```jsx
<p>Selected repo: {name}</p>
```

如果只是 debug，可以暫時看：

```jsx
<p>{typeof onSelect}</p>
```

但正常 UI 不會把 function 本身 render 出來。

### 6. `ReactDOM.render` 和 `createRoot` 的差異

舊寫法：

```jsx
import ReactDOM from "react-dom";

ReactDOM.render(<App />, rootElement);
```

新寫法：

```jsx
import { createRoot } from "react-dom/client";

createRoot(rootElement).render(<App />);
```

重點：

- `ReactDOM.render` 是舊 API
- `createRoot(...).render(...)` 是 React 18 推薦寫法

### 7. `JSX` 和 `React.createElement(...)` 本質上是在做同一件事

例如：

```jsx
<App />
```

概念上接近：

```jsx
React.createElement(App)
```

差別主要是：

- JSX 比較好讀
- `createElement` 比較底層

### 8. 改完程式不一定要先跑 `build`

如果 Vite dev server 正在跑：

- 存檔通常就會自動更新
- 最多手動 refresh 一次

只有在這些情況才需要 `npm run build`：

- 想確認 production build 能不能成功
- 想產生 `dist/` 給部署用

### 9. `dist/` 是 build 產物，可以重建

`dist/` 不是原始碼，而是打包後的輸出。

通常可以刪，之後再跑：

```bash
npm run build
```

就會重新產生。

### 10. `dist/assets/` 是打包後的靜態資源

裡面通常會有：

- JS
- CSS
- 圖片
- 字型

像這種檔名：

```text
index-BkYBPB-r.js
index-C0y2fvpQ.css
```

中間那串是 hash，作用是避免瀏覽器快取舊檔。

## 這章最重要的資料流

```text
App
└── GitHubUser
    └── Fetch1（抓 user API）
        └── UserDetails
            └── UserRepositories
                └── Fetch1（抓 repos API）
                    └── RepoMenu
                        └── onSelect(name)
```

搭配事件方向理解：

```text
資料 / props：上 -> 下
事件 / callback：下 -> 上
```

## 今天最值得記住的三句話

1. `Fetch1` 負責抓資料，`renderSuccess` 負責決定成功後要 render 什麼。
2. `onSelect` 是 callback，不是拿來直接顯示在畫面上的資料。
3. `repoName` 來自 `RepoMenu` 呼叫 `onSelect(name)` 時傳回父層。

## 下一步可以練習

- 把 `selectedRepo` 存成 state，直接顯示在畫面上。
- 把 `onSelect={(repoName) => console.log(...)}` 改成 `onSelect={setSelectedRepo}`。
- 練習把 `renderSuccess={({ data }) => ...}` 改寫成不解構版本，確認自己真的懂資料來源。
