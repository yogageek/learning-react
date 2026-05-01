import React, { useState, Suspense, lazy } from "react";
import Agreement from "./Agreement";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ErrorBoundary from "./ErrorBoundary";

// React.lazy() 是 React 的一個功能，讓你可以把某個元件的載入延遲到真正需要它的時候才進行。
// 這樣可以減少初始載入的時間，提升使用者體驗。

const Main = lazy(() => import("./Main"))

// const Main = lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => resolve(import("./Main")), 2000);
//     })
// );


export default function App() {

  const [agree, setAgree] = useState(false);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  return (// Suspense 是 React 的一個功能，讓你可以在等待某些東西（通常是元件）載入時，顯示一個備援畫面（Fallback）。這裡的備援畫面是一個叫 ClimbingBoxLoader 的載入動畫。
    <Suspense fallback={<ClimbingBoxLoader />}>
      <Main />
    </Suspense>
  );
}




