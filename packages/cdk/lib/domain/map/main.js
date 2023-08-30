const { Stack } = require("aws-cdk-lib");

const { TopicStack } = require("./topic.js");
const { LambdaStack } = require("./lambda.js");
const { QueueStack } = require("./queue.js");
const { SnsToSqsToLambdaStack } = require("./sns-sqs-lambda.js");

class MapStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const topic = new TopicStack(this, "TopicStack");

    const queue = new QueueStack(this, "QueueStack");

    const lambda = new LambdaStack(this, "LambdaStack", { topic });

    new SnsToSqsToLambdaStack(this, "SnsToSqsToLambdaStack", { topic, queue, lambda });
  }
}

module.exports = { MapStack };