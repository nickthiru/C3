const { Stack } = require("aws-cdk-lib");

class MapStack extends Stack {
  constructor(scope, id, props) {

    /*** Topics (business events) ***/

    // ProvisionSingleDevice
    // const provisionSingleDeviceRequestedTopic = new Topic(this, "ProvisionSingleDeviceRequestedTopic",
    //   {
    //     displayName: "Provision single device topic",
    //     topicName: "ProvisionSingleDeviceRequestedTopic",
    //   });

    // AddSingleDeviceToMapCompleted


    /*** Topic subscriptions ***/

    // ProvisionSingleDeviceCompleted


    /*** Lambdas ***/


  };
}

module.exports = { MapStack };