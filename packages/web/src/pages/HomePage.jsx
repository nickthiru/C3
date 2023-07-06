import Header from "../components/common/header/Header";
import MessageBroker from "../components/common/messaging/Messenger";
import DisplayPane from "../components/common/DisplayPane";

export default function HomePage(props) {
  return (
    <>
      <MessageBroker />
      <Header />
      <DisplayPane />
    </>
  );
}
