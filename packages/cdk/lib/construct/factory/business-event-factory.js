const { Topic } = require("aws-cdk-lib/aws-sns");
const { Construct } = require("constructs");

/**
 * @description This factory pattern generates a list of SNS Topics from a list of Business Events
 */
class TopicFactory extends Construct {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {

    const { topicName } = props;

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