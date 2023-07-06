import Header from "../../components/header/Header";
import MessageBroker from "../../utils/messaging/Messenger";

export default function HomePage(props) {
  return (
    <>
      <MessageBroker />
      <Header />
      <DisplayPane />
    </>
  );
}
