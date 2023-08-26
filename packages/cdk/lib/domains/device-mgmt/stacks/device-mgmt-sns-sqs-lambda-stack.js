const { Stack } = require("aws-cdk-lib");
const { SnsToSqsToLambdaPattern } = require("../../../patterns/sns-sqs-lambda-pattern");
// const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
// const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");


class DeviceManagementSnsToSqsToLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { topic, queue, lambda } = props;

    // Provision Single Device Command
    new SnsToSqsToLambdaPattern(this, "ProvisionSingleDeviceSnsToSqsToLambdaPattern", {
      command: "ProvisionSingleDevice",
      topicObj: topic.provisionSingleDeviceRequestedTopic,
      queueObj: queue.provisionSingleDeviceQueue,
      lambdaObj: lambda.provisionSingleDeviceLambda
    });

    // Provision Batch Devices Command
    // new SnsToSqsToLambdaPattern(this, "ProvisionBatchDevicesSnsToSqsToLambdaPattern", {
    //   command: "ProvisionBatchDevicesCommand",
    //   topicObj: props.topic.provisionBatchDevicesRequestedTopic,
    //   queueObj: props.queue.provisionBatchDevicesQueue,
    //   lambdaObj: props.lambda.provisionBatchDevicesLambda
    // });
  }
}

module.exports = { DeviceManagementSnsToSqsToLambdaStack };