import React, { useState } from "react";
import Fetch1 from "./Fetch1.jsx";
import { UserRepositories } from "./UserRepositories";
import SearchForm from "./SearchForm.jsx";

// github元件透過login屬性接收一個用戶名稱做查詢目標構建請求的網址并交由fetch元件進行處理。 
function GitHubUser({ login }) {
  return (
    <Fetch1
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}

function UserDetails({ data }) {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepositories
        login={data.login}
        onSelect={(repoName) => console.log(`${repoName} selected`)}
      />
    </div>
  );
}

export default function App() {
  const [login, setLogin] = useState("moonhighway");
  // const [repo, setRepo] = useState("learning-react");

  return (
    <>
      <SearchForm value={login} onSearch={setLogin} />
      <GitHubUser login={login} />
    </>
  );
}
