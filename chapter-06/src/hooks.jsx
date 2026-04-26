import { useState } from "react";

// 自訂 Hook：管理單一表單欄位，整合 value / onChange / reset
export const useInput = initialValue => {
  // 儲存當前輸入值，初始值由外部傳入
  const [value, setValue] = useState(initialValue);

  return [
    // [0] inputProps：可直接展開到 <input />
    //     - value：顯示當前值
    //     - onChange：輸入變動時同步更新 state
    { value, onChange: e => setValue(e.target.value) },

    // [1] reset：將欄位恢復為初始值
    () => setValue(initialValue)
  ];
};

/**
## 整體概念：**自訂 Hook（Custom Hook）**

---

### 它在解決什麼問題？

每次寫表單欄位，都要重複這段：

```js
const [value, setValue] = useState("");
<input value={value} onChange={e => setValue(e.target.value)} />
```

**`useInput` 把這些重複邏輯包起來，一行搞定。**

---

### 使用方式

```js
const [titleProps, resetTitle] = useInput("");
//      ↑ 直接展開到 input     ↑ 清空用

<input {...titleProps} />  // 等同於 value={...} onChange={...}
resetTitle();              // 清空欄位
```

---

### 回傳值對照

| 位置 | 內容 | 用途 |
|------|------|------|
| `[0]` | `{ value, onChange }` | 展開到 `<input />` |
| `[1]` | `() => setValue(initialValue)` | 重設欄位 |

---

### 一句話總結

> **把「受控輸入欄位」的重複程式碼，抽成一個可重用的 Hook。**
*/