const { Stack } = require('aws-cdk-lib');
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");


class ToWebClientSnsToSqsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { webSocketStack, deviceMgmtStack } = props;

    const queue = webSocketStack.webSocketToWebClientRouteQueue;

    new SnsToSqs(this, "provisionDeviceWorkflowCompletedSnsToSqs", {
      existingTopicObj: deviceMgmtStack.provisionDeviceWorkflowCompletedTopic,
      existingQueueObj: queue
    });
  }
}

module.exports = { ToWebClientSnsToSqsStack };