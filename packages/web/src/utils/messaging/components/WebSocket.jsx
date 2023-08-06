import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { CdkStackWebSocketStackB6D3D0A7 as websocketStack } from "../../../../../cdk/outputs.json";
import secureLocalStorage from "react-secure-storage";

export default function WebSocket() {
  const [token] = useState(() => secureLocalStorage.getItem("token"));
  console.log("Inside 'Websocket' component'");
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
