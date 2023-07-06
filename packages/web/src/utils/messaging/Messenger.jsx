import { MessageBroker } from "./components/MessageBroker";
import { AwsGateway } from "./AwsGateway";

export default function Messenger() {
  return (
    <>
      <AwsGateway />
      <MessageBroker />
    </>
  );
}
