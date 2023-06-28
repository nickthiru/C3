const { Stack } = require("aws-cdk-lib");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");

class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const webSocketApi = new WebSocketApi(this, 'WebSocketApi');

    new WebSocketStage(this, 'WebSocketStage', {
      webSocketApi,
      stageName: 'dev',
      autoDeploy: true,
    });

    webSocketApi.addRoute('sendmessage', {
      integration: new WebSocketLambdaIntegration('SendMessageIntegration', messageHandler),
    });
  }
}

module.exports = { WebSocketStack };