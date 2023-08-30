const { Stack, CfnOutput } = require('aws-cdk-lib');
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");


class WebSocketApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { webSocketBuiltInRoutesLambdaStack } = props;

    this.webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      // The route selection expression value will name the Lambda Function that will
      // be invoked (see "WebSocket Custom Routes" section below).
      routeSelectionExpression: "$request.body.action",


      // Built-in route settings

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRouteWebsocketLambdaIntegration",
          webSocketBuiltInRoutesLambdaStack.webSocketConnectRouteLambda
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebSocketLambdaAuthorizer",
          webSocketBuiltInRoutesLambdaStack.webSocketLambdaAuthorizer,
          { identitySource: ["route.request.querystring.token"] }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRouteWebsocketLambdaIntegration",
          webSocketBuiltInRoutesLambdaStack.webSocketDisconnectRouteLambda
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRouteWebsocketLambdaIntegration",
          webSocketBuiltInRoutesLambdaStack.webSocketDefaultRouteLambda
        )
      },
    });


    /*** WebSocket Stages ***/

    // Dev
    const devWebSocketStage = new WebSocketStage(this, "DevWebSocketStage", {
      webSocketApi: this.webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });

    // Test

    // Prod


    /*** Stack Outputs ***/

    // For web client
    new CfnOutput(this, "DevStageWebSocketApiEndpoint", {
      value: `${this.webSocketApi.apiEndpoint}/${devWebSocketStage.stageName}`,
      description: "'dev' stage websocket API endpoint to be used by web client",
      exportName: "DevStageWebSocketApiEndpoint"
    });
  }
}

module.exports = {
  WebSocketApiStack
};