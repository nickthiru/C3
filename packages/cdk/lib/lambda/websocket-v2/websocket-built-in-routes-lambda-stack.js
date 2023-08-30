const { Stack } = require('aws-cdk-lib');
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

const webSocketRouteHandlersLocation = "../../src/api/websocket/route";
const webSocketLambdaAuthorizerHandlerLocation = "../../src/api/websocket/lambda-authorizer.js";
const packageLockJsonFileLocation = "../../../../package-lock.json";


class WebSocketBuiltInRoutesLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { cognitoStack, dataStack } = props;

    this.webSocketConnectRouteLambda = new Function(this, "WebSocketConnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteHandlersLocation)),
      handler: "connect.handler",
      environment: {
        webSocketConnectionsTableName: dataStack.webSocketConnectionsTable.tableName
        // webSocketConnectionsTableName: webSocketConnectionsTableName
      }
    });

    this.webSocketDisconnectRouteLambda = new Function(this, "WebSocketDisconnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteHandlersLocation)),
      handler: "disconnect.handler",
      environment: {
        webSocketConnectionsTableName: dataStack.webSocketConnectionsTable.tableName
        // webSocketConnectionsTableName: webSocketConnectionsTableName
      }
    });

    this.webSocketDefaultRouteLambda = new Function(this, "WebSocketDefaultRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteHandlersLocation)),
      handler: "default.handler"
    });

    // To perform authorization of a websocket connection on the connect route
    this.webSocketLambdaAuthorizer = new NodejsFunction(this, "WebSocketLambdaAuthorizer", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, webSocketLambdaAuthorizerHandlerLocation)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFileLocation)),
      environment: {
        userPoolId: cognitoStack.userPool.userPoolId,
        userPoolClientId: cognitoStack.userPoolClient.userPoolClientId
      }
    });
  }
}

module.exports = {
  WebSocketBuiltInRoutesLambdaStack
};