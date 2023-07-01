export default function OptionsMenu() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Sign Out</a>
        </li>
      </ul>
    </div>
  );
}
