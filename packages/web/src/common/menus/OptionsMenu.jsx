import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function OptionsMenu() {
  const [signOut, setSignOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (signOut) {
      //
      secureLocalStorage.removeItem("token");
      secureLocalStorage.setItem("isLoggedIn", false);
      // Close websocket connection;
      navigate("/");
    }
  });

  function handleSignOut() {
    setSignOut(true);
  }

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={handleSignOut}>Sign Out</a>
        </li>
      </ul>
    </div>
  );
}
