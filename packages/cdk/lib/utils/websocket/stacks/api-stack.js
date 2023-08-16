const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");

class ApiStack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** API ***/
    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      // The route selection expression value will name the Lambda Function that will
      // be invoked (see "WebSocket Custom Routes" section below).
      routeSelectionExpression: "$request.body.action",


      // Built-in Routes

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "Connect_WebSocketRoute_WebSocketLambdaIntegration",
          props.connectRouteLambda
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebSocketLambdaAuthorizer",
          props.webSocketAuthorizerLambda,
          { identitySource: ["route.request.querystring.token"] }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "Disconnect_WebSocketRoute_WebSocketLambdaIntegration",
          props.disconnectRouteLambda
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "Default_WebSocketRoute_WebSocketLambdaIntegration",
          props.defaultRouteLambda
        )
      },
    });


    /*** Custom Routes ***/

    webSocketApi.addRoute("fromwebclient", {
      integration: new WebSocketLambdaIntegration(
        "FromWebClientRouteWebSocketLambdaIntegration",
        props.fromWebClientRouteLambda
      )
    });

    webSocketApi.addRoute("towebclient", {
      integration: new WebSocketLambdaIntegration(
        "ToWebClientRouteWebSocketLambdaIntegration",
        props.toWebClientRouteLambda
      )
    });


    /*** WebSocket Stages ***/

    // Development

    const devWebSocketStage = new WebSocketStage(this, "DevWebSocketStage", {
      webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });


    /*** Stack Outputs ***/

    new CfnOutput(this, "DevStage_WebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${devWebSocketStage.stageName}`
    });
  }
}


module.exports = { ApiStack };
