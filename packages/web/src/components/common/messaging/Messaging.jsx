import { MessageBroker } from "./message-broker";
import { AwsGateway } from "./aws-gateway";

export default function Messaging() {
  return (
    <>
      <AwsGateway />
      <MessageBroker />
    </>
  );
}
