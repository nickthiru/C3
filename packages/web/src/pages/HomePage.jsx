import Header from "../components/common/header/Header";
import DisplayPane from "../components/common/DisplayPane";
import WebSocket from "../components/websocket/WebSocket";

export default function HomePage(props) {
  return (
    <>
      <WebSocket jwtToken={props.jwtToken} />
      <Header />
      <DisplayPane />
    </>
  );
}
