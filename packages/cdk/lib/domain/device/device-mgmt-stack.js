const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { SnsToSqsToLambdaPattern } = require("../../construct/sns-sqs-lambda.js");
const path = require("path");

// const { TopicStack } = require("./topic.js");
// const { LambdaStack } = require("./lambda.js");
// const { QueueStack } = require("./queue.js");
// const { SnsToSqsToLambdaStack } = require("./sns-sqs-lambda.js");

const domain = {
  topics: [
    "ProvisionDeviceRequestedTopic",
    "ProvisionDeviceWorkflowCompletedTopic"
  ],
  workflows: [
    "ProvisionDeviceWorkflow"
  ]
}

class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);


    /*** Events ***/

    // const topic = new TopicStack(this, "TopicStack");

    const provisionDeviceRequestedTopic = new Topic(this, "ProvisionDeviceRequestedTopic", {
      topicName: "ProvisionDeviceRequestedTopic"
    });

    this.provisionDeviceWorkflowCompletedTopic = new Topic(this, "ProvisionDeviceWorkflowCompletedTopic", {
      topicName: "ProvisionDeviceWorkflowCompletedTopic"
    });


    /*** Workflows ***/

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
    provisionDeviceWorkflowLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [`arn:aws:sns:us-east-1:346761569124:${provisionDeviceRequestedTopic.topicName}`],
      actions: ["sns:Publish"]
    }))

    new SnsToSqsToLambdaPattern(this, "ProvisionDeviceWorkflowSnsToSqsToLambdaPattern", {
      command: "ProvisionDeviceWorkflow",
      topicObj: provisionDeviceRequestedTopic,
      queueObj: provisionDeviceWorkflowQueue,
      lambdaObj: provisionDeviceWorkflowLambda
    });


  }
}

module.exports = { DeviceManagementStack };