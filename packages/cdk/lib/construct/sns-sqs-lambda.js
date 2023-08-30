const { Construct } = require("constructs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");


class SnsToSqsToLambdaPattern extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { workflow, topicObj, queueObj, lambdaObj } = props;

    new SnsToSqs(this, `${workflow}SnsToSqs`, {
      existingTopicObj: topicObj,
      existingQueueObj: queueObj
    });

    new SqsToLambda(this, `${workflow}SqsToLambda`, {
      existingQueueObj: queueObj,
      existingLambdaObj: lambdaObj
    });
  }
}

module.exports = { SnsToSqsToLambdaPattern };