const { Construct } = require("constructs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");

class SendEventToWebClientIntegration extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { outputEventTopic, webSocketToWebClientRouteQueue } = props;

    new SnsToSqs(this, `${outputEventTopic.topicName}SnsToSqs`, {
      // encryptionKeyProps: { alias: `${outputEventTopic.topicName}SnsToSqsEncryptionKeyAlias` },
      existingTopicObj: outputEventTopic,
      existingQueueObj: webSocketToWebClientRouteQueue  //
    });
  }
}

module.exports = { SendEventToWebClientIntegration }