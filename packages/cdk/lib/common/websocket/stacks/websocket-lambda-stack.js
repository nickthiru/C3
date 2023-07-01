const { Stack } = require("aws-cdk-lib");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");

class WebSocketLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const webSocketApi = new WebSocketApi(this, 'WebSocketApi', {
      connectRouteOptions: ""
    });

    new WebSocketStage(this, 'WebSocketStage', {
      webSocketApi,
      stageName: 'dev',
      autoDeploy: true,
    });

    webSocketApi.addRoute('fromclientmessagebroker', {
      integration: new WebSocketLambdaIntegration(
        'FromClientMessageBrokerIntegration',
        new Function(this, "FromClientMessageBrokerLambda", {
          runtime: Runtime.NODEJS_18_X,
          code: Code.fromAsset(path.join(__dirname, "../handlers/FromClientMessageBroker.js")),
          handler: "FromClientMessageBroker.handler"
        })
      )
    });

    webSocketApi.addRoute('toclientmessagebroker', {
      integration: new WebSocketLambdaIntegration(
        'ToClientMessageBrokerIntegration',
        new Function(this, "ToClientMessageBrokerLambda", {
          runtime: Runtime.NODEJS_18_X,
          code: Code.fromAsset(path.join(__dirname, "../handlers/ToClientMessageBroker.js")),
          handler: "ToClientMessageBroker.handler"
        })
      )
    });
  }
}

module.exports = { WebSocketLambdaStack };