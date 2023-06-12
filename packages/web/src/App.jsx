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

import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
