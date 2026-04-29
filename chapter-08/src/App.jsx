import React from "react";
import Fetch1 from "./Fetch1.jsx";
import { UserRepositories } from "./UserRepositories";

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
  return <GitHubUser login="moonhighway" />;
}


/*
閱讀順序：

index.jsx -> App.jsx -> Fetch.jsx -> hooks.js -> RepoMenu.jsx -> UserRepositories.jsx

App.jsx -- 主結構

兩個 component：

GitHubUser 用 Fetch 去打 GitHub 用戶 API，資料回來後交給 UserDetails 渲染。

UserDetails 顯示頭像、名字、地點，最後掛上 UserRepositories。

整體資料流：

App
└── GitHubUser
    └── Fetch（打用戶 API）
        └── UserDetails（顯示用戶資料）
            └── UserRepositories
                └── Fetch（打 repo API）
                    └── RepoMenu（切換 repo）
*/
