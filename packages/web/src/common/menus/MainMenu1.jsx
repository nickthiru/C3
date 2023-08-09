export default function MainMenu() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <li>
          <a>Map</a>
        </li>
        <li>
          <a>Devices</a>
        </li>
      </ul>
    </div>
  );
}
