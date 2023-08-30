#!/usr/bin/env node
const cdk = require('aws-cdk-lib');

const { CognitoStack } = require("../lib/cognito-stack.js");
const { DataStack } = require('../lib/data-stack.js');
const { WebSocketStack } = require("../lib/websocket-stack.js");
const { DeviceManagementStack } = require("../lib/domain/device/device-mgmt-stack.js");

const { ToWebClientSubscriptionsStack } = require("../lib/to-web-client-subscriptions-stack.js");

// const { WebSocketBuiltInRoutesLambdaStack } = require('../lib/lambda/websocket-built-in-routes-lambda-stack.js');
// const { WebSocketCustomRoutesLambdaStack } = require('../lib/lambda/websocket-custom-routes-lambda-stack.js');
// const { WebSocketApiStack } = require('../lib/api/websocket/websocket-api-stack.js');
// const { WebSocketCustomRoutesIntegrationStack } = require('../lib/api/websocket/websocket-custom-routes-integration-stack.js');
// const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");


const app = new cdk.App();

const cognitoStack = new CognitoStack(app, "CognitoStack");

const dataStack = new DataStack(app, "DataStack");

const webSocketStack = new WebSocketStack(app, "WebSocketStack", { cognitoStack, dataStack });

// websocketStack.webSocketToWebClientRouteQueue

const deviceMgmtStack = new DeviceManagementStack(app, "DeviceManagementStack");


/*** webSocketStack.webSocketToWebClientRouteQueue needs to subscribe to the following events (topics):  ***/

// ProvisionDeviceWorkflowCompletedTopic
new ToWebClientSubscriptionsStack(app, "ToWebClientSubscriptionsStack", { deviceMgmtStack, webSocketStack });






/*** WebSocket Resources ***/

// const webSocketBuiltInRoutesLambdaStack = new WebSocketBuiltInRoutesLambdaStack(app, "WebSocketBuiltInRoutesLambdaStack", { cognitoStack, dataStack });

// const webSocketApiStack = new WebSocketApiStack(app, "WebSocketApiStack", { webSocketBuiltInRoutesLambdaStack });

// const webSocketCustomRoutesLambdaStack = new WebSocketCustomRoutesLambdaStack(app, "WebSocketCustomRoutesLambdaStack", { dataStack, webSocketApiStack });

// new WebSocketCustomRoutesIntegrationStack(app, "WebSocketCustomRoutesIntegrationStack", { webSocketApiStack, webSocketCustomRoutesLambdaStack });



// const map = new MapStack(this, "MapStack", { deviceMgmt });





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
