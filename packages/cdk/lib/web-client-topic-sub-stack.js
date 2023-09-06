const { Stack, Fn } = require('aws-cdk-lib');
// const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
// const { Topic } = require('aws-cdk-lib/aws-sns');


const webClientSubsciptionEvents = [
  "ProvisionDeviceWorkflowCompleted"
]


class WebClientTopicSubscriptionsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // const webSocketToWebClientRouteQueue = Queue.fromQueueArn(this, "WebSocketToWebClientRouteQueue", Fn.importValue("WebSocketToWebClientRouteQueueArn"));

    const {
      webSocketStack,
      deviceManagementStack
    } = props;

    const queue = webSocketStack.webSocketToWebClientRouteQueue

    webClientSubsciptionEvents.forEach(event => {
      // const topic = Topic.fromTopicArn(this, `${event}Topic`, Fn.importValue(`${event}TopicArn`))

      new SnsToSqs(this, `${event}SnsToSqs`, {
        existingTopicObj: deviceManagementStack.provisionDeviceWorkflowStack.,
        existingQueueObj: queue
      });
    });
  }
}

module.exports = { WebClientTopicSubscriptionsStack };