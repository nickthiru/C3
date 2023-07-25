// import Map from "./map/Map";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import LoggedInRoutes from "./routes/LoggedInRoutes.jsx";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<LoginPage />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<HomePage />} exact />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
