// import WebSocketConnection from "./utils/WebSocketConnection";
// import Header from "./common/Header";
// import Navigation from "./common/Navigation";
// import Map from "./map/Map";
// import "./App.css";

// export default function App() {
//   return (
//     <>
//       <Header />
//       <Navigation />
//       <Map />
//     </>
//   );
// }

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
