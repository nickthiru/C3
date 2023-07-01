import { useState } from "react";
import AuthService from "../services/AuthService.js";
import { Navigate } from "react-router-dom";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const authService = AuthService();

  let token = ""; // Maybe should declare this outside the component? (keep it private)

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (username && password) {
      const loginResponse = await authService.login(username, password);
      if (loginResponse) {
        setLoginSuccess(true);
        token = loginResponse.signInUserSession.accessToken.jwtToken;
      } else {
        setErrorMessage("Invalid credentials");
      }
    } else {
      setErrorMessage("Username and password required!");
    }

    props.onLoginSaveJwtToken(token);

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
