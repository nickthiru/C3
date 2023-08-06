import { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { CdkStackWebSocketStackB6D3D0A7 as websocketStack } from "../../../../../cdk/outputs.json";
import secureLocalStorage from "react-secure-storage";

// const token = secureLocalStorage.getItem("token");

export default function WebSocket() {
  console.log("Inside 'Websocket' component'");

  const [token] = useState(() => secureLocalStorage.getItem("token"));
  console.log("token: " + token);

  useWebSocket(`${websocketStack.DevStageWebSocketApiEndpoint}`, {
    queryParams: { token: token },
    onOpen: (event) => console.log("(+) WebSocket connection opened"),
    onMessage: (message) => console.log(message),
    onClose: (event) => console.log("(+) WebSocket connection closed"),
    // Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (event) => true,
  });

  return null;
}
