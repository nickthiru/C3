const { Stack } = require("aws-cdk-lib");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

class LambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { topic } = props;

    this.provisionSingleDeviceLambda = new Function(this, "ProvisionSingleDeviceLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../../../src/domain/device")),
      handler: "provision-single-device.handler",
      environment: {
        topicArn: topic.provisionSingleDeviceRequestedTopic.topicArn
      }
    });

    // this.provisionBatchDevicesLambda = new Function(this, "ProvisionBatchDevicesLambda", {
    //   runtime: Runtime.NODEJS_18_X,
    //   code: Code.fromAsset(path.join(__dirname, "../handlers")),
    //   handler: "provision-batch-devices-handler.handler",
    //   environment: {
    //     topicArn: props.provisionBatchDevicesCompletedTopicArn
    //   }
    // });
  }
}

module.exports = { LambdaStack };