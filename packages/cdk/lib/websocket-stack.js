const { Stack, CfnOutput } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const path = require("path");


class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { cognitoStack, dataStack } = props;

    const webSocketRouteFunctionsLocation = "../src/api/websocket/route";
    const webSocketLambdaAuthorizerHandlerLocation = "../src/api/websocket/lambda-authorizer.js";
    const packageLockJsonLocation = "../../../package-lock.json";


    /*** Built-In Route Handling Lambdas ***/

    const webSocketConnectRouteLambda = new Function(this, "WebSocketConnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteFunctionsLocation)),
      handler: "connect.handler",
      environment: {
        webSocketConnectionsTableName: dataStack.webSocketConnectionsTable.tableName
      }
    });

    const webSocketDisconnectRouteLambda = new Function(this, "WebSocketDisconnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteFunctionsLocation)),
      handler: "disconnect.handler",
      environment: {
        webSocketConnectionsTableName: dataStack.webSocketConnectionsTable.tableName
      }
    });

    const webSocketDefaultRouteLambda = new Function(this, "WebSocketDefaultRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteFunctionsLocation)),
      handler: "default.handler"
    });

    // Authorizer for 'connect' route
    const webSocketLambdaAuthorizer = new NodejsFunction(this, "WebSocketLambdaAuthorizer", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, webSocketLambdaAuthorizerHandlerLocation)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonLocation)),
      environment: {
        userPoolId: cognitoStack.userPool.userPoolId,
        userPoolClientId: cognitoStack.userPoolClient.userPoolClientId,
      }
    });


    /*** WebSocket API ***/

    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      // The route selection expression value will name the Lambda Function that will
      // be invoked (see "WebSocket Custom Routes" section below).
      routeSelectionExpression: "$request.body.action",


      // Built-in route settings

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRouteWebsocketLambdaIntegration",
          webSocketConnectRouteLambda
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebSocketLambdaAuthorizer",
          webSocketLambdaAuthorizer,
          { identitySource: ["route.request.querystring.token"] }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRouteWebsocketLambdaIntegration",
          webSocketDisconnectRouteLambda
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRouteWebsocketLambdaIntegration",
          webSocketDefaultRouteLambda
        )
      },
    });


    /*** WebSocket Stages ***/

    const devWebSocketStage = new WebSocketStage(this, "DevWebSocketStage", {
      webSocketApi: webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });


    /*** Custom Route Handling Lambdas ***/

    // To receive messages from the web client
    const webSocketFromWebClientRouteLambda = new Function(this, "WebSocketFromWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteFunctionsLocation)),
      handler: "from-web-client.handler",
      initialPolicy: [
        // Authorize lambda to publish to all SNS topics
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:sns:us-east-1:346761569124:*"],
          actions: ["sns:Publish"]
        }),
        // Authorize cognito users, with temp STS token, to publish to SNS
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:sts::346761569124:assumed-role/*"],
          actions: ["sns:Publish"]
        })
      ]
    });

    // To send messages to the web client
    const webSocketToWebClientRouteLambda = new Function(this, "WebSocketToWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteFunctionsLocation)),
      handler: "to-web-client.handler",
      initialPolicy: [
        // Authorize lambda to 'post-to-connection'
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:execute-api:us-east-1:346761569124:${webSocketApi.apiId}/${devWebSocketStage.stageName}/POST/@connections/*`],
          actions: ["execute-api:Invoke", "execute-api:ManageConnections"]
        }),
      ],
      environment: {
        webSocketConnectionsTableName: dataStack.webSocketConnectionsTable.tableName,
        webSocketApiConnectionUrl: `https://${webSocketApi.apiId}.execute-api.us-east-1.amazonaws.com/${devWebSocketStage.stageName}`
      }
    });


    /*** Custom Route Integrations ***/

    webSocketApi.addRoute("fromwebclient", {
      integration: new WebSocketLambdaIntegration(
        "FromWebClientRouteWebsocketLambdaIntegration",
        webSocketFromWebClientRouteLambda
      )
    });

    webSocketApi.addRoute("towebclient", {
      integration: new WebSocketLambdaIntegration(
        "ToWebClientRouteWebsocketLambdaIntegration",
        webSocketToWebClientRouteLambda
      )
    });


    /*** Subscriptions */

    this.webSocketToWebClientRouteQueue = new Queue(this, "WebSocketToWebClientRouteQueue");

    new SqsToLambda(this, "WebSocketToWebClientRouteSqsToLambda", {
      existingQueueObj: this.webSocketToWebClientRouteQueue,
      existingLambdaObj: webSocketToWebClientRouteLambda
    });


    /*** Permissions ***/

    dataStack.webSocketConnectionsTable.grantReadWriteData(webSocketConnectRouteLambda);
    dataStack.webSocketConnectionsTable.grantReadWriteData(webSocketDisconnectRouteLambda);
    dataStack.webSocketConnectionsTable.grantReadWriteData(webSocketToWebClientRouteLambda);


    /*** Stack Outputs ***/

    // For web client
    new CfnOutput(this, "DevStageWebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${devWebSocketStage.stageName}`,
      description: "'dev' stage websocket API endpoint to be used by web client",
      exportName: "DevStageWebSocketApiEndpoint"
    });
  }
}

module.exports = { WebSocketStack };