const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");

export default class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {

    // ProvisionSingleDevice
    const provisionSingleDeviceRequestedTopic = new Topic(this, "ProvisionSingleDeviceRequestedTopic");

  }
}