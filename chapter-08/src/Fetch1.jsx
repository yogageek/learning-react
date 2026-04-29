import React, { useState, useEffect } from "react";

function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error,
  };
}

export default function Fetch1({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}) {
  const { loading, data, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}


/*
Fetch.jsx -- 通用資料抓取元件

useFetch 是 custom hook，負責 fetch 邏輯，管理 loading、data、error 三個狀態。

Fetch component 把結果對應到三種畫面：loading 顯示 fallback，error 顯示錯誤，data 成功就呼叫 renderSuccess。

設計重點：Fetch 不管資料怎麼顯示，顯示邏輯由外部的 renderSuccess 決定。
*/
