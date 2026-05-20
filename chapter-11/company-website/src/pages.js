import React from "react";
import {
  Link,
  useLocation,
  Outlet
} from "react-router-dom";

/**
 * [首頁組件] Home
 * 
 * 作用：應用程式的主要落地頁。
 * 亮點：展示了導覽列的實作方式。
 * 
 * <Link> 標籤：
 * 這是 React Router 提供的專用組件，用來取代傳統的 <a href="...">。
 * 它會攔截瀏覽器的跳轉行為，改用 JavaScript 進行頁面切換，
 * 這樣可以實現「單頁應用 (SPA)」的效果，即頁面不會重新整理。
 */
export function Home() {
  return (
    <div>
      <h1>[Company Website]</h1>
      <nav>
        {/* 'to' 屬性指定要跳轉的路由路徑 */}
        <Link to="about">About</Link>
        <Link to="events">Events</Link>
        <Link to="products">Products</Link>
        <Link to="contact">Contact Us</Link>
      </nav>
    </div>
  );
}

/**
 * [關於我們組件] About
 * 
 * 作用：作為父層路由容器。
 * 
 * <Outlet /> 標籤：
 * 這是嵌套路由 (Nested Routes) 的靈魂。
 * 當網址匹配到 About 的子路徑（如 /about/services）時，
 * <Outlet /> 會自動變成該子組件（如 Services）的佔位符，
 * 讓子頁面內容顯示在 About 的框架之內。
 */
export function About() {
  return (
    <div>
      <h1>[About]</h1>
      {/* 子路由組件會在這裡渲染 */}
      <Outlet />
    </div>
  );
}

/**
 * [服務項目組件] Services
 * 作為 About 的子路由 (/about/services)
 */
export function Services() {
  return (
    <section>
      <h2>Our Services</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer nec odio.
        Praesent libero. Sed cursus ante dapibus
        diam. Sed nisi. Nulla quis sem at nibh
        elementum imperdiet. Duis sagittis ipsum.
        Praesent mauris. Fusce nec tellus sed
        augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class
        aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos
        himenaeos. Curabitur sodales ligula in
        libero.
      </p>
    </section>
  );
}

/**
 * [公司歷史組件] History
 * 作為 About 的子路由 (/about/history)
 */
export function History() {
  return (
    <section>
      <h2>Our History</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer nec odio.
        Praesent libero. Sed cursus ante dapibus
        diam. Sed nisi. Nulla quis sem at nibh
        elementum imperdiet. Duis sagittis ipsum.
        Praesent mauris. Fusce nec tellus sed
        augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class
        aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos
        himenaeos. Curabitur sodales ligula in
        libero.
      </p>
    </section>
  );
}

/**
 * [公司地點組件] Location
 * 作為 About 的子路由 (/about/location)
 */
export function Location() {
  return (
    <section>
      <h2>Our Location</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer nec odio.
        Praesent libero. Sed cursus ante dapibus
        diam. Sed nisi. Nulla quis sem at nibh
        elementum imperdiet. Duis sagittis ipsum.
        Praesent mauris. Fusce nec tellus sed
        augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class
        aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos
        himenaeos. Curabitur sodales ligula in
        libero.
      </p>
    </section>
  );
}

/**
 * [活動頁面] Events
 */
export function Events() {
  return (
    <div>
      <h1>[Events]</h1>
    </div>
  );
}

/**
 * [產品頁面] Products
 */
export function Products() {
  return (
    <div>
      <h1>[Products]</h1>
    </div>
  );
}

/**
 * [聯絡我們頁面] Contact
 */
export function Contact() {
  return (
    <div>
      <h1>[Contact]</h1>
    </div>
  );
}

/**
 * [404 錯誤頁面] Whoops404
 * 
 * 作用：捕捉所有未定義的無效路由。
 * 
 * useLocation() 鉤子：
 * 它是 React Router 提供的 Hook，用來獲取當前 URL 的詳細資訊（Location 對象）。
 * 我們可以從中提取 pathname（路徑名稱），告訴使用者到底是哪個網址找不到。
 */
export function Whoops404() {
  let location = useLocation();
  console.log(location); // 在控制台印出詳細的路由資訊
  return (
    <div>
      <h1>
        Resource not found at {location.pathname}
      </h1>
    </div>
  );
}
