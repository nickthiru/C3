import MainMenu from "../MainMenu";
import OptionsMenu from "../OptionsMenu";
import MainMenuButton from "./MainMenuButton";
import OptionsMenuButton from "./OptionsMenuButton";

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
