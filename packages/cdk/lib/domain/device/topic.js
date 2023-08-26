const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { CfnOutput } = require("aws-cdk-lib");

class TopicStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.provisionSingleDeviceRequestedTopic = new Topic(this, "ProvisionSingleDeviceRequestedTopic",
      {
        displayName: "Provision single device requested topic",
        topicName: "ProvisionSingleDeviceRequestedTopic"
      });

    this.provisionSingleDeviceCompletedTopic = new Topic(this, "ProvisionSingleDeviceCompletedTopic",
      {
        displayName: "Provision single device completed topic",
        topicName: "ProvisionSingleDeviceCompletedTopic"
      });


    /*** Outputs ***/

    // For web client
    new CfnOutput(this, "ProvisionSingleDeviceRequestedTopicArn", {
      value: this.provisionSingleDeviceRequestedTopic.topicArn
    });
  }
}

module.exports = { TopicStack };