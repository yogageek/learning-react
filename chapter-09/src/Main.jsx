import React from "react";
import ErrorBoundary from "./ErrorBoundary";


// 就是「把 props 裡的 children、menu 拆出來，且 menu 沒傳時給它一個預設函式」。
// 但以你現在這段用途，menu = null 會更合理。

// 這裡的 children，就是 <SiteLayout>...</SiteLayout> 中間那一大段。
// 然後你在 return 裡寫：
// <div>{children}</div>
// 意思就是把那段內容顯示出來。
// 你可以把它理解成：
// props.menu = 開始標籤上的屬性
// props.children = 開始和結束標籤中間的東西
const SiteLayout = ({ children, menu = c => null }) => {
  return (
    <div className="site-container">
      <div>{menu}</div>
      <div>{children}</div>
    </div>
  );
};


const Menu = () => (
  <ErrorBoundary>
    <p style={{ color: "white" }}>TODO: Build Menu</p>
  </ErrorBoundary>
);

const Callout = ({ children }) => (
  <ErrorBoundary>
    <div className="callout">{children}</div>
  </ErrorBoundary>
);

function ErrorScreen({ error }) {
  return (
    <section className="error">
      <h1>Something went wrong.</h1>
      <pre>{error.message}</pre>
    </section>
  );
}

const BreakThings = () => {
  throw new Error("This is an error!")
}

export default function Main() {
  return (
    <SiteLayout menu={<Menu />}>

      <Callout>Welcome to the site</Callout>

      <ErrorBoundary>
        <h1>TODO: Home Page</h1>
        <p>Complete the main contents for this home page</p>
      </ErrorBoundary>

      <ErrorBoundary>
        {/* <BreakThings />  */}
      </ErrorBoundary>
      
      <ErrorBoundary fallback={ErrorScreen}>
        {/* <BreakThings /> */}
      </ErrorBoundary>

    </SiteLayout>
  );
}
