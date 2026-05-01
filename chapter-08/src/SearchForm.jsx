import React, { useState } from "react";
// 輸入 GitHub 帳號
// 點 Search
// setLogin(...)
// Fetch1 用新 uri 重新請求 GitHub API

export default function SearchForm({ value, onSearch }) {
  const [login, setLogin] = useState(value);

  const submit = (event) => {
    event.preventDefault();
    const nextLogin = login.trim();
    if (!nextLogin) return;
    onSearch(nextLogin);
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={login}
        placeholder="Enter GitHub username"
        onChange={(event) => setLogin(event.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
