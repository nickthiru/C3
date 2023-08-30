const { Stack } = require('aws-cdk-lib');
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");


class WebSocketCustomRoutesIntegrationStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { webSocketApiStack, webSocketCustomRoutesLambdaStack } = props;

    webSocketApiStack.webSocketApi.addRoute("fromwebclient", {
      integration: new WebSocketLambdaIntegration(
        "FromWebClientRouteWebsocketLambdaIntegration",
        webSocketCustomRoutesLambdaStack.webSocketFromWebClientRouteLambda
      )
    });

    webSocketApiStack.webSocketApi.addRoute("towebclient", {
      integration: new WebSocketLambdaIntegration(
        "ToWebClientRouteWebsocketLambdaIntegration",
        webSocketCustomRoutesLambdaStack.webSocketToWebClientRouteLambda
      )
    });
  }
}

module.exports = {
  WebSocketCustomRoutesIntegrationStack
};