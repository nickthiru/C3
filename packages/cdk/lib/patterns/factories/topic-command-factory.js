const { Construct } = require("constructs");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic, Subscription } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

/**
 * @description This factory pattern uses a combination of an SNS Topic, an SQS Queue, and a Lambda
 */
class TopicCommandFactory extends Stack {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {

    const { topicsList } = props;
    console.log("events: " + events);



    const {
      topicName,
      topicArn,
      handlerName
    } = props;

    console.log("eventName: " + eventName);
    console.log("handlerName: " + handlerName);
    console.log("topicArn: " + topicArn);
    console.log("topicName: " + topicName);

    const handlerFolderLocation = "../handlers"  // Relative to the directory of the Lambda definition file

    const lambda = new Function(this, `${eventName}CommandLambda`, {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, `${handlerFolderLocation}`)),
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

module.exports = { TopicCommandFactory };