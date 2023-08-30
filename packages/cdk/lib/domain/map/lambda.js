const { Stack, Fn } = require("aws-cdk-lib");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

class LambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { topic } = props;

    this.updateMapGeoJsonWorkflowLambda = new Function(this, "UpdateMapGeoJsonWorkflowLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../../../src/domain/device")),
      handler: "update-map-geojson.handler",
      environment: {
        outputEvents: topic.updateMapGeoJsonWorkflowCompletedTopic.topicArn
      }
    });
  }
}

module.exports = { LambdaStack };