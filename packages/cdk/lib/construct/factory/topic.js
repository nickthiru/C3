const { Stack } = require("aws-cdk-lib");
const { Topic, Subscription } = require("aws-cdk-lib/aws-sns");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

/**
 * @description This factory pattern generates a list of SNS Topics from a list of Business Events
 */
class TopicFactory extends Stack {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    console.log("events: " + props);

    // Return list of business events as SNS Topics
    return props.businessEvents.map((event) => {
      return new Topic(this, `${event}Topic`,
        {
          // displayName: "Provision single device requested topic",
          topicName: `${event}`
        });
    });
  }
}

module.exports = { TopicFactory };