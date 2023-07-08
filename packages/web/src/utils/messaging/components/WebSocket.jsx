import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { CdkStackWebSocketStackB6D3D0A7 as ws } from "../../../../../cdk/outputs.json";
import secureLocalStorage from "react-secure-storage";

const WS_URL = `${ws.DevStageWebSocketApiEndpoint}`;
const token = secureLocalStorage.getItem("token");

export default function WebSocket() {
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   setToken(secureLocalStorage.getItem("token"));
  //   console.log("token: " + token);
  // }, [token]);

  useWebSocket(WS_URL, {
    queryParams: { token: token },
    onOpen: (event) => console.log("(+) WebSocket connection opened"),
    onMessage: (message) => console.log(message),
    onClose: (event) => console.log("(+) WebSocket connection closed"),
    // Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (event) => true,
  });

  return null;
}
