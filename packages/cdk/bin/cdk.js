#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { UserManagementStack } = require('../lib/domain/user-mgmt/user-mgmt-stack.js');
const { WebSocketStack } = require("../lib/api/websocket/websocket-stack.js");
const { DeviceManagementStack } = require("../lib/domain/device-mgmt/device-mgmt-stack.js");


const app = new cdk.App();


/*** User Management ***/

const userMgmtStack = new UserManagementStack(app, "UserManagementStack");

// Exports for WebSocketStack/WebSocketLambdaAuthorizer
const userPoolId = userMgmtStack.cognitoStack.userPool.userPoolId;
const userPoolClientId = userMgmtStack.cognitoStack.userPoolClient.userPoolClientId;


/*** WebSocket API ***/

const webSocketStack = new WebSocketStack(app, "WebSocketStack", {
  userPoolId,
  userPoolClientId,
});

// Export for all events that need to be sent to the web client
const webSocketToWebClientRouteQueue = webSocketStack.webSocketToWebClientRouteQueue;


/*** HTTP API ***/




/*** Domain ***/

new DeviceManagementStack(app, "DeviceManagementStack", {
  webSocketToWebClientRouteQueue
});

// new MapStack(app, "MapStack");











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
