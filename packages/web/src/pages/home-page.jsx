import Header from "../components/common/header/header";
import MessageBroker from "../components/common/messaging/messaging";
import DisplayPane from "../components/common/display-pane";

export default function HomePage(props) {
  return (
    <>
      <MessageBroker />
      <Header />
      <DisplayPane />
    </>
  );
}
