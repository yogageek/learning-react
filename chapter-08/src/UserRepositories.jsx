import Fetch1 from "./Fetch1.jsx";
import RepoMenu from "./RepoMenu";

export function UserRepositories({ login, selectedRepo, onSelect }) {
  return (
    <Fetch1
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <RepoMenu
          repositories={data}
          selectedRepo={selectedRepo}
          onSelect={onSelect}// repo 選擇改變時觸發 onSelect，通知外部目前選了哪個 repo
        />
      )}
    />
  );
}


/*
UserRepositories.jsx -- 組合層

把 Fetch 和 RepoMenu 組在一起，fetch 該用戶的 repo 清單，成功後交給 RepoMenu 顯示。
*/
