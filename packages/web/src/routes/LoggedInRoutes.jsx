import { useRef } from "react";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import LoginPage from "../pages/login/LoginPage";

export default function LoggedInRoutes() {
  console.log("Inside 'LoggedInRoutes'");
  // const isLoggedIn = useRef(secureLocalStorage.getItem("isLoggedIn"));
  const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
  // const isLoggedIn = false;
  console.log("isLoggedIn: " + isLoggedIn);
  // return isLoggedIn.current ? <Outlet /> : <LoginPage />;
  return isLoggedIn ? <Outlet /> : <LoginPage />;
}
