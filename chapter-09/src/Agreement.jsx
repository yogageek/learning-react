import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { GridLoader } from "react-spinners";

// 建構suspense風格的資料來源

// 模擬一個需要三秒才能回應的 API。
const threeSecondsGetId = new Promise((resolve) =>
  setTimeout(() => resolve({ id: "123" }), 3000)
);

// Promise 還沒完成時，read() 會 throw pending
// Promise 成功後，read() 會回傳資料
// Promise 失敗後，read() 會 throw error
function createResource(promiseObj) {
  let error,response;
  
  // 這裡的 then() 和 catch() 是 Promise 的方法，
  // 分別用來處理 Promise 成功和失敗的情況。
  promiseObj.then(r=> (response = r)).catch(e => (error = e));
  return {
    read() {
      if (error) throw error;
      if (response) return response;
      throw promiseObj;// 如果 Promise 還沒完成，就 throw 這個 Promise，讓 Suspense 知道要顯示備援畫面。
    },
  };
}
// 這裡的 resource 就是一個「suspense 風格的資料來源」，它有一個 read() 方法，會根據 Promise 的狀態來決定要回傳資料、拋出錯誤，還是拋出 pending。
const resource = createResource(threeSecondsGetId);

function GetId() {
  const result = resource.read();
  return <h1>id: {result.id}</h1>;
}

// 載入中：Suspense 顯示 GridLoader
// 成功：GetId 顯示 id: 123
// 失敗：ErrorBoundary 接住錯誤
export default function Agreement({ onAgree = f => f }) {//onAgree = f => f 只是預設空函式的簡寫，避免你沒傳 onAgree 時按鈕報錯
  return (
    <>
      <Suspense fallback={<GridLoader />}>
        <ErrorBoundary>
          <GetId />
        </ErrorBoundary>
      </Suspense>
      <div>
        <p>Terms...</p>
        <p>These are the terms and stuff. Do you agree?</p>
        <button onClick={onAgree}>I agree</button>
      </div>
    </>
  );
}

/*
大致流程是這樣：
render GetId
resource.read() 發現資料還沒好，throw pendingPromise
React 在 render 過程中接到這個 Promise
React 把這個 Promise 掛到目前這段 Suspense 邊界上
React 對這個 Promise 註冊「完成後通知我」的 callback
先顯示 fallback
Promise resolve 或 reject 時，React 收到通知
React 重新排程，再試一次 render 那段 subtree 

關鍵點在這裡：
React 不會等待 Promise 結果後「接住 return 值」
React 是先被你 throw 的 Promise 中斷 render
然後等 Promise 完成，再「重跑一次 render」
真正的資料是在下一次 render 時，由 read() 回傳
 */