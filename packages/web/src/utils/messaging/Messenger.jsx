// import { MessageBroker } from "./components/MessageBroker";
import WebSocket from "./components/WebSocket.jsx";

export default function Messenger() {
  return (
    <>
      {console.log("Inside 'Messenger' component")}
      <WebSocket />
      {/* <MessageBroker /> */}
    </>
  );
}
