// import Map from "./map/Map";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import LoggedInRoutes from "./routes/LoggedInRoutes.jsx";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes.jsx";
import Header from "./common/header/Header.jsx";

export default function App() {
  const [token, setToken] = useState(() => secureLocalStorage.getItem("token"));

  useEffect(() => {
    secureLocalStorage.setItem("token", token);
    console.log(secureLocalStorage.getItem("token"));
  }, [token]);

  return (
    <>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route
          element={<NotLoggedInRoutes token={token} setToken={setToken} />}
        >
          <Route path="/login" element={<LoginPage />} exact />
        </Route>
        <Route element={<LoggedInRoutes token={token} setToken={setToken} />}>
          <Route path="/" element={<HomePage />} exact />
        </Route>
      </Routes>
    </>
  );
}
