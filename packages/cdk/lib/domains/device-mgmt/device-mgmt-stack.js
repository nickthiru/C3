const { Stack } = require("aws-cdk-lib");

const { DeviceManagementTopicStack } = require("./stacks/device-mgmt-topic-stack.js");
const { DeviceManagementLambdaStack } = require("./stacks/device-mgmt-lambda-stack.js");
const { DeviceManagementQueueStack } = require("./stacks/device-mgmt-queue-stack.js");
const { DeviceManagementSnsToSqsToLambdaStack } = require("./stacks/device-mgmt-sns-sqs-lambda-stack.js");


// const topicObj = {
//   businessEvents: [
//     "ProvisionSingleDeviceRequested"
//   ]
// };

// const businessEvents = ["ProvisionSingleDeviceRequested"];


class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const topic = new DeviceManagementTopicStack(this, "DeviceManagementTopicStack");

    const queue = new DeviceManagementQueueStack(this, "DeviceManagementQueueStack");

    const lambda = new DeviceManagementLambdaStack(this, "DeviceManagementLambdaStack", { topic });

    new DeviceManagementSnsToSqsToLambdaStack(this, "DeviceManagementSnsToSqsToLambdaPatternsStack", { topic, queue, lambda });

    // new DeviceManagementSubscriptionStack(this, "DeviceManagementSubscriptionStack");
  }
}

module.exports = { DeviceManagementStack };