# Chapter 4 : Pure React

If you take the time to understand what is going on behind the scenes you will be more efficient, especially when
it comes time to debug.

<!--
章節重點：不用 JSX，直接用 React.createElement 與 ReactDOM.render 理解 React 底層。
學習順序：01-page-setup（環境 + 靜態 HTML）→ 02-react-elements（元素樹）→ 03-react-components（元件封裝 + props）
-->

## Samples

### Page Setup

1. HTML Document Setup — 最小 React 頁面骨架（CDN、掛載點、空白 script） ([code](https://github.com/MoonHighway/learning-react/blob/master/chapter-04/01-page-setup/01-page-setup.html))
2. HTML for a Recipe — 純靜態食譜 HTML，作為後續 React 重建的參考 ([run it](https://github.com/MoonHighway/learning-react/blob/master/chapter-04/01-page-setup/02-baked-salmon.html))

### React Elements

1. Rendering an Element — `createElement` 與 `ReactDOM.render` 入門 ([run it](http://jsbin.com/polufak/1/edit?js,output))
2. Rendering an Element with Properties — 第二參數 props（id、data-type） ([run it](http://jsbin.com/polufak/2/edit?js,output))
3. Rendering Lists — 巢狀元素樹、`className` ([run it](http://jsbin.com/polufak/3/edit?js,output))
4. Mapping over Elements — 陣列 + `map` 產生動態 `li`（尚無 key） ([run it](http://jsbin.com/polufak/4/edit?js,output))
5. Adding Keys — 列表項加上 `key` ([run it](http://jsbin.com/polufak/5/edit?js,output))

### React Components

1. Rendering createElement — 函式元件封裝 `ul/li` ([run it](https://jsbin.com/dizifem/1/edit?js,output))
2. List Items as props — 類別元件 + `this.props.items` ([run it](https://jsbin.com/sedovap/1/edit?js,output))
