import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import AuthService from "../../services/auth-service.js";

export default function LoginPage(props) {
  let token = "";
  const navigate = useNavigate();

  if (props.isLoggedIn) navigate("/app");

  const username = useRef("");
  const password = useRef("");
  const errorMessage = useRef("");

  const authService = AuthService();

  useEffect(() => {
    secureLocalStorage.setItem("token", token);
    navigate("/app");
    props.onLogin();
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (username.current && password.current) {
      const loginResponse = await authService.login(
        username.current,
        password.current
      );
      if (loginResponse) {
        token = loginResponse.signInUserSession.accessToken.jwtToken;
      } else {
        errorMessage.current = "Invalid credentials";
        console.log(errorMessage.current);
      }
    } else {
      errorMessage.current = "Username and password required!";
      console.log(errorMessage.current);
    }

    username.current = "";
    password.current = "";
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
              value={username.current}
              className="w-full input input-bordered"
              onChange={(e) => (username.current = e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              value={password.current}
              className="w-full input input-bordered"
              onChange={(e) => (password.current = e.target.value)}
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
