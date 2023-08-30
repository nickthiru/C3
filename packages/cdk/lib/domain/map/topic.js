const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { CfnOutput } = require("aws-cdk-lib");

class TopicStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // addSingleProvisionedDeviceToMapCompletedTopic = new Topic(this, "AddSingleProvisionedDeviceToMapCompletedTopic",
    //   {
    //     displayName: "Add single provisioned device to map completed topic",
    //     topicName: "AddSingleProvisionedDeviceToMapCompletedTopic"
    //   });

    this.updateMapGeoJsonWorkflowCompletedTopic = new Topic(this, "UpdateMapGeoJsonWorkflowCompletedTopic");


    /*** Outputs ***/

    // new CfnOutput(this, "UpdateMapGeoJsonWorkflowCompletedTopicArn", {
    //   value: updateMapGeoJsonWorkflowCompletedTopic.topicArn,
    //   exportName: "UpdateMapGeoJsonWorkflowCompletedTopicArn"
    // });
  }
}

module.exports = { TopicStack };