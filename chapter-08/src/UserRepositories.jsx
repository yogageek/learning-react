import React from "react"; 
import Fetch1 from "./Fetch1.jsx";
import RepoMenu from "./RepoMenu";

// UserRepositories 負責根據使用者名稱向 GitHub 發送請求，
// 拿到儲存庫資料後，再把資料陣列傳給 RepoMenu 顯示出來。

// 外面目前沒有傳 selectedRepo 進來。 
export function UserRepositories({ login, selectedRepo, onSelect }) {
  return (
    <Fetch1
      uri={`https://api.github.com/users/${login}/repos`}
      // renderSuccess 這個 prop 是一個函式，Fetch 成功拿到資料後會呼叫它if (data) return renderSuccess({ data });，並把uri's data當參數傳進去。
      renderSuccess={({ data }) => (
        <RepoMenu
          login={login}
          repositories={data}
          selectedRepo={selectedRepo}
          onSelect={onSelect}// 外面onSelect宣告一個函式傳進來，然後再繼續往下傳。 
        />
      )}
    />
  );
}


/*
UserRepositories.jsx -- 組合層

把 Fetch 和 RepoMenu 組在一起，fetch 該用戶的 repo 清單，成功後交給 RepoMenu 顯示。
*/
