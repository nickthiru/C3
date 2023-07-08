import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import AuthService from "../../services/auth-service.js";

import UsernameInput from "./components/UsernameInput.jsx";
import PasswordInput from "./components/PasswordInput.jsx";
import ForgetPasswordLink from "./components/ForgetPasswordLink.jsx";
import LoginButton from "./components/LoginButton.jsx";
import Heading from "./components/Heading.jsx";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  // console.log("props: " + JSON.stringify(props));

  const authService = AuthService();

  useEffect(() => {
    // console.log("useEffect token: " + token);
    if (token) {
      secureLocalStorage.setItem("token", token);
      // console.log("token: " + secureLocalStorage.getItem("token"));
    }
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
        console.log(errorMessage);
      }
    } else {
      setErrorMessage("Username and password required!");
      console.log(errorMessage);
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

  // return (
  //   <div className="relative flex flex-col justify-center h-screen overflow-hidden">
  //     <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
  //       <Heading />
  //       <form className="space-y-4" onSubmit={handleFormSubmit}>
  //         <UsernameInput username={username} onInput={setUsername} />
  //         <PasswordInput password={password} onInput={setPassword} />
  //         <ForgetPasswordLink />
  //         <LoginButton />
  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          C3 App
        </h1>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email/Username</span>
            </label>
            <input
              type="text"
              value={username}
              className="w-full input input-bordered"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              className="w-full input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
