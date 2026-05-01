import React, { useState, useEffect } from "react";

// JSON 字串轉回物件。JSON.parse
// 箭頭函式寫法：key => ...
// key && ... 是短路判斷；如果 key 是 falsy，就直接回傳 key，不繼續執行右側。
// localStorage.getItem(key) 取回字串，JSON.parse(...) 把 JSON 字串轉回物件。
const loadJSON = key => key && JSON.parse(localStorage.getItem(key));

// 物件轉成字串。JSON.stringify
// (key, data) => ... 表示這個箭頭函式接收兩個參數。
// JSON.stringify(data) 會把物件轉成字串，因為 localStorage 只能存字串。
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function GitHubUser({ login }) {
    // { login } 是 props 解構，等同於 const login = props.login;
    // useState(...) 會回傳 [狀態值, 更新狀態的函式]。
    // `user:${login}` 是 template literal，會把 login 插入字串中。
    const [data, setData] = useState(loadJSON(`user:${login}`));

    useEffect(() => {
        if (!data) return;
        if (data.login === login) return;

        // 物件解構：從 data 物件中取出 name、avatar_url、location。
        const { name, avatar_url, location } = data;

        // 物件縮寫語法：name: name 可簡寫成 name。
        saveJSON(`user:${login}`, {
            name,
            login,
            avatar_url,
            location
        });
    }, [data]);
    // [data] 是 dependency array，表示 data 改變時才重新執行這個 effect。

    useEffect(() => {
        if (!login) return;
        if (data && data.login === login) return;

        // fetch(...) 會回傳 Promise。
        // .then(...) 表示前一步完成後再繼續處理結果。
        // response => response.json() 也是箭頭函式，將回應轉成 JavaScript 物件。
        // .then(setData) 等同於 .then(result => setData(result))
        fetch(`https://api.github.com/users/${login}`)
            .then(response => response.json())
            .then(setData)
            .catch(console.error);
    }, [login]);
    // [login] 表示 login 改變時，才重新抓取新的 GitHub 使用者資料。

    // if (data) return ... 是條件式提早回傳。
    // <pre> 會保留換行與縮排，適合顯示格式化後的 JSON。
    // JSON.stringify(data, null, 2) 的 2 代表縮排兩個空白。
    if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>;

    // React 元件回傳 null 代表不渲染任何內容。
    return null;
}

export default function Storage() {
    // export default 表示這是這個檔案預設匯出的元件。
    return <GitHubUser login="moonhighway" />;
}
