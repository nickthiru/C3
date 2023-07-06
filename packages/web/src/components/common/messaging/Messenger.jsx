import { MessageBroker } from "./MessageBroker";
import { AwsGateway } from "./AwsGateway";

export default function Messenger() {
  return (
    <>
      <AwsGateway />
      <MessageBroker />
    </>
  );
}
