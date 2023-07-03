// import WebSocket from "./utils/WebSocket";
// import Header from "./common/Header";
// import Navigation from "./common/Navigation";
// import Map from "./map/Map";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import "dotenv/config";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useState(false);

  let jwtToken = "";

  function onLogin(token) {
    jwtToken = token;
    setIsLoggedIn(true);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={onLogin} />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/home"
            element={<HomePage jwtToken={jwtToken} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
