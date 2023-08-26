const { Construct } = require("constructs");
const { Stack } = require("aws-cdk-lib");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { Topic, Subscription } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

const { TopicFactory } = require("../../../patterns/topic-factory.js");
const { TopicCommandFactory } = require("../../../patterns/topic-command-factory.js");

/**
 * @description This factory pattern generates a list of SNS Topics from a list of Business Events
 */
class EventAndCommandFactory extends Construct {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    console.log("events: " + props);

    const topicsList = new TopicFactory(this, "ProvisionSingleDeviceTopicFactory",
      { businessEvents: props.businessEvents });

    console.log("topicsList: " + topicsList);

    new TopicCommandFactory(this, `ProvisionSingleDeviceTopicCommandFactory`, { topicsList })

  }
}

module.exports = { EventAndCommandFactory };