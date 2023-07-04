import { MessageBroker } from "./MessageBroker";
import { AwsGateway } from "./AwsGateway";

export default function Messaging() {
  return (
    <>
      <AwsGateway />
      <MessageBroker />
    </>
  );
}
