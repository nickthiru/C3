// import WebSocket from "./utils/WebSocket";
// import Header from "./common/Header";
// import Navigation from "./common/Navigation";
// import Map from "./map/Map";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import { useState } from "react";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  // Check if user is already logged in. If so, go straight to "/home".
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />}></Route>
        </Routes>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
