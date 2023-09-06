const { Construct } = require("constructs");
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


const workflowData = {
  workflow: {
    name: "ProvisionDeviceWorkflow",
    description: ""
  },
  triggerEvent: {
    name: "ProvisionDeviceRequested",
    description: "Request from end user to provision devices",
  },
  outputEvent: {
    name: "ProvisionDeviceWorkflowCompleted",
    description: "Completed provisioning of devices",
    mustSendToWebClient: true
  }
};

const triggerEvent = workflowData.triggerEvent.name;
const triggerEventDescription = workflowData.triggerEvent.description;
const workflow = workflowData.workflow.name;
const outputEvent = workflowData.outputEvent.name;
const outputEventDescription = workflowData.outputEvent.description;
const mustSendToWebClient = workflowData.outputEvent.mustSendToWebClient;


class TopicWebClientIntegration extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { outputEventTopic, webSocketToWebClientRouteQueue } = props;

    new SnsToSqs(this, `${outputEvent}SnsToSqs`, {
      existingTopicObj: outputEventTopic,
      existingQueueObj: webSocketToWebClientRouteQueue,  //
    });
  }
}

class ProvisionDeviceWorkflowStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const {
      webSocketToWebClientRouteQueue,
      domainSourceFilesLocation,
      packageLockJsonFile,
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
      entry: (path.join(__dirname, `${domainSourceFilesLocation}/${workflow}.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
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
        logGroup: new LogGroup(this, `${triggerEvent}TopicLogGroup`, {
        }),
        logFormat: LogFormat.MESSAGE
      })
    );

    outputEventTopic.addSubscription(
      new LogGroupSubscription({
        logGroup: new LogGroup(this, `${outputEvent}TopicLogGroup`, {
        }),
        logFormat: LogFormat.MESSAGE
      })
    );

    new SnsToSqs(this, `${workflow}SnsToSqs`, {
      existingTopicObj: triggerEventTopic,
      existingQueueObj: workflowQueue,
    });

    new SqsToLambda(this, `${workflow}SqsToLambda`, {
      existingQueueObj: workflowQueue,
      existingLambdaObj: workflowLambda
    });

    //
    if (mustSendToWebClient) {
      new TopicWebClientIntegration(this, `${outputEvent}TopicWebClientIntegration`, {
        outputEventTopic,
        webSocketToWebClientRouteQueue
      })
    };


    /*** Outputs ***/

    new CfnOutput(this, `${triggerEvent}TopicArn`, {
      value: `${triggerEventTopic.topicArn}`,
      description: `${triggerEventDescription}`,
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

module.exports = { ProvisionDeviceWorkflowStack };