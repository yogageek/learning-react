import React, { useEffect } from "react";
import { useIterator } from "./hooks";

export default function RepoMenu({ repositories, onSelect }) {
  const [{ name }, previous, next] = useIterator(repositories);

  useEffect(() => {
    if (!name) return;
    onSelect(name);// name 改變時觸發 onSelect，通知外部目前選了哪個 repo
  }, [name]);

  return (
    <>
      <button onClick={previous}>&lt;</button>
      <p>{name}</p>
      <button onClick={next}>&gt;</button>
      {/* <p>{typeof onSelect}</p> */}
    </>
  );
}


/*
RepoMenu.jsx -- repo 切換選單

用 useIterator 管理 repositories 陣列，顯示當前 repo 名字，左右箭頭切換。

name 改變時觸發 onSelect，通知外部目前選了哪個 repo。
*/
