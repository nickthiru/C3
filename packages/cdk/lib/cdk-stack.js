const { Stack } = require('aws-cdk-lib');
const { CognitoStack } = require("./cognito-stack.js");
const { DataStack } = require('./data-stack.js');
const { WebSocketBuiltInRoutesLambdaStack, WebSocketCustomRoutesLambdaStack } = require('./lambda/websocket-lambda-stack.js');
const { WebSocketApiStack, WebSocketCustomRoutesIntegrationStack } = require('./api/websocket/websocket-api-stack.js');

// const { UserMgmtStack } = require("./domain/user/main.js");


class CdkStack extends Stack {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // const cognitoStack = new CognitoStack(this, "CognitoStack");
    new CognitoStack(this, "CognitoStack");

    const dataStack = new DataStack(this, "DataStack");


    /*** WebSocket Resources ***/

    const webSocketBuiltInRoutesLambdaStack = new WebSocketBuiltInRoutesLambdaStack(this, "WebSocketBuiltInRoutesLambdaStack");

    const webSocketApiStack = new WebSocketApiStack(this, "WebSocketApiStack", { webSocketBuiltInRoutesLambdaStack });

    // const webSocketCustomRoutesLambdaStack = new WebSocketCustomRoutesLambdaStack(this, "WebSocketCustomRoutesLambdaStack", { dataStack, webSocketApiStack });
    const webSocketCustomRoutesLambdaStack = new WebSocketCustomRoutesLambdaStack(this, "WebSocketCustomRoutesLambdaStack");

    new WebSocketCustomRoutesIntegrationStack(this, "WebSocketCustomRoutesIntegrationStack", { webSocketApiStack, webSocketCustomRoutesLambdaStack });


    // const deviceMgmt = new DeviceManagementStack(this, "DeviceManagementStack");

    // const map = new MapStack(this, "MapStack", { deviceMgmt });


    /*** Permissions ***/

    dataStack.webSocketConnectionsTable.grantReadWriteData(webSocketBuiltInRoutesLambdaStack.webSocketConnectRouteLambda)
    dataStack.webSocketConnectionsTable.grantReadWriteData(webSocketBuiltInRoutesLambdaStack.webSocketDisconnectRouteLambda)
    dataStack.webSocketConnectionsTable.grantReadWriteData(webSocketCustomRoutesLambdaStack.webSocketToWebClientRouteLambda);
  }
}

module.exports = { CdkStack }
