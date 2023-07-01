import useWebSocket from "react-use-websocket";

const WS_URL = "wss://b8mugj9jfi.execute-api.us-east-1.amazonaws.com/dev";

export default function WebSocket({ onMessage }) {
  useWebSocket(WS_URL, {
    onOpen: (event) => console.log("(+) WebSocket connection opened"),
    onMessage: onMessage,
    onClose: (event) => console.log("(+) WebSocket connection closed"),
    // Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (event) => true,
  });

  return null;
}
