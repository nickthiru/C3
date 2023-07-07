const { Stack, CfnOutput } = require("aws-cdk-lib");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");

const path = require("path");

class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // 
    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRoute_WebsocketLambdaIntegration",
          new Function(this, "ConnectRoute_WebsocketLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
            handler: "connect-route-handler.handler"
          })
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebsocketLambdaAuthorizer",
          new Function(this, "WebsocketAuthorizerLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
            handler: "auth-handler.handler"
          }),
          { identitySource: ["route.request.querystring.token"] }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRoute_WebsocketLambdaIntegration",
          new Function(this, "DisconnectRoute_WebsocketLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
            handler: "disconnect-router-handler.handler"
          })
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRoute_WebsocketLambdaIntegration",
          new Function(this, "DefaultRoute_WebsocketLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
            handler: "default-route-handler.handler"
          })
        )
      }
    });

    //
    const webSocketStage = new WebSocketStage(this, "Dev_WebSocketStage", {
      webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });


    // Custom Routes

    // webSocketApi.addRoute("fromclient", {
    //   integration: new WebSocketLambdaIntegration(
    //     "FromClientWebsocketLambdaIntegration",
    //     new Function(this, "FromClientRouteWebsocketLambda", {
    //       runtime: Runtime.NODEJS_18_X,
    //       code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
    //       handler: "fromClient-route-handler.handler"
    //     })
    //   )
    // });

    // webSocketApi.addRoute("toclient", {
    //   integration: new WebSocketLambdaIntegration(
    //     "ToClientWebsocketLambdaIntegration",
    //     new Function(this, "ToClientRouteWebsocketLambda", {
    //       runtime: Runtime.NODEJS_18_X,
    //       code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
    //       handler: "toClient-route-handler.handler"
    //     })
    //   )
    // });

    new CfnOutput(this, "DevStage_WebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${webSocketStage.stageName}`
    });
  }
}

module.exports = { WebSocketStack };