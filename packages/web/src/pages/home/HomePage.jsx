import { Outlet } from "react-router-dom";

// import PageContainer from "../../common/PageContainer.jsx";
import Messenger from "../../utils/messaging/Messenger.jsx";

export default function HomePage() {
  return (
    <>
      <Messenger />
      <Outlet />
    </>
  );
}
