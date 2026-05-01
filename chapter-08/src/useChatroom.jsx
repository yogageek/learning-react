import { useReducer , useEffect, useRef, useState } from "react";
// import { socket } from "socket.io";

const reducer = (messages, incomingMessage) => [
  messages,
  ...incomingMessage
]

// export function useChatRoom(socket, messages = []) {
export function useChatRoom(socket) {

  const [status, setStatus] = useState(null);
  const [messages, appendMessages] = useReducer(
    reducer,
    messages
  );

  const send = message => socket.emit("message", message);

  useEffect(() => {

    socket.on("connection", connection);
    const connection = () => {
      setStatus("connected");
    };

    socket.on("disconnect", disconnect);
    const disconnect = () => {
      setStatus("disconnected");
    };

    socket.on("message", setStatus);

    return () => {
      socket.removeAllListeners("connect");
      socket.removeAllListeners("disconnect");
      socket.removeAllListeners("message");
    };
  }, []);

  return {
    messages,
    status,
    send
  };
}

/*
useChatroom.jsx

這是一個自訂 Hook，用來把 Socket.io 的聊天室邏輯集中管理。

1. messages
   使用 useState 保存目前收到的所有訊息。
   每當 socket 收到 "message" 事件時，就把新訊息加到陣列尾端。

2. status
   使用 useState 保存目前 WebSocket 連線狀態。
   當 socket 觸發 "connect" 事件時，狀態改成 "connected"。
   當 socket 觸發 "disconnect" 事件時，狀態改成 "disconnected"。

3. socketRef
   使用 useRef 保存 socket 實例。
   這樣不需要因為 socket 物件改變而重新 render。

4. useEffect
   元件掛載後建立 socket 連線，並註冊 listeners。
   元件卸載時移除 listeners，並呼叫 disconnect() 關閉連線。

5. send
   send(message) 會透過 socket.emit("message", message) 發送訊息。
   如果目前尚未連線，就直接 return，避免送出失敗。

6. 回傳值
   這個 Hook 會回傳一個物件：
   - messages: 訊息陣列
   - status: 連線狀態
   - send: 發送訊息的函式

使用方式範例：

const { messages, status, send } = useChatroom("http://localhost:3000");
*/
