const { Construct } = require("constructs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");


class SnsToSqsToLambdaPattern extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { command, topicObj, queueObj, lambdaObj } = props;

    new SnsToSqs(this, `${command}SnsToSqs`, {
      existingTopicObj: topicObj,
      existingQueueObj: queueObj
    });

    new SqsToLambda(this, `${command}SqsToLambda`, {
      existingQueueObj: queueObj,
      existingLambdaObj: lambdaObj
    });
  }
}

module.exports = { SnsToSqsToLambdaPattern };