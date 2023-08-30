const { Stack } = require("aws-cdk-lib");
const { Queue } = require("aws-cdk-lib/aws-sqs");

class QueueStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.provisionDeviceWorkflowQueue = new Queue(this, "ProvisionDeviceWorkflowQueue");
  }
}

module.exports = { QueueStack };