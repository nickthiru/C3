import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";

export default function LoggedInRoutes({ token, setToken }) {
  console.log("Inside 'LoggedInRoutes'");
  console.log("token: " + token);

  return token ? (
    <Outlet context={[token, setToken]} />
  ) : (
    <Navigate to="/login" />
  );
}
