const { Construct } = require("constructs");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic, Subscription } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

class EventCommandPattern extends Construct {
  constructor(scope, id, props) {

    // const eventCommandName = props.eventCommandName;
    // const handlerLocation = props.codeLocation;  // Relative to the directory of the Lambda definition
    // const handlerName = props.handlerName;
    // const topicArn = props.topicArn;

    const {
      eventName,
      handlerLocation,
      handlerName,
      topicArn,
      topicName
    } = props;

    const lambda = new Function(this, `${eventName}CommandLambda`, {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, `${handlerLocation}`)),
      handler: `${handlerName}.handler`,
      environment: {
        topicArn: topicArn
      }
    });

    const queue = new Queue(this, `${eventName}CommandQueue`);

    new SnsToSqs(this, `${eventName}CommandSnsToSqsLambdaPattern`, {
      existingTopicObj: topicName,
      existingQueueObj: queue
    });

    new SqsToLambda(this, `${eventName}CommandSqsToLambdaPattern`, {
      existingQueueObj: queue,
      existingLambdaObj: lambda
    });
  }
}