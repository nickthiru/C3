import MainMenu from "../menus/MainMenu";
import OptionsMenu from "../menus/OptionsMenu";
import MainMenuButton from "./MainMenuButton";
import OptionsMenuButton from "./OptionsMenuButton";

// export default function Header({ token, setToken }) {
//   if (token) {
//     return (
//       <div className="navbar bg-base-100">
//         <div className="flex-1">
//           <div className="drawer">
//             <MainMenuButton />
//             <MainMenu />
//           </div>
//         </div>
//         <div className="flex-none">
//           <div className="drawer drawer-end">
//             <OptionsMenuButton />
//             <OptionsMenu setToken={setToken} />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

export default function Header({ token, setToken }) {
  if (token) {
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
            <OptionsMenu setToken={setToken} />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
