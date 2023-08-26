const { Stack } = require("aws-cdk-lib");

// const { DeviceManagementTopicStack } = require("./topic.js");
// const { DeviceManagementLambdaStack } = require("./lambda.js");
// const { DeviceManagementQueueStack } = require("./queue.js");
// const { DeviceManagementSnsToSqsToLambdaStack } = require("./sns-sqs-lambda.js");

const { TopicStack } = require("./topic.js");
const { LambdaStack } = require("./lambda.js");
const { QueueStack } = require("./queue.js");
const { SnsToSqsToLambdaStack } = require("./sns-sqs-lambda.js");


// const topicObj = {
//   businessEvents: [
//     "ProvisionSingleDeviceRequested"
//   ]
// };

// const businessEvents = ["ProvisionSingleDeviceRequested"];


class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // const topic = new DeviceManagementTopicStack(this, "DeviceManagementTopicStack");

    // const queue = new DeviceManagementQueueStack(this, "DeviceManagementQueueStack");

    // const lambda = new DeviceManagementLambdaStack(this, "DeviceManagementLambdaStack", { topic });

    // new DeviceManagementSnsToSqsToLambdaStack(this, "DeviceManagementSnsToSqsToLambdaPatternsStack", { topic, queue, lambda });

    // new DeviceManagementSubscriptionStack(this, "DeviceManagementSubscriptionStack");

    const topic = new TopicStack(this, "TopicStack");

    const queue = new QueueStack(this, "QueueStack");

    const lambda = new LambdaStack(this, "LambdaStack", { topic });

    new SnsToSqsToLambdaStack(this, "SnsToSqsToLambdaStack", { topic, queue, lambda });
  }
}

module.exports = { DeviceManagementStack };