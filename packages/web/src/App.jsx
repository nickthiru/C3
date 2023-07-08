// import Map from "./map/Map";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import Header from "./common/header/Header.jsx";
import Messenger from "../../utils/messaging/Messenger.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleOnLogin() {
    setIsLoggedIn(true);
  }

  console.log("isLoggedIn: " + isLoggedIn);

  // Check if user is already logged in. If so, go straight to "/map".
  return (
    <>
      <BrowserRouter>
        <Header />

        {
          /* Only initiate Messenger if user is logged in */
          isLoggedIn ? <Messenger /> : null
        }

        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleOnLogin} />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
