import { useState, useEffect } from "react";
import AuthService from "../../services/auth-service.js";
import { Navigate } from "react-router-dom";
import { secureLocalStorage as store } from "react-secure-storage";
import EmailInput from "./components/EmailInput.jsx";
import PasswordInput from "./components/PasswordInput.jsx";
import ForgetPasswordLink from "./components/ForgetPasswordLink.jsx";
import LoginButton from "./components/LoginButton.jsx";
import Heading from "./components/Heading.jsx";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  const authService = AuthService();

  useEffect(() => {
    if (token) store.setItem("token", token);
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (username && password) {
      const loginResponse = await authService.login(username, password);
      if (loginResponse) {
        setToken(loginResponse.signInUserSession.accessToken.jwtToken);
        props.onLogin();
      } else {
        setErrorMessage("Invalid credentials");
      }
    } else {
      setErrorMessage("Username and password required!");
    }

    setUsername("");
    setPassword("");
  }

  // function renderLoginResult() {
  //   if (errorMessage) {
  //     return <label>{errorMessage}</label>
  //   }
  // }

  // return (
  //   <div role="main">
  //   {loginSuccess && <Navigate to="/home" replace={true} />}
  //   <h2>Please Login</h2>
  //   </div>
  // );

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <Heading />
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <EmailInput />
          <PasswordInput />
          <ForgetPasswordLink />
          <LoginButton />
        </form>
      </div>
    </div>
  );
}
