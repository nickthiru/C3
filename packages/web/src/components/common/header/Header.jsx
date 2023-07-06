import MainMenu from "../menus/main-menu";
import OptionsMenu from "../menus/options-menu";
import MainMenuButton from "./main-menu-button";
import OptionsMenuButton from "./options-menu-button";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="drawer">
          <MainMenuButton />
          <MainMenu />
        </div>
      </div>
      <div className="flex-none">
        <div className="drawer drawer-end">
          <OptionsMenuButton />
          <OptionsMenu />
        </div>
      </div>
    </div>
  );
}
