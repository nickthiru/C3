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

import Login from "./components/common/Login.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
