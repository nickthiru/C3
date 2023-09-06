const { Stack, CfnOutput } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { LogGroup } = require("aws-cdk-lib/aws-logs");
const { LogGroupSubscription, LogFormat } = require("@wheatstalk/cdk-sns-log-group-subscription");
const path = require("path");
const { SendEventToWebClientIntegration } = require("./send-event-to-web-client-integration");


class DomainWorkflowFactory extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const {
      triggerEvent,
      workflow,
      outputEvent,
      mustSendOutputEventToWebClient,
      webSocketToWebClientRouteQueue,
      domainSourceFilesFolderLocation,
      packageLockJsonFileLocation
    } = props;


    const triggerEventTopic = new Topic(this, `${triggerEvent}Topic`, {
      topicName: `${triggerEvent}Topic`
    });

    const outputEventTopic = new Topic(this, `${outputEvent}Topic`, {
      topicName: `${outputEvent}Topic`
    });

    const workflowQueue = new Queue(this, `${workflow}Queue`);

    const workflowLambda = new NodejsFunction(this, `${workflow}Lambda`, {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, `${domainSourceFilesFolderLocation}/${workflow}.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFileLocation)),
      environment: {
        outputEventTopicName: outputEventTopic.topicName,
        outputEventTopicArn: outputEventTopic.topicArn
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sns:us-east-1:346761569124:${outputEventTopic.topicName}`],
          actions: ["sns:Publish"]
        })
      ]
    });

    triggerEventTopic.addSubscription(
      new LogGroupSubscription({
        logGroup: new LogGroup(this, `${triggerEvent}TopicLogGroup`),
        logFormat: LogFormat.MESSAGE
      })
    );

    outputEventTopic.addSubscription(
      new LogGroupSubscription({
        logGroup: new LogGroup(this, `${outputEvent}TopicLogGroup`),
        logFormat: LogFormat.MESSAGE
      })
    );

    new SnsToSqs(this, `${workflow}SnsToSqs`, {
      // encryptionKeyProps: { alias: `${workflow}SnsToSqsEncryptionKeyAlias` },
      existingTopicObj: triggerEventTopic,
      existingQueueObj: workflowQueue,
    });

    new SqsToLambda(this, `${workflow}SqsToLambda`, {
      // encryptionKeyProps: { alias: `${workflow}SqsToLambdaEncryptionKeyAlias` },
      existingQueueObj: workflowQueue,
      existingLambdaObj: workflowLambda
    });

    //
    if (mustSendOutputEventToWebClient) {
      new SendEventToWebClientIntegration(this, `${outputEvent}TopicWebClientIntegration`, {
        outputEventTopic,
        webSocketToWebClientRouteQueue
      })
    };


    /*** Outputs ***/

    new CfnOutput(this, `${triggerEvent}TopicArn`, {
      value: `${triggerEventTopic.topicArn}`,
      exportName: `${triggerEvent}TopicArn`
    });

    // The workflow output event may not be necessary for the web client.
    // new CfnOutput(this, `${outputEvent}TopicArn`, {
    //   value: `${outputEventTopic.topicArn}`,
    //   description: `${outputEventDescription}`,
    //   exportName: `${outputEvent}TopicArn`
    // });
  }
}

module.exports = { DomainWorkflowFactory };