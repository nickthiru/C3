import Header from "../../common/header/Header.jsx";
import DisplayPane from "../../common/DisplayPane.jsx";
import Messenger from "../../utils/messaging/Messenger.jsx";

export default function HomePage() {
  return (
    <>
      <Messenger />
      <Header />
      <DisplayPane />
    </>
  );
}
