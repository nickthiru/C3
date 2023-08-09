// import Map from "./map/Map";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import MapPage from "./pages/map/MapPage.jsx";
import DeviceMgmtPage from "./pages/device-mgmt/DeviceMgmtPage.jsx";
import LoggedInRoutes from "./routes/LoggedInRoutes.jsx";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes.jsx";
import Header from "./common/header/Header.jsx";

export default function App() {
  const [token, setToken] = useState(() => secureLocalStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      secureLocalStorage.clear("token");
      console.log(
        "token cleared in 'useEffect': " + secureLocalStorage.getItem("token")
      );
    } else {
      secureLocalStorage.setItem("token", token);
      console.log(
        "token set in 'useEffect': " + secureLocalStorage.getItem("token")
      );
    }
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
          <Route path="/" element={<HomePage />} exact>
            {/* <Route path="map" element={<MapPage />} /> */}
            <Route index element={<MapPage />} />
            <Route path="device" element={<DeviceMgmtPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
