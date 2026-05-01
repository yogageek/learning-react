import React, { useRef, useState, useEffect } from "react";
import Fetch1 from "./Fetch1.jsx";
import { UserRepositories } from "./UserRepositories";
import SearchForm from "./SearchForm.jsx";
import RepositoryReadme from "./RepositoryReadme.jsx";

// github元件透過login屬性接收一個用戶名稱做查詢目標構建請求的網址并交由fetch元件進行處理。 
function GitHubUser({ login }) {
  return (
    <Fetch1
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}

//傳進GitHubUser-renderSuccess 決定要怎麼顯示
function UserDetails({ data }) {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [login, setLogin] = useState("");//moonhighway
  const [repo, setRepo] = useState("");//learning-react


  //依照使用者行為去除amount某些元件。 如果用戶在 請求時立刻清空搜尋欄位并 搜尋空之船。 react會立刻移除已經渲染的原件。 這是一個需要處理的問題。 
  const handleSearch = login => {
    if (login) return setLogin(login)
    setLogin("");
    setRepo("");
  }

  if (!login) return (<SearchForm value={login} onSearch={handleSearch} />)

  // login 改變
  // useEffect 觸發
  // setRepo(null)
  // RepositoryReadme 因為 repo 是 null，先不 render
  // 等你重新選 repo，再 render README
  // useEffect(() => {
  //   setRepo(null);
  // }, [login]);

  //從瀑布式改為平行式
  return (
    <>
      <SearchForm value={login} onSearch={handleSearch} />
      {login && <GitHubUser login={login} />}
      {login && <UserRepositories
        login={login}
        repo={repo}
        onSelect={setRepo}
      />}
      {login && repo && (
        <RepositoryReadme login={login} repo={repo} />
      )}
    </>
  );
}


//非同步行為有關的原件錯誤處理技巧
//可以使用低網速的環境來測試與偵測

//自訂義hook判斷當前元件是否已經移除
export function useMountedRef() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;//每次渲染後執行的函式
    return () => {
      mounted.current = false; //元件移除時執行的函式
    };
  })
  return mounted;
}
