const { Construct } = require("constructs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { Stack, CfnOutput } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const path = require("path");

const { ProvisionSingleDevice } = require("./constructs/provision-single-device.js");
// const { ProvisionBatchDevices } = require("./constructs/provision-batch-devices.js");


class DeviceManagementService extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const provisionSingleDevice = new ProvisionSingleDevice(this, "ProvisionSingleDevice");

    // new ProvisionBatchDevices(this, "ProvisionBatchDevices", {
    //   provisionSingleDeviceRequestedTopicArn: provisionSingleDevice.provisionSingleDeviceRequestedTopicArn
    // });
  }
}
module.exports = { DeviceManagementService };