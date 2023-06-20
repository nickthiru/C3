// import "./landing-page.css";

// function Login() {
//   return (
//     <div id="signin" classNameName="w3-container w3-padding-large w3-grey tab">
//       <div classNameName="w3-section">
//         <label>Username</label>
//         <input
//           classNameName="w3-input w3-border"
//           type="text"
//           id="signin_username"
//           required
//         />
//       </div>
//       <div classNameName="w3-section">
//         <label>Password</label>
//         <input
//           classNameName="w3-input w3-border"
//           type="password"
//           id="signin_password"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         classNameName="w3-button w3-black w3-margin-bottom"
//         onClick={() => console.log("submit button clicked")}
//       >
//         Sign In
//       </button>
//       <div classNameName="w3-section" id="tokens">
//         <pre classNameName="" id="idToken"></pre>
//         <pre classNameName="" id="accessToken"></pre>
//       </div>
//     </div>
//   );
// }

// export default Login;

function Login() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          C3 App
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
