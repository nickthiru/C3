import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import LoginPage from "../pages/login/LoginPage";

export default function NotLoggedInRoutes() {
  console.log("Inside 'NotLoggedInRoutes'");
  // const isLoggedIn = useRef(secureLocalStorage.getItem("isLoggedIn"));
  const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
  // const isLoggedIn = true;
  console.log("isLoggedIn: " + isLoggedIn);
  // return isLoggedIn.current ? <Outlet /> : <LoginPage />;
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}
