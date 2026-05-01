import React, { useState, useEffect } from "react";


//自訂義Hook做個綜合，組合useState 和 useEffect。
//只要loading ,data,error 狀態一有變化，就會重新渲染原件。
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


//fetch元件抽象資料處理與渲染的機制。處理等待資料時的顯示，成功時返回，錯誤時返回等等
export default function Fetch1(
  { uri,
    renderSuccess,
    loadingFallback = <p>loading...</p>,
    renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
  }) {
  const { loading, data, error } = useFetch(uri); //打api,有拿到data的話,放進外面傳進來的renderSuccess裡,讓外面決定要怎麼顯示資料
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
