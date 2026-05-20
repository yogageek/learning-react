import React, { useState, memo, useCallback } from "react";

// ─── 底層元件 ────────────────────────────────────────────────
function Cat({ name, onMeow }) {
    console.log(`Cat re-rendered: ${name}`);
    return (
        <div style={{ marginBottom: 8 }}>
            <p>🐱 貓咪：{name}</p>
            {/* ─── 階段1~5：onMeow 已在外部包好 name ────────────── */}
            {/* <button onClick={onMeow}>Meow</button> */}
            {/* ─── 階段6：onMeow 是 handleMeow，自己帶 name ─────── */}
            <button onClick={() => onMeow(name)}>Meow</button>
        </div>
    );
    // onClick 裡的 console.log 是點擊事件，跟 re-render 無關。
}

// ─── 階段1：無保護，每次父層 render 全部重新渲染 ──────────────
// const RenderCat = Cat;

// ─── 階段2：memo 無第二參數，但 onMeow 箭頭函式讓 memo 失效 ── （memo 失效，全印）
// const RenderCat = memo(Cat);

// ─── 階段3：決斷函式 () => true，只渲染一次 ────────────────── 按「觸發父層」沒有任何印 | 不管 prev 和 next 是什麼，永遠回傳 true。React 收到 true → 認為 props 沒變 → 永遠不 re-render。
// const RenderCat = memo(Cat, () => true); 

// ─── 階段4：決斷函式 () => false，永遠渲染，同無保護 ─────────
// const RenderCat = memo(Cat, () => false);

// ─── 階段5：比較 name，name 沒變就不 re-render ─────────────── Good
// const RenderCat = memo(Cat, (prev, next) => prev.name === next.name);

// ─── 階段6：memo + useCallback，函式參考穩定，memo 真正有效 ── Excellent
const RenderCat = memo(Cat);

export default function App() {
    const [count, setCount] = useState(0);
    const [cats, setCats] = useState(["Nala", "Luna", "Mochi"]);

    // ─── 階段6：useCallback 穩定參考 ─────────────────────────
    const handleMeow = useCallback((name) => {
        console.log(`${name} meow`);
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <button onClick={() => setCount(c => c + 1)}>
                觸發父層 re-render（不動貓）：{count}
            </button>
            <button onClick={() => setCats([...cats, `Kitty${cats.length+1}`])}>
                新增貓咪
            </button>
            <div style={{ marginTop: 16 }}>
                {cats.map((name, i) => (
                    <RenderCat
                        key={i}
                        name={name}
                        //  ─── 階段1~5：箭頭函式，每次 render 產生新參考 ───────────
                        // onMeow={() => console.log(`${name} meow`)}
                    // ─── 階段6：直接傳，參考穩定，memo 真正有效 ─────
                    onMeow={handleMeow}
                    />
                ))}
            </div>
        </div>
    );
}

// ┌─────────────────────────────────────────────────────────────┐
// │                     各階段操作結果                           │
// ├──────┬──────────────┬────────────────────────────────────── │
// │ 階段 │ 操作         │ console 結果                          │
// ├──────┼──────────────┼────────────────────────────────────── │
// │ 1    │ 按新增貓咪   │ 全部貓咪都印（包含舊的）               │
// │ 2    │ 按新增貓咪   │ 全部貓咪都印（onMeow 箭頭函式新參考）  │
// │ 3    │ 按新增貓咪   │ 只有第一次 mount 印，之後都不印        │
// │ 4    │ 按新增貓咪   │ 全部貓咪都印（同階段1）                │
// │ 5    │ 按新增貓咪   │ 只有新加的 Kitty 印，舊的不動          │
// │ 6    │ 按新增貓咪   │ 只有新加的 Kitty 印，舊的不動          │
// ├──────┴──────────────┴────────────────────────────────────── │
// │  階段2 vs 階段6：同樣 memo(Cat)，差在 onMeow               │
// │  階段2：() => console.log(...) 每次新參考 → memo 失效       │
// │  階段6：useCallback 包住 → 參考穩定 → memo 真正有效         │
// │                                                             │
// │  階段5 vs 階段6：結果相同，但原因不同                        │
// │  階段5：決斷函式強制忽略 onMeow 變化                        │
// │  階段6：props 本身沒變，memo 自然不觸發                      │
// └─────────────────────────────────────────────────────────────┘

// ─── 階段5：決斷函式強制忽略 onMeow 變化 ─────────────────────
// (prev, next) => prev.name === next.name
// 只比較 name，完全不管 onMeow
// 就算 onMeow 每次都是新的箭頭函式，決斷函式回傳 true，React 還是不 re-render
// 是強制跳過，不是因為 props 真的沒變

// ─── 階段6：props 本身沒變，memo 自然不觸發 ──────────────────
// memo(Cat) 沒有第二參數，React 預設比較所有 props
// name 是字串沒變，onMeow 是 useCallback 包住參考也沒變
// React 比較所有 props 後，真的沒有任何變化，自然不 re-render


// 一句話總結：memo其實很少用到 更常見的是用錯
// 預設1(re-render成本很低大部分用這種就好) → 發現清單重渲加 memo(階段2) → 還在動加 useCallback(階段6) → 包不了才用決斷函式(階段5)
// 階段3、4 開發上幾乎不會主動用。