// import Map from "./map/Map";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useRef } from "react";

import Protected from "./common/Protected.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import Header from "./common/header/Header.jsx";
import Messenger from "./utils/messaging/Messenger.jsx";

export default function App() {
  const navigate = useNavigate();
  let isLoggedIn = useRef(false);

  if (isLoggedIn === true) {
    navigate("/app");
  } else {
    navigate("/");
  }

  function handleLogin() {
    isLoggedIn = true;
  }

  console.log("isLoggedIn: " + isLoggedIn.current);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/app"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Messenger />
              <Header />
              <Route path="/home" element={<HomePage />} />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
