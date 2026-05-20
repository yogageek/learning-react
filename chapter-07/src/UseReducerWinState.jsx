import React, { useState,useReducer } from "react";

const firstUser = {
  id: "0391-3233-3201",
  firstName: "Bill",
  lastName: "Wilson",
  city: "Missoula",
  state: "Montana",
  email: "bwilson@mtnwilsons.com",
  admin: false
};

function User() {
//const [user, setUser] = useState(firstUser);

  const [user, setUser] = useReducer(
    (user, newDetails) => ({ ...user, ...newDetails }),
    //  ↑ 舊state  ↑ dispatch傳入的部分更新
    //  reducer 自己負責 spread，呼叫端不用管
    firstUser
  );
    // 跟上面邏輯完全一樣
    // 只是把變數名從 user/newDetails 改成 state/newState
    // 語意更通用，適合抽成共用 hook
    // const [state, setState] = useReducer(
    // (state, newState) => ({ ...state, ...newState }),
    // initialState  // 變數名也從 firstUser 改成 initialState
    // );

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName} - {user.admin ? "Admin" : "User"}
      </h1>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.city}, {user.state}
      </p>
      <button
        // 更新時要手動展開整個物件，只改 admin
        // onClick={() => {
        //   setUser({ ...user, admin: true });
        //                ↑ 必須自己 spread，否則其他欄位會消失
        // }}

        // 只傳要改的欄位，reducer 自動合併
        onClick={() => setUser({ admin: true })}
        //                ↑ 乾淨，不用 spread
      >
        Make Admin
      </button>
    </div>
  );
}

export default function App() {
  return <User />;
}
