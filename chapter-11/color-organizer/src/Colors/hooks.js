/**
 * 此檔案定義了應用程式的所有自定義 Hooks 與 Context Provider，
 * 是整個應用程式的「狀態管理中心」。
 */
import React, {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useDebugValue
} from "react";
import { v4 } from "uuid";

/**
 * useInput 自定義 Hook：簡化表單輸入欄位的狀態管理。
 * @param {any} initialValue 初始值
 * @returns {Array} 包含屬性物件 {value, onChange} 與重置函式
 */
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  // 在 React DevTools 中顯示目前輸入的值
  useDebugValue(value);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

// 建立 Context 物件，用於跨組件傳遞資料
const ColorContext = createContext();

/**
 * useColors 自定義 Hook：讓組件能輕鬆存取 ColorContext。
 */
export const useColors = () => {
  const ctx = useContext(ColorContext);
  // 在 React DevTools 中顯示目前有的顏色數量
  useDebugValue(ctx.colors.length);
  return ctx;
};

/**
 * reducer 函式：處理顏色狀態的具體邏輯。
 * 這裡的 case 名稱（如 "ADD_COLOR"）是由 dispatch 函式呼叫時所傳入的 action 物件中的 type 屬性決定的。
 * 
 * 對應關係如下：
 * - dispatch({ type: "ADD_COLOR", ... }) -> 觸發 case "ADD_COLOR"
 * - dispatch({ type: "REMOVE_COLOR", ... }) -> 觸發 case "REMOVE_COLOR"
 * - dispatch({ type: "RATE_COLOR", ... }) -> 觸發 case "RATE_COLOR"
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COLOR": // 對應下方 addColor 函式中的 dispatch
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          color: action.payload.color,
          rating: 0
        }
      ];
    case "REMOVE_COLOR": // 對應下方 removeColor 函式中的 dispatch
      return state.filter(c => c.id !== action.payload.id);
    case "RATE_COLOR": // 對應下方 rateColor 函式中的 dispatch
      return state.map(c =>
        c.id !== action.payload.id ? c : { ...c, rating: action.payload.rating }
      );
    default:
      return state;
  }
};

/**
 * ColorProvider 組件：封裝狀態邏輯並提供給子組件。
 * @param {Object} props - React props
 * @param {ReactNode} props.children - 代表被此 Provider 包裹的所有子組件。
 * React 會自動將包裹在 <ColorProvider>...</ColorProvider> 之間的內容傳入此屬性。
 */
export const ColorProvider = ({ children }) => {
  // 1. 從 localStorage 初始化資料，若無則為空陣列
  const initColors = localStorage.getItem("colors");

  /**
   * useReducer Hook：用於處理較複雜的狀態邏輯。
   * - 第一個參數 (reducer)：定義「如何」更新狀態的函式。
   * - 第二個參數 (initialState)：初始狀態值。
   * 
   * 回傳值：
   * - _colors：目前的狀態快照。
   * - dispatch：觸發狀態更新的唯一函式，透過傳送 "action" 物件來告知 reducer 要做什麼。
   */
  const [_colors, dispatch] = useReducer(
    reducer,
    initColors ? JSON.parse(initColors) : []
  );

  // 2. 效能優化：只有當 _colors 改變時才重新計算 colors 物件
  const colors = useMemo(() => _colors, [_colors]);

  // 3. 定義操作方法，並使用 useCallback 確保函式身份穩定
  const addColor = useCallback((title, color) =>
    dispatch({
      type: "ADD_COLOR",
      payload: {
        id: v4(),
        title,
        color
      }
    })
  );

  const removeColor = useCallback(id => {
    dispatch({
      type: "REMOVE_COLOR",
      payload: { id }
    });
  });

  const rateColor = useCallback((id, rating) => {
    dispatch({
      type: "RATE_COLOR",
      payload: { id, rating }
    });
  });

  // 4. 當 colors 狀態改變時，自動同步回 localStorage
  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  return (
    <ColorContext.Provider value={{ colors, addColor, rateColor, removeColor }}>
      {children}
    </ColorContext.Provider>
  );
};
