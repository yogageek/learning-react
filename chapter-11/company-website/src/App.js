import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import {
  Home,
  About,
  Events,
  Products,
  Contact,
  Whoops404,
  Services,
  History,
  Location
} from "./pages";

/**
 * App 組件 - 應用程式的主進入點與路由配置中心
 */
function App() {
  /**
   * useRoutes 鉤子 (Hook)：
   * 這是 React Router v6 提供的一種「宣告式」路由配置方式。
   */
  let element = useRoutes([
    { path: "/", element: <Home /> },

    {
      path: "about",
      element: <About />,
      children: [
        {
          path: "services",
          element: <Services />
        },
        { path: "history", element: <History /> },
        {
          path: "location",
          element: <Location />
        }
      ]
    },

    { path: "events", element: <Events /> },
    { path: "products", element: <Products /> },
    { path: "contact", element: <Contact /> },

    /**
     * 萬用字元路徑 (Wildcard Path)：捕捉 404
     */
    { path: "*", element: <Whoops404 /> },

    /**
     * 重新導向實作：
     * 注意：在 v6 中，原本的 Redirect 已經改為使用 <Navigate /> 組件。
     */
    {
      path: "services",
      element: <Navigate to="/about/services" />
    }
  ]);

  return element;
}

export default App;

// 以下是原本被註解掉的程式碼 (保留作為參考)
// import React from "react";
// import {
//   Routes,
//   Route
// } from "react-router-dom";
// import {
//   Home,
//   About,
//   Events,
//   Products,
//   Contact,
//   Whoops404,
//   Services,
//   History,
//   Location
// } from "./pages";

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="about" element={<About />}>
//           <Route
//             path="services"
//             element={<Services />}
//           />

//           <Route
//             path="history"
//             element={<History />}
//           />
//           <Route
//             path="location"
//             element={<Location />}
//           />
//         </Route>
//         <Route
//           path="events"
//           element={<Events />}
//         />
//         <Route
//           path="products"
//           element={<Products />}
//         />
//         <Route
//           path="contact"
//           element={<Contact />}
//         />
//         {/* 原本的 Redirect 寫法 */}
//         {/* <Redirect
//           from="services"
//           to="about/services"
//         /> */}
//         <Route path="*" element={<Whoops404 />} />
//       </Routes>
//     </div>
//   );
// }
