// import Map from "./map/Map";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import LoggedInRoutes from "./routes/LoggedInRoutes.jsx";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes.jsx";
import Header from "./common/header/Header.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const setIsLoggedInTest = () =>
  //   console.log("This is the 'setIsLoggedInTest function");

  // function handleSuccessfulLogin() {
  //   setIsLoggedIn(true);
  // }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          element={
            <NotLoggedInRoutes
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        >
          <Route path="/login" element={<LoginPage />} exact />
        </Route>
        <Route element={<LoggedInRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<HomePage />} exact />
        </Route>
      </Routes>
    </>
  );
}

// import LoginPage from "./pages/login/LoginPage.jsx";
// import HomePage from "./pages/home/HomePage.jsx";
// import LoggedInRoutes from "./routes/LoggedInRoutes.jsx";
// import NotLoggedInRoutes from "./routes/NotLoggedInRoutes.jsx";
// import { useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";

// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import { useRef } from "react";

// import Protected from "./common/Protected.jsx";
// import LoginPage from "./pages/login/LoginPage.jsx";
// import HomePage from "./pages/home/HomePage.jsx";
// import Header from "./common/header/Header.jsx";
// import Messenger from "./utils/messaging/Messenger.jsx";

// export default function App() {
//   const navigate = useNavigate();
//   let isLoggedIn = useRef(false);

//   if (isLoggedIn === true) {
//     navigate("/app");
//   } else {
//     navigate("/");
//   }

//   function handleLogin() {
//     isLoggedIn = true;
//   }

//   console.log("isLoggedIn: " + isLoggedIn.current);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
//         <Route
//           path="/app"
//           element={
//             <Protected isLoggedIn={isLoggedIn}>
//               <Messenger />
//               <Header />
//               <Route path="/home" element={<HomePage />} />
//             </Protected>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
