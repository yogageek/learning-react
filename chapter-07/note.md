這段對話的學習重點：

1. useState 讓資料改變時畫面自動更新，普通變數做不到這件事。
```javascript
const [count, setCount] = useState(0);
setCount(count + 1); // 畫面跟著更新
```

2. useEffect 在 DOM 更新完之後才執行，不加 dependency array 每次 render 都跑。
```javascript
useEffect(() => {
  document.getElementById("input").focus();
}, []); // [] 只在 mount 執行一次
```

3. dependency array 控制 useEffect 觸發時機。
```javascript
useEffect(() => {
  console.log("val changed");
}, [val]); // 只有 val 變才跑
```

4. useEffect 可以 return cleanup function，元件消失前執行。
```javascript
useEffect(() => {
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);
```

5. React 比較物件靠記憶體位置，不是內容，`[]` 永遠不等於 `[]`。
```javascript
// 每次 render 都是新陣列，useEffect 會一直觸發
const words = children.split(" ");

// useMemo 快取，記憶體位置不變，useEffect 不重複觸發
const words = useMemo(() => children.split(" "), [children]);
```

6. useCallback 快取 function，原理跟 useMemo 一樣。
```javascript
const fn = useCallback(() => {
  console.log("hello");
}, []); // fn 永遠是同一個 function
```

7. useReducer 把 state 和更新邏輯綁在一起，複雜 state 比 useState 好管理。
```javascript
const [state, setState] = useReducer(
  (state, newState) => ({ ...state, ...newState }),
  initialState
);
setState({ admin: true }); // 只傳要改的欄位
```

8. 更新物件 state 必須給新物件，不能直接改原本的。
```javascript
setUser({ ...user, admin: true }); // 正確
user.admin = true; // 錯誤，React 不知道要 render
```

9. useLayoutEffect 在瀏覽器畫畫面之前執行，適合讀取 DOM 尺寸。
```javascript
useLayoutEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

10. memo 包住 component，props 沒變就不重新 render。
```javascript
const Cat = memo(function Cat({ name }) {
  return <p>{name}</p>;
});
```

11. predicate 是回傳 true 或 false 的 function，常用於 filter 和條件渲染。
```javascript
const isAdmin = user => user.admin === true;
const admins = users.filter(isAdmin);
{isAdmin(user) && <AdminPanel />}
```

---

下一步可以學：useContext