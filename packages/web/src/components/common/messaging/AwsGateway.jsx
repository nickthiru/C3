import useWebSocket from "react-use-websocket";

// Use Context to get the JWT

// Get this constant from "C3/packages/cdk/outputs.json"
const WS_URL = "";

export default function WebSocket(props) {
  useWebSocket(WS_URL, {
    onOpen: (event) => console.log("(+) WebSocket connection opened"),
    onMessage: props.onMessageHandler(message),
    onClose: (event) => console.log("(+) WebSocket connection closed"),
    // Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (event) => true,
  });

  return null;
}
