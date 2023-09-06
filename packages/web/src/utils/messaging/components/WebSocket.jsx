import { useState } from "react";
import useWebSocket from "react-use-websocket";
import secureLocalStorage from "react-secure-storage";

import { WebSocketStack } from "../../../../../cdk/outputs.json";

export default function WebSocket() {
  const [token] = useState(() => secureLocalStorage.getItem("token"));
  console.log("Inside 'Websocket' component'");
  console.log("token: " + token);

  useWebSocket(`${WebSocketStack.DevStageWebSocketApiEndpoint}`, {
    queryParams: {
      token: token,
    },
    onOpen: (event) => {
      console.log("(+) WebSocket connection opened");
      console.log("Received 'event' onOpen: " + JSON.stringify(event));
    },
    onMessage: (message) => {
      console.log("Received 'message' onMessage: " + JSON.stringify(message));
    },
    onClose: (event) => {
      console.log("(+) WebSocket connection closed");
      console.log("Received 'event' onClose: " + JSON.stringify(event));
    },
    // Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (event) => {
      console.log("Received 'event' shouldReconnect: " + JSON.stringify(event));
      return true;
    },
  });

  return null;
}
