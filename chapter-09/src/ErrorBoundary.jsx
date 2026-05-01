import React, { Component } from "react";

//錯誤邊界

function ErrorScreen({ error }) {
  return (
    <section className="error">
      <h1>Error Boundary: Something went wrong.</h1>
      <pre>{error.message}</pre>
    </section>
  );
}
// 當子元件拋錯時，把錯誤物件存進 state，後續改顯示 Fallback UI。
export default class ErrorBoundary extends Component {
  state = { error: null };

  // React 在後代元件 render 失敗時會呼叫這個 static method，
  // 讓 ErrorBoundary 能根據錯誤更新自己的 state。
  // 等於把 state 變成：
  // this.state = {
  //   error: 那個錯誤物件
  // }
  static getDerivedStateFromError(error) {
    return { error };
  }


  render() {
    const { error } = this.state;
    const { children, fallback: Fallback } = this.props;

    // 然後 render() 裡就可以根據這個 state 決定要不要顯示 Fallback UI。
    if (error &&! Fallback) return <ErrorScreen error={error}></ErrorScreen>; // 如果有錯誤，但沒有傳入 Fallback，就 render 預設的 ErrorScreen. 
    if (error) return <Fallback error={error} />; // 一旦捕捉到錯誤，就改 render 備援畫面，而不是原本的 children。

    return children;// 沒有錯誤時，正常顯示被 ErrorBoundary 包住的內容。
  }
}
