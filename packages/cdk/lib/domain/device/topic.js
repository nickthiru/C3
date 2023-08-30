const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { CfnOutput } = require("aws-cdk-lib");

class TopicStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.provisionDeviceRequestedTopic = new Topic(this, "ProvisionDeviceRequestedTopic",
      {
        displayName: "Provision device(s) requested topic",
        topicName: "ProvisionDeviceRequestedTopic"
      });

    this.provisionDeviceWorkflowCompletedTopic = new Topic(this, "ProvisionDeviceWorkflowCompletedTopic",
      {
        displayName: "Provision device(s) workflow completed topic",
        topicName: "ProvisionDeviceWorkflowCompletedTopic"
      });


    /*** Outputs ***/

    new CfnOutput(this, "ProvisionDeviceRequestedTopicArn", {
      value: provisionDeviceRequestedTopic.topicArn,
      exportName: "ProvisionDeviceRequestedTopicArn"
    });
  }
}

module.exports = { TopicStack };