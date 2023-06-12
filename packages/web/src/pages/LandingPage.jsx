import "./landing-page.css";

function LandingPage() {
  return (
    <div id="signin" className="w3-container w3-padding-large w3-grey tab">
      <div className="w3-section">
        <label>Username</label>
        <input
          className="w3-input w3-border"
          type="text"
          id="signin_username"
          required
        />
      </div>
      <div className="w3-section">
        <label>Password</label>
        <input
          className="w3-input w3-border"
          type="password"
          id="signin_password"
          required
        />
      </div>
      <button
        type="submit"
        className="w3-button w3-black w3-margin-bottom"
        onClick={() => console.log("submit button clicked")}
      >
        Sign In
      </button>
      <div className="w3-section" id="tokens">
        <pre className="" id="idToken"></pre>
        <pre className="" id="accessToken"></pre>
      </div>
    </div>
  );
}

export default LandingPage;
