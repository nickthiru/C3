const { Stack } = require('aws-cdk-lib');
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");


class ToWebClientSubscriptionsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { deviceMgmtStack, webSocketStack } = props;

    new SnsToSqs(this, "provisionDeviceWorkflowCompletedSnsToSqs", {
      existingTopicObj: deviceMgmtStack.provisionDeviceWorkflowCompletedTopic,
      existingQueueObj: webSocketStack.webSocketToWebClientRouteQueue
    });
  }
}

module.exports = { ToWebClientSubscriptionsStack };