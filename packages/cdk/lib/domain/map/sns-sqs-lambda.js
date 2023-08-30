const { Stack } = require("aws-cdk-lib");
const { SnsToSqsToLambdaPattern } = require("../../construct/sns-sqs-lambda.js");
// const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
// const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");


class SnsToSqsToLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { topic, queue, lambda } = props;

    // Update Map's GeoJson Data Workflow
    new SnsToSqsToLambdaPattern(this, "UpdateMapGeoJsonWorkflowSnsToSqsToLambdaPattern", {
      workflow: "UpdateMapGeoJsonWorkflow",
      topicObj: topic.provisionDeviceWorkflowCompletedTopic,
      queueObj: queue.updateMapGeoJsonWorkflowQueue,
      lambdaObj: lambda.updateMapGeoJsonWorkflowLambda
    });
  }
}



module.exports = { SnsToSqsToLambdaStack };