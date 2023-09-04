#!/usr/bin/env node
const cdk = require('aws-cdk-lib');

const { CognitoStack } = require("../lib/cognito-stack.js");
const { DataStack } = require('../lib/data-stack.js');
const { WebSocketStack } = require("../lib/websocket-stack.js");
const { DeviceManagementStack } = require("../lib/domain/device/device-mgmt-stack.js");
const { ToWebClientSnsToSqsStack } = require("../lib/to-web-client-sns-sqs-stack.js");


const app = new cdk.App();


/*** Infra ***/

const cognitoStack = new CognitoStack(app, "CognitoStack");

const dataStack = new DataStack(app, "DataStack");

const webSocketStack = new WebSocketStack(app, "WebSocketStack", { cognitoStack, dataStack });


/*** Domain ***/

const deviceMgmtStack = new DeviceManagementStack(app, "DeviceManagementStack");

// const mapStack = new MapStack(this, "MapStack", { deviceMgmt });


/*** 
 * webSocketStack.webSocketToWebClientRouteLambda's role is to pass messages to the web client.
 * As such, any SNS topics that need to publish to the web client must publish to the
 * webSocketStack.webSocketToWebClientRouteQueue. The following stack's resposiblity is to link
 * all those topics to that queue.   
 * ***/

new ToWebClientSnsToSqsStack(app, "ToWebClientSnsToSqsStack", {
  webSocketStack,
  deviceMgmtStack,
  // mapStack
});




// new CdkStack(app, 'CdkStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });
