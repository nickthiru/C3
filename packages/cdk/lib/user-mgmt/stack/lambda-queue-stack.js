const { Stack } = require("aws-cdk-lib");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");

class LambdaQueueStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    new SqsToLambda(this, 'SqsToLambdaPattern', {
      existingLambdaObj: "",
      existingQueueObj: "",
    });
  }
}

module.exports = { LambdaQueueStack };