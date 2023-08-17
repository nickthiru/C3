const { Construct } = require("constructs");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic, Subscription } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { CfnOutput } = require("aws-cdk-lib");

const { EventCommandPattern } = require("../../../patterns/event-command-pattern.js");

const path = require("path");


class ProvisionSingleDevice extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Business Events ***/

    const provisionSingleDeviceRequestedTopic = new Topic(this, "ProvisionSingleDeviceRequestedTopic",
      {
        displayName: "Provision single device requested topic",
        topicName: "ProvisionSingleDeviceRequestedTopic"
      });

    const provisionSingleDeviceCompletedTopic = new Topic(this, "ProvisionSingleDeviceCompletedTopic",
      {
        displayName: "Provision single device completed topic",
        topicName: "ProvisionSingleDeviceCompletedTopic"
      });


    /*** Event Commands ***/

    const provisionSingleDeviceCommandLambda = new Function(this, "ProvisionSingleDeviceCommandLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers")),
      handler: "provision-single-device.handler",
      environment: {
        topicArn: provisionSingleDeviceRequestedTopic.topicArn
      }
    });

    const provisionSingleDeviceCommandQueue = new Queue(this, "ProvisionSingleDeviceCommandQueue");

    const provisionSingleDeviceCommandSnsToSqsLambdaPattern = new SnsToSqs(this, "ProvisionSingleDeviceCommandSnsToSqsLambdaPattern", {
      existingTopicObj: provisionSingleDeviceRequestedTopic,
      existingQueueObj: provisionSingleDeviceCommandQueue
    });

    const provisionSingleDeviceCommandSqsToLambdaPattern = new SqsToLambda(this, "ProvisionSingleDeviceCommandSqsToLambdaPattern", {
      existingQueueObj: provisionSingleDeviceCommandQueue,
      existingLambdaObj: provisionSingleDeviceCommandLambda
    });

    // new EventCommandPattern(this, "Provision")

    /*** Event Subscriptions ***/

    // provisionSingleDeviceRequestedTopic.addSubscription(new Subscription(this, "test"))


    /*** Permissions ***/



    /*** Outputs ***/

    // For 'ProvisionBatchDevicesTopic' in 'DeviceManagementService'
    // this.provisionSingleDeviceRequestedTopicArn = provisionSingleDeviceRequestedTopic.topicArn;

    // For web client

    new CfnOutput(this, "ProvisionSingleDeviceRequestedTopicArn", {
      value: provisionSingleDeviceRequestedTopic.topicArn
    });
  }
}

module.exports = { ProvisionSingleDevice };