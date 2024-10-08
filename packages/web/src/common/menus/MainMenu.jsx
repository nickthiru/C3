import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <li>
          <Link to="/" onClick={() => console.log("nothing")}>
            Map
          </Link>
        </li>
        <li>
          <Link to="device">Devices</Link>
        </li>
      </ul>
    </div>
  );
}
