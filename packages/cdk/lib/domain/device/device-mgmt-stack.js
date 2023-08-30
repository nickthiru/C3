const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { SnsToSqsToLambdaPattern } = require("../../construct/sns-sqs-lambda.js");
const path = require("path");

// const { TopicStack } = require("./topic.js");
// const { LambdaStack } = require("./lambda.js");
// const { QueueStack } = require("./queue.js");
// const { SnsToSqsToLambdaStack } = require("./sns-sqs-lambda.js");

class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Events ***/

    // const topic = new TopicStack(this, "TopicStack");


    const provisionDeviceRequestedTopic = new Topic(this, "ProvisionDeviceRequestedTopic",
      {
        displayName: "Provision device(s) requested topic",
        topicName: "ProvisionDeviceRequestedTopic"
      });

    this.provisionDeviceWorkflowCompletedTopic = new Topic(this, "ProvisionDeviceWorkflowCompletedTopic",
      {
        displayName: "Provision device(s) workflow completed topic",
        topicName: "ProvisionDeviceWorkflowCompletedTopic"
      });


    /*** Subscriptions ***/

    // const queue = new QueueStack(this, "QueueStack");

    // const lambda = new LambdaStack(this, "LambdaStack", { topic });

    // new SnsToSqsToLambdaStack(this, "SnsToSqsToLambdaStack", { topic, queue, lambda });

    const provisionDeviceWorkflowQueue = new Queue(this, "ProvisionDeviceWorkflowQueue");

    const provisionDeviceWorkflowLambda = new Function(this, "ProvisionDeviceWorkflowLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../../../src/domain/device")),
      handler: "provision-device.handler",
      environment: {
        outputEvents: this.provisionDeviceWorkflowCompletedTopic.topicArn
      }
    });

    new SnsToSqsToLambdaPattern(this, "ProvisionDeviceWorkflowSnsToSqsToLambdaPattern", {
      command: "ProvisionDeviceWorkflow",
      topicObj: provisionDeviceRequestedTopic,
      queueObj: provisionDeviceWorkflowQueue,
      lambdaObj: provisionDeviceWorkflowLambda
    });


  }
}

module.exports = { DeviceManagementStack };