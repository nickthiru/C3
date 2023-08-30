const { Stack, Fn } = require('aws-cdk-lib');
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const path = require("path");

const webSocketRouteHandlersLocation = "../../src/api/websocket/route";


class WebSocketCustomRoutesLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { dataStack, webSocketApiStack } = props;

    // const webSocketConnectionsTableName = Fn.importValue("WebSocketConnectionsTableName")
    // const devStageWebSocketApiEndpoint = Fn.importValue("DevStageWebSocketApiEndpoint")


    // To receive messages from the web client
    this.webSocketFromWebClientRouteLambda = new Function(this, "WebSocketFromWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteHandlersLocation)),
      handler: "from-web-client.handler",
      // initialPolicy: [
      //   // Allow this lambda to publish to all SNS topics
      //   new PolicyStatement({
      //     effect: Effect.ALLOW,
      //     // resources: ["arn:aws:sns:us-east-1:346761569124:topic:*"],
      //     resources: ["arn:aws:sns:us-east-1:346761569124:*"],
      //     actions: ["sns:Publish"]
      //   }),
      //   // Allow cognito users, with temp STS token, to publish to SNS
      //   new PolicyStatement({
      //     effect: Effect.ALLOW,
      //     resources: ["arn:aws:sts::346761569124:assumed-role/*"],
      //     actions: ["sns:Publish"]
      //   })
      // ]
    });

    // To send messages to the web client
    this.webSocketToWebClientRouteLambda = new Function(this, "WebSocketToWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, webSocketRouteHandlersLocation)),
      handler: "to-web-client.handler",
      environment: {
        webSocketConnectionsTableName: dataStack.webSocketConnectionsTable.tableName,
        webSocketApiEndpoint: webSocketApiStack.webSocketApi.apiEndpoint
        // webSocketConnectionsTableName: webSocketConnectionsTableName,
        // webSocketApiEndpoint: devStageWebSocketApiEndpoint
      }
    })
    this.webSocketToWebClientRouteLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:execute-api:us-east-1:346761569124:m71oz07fyl/dev/POST/@connections"],
      actions: ["execute-api:Invoke"]
    }));
  }
}

module.exports = {
  WebSocketCustomRoutesLambdaStack
};