const { Fn, CfnOutput } = require("aws-cdk-lib");
const { Construct } = require("constructs");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { Key } = require("aws-cdk-lib/aws-kms");
const { LogGroup } = require("aws-cdk-lib/aws-logs");
const { LogGroupSubscription, LogFormat } = require("@wheatstalk/cdk-sns-log-group-subscription");
const path = require("path");


class DomainWorkflowFactory extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const {
      domainSourceFilesLocation,
      workflowTriggerEvent,
      workflowTriggerEventDescription,
      workflowCommand,
      workflowOutputEvent,
      workflowOutputEventDescription,
      shouldSendToWebClient
    } = props;


    const webSocketToWebClientRouteQueue = Queue.fromQueueArn(this, "WebSocketToWebClientRouteQueue", Fn.importValue("WebSocketToWebClientRouteQueueArn"));


    const workflowTriggerTopic = new Topic(this, `${workflowTriggerEvent}Topic`, {
      topicName: `${workflowTriggerEvent}Topic`
    });

    const workflowOutputTopic = new Topic(this, `${workflowOutputEvent}Topic`, {
      topicName: `${workflowOutputEvent}Topic`
    });

    const workflowCommandQueue = new Queue(this, `${workflowCommand}Queue`, {
      queueName: `${workflowCommand}Queue`
    });

    const workflowCommandLambda = new Function(this, `${workflowCommand}Lambda`, {
      functionName: `${workflowCommand}Lambda`,
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, domainSourceFilesLocation)),
      handler: `${workflowCommand}.handler`,
      environment: {
        workflowOutputTopicArn: workflowOutputTopic.topicArn
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sns:us-east-1:346761569124:${workflowOutputTopic.topicName}`],
          actions: ["sns:Publish"]
        })
      ]
    })

    workflowTriggerTopic.addSubscription(
      new LogGroupSubscription({
        logGroup: new LogGroup(this, `${workflowTriggerEvent}TopicLogGroup`, {
          logGroupName: `${workflowTriggerEvent}TopicLogGroup`
        }),
        logFormat: LogFormat.MESSAGE
      })
    )

    workflowOutputTopic.addSubscription(
      new LogGroupSubscription({
        logGroup: new LogGroup(this, `${workflowOutputEvent}TopicLogGroup`, {
          logGroupName: `${workflowOutputEvent}TopicLogGroup`
        }),
        logFormat: LogFormat.MESSAGE
      })
    )

    new SnsToSqs(this, `${workflowCommand}SnsToSqs`, {
      existingTopicObj: workflowTriggerTopic,
      existingQueueObj: workflowCommandQueue,
      encryptionKey: new Key(this, `${workflowCommand}SnsToSqsEncryptionKey`)
    });

    new SqsToLambda(this, `${workflowCommand}SqsToLambda`, {
      existingQueueObj: workflowCommandQueue,
      existingLambdaObj: workflowCommandLambda
    });

    if (shouldSendToWebClient) {
      new SnsToSqs(this, `${workflowOutputEvent}SnsToSqs`, {
        existingTopicObj: workflowOutputTopic,
        existingQueueObj: webSocketToWebClientRouteQueue,
        encryptionKey: new Key(this, `${workflowOutputEvent}SnsToSqsEncryptionKey`)
      });
    }


    /*** Outputs ***/

    new CfnOutput(this, `${workflowTriggerEvent}TopicArn`, {
      value: `${workflowTriggerTopic.topicArn}`,
      description: `${workflowTriggerEventDescription}`,
      exportName: `${workflowTriggerEvent}TopicArn`
    });

    new CfnOutput(this, `${workflowOutputEvent}TopicArn`, {
      value: `${workflowOutputTopic.topicArn}`,
      description: `${workflowOutputEventDescription}`,
      exportName: `${workflowOutputEvent}TopicArn`
    });
  }
}

module.exports = { DomainWorkflowFactory };