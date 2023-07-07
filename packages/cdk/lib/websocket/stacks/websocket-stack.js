const { Stack } = require("aws-cdk-lib");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");

class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // 
    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRouteWebsocketLambdaIntegration",
          new Function(this, "ConnectRouteWebsocketLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/")),
            handler: "connect-route.handler"
          })
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebsocketLambdaAuthorizer",
          new Function(this, "WebsocketAuthorizerLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/")),
            handler: "authorizer.handler"
          }),
          { identitySource: "method.request.queryStringParameters.jwtToken" }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRouteWebsocketLambdaIntegration",
          new Function(this, "DisconnectRouteWebsocketLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/")),
            handler: "disconnect-router.handler"
          })
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRouteWebsocketLambdaIntegration",
          new Function(this, "DefaultRouteWebsocketLambda", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(path.join(__dirname, "../handlers/")),
            handler: "default-route.handler"
          })
        )
      }
    });

    //
    new WebSocketStage(this, "WebSocketStage", {
      webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });


    // Custom Routes

    webSocketApi.addRoute("fromclient", {
      integration: new WebSocketLambdaIntegration(
        "FromClientWebsocketLambdaIntegration",
        new Function(this, "FromClientRouteWebsocketLambda", {
          runtime: Runtime.NODEJS_18_X,
          code: Code.fromAsset(path.join(__dirname, "../handlers/")),
          handler: "fromClient-route.handler"
        })
      )
    });

    webSocketApi.addRoute("toclient", {
      integration: new WebSocketLambdaIntegration(
        "ToClientWebsocketLambdaIntegration",
        new Function(this, "ToClientRouteWebsocketLambda", {
          runtime: Runtime.NODEJS_18_X,
          code: Code.fromAsset(path.join(__dirname, "../handlers/")),
          handler: "toClient-route.handler"
        })
      )
    });

    // new CfnOutput(this, "WebSocketUrl", {
    //   value: this.webSocketApi.path
    // })
  }
}

module.exports = { WebSocketStack };


    // webSocketApi.addRoute("$connect", {
    //   integration: new WebSocketLambdaIntegration(
    //     "ConnectRouteWebsocketLambdaIntegration",
    //     new Function(this, "ConnectRouteWebsocketLambda", {
    //       runtime: Runtime.NODEJS_18_X,
    //       code: Code.fromAsset(path.join(__dirname, "../handlers/")),
    //       handler: "connect-route.handler"
    //     })
    //   )
    // });

    // webSocketApi.addRoute("$disconnect", {
    //   integration: new WebSocketLambdaIntegration(
    //     "DisconnectRouteWebsocketLambdaIntegration",
    //     new Function(this, "DisconnectRouteWebsocketLambda", {
    //       runtime: Runtime.NODEJS_18_X,
    //       code: Code.fromAsset(path.join(__dirname, "../handlers/")),
    //       handler: "disconnect-router.handler"
    //     })
    //   )
    // });

    // webSocketApi.addRoute("$default", {
    //   integration: new WebSocketLambdaIntegration(
    //     "DefaultRouteWebsocketLambdaIntegration",
    //     new Function(this, "DefaultRouteWebsocketLambda", {
    //       runtime: Runtime.NODEJS_18_X,
    //       code: Code.fromAsset(path.join(__dirname, "../handlers/")),
    //       handler: "default-route.handler"
    //     })
    //   )
    // });