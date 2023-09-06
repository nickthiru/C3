#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { CognitoStack } = require("../lib/cognito-stack.js");
const { DataStack } = require('../lib/data-stack.js');
const { WebSocketStack } = require("../lib/websocket-stack.js");
const { DeviceManagementStack } = require("../lib/domain/device/device-mgmt-stack.js");


const app = new cdk.App();


/*** Infra ***/

// For user management
const cognitoStack = new CognitoStack(app, "CognitoStack");
// Exports for ...
const userPoolId = cognitoStack.userPool.userPoolId;
const userPoolClientId = cognitoStack.userPoolClient.userPoolClientId;


// For storage & database
const dataStack = new DataStack(app, "DataStack");
// Export for ...
const webSocketConnectionsTable = dataStack.webSocketConnectionsTable;


// To enable event-driven architecture
const webSocketStack = new WebSocketStack(app, "WebSocketStack", {
  userPoolId,
  userPoolClientId,
  webSocketConnectionsTable
});
// Export for ...
const webSocketToWebClientRouteQueue = webSocketStack.webSocketToWebClientRouteQueue;


/*** Domain ***/

// To provide device management features
new DeviceManagementStack(app, "DeviceManagementStack", {
  webSocketToWebClientRouteQueue
});


//
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
