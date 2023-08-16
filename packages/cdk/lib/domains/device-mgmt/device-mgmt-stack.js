const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { Stack, CfnOutput } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const path = require("path");

const { ProvisionSingleDeviceStack } = require("./stacks/provision-single-device-stack.js");
const { ProvisionBatchDevicesStack } = require("./stacks/provision-batch-devices-stack.js");


class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const provisionSingleDeviceStack = new ProvisionSingleDeviceStack(this, "ProvisionSingleDeviceStack");

    this.provisionSingleDeviceStack = provisionSingleDeviceStack

    new ProvisionBatchDevicesStack(this, "ProvisionBatchDevicesStack", {
      provisionSingleDeviceRequestedTopicArn: provisionSingleDeviceStack.provisionSingleDeviceRequestedTopicArn
    });

    // /*** Topics (business events) ***/

    // // ProvisionSingleDevice
    // const provisionSingleDeviceRequested_Topic = new Topic(this, "ProvisionSingleDeviceRequested_Topic",
    //   {
    //     displayName: "Provision single device requeseted topic",
    //     topicName: "ProvisionSingleDeviceRequestedTopic"
    //   });

    // const provisionSingleDeviceCompleted_Topic = new Topic(this, "ProvisionSingleDeviceCompleted_Topic",
    //   {
    //     displayName: "Provision single device completed topic",
    //     topicName: "ProvisionSingleDeviceCompletedTopic"
    //   });


    // /*** SQS-Lambdas (event commands) ***/

    // // ProvisionSingleDevice
    // const provisionSingleDeviceCommand_Queue = new Queue(this, "ProvisionSingleDeviceCommand_Queue");

    // const provisionSingleDeviceCommand_Lambda = new Function(this, "ProvisionSingleDeviceCommand_Lambda", {
    //   runtime: Runtime.NODEJS_18_X,
    //   code: Code.fromAsset(path.join(__dirname, "../handlers")),
    //   handler: "provision-single-device-handler.handler",
    //   environment: {
    //     TOPIC_ARN: provisionSingleDeviceCompleted_Topic.topicArn
    //   }
    // });

    // const provisionSingleDeviceCommand_SqsToLambda_Pattern = new SqsToLambda(this, "ProvisionSingleDeviceCommand_SqsToLambda_Pattern", {
    //   existingLambdaObj: provisionSingleDeviceCommand_Lambda,
    //   existingQueueObj: provisionSingleDeviceCommand_Queue
    // });


    // /*** Topic subscriptions ***/



    // /*** Outputs (to 'outputs.json', for React.js) ***/

    // // ProvisionSingleDevice
    // new CfnOutput(this, "ProvisionSingleDeviceRequested_TopicArn", {
    //   value: provisionSingleDeviceRequested_Topic.topicArn
    // });
  }
}
module.exports = { DeviceManagementStack };