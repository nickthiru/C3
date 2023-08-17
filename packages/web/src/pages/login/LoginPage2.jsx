import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// import AuthService from "../../services/auth-service.js";

export default function LoginPage() {
  console.log("Inside 'Login Page'");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [token, setToken] = useOutletContext();

  const navigate = useNavigate();

  console.log("token: " + token);

  if (token) navigate("/");

  // const authService = AuthService();

  async function handleFormSubmit(e) {
    e.preventDefault();

    console.log("Inside 'handleFormSubmit'");

    if (username && password) {
      // const loginResponse = await authService.login(username, password);
      const loginResponse = true;
      if (loginResponse) {
        // setToken(loginResponse.signInUserSession.accessToken.jwtToken);
        setToken("dummytoken");
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
