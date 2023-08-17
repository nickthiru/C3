const { Construct } = require("constructs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { Stack, CfnOutput } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const path = require("path");


class ProvisionBatchDevices extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Topics (business events) ***/

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


    /*** SQS-Lambdas (event commands) ***/

    // const provisionSingleDeviceCommandQueue = new Queue(this, "ProvisionSingleDeviceCommandQueue");

    const provisionBatchDevicesCommandLambda = new Function(this, "ProvisionBatchDevicesCommandLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers")),
      handler: "provision-batch-devices.handler",
      environment: {
        provisionSingleDeviceRequestedTopicArn: props.provisionSingleDeviceRequestedTopicArn
      }
    });

    // const provisionSingleDeviceCommandSqsToLambdaPattern = new SqsToLambda(this, "ProvisionSingleDeviceCommandSqsToLambdaPattern", {
    //   existingLambdaObj: provisionSingleDeviceCommandLambda,
    //   existingQueueObj: provisionSingleDeviceCommandQueue
    // });


    /*** Topic subscriptions ***/



    /*** Outputs (to 'outputs.json', for React.js) ***/

    // new CfnOutput(this, "ProvisionSingleDeviceRequested_TopicArn", {
    //   value: provisionSingleDeviceRequested_Topic.topicArn
    // });
  }
}
module.exports = { ProvisionBatchDevices };