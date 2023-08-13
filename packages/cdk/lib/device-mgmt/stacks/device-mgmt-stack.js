const { Stack, CfnOutput } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { Topic } = require("aws-cdk-lib/aws-sns");

class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Topics (business events) ***/

    // ProvisionSingleDevice
    const provisionSingleDeviceRequestedTopic = new Topic(this, "ProvisionSingleDeviceRequestedTopic",
      {
        displayName: "Provision single device topic",
        topicName: "ProvisionSingleDeviceRequestedTopic",
      });

    // ProvisionSingleDeviceCompleted


    /*** Topic subscriptions ***/


    /*** SQS-Lambdas (event commands) ***/

    // ProvisionSingleDevice


    // Outputs for 'outputs.json' for React.js Auth service
    new CfnOutput(this, "ProvisionSingleDeviceRequestedTopicArn", {
      value: provisionSingleDeviceRequestedTopic.topicArn
    });

    // Permissions
    // provisionSingleDeviceRequestedTopic.addToResourcePolicy(new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   resources: ["arn:aws:sns:us-east-1:346761569124:topic:*"],
    //   actions: ["sns:Publish"],
    //   principals: [{
    //     grantPrincipal: "arn:aws:iam::346761569124:role/C3AdminRole"
    //   }]
    // }));
  }
}
module.exports = { DeviceManagementStack };