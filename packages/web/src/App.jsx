// import WebSocketConnection from "./utils/WebSocketConnection";
import Header from "./common/Header";
import Navigation from "./common/Navigation";
import Map from "./map/Map";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Map />
    </>
  );
}
