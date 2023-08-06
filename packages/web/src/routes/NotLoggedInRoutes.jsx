import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes({ token, setToken }) {
  console.log("Inside 'NotLoggedInRoutes'");
  return token ? <Navigate to="/" /> : <Outlet context={[token, setToken]} />;
}
