import React, { useEffect } from "react";
import { useIterator } from "./hooks";
import RepositoryReadme from "./RepositoryReadme";

//useIterator 是自訂 Hook，用來取出儲存庫物件和name，連同 prev 和 next 兩個函式

//repo切換的選單
export default function RepoMenu({ repositories, onSelect, selected }) {
  const [{ name }, previous, next] = useIterator(
    repositories,
    selected ? repositories.findIndex(repo => repo.name === selected) : null
    // 如果已有選取的 repository，就找出它在清單中的索引；
    // 否則回傳 null，避免畫面每次都預設從第一筆開始。
  );
  
  //RepoMenu 切到了新的 repo，呼叫 onSelect(name)通知
  useEffect(() => {
    if (!name) return;
    onSelect(name);// name 改變時觸發 onSelect，通知外部目前選了哪個 repo
  }, [name]);

  return (
    <>
      <button onClick={previous}>&lt;</button>
      <p>{name}</p>
      <button onClick={next}>&gt;</button>
    </>
  );
}


/*
RepoMenu.jsx -- repo 切換選單

用 useIterator 管理 repositories 陣列，顯示當前 repo 名字，左右箭頭切換。

name 改變時觸發 onSelect，通知外部目前選了哪個 repo。
*/
