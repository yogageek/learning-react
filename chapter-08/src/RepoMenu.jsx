import React, { useEffect } from "react";
import { useIterator } from "./hooks";
import RepositoryReadme from "./RepositoryReadme";

//useIterator 是自訂 Hook，用來取出儲存庫物件和name，連同 prev 和 next 兩個函式


export default function RepoMenu({ repositories, onSelect, login }) {
  const [{ name }, previous, next] = useIterator(repositories);
  // onSelect就是外面傳進來的 onSelect={(repoName) => console.log(`${repoName} selected`)}  
  useEffect(() => {
    if (!name) return;
    onSelect(name);// name 改變時觸發 onSelect，通知外部目前選了哪個 repo
  }, [name]);

  return (
    <>
      <button onClick={previous}>&lt;</button>
      <p>{name}</p>
      <button onClick={next}>&gt;</button>
      {/* <p>{typeof login}</p> */}
      <RepositoryReadme login={login} repo={name} />
    </>
  );
}


/*
RepoMenu.jsx -- repo 切換選單

用 useIterator 管理 repositories 陣列，顯示當前 repo 名字，左右箭頭切換。

name 改變時觸發 onSelect，通知外部目前選了哪個 repo。
*/
