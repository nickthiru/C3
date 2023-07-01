// import WebSocket from "./utils/WebSocket";
// import Header from "./common/Header";
// import Navigation from "./common/Navigation";
// import Map from "./map/Map";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export default function App() {
  let jwtToken = "";

  function onLoginSaveJwtToken(token) {
    jwtToken = token;
    console.log(jwtToken);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLoginSaveJwtToken={onLoginSaveJwtToken} />}
          ></Route>
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
