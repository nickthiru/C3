const { Stack } = require("aws-cdk-lib");
const { Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

class ConnectRouteStack extends Stack {
  /**
     * 
     * @param {Construct} scope 
     * @param {string} id 
     * @param {StackProps=} props 
     */
  constructor(scope, id, props) {
    super(scope, id, props);

    this.connectRouteLambda = new Function(this, "ConnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../../handlers/routes")),
      handler: "connect-route-handler.handler",
      environment: {
        websocketConnectionsTableName: props.websocketConnectionsTableName
      }
    });

    this.webSocketAuthorizerLambda = new NodejsFunction(this, "WebSocketAuthorizerLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, "../../handlers/websocket-authorizer-handler.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../../../package-lock.json")),
      environment: {
        cognitoUserPoolId: props.cognitoUserPoolId,
        cognitoUserPoolClientId: props.cognitoUserPoolClientId,
      }
    });
  }
}

module.exports = { ConnectRouteStack };