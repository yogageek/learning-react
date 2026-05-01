import React, { useState, useEffect, useCallback } from "react";

import ReactMarkdown from "react-markdown";

export default function RepositoryReadme({ repo, login }) {
  // loading：現在是不是在抓資料
  // error：抓資料有沒有失敗
  // markdown：抓到的 README 內容是什麼
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");
  // useCallback(..., [])：把函式記住，因為依賴陣列是空的，所以初次 render 建立一次後會重用
  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);//開始抓資料前先把 loading 設成 true，畫面就可以顯示 Loading...
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then(res => res.json());//發出請求後，JavaScript 不會傻等，它會先繼續往後。
    const markdown = await fetch(download_url).then(res => res.text());//等資料真的回來，再把後面的 .then(...) 或 await 接回來執行。
    setMarkdown(markdown);
    setLoading(false);
  }, []);

  // 接著 useEffect 在 render 完之後觸發，去呼叫 loadReadme()。
  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);    
  }, [repo]);//當 repo 變動時重新執行 effect，抓取新的 README 內容
  
  // 元件 render 後，執行這個 effect
  // 如果 repo 或 login 沒有值，就不要抓
  // 如果有值，就去執行 loadReadme(login, repo)
  // 如果 promise 失敗，就把錯誤丟給 setError

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <p>Loading...</p>;

  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}

// React 不是從 return Loading... 後面繼續執行。
// 而是 state 改變後，把整個元件函式重新跑一次。